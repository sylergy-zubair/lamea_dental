export type Treatment = {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  priceFrom: number;
  priceTo: number;
  includes: string;
  visitsCount: string;
  financeAvailable: boolean;
  category: string;
  featuredImage?: string;
};

export type ResultCase = {
  id: string;
  title: string;
  excerpt: string;
  treatmentType: string;
  concernTag: string;
  caseDescription: string;
  caseCost: string;
  beforeImage: string;
  afterImage: string;
};

export type Faq = {
  id: string;
  title: string;
  content: string;
};

export type TeamMember = {
  id: string;
  title: string;
  role: string;
  bio: string;
  featuredImage?: string;
  highlightOrder: number;
};

export type SiteStat = {
  id: string;
  title: string;
  value: string;
  label: string;
};

export type SiteSettings = {
  whatsappNumber: string;
  contactEmail: string;
  clinicAddress: string;
  clinicPhone: string;
  clinicHours: string;
  footerTagline: string;
  footerDescription: string;
};
