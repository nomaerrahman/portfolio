import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider, themeScript } from "@/components/providers/theme-provider";
import { AudienceProvider } from "@/components/providers/audience-provider";
import { UIProvider } from "@/components/providers/ui-provider";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} · Builder, Researcher, Founder`,
  description:
    "Nom: data engineer, MSc Data Science & AI researcher at Brunel University London, web developer and co-founder of Mango Media.",
  openGraph: {
    title: `${profile.name} · Builder, Researcher, Founder`,
    description: "Selected work, research and ventures.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`dark ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="noise">
        <ThemeProvider>
          <AudienceProvider>
            <UIProvider>{children}</UIProvider>
          </AudienceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
