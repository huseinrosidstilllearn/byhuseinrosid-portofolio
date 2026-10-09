import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { CATEGORY_ORDER, getCategoryInfo } from '../../data/categoryData';
import type { PhotoItem } from '../../types/portfolio';

interface CategoryShowcaseProps {
  photos: PhotoItem[];
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  photos,
  onSelectCategory,
}) => {
  // Hitung jumlah karya & kumpulkan thumbnail per kategori
  const getCategoryStats = (categoryName: string) => {
    const categoryPhotos = photos.filter((p) => p.category === categoryName);
    return {
      count: categoryPhotos.length,
      samplePhotos: categoryPhotos.slice(0, 3),
    };
  };

  return (
    <section
      id="kategori-showcase"
      className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 max-w-[1920px] mx-auto scroll-mt-28"
    >
      {/* Section Header - Vertical Stack & Eyebrow Restraint */}
      <div className="mb-10 sm:mb-12 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
        <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white font-bold tracking-tight">
          Eksplorasi Per Kategori
        </h2>
        <p className="max-w-xl text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mt-3">
          Setiap genre memiliki atmosfer, karakter visual, dan keunikannya masing-masing. Masuk ke ruang kategori khusus untuk melihat arsip lengkap secara mendalam dan terfokus.
        </p>
      </div>

      {/* Category Cards Showcase Grid (Asymmetric Editorial Rhythm) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        {CATEGORY_ORDER.map((catName, index) => {
          const info = getCategoryInfo(catName);
          const Icon = info.icon;
          const { count, samplePhotos } = getCategoryStats(catName);

          // Asymmetric editorial rhythm for 7 categories: 2 (6-col) + 3 (4-col) + 2 (6-col)
          const isWide = index < 2 || index >= 5;
          const colSpanClass = isWide
            ? 'md:col-span-6 min-h-[420px] sm:min-h-[480px]'
            : 'md:col-span-4 min-h-[380px] sm:min-h-[440px]';

          return (
            <motion.div
              key={catName}
              onClick={() => onSelectCategory(catName)}
              className={`${colSpanClass} group relative rounded-3xl overflow-hidden bento-card border border-black/10 dark:border-white/10 hover:border-amber-400/50 active:scale-[0.985] active:translate-y-[1px] transition-all duration-300 cursor-pointer flex flex-col justify-between p-6 sm:p-8`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              {/* Background Photo with Smooth Ken-Burns Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                <img
                  src={samplePhotos.length > 0 ? samplePhotos[0].imageUrl : info.coverImage}
                  alt={info.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center brightness-[0.65] contrast-[1.05] group-hover:scale-105 group-hover:brightness-[0.75] transition-all duration-700 ease-out"
                />
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-black/40" />
              </div>

              {/* Top Bar: Icon Badge, Item Count, and Arrow Action */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:border-amber-400/60 transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {count} Karya
                  </span>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 group-hover:text-black group-hover:bg-amber-400 group-hover:border-amber-400 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Bottom Info: Title, Subtitle, Preview Mosaic, and Callout */}
              <div className="relative z-10 pt-16">
                {/* Category Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {info.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono tracking-wider uppercase text-amber-300/80 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-amber-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-white font-medium group-hover:text-amber-300 transition-colors">
                  {info.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 line-clamp-2 leading-relaxed">
                  {info.subtitle}
                </p>

                {/* Sample Photo Thumbnails Bar */}
                {samplePhotos.length > 0 && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                    <div className="flex -space-x-2 overflow-hidden">
                      {samplePhotos.map((sample) => (
                        <img
                          key={sample.id}
                          src={sample.imageUrl}
                          alt={sample.title}
                          loading="lazy"
                          decoding="async"
                          className="inline-block h-7 w-7 rounded-full ring-2 ring-[#050505] object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-light ml-1">
                      Koleksi arsip siap dieksplorasi
                    </span>
                  </div>
                )}

                {/* Action Link Button */}
                <div className="mt-5 pt-3 flex items-center gap-2 text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors">
                  <span>Masuk ke Ruang {info.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
