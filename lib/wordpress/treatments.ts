import { graphqlFetch } from './client';
import type { Treatment } from './types';

const TREATMENTS_QUERY = `
  query Treatments {
    treatments {
      nodes {
        id
        title
        excerpt
        treatmentFields {
          priceFrom
          priceTo
          includes
          visitsCount
          financeAvailable
        }
        treatmentCategory {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

type TreatmentsResponse = {
  treatments: {
    nodes: Array<{
      id: string;
      title: string;
      excerpt: string;
      treatmentFields?: {
        priceFrom?: number;
        priceTo?: number;
        includes?: string;
        visitsCount?: string;
        financeAvailable?: boolean;
      };
      treatmentCategory?: {
        nodes: Array<{ name: string }>;
      };
      featuredImage?: {
        node: {
          sourceUrl: string;
          altText: string;
        };
      };
    }>;
  };
};

export async function getTreatments(): Promise<Treatment[]> {
  try {
    const data = await graphqlFetch<TreatmentsResponse>(TREATMENTS_QUERY);
    return data.treatments.nodes.map((node) => ({
      id: node.id,
      title: node.title,
      excerpt: node.excerpt ?? '',
      priceFrom: node.treatmentFields?.priceFrom ?? 0,
      priceTo: node.treatmentFields?.priceTo ?? 0,
      includes: node.treatmentFields?.includes ?? '',
      visitsCount: node.treatmentFields?.visitsCount ?? '',
      financeAvailable: node.treatmentFields?.financeAvailable ?? false,
      category: node.treatmentCategory?.nodes?.[0]?.name ?? 'General',
      featuredImage: node.featuredImage?.node?.sourceUrl,
    }));
  } catch (err) {
    console.error('[WP] getTreatments failed, using fallback:', err);
    return fallbackTreatments;
  }
}

export const fallbackTreatments: Treatment[] = [
  {
    id: 'fallback-1',
    title: 'Composite Bonding',
    excerpt: '',
    priceFrom: 150,
    priceTo: 400,
    includes: 'Material, application, shaping, and polish',
    visitsCount: '1 visit',
    financeAvailable: true,
    category: 'Bonding',
    featuredImage: undefined,
  },
  {
    id: 'fallback-2',
    title: 'Teeth Whitening',
    excerpt: '',
    priceFrom: 250,
    priceTo: 500,
    includes: 'In-clinic session plus custom trays for home',
    visitsCount: '1–2 visits',
    financeAvailable: true,
    category: 'Whitening',
    featuredImage: undefined,
  },
  {
    id: 'fallback-3',
    title: 'Smile Makeover',
    excerpt: '',
    priceFrom: 800,
    priceTo: 2500,
    includes: 'Full assessment, personalised treatment plan, composite work',
    visitsCount: '2–3 visits',
    financeAvailable: true,
    category: 'Makeover',
    featuredImage: undefined,
  },
  {
    id: 'fallback-4',
    title: 'Tooth Recontouring',
    excerpt: '',
    priceFrom: 100,
    priceTo: 300,
    includes: 'Shaping, polishing, minor adjustments',
    visitsCount: '1 visit',
    financeAvailable: true,
    category: 'Contouring',
    featuredImage: undefined,
  },
  {
    id: 'fallback-5',
    title: 'Chip Repair',
    excerpt: '',
    priceFrom: 100,
    priceTo: 250,
    includes: 'Single tooth repair with natural colour match',
    visitsCount: '1 visit',
    financeAvailable: true,
    category: 'Bonding',
    featuredImage: undefined,
  },
];
