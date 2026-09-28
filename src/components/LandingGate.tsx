import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Camera,
} from 'lucide-react';
import type { SiteMode, PhotoItem } from '../types/portfolio';
import { PORTFOLIO_PHOTOS, PHOTOGRAPHER_PROFILE } from '../data/portfolioData';

interface LandingGateProps {
  onSelectMode: (mode: SiteMode) => void;
  photos?: PhotoItem[];
}

export function LandingGate({ onSelectMode, photos = [] }: LandingGateProps) {
  // Ambil foto terbaik fotografer (prioritaskan featured, fallback ke PORTFOLIO_PHOTOS)
  const rawPhotos: PhotoItem[] = (photos && photos.length > 0)
    ? [
        ...photos.filter((p) => p.featured),
        ...photos.filter((p) => !p.featured),
      ].slice(0, 6)
    : PORTFOLIO_PHOTOS.slice(0, 6);

  // Filter aman: Jika foto memiliki blob URL yang telah kadaluarsa dari session sebelumnya, ganti dengan foto portofolio
  const displayPhotos: PhotoItem[] = rawPhotos.map((p, idx) => {
    if (p.imageUrl?.startsWith('blob:')) {
      const fallback = PORTFOLIO_PHOTOS[idx % PORTFOLIO_PHOTOS.length];
      return { ...p, imageUrl: fallback.imageUrl };
    }
    return p;
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const [enteringMode, setEnteringMode] = useState<SiteMode | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const currentPhoto = displayPhotos[activeSlide] || PORTFOLIO_PHOTOS[0];

  const handleSelect = (mode: SiteMode) => {
    if (enteringMode) return;
    setEnteringMode(mode);
    setTimeout(() => {
      onSelectMode(mode);
    }, 450);
  };

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % displayPhotos.length);
  }, [displayPhotos.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + displayPhotos.length) % displayPhotos.length);
  }, [displayPhotos.length]);

  // Rotasi slide foto secara sinematik dan lambat (setiap 6.5 detik)
  useEffect(() => {
    if (isPaused || enteringMode) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, enteringMode, nextSlide]);

  // Dukungan scroll wheel atau tombol keyboard untuk kenyamanan pengunjung
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (enteringMode) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Enter' || e.key === 'ArrowDown') handleSelect('karya');
    };

    const handleWheel = (e: WheelEvent) => {
      if (enteringMode) return;
      if (e.deltaY > 50) {
        handleSelect('karya');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [enteringMode, nextSlide, prevSlide]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#050505] text-[#F8FAFC] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── 1. CINEMATIC FULL-SCREEN BACKGROUND CANVAS ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id || activeSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.4, ease: 'easeInOut' },
              scale: { duration: 8, ease: 'easeOut' },
            }}
          >
            <img
              src={currentPhoto.imageUrl}
              alt=""
              onError={(e) => {
                const fallbackSrc = PORTFOLIO_PHOTOS[activeSlide % PORTFOLIO_PHOTOS.length].imageUrl;
                if (e.currentTarget.src !== fallbackSrc) {
                  e.currentTarget.src = fallbackSrc;
                }
              }}
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradien Sinematik Mewah & Vignette Film */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-black/35 to-[#050505]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/65 via-transparent to-[#050505]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-[#050505]/75" />

        {/* Tekstur Subtle Film Grain */}
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* ── 2. TOP EDITORIAL MASTHEAD ───────────────────────────────────────── */}
      <motion.header
        className="relative z-20 w-full px-6 sm:px-12 pt-6 sm:pt-8 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: enteringMode ? 0 : 1, y: enteringMode ? -20 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Brand Monogram & Name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-editorial font-bold text-xs tracking-tight shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            HR
          </div>
          <div>
            <span className="font-editorial text-sm sm:text-base font-bold text-white tracking-wide block leading-none">
              {PHOTOGRAPHER_PROFILE.brandName}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400 block mt-1">
              Surabaya, Indonesia &bull; Visual Anthology
            </span>
          </div>
        </div>

        {/* Availability Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider uppercase text-slate-300">
            Tersedia untuk Penugasan Visual
          </span>
        </div>
      </motion.header>

      {/* ── 3. MAIN CENTERPIECE: EDITORIAL TITLE & PILL BUTTONS ────────────── */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 text-center my-auto">
        <motion.div
          className="max-w-4xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: enteringMode ? 0 : 1,
            y: enteringMode ? -40 : 0,
            scale: enteringMode ? 0.95 : 1,
          }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber-300/90 font-semibold">
              Koleksi &amp; Portofolio Visual
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>

          {/* Grand Magazine Headline */}
          <div className="space-y-3">
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight leading-[1.05] drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              The Journey of <br className="hidden sm:inline" />
              <span className="italic font-light text-amber-300/90">Husein Rosid</span>
            </h1>
            <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed">
              Merekam keheningan, sukacita, dan keabadian cahaya yang tertangkap di antara detak waktu.
            </p>
          </div>

          {/* ── DUA TOMBOL PILL MEWAH (KARYA vs PERJALANAN) ── */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-lg">
            {/* Tombol 1: Eksplorasi Karya Visual */}
            <button
              onClick={() => handleSelect('karya')}
              className="w-full sm:w-auto group relative flex items-center justify-between sm:justify-start gap-4 px-7 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all duration-300 shadow-[0_0_35px_rgba(245,158,11,0.35)] hover:shadow-[0_0_50px_rgba(245,158,11,0.55)] hover:scale-105 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-slate-950/15 flex items-center justify-center text-slate-950 shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs uppercase tracking-wider font-extrabold leading-none">
                  Eksplorasi Karya
                </span>
                <span className="block text-[11px] text-slate-900/80 font-medium leading-tight mt-1">
                  Galeri &amp; 7 Kategori Foto
                </span>
              </div>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Tombol 2: Jejak Perjalanan (Profil & Rekam Jejak) */}
            <button
              onClick={() => handleSelect('perjalanan')}
              className="w-full sm:w-auto group relative flex items-center justify-between sm:justify-start gap-4 px-7 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 hover:border-white/40 backdrop-blur-xl text-white font-bold transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs uppercase tracking-wider font-extrabold leading-none">
                  Jejak Perjalanan
                </span>
                <span className="block text-[11px] text-slate-300 font-normal leading-tight mt-1">
                  Profil, Filosofi &amp; Karir
                </span>
              </div>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform text-slate-400 group-hover:text-white" />
            </button>
          </div>
        </motion.div>
      </main>

      {/* ── 4. BOTTOM CAPTION & SLIDE NAVIGATION BAR ────────────────────────── */}
      <motion.footer
        className="relative z-20 w-full px-6 sm:px-12 pb-6 sm:pb-8 flex flex-col md:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: enteringMode ? 0 : 1, y: enteringMode ? 20 : 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Left: Active Photo Information */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
          <div className="w-8 h-8 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-amber-400 shrink-0">
            <Camera className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">
                {currentPhoto.category}
              </span>
              <span className="font-editorial text-xs sm:text-sm text-white font-medium truncate max-w-[200px] sm:max-w-xs">
                {currentPhoto.title}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-light mt-0.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-slate-500" />
                <span>{currentPhoto.location}</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-2.5 h-2.5 text-slate-500" />
                <span>{currentPhoto.year}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Slide Indicators with Manual Controls */}
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-inner">
          <button
            onClick={prevSlide}
            className="p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Foto Sebelumnya"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5">
            {displayPhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeSlide
                    ? 'w-6 h-1.5 bg-amber-400'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/50'
                }`}
                title={`Pilih foto ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Foto Berikutnya"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Quick Enter / Scroll Prompt */}
        <div className="hidden md:flex items-center gap-2 text-right">
          <button
            onClick={() => handleSelect('karya')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors cursor-pointer font-light"
          >
            <span>Masuk Langsung</span>
            <span className="animate-bounce">↓</span>
          </button>
        </div>
      </motion.footer>
    </div>
  );
}
