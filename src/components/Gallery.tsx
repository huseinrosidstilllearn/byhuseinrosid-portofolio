import React, { useState } from 'react';
import { Maximize2, MapPin, Grid } from 'lucide-react';
import { PHOTO_CATEGORIES, PORTFOLIO_PHOTOS } from '../data/portfolioData';
import type { PhotoItem } from '../types/portfolio';
import { LightboxModal } from './LightboxModal';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = selectedCategory === 'Semua'
    ? PORTFOLIO_PHOTOS
    : PORTFOLIO_PHOTOS.filter(p => p.category === selectedCategory);

  // Bento span rhythm generator
  const getBentoColSpan = (index: number) => {
    const cycle = index % 5;
    if (cycle === 0) return 'col-span-12 lg:col-span-8 min-h-[360px] sm:min-h-[440px]';
    if (cycle === 1) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[360px] sm:min-h-[440px]';
    if (cycle === 2) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[300px] sm:min-h-[360px]';
    if (cycle === 3) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[300px] sm:min-h-[360px]';
    return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[300px] sm:min-h-[360px]';
  };

  return (
    <section id="galeri" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
      {/* Bento Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
            <Grid className="w-3.5 h-3.5" />
            <span>Koleksi Eksibisi Bento</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-white font-medium">
            Galeri Rekaman Visual
          </h2>
        </div>

        {/* Interactive Category Filter Capsule */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0E1118]/80 border border-white/10 backdrop-blur-xl max-w-full overflow-x-auto no-scrollbar">
          {PHOTO_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Bento Grid Exhibition */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5">
        {filteredPhotos.map((photo, index) => {
          const spanClass = getBentoColSpan(index);

          return (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className={`${spanClass} bento-card relative overflow-hidden group cursor-pointer`}
            >
              {/* Image with zoom effect */}
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Ambient Top Shadow & Tags */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20 flex flex-col justify-between p-6 sm:p-7 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                    {photo.category}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-white font-medium group-hover:text-amber-300 transition-colors">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-light mt-1.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{photo.location}</span>
                    <span>&bull;</span>
                    <span>{photo.year}</span>
                  </div>
                </div>
              </div>
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
