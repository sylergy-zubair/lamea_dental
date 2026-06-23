import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { putObject } from '@/lib/r2';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
  createdAt: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = (formData.get('name') as string || '').trim();
    const email = (formData.get('email') as string || '').trim();
    const phone = (formData.get('phone') as string || '').trim();
    const photoUrl = (formData.get('photoUrl') as string) || undefined;

    const errors: string[] = [];

    if (!name) errors.push('Name is required');
    if (!email) errors.push('Email is required');
    else if (!validateEmail(email)) errors.push('Invalid email format');
    if (!phone) errors.push('Phone number is required');

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors.join('. ') },
        { status: 400 }
      );
    }

    const lead: Lead = {
      id: randomUUID(),
      name,
      email,
      phone,
      photoUrl,
      createdAt: new Date().toISOString(),
    };

    // Save as individual JSON file in R2 — one file per lead, no race conditions
    await putObject(
      `leads/${lead.id}.json`,
      new TextEncoder().encode(JSON.stringify(lead, null, 2)),
      'application/json'
    );

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Consultation submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
