import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { LandingGate } from './components/LandingGate';
import { SpatialCanvas } from './components/SpatialCanvas';
import { Hero } from './components/Hero';
import { DualMarquee } from './components/DualMarquee';
import { Gallery } from './components/Gallery';
import { AccordionCarousel } from './components/AccordionCarousel';
import { Services } from './components/Services';
import { ContactSection } from './components/ContactSection';
import { LightboxModal } from './components/LightboxModal';
import { JourneyHero } from './components/journey/JourneyHero';
import { Timeline } from './components/journey/Timeline';
import { Skills } from './components/journey/Skills';
import { JourneyFooter } from './components/journey/JourneyFooter';
import { KaryaFooter } from './components/journey/KaryaFooter';
import { CategoryShowcase } from './components/category/CategoryShowcase';
import { CategoryPage } from './components/category/CategoryPage';
import { CVPage } from './components/cv/CVPage';
import { MobileThumbDock } from './components/mobile/MobileThumbDock';
import { ProjectEstimatorModal } from './components/mobile/ProjectEstimatorModal';
import { ModeTransitionOverlay } from './components/ModeTransitionOverlay';
import { PORTFOLIO_PHOTOS } from './data/portfolioData';
import { getCategoryBySlug, getCategoryInfo } from './data/categoryData';
import { getPhotos, getSiteContent, DEFAULT_SITE_CONTENT } from './lib/supabase';
import type { PhotoItem, SiteMode, SiteContentData } from './types/portfolio';

// Persistensi mode terakhir di localStorage
const STORAGE_KEY = 'bhr_site_mode';

function getSavedMode(): SiteMode {
  try {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#cv') return 'cv';
      if (hash === '#perjalanan') return 'perjalanan';
      if (hash === '#karya') return 'karya';
    }
    const saved = localStorage.getItem(STORAGE_KEY) as SiteMode | null;
    if (saved === 'karya' || saved === 'perjalanan' || saved === 'landing' || saved === 'cv') return saved;
  } catch {}
  return 'karya';
}

function getInitialCategory(): string | null {
  try {
    const hash = window.location.hash;
    if (hash.startsWith('#kategori=')) {
      const slug = hash.replace('#kategori=', '');
      const info = getCategoryBySlug(slug);
      return info ? info.name : null;
    }
  } catch {}
  return null;
}

function getInitialPhotos(): PhotoItem[] {
  try {
    const raw = localStorage.getItem('bhr_photos_cache');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return PORTFOLIO_PHOTOS;
}

function getInitialSiteContent(): SiteContentData {
  try {
    const raw = localStorage.getItem('bhr_site_content_cache');
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SITE_CONTENT, ...parsed };
    }
  } catch {}
  return DEFAULT_SITE_CONTENT;
}

