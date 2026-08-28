import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer needs Node's net/tls modules, so this route must run on the
// Node.js runtime, not the Edge runtime.
export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  role?: string;
  company?: string;
  state?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const message = clean(body.message);
  const role = clean(body.role);
  const company = clean(body.company);
  const state = clean(body.state);
  const phone = clean(body.phone);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.error("Contact form: GMAIL_USER or GMAIL_APP_PASSWORD is not configured.");
    return NextResponse.json(
      { ok: false, error: "The contact form is not configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  const fieldRows: [string, string][] = [
    ["Full name", name],
    ["I am a", role || "Not specified"],
    ["Company / facility name", company || "Not specified"],
    ["State", state || "Not specified"],
    ["Email", email],
    ["Phone", phone || "Not specified"],
  ];

  const textBody = [
    "New message from the Quattro contact form.",
    "",
    ...fieldRows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  const htmlBody = `
    <div style="font-family:sans-serif;font-size:14px;color:#1a1a1a;line-height:1.6;">
      <p><strong>New message from the Quattro contact form.</strong></p>
      <table cellpadding="4" cellspacing="0" style="border-collapse:collapse;margin:12px 0;">
        ${fieldRows
          .map(
            ([label, value]) =>
              `<tr><td style="color:#666;padding-right:16px;vertical-align:top;">${label}</td><td>${value}</td></tr>`
          )
          .join("")}
      </table>
      <p style="color:#666;margin-bottom:4px;">Message:</p>
      <p style="white-space:pre-wrap;">${message}</p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: gmailUser,
      to: gmailUser,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form: failed to send email.", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send your message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
