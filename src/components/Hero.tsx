import React from 'react';
import { ArrowDown, MessageCircle, MapPin } from 'lucide-react';
import { PHOTOGRAPHER_PROFILE } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Cinematic Background with Atmospheric Vignette */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=85"
          alt="Atmospheric Background By Husein Rosid"
          className="w-full h-full object-cover object-center filter brightness-[0.35] dark:brightness-[0.25] scale-105 animate-pulse duration-10000"
        />
        {/* Layered Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/70 to-transparent dark:from-[#090d16] dark:via-[#090d16]/70 from-white via-white/80" />
        <div className="absolute inset-0 bg-radial at-center from-transparent via-black/40 to-[#090d16]/90 dark:to-[#090d16]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Location & Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-8">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-amber-200">
            Surabaya, Indonesia &bull; Terbuka untuk Penugasan
          </span>
        </div>

        {/* The Chosen English Editorial Headline */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight text-slate-900 dark:text-white max-w-4xl mb-6">
          Stories Told in the <span className="italic text-amber-500/90 dark:text-amber-400">Quiet Spaces</span> Between Moments.
        </h1>

        {/* Indonesian Subheadline & Philosophy */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-10">
          {PHOTOGRAPHER_PROFILE.subheadline} Menghidupkan kembali keheningan, kejujuran rasa, dan keindahan setiap tarikan napas melalui lensa fotografi.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#galeri"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-white text-slate-950 hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
          >
            <span>Jelajahi Karya</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>

          <a
            href={createWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white hover:border-amber-500 hover:text-amber-400 backdrop-blur-sm transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-amber-400" />
            <span>Minta Penawaran</span>
          </a>
        </div>

        {/* Experience & Trust Badges */}
        <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-white/10 grid grid-cols-3 gap-6 sm:gap-16 text-center">
          <div>
            <div className="font-editorial text-2xl sm:text-3xl text-slate-900 dark:text-white font-medium">7+</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">Tahun Menatap Lensa</div>
          </div>
          <div>
            <div className="font-editorial text-2xl sm:text-3xl text-amber-500 dark:text-amber-400 font-medium">100%</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">Kejujuran Emosi</div>
          </div>
          <div>
            <div className="font-editorial text-2xl sm:text-3xl text-slate-900 dark:text-white font-medium">Surabaya</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">Basis Nusantara</div>
          </div>
        </div>
      </div>
    </section>
  );
};
