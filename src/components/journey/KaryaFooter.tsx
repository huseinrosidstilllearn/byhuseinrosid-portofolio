import { useState, useEffect } from 'react';
import { Sparkles, Compass, MessageCircle, ArrowUp, FileText } from 'lucide-react';
import { PHOTOGRAPHER_PROFILE, CONTACT_CONFIG } from '../../data/portfolioData';
import type { SiteMode, PhotographerProfile, ContactConfig } from '../../types/portfolio';
import { createWhatsAppLink } from '../../utils/whatsapp';

interface KaryaFooterProps {
  profile?: PhotographerProfile;
  contact?: ContactConfig;
  onSwitchToSpatial: () => void;
  onSwitchSiteMode: (mode: SiteMode) => void;
}

export function KaryaFooter({
  profile = PHOTOGRAPHER_PROFILE,
  contact = CONTACT_CONFIG,
  onSwitchToSpatial,
  onSwitchSiteMode,
}: KaryaFooterProps) {
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFab(window.scrollY > 250);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentProfile = profile || PHOTOGRAPHER_PROFILE;
  const currentContact = contact || CONTACT_CONFIG;
  const year = new Date().getFullYear();
  const waLink = currentContact.whatsappNumber
    ? `https://wa.me/${currentContact.whatsappNumber}?text=Halo%20Mas%20Husein%2C%20saya%20tertarik%20untuk%20berkolaborasi!`
    : createWhatsAppLink();

  return (
    <footer className="relative border-t border-white/5 py-10 px-4 sm:px-8">
      <div className="w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="text-center sm:text-left">
          <p className="font-headline text-lg font-black text-white">{currentProfile.brandName}</p>
          <p className="text-white/30 text-xs mt-0.5">{currentProfile.location}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Spatial canvas */}
          <button
            onClick={onSwitchToSpatial}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-amber-500/40 active:scale-95 text-white/50 hover:text-amber-400 text-xs transition-all duration-300 group cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400/80 group-hover:text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Kanvas 360°</span>
          </button>

          {/* Switch to Perjalanan */}
          <button
            onClick={() => onSwitchSiteMode('perjalanan')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-amber-500/40 active:scale-95 text-white/50 hover:text-white text-xs transition-all duration-300 group cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
            <span>Perjalanan Visual</span>
          </button>

          {/* Switch to CV */}
          <button
            onClick={() => onSwitchSiteMode('cv')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-amber-500/40 active:scale-95 text-white/50 hover:text-amber-400 text-xs transition-all duration-300 group cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Dokumen CV</span>
          </button>

          {/* WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-semibold text-xs transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Minta Sesi</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-white/20 text-xs font-mono text-center sm:text-right">
          © {year} {currentProfile.brandName}
          <br />
          <a href={currentContact.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
            {currentContact.instagram}
          </a>
        </p>
      </div>

      {/* Floating Action Buttons Container (Bottom Right) */}
      <div
        className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-2.5 transition-all duration-300 ${
          showFab
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Kembali ke atas"
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-[#0E1118]/90 border border-white/20 text-slate-300 hover:text-white hover:border-amber-400 backdrop-blur-xl shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* Floating WhatsApp */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hubungi via WhatsApp"
          className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </a>
      </div>
    </footer>
  );
}
