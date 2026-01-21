'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle, Loader2, Clock, HelpCircle, ChevronDown, AlertCircle, Building2, Phone, Briefcase } from 'lucide-react';

const MAX_MESSAGE_LENGTH = 1000;

const projectTypes = [
  { value: '', label: 'Type de projet' },
  { value: 'website', label: 'Site Web / Landing Page' },
  { value: 'webapp', label: 'Application Web' },
  { value: 'mobile', label: 'Application Mobile' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'api', label: 'API / Backend' },
  { value: 'consulting', label: 'Conseil / Audit' },
  { value: 'other', label: 'Autre' },
];

const faqItems = [
  {
    question: "Quels sont vos tarifs ?",
    answer: "Les tarifs sont personnalisés selon la complexité et les besoins spécifiques de chaque projet. Chaque devis est gratuit et sans engagement. Je propose des formules adaptées : forfait projet, tarif journalier ou accompagnement mensuel."
  },
  {
    question: "Quels sont vos délais de livraison ?",
    answer: "Les délais varient selon l'envergure du projet. Un site vitrine prend généralement 2-4 semaines, une application web 1-3 mois. Je vous fournis un planning détaillé dès le début avec des jalons clairs pour suivre l'avancement."
  },
  {
    question: "Travaillez-vous à distance ?",
    answer: "Oui, je travaille 100% en remote avec des outils de collaboration modernes (visio, Slack, Notion...). Je suis disponible pour des réunions régulières et reste très réactif. Des rencontres en personne sont possibles en Île-de-France."
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer: "Je maîtrise les technologies modernes : React, Next.js, TypeScript pour le frontend, Node.js, Python pour le backend, et des solutions cloud (AWS, Vercel). Je choisis toujours la stack la plus adaptée à votre projet."
  }
];

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  projectType?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Le nom est requis';
        if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
        return undefined;
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        if (!validateEmail(value)) return 'Veuillez entrer une adresse email valide';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Le message est requis';
        if (value.trim().length < 10) return 'Le message doit contenir au moins 10 caractères';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setFocusedField(null);
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors: FormErrors = {};
    ['name', 'email', 'message'].forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setStatus('loading');

    try {
      // Simulate form submission
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional errors for demo
          if (Math.random() > 0.9) {
            reject(new Error('Network error'));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      setStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', phone: '', projectType: '', message: '' });
        setTouched({});
        setErrors({});
        setTimeout(() => setStatus('idle'), 2000);
      }, 1000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const characterCount = formData.message.length;
  const isOverLimit = characterCount > MAX_MESSAGE_LENGTH;
  const hasErrors = Object.values(errors).some(error => error);

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 animated-grid opacity-10" />
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Decorative 3D Elements - hidden on mobile to prevent overflow */}
      <motion.div
        className="hidden md:block absolute top-20 right-10 w-32 h-32 hexagon bg-gradient-to-br from-violet-600/10 to-emerald-600/10 backdrop-blur-sm border border-violet-500/20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="hidden md:block absolute bottom-32 left-10 w-24 h-24 diamond bg-gradient-to-br from-emerald-600/10 to-violet-600/10 backdrop-blur-sm border border-emerald-500/20"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4"
          >
            Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Démarrons votre{' '}
            <span className="gradient-text">projet</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-300"
          >
            Une idée ? Un projet ? Discutons-en ! Je vous réponds sous 24h.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Left: Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">
                Informations de contact
              </h3>

              {/* Response Guarantee Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-xl bg-gradient-to-r from-violet-600/20 to-emerald-600/20 border border-violet-500/30 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Réponse garantie</p>
                    <p className="text-sm text-dark-300">Sous 24h maximum</p>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-4">
                <motion.a
                  href="mailto:contact@zfx-alltech.fr"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass-light border border-dark-700 hover:border-violet-500/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/10 flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-violet-600/20 transition-all">
                    <Mail className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-400">Email</p>
                    <p className="text-white group-hover:text-violet-400 transition-colors font-medium">
                      contact@zfx-alltech.fr
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-4 p-4 rounded-xl glass-light border border-dark-700"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-400">Localisation</p>
                    <p className="text-white font-medium">Île-de-France, France</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  Retrouvez-moi
                </h3>
                <div className="flex gap-4">
                  <motion.a
                    href="https://github.com/zfx013"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl glass-light border border-dark-700 flex items-center justify-center text-dark-400 hover:text-white hover:border-violet-500/50 transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/zfx-alltech"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl glass-light border border-dark-700 flex items-center justify-center text-dark-400 hover:text-white hover:border-emerald-500/50 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">
                  FAQ rapide
                </h3>
              </div>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="rounded-xl glass-light border border-dark-700 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      aria-expanded={expandedFaq === index}
                      aria-controls={`contact-faq-answer-${index}`}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-inset"
                    >
                      <span id={`contact-faq-question-${index}`} className="text-white font-medium">{item.question}</span>
                      <motion.div
                        animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-5 h-5 text-dark-400" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          id={`contact-faq-answer-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                          role="region"
                          aria-labelledby={`contact-faq-question-${index}`}
                        >
                          <div className="px-4 pb-4 pt-0">
                            <p className="text-dark-300 text-sm leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="glass-light border border-dark-700 rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden">
              {/* Success/Error Overlay */}
              <AnimatePresence>
                {(status === 'success' || status === 'error') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-dark-900/95 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl"
                    role="alert"
                    aria-live="polite"
                  >
                    <div className="text-center px-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                          status === 'success'
                            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                            : 'bg-gradient-to-br from-red-500 to-red-600'
                        }`}
                      >
                        {status === 'success' ? (
                          <CheckCircle className="w-10 h-10 text-white" />
                        ) : (
                          <AlertCircle className="w-10 h-10 text-white" />
                        )}
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-white mb-2"
                      >
                        {status === 'success' ? 'Message envoyé !' : 'Erreur d\'envoi'}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-dark-300"
                      >
                        {status === 'success'
                          ? 'Je vous réponds sous 24h'
                          : 'Une erreur est survenue. Veuillez réessayer ou me contacter par email.'}
                      </motion.p>
                      {status === 'error' && (
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          onClick={() => setStatus('idle')}
                          className="mt-4 px-6 py-2 rounded-lg bg-dark-700 text-white hover:bg-dark-600 transition-colors"
                        >
                          Réessayer
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name Field with Floating Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => handleBlur('name')}
                    required
                    aria-required="true"
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-4 pt-6 pb-2 rounded-xl bg-dark-800/50 border-2 text-white placeholder-transparent focus:outline-none transition-all peer ${
                      touched.name && errors.name
                        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                        : 'border-dark-700 focus:border-violet-500 focus:shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                    }`}
                    placeholder="Votre nom"
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'name' || formData.name
                        ? `top-2 text-xs ${touched.name && errors.name ? 'text-red-400' : 'text-violet-400'}`
                        : 'top-4 text-base text-dark-400'
                    }`}
                  >
                    Nom complet <span className="text-red-400">*</span>
                  </label>
                  <AnimatePresence>
                    {touched.name && errors.name && (
                      <motion.p
                        id="name-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1 text-xs text-red-400 flex items-center gap-1"
                        role="alert"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email Field with Floating Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="relative"
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => handleBlur('email')}
                    required
                    aria-required="true"
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 pt-6 pb-2 rounded-xl bg-dark-800/50 border-2 text-white placeholder-transparent focus:outline-none transition-all peer ${
                      touched.email && errors.email
                        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                        : 'border-dark-700 focus:border-violet-500 focus:shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                    }`}
                    placeholder="votre@email.com"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'email' || formData.email
                        ? `top-2 text-xs ${touched.email && errors.email ? 'text-red-400' : 'text-violet-400'}`
                        : 'top-4 text-base text-dark-400'
                    }`}
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <AnimatePresence>
                    {touched.email && errors.email && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1 text-xs text-red-400 flex items-center gap-1"
                        role="alert"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Company & Phone Fields - Optional row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 pointer-events-none">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-800/50 border-2 border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
                      placeholder="Entreprise (optionnel)"
                    />
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 }}
                    className="relative"
                  >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 pointer-events-none">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-800/50 border-2 border-dark-700 text-white placeholder:text-dark-500 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
                      placeholder="Telephone (optionnel)"
                    />
                  </motion.div>
                </div>

                {/* Project Type Select */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500 pointer-events-none">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={(e) => handleChange('projectType', e.target.value)}
                    onFocus={() => setFocusedField('projectType')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-800/50 border-2 border-dark-700 text-white focus:outline-none focus:border-violet-500 focus:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all appearance-none cursor-pointer"
                    style={{ colorScheme: 'dark' }}
                  >
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value} className="bg-dark-800">
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 pointer-events-none">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </motion.div>

                {/* Message Field with Floating Label & Character Count */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 }}
                  className="relative"
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => handleBlur('message')}
                    required
                    aria-required="true"
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                    rows={5}
                    maxLength={MAX_MESSAGE_LENGTH}
                    className={`w-full px-4 pt-6 pb-2 rounded-xl bg-dark-800/50 border-2 text-white placeholder-transparent focus:outline-none transition-all resize-none peer ${
                      touched.message && errors.message
                        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                        : 'border-dark-700 focus:border-violet-500 focus:shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                    }`}
                    placeholder="Decrivez votre projet..."
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      focusedField === 'message' || formData.message
                        ? `top-2 text-xs ${touched.message && errors.message ? 'text-red-400' : 'text-violet-400'}`
                        : 'top-4 text-base text-dark-400'
                    }`}
                  >
                    Decrivez votre projet <span className="text-red-400">*</span>
                  </label>
                  <div className="absolute bottom-3 right-4 text-xs" id="message-hint">
                    <span className={`transition-colors ${
                      isOverLimit ? 'text-red-400' :
                      characterCount > MAX_MESSAGE_LENGTH * 0.8 ? 'text-orange-400' :
                      'text-dark-500'
                    }`}>
                      {characterCount}/{MAX_MESSAGE_LENGTH}
                    </span>
                  </div>
                  <AnimatePresence>
                    {touched.message && errors.message && (
                      <motion.p
                        id="message-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1 text-xs text-red-400 flex items-center gap-1"
                        role="alert"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="pt-2"
                >
                  <motion.button
                    type="submit"
                    disabled={status === 'loading' || status === 'success' || isOverLimit || hasErrors}
                    whileHover={{ scale: status === 'loading' || status === 'success' || hasErrors ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'loading' || status === 'success' || hasErrors ? 1 : 0.98 }}
                    className="w-full relative overflow-hidden rounded-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                    aria-busy={status === 'loading'}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-violet-500 to-emerald-500 opacity-100 group-hover:opacity-0 group-disabled:opacity-50 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-violet-500 to-violet-600 opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-300" />
                    <div className="relative px-8 py-4 flex items-center justify-center gap-3">
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="font-semibold text-white">Envoi en cours...</span>
                        </>
                      ) : status === 'success' ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold text-white">Message envoye !</span>
                        </>
                      ) : status === 'error' ? (
                        <>
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-semibold text-white">Erreur - Reessayer</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:rotate-12 group-hover:translate-x-1 transition-transform duration-300" />
                          <span className="font-semibold text-white">Envoyer le message</span>
                        </>
                      )}
                    </div>
                  </motion.button>

                  {/* Privacy Note */}
                  <p className="text-xs text-dark-500 text-center mt-4">
                    En soumettant ce formulaire, vous acceptez que vos donnees soient utilisees pour vous recontacter.
                    Vos informations ne seront jamais partagees.
                  </p>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
