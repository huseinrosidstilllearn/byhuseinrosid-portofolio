import React from 'react';
import { ArrowUp, Compass, MessageCircle, Mail, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';
import { CONTACT_CONFIG, PHOTOGRAPHER_PROFILE } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface FooterProps {
  onSwitchToSpatial?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSwitchToSpatial, onNavigateToSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#080A0F] border-t-2 border-white/15 text-slate-300 relative z-20 overflow-hidden" aria-label="Footer Editorial By Husein Rosid">
      
      {/* 1. PRE-FOOTER CALL-TO-ACTION STRIPE (CodeFronts Design #23) */}
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-[#0C101A] to-[#080A0F] py-14 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-[10px] font-semibold uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Konsultasi & Kolaborasi Visual</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-white font-medium leading-tight">
              Mari Hidupkan Cerita Anda Bersama Husein Rosid.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light mt-3 leading-relaxed">
              Menerima penugasan komersial, esai dokumenter, potret personal autentik, dan dokumentasi pernikahan di Surabaya maupun perjalanan ke seluruh penjuru Indonesia.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Konsultasi via WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${CONTACT_CONFIG.email}`}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/20 hover:border-amber-400 bg-white/[0.04] hover:bg-white/10 text-white hover:text-amber-300 font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Kirimkan Brief Surel</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. EDITORIAL FOLIO HEADER (CodeFronts Design #12) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="py-8 sm:py-10 border-b border-white/[0.12] flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-editorial font-bold text-base">
              HR
            </div>
            <span
              className="font-editorial text-2xl sm:text-3xl text-white font-semibold tracking-tight split-wave cursor-pointer"
              aria-label="By Husein Rosid"
            >
              <span aria-hidden="true">
                {'By Husein Rosid'.split('').map((char, i) => (
                  <i key={i} style={{ '--i': i } as React.CSSProperties} className={char === ' ' ? 'inline-block w-2' : ''}>
                    {char}
                  </i>
                ))}
              </span>
            </span>
          </div>

          <div className="text-xs text-slate-400 font-mono tracking-wider uppercase">
            Vol. VII &bull; Portofolio Fotografi &bull; Surabaya, ID &bull; Edisi 2025&ndash;2026
          </div>
        </div>

        {/* 3. MULTI-COLUMN EDITORIAL MASTHEAD WITH HAIRLINE RULES (CodeFronts Design #12) */}
        <div className="editorial-masthead py-10 sm:py-14 border-b border-white/[0.12]">
          
          {/* Section 1: Arsip Visual */}
          <section className="editorial-masthead-sec" aria-labelledby="ft-col-1">
            <h3 id="ft-col-1" className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 pb-2 mb-3 border-b border-white/[0.08]">
              Arsip &amp; Ragam Visual
            </h3>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')} className="hover:text-amber-300 transition-colors">
                  Lanskap &amp; Semesta Bromo
                </a>
              </li>
              <li>
                <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')} className="hover:text-amber-300 transition-colors">
                  Garis Bayang Arsitektur Kota
                </a>
              </li>
              <li>
                <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')} className="hover:text-amber-300 transition-colors">
                  Potret Karakter Chiaroscuro
                </a>
              </li>
              <li>
                <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')} className="hover:text-amber-300 transition-colors">
                  Kampanye Editorial Komersial
                </a>
              </li>
              <li>
                <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')} className="hover:text-amber-300 transition-colors">
                  Dokumentasi Sakral Pernikahan
                </a>
              </li>
            </ul>
          </section>

          {/* Section 2: Navigasi Portfolio */}
          <section className="editorial-masthead-sec" aria-labelledby="ft-col-2">
            <h3 id="ft-col-2" className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 pb-2 mb-3 border-b border-white/[0.08]">
              Navigasi Halaman
            </h3>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <a href="#galeri" onClick={(e) => handleNavClick(e, 'galeri')} className="hover:text-amber-300 transition-colors">
                  Galeri Eksibisi Pilihan
                </a>
              </li>
              <li>
                <a href="#kisah" onClick={(e) => handleNavClick(e, 'kisah')} className="hover:text-amber-300 transition-colors">
                  Kisah &amp; Esai di Balik Lensa
                </a>
              </li>
              <li>
                <a href="#tentang" onClick={(e) => handleNavClick(e, 'tentang')} className="hover:text-amber-300 transition-colors">
                  Profil &amp; Filosofi Fotografer
                </a>
              </li>
              <li>
                <a href="#layanan" onClick={(e) => handleNavClick(e, 'layanan')} className="hover:text-amber-300 transition-colors">
                  Paket Penugasan &amp; Investasi
                </a>
              </li>
              <li>
                <a href="#kontak" onClick={(e) => handleNavClick(e, 'kontak')} className="hover:text-amber-300 transition-colors">
                  Kontak &amp; Permintaan Jadwal
                </a>
              </li>
            </ul>
          </section>

          {/* Section 3: Zona Operasional & Layanan */}
          <section className="editorial-masthead-sec" aria-labelledby="ft-col-3">
            <h3 id="ft-col-3" className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 pb-2 mb-3 border-b border-white/[0.08]">
              Pangkalan &amp; Operasional
            </h3>
            <div className="space-y-3 text-sm font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-medium block">Surabaya, Jawa Timur</strong>
                  <span className="text-xs text-slate-400">Siap penugasan di seluruh nusantara &amp; internasional</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/[0.06] text-xs space-y-1 text-slate-400">
                <p>&bull; Zona Waktu: WIB (UTC+7)</p>
                <p>&bull; Waktu Respons: Maksimal 24 jam</p>
                <p>&bull; Status: Terbuka untuk Booking 2025&ndash;2026</p>
              </div>
              {onSwitchToSpatial && (
                <div className="pt-2">
                  <button
                    onClick={onSwitchToSpatial}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Buka Mode Kanvas 360&deg;</span>
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Section 4: Kanal Resmi */}
          <section className="editorial-masthead-sec" aria-labelledby="ft-col-4">
            <h3 id="ft-col-4" className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 pb-2 mb-3 border-b border-white/[0.08]">
              Kanal Komunikasi
            </h3>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <a
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-amber-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{CONTACT_CONFIG.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-amber-300 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{CONTACT_CONFIG.instagram}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_CONFIG.email}`}
                  className="flex items-center gap-2.5 hover:text-amber-300 transition-colors truncate"
                >
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{CONTACT_CONFIG.email}</span>
                </a>
              </li>
            </ul>
          </section>

        </div>

        {/* 4. EDITORIAL COLOPHON (CodeFronts Design #12) */}
        <div className="py-8 sm:py-10 border-b border-white/[0.12] grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6 lg:col-span-5">
            <blockquote className="font-editorial text-lg sm:text-xl text-white italic font-normal leading-relaxed">
              &ldquo;{PHOTOGRAPHER_PROFILE.philosophy}&rdquo;
            </blockquote>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mt-2 block">
              &mdash; Husein Rosid, Fotografer
            </span>
          </div>

          <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              Karya visual dalam arsip ini diciptakan dengan dedikasi terhadap keheningan, kemurnian cahaya alami, dan penghormatan terhadap cerita hidup setiap subjek. Diterbitkan secara resmi di Surabaya, Indonesia.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
              <span>FOTOGRAFI DOKUMENTER &bull; KOMERSIAL &bull; POTRET &bull; LANSKAP</span>
            </div>
          </div>
        </div>

        {/* 5. BOTTOM BAR (CodeFronts Design #12) */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <div>
            &copy; {new Date().getFullYear()} By Husein Rosid. Seluruh hak cipta karya visual dilindungi undang-undang.
          </div>

          <div className="flex items-center gap-6">
            <span>Surabaya, Jawa Timur, Indonesia</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer uppercase tracking-wider font-semibold text-[11px]"
              aria-label="Kembali ke bagian paling atas halaman"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* FLOATING DIRECT WHATSAPP ACTION BUTTON */}
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
    </footer>
  );
};