export function App() {
  const [siteMode, setSiteMode] = useState<SiteMode>(getSavedMode);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(getInitialCategory);
  const [viewMode, setViewMode] = useState<'bento' | 'spatial'>('bento');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [photos, setPhotos] = useState<PhotoItem[]>(getInitialPhotos);
  const [siteContent, setSiteContent] = useState<SiteContentData>(getInitialSiteContent);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetMode, setTargetMode] = useState<SiteMode | null>(null);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [estimatorContext, setEstimatorContext] = useState<{ category?: string; photoTitle?: string }>({});
  const lenisRef = useRef<Lenis | null>(null);

  const handleOpenEstimator = (category?: string, photoTitle?: string) => {
    setEstimatorContext({ category, photoTitle });
    setIsEstimatorOpen(true);
  };

  // Navigasi kategori dengan sinkronisasi URL hash
  const handleSelectCategory = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    if (categoryName) {
      const info = getCategoryInfo(categoryName);
      window.location.hash = `kategori=${info.slug}`;
    } else {
      if (siteMode === 'cv') {
        window.location.hash = 'cv';
      } else if (siteMode === 'perjalanan') {
        window.location.hash = 'perjalanan';
      } else {
        window.location.hash = '';
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dengarkan tombol Back/Forward browser untuk hash kategori & mode
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#kategori=')) {
        const slug = hash.replace('#kategori=', '');
        const info = getCategoryBySlug(slug);
        if (info) {
          setSelectedCategory(info.name);
          setSiteMode('karya');
        }
      } else if (hash === '#cv') {
        setSiteMode('cv');
        setSelectedCategory(null);
      } else if (hash === '#perjalanan') {
        setSiteMode('perjalanan');
        setSelectedCategory(null);
      } else if (hash === '#karya') {
        setSiteMode('karya');
        setSelectedCategory(null);
      } else if (!hash) {
        setSelectedCategory(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

      // Sinkronkan hash URL dengan mode
      if (mode === 'cv') {
        window.location.hash = 'cv';
      } else if (mode === 'perjalanan') {
        window.location.hash = 'perjalanan';
      } else if (mode === 'karya' && !selectedCategory) {
        window.location.hash = '';
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

  // Lenis smooth scroll: hanya aktif di desktop (non-touch) agar scroll ponsel tetap native 120Hz
  useEffect(() => {
    // Pada perangkat mobile / layar sentuh, biarkan browser menangani scroll secara native
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

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
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0,
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
  }, [siteMode, viewMode, activePhoto, selectedCategory]);

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === 'spatial' ? 'bento' : 'spatial'));
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (selectedCategory !== null) {
      // Jika sedang di dalam halaman kategori, kembali ke showcase utama dulu lalu scroll
      setSelectedCategory(null);
      window.location.hash = '';
      setTimeout(() => scrollToSection(sectionId), 200);
      return;
    }

    if (viewMode === 'spatial') {
      setViewMode('bento');
      setTimeout(() => scrollToSection(sectionId), 150);
    } else {
      scrollToSection(sectionId);
    }
  };

  function scrollToSection(id: string) {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      {/* Mode Transition Overlay (Curtain) */}
      <ModeTransitionOverlay
        isTransitioning={isTransitioning}
        targetMode={targetMode}
      />

      {/* ── Landing Gate ────────────────────────────────────────────────────────── */}
      {siteMode === 'landing' ? (
        <LandingGate onSelectMode={handleSetSiteMode} photos={photos} />
      ) : siteMode === 'cv' ? (
        /* ── Mode Curriculum Vitae (CV) ─────────────────────────────────────────── */
        <motion.div
          key="cv-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-amber-500/30 selection:text-amber-600 dark:selection:text-amber-300 relative overflow-x-hidden transition-colors duration-200"
        >
          <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-30 z-0" />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar
              viewMode="bento"
              siteMode={siteMode}
              onToggleViewMode={() => {}}
              onNavigateToSection={handleNavigateToSection}
              onSwitchSiteMode={handleSetSiteMode}
              onOpenEstimator={() => handleOpenEstimator('Event Documentation')}
            />
            <main className="flex-grow">
              <CVPage
                onBackToMain={() => handleSetSiteMode('karya')}
                onSwitchMode={handleSetSiteMode}
              />
            </main>
          </div>
        </motion.div>
      ) : siteMode === 'perjalanan' ? (
        /* ── Mode Perjalanan ─────────────────────────────────────────────────────── */
        <motion.div
          key="perjalanan-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-amber-500/30 selection:text-amber-600 dark:selection:text-amber-300 relative overflow-x-hidden transition-colors duration-200"
        >
          <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-30 z-0" />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar
              viewMode="bento"
              siteMode={siteMode}
              onToggleViewMode={() => {}}
              onNavigateToSection={handleNavigateToSection}
              onSwitchSiteMode={handleSetSiteMode}
              onOpenEstimator={() => handleOpenEstimator('Event Documentation')}
            />
            <main className="flex-grow">
              <JourneyHero
                profile={siteContent.profile}
                contact={siteContent.contact}
                stats={siteContent.stats}
                onSwitchMode={handleSetSiteMode}
              />
              <Timeline milestones={siteContent.timeline} />
              <Skills skills={siteContent.skills} />
              <Services
                packages={siteContent.services}
                photos={photos}
                onSelectCategory={(catName) => {
                  handleSetSiteMode('karya');
                  setTimeout(() => {
                    handleSelectCategory(catName);
                  }, 280);
                }}
              />
              <ContactSection contact={siteContent.contact} />
              <JourneyFooter
                profile={siteContent.profile}
                contact={siteContent.contact}
                onSwitchMode={handleSetSiteMode}
              />
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
          className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-amber-500/30 selection:text-amber-600 dark:selection:text-amber-300 relative overflow-x-hidden transition-colors duration-200"
        >
          <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />
          <div className="fixed top-0 left-0 right-0 h-[600px] radial-vignette pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar
              viewMode={viewMode}
              siteMode={siteMode}
              activeCategory={selectedCategory}
              onToggleViewMode={handleToggleViewMode}
              onNavigateToSection={handleNavigateToSection}
              onSwitchSiteMode={handleSetSiteMode}
              onSelectCategory={handleSelectCategory}
              onOpenEstimator={() => handleOpenEstimator(selectedCategory || 'Event Documentation')}
            />

            {viewMode === 'spatial' ? (
              <main className="w-screen h-screen overflow-hidden">
                <SpatialCanvas photos={photos} />
              </main>
            ) : selectedCategory !== null ? (
              /* ── Dedicated Category Deep-Dive Page ────────────────────────────── */
              <main className="flex-grow pb-0">
                <CategoryPage
                  categoryName={selectedCategory}
                  allPhotos={photos}
                  onSelectPhoto={setActivePhoto}
                  onSelectCategory={handleSelectCategory}
                  onBackToMain={() => handleSelectCategory(null)}
                />
                <KaryaFooter
                  profile={siteContent.profile}
                  contact={siteContent.contact}
                  onSwitchToSpatial={() => setViewMode('spatial')}
                  onSwitchSiteMode={handleSetSiteMode}
                />
              </main>
            ) : (
              /* ── Main Showcase Hub (Showcase Utama) ────────────────────────────── */
              <main className="flex-grow pb-0">
                <div className="space-y-24 sm:space-y-36">
                  <Hero
                    photos={photos}
                    profile={siteContent.profile}
                    contact={siteContent.contact}
                    config={siteContent.heroSlider}
                    onExploreClick={() => handleNavigateToSection('kategori-showcase')}
                  />
                  <DualMarquee
                    photos={photos}
                    config={siteContent.marquee}
                    onSelectPhoto={setActivePhoto}
                  />
                  <CategoryShowcase
                    photos={photos}
                    onSelectCategory={handleSelectCategory}
                  />
                  <Gallery
                    photos={photos}
                    onSelectPhoto={setActivePhoto}
                    onSelectCategory={handleSelectCategory}
                  />
                  <AccordionCarousel photos={photos} onSelectPhoto={setActivePhoto} />
                </div>
                <KaryaFooter
                  profile={siteContent.profile}
                  contact={siteContent.contact}
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
              onOpenEstimator={(cat, title) => handleOpenEstimator(cat, title)}
            />
          </div>
        </motion.div>
      )}

      {/* ── Mobile Thumb Dock (Khusus Ponsel) ────────────────────────── */}
      {siteMode !== 'landing' && (
        <MobileThumbDock
          currentMode={siteMode}
          onSwitchMode={handleSetSiteMode}
          onOpenEstimator={() => handleOpenEstimator(selectedCategory || 'Event Documentation')}
        />
      )}

      {/* ── Interactive WhatsApp Project Estimator Modal ──────────────── */}
      <ProjectEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        initialCategory={estimatorContext.category}
        initialPhotoTitle={estimatorContext.photoTitle}
      />
    </>
  );
}

export default App;
