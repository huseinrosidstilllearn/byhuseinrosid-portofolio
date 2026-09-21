import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Karya', id: 'galeri' },
    { label: 'Kisah', id: 'kisah' },
    { label: 'Tentang', id: 'tentang' },
    { label: 'Layanan', id: 'layanan' },
    { label: 'Kontak', id: 'kontak' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || viewMode === 'spatial'
          ? 'bg-[#FAF8F5]/90 dark:bg-[#0E1015]/90 backdrop-blur-md border-b border-[#1A1A1A]/5 dark:border-white/5 py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Title */}
        <button
          onClick={() => {
            if (viewMode === 'spatial') onToggleViewMode();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group cursor-pointer"
        >
          <span className="font-editorial text-xl sm:text-2xl tracking-tight text-[#1A1A1A] dark:text-[#F3EFEA] font-medium group-hover:text-[#8B7355] transition-colors">
            By Husein Rosid
          </span>
          <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-[#8A857D] font-light">
            Surabaya &bull; Visual Storyteller
          </span>
        </button>

        {/* Center / Spatial Mode Back Indicator */}
        {viewMode === 'spatial' ? (
          <button
            onClick={onToggleViewMode}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1A1A1A]/15 dark:border-white/15 bg-white/70 dark:bg-black/50 text-xs tracking-wider uppercase font-medium text-[#1A1A1A] dark:text-[#F3EFEA] hover:bg-[#1A1A1A] hover:text-[#FAF8F5] dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Editorial</span>
          </button>
        ) : (
          /* Desktop Editorial Navigation */
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigateToSection(link.id)}
                className="text-xs uppercase tracking-[0.22em] text-[#1A1A1A]/70 dark:text-[#F3EFEA]/70 hover:text-[#8B7355] dark:hover:text-[#8B7355] transition-colors font-medium cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}

        {/* Right Utility: Theme Toggle & Mobile Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Ganti Tema"
            className="w-9 h-9 flex items-center justify-center text-[#1A1A1A]/70 dark:text-[#F3EFEA]/70 hover:text-[#8B7355] transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {viewMode === 'editorial' && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka Menu"
              className="md:hidden w-9 h-9 flex items-center justify-center text-[#1A1A1A] dark:text-[#F3EFEA] cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Full-Screen Minimalist Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF8F5] dark:bg-[#0E1015] flex flex-col justify-between p-8 sm:p-12 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 dark:border-white/10 pb-6">
            <span className="font-editorial text-xl font-medium tracking-tight text-[#1A1A1A] dark:text-[#F3EFEA]">
              By Husein Rosid
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Tutup Menu"
              className="w-10 h-10 flex items-center justify-center text-[#1A1A1A] dark:text-[#F3EFEA] cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-6 my-auto">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToSection(link.id);
                }}
                className="text-left font-editorial text-4xl sm:text-5xl text-[#1A1A1A] dark:text-[#F3EFEA] hover:text-[#8B7355] transition-colors flex items-baseline gap-4"
              >
                <span className="text-xs font-sans tracking-widest text-[#8A857D] uppercase">
                  0{idx + 1}
                </span>
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#1A1A1A]/10 dark:border-white/10 flex items-center justify-between text-xs tracking-wider uppercase text-[#8A857D]">
            <span>Surabaya, Indonesia</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      )}
    </header>
  );
};
