import { graphqlFetch } from './client';
import type { SiteStat } from './types';

const SITE_STATS_QUERY = `
  query SiteStats {
    siteStats {
      nodes {
        id
        title
        siteStatFields {
          statValue
          statLabel
        }
      }
    }
  }
`;

type SiteStatsResponse = {
  siteStats: {
    nodes: Array<{
      id: string;
      title: string;
      siteStatFields?: {
        statValue?: string;
        statLabel?: string;
      };
    }>;
  };
};

export async function getSiteStats(): Promise<SiteStat[]> {
  try {
    const data = await graphqlFetch<SiteStatsResponse>(SITE_STATS_QUERY);
    return data.siteStats.nodes.map((node) => ({
      id: node.id,
      title: node.title,
      value: node.siteStatFields?.statValue ?? node.title,
      label: node.siteStatFields?.statLabel ?? '',
    }));
  } catch (err) {
    console.error('[WP] getSiteStats failed, using fallback:', err);
    return fallbackSiteStats;
  }
}

export const fallbackSiteStats: SiteStat[] = [
  { id: 'fallback-1', title: '500+', value: '500+', label: 'Smiles delivered' },
  { id: 'fallback-2', title: '15+ years', value: '15+', label: 'Years experience' },
  { id: 'fallback-3', title: '4.9', value: '4.9', label: 'Star rating' },
  { id: 'fallback-4', title: '100%', value: '100%', label: 'Transparent pricing' },
];
