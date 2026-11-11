import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  const links = [
    { href: profile.socials.github, label: "GitHub", icon: Github },
    { href: profile.socials.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
    { href: profile.cvUrl, label: "CV", icon: FileText },
  ];
  return (
    <footer className="relative border-t border-border">
      <div className="container overflow-hidden py-14">
        <p
          aria-hidden
          className="select-none whitespace-nowrap text-[18vw] font-semibold leading-[0.8] tracking-[-0.06em] text-fg/[0.04] md:text-[13vw]"
        >
          Build · Research · Found
        </p>
        <div className="mt-10 flex flex-col justify-between gap-6 text-sm text-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with Next.js & Framer Motion.
          </p>
          <ul className="flex gap-2">
            {links.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 transition hover:border-fg/40 hover:text-fg"
                >
                  <Icon size={14} /> {label}
                  <ArrowUpRight size={12} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
