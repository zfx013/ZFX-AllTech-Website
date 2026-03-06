# ZFX AllTech - Refonte Totale "Premium Immersive"

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Créer un site vitrine ZFX AllTech radicalement différent des templates classiques, avec un effet "wow" immédiat et une identité visuelle mémorable qui inspire confiance et professionnalisme.

**Architecture:** Site Next.js 16 mono-page immersif avec scroll-driven animations natives, curseur personnalisé contextuel, transitions morphiques entre sections, et un concept visuel "Digital Architect" — le site se construit visuellement sous les yeux du visiteur. Chaque section a sa propre identité visuelle unique au lieu de répéter le même pattern card+grid.

**Tech Stack:** Next.js 16, TypeScript strict, Tailwind CSS 4, Framer Motion 12, Canvas 2D/WebGL pour les effets, CSS scroll-driven animations.

---

## CONCEPT DIRECTEUR : "Digital Architect"

Le site ne ressemble PAS à un landing page. Le concept : le visiteur entre dans un "espace digital" qui se construit au fur et à mesure qu'il scroll. Chaque section a un langage visuel unique. Pas de grilles de cards répétitives.

### Principes de design :
1. **Asymétrie intentionnelle** — Rien n'est centré par défaut, les éléments respirent
2. **Sections immersives** — Chaque section occupe un univers visuel propre
3. **Typographie comme design** — Les textes SONT le design, pas juste du contenu
4. **Interactions contextuelles** — Le curseur, les hovers, tout réagit différemment selon la zone
5. **Texture et profondeur** — Grain, noise, layers, pas du flat design
6. **Motion design narratif** — Les animations racontent une histoire, pas juste "fade in"

---

## STRUCTURE DU SITE (7 sections uniques)

### 1. HERO — "The Terminal"
- Concept : Un terminal/IDE géant qui "s'exécute" et révèle le contenu
- Le texte apparaît comme du code qui s'écrit en temps réel
- Fond : Canvas avec particules connectées formant un réseau neuronal
- CTA qui pulse avec un glow organique
- Curseur personnalisé : cercle lumineux qui suit la souris avec traînée

### 2. SERVICES — "The Constellation"
- Concept : Les services sont des nœuds interconnectés, pas des cards
- Layout orbital/constellation avec lignes de connexion SVG animées
- Chaque service est un cercle/hexagone qui s'expand au hover pour révéler les détails
- Animation : les nœuds flottent légèrement, les connexions pulsent
- Pas de grille — disposition organique

### 3. PROCESSUS — "The Timeline" (remplace "Pourquoi nous")
- Concept : Timeline verticale immersive avec scroll-snap
- Chaque étape du processus (Découverte → Design → Dev → Test → Deploy → Support)
- Indicateur de progression qui se remplit au scroll
- Chaque étape a une micro-animation unique
- Sticky section avec contenu qui se transforme

### 4. TECHNOLOGIES — "The Ecosystem"
- Concept : Cercles concentriques tournants (comme un système solaire)
- Centre : logo ZFX AllTech
- Orbites : Frontend → Backend → Mobile → DevOps
- Les technos orbitent réellement avec des vitesses différentes
- Hover sur une techno = highlight de l'orbite + tooltip détaillé

### 5. PORTFOLIO — "The Showcase"
- Concept : Cards horizontales full-width avec parallaxe
- Chaque projet = une "slide" immersive avec fond gradient unique
- Navigation par scroll horizontal ou dots
- Effet de profondeur 3D au hover (perspective transform)
- Numéros de projet géants en arrière-plan (style éditorial magazine)

### 6. À PROPOS — "The Manifesto"
- Concept : Typographie massive et cinématique
- Grandes phrases qui apparaissent mot par mot au scroll
- Chiffres clés animés avec des cercles de progression SVG
- Pas de cards — juste du texte powerful avec des accents de couleur
- Section qui respire avec beaucoup de whitespace

### 7. CONTACT — "The Portal"
- Concept : Le formulaire est un "portail" — design minimaliste maximal
- Fond animé unique (différent du reste du site)
- Formulaire centré avec inputs qui s'animent au focus
- Validation live avec micro-animations
- Effet de "succès" spectaculaire (confettis/explosion de particules)

---

## ÉLÉMENTS TRANSVERSAUX

### A. Curseur Personnalisé
- Cercle lumineux qui suit la souris (lerp smooth)
- Change de taille selon le contexte (petit sur texte, grand sur CTA)
- Change de couleur selon la section
- Effet de "magnétisme" près des éléments interactifs
- Trail/traînée subtile

### B. Navigation "Morphique"
- Barre latérale droite avec dots (pas de navbar classique)
- Chaque dot = section, avec label qui apparaît au hover
- Progress bar verticale qui se remplit au scroll
- Logo en haut à gauche, toujours visible
- Menu burger qui ouvre un overlay plein écran sur mobile

