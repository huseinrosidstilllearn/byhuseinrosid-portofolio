import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { SpatialCanvas } from './components/SpatialCanvas';
import { Hero } from './components/Hero';
import { DualMarquee } from './components/DualMarquee';
import { Gallery } from './components/Gallery';
import { AccordionCarousel } from './components/AccordionCarousel';
import { PhotoStories } from './components/PhotoStories';
import { About } from './components/About';
import { Services } from './components/Services';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { PORTFOLIO_PHOTOS } from './data/portfolioData';
import type { PhotoItem } from './types/portfolio';

export function App() {
  const [viewMode, setViewMode] = useState<'bento' | 'spatial'>('bento');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // If in spatial mode or lightbox is open, pause lenis
    if (viewMode === 'spatial' || activePhoto !== null) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    // Initialize Lenis with smooth momentum physics
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let animId: number;
    function raf(time: number) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }
    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [viewMode, activePhoto]);

  const handleToggleViewMode = () => {
    setViewMode(prev => (prev === 'spatial' ? 'bento' : 'spatial'));
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (viewMode === 'spatial') {
      setViewMode('bento');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -80, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: -80, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#050505] text-[#F8FAFC] selection:bg-amber-500/30 selection:text-amber-300 relative overflow-x-hidden">
        {/* Subtle Architectural Grid Pattern & Ambient Top Vignette */}
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />
        <div className="fixed top-0 left-0 right-0 h-[600px] radial-vignette pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar
            viewMode={viewMode}
            onToggleViewMode={handleToggleViewMode}
            onNavigateToSection={handleNavigateToSection}
          />

          {viewMode === 'spatial' ? (
            <main className="w-screen h-screen overflow-hidden">
              <SpatialCanvas />
            </main>
          ) : (
            <main className="flex-grow space-y-24 sm:space-y-36 pb-20">
              <Hero onExploreClick={() => handleNavigateToSection('galeri')} />
              <DualMarquee onSelectPhoto={setActivePhoto} />
              <Gallery onSelectPhoto={setActivePhoto} />
              <AccordionCarousel onSelectPhoto={setActivePhoto} />
              <PhotoStories />
              <About />
              <Services />
              <ContactSection />
              <Footer onSwitchToSpatial={() => setViewMode('spatial')} />
            </main>
          )}

          {/* Global Lightbox for all photographic interactive surfaces */}
          <LightboxModal
            photo={activePhoto}
            allPhotos={PORTFOLIO_PHOTOS}
            onClose={() => setActivePhoto(null)}
            onSelectPhoto={setActivePhoto}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
