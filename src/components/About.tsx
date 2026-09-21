import React from 'react';
import { PHOTOGRAPHER_PROFILE } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="tentang" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto scroll-mt-24 border-t border-[#1A1A1A]/10 dark:border-white/10">
      {/* Section Header */}
      <div className="pb-12 border-b border-[#1A1A1A]/10 dark:border-white/10 mb-16">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] font-semibold block mb-3">
          03 &bull; Mengenal Lebih Dekat
        </span>
        <h2 className="font-editorial text-4xl sm:text-6xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal tracking-tight max-w-3xl leading-[1.1]">
          Mendengar Melalui Mata,{' '}
          <span className="italic font-normal text-[#8B7355] dark:text-[#C4A47C]">
            Bercerita Melalui Rasa.
          </span>
        </h2>
      </div>

      {/* Main Editorial Spread: Portrait & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left: Portrait */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden bg-[#F3EFEA] dark:bg-[#16181F]">
            <img
              src={PHOTOGRAPHER_PROFILE.avatarUrl}
              alt="Husein Rosid — Fotografer"
              loading="lazy"
              className="w-full h-auto aspect-[3/4] object-cover filter contrast-[1.03]"
            />
          </div>
          <div className="mt-4 flex items-baseline justify-between text-xs text-[#8A857D] border-t border-[#1A1A1A]/10 dark:border-white/10 pt-3">
            <span className="font-editorial text-base text-[#1A1A1A] dark:text-[#F3EFEA] font-medium">
              Husein Rosid
            </span>
            <span className="uppercase tracking-widest text-[10px]">
              Surabaya, Indonesia
            </span>
          </div>
        </div>

        {/* Right: Long-form Bio */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          <div className="space-y-6 text-base sm:text-lg text-[#1A1A1A]/85 dark:text-[#F3EFEA]/85 font-light leading-relaxed">
            {PHOTOGRAPHER_PROFILE.bioFull.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="p-6 sm:p-8 bg-[#F3EFEA]/60 dark:bg-white/[0.03] border-l-2 border-[#8B7355] mt-6">
            <p className="font-editorial text-xl sm:text-2xl text-[#1A1A1A] dark:text-[#F3EFEA] italic font-normal">
              &ldquo;{PHOTOGRAPHER_PROFILE.philosophy}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Pillars of Visual Work */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mt-20 sm:mt-28 pt-12 border-t border-[#1A1A1A]/10 dark:border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355] font-semibold block mb-2">
            Pilar 01
          </span>
          <h3 className="font-editorial text-xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal mb-2">
            Ketajaman Observasi
          </h3>
          <p className="text-sm text-[#8A857D] font-light leading-relaxed">
            Menemukan keindahan dalam detil kecil yang kerap terlewatkan mata biasa.
          </p>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355] font-semibold block mb-2">
            Pilar 02
          </span>
          <h3 className="font-editorial text-xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal mb-2">
            Kejujuran Emosi
          </h3>
          <p className="text-sm text-[#8A857D] font-light leading-relaxed">
            Tanpa kepura-puraan; membiarkan subjek tampil apa adanya dengan rasa nyaman.
          </p>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355] font-semibold block mb-2">
            Pilar 03
          </span>
          <h3 className="font-editorial text-xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal mb-2">
            Eksplorasi Tak Henti
          </h3>
          <p className="text-sm text-[#8A857D] font-light leading-relaxed">
            Siap menjelajahi ragam sudut nusantara untuk proyek visual bernilai tinggi.
          </p>
        </div>
      </div>
    </section>
  );
};
