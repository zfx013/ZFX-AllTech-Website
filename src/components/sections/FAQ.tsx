'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'pricing',
    question: 'Quels sont vos tarifs ?',
    answer: 'Les tarifs sont établis sur devis selon la complexité et l\'envergure du projet. Chaque projet étant unique, je prends le temps d\'analyser vos besoins spécifiques pour vous proposer une estimation détaillée et transparente. N\'hésitez pas à me contacter pour obtenir un devis personnalisé gratuit.',
  },
  {
    id: 'timeline',
    question: 'Quels sont vos délais de réalisation ?',
    answer: 'Les délais varient en fonction de la complexité du projet, généralement entre 2 et 8 semaines. Un site vitrine simple peut être réalisé en 2-3 semaines, tandis qu\'une application web complexe peut nécessiter 6-8 semaines ou plus. Je fournis toujours un planning détaillé avant le début du projet.',
  },
  {
    id: 'remote',
    question: 'Travaillez-vous à distance ?',
    answer: 'Oui, absolument ! Je travaille 100% à distance, ce qui me permet de collaborer avec des clients partout en France et dans le monde francophone. J\'utilise des outils modernes de communication (visioconférence, gestion de projet, partage d\'écran) pour assurer un suivi optimal et une collaboration fluide tout au long du projet.',
  },
  {
    id: 'maintenance',
    question: 'Proposez-vous une maintenance ?',
    answer: 'Oui, je propose des contrats de maintenance adaptés à vos besoins. Ces contrats incluent les mises à jour de sécurité, les corrections de bugs, l\'ajout de fonctionnalités mineures, et un support technique prioritaire. Plusieurs formules sont disponibles selon la fréquence d\'intervention souhaitée.',
  },
  {
    id: 'technologies',
    question: 'Quelles technologies utilisez-vous ?',
    answer: 'J\'utilise des technologies modernes et éprouvées : React et Next.js pour le frontend, Node.js et Python pour le backend, PostgreSQL et MongoDB pour les bases de données. Je choisis toujours la stack technique la plus adaptée à votre projet, en privilégiant performance, maintenabilité et évolutivité.',
  },
  {
    id: 'payment',
    question: 'Comment se passe le paiement ?',
    answer: 'Le paiement se fait en deux fois : un acompte de 30-50% au démarrage du projet pour valider la commande, puis le solde à la livraison finale. Pour les projets de grande envergure, nous pouvons convenir d\'un échéancier en plusieurs phases. Factures conformes avec TVA, paiement par virement bancaire.',
  },
];

function FAQAccordionItem({
  faq,
  isOpen,
  onToggle,
  index
}: {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      {/* Animated gradient border on hover and when open */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-500/50 via-emerald-500/50 to-violet-500/50"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          backgroundPosition: isOpen ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%'
        }}
        style={{ backgroundSize: '200% 200%' }}
        transition={{
          opacity: { duration: 0.3 },
          backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' }
        }}
      />
      <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-violet-500/50 to-emerald-500/50" />

      <div className={`relative rounded-2xl bg-dark-900/80 backdrop-blur-xl border overflow-hidden transition-all duration-300 ${isOpen ? 'border-violet-500/30 shadow-lg shadow-violet-500/10' : 'border-dark-800'}`}>
        {/* Hover gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-emerald-500/5 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

        {/* Animated glow when open */}
        {isOpen && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-emerald-500/10"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Question button */}
        <button
          onClick={onToggle}
          className={`relative w-full text-left p-6 flex items-start justify-between gap-4 cursor-pointer transition-colors duration-300 ${isOpen ? 'bg-dark-800/30' : 'group-hover:bg-dark-800/30'}`}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${faq.id}`}
        >
          {/* Question number indicator */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-emerald-500/20 border border-violet-500/30 flex items-center justify-center">
            <span className="text-sm font-bold bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="flex-1">
            <motion.h3
              itemProp="name"
              className={`text-lg font-semibold transition-all duration-300 ${isOpen ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400' : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-emerald-400'}`}
            >
              {faq.question}
            </motion.h3>
          </div>

          {/* Icon with rotation and color animation */}
          <motion.div
            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gradient-to-br from-violet-500 to-emerald-500' : 'bg-gradient-to-br from-violet-500/20 to-emerald-500/20 border border-violet-500/30'}`}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <Minus className="w-5 h-5 text-white" />
            ) : (
              <Plus className="w-5 h-5 text-violet-400" />
            )}
          </motion.div>
        </button>

        {/* Answer with smooth height animation */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-answer-${faq.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.3, ease: 'easeInOut' }
              }}
              className="overflow-hidden"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-6"
              >
                {/* Separator line with animated gradient */}
                <motion.div
                  className="h-px mb-4"
                  style={{
                    background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(139, 92, 246, 0.3) 100%)',
                    backgroundSize: '200% 100%'
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />

                <div
                  itemProp="text"
                  className="text-dark-300 leading-relaxed pl-12"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{faq.answer}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="relative py-24 lg:py-32 overflow-hidden"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-emerald-500/20 border border-violet-500/30 mb-6"
          >
            <HelpCircle className="w-8 h-8 text-violet-400" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4"
          >
            Questions Fréquentes
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Des questions ?{' '}
            <span className="gradient-text">On vous répond</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-300"
          >
            Retrouvez les réponses aux questions les plus fréquemment posées.
            Pour toute autre question, n&apos;hésitez pas à me contacter directement.
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQAccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
              index={index}
            />
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="relative max-w-2xl mx-auto">
            {/* Outer glow effect */}
            <motion.div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-violet-500/30 via-emerald-500/30 to-violet-500/30 blur-2xl"
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative p-10 rounded-3xl bg-gradient-to-br from-dark-900/90 via-violet-900/20 to-dark-900/90 border border-violet-500/30 backdrop-blur-xl overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-30">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.3) 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                  }}
                  animate={{ backgroundPosition: ['0px 0px', '32px 32px'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Floating icon */}
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </motion.div>

              <div className="relative pt-4">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Une question specifique ?
                </h3>
                <p className="text-lg text-dark-300 mb-6">
                  Je reponds personnellement a toutes vos questions sous 24h.
                </p>

                {/* Trust badges */}
                <div className="flex justify-center gap-6 mb-8">
                  {[
                    { icon: CheckCircle, text: 'Reponse rapide' },
                    { icon: CheckCircle, text: 'Devis gratuit' },
                    { icon: CheckCircle, text: 'Sans engagement' }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-2 text-sm text-dark-400"
                    >
                      <item.icon className="w-4 h-4 text-emerald-400" />
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.a
                  href="#contact"
                  className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-emerald-500 text-white font-bold text-lg shadow-xl shadow-violet-500/30 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    initial={{ x: '-200%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />

                  <span className="relative">Contactez-moi maintenant</span>
                  <motion.span
                    className="relative"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
