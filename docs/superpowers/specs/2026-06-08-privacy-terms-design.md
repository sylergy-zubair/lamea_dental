# Privacy Policy & Terms and Conditions — Design Spec

## Overview

Two static legal pages: Privacy Policy and Terms and Conditions. Match site's premium light aesthetic. Sole trader context.

## Pages

| Route | File |
|-------|------|
| `/privacy` | `app/privacy/page.tsx` |
| `/terms` | `app/terms/page.tsx` |

## Design

- Bone (`--bone`) background
- Charcoal (`--charcoal`) headings, graphite (`--graphite`) body text
- Bricolage Grotesque headings, Inter body (matches site fonts)
- Max content width: `65ch` centered
- Section spacing: `clamp(2rem, 4vw, 4rem)`
- Back link to home at top
- Footer links both pages

## Privacy Policy Content

1. **Information We Collect**
   - Contact form: name, phone, email
   - AI Smile Preview: images uploaded by user
   - WhatsApp: messages and contact details shared via WhatsApp Business API
   - Analytics: browsing behavior, referral source (no personal data stored)

2. **How We Use Your Data**
   - Respond to enquiries
   - Process booking requests
   - AI smile preview (temporary processing, images not stored long-term)
   - Improve site performance

3. **Data Storage & Security**
   - Images processed and deleted within 24 hours
   - Contact form submissions stored securely
   - No third-party data sharing except WhatsApp (subject to Meta's privacy policy)

4. **Cookies**
   - Essential cookies only (site functionality)
   - Analytics cookies (user consent required)
   - Cookie banner on first visit

5. **Your Rights**
   - Right to access, correct, or delete personal data
   - Right to withdraw consent
   - Contact: [email] / WhatsApp

6. **Data Controller**
   - Lamea Dental [sole trader]
   - [Address]
   - [Email]
   - [Phone]

## Terms and Conditions Content

1. **Services**
   - Cosmetic dental consultations and composite bonding
   - AI Smile Preview is an informational tool, not a medical diagnosis

2. **Booking & Cancellations**
   - WhatsApp or contact form booking
   - 48-hour cancellation notice
   - Appointment confirmation via WhatsApp

3. **Pricing**
   - Prices shown on site are indicative
   - Final quote provided at consultation
   - Prices subject to change

4. **AI Smile Preview**
   - For illustration purposes only
   - Not a guaranteed outcome
   - Not a substitute for professional dental advice

5. **Limitation of Liability**
   - Consultation outcomes may vary
   - Not liable for third-party service issues

6. **Governing Law**
   - Laws of England and Wales
   - Jurisdiction: courts of England and Wales

## Component Structure

```
app/
  privacy/
    page.tsx        # Privacy page
  terms/
    page.tsx        # Terms page
  layout.tsx        # Existing — already handles metadata
```

## Metadata

```tsx
export const metadata: Metadata = {
  title: 'Privacy Policy — Lamea Dental',
};
// Same pattern for terms
```

## Implementation Plan

1. Create `app/privacy/page.tsx`
2. Create `app/terms/page.tsx`
3. Add links to footer component
4. Add cookie banner component (essential + analytics toggle)
5. Verify pages render correctly

## Dependencies

- No new dependencies
- Use existing CSS variables from `globals.css`
- Reuse footer link pattern