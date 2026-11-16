"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/profile";
import { sectionIndex } from "@/lib/sections";

const field =
  "w-full rounded-2xl border border-border bg-bg/60 px-4 py-3.5 text-[15px] outline-none transition placeholder:text-muted/60 focus:border-fg/40 focus:bg-bg";

const LINKS = [
  { href: `mailto:${profile.email}`, label: profile.email, icon: Mail },
  { href: profile.socials.linkedin, label: "linkedin.com/in/nomaer-rahman", icon: Linkedin },
  { href: profile.socials.github, label: "github.com/nomaerrahman", icon: Github },
  { href: profile.cvUrl, label: "Download my CV", icon: FileText },
];

/** One simple way to get in touch, for anyone. */
export function Contact() {
  const [sent, setSent] = useState(false);

  /** Opens the visitor's email app with the message ready to send. No backend, nothing stored. */
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const body = `${d.message}\n\n—\n${d.name}\n${d.email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${d.name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          index={sectionIndex("contact")}
          eyebrow="Contact"
          title={
            <>
              Let&apos;s <span className="font-serif font-normal italic text-accent">talk.</span>
            </>
          }
          description="A role, a project, an idea, or just a question about something I've built: send me a message."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <ul className="space-y-1">
              {LINKS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl px-2 py-3 transition-colors hover:bg-surface/60"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-elevated text-muted transition-colors group-hover:text-fg">
                      <Icon size={17} />
                    </span>
                    <span className="text-[15px]">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 px-2 text-sm text-muted">Based in {profile.location}.</p>
          </Reveal>

          <Reveal delay={0.1} className="card p-6 md:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[320px] flex-col items-center justify-center text-center"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-fg">
                    <Check size={24} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">Your email is ready.</h3>
                  <p className="mt-2 max-w-sm text-muted">
                    Your email app should have opened with the message filled in. If it didn&apos;t, email me at{" "}
                    <a href={`mailto:${profile.email}`} className="text-fg underline underline-offset-4">
                      {profile.email}
                    </a>
                    .
                  </p>
                  <Button variant="ghost" className="mt-5" onClick={() => setSent(false)}>
                    Write another
                  </Button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-sm text-muted">Name</span>
                      <input required name="name" autoComplete="name" className={field} />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-sm text-muted">Email</span>
                      <input required type="email" name="email" autoComplete="email" className={field} />
                    </label>
                  </div>
                  <label className="grid gap-2">
                    <span className="text-sm text-muted">Message</span>
                    <textarea required name="message" rows={6} minLength={10} placeholder="What's on your mind?" className={`${field} resize-none`} />
                  </label>
                  <div className="flex justify-end pt-1">
                    <Button type="submit" size="lg">
                      Write email <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
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
