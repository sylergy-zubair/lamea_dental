import Navigation from '@/components/Navigation/Navigation';
import Hero from '@/components/Hero/Hero';
import ValueStack from '@/components/ValueStack/ValueStack';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <ValueStack />
      <Footer />
    </main>
  );
}