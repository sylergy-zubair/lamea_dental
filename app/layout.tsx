import type { Metadata } from 'next';
import { Inter, Bricolage_Grotesque, Forum, Jost } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';
import WhatsAppBubble from '@/components/WhatsAppBubble/WhatsAppBubble';

const inter = Inter({ subsets: ['latin'] });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-heading' });
const forum = Forum({ subsets: ['latin'], weight: '400', variable: '--font-forum' });
const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });

export const metadata: Metadata = {
  title: 'Lamea Dental — Affordable Composite Bonding',
  description: 'Transform your smile with expert composite bonding. Transparent pricing, AI smile preview, and same-day results.',
  icons: {
    icon: '/s_favi.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${bricolage.variable} ${forum.variable} ${jost.variable}`}>
        <Navigation />
        {children}
        <Footer />
        <WhatsAppBubble />
      </body>
    </html>
  );
}