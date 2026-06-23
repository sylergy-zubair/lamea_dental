# Lāmea Dental — Routes

## Page Routes

| Route | File |
|-------|------|
| `/` (Homepage) | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/aftercare` | `app/aftercare/page.tsx` |
| `/consultation` | `app/consultation/page.tsx` |
| `/faq` | `app/faq/page.tsx` |
| `/matcher` | `app/matcher/page.tsx` |
| `/pricing` | `app/pricing/page.tsx` |
| `/privacy` | `app/privacy/page.tsx` |
| `/results` | `app/results/page.tsx` |
| `/terms` | `app/terms/page.tsx` |

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/consultation` | POST | Accepts `multipart/form-data` (name, email, phone, photoUrl), saves lead to `data/leads.json` |
| `/api/upload` | POST | Accepts image upload (JPEG, PNG, WebP, HEIC, max 10MB), saves to `public/uploads/consultation/` |

## Notes

- All page routes are static, top-level segments — no dynamic segments, catch-all, or route groups.
- Every page shares the root layout (`app/layout.tsx`) which provides `<Navigation />`, `<Footer />`, and `<WhatsAppBubble />`.
- No custom redirects or rewrites are configured.
