'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Layers, Monitor, Smartphone, Database, BarChart3, ShoppingCart, MessageSquare, Home, Heart, Code2, Zap, TrendingUp, Users, Clock, Shield, Star } from 'lucide-react';

const categories = ['Tous', 'E-commerce', 'SaaS', 'Mobile', 'IA & Data', 'Web', 'Fullstack'];

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
  color: string;
  gradientFrom: string;
  gradientTo: string;
  demoUrl: string;
  githubUrl: string;
  featured?: boolean;
  icon: React.ReactNode;
  mockupType: 'dashboard' | 'mobile' | 'ecommerce' | 'chat' | 'analytics' | 'web';
  metrics?: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'LuxeMarket Pro',
    description: 'Plateforme e-commerce haut de gamme avec paiements Stripe, gestion multi-vendeurs et analytics temps reel.',
    longDescription: 'Solution complete de marketplace e-commerce avec systeme de vendeurs multiples, gestion avancee des stocks, integration Stripe pour les paiements, dashboard administrateur avec analytics en temps reel, et optimisation SEO poussee.',
    category: 'E-commerce',
    technologies: ['Next.js 14', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    color: 'from-violet-500 via-purple-500 to-pink-500',
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
    icon: <ShoppingCart className="w-6 h-6" />,
    mockupType: 'ecommerce',
    metrics: [
      { label: 'Transactions/jour', value: '10K+', icon: <TrendingUp className="w-4 h-4" /> },
      { label: 'Temps de reponse', value: '<100ms', icon: <Clock className="w-4 h-4" /> },
      { label: 'Vendeurs actifs', value: '500+', icon: <Users className="w-4 h-4" /> }
    ]
  },
  {
    id: 2,
    title: 'DataViz Analytics',
    description: 'Dashboard SaaS de visualisation de donnees avec graphiques interactifs D3.js et exports personnalises.',
    longDescription: 'Plateforme SaaS complete pour la visualisation et l\'analyse de donnees business. Integration de graphiques interactifs complexes avec D3.js, exports PDF/Excel, alertes temps reel, et API REST pour integrations tierces.',
    category: 'SaaS',
    technologies: ['React 18', 'D3.js', 'Chart.js', 'Node.js', 'Express', 'MongoDB', 'WebSocket'],
    color: 'from-blue-500 via-cyan-500 to-teal-500',
    gradientFrom: '#3b82f6',
    gradientTo: '#14b8a6',
    demoUrl: '#',
    githubUrl: '#',
    icon: <BarChart3 className="w-6 h-6" />,
    mockupType: 'analytics',
    metrics: [
      { label: 'Utilisateurs actifs', value: '50K+', icon: <Users className="w-4 h-4" /> },
      { label: 'Donnees traitees', value: '5TB+', icon: <Database className="w-4 h-4" /> },
      { label: 'Uptime', value: '99.9%', icon: <Zap className="w-4 h-4" /> }
    ]
  },
  {
    id: 3,
    title: 'FitTrack Mobile',
    description: 'Application mobile de fitness avec programmes personnalises, suivi GPS et coach IA integre.',
    longDescription: 'App mobile native de suivi sportif avec programmes d\'entrainement personnalises par IA, tracking GPS des courses, analyse des performances, integration avec montres connectees, et notifications push intelligentes.',
    category: 'Mobile',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'TensorFlow Lite', 'Google Maps API'],
    color: 'from-emerald-500 via-green-500 to-lime-500',
    gradientFrom: '#10b981',
    gradientTo: '#84cc16',
    demoUrl: '#',
    githubUrl: '#',
    icon: <Smartphone className="w-6 h-6" />,
    mockupType: 'mobile',
    metrics: [
      { label: 'Telechargements', value: '100K+', icon: <TrendingUp className="w-4 h-4" /> },
      { label: 'Note moyenne', value: '4.8/5', icon: <Star className="w-4 h-4" /> },
      { label: 'Workouts completes', value: '1M+', icon: <Zap className="w-4 h-4" /> }
    ]
  },
  {
    id: 4,
    title: 'ChatBot IA Pro',
    description: 'Assistant conversationnel intelligent alimente par IA avec apprentissage continu et integrations multiples.',
    longDescription: 'Chatbot d\'entreprise base sur l\'IA avec traitement du langage naturel (NLP), apprentissage machine continu, integrations CRM/ERP, analytics des conversations, et deploiement multi-canal (web, mobile, Slack).',
    category: 'IA & Data',
    technologies: ['Python', 'FastAPI', 'OpenAI GPT', 'LangChain', 'PostgreSQL', 'Redis', 'Docker'],
    color: 'from-orange-500 via-amber-500 to-yellow-500',
    gradientFrom: '#f97316',
    gradientTo: '#eab308',
    demoUrl: '#',
    githubUrl: '#',
    icon: <MessageSquare className="w-6 h-6" />,
    mockupType: 'chat',
    metrics: [
      { label: 'Conversations/jour', value: '50K+', icon: <MessageSquare className="w-4 h-4" /> },
      { label: 'Precision', value: '94%', icon: <Zap className="w-4 h-4" /> },
      { label: 'Temps de reponse', value: '<2s', icon: <Clock className="w-4 h-4" /> }
    ]
  },
  {
    id: 5,
    title: 'ImmoConnect',
    description: 'Plateforme immobiliere moderne avec visites virtuelles 360, matching IA et systeme de reservation.',
    longDescription: 'Marketplace immobiliere complete avec visites virtuelles 3D, systeme de matching intelligent entre acheteurs et proprietes, prise de rendez-vous integree, CRM pour agents, et outils de gestion de leads avances.',
    category: 'Web',
    technologies: ['Vue.js 3', 'Nuxt 3', 'Node.js', 'Express', 'MongoDB', 'Three.js', 'Stripe'],
    color: 'from-rose-500 via-pink-500 to-fuchsia-500',
    gradientFrom: '#f43f5e',
    gradientTo: '#d946ef',
    demoUrl: '#',
    githubUrl: '#',
    icon: <Home className="w-6 h-6" />,
    mockupType: 'web',
    metrics: [
      { label: 'Proprietes listees', value: '15K+', icon: <Home className="w-4 h-4" /> },
      { label: 'Visites virtuelles', value: '200K+', icon: <Users className="w-4 h-4" /> },
      { label: 'Transactions', value: '2K+', icon: <TrendingUp className="w-4 h-4" /> }
    ]
  },
  {
    id: 6,
    title: 'MediCare Manager',
    description: 'Systeme de gestion hospitaliere avec dossiers patients electroniques, planification et telemedecine.',
    longDescription: 'Plateforme complete de gestion hospitaliere avec dossiers medicaux electroniques securises, systeme de rendez-vous, gestion des stocks pharmaceutiques, teleconsultation integree, et conformite RGPD/HIPAA.',
    category: 'Fullstack',
    technologies: ['NestJS', 'Angular', 'PostgreSQL', 'TypeORM', 'WebRTC', 'AWS', 'Docker'],
    color: 'from-indigo-500 via-blue-500 to-cyan-500',
    gradientFrom: '#6366f1',
    gradientTo: '#06b6d4',
    demoUrl: '#',
    githubUrl: '#',
    icon: <Heart className="w-6 h-6" />,
    mockupType: 'dashboard',
    metrics: [
      { label: 'Patients geres', value: '25K+', icon: <Users className="w-4 h-4" /> },
      { label: 'Consultations/mois', value: '8K+', icon: <Heart className="w-4 h-4" /> },
      { label: 'Securite', value: '256-bit', icon: <Shield className="w-4 h-4" /> }
    ]
  },
];

