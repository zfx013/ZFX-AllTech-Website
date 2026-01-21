'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import {
  Code2,
  Server,
  Smartphone,
  Database,
  Cloud,
  Layers,
  Zap,
  Star,
  Award,
  TrendingUp,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface Technology {
  name: string;
  proficiency: 'Expert' | 'Advanced' | 'Familiar';
  years: number;
  icon?: string;
}

interface TechCategory {
  name: string;
  color: string;
  icon: React.ReactNode;
  description: string;
  techs: Technology[];
}

const techCategories: TechCategory[] = [
  {
    name: 'Frontend',
    color: 'violet',
    icon: <Code2 className="w-5 h-5" />,
    description: 'Interfaces modernes et performantes',
    techs: [
      { name: 'React', proficiency: 'Expert' as const, years: 5, icon: 'react' },
      { name: 'Next.js', proficiency: 'Expert' as const, years: 4, icon: 'nextjs' },
      { name: 'Vue.js', proficiency: 'Advanced' as const, years: 3, icon: 'vue' },
      { name: 'TypeScript', proficiency: 'Expert' as const, years: 4, icon: 'typescript' },
      { name: 'Tailwind CSS', proficiency: 'Expert' as const, years: 3, icon: 'tailwind' },
      { name: 'Framer Motion', proficiency: 'Advanced' as const, years: 2, icon: 'framer' },
    ],
  },
  {
    name: 'Backend',
    color: 'emerald',
    icon: <Server className="w-5 h-5" />,
    description: 'APIs robustes et scalables',
    techs: [
      { name: 'Node.js', proficiency: 'Expert' as const, years: 5, icon: 'nodejs' },
      { name: 'Python', proficiency: 'Advanced' as const, years: 4, icon: 'python' },
      { name: 'NestJS', proficiency: 'Advanced' as const, years: 3, icon: 'nestjs' },
      { name: 'FastAPI', proficiency: 'Advanced' as const, years: 2, icon: 'fastapi' },
      { name: 'Express', proficiency: 'Expert' as const, years: 5, icon: 'express' },
      { name: 'GraphQL', proficiency: 'Advanced' as const, years: 3, icon: 'graphql' },
    ],
  },
  {
    name: 'Mobile',
    color: 'blue',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'Applications iOS et Android',
    techs: [
      { name: 'React Native', proficiency: 'Expert' as const, years: 4, icon: 'reactnative' },
      { name: 'Flutter', proficiency: 'Advanced' as const, years: 2, icon: 'flutter' },
    ],
  },
  {
    name: 'Database',
    color: 'orange',
    icon: <Database className="w-5 h-5" />,
    description: 'Stockage et gestion des donnees',
    techs: [
      { name: 'PostgreSQL', proficiency: 'Expert' as const, years: 5, icon: 'postgresql' },
      { name: 'MongoDB', proficiency: 'Advanced' as const, years: 4, icon: 'mongodb' },
      { name: 'Redis', proficiency: 'Advanced' as const, years: 3, icon: 'redis' },
      { name: 'Prisma', proficiency: 'Expert' as const, years: 3, icon: 'prisma' },
    ],
  },
  {
    name: 'DevOps',
    color: 'pink',
    icon: <Cloud className="w-5 h-5" />,
    description: 'Infrastructure et deploiement',
    techs: [
      { name: 'Docker', proficiency: 'Expert' as const, years: 4, icon: 'docker' },
      { name: 'AWS', proficiency: 'Advanced' as const, years: 3, icon: 'aws' },
      { name: 'Vercel', proficiency: 'Expert' as const, years: 3, icon: 'vercel' },
      { name: 'CI/CD', proficiency: 'Advanced' as const, years: 4, icon: 'cicd' },
      { name: 'Linux', proficiency: 'Expert' as const, years: 6, icon: 'linux' },
    ],
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, {
    bg: string;
    bgHover: string;
    border: string;
    borderHover: string;
    text: string;
    textLight: string;
    glow: string;
    gradient: string;
    gradientSoft: string;
    ring: string;
  }> = {
    violet: {
      bg: 'bg-violet-500/10',
      bgHover: 'bg-violet-500/20',
      border: 'border-violet-500/30',
      borderHover: 'border-violet-500/60',
      text: 'text-violet-400',
      textLight: 'text-violet-300',
      glow: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
      gradient: 'from-violet-500 to-purple-500',
      gradientSoft: 'from-violet-500/20 to-purple-500/20',
      ring: 'ring-violet-500/50',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      bgHover: 'bg-emerald-500/20',
      border: 'border-emerald-500/30',
      borderHover: 'border-emerald-500/60',
      text: 'text-emerald-400',
      textLight: 'text-emerald-300',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
      gradient: 'from-emerald-500 to-teal-500',
      gradientSoft: 'from-emerald-500/20 to-teal-500/20',
      ring: 'ring-emerald-500/50',
    },
    blue: {
      bg: 'bg-blue-500/10',
      bgHover: 'bg-blue-500/20',
      border: 'border-blue-500/30',
      borderHover: 'border-blue-500/60',
      text: 'text-blue-400',
      textLight: 'text-blue-300',
      glow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
      gradient: 'from-blue-500 to-cyan-500',
      gradientSoft: 'from-blue-500/20 to-cyan-500/20',
      ring: 'ring-blue-500/50',
    },
    orange: {
      bg: 'bg-orange-500/10',
      bgHover: 'bg-orange-500/20',
      border: 'border-orange-500/30',
      borderHover: 'border-orange-500/60',
      text: 'text-orange-400',
      textLight: 'text-orange-300',
      glow: 'shadow-[0_0_30px_rgba(249,115,22,0.3)]',
      gradient: 'from-orange-500 to-amber-500',
      gradientSoft: 'from-orange-500/20 to-amber-500/20',
      ring: 'ring-orange-500/50',
    },
    pink: {
      bg: 'bg-pink-500/10',
      bgHover: 'bg-pink-500/20',
      border: 'border-pink-500/30',
      borderHover: 'border-pink-500/60',
      text: 'text-pink-400',
      textLight: 'text-pink-300',
      glow: 'shadow-[0_0_30px_rgba(236,72,153,0.3)]',
      gradient: 'from-pink-500 to-rose-500',
      gradientSoft: 'from-pink-500/20 to-rose-500/20',
      ring: 'ring-pink-500/50',
    },
  };
  return colors[color] || colors.violet;
};

const getProficiencyData = (proficiency: string) => {
  switch (proficiency) {
    case 'Expert': return { width: '100%', percentage: 100, label: 'Expert', icon: <Star className="w-3 h-3" /> };
    case 'Advanced': return { width: '75%', percentage: 75, label: 'Avance', icon: <TrendingUp className="w-3 h-3" /> };
    case 'Familiar': return { width: '50%', percentage: 50, label: 'Familier', icon: <Layers className="w-3 h-3" /> };
    default: return { width: '100%', percentage: 100, label: 'Expert', icon: <Star className="w-3 h-3" /> };
  }
};

// Technology icon component with SVG icons
const TechIcon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactElement> = {
    react: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
        <path fillRule="evenodd" d="M12 9.5c4.694 0 8.5-1.12 8.5-2.5S16.694 4.5 12 4.5 3.5 5.62 3.5 7s3.806 2.5 8.5 2.5Zm0 1c4.694 0 8.5 1.12 8.5 2.5s-3.806 2.5-8.5 2.5-8.5-1.12-8.5-2.5 3.806-2.5 8.5-2.5Zm8.5 5c0 1.38-3.806 2.5-8.5 2.5s-8.5-1.12-8.5-2.5" opacity=".3"/>
        <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)"/>
      </svg>
    ),
    nextjs: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-1.5 14.5V7.5l7 9h-2.25l-4.75-6v6h-1.5l1.5-6Z"/>
      </svg>
    ),
    vue: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 3h4l6 10.5L18 3h4L12 21 2 3Zm6 0h4l2 3.5L16 3h4l-8 14L4 3h4Z" opacity=".6"/>
      </svg>
    ),
    typescript: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="2"/>
        <text x="12" y="16" fontSize="10" fontWeight="bold" fill="currentColor" textAnchor="middle" className="fill-dark-900">TS</text>
      </svg>
    ),
    nodejs: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5Zm0 2.18 6.37 3.54L12 11.26 5.63 7.72 12 4.18ZM5 9.46l6 3.34v6.02l-6-3.34V9.46Zm8 9.36v-6.02l6-3.34v6.02l-6 3.34Z"/>
      </svg>
    ),
    python: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-2.5 0-4.5.5-4.5 2v2h4.5v1h-6c-1.5 0-3 1-3 3v3c0 2 1.5 3 3 3h1v-2.5c0-1.5 1.5-3 3-3h5c1.5 0 2-1 2-2V4c0-1.5-2-2-5-2Zm-2.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/>
        <path d="M12 22c2.5 0 4.5-.5 4.5-2v-2h-4.5v-1h6c1.5 0 3-1 3-3v-3c0-2-1.5-3-3-3h-1v2.5c0 1.5-1.5 3-3 3H9c-1.5 0-2 1-2 2v4c0 1.5 2 2 5 2Zm2.5-1.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" opacity=".7"/>
      </svg>
    ),
    default: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m9.9 9.9 2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m9.9-9.9 2.83-2.83"/>
      </svg>
    ),
  };
  return icons[name] || icons.default;
};

