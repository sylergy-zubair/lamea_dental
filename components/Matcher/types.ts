export type Concern = 'gaps' | 'chips' | 'shape' | 'discoloration' | 'crowding';
export type TeethCount = '1-2' | '3-6' | 'most';
export type Budget = 'under-500' | '500-1500' | '1500-3000' | '3000-plus';
export type Timeline = 'asap' | '1-3-months' | '3-6-months' | 'exploring';

export type Answers = {
  concern?: Concern;
  teeth?: TeethCount;
  budget?: Budget;
  timeline?: Timeline;
};

export type Recommendation = {
  treatment: string;
  subtitle: string;
  priceRange: string;
  visits: string;
  timelineText: string;
  badge?: 'same-day' | 'free-consultation' | 'finance-option' | 'orthodontic';
  cta: string;
  description: string;
};
