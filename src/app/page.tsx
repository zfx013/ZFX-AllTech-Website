"use client";

import { SideNav, MobileMenu, Logo } from "@/components/layout";
import { CustomCursor } from "@/components/cursor";
import { NoiseTexture } from "@/components/effects";
import {
  Hero,
  Services,
  Process,
  Technologies,
  Portfolio,
  About,
  Contact,
} from "@/components/sections";
import { CursorProvider } from "@/contexts/CursorContext";

export default function Home() {
  return (
    <CursorProvider>
      {/* Custom cursor (desktop only, fine pointer) */}
      <CustomCursor />

      {/* Fixed global noise texture overlay */}
      <NoiseTexture />

      {/* Navigation */}
      <SideNav />
      <MobileMenu />
      <Logo />

      <main>
        <Hero />
        <Services />
        <Process />
        <Technologies />
        {/* <Portfolio /> */}
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} ZFX AllTech &mdash; Tous droits
            r&eacute;serv&eacute;s
          </p>
          <div className="mt-3 flex items-center justify-center gap-6 text-xs text-muted">
            <a
              href="/mentions-legales"
              className="transition-colors hover:text-fg"
            >
              Mentions l&eacute;gales
            </a>
            <a
              href="/politique-confidentialite"
              className="transition-colors hover:text-fg"
            >
              Politique de confidentialit&eacute;
            </a>
          </div>
        </div>
      </footer>
    </CursorProvider>
  );
}
