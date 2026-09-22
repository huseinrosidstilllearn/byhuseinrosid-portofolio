import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, ArrowLeft } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';
import type { SiteMode } from '../types/portfolio';

interface NavbarProps {
  viewMode: 'bento' | 'spatial';
  siteMode: SiteMode;
  onToggleViewMode: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onSwitchSiteMode: (mode: SiteMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  siteMode,
  onToggleViewMode,
  onNavigateToSection,
  onSwitchSiteMode,
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
          { label: 'Kisah', id: 'kisah' },
          { label: 'Layanan', id: 'layanan' },
          { label: 'Kontak', id: 'kontak' },
        ]
      : [
          { label: 'Galeri', id: 'galeri' },
        ];


  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 sm:pt-6 px-4 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Glass Bento Capsule */}
        <div
          className={`w-full flex items-center justify-between px-4 sm:px-6 py-3 rounded-full border transition-all duration-300 ${
            isScrolled || viewMode === 'spatial'
              ? 'bg-[#0E1118]/85 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              : 'bg-[#0E1118]/60 backdrop-blur-md border-white/[0.08] shadow-lg'
          }`}
        >
          {/* Brand Logo — klik kembali ke Landing Gate */}
          <button
            onClick={() => onSwitchSiteMode('landing')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-editorial font-bold text-sm group-hover:scale-105 transition-transform">
              HR
            </div>
            <span className="font-editorial text-sm sm:text-base font-medium tracking-tight text-white block leading-none split-wave max-w-[180px] sm:max-w-none truncate" aria-label="The Journey of Husein Rosid">
              <span aria-hidden="true">
                {"The Journey of Husein Rosid".split("").map((char, i) => (
                  <i key={i} style={{ '--i': i } as React.CSSProperties} className={char === ' ' ? 'inline-block w-1.5' : ''}>
                    {char}
                  </i>
                ))}
              </span>
            </span>
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
              {/* Nav links */}
              <nav className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onNavigateToSection(link.id)}
                    className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all font-medium cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Mode Toggle Pill */}
              <div className="flex items-center bg-white/[0.03] border border-white/[0.06] rounded-full p-1 gap-0.5 ml-1">
                <button
                  onClick={() => onSwitchSiteMode('karya')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    siteMode === 'karya'
                      ? 'bg-amber-500 text-black'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  📷 Karya
                </button>
                <button
                  onClick={() => onSwitchSiteMode('perjalanan')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                    siteMode === 'perjalanan'
                      ? 'bg-sky-500 text-white'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  🧭 Perjalanan
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
                className="md:hidden w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white cursor-pointer"
              >
                <Menu className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between p-8 animate-in fade-in duration-300 pointer-events-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-editorial text-xl font-medium text-white">
              The Journey of Husein Rosid
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Tutup Menu"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode toggle (mobile) */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => { setMobileMenuOpen(false); onSwitchSiteMode('karya'); }}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
                siteMode === 'karya' ? 'bg-amber-500 text-black' : 'border border-white/20 text-white/60'
              }`}
            >
              📷 Karya
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onSwitchSiteMode('perjalanan'); }}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
                siteMode === 'perjalanan' ? 'bg-sky-500 text-white' : 'border border-white/20 text-white/60'
              }`}
            >
              🧭 Perjalanan
            </button>
          </div>

          <div className="flex flex-col space-y-4 my-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToSection(link.id);
                }}
                className="text-left font-editorial text-3xl text-white hover:text-amber-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-amber-500 text-slate-950 font-bold text-center text-xs uppercase tracking-wider flex items-center justify-center gap-2"
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
