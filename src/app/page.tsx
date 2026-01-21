'use client';

import dynamic from 'next/dynamic';
import Services from '@/components/sections/Services';
import Technologies from '@/components/sections/Technologies';
import Portfolio from '@/components/sections/Portfolio';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Process from '@/components/sections/Process';
import FAQ from '@/components/sections/FAQ';
import CTABanner from '@/components/sections/CTABanner';
import Contact from '@/components/sections/Contact';

// Dynamic import for 3D Hero to improve initial load
const Hero3D = dynamic(() => import('@/components/sections/Hero3D'), {
  ssr: false,
  loading: () => (
    <section className="min-h-screen flex items-center justify-center bg-dark-950">
      <div className="animate-pulse text-violet-400">Chargement...</div>
    </section>
  ),
});

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero3D />
      <div className="py-20 md:py-28 lg:py-36">
        <Services />
      </div>
      <div className="py-20 md:py-28 lg:py-36">
        <Technologies />
      </div>
      <div className="py-20 md:py-28 lg:py-36">
        <Portfolio />
      </div>
      <div className="py-20 md:py-28 lg:py-36">
        <Process />
      </div>
      <div className="py-20 md:py-28 lg:py-36">
        <About />
      </div>
      <div className="py-20 md:py-28 lg:py-36">
        <Testimonials />
      </div>
      <div className="py-20 md:py-28 lg:py-36">
        <FAQ />
      </div>
      <div className="py-20 md:py-28 lg:py-36">
        <CTABanner />
      </div>
      <div className="py-20 md:py-28 lg:py-36">
        <Contact />
      </div>
    </div>
  );
}
