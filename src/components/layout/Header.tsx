"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Code2, Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#technologies", label: "Technologies" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "A propos" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:contact@zfx-alltech.fr", icon: Mail, label: "Email" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scroll state
      setIsScrolled(currentScrollY > 50);

      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / windowHeight) * 100;
      setScrollProgress(progress);

      // Show/hide header based on scroll direction (with threshold to avoid jitter)
      const scrollDiff = currentScrollY - lastScrollY.current;
      if (scrollDiff > 10 && currentScrollY > 200) {
        setIsHeaderVisible(false);
      } else if (scrollDiff < -5 || currentScrollY < 100) {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Track active section
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      const scrollPosition = currentScrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  // Handle smooth scroll for navigation links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    closeMobileMenu();
  };

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 via-violet-500 to-emerald-500 origin-left z-[60]"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        aria-hidden="true"
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isHeaderVisible ? 0 : -100,
          opacity: isHeaderVisible ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 backdrop-blur-xl border-b border-dark-800/50"
            : "py-5"
        }`}
        style={{
          background: isScrolled
            ? "rgba(9, 9, 11, 0.8)"
            : "transparent"
        }}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between" role="navigation" aria-label="Navigation principale">
            {/* Logo */}
            <Link href="/" className="relative group flex items-center gap-3">
              <motion.div
                className="relative w-10 h-10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {/* Hexagon background with glow */}
                <motion.div
                  className="absolute inset-0 hexagon bg-gradient-to-br from-violet-600 to-emerald-500 opacity-90"
                  whileHover={{ opacity: 1 }}
                />
                <div className="absolute inset-[2px] hexagon bg-dark-950" />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Code2 className="relative z-10 w-5 h-5 text-violet-400" />
                </motion.div>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 hexagon bg-gradient-to-br from-violet-500 to-emerald-500 blur-xl opacity-0 group-hover:opacity-50"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-violet-400">ZFX</span>
                  <span className="text-emerald-400"> AllTech</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-dark-500 hidden sm:block">
                  Fullstack Developer
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 relative">
              {/* Active indicator background */}
              {activeSection && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute h-full bg-gradient-to-r from-violet-600/20 to-emerald-600/20 rounded-lg border border-violet-500/30"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {navLinks.map((link, index) => (
                <MagneticLink
                  key={link.href}
                  href={link.href}
                  isActive={activeSection === link.href.replace("#", "")}
                  index={index}
                >
                  {link.label}
                </MagneticLink>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="group relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 via-violet-500 to-emerald-500"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: "200% 100%" }}
                  />

                  {/* Shine effect */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut"
                    }}
                  />

                  <span className="relative flex items-center gap-2">
                    Demarrer un projet
                    <motion.div
                      whileHover={{ x: 2, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Animated Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white z-50 rounded-lg hover:bg-dark-800/50 transition-colors"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-5">
                <motion.span
                  animate={isMobileMenuOpen ? {
                    rotate: 45,
                    y: 8
                  } : {
                    rotate: 0,
                    y: 0
                  }}
                  className="absolute top-0 left-0 w-full h-0.5 bg-white rounded-full"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={isMobileMenuOpen ? {
                    opacity: 0,
                    x: -20
                  } : {
                    opacity: 1,
                    x: 0
                  }}
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-white rounded-full"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={isMobileMenuOpen ? {
                    rotate: -45,
                    y: -8
                  } : {
                    rotate: 0,
                    y: 0
                  }}
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation mobile"
          >
            {/* Animated Background Pattern */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark-950"
            >
              {/* Gradient orbs */}
              <motion.div
                className="absolute top-20 right-20 w-96 h-96 bg-violet-600/30 rounded-full blur-[100px]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-600/30 rounded-full blur-[100px]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />

              {/* Animated grid */}
              <div className="absolute inset-0 animated-grid opacity-30" />
            </motion.div>

            {/* Backdrop for click outside */}
            <div
              className="absolute inset-0 backdrop-blur-xl"
              onClick={closeMobileMenu}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="absolute right-0 top-0 bottom-0 w-full sm:max-w-sm bg-dark-900/50 backdrop-blur-2xl sm:border-l border-violet-500/20 flex flex-col"
            >
              <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 py-16 sm:py-20">
                {/* Staggered menu links */}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50, rotateX: -90 }}
                    animate={{ opacity: 1, x: 0, rotateX: 0 }}
                    exit={{ opacity: 0, x: 50, rotateX: -90 }}
                    transition={{
                      delay: index * 0.08,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="group relative flex items-center justify-between py-5 border-b border-dark-800/30 overflow-hidden"
                    >
                      {/* Hover background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-emerald-600/20 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />

                      <span className="relative text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-dark-300 group-hover:from-violet-400 group-hover:to-emerald-400 transition-all duration-300">
                        {link.label}
                      </span>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <ArrowUpRight className="w-6 h-6 text-violet-400" />
                      </motion.div>
                    </a>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: navLinks.length * 0.08 + 0.1, type: "spring" }}
                  className="mt-12"
                >
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="group relative inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white rounded-full overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-violet-500 to-emerald-500 bg-[length:200%_100%] animate-gradient-x" />
                    <span className="relative flex items-center gap-2">
                      Demarrer un projet
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </a>
                </motion.div>
              </div>

              {/* Social Links & Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 + 0.2 }}
                className="px-6 sm:px-8 py-6 sm:py-8 border-t border-dark-800/30 space-y-4 sm:space-y-6"
              >
                {/* Social Icons */}
                <div className="flex items-center gap-4" role="group" aria-label="Liens sociaux">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-dark-700 hover:border-violet-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-dark-950"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: navLinks.length * 0.08 + 0.3 + index * 0.05,
                        type: "spring",
                        stiffness: 400
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5 text-dark-400 group-hover:text-violet-400 transition-colors" aria-hidden="true" />

                      {/* Glow on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-violet-500/20 blur-lg opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-dark-500">
                    Contact
                  </p>
                  <p className="text-sm text-dark-300 font-medium">
                    contact@zfx-alltech.fr
                  </p>
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

// Magnetic Link Component with hover effects
interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  index: number;
}

function MagneticLink({ href, children, isActive, index }: MagneticLinkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic effect - pull towards cursor
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <motion.div
        style={{ x: springX, y: springY }}
      >
        <Link
          href={href}
          className={`relative px-4 py-2 text-sm font-medium transition-colors group block ${
            isActive ? "text-violet-400" : "text-dark-300 hover:text-white"
          }`}
        >
          <span className="relative z-10">{children}</span>

          {/* Animated underline */}
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-emerald-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isActive ? 1 : 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Glow effect on hover */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-emerald-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm"
            transition={{ duration: 0.3 }}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}
