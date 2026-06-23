# Plan: Online Consultation Feature

## Overview

Add an "Online Consultation" flow to Lamea Dental — a dedicated page where patients fill a short form, optionally attach a teeth photo, and get redirected to a Calendly evening-slot booking link.

## Files to Modify

| File | Change |
|------|--------|
| `components/Navigation/Navigation.tsx` | Add "Online Consultation" link + mobile variant |
| `components/Navigation/Navigation.module.css` | Add `.navCtaBooking` and `.mobileCtaBooking` styles |
| `.env.local.example` | Add `NEXT_PUBLIC_CALENDLY_URL` |

## Files to Create

| File | Purpose |
|------|---------|
| `app/consultation/page.tsx` | Page shell with metadata, renders ConsultationForm |
| `app/consultation/ConsultationForm.tsx` | Client component — form state, validation, photo upload, submission |
| `app/consultation/ConsultationForm.module.css` | All styles for the consultation page |
| `app/api/consultation/route.ts` | POST endpoint — validates and stores lead data |
| `app/api/upload/route.ts` | POST endpoint — accepts image file, returns URL |

---

## Step 1 — Environment Config

Add to `.env.local.example`:

```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/lamea-dental/evening-consultation
```

This is the only new config. Calendly prefill happens via URL params: `?name=...&email=...`.

---

## Step 2 — Navigation CTA

### `Navigation.tsx` changes

In the desktop nav (after `navCta`), add:

```tsx
<Link href="/consultation" className={styles.navCtaBooking}>
  Online Consultation
</Link>
```

In the mobile menu (after `mobileCta`), add:

```tsx
<Link
  href="/consultation"
  className={styles.mobileCtaBooking}
  onClick={() => setMobileOpen(false)}
>
  Online Consultation
</Link>
```

### `Navigation.module.css` changes

Add `.navCtaBooking` — reuse `.navCta` as a base via shared styles, or duplicate with a subtle visual distinction (e.g., slightly lighter background or a subtle accent border). The existing `.navCta` has `background-color: var(--charcoal); padding: 12px 24px; border-radius: var(--radius-sm); uppercase; letter-spacing: 0.08em`.

Same for `.mobileCtaBooking` — reuse `.mobileCta` pattern.

---

## Step 3 — API Route: Lead Submission

`app/api/consultation/route.ts`

**Method**: `POST`

**Request body**: `FormData` with fields:
- `name` (string, required)
- `email` (string, required)
- `phone` (string, required)
- `photoUrl` (string, optional — URL returned by upload endpoint)  

**Validation**:
- Name: non-empty, trimmed
- Email: basic regex / format check
- Phone: non-empty

**Storage**: For MVP, append lead to a local JSON store (e.g., `data/leads.json`). This is the simplest approach that works now — swap to a CRM webhook or database later without changing the frontend.

**Response**:
- `201` on success: `{ success: true, id: string }`
- `400` on validation failure: `{ success: false, error: string }`
- `500` on server error: `{ success: false, error: string }`

**Why not a server action?** The pattern doesn't exist in this codebase. A REST API route is simpler and more explicit for multipart/form-data handling with file uploads.

---

## Step 4 — API Route: Photo Upload

`app/api/upload/route.ts`

**Method**: `POST`

**Request body**: `FormData` with `file` field (image file)

**Validation**:
- File exists, is an image (check MIME type: `image/jpeg`, `image/png`, `image/webp`)
- Max size: 10MB

**Storage**:
- Dev: save to `public/uploads/consultation/` with unique filename (UUID + original extension)
- The public URL is returned as `/uploads/consultation/{filename}` (Next.js serves it statically)

**Response**:
- `200` on success: `{ success: true, url: string }`
- `400` on invalid file: `{ success: false, error: string }`
- `413` on too large: `{ success: false, error: string }`

---

## Step 5 — Consultation Page

`app/consultation/page.tsx`

Simple server component with metadata:
- `title: "Online Consultation — Lamea Dental"`
- `description: "Share your details and a quick photo, then choose an evening slot."`

Renders `<ConsultationForm />`.

### `ConsultationForm.tsx` — Client component (the core)

**State**:
- `name`, `email`, `phone` (string state for each field)
- `photoFile` (File | null) — the selected/uploaded photo
- `photoPreview` (string | null) — object URL for preview
- `status` (`'idle' | 'submitting' | 'success' | 'error'`)
- `errorMessage` (string)
- `photoUploadFailed` (boolean — allow continue without photo)

**Validation** (client-side, before submit):
- Name: non-empty
- Email: regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Phone: non-empty, basic digit check
- Show inline error messages below each invalid field

