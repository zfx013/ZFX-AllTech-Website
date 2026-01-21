'use client';

import React from 'react';
import {
  ScrollReveal,
  TextReveal,
  ParallaxElement,
  StaggerContainer,
  CountUp,
} from '@/components/animations';
import SmoothScrollProvider from '@/components/animations/SmoothScrollProvider';

/**
 * Animation Demo Page
 *
 * This page demonstrates all available GSAP scroll animations and components.
 * Use this as a reference for implementing animations in your project.
 */
export default function AnimationDemoPage() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Hero Section with Text Reveal */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <TextReveal type="lines" stagger={0.1} delay={0.2}>
              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                GSAP Scroll
                <br />
                Animations
              </h1>
            </TextReveal>

            <ScrollReveal animation="fadeInUp" delay={0.8}>
              <p className="text-xl md:text-2xl text-gray-400 mb-8">
                Professional scroll-triggered animations for Next.js
              </p>
            </ScrollReveal>

            <ScrollReveal animation="scaleIn" delay={1.2}>
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-colors">
                Get Started
              </button>
            </ScrollReveal>
          </div>
        </section>

        {/* Fade In Animations */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl font-bold mb-16 text-center">
                Fade In Animations
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal animation="fadeInUp" delay={0.1}>
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">Fade In Up</h3>
                  <p className="text-gray-400">
                    Elements fade in while moving upward
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeInLeft" delay={0.2}>
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">Fade In Left</h3>
                  <p className="text-gray-400">
                    Elements slide in from the left side
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeInRight" delay={0.3}>
                <div className="bg-gray-800 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">Fade In Right</h3>
                  <p className="text-gray-400">
                    Elements slide in from the right side
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stagger Animations */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl font-bold mb-16 text-center">
                Stagger Effects
              </h2>
            </ScrollReveal>

            <StaggerContainer
              animation="scaleIn"
              stagger={0.1}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div
                  key={num}
                  className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
                >
                  <span className="text-4xl font-bold">{num}</span>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Counter Animations */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl font-bold mb-16 text-center">
                Animated Counters
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal animation="fadeInUp" delay={0.1}>
                <div className="text-center p-8 bg-gray-800 rounded-2xl">
                  <CountUp
                    endValue={1000}
                    suffix="+"
                    duration={2.5}
                    className="text-6xl font-bold text-blue-500 block mb-4"
                  />
                  <p className="text-gray-400">Happy Clients</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeInUp" delay={0.2}>
                <div className="text-center p-8 bg-gray-800 rounded-2xl">
                  <CountUp
                    endValue={99.9}
                    decimals={1}
                    suffix="%"
                    duration={2.5}
                    className="text-6xl font-bold text-green-500 block mb-4"
                  />
                  <p className="text-gray-400">Success Rate</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeInUp" delay={0.3}>
                <div className="text-center p-8 bg-gray-800 rounded-2xl">
                  <CountUp
                    endValue={50}
                    suffix="+"
                    duration={2.5}
                    className="text-6xl font-bold text-purple-500 block mb-4"
                  />
                  <p className="text-gray-400">Team Members</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Parallax Section */}
        <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
          <ParallaxElement speed={50} className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
          </ParallaxElement>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl font-bold mb-8">Parallax Effect</h2>
              <p className="text-xl text-gray-300">
                The background moves at a different speed creating depth
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Text Reveal Variations */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl font-bold mb-16 text-center">
                Text Reveal Animations
              </h2>
            </ScrollReveal>

            <div className="space-y-12">
              <TextReveal type="lines" stagger={0.1}>
                <p className="text-3xl leading-relaxed">
                  This text reveals line by line with a smooth stagger effect.
                  Each line appears sequentially as you scroll.
                </p>
              </TextReveal>

              <TextReveal type="words" stagger={0.05} delay={0.3}>
                <p className="text-2xl leading-relaxed text-gray-400">
                  While this text reveals word by word, creating a typewriter-like
                  effect that's perfect for emphasis.
                </p>
              </TextReveal>
            </div>
          </div>
        </section>

        {/* Scale Animations */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl font-bold mb-16 text-center">
                Scale Animations
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ScrollReveal animation="scaleIn" delay={0.2}>
                <div className="aspect-video bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl flex items-center justify-center">
                  <h3 className="text-3xl font-bold">Scale In</h3>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="scaleInRotate" delay={0.4}>
                <div className="aspect-video bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center">
                  <h3 className="text-3xl font-bold">Scale + Rotate</h3>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Add Animations?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Check the source code to see how these animations are implemented
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-lg font-semibold transition-all">
                View Documentation
              </button>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </SmoothScrollProvider>
  );
}