export default function Technologies() {
  const [selectedTech, setSelectedTech] = useState<{ tech: Technology; color: string; categoryName: string } | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const filteredCategories = activeFilter === 'All'
    ? techCategories
    : techCategories.filter(cat => cat.name === activeFilter);

  // Calculate total stats
  const totalTechs = techCategories.reduce((acc, cat) => acc + cat.techs.length, 0);
  const expertCount = techCategories.reduce((acc, cat) => acc + cat.techs.filter(t => t.proficiency === 'Expert').length, 0);

  // Close modal on Escape key - accessibility
  const closeModal = useCallback(() => setSelectedTech(null), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedTech) {
        closeModal();
      }
    };

    if (selectedTech) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedTech, closeModal]);

  // Handle keyboard activation for tech items - accessibility
  const handleTechKeyDown = (e: React.KeyboardEvent, tech: Technology, color: string, categoryName: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedTech({ tech, color, categoryName });
    }
  };

  return (
    <section id="technologies" className="relative py-24 lg:py-32 bg-dark-900/50 overflow-hidden">
      {/* Enhanced grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top left orb */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-violet-600/30 to-purple-600/20 rounded-full blur-[100px]"
        />
        {/* Bottom right orb */}
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-emerald-600/30 to-teal-600/20 rounded-full blur-[100px]"
        />
        {/* Center accent */}
        <motion.div
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header with enhanced styling */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Stack Technique</span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Technologies{' '}
            <span className="gradient-text-animated">maitrisees</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-300 max-w-2xl mx-auto"
          >
            Une expertise technique solide couvrant{' '}
            <span className="text-violet-400 font-semibold">{totalTechs}+ technologies</span>{' '}
            pour realiser vos projets avec les meilleures solutions du marche.
          </motion.p>

          {/* Mini stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-8"
          >
            {[
              { icon: <Zap className="w-4 h-4" />, label: 'Technologies', value: totalTechs },
              { icon: <Award className="w-4 h-4" />, label: 'Expert', value: expertCount },
              { icon: <TrendingUp className="w-4 h-4" />, label: 'Annees', value: '6+' },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-2 text-dark-400">
                <span className="text-violet-400">{item.icon}</span>
                <span className="font-bold text-white">{item.value}</span>
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['All', ...techCategories.map(cat => cat.name)].map((filter, index) => {
            const category = techCategories.find(cat => cat.name === filter);
            const colorClasses = category ? getColorClasses(category.color) : {
              bg: 'bg-dark-800',
              bgHover: 'bg-dark-700',
              border: 'border-dark-700',
              borderHover: 'border-dark-600',
              text: 'text-white',
              textLight: 'text-dark-200',
              glow: '',
              gradient: 'from-violet-500 to-emerald-500',
              gradientSoft: 'from-violet-500/20 to-emerald-500/20',
              ring: 'ring-dark-500/50',
            };
            const isActive = activeFilter === filter;

            return (
              <motion.button
                key={filter}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  isActive
                    ? `${colorClasses.bg} border-2 ${colorClasses.border} ${colorClasses.text} ${colorClasses.glow}`
                    : 'bg-dark-800/50 border border-dark-700 text-dark-300 hover:border-dark-500 hover:text-dark-100 hover:bg-dark-800'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {category?.icon}
                  {filter === 'All' ? 'Toutes' : filter}
                  {isActive && (
                    <motion.span
                      layoutId="filter-count"
                      className={`px-1.5 py-0.5 text-xs rounded-full ${colorClasses.bg} ${colorClasses.text}`}
                    >
                      {filter === 'All' ? totalTechs : category?.techs.length}
                    </motion.span>
                  )}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-filter-bg"
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${colorClasses.gradientSoft} -z-10`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Enhanced Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, catIndex) => {
              const colorClasses = getColorClasses(category.color);
              const isHovered = hoveredCategory === category.name;

              return (
                <motion.div
                  key={category.name}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{
                    delay: catIndex * 0.1,
                    layout: { type: "spring", bounce: 0.2 }
                  }}
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`relative p-6 rounded-2xl backdrop-blur-sm group transition-all duration-500
                    ${colorClasses.bg} border ${colorClasses.border}
                    hover:${colorClasses.bgHover} hover:${colorClasses.borderHover}
                    ${isHovered ? colorClasses.glow : ''}
                  `}
                >
                  {/* Animated gradient border on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colorClasses.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />

                  {/* Category Header with icon */}
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${colorClasses.gradient} ${colorClasses.text}`}
                    >
                      <span className="text-white">{category.icon}</span>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${colorClasses.text}`}>
                        {category.name}
                      </h3>
                      <p className="text-xs text-dark-400">{category.description}</p>
                    </div>
                    <div className={`text-xs font-medium ${colorClasses.text} ${colorClasses.bg} px-2.5 py-1 rounded-full border ${colorClasses.border}`}>
                      {category.techs.length}
                    </div>
                  </div>

                  {/* Technologies with enhanced display */}
                  <div className="space-y-3">
                    {category.techs.map((tech, techIndex) => {
                      const profData = getProficiencyData(tech.proficiency);
                      return (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: catIndex * 0.1 + techIndex * 0.05 }}
                          whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.03)' }}
                          onClick={() => setSelectedTech({ tech, color: category.color, categoryName: category.name })}
                          onKeyDown={(e) => handleTechKeyDown(e, tech, category.color, category.name)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Voir les details de ${tech.name}, niveau ${getProficiencyData(tech.proficiency).label}, ${tech.years} ans d'experience`}
                          className="relative p-2.5 -mx-2.5 rounded-xl cursor-pointer group/tech transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-dark-900"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            {/* Tech Icon */}
                            <div className={`p-1.5 rounded-lg ${colorClasses.bg} ${colorClasses.text} group-hover/tech:scale-110 transition-transform`}>
                              <TechIcon name={tech.icon || 'default'} className="w-4 h-4" />
                            </div>

                            {/* Tech name and years */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-dark-100 group-hover/tech:text-white transition-colors truncate">
                                  {tech.name}
                                </span>
                                <div className="flex items-center gap-1.5 ml-2">
                                  <span className={`text-xs ${colorClasses.text} opacity-60 group-hover/tech:opacity-100 transition-opacity`}>
                                    {tech.years}a
                                  </span>
                                  <ChevronRight className={`w-3 h-3 ${colorClasses.text} opacity-0 group-hover/tech:opacity-100 transition-opacity`} />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Enhanced Proficiency Bar */}
                          <div className="flex items-center gap-2">
                            <div className="flex-1 relative h-1.5 bg-dark-800/70 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: profData.width }}
                                viewport={{ once: true }}
                                transition={{ delay: catIndex * 0.1 + techIndex * 0.05 + 0.3, duration: 0.8, ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${colorClasses.gradient} rounded-full relative`}
                              >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/tech:translate-x-full transition-transform duration-1000" />
                              </motion.div>
                            </div>
                            <span className={`text-[10px] font-medium ${colorClasses.text} opacity-60 min-w-[40px] text-right`}>
                              {profData.percentage}%
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Decorative elements */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses.gradient} opacity-[0.03] rounded-bl-[100px] pointer-events-none`} />
                  <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${colorClasses.gradient} opacity-[0.02] rounded-tr-[80px] pointer-events-none`} />

                  {/* Hover indicator line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${colorClasses.gradient} rounded-full origin-left`}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Enhanced Tech Detail Modal */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedTech(null)}
              className="fixed inset-0 bg-dark-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="tech-modal-title"
              aria-describedby="tech-modal-description"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative max-w-lg w-full p-8 rounded-3xl bg-dark-900/95 border ${getColorClasses(selectedTech.color).border} backdrop-blur-xl ${getColorClasses(selectedTech.color).glow}`}
              >
                {/* Decorative gradient background */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${getColorClasses(selectedTech.color).gradientSoft} opacity-50 pointer-events-none`} />

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedTech(null)}
                  aria-label="Fermer la fenetre"
                  className={`absolute top-4 right-4 p-2 rounded-full ${getColorClasses(selectedTech.color).bg} ${getColorClasses(selectedTech.color).text} hover:bg-dark-800 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-violet-500`}
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </motion.button>

                {/* Category badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getColorClasses(selectedTech.color).bg} ${getColorClasses(selectedTech.color).text} border ${getColorClasses(selectedTech.color).border}`}>
                  {selectedTech.categoryName}
                </div>

                <div className="relative z-10 pt-8">
                  {/* Tech Icon with glow */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                    className="relative w-20 h-20 mx-auto mb-6"
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getColorClasses(selectedTech.color).gradient} blur-xl opacity-50`} />
                    <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${getColorClasses(selectedTech.color).gradient} flex items-center justify-center`}>
                      <TechIcon name={selectedTech.tech.icon || 'default'} className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>

                  {/* Tech name */}
                  <motion.h3
                    id="tech-modal-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl font-bold text-white text-center mb-2"
                  >
                    {selectedTech.tech.name}
                  </motion.h3>

                  {/* Quick stats */}
                  <motion.div
                    id="tech-modal-description"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-4 mb-8"
                  >
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${getColorClasses(selectedTech.color).bg} ${getColorClasses(selectedTech.color).text}`}>
                      {getProficiencyData(selectedTech.tech.proficiency).icon}
                      <span className="text-sm font-medium">{getProficiencyData(selectedTech.tech.proficiency).label}</span>
                    </div>
                    <div className="text-dark-400" aria-hidden="true">|</div>
                    <div className="flex items-center gap-1.5 text-dark-300">
                      <TrendingUp className="w-4 h-4" aria-hidden="true" />
                      <span className="text-sm">{selectedTech.tech.years} ans d&apos;experience</span>
                    </div>
                  </motion.div>

                  {/* Detailed stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Proficiency bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-dark-300 flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Niveau de maitrise
                        </span>
                        <span className={`text-sm font-semibold ${getColorClasses(selectedTech.color).text}`}>
                          {getProficiencyData(selectedTech.tech.proficiency).percentage}%
                        </span>
                      </div>
                      <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: getProficiencyData(selectedTech.tech.proficiency).width }}
                          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${getColorClasses(selectedTech.color).gradient} rounded-full relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Years bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-dark-300 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Experience
                        </span>
                        <span className={`text-sm font-semibold ${getColorClasses(selectedTech.color).text}`}>
                          {selectedTech.tech.years} {selectedTech.tech.years === 1 ? 'an' : 'ans'}
                        </span>
                      </div>
                      <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(selectedTech.tech.years * 16.67, 100)}%` }}
                          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${getColorClasses(selectedTech.color).gradient} rounded-full`}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-dark-500">
                        <span>0</span>
                        <span>3 ans</span>
                        <span>6+ ans</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mt-8 text-center"
                  >
                    <a
                      href="#contact"
                      onClick={() => setSelectedTech(null)}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${getColorClasses(selectedTech.color).gradient} text-white font-medium hover:opacity-90 transition-opacity`}
                    >
                      <Sparkles className="w-4 h-4" />
                      Discuter de ce projet
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Infinite Scroll Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden py-8 mb-16"
        >
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-900/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-900/50 to-transparent z-10 pointer-events-none" />

          {/* First marquee row */}
          <div className="flex mb-4 tech-marquee">
            <div className="flex gap-4 shrink-0 tech-marquee-content">
              {[...techCategories, ...techCategories].map((category, catIndex) => (
                category.techs.map((tech, techIndex) => {
                  const colorClasses = getColorClasses(category.color);
                  return (
                    <div
                      key={`row1-${catIndex}-${techIndex}`}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${colorClasses.bg} border ${colorClasses.border} ${colorClasses.text} font-medium text-sm whitespace-nowrap hover:scale-105 hover:${colorClasses.glow} transition-all cursor-default`}
                    >
                      <TechIcon name={tech.icon || 'default'} className="w-4 h-4" />
                      {tech.name}
                    </div>
                  );
                })
              ))}
            </div>
            <div className="flex gap-4 shrink-0 tech-marquee-content" aria-hidden="true">
              {[...techCategories, ...techCategories].map((category, catIndex) => (
                category.techs.map((tech, techIndex) => {
                  const colorClasses = getColorClasses(category.color);
                  return (
                    <div
                      key={`row1-dup-${catIndex}-${techIndex}`}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${colorClasses.bg} border ${colorClasses.border} ${colorClasses.text} font-medium text-sm whitespace-nowrap hover:scale-105 hover:${colorClasses.glow} transition-all cursor-default`}
                    >
                      <TechIcon name={tech.icon || 'default'} className="w-4 h-4" />
                      {tech.name}
                    </div>
                  );
                })
              ))}
            </div>
          </div>

          {/* Second marquee row (reverse direction) */}
          <div className="flex tech-marquee-reverse">
            <div className="flex gap-4 shrink-0 tech-marquee-content-reverse">
              {[...techCategories, ...techCategories].reverse().map((category, catIndex) => (
                category.techs.map((tech, techIndex) => {
                  const colorClasses = getColorClasses(category.color);
                  return (
                    <div
                      key={`row2-${catIndex}-${techIndex}`}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${colorClasses.bg} border ${colorClasses.border} ${colorClasses.text} font-medium text-sm whitespace-nowrap hover:scale-105 hover:${colorClasses.glow} transition-all cursor-default`}
                    >
                      <TechIcon name={tech.icon || 'default'} className="w-4 h-4" />
                      {tech.name}
                    </div>
                  );
                })
              ))}
            </div>
            <div className="flex gap-4 shrink-0 tech-marquee-content-reverse" aria-hidden="true">
              {[...techCategories, ...techCategories].reverse().map((category, catIndex) => (
                category.techs.map((tech, techIndex) => {
                  const colorClasses = getColorClasses(category.color);
                  return (
                    <div
                      key={`row2-dup-${catIndex}-${techIndex}`}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${colorClasses.bg} border ${colorClasses.border} ${colorClasses.text} font-medium text-sm whitespace-nowrap hover:scale-105 hover:${colorClasses.glow} transition-all cursor-default`}
                    >
                      <TechIcon name={tech.icon || 'default'} className="w-4 h-4" />
                      {tech.name}
                    </div>
                  );
                })
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-16"
        >
          {[
            { label: 'Technologies', value: totalTechs, icon: <Layers className="w-5 h-5" />, color: 'violet', suffix: '+' },
            { label: 'Categories', value: techCategories.length, icon: <Database className="w-5 h-5" />, color: 'emerald', suffix: '' },
            { label: 'Niveau Expert', value: expertCount, icon: <Star className="w-5 h-5" />, color: 'blue', suffix: '' },
            { label: 'Annees exp.', value: '6', icon: <Award className="w-5 h-5" />, color: 'orange', suffix: '+' },
          ].map((stat, index) => {
            const colorClasses = getColorClasses(stat.color);
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`relative p-6 rounded-2xl ${colorClasses.bg} border ${colorClasses.border} text-center group overflow-hidden transition-all duration-300 hover:${colorClasses.glow}`}
              >
                {/* Background decoration */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradientSoft} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-2 sm:p-3 rounded-xl ${colorClasses.bg} ${colorClasses.text} mb-2 sm:mb-3 group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>

                  {/* Value */}
                  <motion.div
                    className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${colorClasses.text} mb-1`}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>

                  {/* Label */}
                  <div className="text-sm text-dark-400 group-hover:text-dark-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Proficiency Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { level: 'Expert', percentage: '100%', color: 'violet' },
            { level: 'Avance', percentage: '75%', color: 'emerald' },
            { level: 'Familier', percentage: '50%', color: 'blue' },
          ].map((item) => {
            const colorClasses = getColorClasses(item.color);
            return (
              <div key={item.level} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorClasses.gradient}`} />
                <span className="text-sm text-dark-300">
                  {item.level} <span className={colorClasses.text}>({item.percentage})</span>
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-dark-800/50 to-dark-900/50 border border-dark-700/50 backdrop-blur-sm">
            <p className="text-dark-300 mb-6 max-w-md">
              Besoin d&apos;une technologie specifique non listee ?<br />
              <span className="text-violet-400">Je m&apos;adapte rapidement</span> a vos besoins.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-emerald-600 text-white font-semibold hover:opacity-90 transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Discutons de votre projet
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