**Photo Upload Area**:
- Hidden `<input type="file" accept="image/*" capture="environment" />`
- `capture="environment"` triggers rear camera on mobile, falls back to file picker on desktop
- Styled upload area with camera SVG icon and helper text: "Add a photo of your teeth (optional) — Helps us prepare for your visit"
- When a file is selected:
  - Validate it's an image by checking `file.type.startsWith('image/')`
  - Create preview via `URL.createObjectURL(file)`
  - Show preview image with "Remove" button and "Replace" button
  - On remove: clear file state, revoke object URL, show upload area again
- On upload failure during submission: set `photoUploadFailed = true`, allow continuation

**Submission flow**:
1. Client validates all fields
2. If photo selected and not failed: POST file to `/api/upload` → get URL
3. POST lead data (name, email, phone, photoUrl) to `/api/consultation`
4. On success: redirect to `NEXT_PUBLIC_CALENDLY_URL?name={name}&email={email}`
5. On failure: show error state with retry button

**Copy** (matches brief):
- Header: "Online Consultation"
- Subheader: "Share your details and a quick photo, then choose an evening slot."
- Primary CTA button: "Continue to Booking"
- Photo helper: "Add a photo of your teeth (optional) — Helps us prepare for your visit"

**States**:
| State | UI |
|-------|-----|
| `idle` | Form with all fields |
| `submitting` | Button shows loading state, inputs disabled |
| `success` | Redirect to Calendly (or show link if redirect blocked) |
| `error` | Error message + retry button |

**Error handling**:
- Upload fails → set `photoUploadFailed = true`, show non-blocking toast/banner "Photo couldn't be uploaded, but you can continue without it", proceed with submission
- Submission fails → show error banner with retry button, keep form data intact
- Calendly URL not configured (`NEXT_PUBLIC_CALENDLY_URL` missing) → show fallback: "Please contact us at [phone] or [email] to book your consultation"

### `ConsultationForm.module.css` — Styling

Follow the exact patterns from `ContactForm.module.css`:
- `.pageSection` — padding, chalk background
- `.container` — centered, max-width 600px (one-column, narrower for form focus)
- `.formCard` — bone background, charcoal border, radius-sm, padding
- `.formGroup` — flex column, 20px gap
- `.label` — uppercase, 0.75rem, letter-spacing, charcoal color
- `.input` — full width, 14px 16px padding, obsidian border, focus: charcoal border
- `.uploadArea` — dashed border, centered, clickable, hover state
- `.uploadIcon` — SVG icon styling, camera shape
- `.previewArea` — relative container for image preview
- `.previewImage` — rounded, max-height, object-cover
- `.previewControls` — flex row with remove/replace buttons
- `.submit` — full width, charcoal bg, white text, uppercase, hover lift
- `.submit:disabled` — reduced opacity, no hover lift
- `.errorText` — red/silver color, 0.75rem
- `.errorBanner` — full-width error message with retry button
- `.fallbackMsg` — contact info fallback when Calendly missing

Use the same design tokens: `--chalk`, `--bone`, `--charcoal`, `--graphite`, `--obsidian`, `--silver`, `--radius-sm`, `--transition-base`, `--transition-smooth`.

---

## Step 6 — Verification

| Test | Expected |
|------|----------|
| Navbar "Online Consultation" CTA visible on desktop + mobile | Renders, links to `/consultation` |
| Page loads at `/consultation` | Shows form with all fields |
| Submit empty form | Validation errors on name, email, phone |
| Enter valid data + submit without photo | Success → redirect to Calendly with prefill |
| Submit with photo | Photo uploads first, then lead submits, then redirect |
| Select photo from file picker | Preview shows with remove/replace |
| Mobile: tap upload area | Camera opens (or file picker) |
| Upload fails | Show "continue without photo" option |
| Submission fails | Error banner with retry button, form data preserved |
| `NEXT_PUBLIC_CALENDLY_URL` unset | Show fallback contact info instead of redirect |
| Accessibility | All inputs have labels, upload area has aria role, focus management on errors |
| Responsive | One column, works on all viewport sizes |

---

## Key Design Decisions

1. **Dedicated page vs modal**: Page is better — works reliably on mobile, supports browser back button, no z-index/scroll issues. Follows the `/matcher` pattern.
2. **REST API routes over server actions**: No server actions exist in this codebase. API routes are straightforward, explicit, and testable.
3. **Local file storage for MVP**: `public/uploads/` is simple and works out of the box with Next.js. Swap to Vercel Blob/S3 later when needed.
4. **JSON file for lead storage**: No database exists. JSON file is the minimal viable storage. Replace with a CRM webhook or database in production.
5. **One-column layout**: Matches the requirement, keeps the form focused and mobile-friendly.
6. **No form library**: The project uses plain React state for forms. Adding `react-hook-form` would be a new dependency for one form — not worth it.
