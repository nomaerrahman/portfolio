import type { Config } from "tailwindcss";

const withVar = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        bg: withVar("bg"),
        surface: withVar("surface"),
        elevated: withVar("elevated"),
        border: withVar("border"),
        fg: withVar("fg"),
        muted: withVar("muted"),
        accent: withVar("accent"),
        "accent-fg": withVar("accent-fg"),
        corporate: withVar("corporate"),
        academic: withVar("academic"),
        startup: withVar("startup"),
        web: withVar("web"),
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["'Iowan Old Style'", "'Palatino Linotype'", "Georgia", "ui-serif", "serif"],
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem", "3xl": "1.75rem" },
      keyframes: {
        "blob-drift": {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%,-4%,0) scale(1.08)" },
          "66%": { transform: "translate3d(-5%,5%,0) scale(0.95)" },
        },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        "blob-drift": "blob-drift 22s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
