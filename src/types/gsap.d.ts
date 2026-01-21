// GSAP TypeScript Declarations

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    SplitText?: any;
  }
}

// ScrollTrigger namespace extension
declare module 'gsap/ScrollTrigger' {
  interface Vars {
    trigger?: gsap.DOMTarget;
    start?: string | number;
    end?: string | number | (() => number | string);
    scrub?: boolean | number;
    pin?: boolean | gsap.DOMTarget;
    pinSpacing?: boolean;
    markers?: boolean;
    toggleActions?: string;
    anticipatePin?: number;
    snap?: number | number[] | { snapTo: number | string; duration: number };
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
    onUpdate?: (self: ScrollTrigger) => void;
    onToggle?: (self: ScrollTrigger) => void;
    once?: boolean;
    id?: string;
    invalidateOnRefresh?: boolean;
    refreshPriority?: number;
  }
}

export {};
