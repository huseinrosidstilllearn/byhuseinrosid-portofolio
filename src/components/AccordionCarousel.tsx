import React, { useState } from 'react';
import { MapPin, Maximize2 } from 'lucide-react';
import { PORTFOLIO_PHOTOS } from '../data/portfolioData';
import type { PhotoItem } from '../types/portfolio';

interface AccordionCarouselProps {
  photos?: PhotoItem[];
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const AccordionCarousel: React.FC<AccordionCarouselProps> = ({ photos = PORTFOLIO_PHOTOS, onSelectPhoto }) => {
  const activePhotos = photos.length > 0 ? photos : PORTFOLIO_PHOTOS;
  // Select featured photos, or first 5 photos
  const featured = activePhotos.filter((p) => p.featured);
  const featuredSet = (featured.length >= 3 ? featured : activePhotos).slice(0, 5);

  const [activeId, setActiveId] = useState<string>(featuredSet[0]?.id || '');

  const handleCardClick = (photo: PhotoItem) => {
    // Di perangkat sentuh (HP): ketukan pertama membuka panel, ketukan kedua membuka layar penuh
    if (activeId === photo.id) {
      onSelectPhoto(photo);
    } else {
      setActiveId(photo.id);
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 max-w-[1920px] mx-auto py-12" aria-label="Accordion Expanding Panels">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h3 className="font-editorial text-2xl sm:text-4xl text-white font-bold tracking-tight">
            Ruang & Bingkai Pilihan
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-light">
          Sentuh untuk memperluas bingkai &bull; Ketuk foto aktif untuk layar penuh
        </span>
      </div>

      {/* Expanding Accordion Row */}
      <ul className="list-none flex gap-2 sm:gap-4 w-full h-[380px] sm:h-[480px] lg:h-[560px] 2xl:h-[640px] m-0 p-0">
        {featuredSet.map((photo) => {
          const isActive = photo.id === activeId;
          return (
            <li
              key={photo.id}
              onClick={() => handleCardClick(photo)}
              onMouseEnter={() => setActiveId(photo.id)}
              className={`group basis-0 min-w-0 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:hover:grow-[5] motion-reduce:transition-none cursor-pointer ${
                isActive ? 'grow-[5]' : 'grow-1'
              }`}
            >
              <div className={`relative block h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#12151E] border transition-all duration-300 shadow-lg ${
                isActive ? 'border-amber-400/60 ring-1 ring-amber-400/30' : 'border-white/10 sm:group-hover:border-amber-400/50'
              }`}>
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className={`size-full object-cover block contrast-[1.05] transition-[filter,transform] duration-500 sm:group-hover:brightness-100 sm:group-hover:scale-105 ${
                    isActive ? 'brightness-100 scale-102' : 'brightness-[0.65]'
                  }`}
                />

                {/* Collapsed Vertical Category Label */}
                <div className={`absolute top-4 left-3 sm:left-4 transition-opacity duration-300 pointer-events-none sm:group-hover:opacity-0 ${
                  isActive ? 'opacity-0' : 'opacity-100'
                }`}>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/70 [writing-mode:vertical-lr] rotate-180">
                    {photo.category}
                  </span>
                </div>

                {/* Expanded Bottom Overlay Details */}
                <div className={`absolute inset-x-0 bottom-0 p-4 sm:p-7 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-[opacity,transform] duration-400 flex flex-col justify-end sm:group-hover:opacity-100 sm:group-hover:translate-y-0 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-amber-300">
                      {photo.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-slate-300 bg-black/60 px-2 sm:px-2.5 py-1 rounded-md border border-white/15">
                      <Maximize2 className="w-3 h-3 text-amber-400" />
                      <span className="hidden sm:inline">Buka Arsip</span>
                      <span className="sm:hidden">Layar Penuh</span>
                    </span>
                  </div>

                  <h4 className="font-editorial text-base sm:text-2xl text-white font-medium leading-snug line-clamp-1 sm:line-clamp-none">
                    {photo.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300 font-light mt-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span className="truncate">{photo.location}</span>
                    <span>&bull;</span>
                    <span>{photo.year}</span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
