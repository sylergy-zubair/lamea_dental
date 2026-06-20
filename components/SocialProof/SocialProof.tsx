import { getSiteStats } from '@/lib/wordpress/siteStats';
import SocialProofClient from './SocialProofClient';

export default async function SocialProof() {
  const stats = await getSiteStats();
  return <SocialProofClient stats={stats} />;
}
