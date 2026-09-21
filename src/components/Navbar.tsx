import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, MessageCircle, Compass, LayoutGrid } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { createWhatsAppLink } from '../utils/whatsapp';

interface NavbarProps {
  viewMode: 'spatial' | 'editorial';
  onToggleViewMode: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  onToggleViewMode,
  onNavigateToSection,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Karya', id: 'galeri' },
    { label: 'Kisah Visual', id: 'kisah' },
    { label: 'Tentang', id: 'tentang' },
    { label: 'Layanan', id: 'layanan' },
    { label: 'Kontak', id: 'kontak' },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled || viewMode === 'spatial'
          ? 'bg-[#070a11]/85 dark:bg-[#070a11]/85 bg-white/90 backdrop-blur-xl py-3 shadow-lg border-b border-white/5 dark:border-white/5 border-slate-200'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <button
          onClick={() => onToggleViewMode()}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full border border-amber-500/40 overflow-hidden flex items-center justify-center group-hover:border-amber-400 group-hover:scale-105 transition-all bg-[#111827]">
            <img src="/favicon-96x96.png" alt="By Husein Rosid Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-lg tracking-widest uppercase font-semibold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
              By Husein Rosid
            </span>
            <span className="text-[10px] tracking-[0.25em] text-slate-500 dark:text-slate-400 uppercase -mt-1">
              Surabaya &bull; Visual Storyteller
            </span>
          </div>
        </button>

        {/* View Mode Pill Switcher (Central Attraction) */}
        <div className="hidden sm:flex items-center p-1 rounded-full bg-black/40 dark:bg-white/5 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => {
              if (viewMode !== 'spatial') onToggleViewMode();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all cursor-pointer ${
              viewMode === 'spatial'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Kanvas Spasial 360°</span>
          </button>

          <button
            onClick={() => {
              if (viewMode !== 'editorial') onToggleViewMode();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all cursor-pointer ${
              viewMode === 'editorial'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Mode Editorial</span>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="text-xs uppercase tracking-[0.2em] font-medium text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle & WhatsApp CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Ubah Tema Tampilan"
            className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-amber-500/50 hover:text-amber-500 transition-all cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <a
            href={createWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Reservasi</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleViewMode}
            aria-label="Ganti Tampilan"
            className="p-2 rounded-full text-amber-400 border border-amber-500/30"
          >
            {viewMode === 'spatial' ? <LayoutGrid className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Ubah Tema"
            className="p-2 rounded-full text-slate-700 dark:text-slate-200"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu"
            className="p-2 rounded-lg text-slate-900 dark:text-white hover:text-amber-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070a11]/98 dark:bg-[#070a11]/98 bg-white/98 border-b border-white/10 dark:border-white/10 border-slate-200 px-6 py-8 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-5">
            {/* View mode toggle in mobile menu */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-white/10 border-slate-200">
              <span className="text-xs uppercase tracking-wider text-slate-400">Mode Tampilan:</span>
              <button
                onClick={() => {
                  onToggleViewMode();
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-500 text-slate-950"
              >
                {viewMode === 'spatial' ? 'Buka Mode Editorial' : 'Buka Kanvas Spasial 360°'}
              </button>
            </div>

            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="text-left text-sm uppercase tracking-[0.2em] font-medium text-slate-700 dark:text-slate-200 hover:text-amber-500 transition-colors"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-white/10 dark:border-white/10 border-slate-200">
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500 text-slate-950"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi via WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
