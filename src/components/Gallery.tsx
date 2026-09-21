import React, { useState } from 'react';
import { PHOTO_CATEGORIES, PORTFOLIO_PHOTOS } from '../data/portfolioData';
import type { PhotoItem } from '../types/portfolio';
import { LightboxModal } from './LightboxModal';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = selectedCategory === 'Semua'
    ? PORTFOLIO_PHOTOS
    : PORTFOLIO_PHOTOS.filter(p => p.category === selectedCategory);

  return (
    <section id="galeri" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#1A1A1A]/10 dark:border-white/10 mb-14">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] font-semibold block mb-3">
            01 &bull; Arsip Visual
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal tracking-tight">
            Koleksi Bingkai Pilihan
          </h2>
        </div>

        <p className="max-w-md text-sm sm:text-base text-[#1A1A1A]/70 dark:text-[#F3EFEA]/70 font-light leading-relaxed">
          Setiap frame adalah jeda hening yang merekam interaksi antara manusia, bayang, dan semesta tanpa kepura-puraan.
        </p>
      </div>

      {/* Clean Text-Only Category Filter */}
      <div className="flex items-center gap-4 sm:gap-6 flex-wrap pb-12 text-xs uppercase tracking-[0.2em] font-medium border-b border-[#1A1A1A]/5 dark:border-white/5 mb-16">
        {PHOTO_CATEGORIES.map((category, idx) => {
          const isActive = selectedCategory === category;
          return (
            <React.Fragment key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#8B7355] font-semibold underline underline-offset-8 decoration-1'
                    : 'text-[#8A857D] hover:text-[#1A1A1A] dark:hover:text-[#F3EFEA]'
                }`}
              >
                {category}
              </button>
              {idx < PHOTO_CATEGORIES.length - 1 && (
                <span className="text-[#8A857D]/40 font-light select-none">/</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Editorial Magazine Photo Layout */}
      <div className="space-y-20 sm:space-y-28 lg:space-y-36">
        {filteredPhotos.reduce<PhotoItem[][]>((rows, photo, index) => {
          // Cadence: 1 full-width, then 2 side-by-side, then 1 wide...
          if (index % 3 === 0) {
            rows.push([photo]);
          } else if (index % 3 === 1) {
            rows.push([photo]);
          } else {
            // Pair with previous if available
            const lastRow = rows[rows.length - 1];
            if (lastRow && lastRow.length === 1) {
              lastRow.push(photo);
            } else {
              rows.push([photo]);
            }
          }
          return rows;
        }, []).map((row, rowIndex) => {
          const isSingle = row.length === 1;

          if (isSingle) {
            const photo = row[0];
            return (
              <div key={photo.id} className="group cursor-pointer" onClick={() => setActivePhoto(photo)}>
                <div className="overflow-hidden bg-[#F3EFEA] dark:bg-[#16181F] max-h-[78vh] flex items-center justify-center">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover max-h-[78vh] transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                  />
                </div>
                {/* Editorial Caption Under Image */}
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-t border-[#1A1A1A]/10 dark:border-white/10 pt-3">
                  <div>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal group-hover:text-[#8B7355] transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-[#8A857D] font-light mt-0.5">
                      {photo.description}
                    </p>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#8A857D] font-medium whitespace-nowrap">
                    <span>{photo.category}</span> &bull; <span>{photo.location}</span> &bull; <span>{photo.year}</span>
                  </div>
                </div>
              </div>
            );
          }

          // Two photos side-by-side spread
          return (
            <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20">
              {row.map((photo, pIdx) => (
                <div
                  key={photo.id}
                  className={`group cursor-pointer ${pIdx === 1 ? 'md:mt-12 lg:mt-16' : ''}`}
                  onClick={() => setActivePhoto(photo)}
                >
                  <div className="overflow-hidden bg-[#F3EFEA] dark:bg-[#16181F] aspect-[4/5] flex items-center justify-center">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  {/* Editorial Caption Under Image */}
                  <div className="mt-4 sm:mt-5 border-t border-[#1A1A1A]/10 dark:border-white/10 pt-3 flex flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-editorial text-lg sm:text-xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal group-hover:text-[#8B7355] transition-colors">
                        {photo.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest text-[#8A857D] font-medium">
                        {photo.year}
                      </span>
                    </div>
                    <div className="text-xs text-[#8A857D] font-light flex items-center gap-2">
                      <span>{photo.category}</span>
                      <span>&bull;</span>
                      <span>{photo.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        photo={activePhoto}
        allPhotos={filteredPhotos}
        onClose={() => setActivePhoto(null)}
        onSelectPhoto={p => setActivePhoto(p)}
      />
    </section>
  );
};
