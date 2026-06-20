import type { Answers, Recommendation } from './types';

const TREATMENT_PRICES: Record<string, string> = {
  'Composite Bonding': '£150–£400 per tooth',
  'Composite Bonding — Multiple Teeth': '£500–£1,200',
  'Full Arch Bonding': '£2,595–£4,795',
  'Teeth Whitening': '£250–£500',
  'Smile Makeover': '£800–£2,500',
};

export function getRecommendation(answers: Answers): Recommendation | null {
  const { concern, teeth, budget, timeline } = answers;
  if (!concern || !teeth || !budget || !timeline) return null;

  // Discoloration → Whitening
  if (concern === 'discoloration') {
    return {
      treatment: 'Teeth Whitening',
      subtitle: 'Discolouration Treatment',
      priceRange: TREATMENT_PRICES['Teeth Whitening'],
      visits: '1–2 visits',
      timelineText: 'Results in 2–3 weeks',
      badge: timeline === 'exploring' ? 'free-consultation' : undefined,
      cta: 'Book Free Consultation',
      description:
        'Professional whitening lifts staining and brightens your natural teeth. We combine in-clinic treatment with custom trays for home use.',
    };
  }

  // Crowding → Orthodontic
  if (concern === 'crowding') {
    return {
      treatment: 'Orthodontic Consultation',
      subtitle: 'Alignment Assessment Needed',
      priceRange: 'Free initial consultation',
      visits: '1 visit',
      timelineText: 'Assessment + treatment plan',
      badge: 'orthodontic',
      cta: 'Book Free Assessment',
      description:
        "Crowding and misalignment may require orthodontics before cosmetic work. We'll assess what's possible with composite bonding vs braces.",
    };
  }

  // Shape + most teeth → Smile Makeover
  if (concern === 'shape' && teeth === 'most') {
    return {
      treatment: 'Smile Makeover',
      subtitle: 'Full Arch Reshaping',
      priceRange: TREATMENT_PRICES['Smile Makeover'],
      visits: '2–3 visits',
      timelineText: 'Plan + execution over 1–2 months',
      badge: budget === '3000-plus' ? 'same-day' : undefined,
      cta: 'Book Free Consultation',
      description:
        'Multiple teeth with shape concerns are best addressed through a full smile makeover plan, combining bonding with other techniques.',
    };
  }

  // Gap / Chip / Shape — determine treatment based on teeth count
  let treatment = '';
  if (teeth === '1-2') {
    treatment = 'Composite Bonding';
  } else if (teeth === '3-6') {
    treatment = 'Composite Bonding — Multiple Teeth';
  } else {
    treatment = 'Full Arch Bonding';
  }

  const subtitleMap: Record<string, string> = {
    gaps: 'Gap Closure',
    chips: 'Chip Repair',
    shape: 'Shape Enhancement',
  };

  const visitsMap: Record<string, string> = {
    '1-2': '1 visit',
    '3-6': '1–2 visits',
    most: '2–3 visits',
  };

  const timelineTextMap: Record<string, string> = {
    asap: 'Same-day treatment available',
    '1-3-months': 'Book within 1–3 months',
    '3-6-months': 'Plan for 3–6 months',
    exploring: "No pressure — start when you're ready",
  };

  let badge: Recommendation['badge'] = undefined;
  if (budget === 'under-500') badge = 'finance-option';
  if (timeline === 'asap') badge = 'same-day';
  if (timeline === 'exploring') badge = 'free-consultation';

  return {
    treatment,
    subtitle: `${subtitleMap[concern]} — ${treatment}`,
    priceRange: TREATMENT_PRICES[treatment] ?? 'From £350 per tooth',
    visits: visitsMap[teeth],
    timelineText: timelineTextMap[timeline],
    badge,
    cta: 'Book Free Consultation',
    description: `Composite bonding corrects ${concern} using tooth-coloured resin, shaped to match your natural smile. Long-lasting, minimally invasive.`,
  };
}
