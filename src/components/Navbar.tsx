import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, MessageCircle, ArrowLeft, Camera, Compass } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';
import { CATEGORY_ORDER } from '../data/categoryData';
import type { SiteMode } from '../types/portfolio';

interface NavbarProps {
  viewMode: 'bento' | 'spatial';
  siteMode: SiteMode;
  activeCategory?: string | null;
  onToggleViewMode: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onSwitchSiteMode: (mode: SiteMode) => void;
  onSelectCategory?: (categoryName: string | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  siteMode,
  activeCategory,
  onToggleViewMode,
  onNavigateToSection,
  onSwitchSiteMode,
  onSelectCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nav links berubah sesuai mode
  const navLinks =
    siteMode === 'perjalanan'
      ? [
          { label: 'Perjalanan', id: 'timeline' },
          { label: 'Keahlian', id: 'keahlian' },
          { label: 'Fokus Kategori', id: 'layanan' },
          { label: 'Kontak', id: 'kontak' },
        ]
      : [
          { label: 'Beranda', id: 'top' },
          { label: 'Kategori', id: 'kategori-showcase' },
          { label: 'Showcase Utama', id: 'galeri' },
        ];


  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 sm:pt-6 px-2 sm:px-4 pointer-events-none">
      <div className="w-full max-w-[1920px] px-2 sm:px-4 lg:px-8 xl:px-12 2xl:px-16 mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Glass Bento Capsule */}
        <div
          className={`w-full flex items-center justify-between px-4 sm:px-6 py-3 rounded-full border transition-all duration-300 ${
            isScrolled || viewMode === 'spatial'
              ? 'bg-[#0E1118]/85 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              : 'bg-[#0E1118]/60 backdrop-blur-md border-white/[0.08] shadow-lg'
          }`}
        >
          {/* Brand Logo: klik kembali ke Landing Gate */}
          <button
            onClick={() => onSwitchSiteMode('landing')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-editorial font-bold text-sm group-hover:scale-105 transition-transform shrink-0">
              HR
            </div>
            <div className="flex flex-col justify-center">
              <div className="hidden sm:block">
                <span className="font-editorial text-sm sm:text-base font-medium tracking-tight text-white leading-none split-wave" aria-label="The Journey of Husein Rosid">
                  <span aria-hidden="true">
                    {"The Journey of Husein Rosid".split("").map((char, i) => (
                      <i key={i} style={{ '--i': i } as React.CSSProperties} className={char === ' ' ? 'inline-block w-1.5' : ''}>
                        {char}
                      </i>
                    ))}
                  </span>
                </span>
              </div>
              <div className="sm:hidden">
                <span className="font-editorial text-sm font-medium tracking-wide text-white leading-none block">
                  Husein Rosid
                </span>
              </div>
            </div>
          </button>

          {/* Center: Mode-aware navigation */}
          {viewMode === 'spatial' ? (
            <button
              onClick={onToggleViewMode}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs tracking-wider uppercase font-medium text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Bento</span>
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              {/* Nav links or Active Category Breadcrumb */}
              {siteMode === 'karya' && activeCategory ? (
                <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1">
                  <button
                    onClick={() => onSelectCategory?.(null)}
                    className="px-2.5 py-1 rounded-full text-xs uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Showcase</span>
                  </button>
                  <span className="text-white/20 text-xs">/</span>
                  <span className="px-2.5 py-1 rounded-full text-xs uppercase tracking-wider text-amber-300 font-bold bg-amber-500/20 border border-amber-500/30">
                    {activeCategory}
                  </span>
                </div>
              ) : (
                <nav className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        if (link.id === 'top') {
                          onSelectCategory?.(null);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          onNavigateToSection(link.id);
                        }
                      }}
                      className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all font-medium cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
              )}

              {/* Mode Toggle Pill with Animated Sliding Thumb */}
              <div className="relative flex items-center bg-[#07090E]/90 border border-white/10 rounded-full p-1 shadow-inner select-none ml-2">
                <button
                  onClick={() => onSwitchSiteMode('karya')}
                  className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase font-semibold transition-colors duration-200 cursor-pointer ${
                    siteMode === 'karya' ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {siteMode === 'karya' && (
                    <motion.div
                      layoutId="navbarActivePill"
                      className="absolute inset-0 bg-amber-500 rounded-full shadow-[0_2px_12px_rgba(245,158,11,0.4)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Karya</span>
                  </span>
                </button>

                <button
                  onClick={() => onSwitchSiteMode('perjalanan')}
                  className={`relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase font-semibold transition-colors duration-200 cursor-pointer ${
                    siteMode === 'perjalanan' ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {siteMode === 'perjalanan' && (
                    <motion.div
                      layoutId="navbarActivePill"
                      className="absolute inset-0 bg-amber-500 rounded-full shadow-[0_2px_12px_rgba(245,158,11,0.4)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Perjalanan</span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Right Action: WhatsApp CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all cursor-pointer hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Minta Sesi</span>
            </a>

            {viewMode !== 'spatial' && (
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Buka Menu"
                className="md:hidden w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/10 active:scale-95 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-all"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-300 pointer-events-auto overflow-y-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-editorial text-xl font-medium text-white">
              The Journey of Husein Rosid
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Tutup Menu"
              className="w-10 h-10 rounded-full bg-white/10 active:scale-95 flex items-center justify-center text-white cursor-pointer transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode toggle (mobile) */}
          <div className="relative flex p-1 rounded-full bg-white/[0.06] border border-white/10 mt-4 backdrop-blur-md">
            <button
              onClick={() => { setMobileMenuOpen(false); onSwitchSiteMode('karya'); }}
              className={`relative flex-1 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer z-10 active:scale-[0.98] ${
                siteMode === 'karya' ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {siteMode === 'karya' && (
                <motion.div
                  layoutId="mobileNavbarActivePill"
                  className="absolute inset-0 bg-amber-500 rounded-full shadow-[0_2px_12px_rgba(245,158,11,0.4)] -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <Camera className="w-4 h-4" />
              <span>Karya</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onSwitchSiteMode('perjalanan'); }}
              className={`relative flex-1 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer z-10 active:scale-[0.98] ${
                siteMode === 'perjalanan' ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {siteMode === 'perjalanan' && (
                <motion.div
                  layoutId="mobileNavbarActivePill"
                  className="absolute inset-0 bg-amber-500 rounded-full shadow-[0_2px_12px_rgba(245,158,11,0.4)] -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <Compass className="w-4 h-4" />
              <span>Perjalanan</span>
            </button>
          </div>

          <div className="flex flex-col space-y-4 my-auto">
            {siteMode === 'karya' ? (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSelectCategory?.(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-left font-editorial text-2xl transition-colors block active:scale-[0.98] ${
                    !activeCategory ? 'text-amber-400 font-bold' : 'text-white hover:text-amber-400'
                  }`}
                >
                  Showcase Utama
                </button>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400 block mb-2.5">
                    Ruang Kategori Spesifik
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORY_ORDER.map((cat) => {
                      const isActive = activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onSelectCategory?.(cat);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${
                            isActive
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                              : 'bg-white/[0.06] text-slate-300 border border-white/10 hover:border-amber-400/40'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateToSection(link.id);
                  }}
                  className="text-left font-editorial text-3xl text-white hover:text-amber-400 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {link.label}
                </button>
              ))
            )}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-bold text-center text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi via WhatsApp</span>
            </a>
            <div className="text-center text-[10px] uppercase tracking-widest text-slate-500">
              Surabaya, Indonesia • Visual Storyteller
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
