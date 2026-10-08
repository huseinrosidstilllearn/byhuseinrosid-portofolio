import React from 'react';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { SERVICE_PACKAGES } from '../data/portfolioData';
import { getCategoryInfo, CATEGORY_DETAILS } from '../data/categoryData';
import { createWhatsAppLink } from '../utils/whatsapp';
import type { ServicePackage, PhotoItem } from '../types/portfolio';

interface ServicesProps {
  packages?: ServicePackage[];
  photos?: PhotoItem[];
  onSelectCategory?: (categoryName: string) => void;
}

const TARGET_CATEGORY_MAP: Record<number, string> = {
  0: 'Event Documentation',
  1: 'Graduation',
  2: 'Couple Session',
};

export const Services: React.FC<ServicesProps> = ({
  packages = SERVICE_PACKAGES,
  photos = [],
  onSelectCategory,
}) => {
  const activePackages = React.useMemo(() => {
    if (
      packages &&
      packages.length >= 3 &&
      packages.some(
        (p) =>
          p.category === 'Event Documentation' ||
          p.title.toLowerCase().includes('dokumentasi')
      )
    ) {
      return packages.slice(0, 3);
    }
    return SERVICE_PACKAGES;
  }, [packages]);

  const handleGoToCategory = (targetCat: string) => {
    if (onSelectCategory) {
      onSelectCategory(targetCat);
    } else {
      const info = getCategoryInfo(targetCat);
      window.location.hash = `kategori=${info.slug}`;
    }
  };

  const getCategoryCount = (categoryName: string): number => {
    if (!photos || photos.length === 0) return 0;
    return photos.filter((p) => p.category === categoryName).length;
  };

  const getCategoryCover = (categoryName: string, fallbackUrl: string): string => {
    const matched = photos?.find((p) => p.category === categoryName && p.imageUrl);
    return matched ? matched.imageUrl : fallbackUrl;
  };

  return (
    <section
      id="layanan"
      className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 max-w-[1920px] mx-auto scroll-mt-28"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fokus Kategori & Spesialisasi</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-white font-medium">
            Tiga Pilar Utama Penugasan
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
          Fokus utama karya fotografi Husein Rosid berakar pada Dokumentasi Acara, Wisuda, dan Couple Session. Pilih kategori untuk langsung membuka ruang galeri kurasi lengkapnya.
        </p>
      </div>

      {/* 3 Focused Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activePackages.slice(0, 3).map((service, index) => {
          const targetCategory =
            service.category && CATEGORY_DETAILS[service.category]
              ? service.category
              : TARGET_CATEGORY_MAP[index] || 'Event Documentation';

          const categoryInfo = getCategoryInfo(targetCategory);
          const CategoryIcon = categoryInfo.icon;
          const photoCount = getCategoryCount(targetCategory);
          const coverImage = getCategoryCover(targetCategory, categoryInfo.coverImage);
          const numberLabel = `0${index + 1}`;

          return (
            <div
              key={service.id || targetCategory}
              className="bento-card p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400/40 transition-all duration-500 rounded-3xl"
            >
              <div>
                {/* Visual Cover Banner with Direct Action */}
                <div
                  onClick={() => handleGoToCategory(targetCategory)}
                  className="relative h-48 sm:h-52 -mx-6 sm:-mx-7 -mt-6 sm:-mt-7 mb-5 overflow-hidden border-b border-white/[0.08] cursor-pointer"
                  title={`Buka Ruang Galeri ${categoryInfo.title}`}
                >
                  <img
                    src={coverImage}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1118] via-[#0E1118]/40 to-black/30" />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-mono font-semibold tracking-widest text-amber-300 backdrop-blur-md">
                      {numberLabel} / PILAR
                    </span>
                    {photoCount > 0 ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono font-semibold text-amber-300 backdrop-blur-md">
                        {photoCount} Karya
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono text-slate-300 backdrop-blur-md">
                        Arsip Siap
                      </span>
                    )}
                  </div>

                  {/* Bottom Category Pill inside Banner */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E1118]/85 border border-white/15 backdrop-blur-md text-[11px] font-medium text-slate-200">
                      <CategoryIcon className={`w-3.5 h-3.5 ${categoryInfo.accentColor}`} />
                      <span>{categoryInfo.title}</span>
                    </div>
                    <span className="text-[10px] text-amber-400 font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Buka Galeri &rarr;
                    </span>
                  </div>
                </div>

                {/* Card Title & Tagline */}
                <h3
                  onClick={() => handleGoToCategory(targetCategory)}
                  className="font-editorial text-2xl font-medium text-white mb-2 group-hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {service.title}
                </h3>

                <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                  {service.tagline}
                </p>

                {/* Category Tags Pills */}
                {categoryInfo.tags && categoryInfo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {categoryInfo.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] text-slate-400 font-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Scope of Focus / Cakupan Spesialisasi */}
                <div className="pt-4 border-t border-white/[0.08] mb-5">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-3">
                    Cakupan Spesialisasi:
                  </span>
                  <ul className="space-y-2">
                    {service.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-slate-300 font-light leading-relaxed"
                      >
                        <span className="text-amber-400 font-mono select-none mt-[-1px]">&bull;</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer & Dual Action Buttons */}
              <div className="pt-4 border-t border-white/[0.08] mt-4 space-y-2.5">
                <p className="text-[11px] text-slate-400 italic leading-relaxed">
                  {service.note}
                </p>

                {/* Primary Action: Direct Navigation to Category Page */}
                <button
                  type="button"
                  onClick={() => handleGoToCategory(targetCategory)}
                  className="w-full py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:scale-[1.02] cursor-pointer"
                >
                  <span>Buka Ruang {categoryInfo.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Secondary Action: WhatsApp Inquiry */}
                <a
                  href={createWhatsAppLink(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-full text-[11px] font-medium tracking-wider flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Konsultasi Sesi via WhatsApp</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
