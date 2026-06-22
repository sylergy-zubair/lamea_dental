# AI Smile Preview — Implementation Plan

**Component:** `components/AIPreview/`
**Current state:** Entirely decorative — static markup, no interactivity, no data flow, no API.
**Target state:** Users upload a photo, see it previewed, trigger AI processing, and view a transformed "smile preview" result.

---

## Phase 0 — Foundation: Make it Interactive

### 0.1 Convert to Client Component
- Add `'use client'` directive to `AIPreview.tsx`

### 0.2 Add a Hidden File Input
- Place `<input type="file" accept="image/jpeg,image/png" hidden ref={fileInputRef} />` inside the component
- Wire the upload area's `onClick` to `fileInputRef.current?.click()`

### 0.3 Add Upload State
Three pieces of state:

```tsx
const [file, setFile] = useState<File | null>(null);
const [previewUrl, setPreviewUrl] = useState<string | null>(null);
const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'result' | 'error'>('idle');
```

- On file select: `setPreviewUrl(URL.createObjectURL(file))`, set `status = 'uploaded'`
- Revoke `previewUrl` on unmount via `useEffect` cleanup (prevent memory leaks)

### 0.4 Wire Drag-and-Drop
- `onDragOver` → `e.preventDefault()`, toggle a `.dragOver` CSS class on the upload area
- `onDrop` → `e.preventDefault()`, extract `e.dataTransfer.files[0]`, validate, feed to same handler as file input

### 0.5 Show the Uploaded Photo
- When `previewUrl` is set, replace the placeholder `<Image>` with a standard `<img src={previewUrl}>` inside the visual area
- The `<Image>` from `next/image` won't work with blob URLs; use a native `<img>` with `object-fit: cover`

### 0.6 Client-Side Validation
Check before anything hits the wire:
- **File type:** Reject anything other than `image/jpeg` or `image/png`. Show an inline error message.
- **File size:** Reject files > 10 MB. Show an inline error message.
- **Dimensions (optional):** Reject images smaller than 500×500 px if desired.

### 0.7 Visual Feedback During Upload
- Show the filename and size after selection
- Add a "remove" button to clear the selection and go back to idle
- Style the `.dragOver` state with a subtle highlight

---

## Phase 1 — AI Processing Backend

### 1.1 Create an API Route
`app/api/ai-smile-preview/route.ts`

```
POST /api/ai-smile-preview
```

**Request:**
```ts
Content-Type: multipart/form-data
Body: { image: File }
```

**Response (success):**
```ts
{
  "originalUrl": "https://...",        // CDN URL of uploaded original
  "resultUrl": "https://...",          // CDN URL of AI-transformed image
  "thumbnailUrl": "https://..."        // smaller version for display
}
```

**Response (error):**
```ts
{
  "error": "Unsupported file type. Please upload a JPG or PNG.",
  "code": "INVALID_FILE_TYPE"
}
```

### 1.2 Route Handler Structure

```
POST /api/ai-smile-preview
├── 1. Parse multipart form (use formidable or busboy — or Next.js built-in bodyParser)
├── 2. Validate file type & size (server-side — never trust client)
├── 3. Write temp file to /tmp
├── 4. Call external AI API (Replicate / Stability AI / custom model)
│   └── If API fails → return 502 with descriptive error
├── 5. Upload result to CDN/local storage
├── 6. Clean up temp files
└── 7. Return URLs
```

### 1.3 AI Service Integration Options

| Option | Pros | Cons | Cost |
|---|---|---|---|
| **Replicate API** (`replicate.com`) | Pay-per-run, no GPU to manage, fast | Requires API key, credit card | ~$0.01–0.05 per image |
| **Stability AI** | Specialised for image-to-image | Higher latency, separate SDK | ~$0.01 per image |
| **Midjourney API (third-party)** | Best aesthetic quality | Not official, reliability varies | ~$0.05–0.10 per image |
| **Self-hosted model (Flux/Hunyuan)** | Full control, no per-image cost | Need GPU server, ops overhead | ~$20–50/mo GPU |

