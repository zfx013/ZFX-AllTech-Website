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

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const ipRequestMap = new Map<string, { count: number; resetAt: number }>();
let lastCleanup = Date.now();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

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
   Validation
   ================================================================= */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 5000;

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyIY-nJZQJnkwCPd-jUIGogMjGDPww-VWe3ZF9C5kIpo1sgqfZb0zenAtwlS9pDEUPN/exec";

export async function POST(request: NextRequest) {
  try {
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

    // Honeypot check
    if (body.website) {
      return NextResponse.json(
        { success: true, message: "Message reçu avec succès" },
        { status: 200 }
      );
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const company = (body.company ?? "").trim();
    const subject = (body.subject ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    if (name.length > MAX_FIELD_LENGTH || email.length > MAX_FIELD_LENGTH) {
      return NextResponse.json({ error: "Champ trop long" }, { status: 400 });
    }

    if (
      company.length > MAX_FIELD_LENGTH ||
      subject.length > MAX_FIELD_LENGTH
    ) {
      return NextResponse.json({ error: "Champ trop long" }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Le message est trop long" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (message.length < 20) {
      return NextResponse.json(
        { error: "Message trop court" },
        { status: 400 }
      );
    }

    // Forward to Google Apps Script (server-side — URL hidden from client)
    await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, subject, message }),
    });

    return NextResponse.json(
      { success: true, message: "Message reçu avec succès" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
