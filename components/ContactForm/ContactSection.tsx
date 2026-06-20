import { getSiteSettings } from '@/lib/wordpress/siteSettings';
import ContactFormClient from './ContactFormClient';

export default async function ContactSection() {
  const settings = await getSiteSettings();
  return <ContactFormClient settings={settings} />;
}