**Recommended:** Start with **Replicate** for speed of integration. Switch later if cost or quality demands it.

### 1.4 Example: Replicate Integration

```ts
// lib/ai/replicate.ts
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateSmilePreview(imageBuffer: Buffer): Promise<Buffer> {
  const output = await replicate.run(
    "model/version",  // TBD: specific model for smile/dental preview
    {
      input: {
        image: `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
        prompt: "a natural confident smile, dental veneers, bright white teeth, photorealistic",
        negative_prompt: "cartoon, deformed, distorted, unrealistic",
      }
    }
  );
  // output is typically a URL to the generated image
  return fetch(output as string).then(r => r.arrayBuffer()).then(Buffer.from);
}
```

### 1.5 Store the Result
- Option A: Upload to a CDN (Cloudflare R2, S3, etc.) and return the public URL
- Option B: Save to `public/uploads/` and serve statically (simpler, but not production-grade)
- Option C: Return the base64 data directly — simplest for MVP, but bad for performance

**Recommended for MVP:** Save to `public/uploads/ai-previews/` and return the relative URL. Add a `.gitkeep` to ensure the directory exists.

### 1.6 Environment Variables
Add to `.env.local`:
```
REPLICATE_API_TOKEN=...
AI_PREVIEW_MAX_FILE_SIZE=10485760
UPLOAD_DIR=public/uploads/ai-previews
```

---

## Phase 2 — Connect Frontend to Backend

### 2.1 The Upload Flow

```
User selects file
  → client-side validation passes
  → show preview in visual area
  → show "Generate Preview" button
  → user clicks "Generate Preview"
  → POST /api/ai-smile-preview (FormData with file)
  → show loading spinner on the visual with "Analysing your smile…"
  → receive result URLs back
  → display AI-generated preview
  → show "Try Again" button
```

### 2.2 States Visual Breakdown

| Status | Upload Area | Visual Area |
|---|---|---|
| `idle` | "Upload Your Smile" + dashed border | Placeholder Image |
| `uploaded` | File name + size + remove button | User's uploaded photo |
| `processing` | Disabled state + spinner | Skeleton/pulse animation on the visual |
| `result` | "Try Another Photo" button | AI-generated preview |
| `error` | Retry button + error message | Keep showing the uploaded photo |

### 2.3 Polling (if async processing)
If the AI provider returns an async prediction ID (common with Replicate):
- Poll `GET /api/ai-smile-preview/status?id=<predictionId>` every 2 seconds
- Show a progress indicator: "Generating your preview (30%)…"
- On completion, display the result

### 2.4 Abort / Cancel
- Wire an `AbortController` to the fetch request
- If the user navigates away or clicks "Try Again" during processing, cancel the in-flight request
- Clean up properly in `useEffect` return

---

## Phase 3 — Result UX

### 3.1 Before / After Layout
- Show original and AI-generated preview side by side (desktop) or stacked (mobile)
- Or use a comparison slider (drag to reveal) — higher dev effort but more polished

### 3.2 CTA After Result
- "Book Your Consultation" button linking to `/#consultation`
- This is the conversion goal — don't hide it

### 3.3 Error States
| Error | User sees |
|---|---|
| File too large | "File is too large. Maximum size is 10 MB." |
| Wrong file type | "Please upload a JPG or PNG image." |
| API rate limited | "We're experiencing high demand. Please try again in a few minutes." |
| AI processing failed | "Something went wrong generating your preview. Please try again." |
| Network error | "Could not connect. Please check your internet connection." |

### 3.4 Loading UX
- Don't use generic spinners. Use:
  - Skeleton pulse on the visual area
  - Progress messages that rotate: "Analysing your facial structure…" → "Designing your smile…" → "Rendering preview…"
  - Keeps the user engaged during the 5–15 second processing time

---

## Phase 4 — Production Hardening

