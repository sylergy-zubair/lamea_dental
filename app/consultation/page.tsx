import type { Metadata } from 'next';
import ConsultationForm from './ConsultationForm';

export const metadata: Metadata = {
  title: 'Online Consultation — Lamea Dental',
  description:
    'Share your details and a quick photo, then choose an evening slot.',
};

export default function ConsultationPage() {
  return (
    <main>
      <ConsultationForm />
    </main>
  );
}
