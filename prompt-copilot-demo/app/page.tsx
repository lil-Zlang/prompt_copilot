import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PromptDemo from '@/components/PromptDemo';
import Examples from '@/components/Examples';
import DemoVideo from '@/components/DemoVideo';
import ExtensionDownload from '@/components/ExtensionDownload';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <PromptDemo />
      <Examples />
      <DemoVideo />
      <ExtensionDownload />
      <FAQ />
      <Footer />
    </main>
  );
}