### 4.1 Rate Limiting
- Store a timestamp in localStorage per session
- Allow max 3 previews per 24 hours per device (or per IP on the server side)
- Prevent abuse without annoying genuine users

### 4.2 File Cleanup
- Server-side: cron job or `after` response hook to delete `public/uploads/ai-previews/` files older than 24 hours
- Or use a CDN with TTL (Cloudflare R2, S3 lifecycle policy)

### 4.3 Accessibility
- File input must be keyboard-accessible (focusable upload area with `onKeyDown`)
- Alt text on all images (original and result)
- ARIA live region for status updates
- Focus management after result loads

### 4.4 Performance
- `URL.createObjectURL` + `revokeObjectURL` cleanup
- Compress image client-side before upload (reduce to 1200px max dimension, 0.8 quality) using `<canvas>`
- Lazy-load the component with `next/dynamic` since it's heavy
- Don't block the main thread during compression

### 4.5 Error Tracking
- Log all API errors to console in dev
- Consider a lightweight error reporting service or a webhook for production

### 4.6 Analytics Events
Track these (if analytics is set up):
- `ai_preview_upload_started`
- `ai_preview_upload_completed`
- `ai_preview_processing_started`
- `ai_preview_processing_completed`
- `ai_preview_processing_failed`
- `ai_preview_cta_clicked`

---

## Implementation Order

```
Phase 0 ─────────────────────────────────────────────── 1–2 sessions
  ├── 0.1 Add 'use client' directive
  ├── 0.2 Hidden file input + ref
  ├── 0.3 Upload state machine
  ├── 0.4 Drag-and-drop handlers
  ├── 0.5 Preview image display
  ├── 0.6 Client-side validation
  └── 0.7 Visual polish (drag state, remove button)

Phase 1 ─────────────────────────────────────────────── 1–2 sessions
  ├── 1.1 API route scaffolding (route.ts)
  ├── 1.2 Multipart parsing + validation
  ├── 1.3 AI service integration (Replicate)
  ├── 1.4 Result storage
  └── 1.5 Environment config

Phase 2 ─────────────────────────────────────────────── 1 session
  ├── 2.1 Wire frontend → API (fetch + FormData)
  ├── 2.2 All visual states mapped out
  ├── 2.3 Polling for async results (if needed)
  └── 2.4 Abort controller

Phase 3 ─────────────────────────────────────────────── 1 session
  ├── 3.1 Before/after or comparison slider
  ├── 3.2 CTA after result
  ├── 3.3 All error states with friendly messages
  └── 3.4 Loading UX with progress messages

Phase 4 ─────────────────────────────────────────────── 1 session
  ├── 4.1 Rate limiting
  ├── 4.2 File cleanup
  ├── 4.3 Accessibility pass
  ├── 4.4 Client-side image compression
  ├── 4.5 Lazy-load with next/dynamic
  └── 4.6 Analytics events
```

---

## Key Decisions to Make Before Starting

1. **Which AI provider?** (Replicate recommended for MVP)
2. **Which model/version?** Needs research/testing — a generic face enhancer or a dental-specific model
3. **Where to store results?** Local `public/uploads/` for MVP, CDN for production
4. **Comparison UI:** Side-by-side vs comparison slider
5. **Rate limit rules:** How many free previews per user per day?

---

## Files That Will Change or Be Created

| File | Action |
|---|---|
| `components/AIPreview/AIPreview.tsx` | Rewrite (add interactivity, state, API call) |
| `components/AIPreview/AIPreview.module.css` | Add states, loading, error, overlay styles |
| `app/api/ai-smile-preview/route.ts` | **Create** — API handler for upload + AI processing |
| `lib/ai/replicate.ts` | **Create** — Replicate client wrapper |
| `lib/ai/compress.ts` | **Create** — Client-side image compression util |
| `.env.local` | Add `REPLICATE_API_TOKEN` |
| `public/uploads/ai-previews/.gitkeep` | **Create** — Ensure upload directory exists |
