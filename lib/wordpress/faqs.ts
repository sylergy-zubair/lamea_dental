import { graphqlFetch } from './client';
import type { Faq } from './types';

const FAQS_QUERY = `
  query FAQs {
    faqs {
      nodes {
        id
        title
        content
      }
    }
  }
`;

type FaqsResponse = {
  faqs: {
    nodes: Array<{
      id: string;
      title: string;
      content?: string;
    }>;
  };
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&bull;/g, '•')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export async function getFaqs(): Promise<Faq[]> {
  try {
    const data = await graphqlFetch<FaqsResponse>(FAQS_QUERY);
    return data.faqs.nodes.map((node) => ({
      id: node.id,
      title: node.title,
      content: stripHtml(node.content ?? ''),
    }));
  } catch (err) {
    console.error('[WP] getFaqs failed, using fallback:', err);
    return fallbackFaqs;
  }
}

export const fallbackFaqs: Faq[] = [
  {
    id: 'fallback-1',
    title: 'How long does composite bonding last?',
    content:
      "With proper care, composite bonding typically lasts 5-8 years before any refinishing is needed. It depends on factors like biting habits, oral hygiene, and diet. We use high-quality materials designed for durability, and we'll advise you on how to make it last.",
  },
  {
    id: 'fallback-2',
    title: 'Is composite bonding reversible?',
    content:
      "Yes — one of the key advantages of composite bonding is that it's reversible. The procedure involves adding material to your teeth, not removing enamel like some other treatments. If your needs change, the bonding can be adjusted or removed by a dentist.",
  },
  {
    id: 'fallback-3',
    title: "What's the difference between composite bonding and veneers?",
    content:
      "Composite bonding uses a tooth-coloured resin applied directly to your teeth, sculpted and polished in a single visit. Veneers are thin porcelain shells custom-made in a lab and cemented to your teeth — requiring enamel removal and multiple visits. Bonding is less invasive, more affordable, and fully reversible.",
  },
  {
    id: 'fallback-4',
    title: 'How does the AI Smile Preview work?',
    content:
      "Upload a photo of your smile and our AI tool will show you a preview of what composite bonding could look like for you. It's an illustrative guide — not a medical diagnosis or guaranteed outcome — but it helps you visualise possibilities before your consultation.",
  },
  {
    id: 'fallback-5',
    title: 'What is your cancellation policy?',
    content:
      'We ask for at least 48 hours notice if you need to reschedule or cancel. This lets us offer your slot to another patient. Late cancellations or missed appointments without notice may incur a fee. To reschedule, just message us on WhatsApp.',
  },
];
