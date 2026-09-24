import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
import { ModeTransitionOverlay } from './components/ModeTransitionOverlay';
import { PORTFOLIO_PHOTOS } from './data/portfolioData';
import { getPhotos, getSiteContent, DEFAULT_SITE_CONTENT } from './lib/supabase';
import type { PhotoItem, SiteMode, SiteContentData } from './types/portfolio';

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
  const [siteContent, setSiteContent] = useState<SiteContentData>(DEFAULT_SITE_CONTENT);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetMode, setTargetMode] = useState<SiteMode | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Perpindahan mode sinematik dan halus
  const handleSetSiteMode = (mode: SiteMode) => {
    if (mode === siteMode && !isTransitioning) return;
    setTargetMode(mode);
    setIsTransitioning(true);

    // Di saat tirai transisi tertutup penuh (280ms), ganti mode & reset scroll instan
    setTimeout(() => {
      setSiteMode(mode);
      if (mode !== 'landing') {
        try { localStorage.setItem(STORAGE_KEY, mode); } catch {}
      } else {
        try { localStorage.removeItem(STORAGE_KEY); } catch {}
      }
      setViewMode('bento');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 280);

    // Tirai dibuka kembali dengan lembut (550ms)
    setTimeout(() => {
      setIsTransitioning(false);
      setTargetMode(null);
    }, 550);
  };

  // Ambil data foto & teks konten situs dari Supabase / cache lokal
  useEffect(() => {
    async function loadInitialData() {
      const [photosData, contentData] = await Promise.all([
        getPhotos(),
        getSiteContent(),
      ]);
      if (photosData && photosData.length > 0) setPhotos(photosData);
      if (contentData) setSiteContent(contentData);
    }
    loadInitialData();
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
    setViewMode((prev) => (prev === 'spatial' ? 'bento' : 'spatial'));
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

  return (
    <ThemeProvider>
      {/* Mode Transition Overlay (Curtain) */}
      <ModeTransitionOverlay
        isTransitioning={isTransitioning}
        targetMode={targetMode}
      />

      {/* ── Landing Gate ────────────────────────────────────────────────────────── */}
      {siteMode === 'landing' ? (
        <LandingGate onSelectMode={handleSetSiteMode} />
      ) : siteMode === 'perjalanan' ? (
        /* ── Mode Perjalanan ─────────────────────────────────────────────────────── */
        <motion.div
          key="perjalanan-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-[#050505] text-[#F8FAFC] selection:bg-amber-500/30 selection:text-amber-300 relative overflow-x-hidden"
        >
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
              <JourneyHero
                profile={siteContent.profile}
                contact={siteContent.contact}
                stats={siteContent.stats}
              />
              <Timeline milestones={siteContent.timeline} />
              <Skills skills={siteContent.skills} />
              <PhotoStories />
              <Services packages={siteContent.services} />
              <ContactSection contact={siteContent.contact} />
              <JourneyFooter onSwitchMode={handleSetSiteMode} />
            </main>
          </div>
        </motion.div>
      ) : (
        /* ── Mode Karya (default) ────────────────────────────────────────────────── */
        <motion.div
          key="karya-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-[#050505] text-[#F8FAFC] selection:bg-amber-500/30 selection:text-amber-300 relative overflow-x-hidden"
        >
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
        </motion.div>
      )}
    </ThemeProvider>
  );
}

export default App;
