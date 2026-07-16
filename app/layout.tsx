import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gabrielamorim.dev"),
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  keywords: [
    "Gabriel Amorim",
    "Technical Lead",
    "Desenvolvedor de Software",
    "Portfólio",
    "E-commerce",
    "Next.js",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    url: "https://gabrielamorim.dev",
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1210",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="relative bg-soil-900 font-sans text-linen-200">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-amber-400 focus:px-4 focus:py-2 focus:text-soil-950"
        >
          Pular para o conteúdo
        </a>
        <GrainOverlay />
        <SmoothScrollProvider>
          <Nav />
          <main id="conteudo">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
