'use client';

import dynamic from 'next/dynamic';

// Skeleton fallback for lazy-loaded sections
const SectionSkeleton = () => (
  <div className="py-24 lg:py-32">
    <div className="container-custom">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-dark-800 rounded-lg w-1/3 mx-auto" />
        <div className="h-4 bg-dark-800 rounded w-2/3 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-dark-800/50 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Dynamic import for 3D Hero to improve initial load
const Hero3D = dynamic(() => import('@/components/sections/Hero3D'), {
  ssr: false,
  loading: () => (
    <section className="min-h-screen flex items-center justify-center bg-dark-950">
      <div className="animate-pulse text-violet-400">Chargement...</div>
    </section>
  ),
});

// Lazy-load all sections below the fold for better initial performance
const Services = dynamic(() => import('@/components/sections/Services'), {
  loading: () => <SectionSkeleton />,
});

const Technologies = dynamic(() => import('@/components/sections/Technologies'), {
  loading: () => <SectionSkeleton />,
});

const Portfolio = dynamic(() => import('@/components/sections/Portfolio'), {
  loading: () => <SectionSkeleton />,
});

const Process = dynamic(() => import('@/components/sections/Process'), {
  loading: () => <SectionSkeleton />,
});

const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <SectionSkeleton />,
});

const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <SectionSkeleton />,
});

const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <SectionSkeleton />,
});

const CTABanner = dynamic(() => import('@/components/sections/CTABanner'), {
  loading: () => <SectionSkeleton />,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  return (
    <>
      <Hero3D />
      <Services />
      <Technologies />
      <Portfolio />
      <Process />
      <About />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Contact />
    </>
  );
}
