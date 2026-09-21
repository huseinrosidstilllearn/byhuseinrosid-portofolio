import React from 'react';
import { ArrowUp, Compass, MessageCircle } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

interface FooterProps {
  onSwitchToSpatial?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSwitchToSpatial }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-16">
        {/* Bento Colophon Card */}
        <div className="bento-card p-8 sm:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-editorial font-bold text-sm">
                  HR
                </div>
                <span className="font-editorial text-2xl sm:text-3xl text-white font-medium">
                  By Husein Rosid
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-light mt-2 max-w-md">
                Merekam emosi jujur dan keabadian cahaya. Berbasis di Surabaya &mdash; siap melayani penugasan di seluruh penjuru nusantara.
              </p>
            </div>

            {/* Quick Links & Easter Egg */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs uppercase tracking-wider font-semibold">
              <a
                href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={CONTACT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Instagram
              </a>
              <a
                href={`mailto:${CONTACT_CONFIG.email}`}
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Email
              </a>

              {onSwitchToSpatial && (
                <button
                  onClick={onSwitchToSpatial}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Mode Kanvas 360&deg;</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Colophon Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
            <div>
              &copy; {new Date().getFullYear()} By Husein Rosid. Seluruh hak cipta karya visual dilindungi.
            </div>

            <div className="flex items-center gap-6">
              <span>Surabaya &bull; Indonesia</span>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer text-xs uppercase tracking-wider font-medium"
              >
                <span>Kembali ke Atas</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Direct WhatsApp Action Button */}
      <a
        href={createWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi Langsung via WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer hover:scale-105"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Chat WhatsApp</span>
      </a>
    </>
  );
};
