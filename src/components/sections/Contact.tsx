"use client";

import {
  useState,
  useCallback,
  useRef,
  type JSX,
  type FormEvent,
  type ChangeEvent,
} from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
} from "lucide-react";
import MeshGradient from "../effects/MeshGradient";
import { ANIMATION_CONFIG } from "@/lib/constants";

/* =================================================================
   CONSTANTS
   ================================================================= */

const MESH_COLORS: [string, string] = ["#6366F1", "#A855F7"];

const SUBJECT_OPTIONS = [
  { value: "", label: "Choisir un sujet..." },
  { value: "site-web", label: "Site web" },
  { value: "application-mobile", label: "Application mobile" },
  { value: "logiciel-sur-mesure", label: "Logiciel sur mesure" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "autre", label: "Autre" },
] as const;

interface ContactInfo {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}

const CONTACT_INFOS: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "ZFX.AllTech@outlook.fr",
    href: "mailto:ZFX.AllTech@outlook.fr",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Intervention mondiale",
  },
  {
    icon: Clock,
    label: "Réactivité",
    value: "Réponse sous 24h",
  },
];

/* =================================================================
   TYPES
   ================================================================= */

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  /** Honeypot field */
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

/* =================================================================
   ANIMATION VARIANTS
   ================================================================= */

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger.normal,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.slow,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  },
};

const infoCardVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.5,
      ease: ANIMATION_CONFIG.easing.smooth,
    },
  }),
};

const statusVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ANIMATION_CONFIG.easing.smooth },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3 },
  },
};

/* =================================================================
   HELPERS
   ================================================================= */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Le nom est requis.";
  }

  if (!data.email.trim()) {
    errors.email = "L\u2019email est requis.";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Format d\u2019email invalide.";
  }

  if (!data.subject.trim()) {
    errors.subject = "Le sujet est requis.";
  }

  return errors;
}

/* =================================================================
   SHARED STYLES
   ================================================================= */

const INPUT_BASE_CLASSES =
  "w-full rounded-xl bg-transparent border border-[var(--border)] px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--muted)]/40 transition-all duration-300 focus:outline-none focus:border-[#6366F1] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15),0_0_20px_rgba(99,102,241,0.1)]";

/* =================================================================
   SUB-COMPONENTS
   ================================================================= */

/**
 * ContactInfoCard -- a small glass panel for a contact detail.
 */
interface ContactInfoCardProps {
  info: ContactInfo;
  index: number;
}

