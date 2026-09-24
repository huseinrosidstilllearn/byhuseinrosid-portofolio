import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Compass, Sparkles } from 'lucide-react';
import type { SiteMode } from '../types/portfolio';

interface ModeTransitionOverlayProps {
  isTransitioning: boolean;
  targetMode: SiteMode | null;
}

export const ModeTransitionOverlay: React.FC<ModeTransitionOverlayProps> = ({
  isTransitioning,
  targetMode,
}) => {
  const getModeLabel = () => {
    switch (targetMode) {
      case 'karya':
        return {
          title: 'Ruang Galeri Visual',
          subtitle: 'Koleksi Eksibisi & Pameran Fotografi',
          icon: Camera,
          accent: 'text-amber-400',
        };
      case 'perjalanan':
        return {
          title: 'Garis Waktu & Kisah',
          subtitle: 'Perjalanan, Rekam Jejak & Keahlian',
          icon: Compass,
          accent: 'text-amber-400',
        };
      case 'landing':
        return {
          title: 'The Journey of Husein Rosid',
          subtitle: 'Kembali ke Gerbang Beranda',
          icon: Sparkles,
          accent: 'text-amber-300',
        };
      default:
        return {
          title: 'The Journey of Husein Rosid',
          subtitle: 'Menyiapkan Kanvas Visual...',
          icon: Sparkles,
          accent: 'text-amber-400',
        };
    }
  };

  const meta = getModeLabel();
  const Icon = meta.icon;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="transition-curtain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center select-none pointer-events-auto"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Central Monogram and Badge */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.05, opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            {/* Monogram Capsule */}
            <div className="relative mb-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                <Icon className="w-6 h-6 animate-pulse" />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-amber-400/20 blur-md -z-10 animate-pulse" />
            </div>

            {/* Title & Subtitle */}
            <h3 className="font-editorial text-2xl sm:text-3xl text-white font-medium tracking-tight mb-1.5">
              {meta.title}
            </h3>
            <p className="text-xs text-slate-400 font-light tracking-wide uppercase font-mono">
              {meta.subtitle}
            </p>

            {/* Slender Golden Progress Line */}
            <div className="w-48 sm:w-56 h-[2px] bg-white/10 rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
