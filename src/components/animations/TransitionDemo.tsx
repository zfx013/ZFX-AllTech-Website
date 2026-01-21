'use client';

import { useState } from 'react';
import TransitionLink from './TransitionLink';
import type { TransitionType } from './PageTransition';

/**
 * TransitionDemo - Interactive demo component
 *
 * Showcases all available transition types with live previews.
 * Use this as a reference or testing component.
 *
 * Usage:
 * ```tsx
 * import TransitionDemo from '@/components/animations/TransitionDemo';
 *
 * export default function TestPage() {
 *   return <TransitionDemo />;
 * }
 * ```
 */
export default function TransitionDemo() {
  const [activeTransition, setActiveTransition] = useState<TransitionType>('fade');

  const transitions: { type: TransitionType; label: string; description: string }[] = [
    {
      type: 'fade',
      label: 'Fade',
      description: 'Clean opacity transition - professional and subtle',
    },
    {
      type: 'slide',
      label: 'Slide',
      description: 'Directional slide with fade - dynamic and modern',
    },
    {
      type: 'clip',
      label: 'Clip',
      description: 'Clip-path reveal - premium and eye-catching',
    },
  ];

  const demoPages = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-950 to-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Page Transition Demo
          </h1>
          <p className="text-dark-300 text-lg">
            Test all transition types with live navigation
          </p>
        </div>

        {/* Transition Type Selector */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Select Transition Type
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {transitions.map((transition) => (
              <button
                key={transition.type}
                onClick={() => setActiveTransition(transition.type)}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  activeTransition === transition.type
                    ? 'bg-primary-500 border-2 border-primary-400 shadow-lg shadow-primary-500/20'
                    : 'bg-dark-800 border-2 border-dark-700 hover:border-dark-600'
                }`}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {transition.label}
                </h3>
                <p className="text-sm text-dark-300">
                  {transition.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Demo Links */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Test Navigation (Current: {activeTransition})
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {demoPages.map((page) => (
              <TransitionLink
                key={page.href}
                href={page.href}
                transitionType={activeTransition}
                duration={0.6}
                className="group relative px-6 py-4 bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 rounded-xl hover:border-primary-500 transition-all duration-300 text-center"
              >
                <span className="text-white font-medium group-hover:text-primary-400 transition-colors">
                  {page.label}
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-primary-500/5 rounded-xl transition-all duration-300" />
              </TransitionLink>
            ))}
          </div>
          <p className="text-sm text-dark-400 mt-6 text-center">
            Click any link to see the {activeTransition} transition in action
          </p>
        </div>

        {/* Code Examples */}
        <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Implementation Code
          </h2>

          {/* Layout Example */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary-400 mb-3">
              1. Layout Setup (layout.tsx)
            </h3>
            <pre className="bg-dark-950 border border-dark-800 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-dark-200 font-mono">
{`import { PageTransitionWrapper } from '@/components/animations';

export default function RootLayout({ children }) {
  return (
    <PageTransitionWrapper type="${activeTransition}" duration={0.6}>
      <main>{children}</main>
    </PageTransitionWrapper>
  );
}`}
              </code>
            </pre>
          </div>

          {/* Link Example */}
          <div>
            <h3 className="text-lg font-semibold text-primary-400 mb-3">
              2. Navigation Links
            </h3>
            <pre className="bg-dark-950 border border-dark-800 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-dark-200 font-mono">
{`import { TransitionLink } from '@/components/animations';

<TransitionLink
  href="/about"
  transitionType="${activeTransition}"
  duration={0.6}
>
  About Us
</TransitionLink>`}
              </code>
            </pre>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-dark-900/30 border border-dark-800 rounded-xl p-6">
            <div className="text-primary-400 text-2xl mb-3">⚡</div>
            <h3 className="text-white font-semibold mb-2">Optimized Performance</h3>
            <p className="text-dark-300 text-sm">
              GPU-accelerated animations for buttery smooth 60fps transitions
            </p>
          </div>
          <div className="bg-dark-900/30 border border-dark-800 rounded-xl p-6">
            <div className="text-primary-400 text-2xl mb-3">♿</div>
            <h3 className="text-white font-semibold mb-2">Accessible</h3>
            <p className="text-dark-300 text-sm">
              Respects prefers-reduced-motion for users with motion sensitivity
            </p>
          </div>
          <div className="bg-dark-900/30 border border-dark-800 rounded-xl p-6">
            <div className="text-primary-400 text-2xl mb-3">🎨</div>
            <h3 className="text-white font-semibold mb-2">Customizable</h3>
            <p className="text-dark-300 text-sm">
              Easily adjust duration, easing, and transition types per route
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
