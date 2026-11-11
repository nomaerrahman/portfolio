import { NextResponse } from "next/server";

const INQUIRIES = ["recruiter", "academic", "client"] as const;

/**
 * Contact form endpoint. It validates input and logs it. To deliver real email,
 * plug in a provider here (Resend, Postmark, Formspree, a Notion/Sheets webhook…).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields.
  if (body.website) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const inquiry = String(body.inquiry ?? "");

  if (!name || name.length > 120) return NextResponse.json({ error: "Please add your name." }, { status: 422 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Please use a valid email." }, { status: 422 });
  if (message.length < 10 || message.length > 5000)
    return NextResponse.json({ error: "Message should be 10–5000 characters." }, { status: 422 });
  if (!INQUIRIES.includes(inquiry as (typeof INQUIRIES)[number]))
    return NextResponse.json({ error: "Unknown inquiry type." }, { status: 422 });

  // TODO: send with your email provider, e.g.
  // await resend.emails.send({ from: "site@yourdomain.com", to: "you@…", subject: `[${inquiry}] ${name}`, text: message, replyTo: email });
  console.info("[contact]", { inquiry, name, email, company: body.company, institution: body.institution, budget: body.budget, message });

  return NextResponse.json({ ok: true });
}
