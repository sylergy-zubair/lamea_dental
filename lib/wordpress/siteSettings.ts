import { graphqlFetch } from './client';
import type { SiteSettings } from './types';

const SITE_SETTINGS_QUERY = `
  query SiteSettings {
    siteSettings {
      whatsappNumber
      contactEmail
      clinicAddress
      clinicPhone
      clinicHours
      footerTagline
      footerDescription
    }
  }
`;

type SiteSettingsResponse = {
  siteSettings: Partial<SiteSettings>;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const data = await graphqlFetch<SiteSettingsResponse>(SITE_SETTINGS_QUERY);
    return {
      whatsappNumber: data.siteSettings?.whatsappNumber ?? fallbackSiteSettings.whatsappNumber,
      contactEmail: data.siteSettings?.contactEmail ?? fallbackSiteSettings.contactEmail,
      clinicAddress: data.siteSettings?.clinicAddress ?? fallbackSiteSettings.clinicAddress,
      clinicPhone: data.siteSettings?.clinicPhone ?? fallbackSiteSettings.clinicPhone,
      clinicHours: data.siteSettings?.clinicHours ?? fallbackSiteSettings.clinicHours,
      footerTagline: data.siteSettings?.footerTagline ?? fallbackSiteSettings.footerTagline,
      footerDescription:
        data.siteSettings?.footerDescription ?? fallbackSiteSettings.footerDescription,
    };
  } catch (err) {
    console.error('[WP] getSiteSettings failed, using fallback:', err);
    return fallbackSiteSettings;
  }
}

export const fallbackSiteSettings: SiteSettings = {
  whatsappNumber: '447700000000',
  contactEmail: 'hello@lameadental.co.uk',
  clinicAddress: 'The Green Garage\n126 Ashley Rd\nHale, Altrincham WA14 2UN, UK',
  clinicPhone: '+44',
  clinicHours: 'Mon–Sat 9am–6pm',
  footerTagline: 'Expert composite bonding in London.',
  footerDescription:
    "Honest pricing. Calm environment. Results that look like you — only more confident.",
};
