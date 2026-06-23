import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
  createdAt: string;
}

const DATA_FILE = join(process.cwd(), 'data', 'leads.json');

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function saveLead(lead: Lead): Promise<void> {
  await mkdir(join(process.cwd(), 'data'), { recursive: true });

  let leads: Lead[] = [];
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    leads = JSON.parse(raw);
  } catch {
    // File doesn't exist yet — start fresh
  }

  leads.push(lead);
  await writeFile(DATA_FILE, JSON.stringify(leads, null, 2));
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

    await saveLead(lead);

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Consultation submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