// Premium Mockup Components
function EcommerceMockup({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full p-4">
      {/* Browser Frame */}
      <div className="relative w-full h-full bg-dark-950/80 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Browser Bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-dark-900/90 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-dark-800/80 rounded-md px-3 py-1 text-xs text-dark-400 flex items-center gap-2">
              <Shield className="w-3 h-3 text-green-500" />
              luxemarket.pro
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <div className="h-2 w-20 bg-white/20 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-2 w-12 bg-white/10 rounded" />
              <div className="h-2 w-12 bg-white/10 rounded" />
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                className="px-3 py-1.5 bg-gradient-to-r from-violet-500 to-pink-500 rounded-md text-[10px] text-white font-medium"
              >
                Panier (3)
              </motion.div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-800/50 rounded-lg p-2 border border-white/5"
              >
                <div className={`aspect-square rounded-md mb-2 ${
                  i === 1 ? 'bg-gradient-to-br from-violet-500/30 to-pink-500/30' :
                  i === 2 ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30' :
                  'bg-gradient-to-br from-emerald-500/30 to-lime-500/30'
                }`} />
                <div className="h-1.5 w-full bg-white/20 rounded mb-1" />
                <div className="h-1.5 w-2/3 bg-white/10 rounded" />
                <motion.div
                  animate={{ width: isHovered ? '100%' : '60%' }}
                  className="h-2 bg-gradient-to-r from-violet-500 to-pink-500 rounded mt-2"
                />
              </motion.div>
            ))}
          </div>

          {/* Stats Bar */}
          <motion.div
            animate={{ y: isHovered ? 0 : 5, opacity: isHovered ? 1 : 0.7 }}
            className="flex justify-between items-center bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-lg p-2 border border-violet-500/20"
          >
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-[10px] text-white">+24% ventes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3 text-violet-400" />
              <span className="text-[10px] text-white">1.2k actifs</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsMockup({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full p-4">
      <div className="relative w-full h-full bg-dark-950/80 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Sidebar */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-dark-900/90 border-r border-white/10 flex flex-col items-center py-3 gap-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <BarChart3 className="w-3 h-3 text-white" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-5 h-5 rounded-md ${i === 1 ? 'bg-blue-500/30' : 'bg-white/10'}`} />
          ))}
        </div>

        {/* Main Content */}
        <div className="ml-12 p-3 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="h-2 w-24 bg-white/20 rounded" />
            <div className="flex gap-2">
              <div className="px-2 py-1 bg-blue-500/20 rounded text-[9px] text-blue-400">Jour</div>
              <div className="px-2 py-1 bg-white/10 rounded text-[9px] text-white/60">Semaine</div>
              <div className="px-2 py-1 bg-white/10 rounded text-[9px] text-white/60">Mois</div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: '47.2K', label: 'Visiteurs', color: 'from-blue-500 to-cyan-500', change: '+12%' },
              { value: '2.4K', label: 'Conversions', color: 'from-emerald-500 to-lime-500', change: '+8%' },
              { value: '94K', label: 'Revenue', color: 'from-violet-500 to-pink-500', change: '+23%' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-800/50 rounded-lg p-2 border border-white/5"
              >
                <div className="text-xs font-bold text-white">{stat.value}</div>
                <div className="text-[8px] text-dark-400">{stat.label}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-2 h-2 text-green-400" />
                  <span className="text-[8px] text-green-400">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-dark-800/30 rounded-lg p-2 border border-white/5">
            <div className="flex items-end justify-between h-16 gap-1">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: isHovered ? `${height}%` : `${height * 0.7}%` }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t opacity-80"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMockup({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Phone Frame */}
      <motion.div
        animate={{ rotateY: isHovered ? 5 : 0, rotateX: isHovered ? -5 : 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-28 h-56 bg-dark-950 rounded-[2rem] border-4 border-dark-800 shadow-2xl overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-dark-950 rounded-b-xl z-10" />

        {/* Screen Content */}
        <div className="absolute inset-1 bg-gradient-to-b from-emerald-900/50 to-dark-950 rounded-[1.5rem] overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 py-2 pt-6">
            <span className="text-[8px] text-white">9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-1.5 bg-white/60 rounded-sm" />
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            </div>
          </div>

          {/* App Content */}
          <div className="px-3 pt-2 space-y-2">
            <div className="text-center">
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center mb-1"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-[10px] font-bold text-white">Today&apos;s Goal</div>
              <div className="text-lg font-bold text-emerald-400">8,542</div>
              <div className="text-[8px] text-dark-400">steps / 10,000</div>
            </div>

            {/* Progress Ring Visual */}
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 2, ease: "linear" }}
              className="w-16 h-16 mx-auto rounded-full border-4 border-emerald-500/30 border-t-emerald-500 border-r-emerald-500"
            />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-1.5 mt-2">
              {[
                { icon: <Heart className="w-2.5 h-2.5" />, value: '124', label: 'BPM' },
                { icon: <Zap className="w-2.5 h-2.5" />, value: '420', label: 'Cal' },
                { icon: <Clock className="w-2.5 h-2.5" />, value: '45', label: 'Min' }
              ].map((stat, i) => (
                <div key={i} className="bg-dark-800/50 rounded-lg p-1.5 text-center">
                  <div className="text-emerald-400 mx-auto w-fit">{stat.icon}</div>
                  <div className="text-[9px] font-bold text-white">{stat.value}</div>
                  <div className="text-[7px] text-dark-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full" />
      </motion.div>
    </div>
  );
}

function ChatMockup({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full p-4">
      <div className="relative w-full h-full bg-dark-950/80 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-b border-white/10">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center"
          >
            <MessageSquare className="w-4 h-4 text-white" />
          </motion.div>
          <div>
            <div className="text-xs font-semibold text-white">AI Assistant Pro</div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] text-green-400">En ligne</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-3 space-y-2">
          {/* User Message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-end"
          >
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl rounded-br-md px-3 py-2 max-w-[80%]">
              <p className="text-[9px] text-white">Analyse mes donnees de vente du mois dernier</p>
            </div>
          </motion.div>

          {/* AI Response */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-start"
          >
            <div className="bg-dark-800/80 rounded-2xl rounded-bl-md px-3 py-2 max-w-[85%] border border-white/10">
              <p className="text-[9px] text-dark-200 mb-2">Voici l&apos;analyse de vos ventes :</p>
              <div className="bg-dark-900/50 rounded-lg p-2 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] text-dark-400">Revenue total</span>
                  <span className="text-[9px] font-bold text-emerald-400">+23.5%</span>
                </div>
                <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: isHovered ? '78%' : '60%' }}
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Typing Indicator */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0.5 }}
            className="flex items-center gap-1 px-3"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                  className="w-1.5 h-1.5 rounded-full bg-orange-500/60"
                />
              ))}
            </div>
            <span className="text-[8px] text-dark-400 ml-1">IA analyse...</span>
          </motion.div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-dark-900/90 border-t border-white/10">
          <div className="flex items-center gap-2 bg-dark-800/80 rounded-full px-3 py-2">
            <div className="flex-1 h-2 bg-white/10 rounded" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
              <ArrowUpRight className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebMockup({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full p-4">
      <div className="relative w-full h-full bg-dark-950/80 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Browser Bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-dark-900/90 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-dark-800/80 rounded-md px-3 py-1 text-xs text-dark-400">
              immoconnect.fr
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-20 bg-gradient-to-br from-rose-500/30 via-pink-500/20 to-fuchsia-500/30 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[10px] font-bold text-white mb-1">Trouvez votre bien ideal</div>
              <div className="flex gap-1">
                <div className="px-2 py-1 bg-white/10 rounded text-[8px] text-white">Paris</div>
                <div className="px-2 py-1 bg-white/10 rounded text-[8px] text-white">2-3 pieces</div>
                <motion.div
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  className="px-2 py-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded text-[8px] text-white"
                >
                  Rechercher
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Cards */}
        <div className="p-3 space-y-2">
          <div className="text-[9px] font-semibold text-white mb-2">Biens recommandes</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { price: '450K', location: 'Paris 11e', size: '65m2' },
              { price: '380K', location: 'Lyon 6e', size: '55m2' }
            ].map((property, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-dark-800/50 rounded-lg overflow-hidden border border-white/5"
              >
                <div className={`h-12 ${
                  i === 0 ? 'bg-gradient-to-br from-rose-500/40 to-pink-500/40' : 'bg-gradient-to-br from-fuchsia-500/40 to-purple-500/40'
                }`}>
                  <div className="flex items-center justify-center h-full">
                    <Home className="w-5 h-5 text-white/60" />
                  </div>
                </div>
                <div className="p-2">
                  <div className="text-[10px] font-bold text-white">{property.price}</div>
                  <div className="text-[8px] text-dark-400">{property.location} - {property.size}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMockup({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative w-full h-full p-4">
      <div className="relative w-full h-full bg-dark-950/80 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] font-semibold text-white">MediCare</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-dark-800/80" />
            <div className="h-1.5 w-12 bg-white/20 rounded" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-3 space-y-3">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: '156', label: 'Patients', color: 'from-indigo-500 to-blue-500' },
              { value: '23', label: 'RDV', color: 'from-cyan-500 to-teal-500' },
              { value: '8', label: 'Urgences', color: 'from-red-500 to-orange-500' },
              { value: '45', label: 'Lits', color: 'from-emerald-500 to-green-500' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-800/50 rounded-lg p-2 text-center border border-white/5"
              >
                <div className={`text-sm font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-[7px] text-dark-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Patient List */}
          <div className="bg-dark-800/30 rounded-lg p-2 border border-white/5">
            <div className="text-[9px] font-semibold text-white mb-2">Patients recents</div>
            <div className="space-y-1.5">
              {[
                { name: 'M. Dupont', status: 'Consultation', statusColor: 'bg-blue-500' },
                { name: 'Mme Martin', status: 'En attente', statusColor: 'bg-yellow-500' },
                { name: 'M. Bernard', status: 'Termine', statusColor: 'bg-green-500' }
              ].map((patient, i) => (
                <motion.div
                  key={i}
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between bg-dark-900/50 rounded-md px-2 py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-500/30" />
                    <span className="text-[9px] text-white">{patient.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${patient.statusColor}`} />
                    <span className="text-[8px] text-dark-400">{patient.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mockup Selector Component
function ProjectMockup({ project, isHovered }: { project: Project; isHovered: boolean }) {
  switch (project.mockupType) {
    case 'ecommerce':
      return <EcommerceMockup isHovered={isHovered} />;
    case 'analytics':
      return <AnalyticsMockup isHovered={isHovered} />;
    case 'mobile':
      return <MobileMockup isHovered={isHovered} />;
    case 'chat':
      return <ChatMockup isHovered={isHovered} />;
    case 'web':
      return <WebMockup isHovered={isHovered} />;
    case 'dashboard':
      return <DashboardMockup isHovered={isHovered} />;
    default:
      return <DashboardMockup isHovered={isHovered} />;
  }
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Memoize filtered projects to avoid recalculation on every render
  const filteredProjects = useMemo(() =>
    projects.filter(
      (project) => activeCategory === 'Tous' || project.category === activeCategory
    ),
    [activeCategory]
  );

  const featuredProject = useMemo(() =>
    filteredProjects.find(p => p.featured),
    [filteredProjects]
  );

  const regularProjects = useMemo(() =>
    filteredProjects.filter(p => !p.featured),
    [filteredProjects]
  );

  return (
    <section id="portfolio" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Projets qui{' '}
            <span className="gradient-text">impressionnent</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-300"
          >
            Une selection de projets fullstack demontrant expertise technique,
            architecture robuste et attention aux details.
          </motion.p>
        </div>

        {/* Enhanced Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={activeCategory === category}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-dark-950 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-violet-600 to-emerald-500 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-dark-800/50 backdrop-blur-sm text-dark-300 hover:text-white hover:bg-dark-700/50 border border-dark-700 hover:border-violet-500/30'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Featured Project */}
            {featuredProject && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <FeaturedProjectCard
                  project={featuredProject}
                  isHovered={hoveredProject === featuredProject.id}
                  onHoverStart={() => setHoveredProject(featuredProject.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                />
              </motion.div>
            )}

            {/* Regular Projects Grid */}
            {regularProjects.length > 0 && (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {regularProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isHovered={hoveredProject === project.id}
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 transition-all duration-300"
          >
            <span>Discutons de votre projet</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Featured Project Card Component
function FeaturedProjectCard({
  project,
  isHovered,
  onHoverStart,
  onHoverEnd
}: {
  project: Project;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <motion.div
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

      <div className="relative rounded-3xl bg-gradient-to-br from-dark-900/90 to-dark-950/90 border border-dark-800 overflow-hidden hover:border-violet-500/50 transition-all duration-500 backdrop-blur-xl">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <motion.span
                animate={{ scale: isHovered ? 1.05 : 1 }}
                className="px-4 py-1.5 text-sm font-semibold bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-full shadow-lg shadow-violet-500/25"
              >
                Projet Vedette
              </motion.span>
              <span className="px-4 py-1.5 text-sm font-medium bg-violet-500/10 text-violet-400 rounded-full border border-violet-500/20">
                {project.category}
              </span>
            </div>

            <div>
              <motion.h3
                animate={{ x: isHovered ? 5 : 0 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-emerald-400 transition-all duration-300"
              >
                {project.title}
              </motion.h3>
              <p className="text-dark-300 text-lg leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Metrics with Icons */}
            {project.metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {project.metrics.map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="p-4 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-violet-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-violet-400">{metric.icon}</span>
                      <div className="text-2xl font-bold text-white">{metric.value}</div>
                    </div>
                    <div className="text-xs text-dark-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  className="px-3 py-1.5 text-sm bg-dark-800 text-dark-200 rounded-lg border border-dark-700 hover:border-violet-500/50 hover:text-white hover:bg-dark-700 transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <motion.a
                href={project.demoUrl}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-emerald-500 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                Voir la demo
              </motion.a>
              <motion.a
                href={project.githubUrl}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl bg-dark-800 text-white font-semibold hover:bg-dark-700 transition-all duration-300 flex items-center gap-2 border border-dark-700 hover:border-violet-500/30"
              >
                <Github className="w-5 h-5" />
                Code source
              </motion.a>
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:order-first">
            <motion.div
              animate={{
                rotateY: isHovered ? 5 : 0,
                rotateX: isHovered ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`}>
                <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent_50%)]" />
                </div>
              </div>

              {/* Project Mockup */}
              <ProjectMockup project={project} isHovered={isHovered} />

              {/* Animated Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-10 pointer-events-none"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-white/30 border-dashed" />
              </motion.div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/30 to-transparent flex items-end justify-center pb-8 pointer-events-none"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{
                    scale: isHovered ? 1 : 0.8,
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 20
                  }}
                  className="text-white text-xl font-semibold flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20"
                >
                  Voir le cas d&apos;etude
                  <ArrowUpRight className="w-6 h-6" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Regular Project Card Component
function ProjectCard({
  project,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="group relative h-full"
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500`} />

      <div className="relative h-full rounded-2xl bg-dark-900/50 backdrop-blur-sm border border-dark-800 overflow-hidden hover:border-violet-500/30 transition-all duration-300 flex flex-col">
        {/* Project Visual */}
        <div className="relative h-56 overflow-hidden">
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent_50%)]" />
            </div>
          </motion.div>

          {/* Project Mockup */}
          <div className="absolute inset-0">
            <ProjectMockup project={project} isHovered={isHovered} />
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4 z-10">
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 shadow-lg"
            >
              {project.category}
            </motion.span>
          </div>

          {/* Icon Badge */}
          <div className="absolute top-4 left-4 z-10">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg"
            >
              {project.icon}
            </motion.div>
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20"
          >
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ delay: 0.1 }}
              className="text-white text-center px-4"
            >
              <div className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                Voir le cas d&apos;etude
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ delay: 0.2 }}
              className="flex gap-3"
            >
              <motion.a
                href={project.demoUrl}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/30"
                aria-label="Voir la demo"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={project.githubUrl}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-white hover:bg-dark-600 transition-colors border border-dark-600"
                aria-label="Voir le code"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-emerald-400 transition-all duration-300">
            {project.title}
          </h3>

          <p className="text-sm text-dark-300 mb-4 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Metrics (if available) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex gap-4 mb-4 pb-4 border-b border-dark-800">
              {project.metrics.slice(0, 2).map((metric, idx) => (
                <div key={idx} className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-violet-400">{metric.icon}</span>
                    <div className="text-lg font-bold text-white">{metric.value}</div>
                  </div>
                  <div className="text-xs text-dark-400">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="px-2.5 py-1 text-xs bg-dark-800 text-dark-200 rounded-md hover:text-white hover:bg-dark-700 transition-all duration-300 border border-dark-700 hover:border-violet-500/30"
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2.5 py-1 text-xs bg-dark-800/50 text-dark-400 rounded-md border border-dark-700">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
