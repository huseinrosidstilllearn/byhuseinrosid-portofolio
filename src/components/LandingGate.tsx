import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { SiteMode } from '../types/portfolio';
import { PHOTOGRAPHER_PROFILE } from '../data/portfolioData';

interface LandingGateProps {
  onSelectMode: (mode: SiteMode) => void;
}

// Featured images for each side
const KARYA_PREVIEW = [
  'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
];

const JOURNEY_PREVIEW = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
];

export function LandingGate({ onSelectMode }: LandingGateProps) {
  const [hovered, setHovered] = useState<'karya' | 'perjalanan' | null>(null);
  const [activeKarya, setActiveKarya] = useState(0);
  const [activeJourney, setActiveJourney] = useState(0);
  const [enteringMode, setEnteringMode] = useState<SiteMode | null>(null);

  const handleSelect = (mode: SiteMode) => {
    if (enteringMode) return;
    setEnteringMode(mode);
    setTimeout(() => {
      onSelectMode(mode);
    }, 380);
  };

  // Ganti foto secara halus dan lambat (setiap 5.5 detik)
  useEffect(() => {
    const karyaTimer = setInterval(() => {
      setActiveKarya((p) => (p + 1) % KARYA_PREVIEW.length);
    }, 5500);

    const journeyTimer = setInterval(() => {
      setActiveJourney((p) => (p + 1) % JOURNEY_PREVIEW.length);
    }, 5500);

    return () => {
      clearInterval(karyaTimer);
      clearInterval(journeyTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#050505]">
      {/* Top Brand Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center h-16 px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: enteringMode ? 0 : 1, y: enteringMode ? -20 : 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-amber-500/60" />
          <span className="font-headline text-sm font-black text-white/60 tracking-widest uppercase">
            {PHOTOGRAPHER_PROFILE.brandName}
          </span>
          <div className="w-6 h-px bg-amber-500/60" />
        </div>
      </motion.div>

      {/* Split Panels */}
      <div className="flex flex-col md:flex-row h-full">

        {/* ===== KARYA PANEL ===== */}
        <motion.div
          className="relative flex-1 overflow-hidden cursor-pointer group"
          style={{
            flexBasis: enteringMode
              ? (enteringMode === 'karya' ? '100%' : '0%')
              : (hovered === 'karya' ? '62%' : hovered === 'perjalanan' ? '38%' : '50%'),
            transition: 'flex-basis 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
            opacity: enteringMode && enteringMode !== 'karya' ? 0 : 1,
          }}
          onMouseEnter={() => !enteringMode && setHovered('karya')}
          onMouseLeave={() => !enteringMode && setHovered(null)}
          onClick={() => handleSelect('karya')}
          initial={{ opacity: 0 }}
          animate={{ opacity: enteringMode && enteringMode !== 'karya' ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Background Images with smooth, slow 1.8s crossfade */}
          {KARYA_PREVIEW.map((src, i) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              animate={{
                opacity: i === activeKarya ? 1 : 0,
                scale: i === activeKarya ? 1.04 : 1,
              }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 md:from-black/60 md:via-black/40 md:to-black/60" />

          {/* Left edge gradient */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#050505] to-transparent" />

          {/* Hover vignette */}
          <motion.div
            className="absolute inset-0 bg-amber-500/10"
            animate={{ opacity: hovered === 'karya' ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-px bg-amber-500/60" />
                <span className="text-amber-400/70 text-[10px] font-mono tracking-[0.3em] uppercase">Mode</span>
                <div className="w-4 h-px bg-amber-500/60" />
              </div>
              <h2 className="font-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-none tracking-tight">
                Karya
              </h2>
              <p className="text-white/50 text-sm max-w-xs leading-relaxed">
                Galeri visual murni — foto, pameran, dan arsip karya fotografis
              </p>

              {/* Hover CTA */}
              <motion.div
                animate={{
                  opacity: hovered === 'karya' ? 1 : 0,
                  y: hovered === 'karya' ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full border border-amber-500/50 text-amber-400 text-xs font-mono tracking-wider uppercase bg-black/30 backdrop-blur-sm"
              >
                <span>Masuk ke Galeri</span>
                <span>→</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right edge hint arrow (desktop) */}
          <div className="absolute right-0 inset-y-0 hidden md:flex items-center pr-4 opacity-20 group-hover:opacity-0 transition-opacity">
            <div className="w-px h-24 bg-white/30" />
          </div>
        </motion.div>

        {/* ===== CENTER DIVIDER ===== */}
        <div className="relative z-10 hidden md:flex flex-col items-center justify-center flex-shrink-0 w-0 overflow-visible">
          <motion.div
            className="absolute flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: enteringMode ? 0 : 1, scale: enteringMode ? 0.8 : 1 }}
            transition={{ delay: enteringMode ? 0 : 0.8, duration: 0.4 }}
          >
            <div className="w-px h-20 bg-gradient-to-b from-transparent to-white/20" />
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-[#050505] text-white/30 text-xs font-mono">
              ×
            </div>
            <div className="w-px h-20 bg-gradient-to-t from-transparent to-white/20" />
          </motion.div>
        </div>

        {/* ===== PERJALANAN PANEL ===== */}
        <motion.div
          className="relative flex-1 overflow-hidden cursor-pointer group"
          style={{
            flexBasis: enteringMode
              ? (enteringMode === 'perjalanan' ? '100%' : '0%')
              : (hovered === 'perjalanan' ? '62%' : hovered === 'karya' ? '38%' : '50%'),
            transition: 'flex-basis 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
            opacity: enteringMode && enteringMode !== 'perjalanan' ? 0 : 1,
          }}
          onMouseEnter={() => !enteringMode && setHovered('perjalanan')}
          onMouseLeave={() => !enteringMode && setHovered(null)}
          onClick={() => handleSelect('perjalanan')}
          initial={{ opacity: 0 }}
          animate={{ opacity: enteringMode && enteringMode !== 'perjalanan' ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Background Images with smooth, slow 1.8s crossfade */}
          {JOURNEY_PREVIEW.map((src, i) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              animate={{
                opacity: i === activeJourney ? 1 : 0,
                scale: i === activeJourney ? 1.04 : 1,
              }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </motion.div>
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/30 md:from-black/60 md:via-black/40 md:to-black/60" />

          {/* Right edge gradient */}
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#050505] to-transparent" />

          {/* Hover vignette */}
          <motion.div
            className="absolute inset-0 bg-sky-500/10"
            animate={{ opacity: hovered === 'perjalanan' ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-px bg-sky-500/60" />
                <span className="text-sky-400/70 text-[10px] font-mono tracking-[0.3em] uppercase">Mode</span>
                <div className="w-4 h-px bg-sky-500/60" />
              </div>
              <h2 className="font-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-none tracking-tight">
                Perjalanan
              </h2>
              <p className="text-white/50 text-sm max-w-xs leading-relaxed">
                CV hidup yang terus diperbarui — timeline, keahlian, dan cerita di balik lensa
              </p>

              {/* Hover CTA */}
              <motion.div
                animate={{
                  opacity: hovered === 'perjalanan' ? 1 : 0,
                  y: hovered === 'perjalanan' ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full border border-sky-500/50 text-sky-400 text-xs font-mono tracking-wider uppercase bg-black/30 backdrop-blur-sm"
              >
                <span>Lihat Profil & CV</span>
                <span>→</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Left edge hint arrow (desktop) */}
          <div className="absolute left-0 inset-y-0 hidden md:flex items-center pl-4 opacity-20 group-hover:opacity-0 transition-opacity">
            <div className="w-px h-24 bg-white/30" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Hint */}
      <motion.div
        className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: enteringMode ? 0 : 1 }}
        transition={{ delay: enteringMode ? 0 : 1, duration: 0.4 }}
      >
        <span className="text-white/20 text-xs font-mono tracking-widest uppercase">
          Pilih mode untuk melanjutkan &bull; tersimpan otomatis untuk kunjungan berikutnya
        </span>
      </motion.div>
    </div>
  );
}
