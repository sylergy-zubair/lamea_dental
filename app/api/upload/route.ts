import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { putObject } from '@/lib/r2';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

function mimeToExt(mime: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/heic': 'heic',
    'image/heif': 'heif',
  };
  return map[mime] || 'jpg';
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Only image files (JPEG, PNG, WebP, HEIC) are accepted',
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File must be under 10MB' },
        { status: 413 }
      );
    }

    const ext = mimeToExt(file.type);
    const key = `uploads/${randomUUID()}.${ext}`;

    const buffer = new Uint8Array(await file.arrayBuffer());
    await putObject(key, buffer, file.type);

    const publicUrl = process.env.R2_PUBLIC_URL;
    const url = publicUrl
      ? `${publicUrl.replace(/\/$/, '')}/${key}`
      : `/api/upload/${key}`;

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
