import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, MessageCircle, Mail, ArrowUp } from 'lucide-react';
import { CONTACT_CONFIG, PHOTOGRAPHER_PROFILE } from '../../data/portfolioData';
import type { SiteMode, PhotographerProfile, ContactConfig } from '../../types/portfolio';

interface JourneyFooterProps {
  profile?: PhotographerProfile;
  contact?: ContactConfig;
  onSwitchMode: (mode: SiteMode) => void;
}

export function JourneyFooter({
  profile = PHOTOGRAPHER_PROFILE,
  contact = CONTACT_CONFIG,
  onSwitchMode,
}: JourneyFooterProps) {
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
  const waLink = `https://wa.me/${currentContact.whatsappNumber}?text=Halo%20Mas%20Husein%2C%20saya%20tertarik%20untuk%20berkolaborasi!`;

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 px-4 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 mx-auto">
        {/* CTA Band */}
        <motion.div
          className="bento-card p-8 sm:p-12 rounded-3xl border border-amber-500/20 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-amber-400/60 text-xs font-mono tracking-[0.3em] uppercase mb-4">Mari Berkolaborasi</p>
          <h3 className="font-headline text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Ada Proyek yang<br />
            <span className="text-amber-400">Ingin Diwujudkan?</span>
          </h3>
          <p className="text-white/40 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Saya terbuka untuk penugasan dokumentasi acara, wisuda / graduation, dan sesi couple. Mari bicara tentang visi Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Mulai via WhatsApp</span>
            </a>
            <a
              href={`mailto:${currentContact.email}`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/20 hover:border-amber-500/50 active:scale-95 text-white/70 hover:text-white text-sm transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Kirim Email</span>
            </a>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          {/* Brand */}
          <div>
            <p className="font-headline text-lg font-black text-white">{currentProfile.brandName}</p>
            <p className="text-white/30 text-xs mt-0.5">{currentProfile.location}</p>
          </div>

          {/* Switch mode */}
          <button
            onClick={() => onSwitchMode('karya')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-amber-500/40 active:scale-95 text-white/50 hover:text-white text-xs transition-all duration-300 group cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Buka Mode Galeri Karya</span>
          </button>

          {/* Copyright */}
          <p className="text-white/20 text-xs font-mono">
            © {year} {currentProfile.brandName}
          </p>
        </div>
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
