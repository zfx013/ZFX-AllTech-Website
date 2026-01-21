'use client';

import React from 'react';
import {
  ScrollReveal,
  TextReveal,
  ParallaxElement,
  StaggerContainer,
  CountUp,
  MagneticButton,
  HorizontalScroll,
  PinSection,
  SmoothScrollProvider,
} from '@/components/animations';

/**
 * GSAP Showcase Page
 *
 * A comprehensive showcase of all GSAP animation components and features.
 * This serves as both a demo and a code reference for implementation.
 */
export default function GSAPShowcasePage() {
  return (
    <SmoothScrollProvider>
      <div className="bg-black text-white">
        {/* Hero Section - Text Reveal */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-5xl mx-auto text-center">
            <TextReveal type="lines" stagger={0.08} delay={0.2}>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                GSAP Animation
                <br />
                Showcase
              </h1>
            </TextReveal>

            <ScrollReveal animation="fadeInUp" delay={1}>
              <p className="text-xl md:text-2xl text-gray-400 mb-12">
                Professional scroll animations for Next.js
              </p>
            </ScrollReveal>

            <MagneticButton strength={0.4}>
              <ScrollReveal animation="scaleIn" delay={1.4}>
                <button className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-shadow">
                  Explore Animations
                </button>
              </ScrollReveal>
            </MagneticButton>
          </div>
        </section>

        {/* Fade Animations Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-7xl mx-auto w-full">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center">
                Fade Animations
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ScrollReveal animation="fadeInUp" delay={0.1}>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl min-h-[250px] flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-3">Fade In Up</h3>
                  <p className="text-blue-100">From bottom to top</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeInDown" delay={0.2}>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-8 rounded-2xl min-h-[250px] flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-3">Fade In Down</h3>
                  <p className="text-purple-100">From top to bottom</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeInLeft" delay={0.3}>
                <div className="bg-gradient-to-br from-pink-600 to-pink-800 p-8 rounded-2xl min-h-[250px] flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-3">Fade In Left</h3>
                  <p className="text-pink-100">From left to right</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeInRight" delay={0.4}>
                <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 p-8 rounded-2xl min-h-[250px] flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-3">Fade In Right</h3>
                  <p className="text-cyan-100">From right to left</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stagger Animation Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-7xl mx-auto w-full">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center">
                Stagger Effects
              </h2>
            </ScrollReveal>

            <StaggerContainer
              animation="scaleIn"
              stagger={0.08}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl font-bold hover:scale-110 transition-transform cursor-pointer"
                >
                  {i + 1}
                </div>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Counter Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-7xl mx-auto w-full">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center">
                Animated Counters
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <ScrollReveal animation="fadeInUp" delay={0.1}>
                <div className="text-center p-10 bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur rounded-3xl border border-blue-700/50">
                  <CountUp
                    endValue={5000}
                    suffix="+"
                    duration={2.5}
                    className="text-6xl font-bold text-blue-400 block mb-4"
                  />
                  <p className="text-gray-300 text-lg">Projects Completed</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeInUp" delay={0.2}>
                <div className="text-center p-10 bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur rounded-3xl border border-green-700/50">
                  <CountUp
                    endValue={99.9}
                    decimals={1}
                    suffix="%"
                    duration={2.5}
                    className="text-6xl font-bold text-green-400 block mb-4"
                  />
                  <p className="text-gray-300 text-lg">Client Satisfaction</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeInUp" delay={0.3}>
                <div className="text-center p-10 bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur rounded-3xl border border-purple-700/50">
                  <CountUp
                    endValue={150}
                    suffix="+"
                    duration={2.5}
                    className="text-6xl font-bold text-purple-400 block mb-4"
                  />
                  <p className="text-gray-300 text-lg">Team Members</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeInUp" delay={0.4}>
                <div className="text-center p-10 bg-gradient-to-br from-pink-900/50 to-pink-800/30 backdrop-blur rounded-3xl border border-pink-700/50">
                  <CountUp
                    endValue={24}
                    suffix="/7"
                    duration={2.5}
                    className="text-6xl font-bold text-pink-400 block mb-4"
                  />
                  <p className="text-gray-300 text-lg">Support Available</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Parallax Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
          <ParallaxElement speed={80} className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30" />
          </ParallaxElement>

          <ParallaxElement speed={120} className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          </ParallaxElement>

          <ParallaxElement speed={60} className="absolute inset-0 z-0">
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          </ParallaxElement>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Parallax Magic
              </h2>
              <p className="text-xl md:text-2xl text-gray-300">
                Multiple layers moving at different speeds create depth and immersion
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Scale Animations */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-7xl mx-auto w-full">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center">
                Scale Animations
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ScrollReveal animation="scaleIn" delay={0.2}>
                <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex flex-col items-center justify-center p-8 hover:scale-105 transition-transform">
                  <h3 className="text-3xl font-bold mb-4">Scale In</h3>
                  <p className="text-orange-100 text-center">Smooth scale from 0.8 to 1.0</p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="scaleInRotate" delay={0.4}>
                <div className="aspect-video bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex flex-col items-center justify-center p-8 hover:scale-105 transition-transform">
                  <h3 className="text-3xl font-bold mb-4">Scale + Rotate</h3>
                  <p className="text-cyan-100 text-center">Combined scale and rotation effect</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Magnetic Buttons Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl md:text-6xl font-bold mb-12">
                Interactive Magnetic Buttons
              </h2>
              <p className="text-xl text-gray-400 mb-16">
                Hover over the buttons to see the magnetic effect
              </p>
            </ScrollReveal>

            <div className="flex flex-wrap gap-8 justify-center">
              <MagneticButton strength={0.5}>
                <button className="px-12 py-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-shadow">
                  Magnetic Button
                </button>
              </MagneticButton>

              <MagneticButton strength={0.4}>
                <button className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-pink-500/50 transition-shadow">
                  Hover Me
                </button>
              </MagneticButton>

              <MagneticButton strength={0.6}>
                <button className="px-12 py-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-red-500/50 transition-shadow">
                  Try This
                </button>
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* Text Reveal Variations */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl md:text-6xl font-bold mb-20 text-center">
                Text Reveal Animations
              </h2>
            </ScrollReveal>

            <div className="space-y-16">
              <TextReveal type="lines" stagger={0.08}>
                <p className="text-3xl md:text-4xl leading-relaxed font-light">
                  This text reveals line by line with a smooth stagger effect.
                  Each line appears sequentially creating a professional entrance.
                </p>
              </TextReveal>

              <TextReveal type="words" stagger={0.04} delay={0.5}>
                <p className="text-2xl md:text-3xl leading-relaxed text-gray-400">
                  While this paragraph reveals word by word, creating a dynamic
                  typewriter effect perfect for emphasizing key messages.
                </p>
              </TextReveal>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-5xl md:text-7xl font-bold mb-8">
                Ready to Elevate
                <br />
                Your Website?
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fadeInUp" delay={0.3}>
              <p className="text-xl md:text-2xl text-gray-400 mb-12">
                Start using these professional animations in your Next.js project today
              </p>
            </ScrollReveal>

            <MagneticButton strength={0.5}>
              <ScrollReveal animation="scaleIn" delay={0.6}>
                <button className="px-16 py-7 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all">
                  Get Started Now
                </button>
              </ScrollReveal>
            </MagneticButton>

            <ScrollReveal animation="fadeInUp" delay={0.9}>
              <p className="mt-8 text-gray-500">
                Check the source code to see implementation details
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="fadeInUp">
              <div className="text-center text-gray-500">
                <p className="mb-4">GSAP Scroll Animations for Next.js</p>
                <p className="text-sm">Built with GSAP, ScrollTrigger, and Lenis</p>
              </div>
            </ScrollReveal>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  );
}
