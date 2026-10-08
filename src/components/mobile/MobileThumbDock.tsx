import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Compass, FileText, MessageCircle } from 'lucide-react';
import type { SiteMode } from '../../types/portfolio';

interface MobileThumbDockProps {
  currentMode: SiteMode;
  onSwitchMode: (mode: SiteMode) => void;
  onOpenEstimator: () => void;
}

export const MobileThumbDock: React.FC<MobileThumbDockProps> = ({
  currentMode,
  onSwitchMode,
  onOpenEstimator,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Selalu tampilkan jika dekat puncak atau dekat dasar halaman
      if (currentScrollY < 60 || currentScrollY + winHeight >= docHeight - 80) {
        setIsVisible(true);
      } else if (delta > 15 && currentScrollY > 120) {
        // Pengguna scroll ke bawah: sembunyikan dock agar foto tampil maksimal
        setIsVisible(false);
      } else if (delta < -15) {
        // Pengguna scroll ke atas: segera tampilkan kembali dock
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;

      // Jaga agar dock muncul kembali jika pengguna berhenti scroll selama 1.5 detik
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Sembunyikan dock jika berada di layar Landing Gate
  if (currentMode === 'landing') return null;

  return (
    <div
      className={`fixed bottom-4 left-3 right-3 sm:left-6 sm:right-6 z-40 md:hidden transition-all duration-300 ease-out transform pointer-events-none ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-24 opacity-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <nav
        aria-label="Navigasi Bawah Seluler"
        className="w-full max-w-md mx-auto p-1.5 rounded-full bg-[#0B0F17]/90 border border-white/15 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.75)] flex items-center justify-between gap-1 pointer-events-auto"
      >
        {/* Tab 1: Karya */}
        <button
          onClick={() => onSwitchMode('karya')}
          className={`flex-1 py-2 px-1.5 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer relative ${
            currentMode === 'karya'
              ? 'text-amber-300 font-semibold bg-amber-500/15 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-wide uppercase font-mono leading-none">
            Karya
          </span>
          {currentMode === 'karya' && (
            <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-amber-400" />
          )}
        </button>

        {/* Tab 2: Perjalanan */}
        <button
          onClick={() => onSwitchMode('perjalanan')}
          className={`flex-1 py-2 px-1.5 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer relative ${
            currentMode === 'perjalanan'
              ? 'text-amber-300 font-semibold bg-amber-500/15 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-wide uppercase font-mono leading-none">
            Cerita
          </span>
          {currentMode === 'perjalanan' && (
            <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-amber-400" />
          )}
        </button>

        {/* Tab 3: CV */}
        <button
          onClick={() => onSwitchMode('cv')}
          className={`flex-1 py-2 px-1.5 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer relative ${
            currentMode === 'cv'
              ? 'text-amber-300 font-semibold bg-amber-500/15 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] tracking-wide uppercase font-mono leading-none">
            CV
          </span>
          {currentMode === 'cv' && (
            <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-amber-400" />
          )}
        </button>

        {/* Separator */}
        <div className="w-[1px] h-6 bg-white/10 mx-0.5" />

        {/* Action Button: Konsultasi / Estimator */}
        <button
          onClick={onOpenEstimator}
          className="py-2 px-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-all shadow-[0_2px_14px_rgba(245,158,11,0.4)] cursor-pointer active:scale-95 shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
          <span className="text-[11px] tracking-wider uppercase leading-none font-mono">
            Tanya
          </span>
        </button>
      </nav>
    </div>
  );
};
