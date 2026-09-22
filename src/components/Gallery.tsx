import React, { useState, useRef } from 'react';
import { MapPin, Grid, Film, ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import { PHOTO_CATEGORIES, PORTFOLIO_PHOTOS } from '../data/portfolioData';
import type { PhotoItem } from '../types/portfolio';
import { LightboxModal } from './LightboxModal';

interface GalleryProps {
  photos?: PhotoItem[];
  onSelectPhoto?: (photo: PhotoItem) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ photos = PORTFOLIO_PHOTOS, onSelectPhoto }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [galleryMode, setGalleryMode] = useState<'matrix' | 'filmstrip'>('matrix');
  const filmstripRef = useRef<HTMLDivElement>(null);

  const activePhotoSet = photos.length > 0 ? photos : PORTFOLIO_PHOTOS;

  const handlePhotoClick = (photo: PhotoItem) => {
    if (onSelectPhoto) {
      onSelectPhoto(photo);
    } else {
      setActivePhoto(photo);
    }
  };

  const filteredPhotos = selectedCategory === 'Semua'
    ? activePhotoSet
    : activePhotoSet.filter(p => p.category === selectedCategory);

  // Bento span rhythm generator
  const getBentoColSpan = (index: number) => {
    const cycle = index % 5;
    if (cycle === 0) return 'col-span-12 lg:col-span-8 min-h-[360px] sm:min-h-[440px]';
    if (cycle === 1) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[360px] sm:min-h-[440px]';
    if (cycle === 2) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[300px] sm:min-h-[360px]';
    if (cycle === 3) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[300px] sm:min-h-[360px]';
    return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[300px] sm:min-h-[360px]';
  };

  const handleScrollFilmstrip = (direction: 'left' | 'right') => {
    if (!filmstripRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    filmstripRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="galeri" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
      {/* Bento Gallery Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
            <Grid className="w-3.5 h-3.5" />
            <span>Koleksi Eksibisi Foto</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-white font-medium">
            Galeri Rekaman Visual
          </h2>
        </div>

        {/* Action Controls: Layout Mode Switcher & Category Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* iOS Style Segmented Control with Sliding Thumb */}
          <div className="relative flex items-center p-1 rounded-full bg-[#0E1118]/80 border border-white/10 backdrop-blur-xl w-60 sm:w-64 h-10 select-none">
            {/* Sliding Thumb Indicator */}
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-amber-500 rounded-full shadow-[0_2px_10px_rgba(245,158,11,0.3)] transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-none ${
                galleryMode === 'matrix' ? 'translate-x-0' : 'translate-x-full'
              }`}
            />
            <button
              onClick={() => setGalleryMode('matrix')}
              className={`relative z-10 w-1/2 h-full flex items-center justify-center gap-1.5 rounded-full text-xs tracking-wider transition-colors duration-200 cursor-pointer ${
                galleryMode === 'matrix' ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-white font-medium'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Bento Matrix</span>
            </button>
            <button
              onClick={() => setGalleryMode('filmstrip')}
              className={`relative z-10 w-1/2 h-full flex items-center justify-center gap-1.5 rounded-full text-xs tracking-wider transition-colors duration-200 cursor-pointer ${
                galleryMode === 'filmstrip' ? 'text-slate-950 font-bold' : 'text-slate-400 hover:text-white font-medium'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Rol Film Bebas</span>
            </button>
          </div>

          {/* Interactive Category Filter Capsule */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0E1118]/80 border border-white/10 backdrop-blur-xl overflow-x-auto no-scrollbar max-w-full">
            {PHOTO_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white/15 text-amber-300 font-bold border border-amber-400/40'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODE 1: Asymmetric Bento Grid Exhibition */}
      {galleryMode === 'matrix' ? (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 animate-in fade-in duration-300">
          {filteredPhotos.map((photo, index) => {
            const spanClass = getBentoColSpan(index);

            return (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className={`${spanClass} bento-card relative overflow-hidden group cursor-pointer`}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20 flex flex-col justify-between p-6 sm:p-7 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      {photo.category}
                    </span>

                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-2.5 py-1 rounded-md border border-white/10">
                      Lihat Karya
                    </span>
                  </div>

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
      ) : (
        /* MODE 2: Rol Film Bebas (Horizontal Free Draggable Stream) */
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Controls & Gesture Hint */}
          <div className="flex items-center justify-between px-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-amber-300">
              <MoveHorizontal className="w-4 h-4" />
              <span>Scroll atau geser bebas ke samping</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScrollFilmstrip('left')}
                className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Geser ke kiri"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollFilmstrip('right')}
                className="w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Geser ke kanan"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontally Scrollable / Draggable Rail */}
          <div
            ref={filmstripRef}
            className="flex items-stretch gap-5 overflow-x-auto pb-6 pt-2 no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className="snap-start shrink-0 w-[300px] sm:w-[380px] lg:w-[440px] h-[480px] sm:h-[540px] bento-card relative overflow-hidden group cursor-pointer"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20 flex flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      {photo.category}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-2.5 py-1 rounded-md border border-white/10">
                      Lihat Karya
                    </span>
                  </div>

                  <div>
                    <h3 className="font-editorial text-2xl text-white font-medium group-hover:text-amber-300 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-light mt-1 line-clamp-2">
                      {photo.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-light mt-3 pt-3 border-t border-white/10">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{photo.location}</span>
                      <span>&bull;</span>
                      <span>{photo.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal (fallback if not handled by parent) */}
      {!onSelectPhoto && (
        <LightboxModal
          photo={activePhoto}
          allPhotos={filteredPhotos}
          onClose={() => setActivePhoto(null)}
          onSelectPhoto={p => setActivePhoto(p)}
        />
      )}
    </section>
  );
};
