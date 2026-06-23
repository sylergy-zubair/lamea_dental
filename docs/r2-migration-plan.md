# R2 Migration Plan: Consultation File Uploads & Lead Storage

## Why

Both `/api/upload` and `/api/consultation` write to the local filesystem (`process.cwd()`), which is **read-only on serverless platforms** (Vercel). R2 provides S3-compatible object storage that works from serverless functions.

## What Changes

| File | Change |
|------|--------|
| `lib/r2.ts` | **New** — shared R2 client using `@aws-sdk/client-s3` |
| `app/api/upload/route.ts` | **Rewrite** — upload to R2 bucket instead of local `public/uploads/` |
| `app/api/consultation/route.ts` | **Rewrite** — save per-lead JSON files to R2 instead of `data/leads.json` |
| `.env.local.example` | **Update** — add R2 env vars |
| `package.json` | **Update** — add `@aws-sdk/client-s3` dependency |

## Lead Storage Design (per-lead files)

Each submission creates a JSON file at `leads/{uuid}.json` in the R2 bucket. This avoids:
- Race conditions (no shared file to corrupt)
- JSON parse/write contention
- Unbounded file growth in a single array

Listing leads = listing objects under `leads/` prefix. Inspecting a lead = reading one small JSON file.

## New Environment Variables

```
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-token-access-key
R2_SECRET_ACCESS_KEY=your-r2-token-secret
R2_BUCKET_NAME=lamea-dental-uploads
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev   # or custom domain
```

## Steps

1. Install `@aws-sdk/client-s3`
2. Create `lib/r2.ts` — init S3 client with R2 endpoint, export `putObject` / `getObject` / `listObjects` helpers
3. Rewrite `app/api/upload/route.ts`:
   - Remove `fs/promises` imports
   - Upload buffer directly to R2 with `PutObjectCommand`
   - Return public R2 URL
4. Rewrite `app/api/consultation/route.ts`:
   - Remove `readFile`/`writeFile` lead persistence
   - Save each lead as `leads/{uuid}.json` via `PutObjectCommand`
   - Keep validation logic as-is
5. Update `.env.local.example` with R2 vars
