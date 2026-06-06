import Navigation from '@/components/Navigation/Navigation';
import Hero from '@/components/Hero/Hero';
import SocialProof from '@/components/SocialProof/SocialProof';
import TreatmentCards from '@/components/TreatmentCards/TreatmentCards';
import ValueStack from '@/components/ValueStack/ValueStack';
import AIPreview from '@/components/AIPreview/AIPreview';
import ContactForm from '@/components/ContactForm/ContactForm';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <SocialProof />
      <TreatmentCards />
      <ValueStack />
      <AIPreview />
      <ContactForm />
      <Footer />
    </main>
  );
}