### C. Transitions entre sections
- Pas de simple scroll — chaque transition a un effet unique
- Gradient de couleur de fond qui change entre sections
- Éléments qui morphent d'une section à l'autre
- Parallaxe multi-couches

### D. Texture de fond
- Noise/grain subtil sur tout le site (SVG filter)
- Lignes de grille très subtiles qui réagissent au scroll
- Gradients mesh animés

### E. Palette de couleurs étendue
- Fond principal : #050505 (noir profond)
- Accents par section :
  - Hero : Cyan #00FFE0 + Blue #0066FF
  - Services : Violet #8B5CF6 + Magenta #D946EF
  - Processus : Emerald #10B981 + Teal #14B8A6
  - Technologies : Amber #F59E0B + Orange #F97316
  - Portfolio : Rose #F43F5E + Pink #EC4899
  - About : Slate #94A3B8 + White #FFFFFF
  - Contact : Indigo #6366F1 + Purple #A855F7
- Chaque section a sa propre identité colorimétrique

---

## PLAN D'IMPLÉMENTATION PAR AGENTS

### Vague 1 : Infrastructure (5 agents parallèles)
- Agent 1 : CSS global, variables, noise texture, fonts
- Agent 2 : Curseur personnalisé + contexte React
- Agent 3 : Navigation latérale morphique
- Agent 4 : Système de transitions entre sections
- Agent 5 : Layout principal + scroll management

### Vague 2 : Sections immersives (7 agents parallèles)
- Agent 6 : Hero "The Terminal" — canvas + typing effect
- Agent 7 : Services "The Constellation" — layout orbital SVG
- Agent 8 : Processus "The Timeline" — scroll-snap sticky
- Agent 9 : Technologies "The Ecosystem" — orbites animées
- Agent 10 : Portfolio "The Showcase" — slides horizontales
- Agent 11 : About "The Manifesto" — typographie cinématique
- Agent 12 : Contact "The Portal" — formulaire premium

### Vague 3 : Effets visuels (5 agents parallèles)
- Agent 13 : Canvas réseau neuronal (Hero)
- Agent 14 : SVG connexions constellation (Services)
- Agent 15 : Cercles de progression SVG (About)
- Agent 16 : Mesh gradients animés (fond global)
- Agent 17 : Effet confettis/particules (Contact success)

### Vague 4 : SEO et pages (4 agents parallèles)
- Agent 18 : SEO avancé (Schema.org, meta, JSON-LD)
- Agent 19 : robots.ts + sitemap.ts + llms.txt
- Agent 20 : Page mentions légales (styled)
- Agent 21 : Page politique confidentialité (styled)

### Vague 5 : Polish et QA (5 agents parallèles)
- Agent 22 : Responsive mobile (toutes sections)
- Agent 23 : Performance audit + optimisation
- Agent 24 : Accessibilité audit (ARIA, focus, contraste)
- Agent 25 : Animations review (60fps, GPU-only)
- Agent 26 : Build final + fix warnings

### Vague 6 : Review croisées (agents de spécialistes)
- Agents 27-35 : Code review par domaine, corrections, intégration finale

---

## FICHIERS À CRÉER/MODIFIER

### Supprimer :
- Tout dans `src/components/` (on repart de zéro)

### Créer :
```
src/
├── app/
│   ├── globals.css (refonte complète)
│   ├── layout.tsx (refonte)
│   ├── page.tsx (refonte)
│   ├── api/contact/route.ts (garder, améliorer)
│   ├── mentions-legales/page.tsx (restyler)
│   ├── politique-confidentialite/page.tsx (restyler)
│   ├── robots.ts (garder)
│   └── sitemap.ts (garder)
├── components/
│   ├── cursor/
│   │   └── CustomCursor.tsx
│   ├── layout/
│   │   ├── SideNav.tsx
│   │   └── MobileMenu.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Technologies.tsx
│   │   ├── Portfolio.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── effects/
│   │   ├── NeuralNetwork.tsx (canvas)
│   │   ├── NoiseTexture.tsx
│   │   ├── MeshGradient.tsx
│   │   ├── Confetti.tsx
│   │   └── SectionTransition.tsx
│   └── ui/
│       ├── MagneticButton.tsx
│       ├── AnimatedCounter.tsx
│       ├── ProgressRing.tsx
│       └── RevealText.tsx
├── hooks/
│   ├── useMousePosition.ts
│   ├── useSectionInView.ts
│   ├── useScrollProgress.ts
│   └── useSmoothScroll.ts
├── contexts/
│   └── CursorContext.tsx
└── lib/
    └── constants.ts
```
