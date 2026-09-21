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
      <footer className="border-t border-[#1A1A1A]/10 dark:border-white/10 py-16 sm:py-24 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-[#1A1A1A]/10 dark:border-white/10">
          {/* Brand & Philosophy */}
          <div>
            <span className="font-editorial text-3xl sm:text-4xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal tracking-tight block">
              By Husein Rosid
            </span>
            <p className="text-sm text-[#8A857D] font-light mt-2 max-w-md">
              Merekam emosi jujur dan keabadian cahaya. Berbasis di Surabaya, siap menerima penugasan di seluruh nusantara.
            </p>
          </div>

          {/* Social & Direct Contact Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A] dark:text-[#F3EFEA]">
            <a
              href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8B7355] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={CONTACT_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8B7355] transition-colors"
            >
              Instagram
            </a>
            <a
              href={`mailto:${CONTACT_CONFIG.email}`}
              className="hover:text-[#8B7355] transition-colors"
            >
              Email
            </a>
            {onSwitchToSpatial && (
              <button
                onClick={onSwitchToSpatial}
                className="inline-flex items-center gap-1.5 text-[#8B7355] hover:text-[#1A1A1A] dark:hover:text-white transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Kanvas Spasial 360&deg;</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Colophon & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A857D] font-light">
          <div>
            &copy; {new Date().getFullYear()} By Husein Rosid. Seluruh hak cipta karya visual dilindungi.
          </div>

          <div className="flex items-center gap-6">
            <span>Surabaya &bull; Indonesia</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#1A1A1A] dark:text-[#F3EFEA] hover:text-[#8B7355] transition-colors cursor-pointer uppercase tracking-wider text-[11px] font-medium"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Minimal WhatsApp Contact Trigger */}
      <a
        href={createWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi via WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1A1A1A] dark:bg-[#FAF8F5] text-[#FAF8F5] dark:text-[#1A1A1A] shadow-xl hover:bg-[#8B7355] dark:hover:bg-[#8B7355] dark:hover:text-white transition-all duration-300 cursor-pointer text-xs font-medium uppercase tracking-wider"
      >
        <MessageCircle className="w-4 h-4 text-[#8B7355] dark:text-[#8B7355]" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </>
  );
};