function ContactInfoCard({ info, index }: ContactInfoCardProps): JSX.Element {
  const Icon = info.icon;

  const content = (
    <div className="flex items-center gap-4">
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
        style={{
          background:
            "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.1))",
          border: "1px solid rgba(99, 102, 241, 0.2)",
        }}
      >
        <Icon
          size={18}
          style={{ color: "#6366F1" }}
          aria-hidden="true"
        />
      </div>
      <span className="text-sm text-[var(--fg)] font-medium">
        {info.value}
      </span>
    </div>
  );

  if (info.href) {
    return (
      <motion.a
        href={info.href}
        variants={infoCardVariants}
        custom={index}
        className="glass group block rounded-xl px-4 py-3.5 transition-all duration-300 hover:border-[#6366F1]/30 focus-visible:outline-2 focus-visible:outline-[#6366F1]"
        style={{
          borderColor: "rgba(255, 255, 255, 0.06)",
        }}
        whileHover={{
          scale: 1.02,
          boxShadow:
            "0 0 24px rgba(99, 102, 241, 0.15), 0 0 48px rgba(168, 85, 247, 0.06)",
        }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      variants={infoCardVariants}
      custom={index}
      className="glass rounded-xl px-4 py-3.5"
    >
      {content}
    </motion.div>
  );
}

/**
 * FormField -- a labeled input wrapper with error display.
 */
interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({
  label,
  id,
  error,
  required,
  children,
}: FormFieldProps): JSX.Element {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-[var(--fg)]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#6366F1]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            id={errorId}
            variants={statusVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
            role="alert"
          >
            <AlertCircle size={12} aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =================================================================
   MAIN COMPONENT — Contact
   ================================================================= */

export default function Contact(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  /* ---- form state ---- */
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  /* ---- handlers ---- */
  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear field error on input
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name as keyof FormErrors];
          return next;
        });
      }

      // Clear status messages when user starts typing again
      if (status === "success" || status === "error") {
        setStatus("idle");
      }
    },
    [errors, status],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Honeypot check
      if (formData.website) return;

      // Validate
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("loading");
      setErrors({});

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            subject: formData.subject,
            message: formData.message,
            website: formData.website,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Erreur lors de l'envoi");
        }

        setStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: "",
          website: "",
        });
      } catch {
        setStatus("error");
      }
    },
    [formData],
  );

  /* ================================================================
     RENDER
     ================================================================ */
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-contact noise-overlay relative overflow-hidden py-32"
      aria-labelledby="contact-heading"
    >
      {/* ---- Background ---- */}
      <MeshGradient colors={MESH_COLORS} opacity={0.12} />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, #6366F1 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, #A855F7 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* ===================== HEADER ========================= */}
        <motion.div
          className="mb-16 text-center"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Badge */}
          <motion.span
            variants={headerVariants}
            className="mb-6 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{
              color: "#6366F1",
              borderColor: "rgba(99, 102, 241, 0.3)",
              background: "rgba(99, 102, 241, 0.08)",
            }}
          >
            Contact
          </motion.span>
        </motion.div>

        {/* ================= 2-COLUMN LAYOUT ==================== */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---------- LEFT COLUMN: Info ---------- */}
          <motion.div
            className="flex flex-col justify-center"
            variants={sectionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Heading */}
            <motion.h2
              id="contact-heading"
              variants={columnVariants}
              className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Parlons de votre{" "}
              <span className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">
                projet
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={columnVariants}
              className="mb-10 max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg"
            >
              Une id&eacute;e ? Un besoin ? Discutons ensemble.
            </motion.p>

            {/* Contact info cards */}
            <div className="mb-10 flex flex-col gap-3">
              {CONTACT_INFOS.map((info, i) => (
                <ContactInfoCard key={info.label} info={info} index={i} />
              ))}
            </div>

            {/* Stats pills */}
            <motion.div
              variants={columnVariants}
              className="flex gap-3"
            >
              {["Devis gratuit", "Sans engagement"].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-2 rounded-full px-4 py-2"
                  style={{
                    background: "rgba(99, 102, 241, 0.08)",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                  }}
                >
                  <CheckCircle2
                    size={14}
                    style={{ color: "#6366F1" }}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-[var(--fg)]">
                    {text}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ---------- RIGHT COLUMN: Form ---------- */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div
              className="glass relative rounded-2xl p-6 sm:p-8"
              style={{
                border: "1px solid transparent",
                backgroundImage:
                  "linear-gradient(var(--card), var(--card)), linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.15))",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              {/* Gradient accent top line */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #6366F1, #A855F7, transparent)",
                  opacity: 0.5,
                }}
                aria-hidden="true"
              />

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* Row: Nom + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="Nom"
                    id="contact-name"
                    error={errors.name}
                    required
                  >
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      className={`${INPUT_BASE_CLASSES} ${errors.name ? "shadow-[0_0_0_3px_rgba(239,68,68,0.15)]" : ""}`}
                    />
                  </FormField>

                  <FormField
                    label="Email"
                    id="contact-email"
                    error={errors.email}
                    required
                  >
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.fr"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      className={`${INPUT_BASE_CLASSES} ${errors.email ? "shadow-[0_0_0_3px_rgba(239,68,68,0.15)]" : ""}`}
                    />
                  </FormField>
                </div>

                {/* Entreprise */}
                <FormField
                  label="Entreprise"
                  id="contact-company"
                >
                  <input
                    type="text"
                    id="contact-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Votre entreprise (optionnel)"
                    className={INPUT_BASE_CLASSES}
                  />
                </FormField>

                {/* Sujet */}
                <FormField label="Sujet" id="contact-subject" error={errors.subject} required>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    aria-label="Choisir un sujet"
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    className={`${INPUT_BASE_CLASSES} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999999%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10`}
                  >
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        style={{
                          background: "#0a0a0a",
                          color: "#f0f0f0",
                        }}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </FormField>

                {/* Message */}
                <FormField
                  label="Message"
                  id="contact-message"
                >
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet en quelques mots (optionnel)..."
                    rows={5}
                    className={`${INPUT_BASE_CLASSES} resize-none`}
                  />
                </FormField>

                {/* Honeypot */}
                <div
                  className="hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="contact-website">Website</label>
                  <input
                    type="text"
                    id="contact-website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6366F1] disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366F1, #A855F7)",
                    boxShadow:
                      "0 0 24px rgba(99, 102, 241, 0.25), 0 4px 16px rgba(99, 102, 241, 0.15)",
                  }}
                  whileHover={
                    status !== "loading"
                      ? {
                          scale: 1.02,
                          boxShadow:
                            "0 0 40px rgba(99, 102, 241, 0.4), 0 8px 32px rgba(168, 85, 247, 0.25)",
                        }
                      : undefined
                  }
                  whileTap={
                    status !== "loading" ? { scale: 0.98 } : undefined
                  }
                >
                  {status === "loading" ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                        aria-hidden="true"
                      />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" />
                      <span>Envoyer le message</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </motion.button>

                {/* Status messages */}
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      key="success"
                      variants={statusVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-emerald-400"
                      style={{
                        background: "rgba(16, 185, 129, 0.08)",
                        border: "1px solid rgba(16, 185, 129, 0.2)",
                      }}
                      role="status"
                    >
                      <CheckCircle2 size={16} aria-hidden="true" />
                      Message envoy&eacute; avec succ&egrave;s !
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      key="error"
                      variants={statusVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-red-400"
                      style={{
                        background: "rgba(239, 68, 68, 0.08)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                      }}
                      role="alert"
                    >
                      <AlertCircle size={16} aria-hidden="true" />
                      Une erreur est survenue. R&eacute;essayez.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
