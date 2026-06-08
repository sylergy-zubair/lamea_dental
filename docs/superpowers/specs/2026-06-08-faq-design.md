# FAQ Page — Design Spec

## Overview

FAQ page for Lamea Dental. 5 questions in accordion format — single item open at a time.

## Page Structure

```
/app/faq/page.tsx
/app/faq/faq.module.css
```

## Sections

### 1. Hero
- Headline: "Common Questions"
- Subtext: "Quick answers to help you decide — or reach out if you need more."
- `--smoke` divider below

### 2. FAQ Accordion
- 5 FAQ items, single-expand behavior (opening one closes others)
- Each item: question (clickable) + answer (collapsible)
- Question: text left, chevron icon right
- Chevron rotates 180° when open
- Answer: smooth height transition, charcoal body text
- Items separated by subtle `--smoke` dividers

**Questions and Answers:**

1. **How long does composite bonding last?**
   With proper care, composite bonding typically lasts 5-8 years before any refinishing is needed. It depends on factors like biting habits, oral hygiene, and diet. We use high-quality materials designed for durability, and we'll advise you on how to make it last.

2. **Is composite bonding reversible?**
   Yes — one of the key advantages of composite bonding is that it's reversible. The procedure involves adding material to your teeth, not removing enamel like some other treatments. If your needs change, the bonding can be adjusted or removed by a dentist.

3. **What's the difference between composite bonding and veneers?**
   Composite bonding uses a tooth-coloured resin applied directly to your teeth, sculpted and polished in a single visit. Veneers are thin porcelain shells custom-made in a lab and cemented to your teeth — requiring enamel removal and multiple visits. Bonding is less invasive, more affordable, and fully reversible.

4. **How does the AI Smile Preview work?**
   Upload a photo of your smile and our AI tool will show you a preview of what composite bonding could look like for you. It's an illustrative guide — not a medical diagnosis or guaranteed outcome — but it helps you visualise possibilities before your consultation.

5. **What is your cancellation policy?**
   We ask for at least 48 hours notice if you need to reschedule or cancel. This lets us offer your slot to another patient. Late cancellations or missed appointments without notice may incur a fee. To reschedule, just message us on WhatsApp.

## Interaction

- Back link: uppercase tracked label with line extension on hover
- Accordion item click: toggles open/closed, closes other open items
- Chevron: rotates 180° when open
- Answer: height animates from 0 to auto on open, reverse on close
- Hover on question: subtle background tint

## Design Tokens

- Background: `var(--bone)`
- Headings: `var(--charcoal)`
- Body: `var(--graphite)`
- Muted: `var(--silver)`
- Dividers: `var(--smoke)`
- Accordion item padding: `1.5rem 0`
- Border radius: not used (flat list items)
- Max content width: `65ch`
- Section spacing: `clamp(60px, 8vw, 120px)`

## Accordion State

```tsx
const [openIndex, setOpenIndex] = useState<number | null>(null);

const toggle = (i: number) => {
  setOpenIndex(openIndex === i ? null : i);
};
```

## Implementation Order

1. Create `app/faq/page.tsx` and `faq.module.css`
2. Hero section
3. Accordion with 5 items (single-expand)
4. CTA section
5. Verify build

## Dependencies

- No new dependencies
- Reuse `globals.css` tokens
- Match other page patterns
- React useState for accordion state