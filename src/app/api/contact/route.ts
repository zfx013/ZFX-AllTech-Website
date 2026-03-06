import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
  website?: string;
}

/* =================================================================
   Simple in-memory rate limiter
   ================================================================= */

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window per IP

const ipRequestMap = new Map<string, { count: number; resetAt: number }>();
let lastCleanup = Date.now();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Lazy cleanup: purge stale entries every 5 minutes
  if (now - lastCleanup > 5 * 60_000) {
    lastCleanup = now;
    for (const [key, record] of ipRequestMap) {
      if (now > record.resetAt) {
        ipRequestMap.delete(key);
      }
    }
  }

  const record = ipRequestMap.get(ip);

  if (!record || now > record.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  record.count++;
  return record.count > RATE_LIMIT_MAX;
}

/* =================================================================
   HTML escape helper (for email templates)
   ================================================================= */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* =================================================================
   Validation
   ================================================================= */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez réessayer dans une minute." },
        { status: 429 }
      );
    }

    const body: ContactFormData = await request.json();

    // Honeypot check (bots fill this hidden field)
    if (body.website) {
      // Silently accept but do nothing — don't reveal honeypot to bots
      return NextResponse.json(
        { success: true, message: "Message reçu avec succès" },
        { status: 200 }
      );
    }

    // Trim inputs
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const company = (body.company ?? "").trim();
    const subject = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();

    // Required field validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Max length validation
    if (name.length > MAX_FIELD_LENGTH) {
      return NextResponse.json(
        { error: "Le nom est trop long" },
        { status: 400 }
      );
    }

    if (email.length > MAX_FIELD_LENGTH) {
      return NextResponse.json(
        { error: "L'email est trop long" },
        { status: 400 }
      );
    }

    if (company.length > MAX_FIELD_LENGTH || subject.length > MAX_FIELD_LENGTH) {
      return NextResponse.json(
        { error: "Champ trop long" },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Le message est trop long" },
        { status: 400 }
      );
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.length < 20) {
      return NextResponse.json(
        { error: "Message trop court" },
        { status: 400 }
      );
    }

    // Here you would integrate with your email service
    // Options: Resend, SendGrid, Nodemailer, Google Apps Script, etc.

    // Example with Resend (uncomment and add RESEND_API_KEY to env):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'ZFX AllTech <noreply@zfx-alltech.fr>',
      to: ['contact@zfx-alltech.fr'],
      subject: `Nouveau message de ${escapeHtml(name)} - ${escapeHtml(subject || 'Contact')}`,
      html: `
        <h2>Nouveau message depuis le site web</h2>
        <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Entreprise:</strong> ${escapeHtml(company || 'Non renseigné')}</p>
        <p><strong>Sujet:</strong> ${escapeHtml(subject || 'Non renseigné')}</p>
        <h3>Message:</h3>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });
    */

    // For now, just log the message (in development)
    console.log("New contact form submission:", {
      name,
      email,
      company,
      subject,
      message: message.substring(0, 100) + "...",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Message reçu avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
