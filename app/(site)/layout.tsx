import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  );
}
