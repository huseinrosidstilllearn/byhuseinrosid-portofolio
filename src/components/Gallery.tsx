import React, { useState } from 'react';
import { Maximize2, MapPin } from 'lucide-react';
import { PHOTO_CATEGORIES, PORTFOLIO_PHOTOS } from '../data/portfolioData';
import type { PhotoItem } from '../types/portfolio';
import { LightboxModal } from './LightboxModal';
import { TiltCard } from './TiltCard';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = selectedCategory === 'Semua'
    ? PORTFOLIO_PHOTOS
    : PORTFOLIO_PHOTOS.filter(p => p.category === selectedCategory);

  return (
    <section id="galeri" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-amber-400">
            Arsip Visual Museum
          </span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-5xl text-slate-900 dark:text-white font-medium">
          Galeri Pilihan
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light mt-3">
          Eksplorasi kumpulan bingkai cerita lintas genre dalam kedalaman 3D dan pencahayaan dinamis.
        </p>

        {/* Dynamic Category Filter Tabs */}
        <div className="flex items-center sm:justify-center gap-1.5 sm:gap-2 mt-8 p-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 backdrop-blur-md max-w-[95vw] overflow-x-auto no-scrollbar">
          {PHOTO_CATEGORIES.map(category => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-md font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Masonry Columns Grid with 3D TiltCards */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid">
            <TiltCard
              glowColor={photo.glowColor}
              maxTilt={10}
              onClick={() => setActivePhoto(photo)}
              className="group rounded-2xl overflow-hidden cursor-pointer bg-slate-200 dark:bg-[#111827] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image with smooth zoom micro-interaction */}
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle Gradient Info Overlay Reveal with 3D Z-Axis Elevation */}
              <div
                style={{ transform: 'translateZ(30px)' }}
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none"
              >
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      style={{
                        backgroundColor: `${photo.glowColor || '#f59e0b'}20`,
                        borderColor: `${photo.glowColor || '#f59e0b'}50`,
                        color: photo.glowColor || '#f59e0b',
                      }}
                      className="text-[10px] uppercase tracking-[0.2em] font-medium border px-2.5 py-0.5 rounded-full"
                    >
                      {photo.category}
                    </span>
                    <Maximize2 className="w-4 h-4 text-white/70" />
                  </div>
                  <h3 className="font-editorial text-lg sm:text-xl text-white font-medium">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1 font-light">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{photo.location}</span>
                    <span>&bull;</span>
                    <span>{photo.year}</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>

      {/* Lightbox Modal Component */}
      <LightboxModal
        photo={activePhoto}
        allPhotos={filteredPhotos}
        onClose={() => setActivePhoto(null)}
        onSelectPhoto={photo => setActivePhoto(photo)}
      />
    </section>
  );
};
