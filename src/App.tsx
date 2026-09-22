import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { LandingGate } from './components/LandingGate';
import { SpatialCanvas } from './components/SpatialCanvas';
import { Hero } from './components/Hero';
import { DualMarquee } from './components/DualMarquee';
import { Gallery } from './components/Gallery';
import { AccordionCarousel } from './components/AccordionCarousel';
import { PhotoStories } from './components/PhotoStories';
import { Services } from './components/Services';

import { ContactSection } from './components/ContactSection';
import { LightboxModal } from './components/LightboxModal';
import { JourneyHero } from './components/journey/JourneyHero';
import { Timeline } from './components/journey/Timeline';
import { Skills } from './components/journey/Skills';
import { JourneyFooter } from './components/journey/JourneyFooter';
import { KaryaFooter } from './components/journey/KaryaFooter';
import { PORTFOLIO_PHOTOS } from './data/portfolioData';
import { getPhotos } from './lib/supabase';
import type { PhotoItem, SiteMode } from './types/portfolio';



// Persistensi mode terakhir di localStorage
const STORAGE_KEY = 'bhr_site_mode';

function getSavedMode(): SiteMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as SiteMode | null;
    if (saved === 'karya' || saved === 'perjalanan') return saved;
  } catch {}
  return 'landing';
}

export function App() {
  const [siteMode, setSiteMode] = useState<SiteMode>(getSavedMode);
  const [viewMode, setViewMode] = useState<'bento' | 'spatial'>('bento');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>(PORTFOLIO_PHOTOS);
  const lenisRef = useRef<Lenis | null>(null);

  // Simpan pilihan mode ke localStorage
  const handleSetSiteMode = (mode: SiteMode) => {
    setSiteMode(mode);
    if (mode !== 'landing') {
      try { localStorage.setItem(STORAGE_KEY, mode); } catch {}
    } else {
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
    // Reset spatial canvas saat ganti mode
    setViewMode('bento');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Ambil data foto dari Supabase
  useEffect(() => {
    async function loadPhotos() {
      const data = await getPhotos();
      if (data && data.length > 0) setPhotos(data);
    }
    loadPhotos();
  }, []);

  // Lenis smooth scroll — hanya aktif di mode bento/perjalanan
  useEffect(() => {
    const shouldDisable =
      siteMode === 'landing' ||
      viewMode === 'spatial' ||
      activePhoto !== null;

    if (shouldDisable) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

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
  }, [siteMode, viewMode, activePhoto]);

  const handleToggleViewMode = () => {
    setViewMode(prev => (prev === 'spatial' ? 'bento' : 'spatial'));
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (viewMode === 'spatial') {
      setViewMode('bento');
      setTimeout(() => scrollToSection(sectionId), 150);
    } else {
      scrollToSection(sectionId);
    }
  };

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ── Landing Gate ──────────────────────────────────────────────────────────
  if (siteMode === 'landing') {
    return (
      <ThemeProvider>
        <LandingGate onSelectMode={handleSetSiteMode} />
      </ThemeProvider>
    );
  }

  // ── Mode Perjalanan ───────────────────────────────────────────────────────
  if (siteMode === 'perjalanan') {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-[#050505] text-[#F8FAFC] selection:bg-amber-500/30 selection:text-amber-300 relative overflow-x-hidden">
          <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-30 z-0" />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar
              viewMode="bento"
              siteMode={siteMode}
              onToggleViewMode={() => {}}
              onNavigateToSection={handleNavigateToSection}
              onSwitchSiteMode={handleSetSiteMode}
            />
            <main className="flex-grow">
              <JourneyHero />
              <Timeline />
              <Skills />
              <PhotoStories />
              <Services />
              <ContactSection />
              <JourneyFooter onSwitchMode={handleSetSiteMode} />
            </main>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // ── Mode Karya (default) ──────────────────────────────────────────────────
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#050505] text-[#F8FAFC] selection:bg-amber-500/30 selection:text-amber-300 relative overflow-x-hidden">
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />
        <div className="fixed top-0 left-0 right-0 h-[600px] radial-vignette pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar
            viewMode={viewMode}
            siteMode={siteMode}
            onToggleViewMode={handleToggleViewMode}
            onNavigateToSection={handleNavigateToSection}
            onSwitchSiteMode={handleSetSiteMode}
          />

          {viewMode === 'spatial' ? (
            <main className="w-screen h-screen overflow-hidden">
              <SpatialCanvas />
            </main>
          ) : (
            <main className="flex-grow pb-0">
              <div className="space-y-24 sm:space-y-36">
                <Hero onExploreClick={() => handleNavigateToSection('galeri')} />
                <DualMarquee photos={photos} onSelectPhoto={setActivePhoto} />
                <Gallery photos={photos} onSelectPhoto={setActivePhoto} />
                <AccordionCarousel photos={photos} onSelectPhoto={setActivePhoto} />
              </div>
              <KaryaFooter
                onSwitchToSpatial={() => setViewMode('spatial')}
                onSwitchSiteMode={handleSetSiteMode}
              />
            </main>
          )}


          <LightboxModal
            photo={activePhoto}
            allPhotos={photos}
            onClose={() => setActivePhoto(null)}
            onSelectPhoto={setActivePhoto}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
