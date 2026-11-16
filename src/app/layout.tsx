import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider, themeScript } from "@/components/providers/theme-provider";
import { profile } from "@/data/profile";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-two-gray-53.vercel.app"),
  title: `${profile.name} · Builder, Data Engineer & Co-founder`,
  description:
    "Nomaer Naiem (Nom): a London-based builder and co-founder of HypeSpark. Data engineer shipping data, AI-assisted and web products for businesses.",
  openGraph: {
    title: `${profile.name} · Builder, Data Engineer & Co-founder`,
    description: "Data, analytics and web products I've built and shipped, plus HypeSpark.",
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
          <Navbar />
              {children}
              <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
