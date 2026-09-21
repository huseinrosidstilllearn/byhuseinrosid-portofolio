import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { createWhatsAppLink } from '../utils/whatsapp';

export const Navbar: React.FC = () => {
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
    { label: 'Karya', href: '#galeri' },
    { label: 'Kisah Visual', href: '#kisah' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#090d16]/90 dark:bg-[#090d16]/90 bg-white/90 backdrop-blur-md py-3 shadow-lg border-b border-white/5 dark:border-white/5 border-slate-200'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <a href="#" className="flex items-center gap-3 group">
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
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-medium text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle & WhatsApp CTA */}
        <div className="hidden md:flex items-center gap-4">
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
        <div className="md:hidden bg-[#090d16]/98 dark:bg-[#090d16]/98 bg-white/98 border-b border-white/10 dark:border-white/10 border-slate-200 px-6 py-8 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-5">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.2em] font-medium text-slate-700 dark:text-slate-200 hover:text-amber-500 transition-colors"
              >
                {link.label}
              </a>
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
