import React from 'react';
import { ArrowDown, ArrowUpRight, MessageCircle, MapPin, Sparkles, Clock } from 'lucide-react';
import { PHOTOGRAPHER_PROFILE, PORTFOLIO_PHOTOS } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const featuredPhoto = PORTFOLIO_PHOTOS[0];

  return (
    <section className="pt-28 sm:pt-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 12-Column Asymmetric Bento Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
        
        {/* TILE 1: Headline & Vision Card (8 cols) */}
        <div className="md:col-span-12 lg:col-span-8 bento-card p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
          {/* Subtle Ambient Top Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-[10px] font-semibold uppercase tracking-[0.2em] mb-6">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Arsip Visual &bull; Portofolio Fotografi</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-white max-w-3xl">
              Stories Told in the{' '}
              <span className="italic text-amber-400 font-normal inline-block split-wave cursor-pointer" aria-label="Quiet Spaces">
                <span aria-hidden="true">
                  {"Quiet Spaces".split("").map((char, i) => (
                    <i key={i} style={{ '--i': i } as React.CSSProperties} className={char === ' ' ? 'inline-block w-2 sm:w-3' : ''}>
                      {char}
                    </i>
                  ))}
                </span>
              </span>{' '}
              Between Moments.
            </h1>

            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mt-6 max-w-2xl">
              {PHOTOGRAPHER_PROFILE.subheadline} Menghidupkan kembali keheningan, kejujuran rasa, dan keindahan setiap tarikan napas melalui lensa fotografi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-white/[0.08]">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-semibold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all cursor-pointer shadow-lg hover:scale-105"
            >
              <span>Jelajahi Galeri Bento</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:border-amber-400 hover:text-amber-400 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Minta Penawaran Sesi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* TILE 2: Live Status & Quick Action Card (4 cols) */}
        <div className="md:col-span-12 lg:col-span-4 bento-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">
                Pusat Operasional
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Aktif</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Surabaya, Jawa Timur</h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Siap penugasan di seluruh nusantara & internasional
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Zona Waktu: WIB (UTC+7)</h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Respons cepat via WhatsApp resmi
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider">Chat WhatsApp</span>
              </div>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* TILE 3: Centerpiece Visual Showcase Tile (7 cols) */}
        <div className="md:col-span-12 lg:col-span-7 bento-card p-0 relative overflow-hidden min-h-[400px] sm:min-h-[460px] group cursor-pointer" onClick={onExploreClick}>
          <img
            src={featuredPhoto.imageUrl}
            alt={featuredPhoto.title}
            className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-between p-6 sm:p-8">
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-[0.2em] text-amber-400 font-medium">
                Karya Pilihan Editor
              </span>
              <span className="text-[11px] text-white/70 font-light backdrop-blur-md px-2.5 py-0.5 rounded-full bg-black/40">
                {featuredPhoto.year}
              </span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-medium">
                {featuredPhoto.category} &bull; {featuredPhoto.location}
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-white font-medium mt-1">
                {featuredPhoto.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 max-w-lg line-clamp-2">
                {featuredPhoto.description}
              </p>
            </div>
          </div>
        </div>

        {/* TILE 4: Metrics & Philosophy Bento Module (5 cols) */}
        <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4 sm:gap-5">
          {/* Sub-tile 4A: 3 Metrics Grid */}
          <div className="bento-card p-6 sm:p-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium block mb-4">
              Rekam Jejak Karya
            </span>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="font-editorial text-2xl sm:text-3xl text-amber-400 font-bold">7+</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-1">Tahun Lensa</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="font-editorial text-2xl sm:text-3xl text-white font-bold">100%</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-1">Emosi Alami</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="font-editorial text-2xl sm:text-3xl text-amber-400 font-bold">SBY</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-1">Basis Nusantara</div>
              </div>
            </div>
          </div>

          {/* Sub-tile 4B: Signature Philosophy Card */}
          <div className="bento-card p-6 sm:p-8 flex-1 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#121520]/80 to-[#0A0C12]/80">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-semibold block mb-3">
                Filosofi Visual
              </span>
              <blockquote className="font-editorial text-lg sm:text-xl text-white italic font-normal leading-relaxed">
                &ldquo;{PHOTOGRAPHER_PROFILE.philosophy}&rdquo;
              </blockquote>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-light">
              <span>Husein Rosid</span>
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-medium">
                Dokumentasi Abadi
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
