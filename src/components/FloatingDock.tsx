import React from 'react';
import { Compass, LayoutGrid, MessageCircle } from 'lucide-react';
import { PHOTO_CATEGORIES } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

interface FloatingDockProps {
  viewMode: 'spatial' | 'editorial';
  onToggleViewMode: () => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  activeGlowColor?: string | null;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  viewMode,
  onToggleViewMode,
  selectedCategory = 'Semua',
  onSelectCategory,
  activeGlowColor,
}) => {
  const whatsappUrl = createWhatsAppLink();
  const accentColor = activeGlowColor || '#f59e0b';

  return (
    <nav
      aria-label="Navigasi Melayang"
      className="fixed bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-none transition-all duration-500"
    >
      <div
        className="flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 rounded-full border border-white/15 bg-black/75 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-700"
        style={{
          boxShadow: `0 20px 40px -10px rgba(0,0,0,0.8), 0 0 30px ${accentColor}25`,
        }}
      >
        {/* Mode Switcher Pill */}
        <button
          onClick={onToggleViewMode}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-medium tracking-wider text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer whitespace-nowrap"
          title={viewMode === 'spatial' ? 'Beralih ke Mode Galeri Museum' : 'Beralih ke Kanvas Spasial 360°'}
        >
          {viewMode === 'spatial' ? (
            <>
              <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Galeri Museum</span>
              <span className="sm:hidden">Galeri</span>
            </>
          ) : (
            <>
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span className="hidden sm:inline">Kanvas 360°</span>
              <span className="sm:hidden">Spasial</span>
            </>
          )}
        </button>

        <div className="w-[1px] h-5 bg-white/15 hidden sm:block" />

        {/* Quick Category Filter Pills (Shown in both or spatial mode) */}
        {onSelectCategory && (
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[45vw] sm:max-w-[380px] px-1">
            {PHOTO_CATEGORIES.map(category => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => onSelectCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        <div className="w-[1px] h-5 bg-white/15" />

        {/* WhatsApp Fast CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Reservasi</span>
        </a>
      </div>
    </nav>
  );
};
