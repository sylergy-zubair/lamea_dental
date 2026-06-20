import { graphqlFetch } from './client';
import type { ResultCase } from './types';

const RESULT_CASES_QUERY = `
  query ResultCases {
    resultCases {
      nodes {
        id
        title
        excerpt
        resultCaseFields {
          treatmentType
          concernTag
          caseDescription
          caseCost
          beforeImage {
            sourceUrl
            altText
          }
          afterImage {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

type ResultCasesResponse = {
  resultCases: {
    nodes: Array<{
      id: string;
      title: string;
      excerpt?: string;
      resultCaseFields?: {
        treatmentType?: string;
        concernTag?: string;
        caseDescription?: string;
        caseCost?: string;
        beforeImage?: { sourceUrl: string; altText?: string };
        afterImage?: { sourceUrl: string; altText?: string };
      };
    }>;
  };
};

export async function getResultCases(): Promise<ResultCase[]> {
  try {
    const data = await graphqlFetch<ResultCasesResponse>(RESULT_CASES_QUERY);
    return data.resultCases.nodes.map((node) => ({
      id: node.id,
      title: node.title,
      excerpt: node.excerpt ?? '',
      treatmentType: node.resultCaseFields?.treatmentType ?? '',
      concernTag: node.resultCaseFields?.concernTag ?? '',
      caseDescription: node.resultCaseFields?.caseDescription ?? '',
      caseCost: node.resultCaseFields?.caseCost ?? '',
      beforeImage: node.resultCaseFields?.beforeImage?.sourceUrl ?? '',
      afterImage: node.resultCaseFields?.afterImage?.sourceUrl ?? '',
    }));
  } catch (err) {
    console.error('[WP] getResultCases failed, using fallback:', err);
    return fallbackResultCases;
  }
}

export const fallbackResultCases: ResultCase[] = [
  {
    id: 'fallback-1',
    title: 'Composite Bonding — Gaps',
    excerpt: 'Closed spacing between front teeth with natural-looking composite',
    treatmentType: 'Composite Bonding',
    concernTag: 'gaps',
    caseDescription: 'Closed spacing between front teeth with natural-looking composite',
    caseCost: '£600',
    beforeImage: 'https://picsum.photos/seed/lamea-result-1/600/500',
    afterImage: 'https://picsum.photos/seed/lamea-result-1/600/500',
  },
  {
    id: 'fallback-2',
    title: 'Composite Bonding — Chipped Tooth',
    excerpt: 'Restored a chipped front tooth to match surrounding teeth',
    treatmentType: 'Composite Bonding',
    concernTag: 'chips',
    caseDescription: 'Restored a chipped front tooth to match surrounding teeth',
    caseCost: '£300',
    beforeImage: 'https://picsum.photos/seed/lamea-result-2/600/500',
    afterImage: 'https://picsum.photos/seed/lamea-result-2/600/500',
  },
  {
    id: 'fallback-3',
    title: 'Composite Bonding — Discoloration',
    excerpt: 'Masked stubborn discoloration for a uniform, bright smile',
    treatmentType: 'Composite Bonding',
    concernTag: 'discoloration',
    caseDescription: 'Masked stubborn discoloration for a uniform, bright smile',
    caseCost: '£500',
    beforeImage: 'https://picsum.photos/seed/lamea-result-3/600/500',
    afterImage: 'https://picsum.photos/seed/lamea-result-3/600/500',
  },
  {
    id: 'fallback-4',
    title: 'Composite Bonding — Shape',
    excerpt: 'Reshaped worn-down teeth for a more balanced smile line',
    treatmentType: 'Composite Bonding',
    concernTag: 'shape',
    caseDescription: 'Reshaped worn-down teeth for a more balanced smile line',
    caseCost: '£700',
    beforeImage: 'https://picsum.photos/seed/lamea-result-4/600/500',
    afterImage: 'https://picsum.photos/seed/lamea-result-4/600/500',
  },
];
