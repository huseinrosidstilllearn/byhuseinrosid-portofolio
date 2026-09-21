import React from 'react';
import { User, MapPin, Eye, Heart, Compass } from 'lucide-react';
import { PHOTOGRAPHER_PROFILE } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="tentang" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-white/[0.08]">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
          <User className="w-3.5 h-3.5" />
          <span>Profil Fotografer</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl text-white font-medium">
          Mendengar Sebelum Melihat
        </h2>
      </div>

      {/* About Bento Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* TILE 1: Portrait Bento (5 cols) */}
        <div className="lg:col-span-5 bento-card p-0 relative overflow-hidden min-h-[460px] group">
          <img
            src={PHOTOGRAPHER_PROFILE.avatarUrl}
            alt="Husein Rosid"
            loading="lazy"
            className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400">
              Visual Storyteller
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-white font-medium mt-1">
              Husein Rosid
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-light mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Surabaya, Jawa Timur, Indonesia</span>
            </div>
          </div>
        </div>

        {/* TILE 2: Biography & Philosophy (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Bio Narrative Card */}
          <div className="bento-card p-6 sm:p-8 flex-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold block mb-4">
              Narasi & Pendekatan Visual
            </span>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {PHOTOGRAPHER_PROFILE.bioFull.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* 3 Modular Pillar Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bento-card p-5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
                <Eye className="w-4 h-4" />
              </div>
              <h4 className="font-editorial text-base text-white font-medium">
                Ketajaman Observasi
              </h4>
              <p className="text-[11px] text-slate-400 font-light mt-1 leading-relaxed">
                Menemukan keindahan dalam detil kecil yang kerap terlewatkan.
              </p>
            </div>

            <div className="bento-card p-5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="font-editorial text-base text-white font-medium">
                Kejujuran Emosi
              </h4>
              <p className="text-[11px] text-slate-400 font-light mt-1 leading-relaxed">
                Tanpa kepura-puraan; membiarkan subjek tampil apa adanya.
              </p>
            </div>

            <div className="bento-card p-5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="font-editorial text-base text-white font-medium">
                Eksplorasi Tak Henti
              </h4>
              <p className="text-[11px] text-slate-400 font-light mt-1 leading-relaxed">
                Siap menjelajahi ragam sudut nusantara untuk proyek visual tinggi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
