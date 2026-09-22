import React from 'react';
import { Layers, MapPin } from 'lucide-react';
import { PORTFOLIO_PHOTOS } from '../data/portfolioData';
import type { PhotoItem } from '../types/portfolio';

interface AccordionCarouselProps {
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const AccordionCarousel: React.FC<AccordionCarouselProps> = ({ onSelectPhoto }) => {
  // Select first 5 featured photos
  const featuredSet = PORTFOLIO_PHOTOS.slice(0, 5);

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12" aria-label="Accordion Expanding Panels">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Sorotan Kuratorial</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl text-white font-medium">
            Ruang & Bingkai Pilihan
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-light">
          Arahkan kursor atau sentuh untuk memperluas bingkai
        </span>
      </div>

      {/* Expanding Accordion Row */}
      <ul className="list-none flex gap-2.5 sm:gap-4 w-full h-[420px] sm:h-[480px] lg:h-[540px] m-0 p-0">
        {featuredSet.map((photo) => (
          <li
            key={photo.id}
            onClick={() => onSelectPhoto(photo)}
            className="group grow basis-0 min-w-0 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:grow-[4] sm:hover:grow-[5] focus-within:grow-[4] sm:focus-within:grow-[5] motion-reduce:transition-none cursor-pointer"
          >
            <div className="relative block h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#12151E] border border-white/10 group-hover:border-amber-400/50 shadow-lg">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="size-full object-cover block brightness-[0.75] contrast-[1.05] transition-[filter,transform] duration-500 group-hover:brightness-100 group-hover:scale-105"
              />

              {/* Collapsed Vertical Category Label */}
              <div className="absolute top-4 left-4 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 [writing-mode:vertical-lr] rotate-180">
                  {photo.category}
                </span>
              </div>

              {/* Expanded Bottom Overlay Details */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 translate-y-3 transition-[opacity,transform] duration-400 delay-100 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none flex flex-col justify-end">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] uppercase font-bold tracking-wider text-amber-300">
                    {photo.category}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 bg-black/50 px-2.5 py-1 rounded-md border border-white/10">
                    Buka Arsip
                  </span>
                </div>

                <h4 className="font-editorial text-xl sm:text-2xl text-white font-medium leading-snug">
                  {photo.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-light mt-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{photo.location}</span>
                  <span>&bull;</span>
                  <span>{photo.year}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
