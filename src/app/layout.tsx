import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider, themeScript } from "@/components/providers/theme-provider";
import { AudienceProvider } from "@/components/providers/audience-provider";
import { UIProvider } from "@/components/providers/ui-provider";
import { profile } from "@/data/profile";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BookingModal } from "@/components/sections/booking-modal";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-two-gray-53.vercel.app"),
  title: `${profile.name} · Data Engineer & Founder`,
  description:
    "Nom: data engineer, MSc Data Science and Analytics student at Brunel University London, web developer and founder of HypeSpark.",
  openGraph: {
    title: `${profile.name} · Data Engineer & Founder`,
    description: "Data engineering, analytics and web projects, plus HypeSpark.",
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
            <UIProvider>
              <Navbar />
              {children}
              <Footer />
              <BookingModal />
            </UIProvider>
          </AudienceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
