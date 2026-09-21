import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PHOTOGRAPHER_PROFILE } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[94vh] flex flex-col justify-between pt-36 sm:pt-44 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      {/* Top Editorial Index Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 dark:border-white/10 pb-6">
        <div className="text-[11px] uppercase tracking-[0.25em] text-[#8A857D] font-medium">
          Surabaya, Indonesia &bull; Portofolio Fotografi
        </div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-[#8B7355] font-medium">
          Tersedia untuk Penugasan Terpilih
        </div>
      </div>

      {/* Main Massive Editorial Title */}
      <div className="my-auto py-12 sm:py-16">
        <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-[106px] xl:text-[118px] text-[#1A1A1A] dark:text-[#F3EFEA] font-normal leading-[1.02] tracking-tight max-w-5xl">
          Stories Told in the{' '}
          <span className="italic font-normal text-[#8B7355] dark:text-[#C4A47C]">
            Quiet Spaces
          </span>{' '}
          Between Moments.
        </h1>

        {/* Narrative & Action Row */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <p className="lg:col-span-7 text-base sm:text-lg text-[#1A1A1A]/80 dark:text-[#F3EFEA]/80 font-light leading-relaxed max-w-2xl">
            {PHOTOGRAPHER_PROFILE.subheadline} Menghidupkan kembali keheningan, kejujuran rasa, dan keindahan setiap tarikan napas manusia dan lanskap nusantara.
          </p>

          <div className="lg:col-span-5 flex flex-wrap items-center gap-6 sm:gap-8 lg:justify-end">
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-[#1A1A1A] dark:text-[#F3EFEA] hover:text-[#8B7355] transition-colors cursor-pointer"
            >
              <span>Jelajahi Arsip</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </button>

            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] font-medium text-[#8B7355] hover:text-[#1A1A1A] dark:hover:text-white transition-colors cursor-pointer"
            >
              <span>Konsultasi Sesi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Editorial Index Columns at Footer of Hero */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#1A1A1A]/10 dark:border-white/10 text-xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A857D] block mb-1">
            01 / Rekam Jejak
          </span>
          <p className="font-editorial text-base sm:text-lg text-[#1A1A1A] dark:text-[#F3EFEA] font-medium">
            7+ Tahun Pengalaman Visual
          </p>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A857D] block mb-1">
            02 / Prinsip Karya
          </span>
          <p className="font-editorial text-base sm:text-lg text-[#1A1A1A] dark:text-[#F3EFEA] font-medium">
            Kejujuran Emosi & Cahaya Alami
          </p>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A857D] block mb-1">
            03 / Cakupan
          </span>
          <p className="font-editorial text-base sm:text-lg text-[#1A1A1A] dark:text-[#F3EFEA] font-medium">
            Surabaya &bull; Lintas Nusantara
          </p>
        </div>
      </div>
    </section>
  );
};
