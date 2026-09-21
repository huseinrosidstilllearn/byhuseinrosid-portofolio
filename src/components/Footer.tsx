import React from 'react';
import { ArrowUp, Mail, MessageCircle } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[#060910] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <a href="#" className="font-editorial text-2xl font-semibold tracking-wider text-white hover:text-amber-400 transition-colors">
              By Husein Rosid
            </a>
            <p className="text-xs text-slate-400 font-light mt-1 max-w-sm">
              Merekam emosi jujur dan keabadian cahaya. Berbasis di Surabaya, Jawa Timur &mdash; siap melayani penugasan di seluruh nusantara.
            </p>
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${CONTACT_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Resmi"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href={CONTACT_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Portofolio"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${CONTACT_CONFIG.email}`}
              aria-label="Kirim Email"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-light gap-4">
          <div>
            &copy; {new Date().getFullYear()} By Husein Rosid. Seluruh hak cipta karya visual dilindungi undang-undang.
          </div>
          <div>
            Dibuat dengan dedikasi visual &bull; Surabaya, Indonesia
          </div>
        </div>
      </footer>

      {/* Floating Direct WhatsApp Button */}
      <a
        href={createWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi Langsung via WhatsApp"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-2xl hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 transition-all cursor-pointer"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs tracking-wider uppercase hidden sm:inline">
          Chat WhatsApp
        </span>
      </a>
    </>
  );
};
