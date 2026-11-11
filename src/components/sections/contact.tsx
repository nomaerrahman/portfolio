"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Briefcase, CalendarClock, Check, ChevronDown, GraduationCap, Loader2, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { useAudience, useSectionIndex } from "@/components/providers/audience-provider";
import { useUI } from "@/components/providers/ui-provider";
import type { InquiryType } from "@/lib/audience";
import { profile } from "@/data/profile";
import { EASE, cn } from "@/lib/utils";

const INQUIRIES: {
  id: InquiryType;
  label: string;
  icon: typeof Briefcase;
  tone: string;
  extra: { name: string; label: string; placeholder: string };
  prompt: string;
}[] = [
  {
    id: "recruiter",
    label: "Recruiter / Job Opportunity",
    icon: Briefcase,
    tone: "corporate",
    extra: { name: "company", label: "Company & role", placeholder: "Acme · Graduate Data Engineer" },
    prompt: "Tell me about the team, the role and timelines.",
  },
  {
    id: "academic",
    label: "Academic Collaboration",
    icon: GraduationCap,
    tone: "academic",
    extra: { name: "institution", label: "Institution / lab", placeholder: "University, group or lab" },
    prompt: "What research question are you exploring?",
  },
  {
    id: "client",
    label: "Client Project / Startup Inquiry",
    icon: Rocket,
    tone: "startup",
    extra: { name: "budget", label: "Budget range", placeholder: "e.g. £1–3k" },
    prompt: "What does your business do, and what would success look like?",
  },
];

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-2xl border border-border bg-bg/60 px-4 py-3.5 text-[15px] outline-none transition placeholder:text-muted/60 focus:border-fg/40 focus:bg-bg";

export function Contact() {
  const sectionIndex = useSectionIndex("contact");
  const { config } = useAudience();
  const { inquiry: requested, openBooking } = useUI();
  const [inquiry, setInquiry] = useState<InquiryType>(config.inquiry);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // Follow the audience switcher and any CTA that pre-selects an inquiry type.
  useEffect(() => setInquiry(config.inquiry), [config.inquiry]);
  useEffect(() => {
    if (requested) setInquiry(requested);
  }, [requested]);

  const current = INQUIRIES.find((i) => i.id === inquiry)!;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, inquiry }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          index={sectionIndex}
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build <span className="font-serif font-normal italic" style={{ color: `hsl(var(--${current.tone}))` }}>something</span> together.
            </>
          }
          description="Pick what you're here for and the form adapts. I reply within two working days."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="flex flex-col gap-3">
            {INQUIRIES.map((q) => {
              const on = q.id === inquiry;
              const Icon = q.icon;
              return (
                <button
                  key={q.id}
                  onClick={() => setInquiry(q.id)}
                  className={cn(
                    "flex items-center gap-4 rounded-3xl border p-5 text-left transition-all duration-500",
                    on ? "bg-surface" : "border-border bg-surface/30 hover:bg-surface/60"
                  )}
                  style={on ? { borderColor: `hsl(var(--${q.tone}) / 0.5)` } : undefined}
                >
                  <span
                    className="grid h-11 w-11 place-items-center rounded-2xl transition-colors"
                    style={{
                      background: on ? `hsl(var(--${q.tone}))` : "hsl(var(--elevated))",
                      color: on ? "hsl(var(--bg))" : "hsl(var(--muted))",
                    }}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="flex-1 font-medium">{q.label}</span>
                  {on && <motion.span layoutId="inq-dot" className="h-2 w-2 rounded-full" style={{ background: `hsl(var(--${q.tone}))` }} />}
                </button>
              );
            })}

            <div className="mt-3 rounded-3xl border border-dashed border-border p-6">
              <p className="font-medium">Prefer to talk?</p>
              <p className="mt-1 text-sm text-muted">Grab 20 minutes in my calendar. No forms needed.</p>
              <Button variant="outline" className="mt-4" onClick={openBooking}>
                <CalendarClock size={15} /> Open calendar
              </Button>
              <p className="mt-4 text-sm text-muted">
                or email <a href={`mailto:${profile.email}`} className="text-fg underline-offset-4 hover:underline">{profile.email}</a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur md:p-10">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 15 }}
                    className="grid h-16 w-16 place-items-center rounded-full text-bg"
                    style={{ background: `hsl(var(--${current.tone}))` }}
                  >
                    <Check size={28} />
                  </motion.span>
                  <h3 className="mt-6 text-2xl font-semibold">Message sent.</h3>
                  <p className="mt-2 max-w-sm text-muted">Thanks for reaching out. I&apos;ll get back to you within two working days.</p>
                  <Button variant="ghost" className="mt-6" onClick={() => setStatus("idle")}>
                    Send another
                  </Button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4">
                  <label className="grid gap-2">
                    <span className="text-sm text-muted">Inquiry type</span>
                    <span className="relative">
                      <select value={inquiry} onChange={(e) => setInquiry(e.target.value as InquiryType)} className={cn(field, "appearance-none pr-10")} name="inquiryType">
                        {INQUIRIES.map((q) => (
                          <option key={q.id} value={q.id}>
                            {q.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
                    </span>
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-sm text-muted">Name</span>
                      <input required name="name" autoComplete="name" placeholder="Your name" className={field} />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-sm text-muted">Email</span>
                      <input required type="email" name="email" autoComplete="email" placeholder="you@company.com" className={field} />
                    </label>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.label
                      key={current.extra.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="grid gap-2"
                    >
                      <span className="text-sm text-muted">{current.extra.label}</span>
                      <input name={current.extra.name} placeholder={current.extra.placeholder} className={field} />
                    </motion.label>
                  </AnimatePresence>

                  <label className="grid gap-2">
                    <span className="text-sm text-muted">Message</span>
                    <textarea required name="message" rows={5} placeholder={current.prompt} className={cn(field, "resize-none")} minLength={10} />
                  </label>

                  {/* honeypot */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-muted">Your details are only used to reply to you.</p>
                    <Button type="submit" size="lg" disabled={status === "sending"}>
                      {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : null}
                      {status === "sending" ? "Sending" : "Send message"}
                      {status !== "sending" && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
