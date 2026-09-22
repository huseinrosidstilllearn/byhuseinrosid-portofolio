import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Grid,
  Film,
  LayoutGrid,
  Columns3,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  Maximize2,
  Calendar,
  Compass,
} from 'lucide-react';
import { PHOTO_CATEGORIES, PORTFOLIO_PHOTOS } from '../data/portfolioData';
import type { PhotoItem } from '../types/portfolio';
import { LightboxModal } from './LightboxModal';

interface GalleryProps {
  photos?: PhotoItem[];
  onSelectPhoto?: (photo: PhotoItem) => void;
}

export type GalleryLayoutMode = 'matrix' | 'filmstrip' | 'grid' | 'masonry' | 'spotlight';

interface ModeOption {
  id: GalleryLayoutMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const GALLERY_MODES: ModeOption[] = [
  { id: 'matrix', label: 'Bento Matrix', icon: Grid, description: 'Komposisi asimetris ritmik' },
  { id: 'grid', label: 'Grid Seragam', icon: Columns3, description: 'Tata letak 3-kolom presisi' },
  { id: 'masonry', label: 'Masonry Bebas', icon: Layers, description: 'Proporsi alami tanpa crop' },
  { id: 'spotlight', label: 'Sorotan Tunggal', icon: Sparkles, description: 'Pameran panggung sinematik' },
  { id: 'filmstrip', label: 'Rol Film', icon: Film, description: 'Gulir horizontal tanpa batas' },
];

export const Gallery: React.FC<GalleryProps> = ({ photos = PORTFOLIO_PHOTOS, onSelectPhoto }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [galleryMode, setGalleryMode] = useState<GalleryLayoutMode>('matrix');
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const spotlightThumbRef = useRef<HTMLDivElement>(null);

  const activePhotoSet = photos.length > 0 ? photos : PORTFOLIO_PHOTOS;

  const handlePhotoClick = (photo: PhotoItem) => {
    if (onSelectPhoto) {
      onSelectPhoto(photo);
    } else {
      setActivePhoto(photo);
    }
  };

  // Filter list foto berdasarkan kategori
  const filteredPhotos = activePhotoSet.filter((p) => {
    if (selectedCategory === 'Semua') return true;
    if (selectedCategory === 'Unggulan') return p.featured;
    return p.category === selectedCategory;
  });

  // Reset spotlight index jika filter berubah dan index di luar jangkauan
  useEffect(() => {
    if (spotlightIndex >= filteredPhotos.length) {
      setSpotlightIndex(0);
    }
  }, [filteredPhotos.length, spotlightIndex]);

  // Hitung jumlah karya per kategori
  const getCategoryCount = (category: string) => {
    if (category === 'Semua') return activePhotoSet.length;
    if (category === 'Unggulan') return activePhotoSet.filter((p) => p.featured).length;
    return activePhotoSet.filter((p) => p.category === category).length;
  };

  const categoriesWithFeatured = [...PHOTO_CATEGORIES, 'Unggulan'];

  // Bento span rhythm generator
  const getBentoColSpan = (index: number) => {
    const cycle = index % 5;
    if (cycle === 0) return 'col-span-12 lg:col-span-8 min-h-[380px] sm:min-h-[460px] 2xl:min-h-[540px]';
    if (cycle === 1) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[380px] sm:min-h-[460px] 2xl:min-h-[540px]';
    if (cycle === 2) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[320px] sm:min-h-[380px] 2xl:min-h-[440px]';
    if (cycle === 3) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[320px] sm:min-h-[380px] 2xl:min-h-[440px]';
    return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[320px] sm:min-h-[380px] 2xl:min-h-[440px]';
  };

  const handleScrollFilmstrip = (direction: 'left' | 'right') => {
    if (!filmstripRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    filmstripRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleNextSpotlight = () => {
    if (filteredPhotos.length === 0) return;
    setSpotlightIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrevSpotlight = () => {
    if (filteredPhotos.length === 0) return;
    setSpotlightIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const currentSpotlightPhoto = filteredPhotos[spotlightIndex] || filteredPhotos[0] || null;

  return (
    <section id="galeri" className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 max-w-[1920px] mx-auto scroll-mt-28">
      {/* Gallery Header & Controls */}
      <div className="flex flex-col gap-6 mb-8 pb-6 border-b border-white/[0.08]">
        {/* Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Arsip Eksibisi Visual</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl text-white font-medium">
              Galeri Rekaman Visual
            </h2>
          </div>

          {/* Active Mode Description Badge */}
          <div className="text-xs text-slate-400 hidden sm:flex items-center gap-2 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10 w-fit">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Mode Aktif:</span>
            <strong className="text-white font-medium">
              {GALLERY_MODES.find((m) => m.id === galleryMode)?.label}
            </strong>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-400">
              {GALLERY_MODES.find((m) => m.id === galleryMode)?.description}
            </span>
          </div>
        </div>

        {/* Action Controls: 5-Layout Mode Switcher & Category Filters */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* 5-Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#0E1118]/85 border border-white/10 backdrop-blur-xl overflow-x-auto no-scrollbar shadow-lg">
            {GALLERY_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = galleryMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setGalleryMode(mode.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_2px_12px_rgba(245,158,11,0.35)] scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                  title={mode.description}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Category Filter Pills with Item Counts */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0E1118]/85 border border-white/10 backdrop-blur-xl overflow-x-auto no-scrollbar shadow-lg">
            {categoriesWithFeatured.map((category) => {
              const count = getCategoryCount(category);
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white/15 text-amber-300 font-bold border border-amber-400/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredPhotos.length === 0 && (
        <div className="py-20 text-center bento-card p-12 rounded-3xl border border-white/10">
          <p className="font-editorial text-2xl text-white">Tidak ada foto dalam kategori ini</p>
          <p className="text-xs text-slate-400 mt-2">
            Silakan pilih kategori lain atau lihat koleksi lengkap.
          </p>
          <button
            onClick={() => setSelectedCategory('Semua')}
            className="mt-6 px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
          >
            Lihat Semua Foto
          </button>
        </div>
      )}

      {/* MODE 1: Asymmetric Bento Grid */}
      {galleryMode === 'matrix' && filteredPhotos.length > 0 && (
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
                      Buka Eksibisi
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
      )}

      {/* MODE 2: Grid Seragam (3-Column / 4-Column Symmetrical Precision) */}
      {galleryMode === 'grid' && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6 animate-in fade-in duration-300">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => handlePhotoClick(photo)}
              className="bento-card overflow-hidden group cursor-pointer border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/50">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                    {photo.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-amber-400">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between bg-[#0E1118]/80">
                <div>
                  <h3 className="font-editorial text-xl text-white font-medium group-hover:text-amber-300 transition-colors line-clamp-1">
                    {photo.title}
                  </h3>
                  {photo.description && (
                    <p className="text-xs text-slate-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                      {photo.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 font-light pt-3 mt-4 border-t border-white/[0.08]">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 font-mono text-[11px] text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-600" />
                    <span>{photo.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODE 3: Masonry Dinamis (Natural Vertical Aspect Ratios) */}
      {galleryMode === 'masonry' && filteredPhotos.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-5 space-y-5 animate-in fade-in duration-300">
          {filteredPhotos.map((photo) => {
            const isTall = photo.aspectRatio === 'portrait';
            return (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className="break-inside-avoid bento-card relative overflow-hidden group cursor-pointer border border-white/10 hover:border-amber-400/40 transition-all duration-300"
              >
                <div className={`relative overflow-hidden ${isTall ? 'min-h-[400px] 2xl:min-h-[480px]' : 'min-h-[280px] 2xl:min-h-[340px]'}`}>
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                        {photo.category}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                        {photo.aspectRatio}
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
              </div>
            );
          })}
        </div>
      )}

      {/* MODE 4: Sorotan Tunggal (Cinematic Spotlight Centerpiece) */}
      {galleryMode === 'spotlight' && currentSpotlightPhoto && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Centerpiece Cinema Stage */}
          <div className="bento-card relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl min-h-[520px] sm:min-h-[640px] lg:min-h-[740px] 2xl:min-h-[820px] flex flex-col justify-between">
            {/* Background Image */}
            <img
              src={currentSpotlightPhoto.imageUrl}
              alt={currentSpotlightPhoto.title}
              className="w-full h-full object-cover object-center absolute inset-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />

            {/* Top Bar HUD */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-md">
                  {currentSpotlightPhoto.category}
                </span>
                <span className="text-xs font-mono text-slate-300 bg-black/60 px-3 py-1 rounded-full border border-white/15">
                  Frame {spotlightIndex + 1} dari {filteredPhotos.length}
                </span>
              </div>

              <button
                onClick={() => handlePhotoClick(currentSpotlightPhoto)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Perbesar Layar Penuh</span>
              </button>
            </div>

            {/* Prev / Next Stage Arrows */}
            <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between pointer-events-none z-10">
              <button
                onClick={handlePrevSpotlight}
                className="w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white hover:text-amber-400 backdrop-blur-md transition-all pointer-events-auto cursor-pointer shadow-xl hover:scale-110"
                aria-label="Karya sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextSpotlight}
                className="w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white hover:text-amber-400 backdrop-blur-md transition-all pointer-events-auto cursor-pointer shadow-xl hover:scale-110"
                aria-label="Karya berikutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Details HUD */}
            <div className="relative z-10 p-6 sm:p-8 max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-widest uppercase mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Eksibisi Unggulan</span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-5xl text-white font-medium leading-tight mb-3">
                {currentSpotlightPhoto.title}
              </h3>
              {currentSpotlightPhoto.description && (
                <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-4 max-w-2xl">
                  {currentSpotlightPhoto.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-light">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{currentSpotlightPhoto.location}</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Tahun {currentSpotlightPhoto.year}</span>
                </div>
                <span>&bull;</span>
                <span className="uppercase font-mono text-slate-400">
                  Format {currentSpotlightPhoto.aspectRatio}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Thumbnail Carousel Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <span>Pilih karya untuk ditampilkan di panggung:</span>
              <span className="text-amber-400 font-mono">
                {spotlightIndex + 1} / {filteredPhotos.length}
              </span>
            </div>
            <div
              ref={spotlightThumbRef}
              className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar"
            >
              {filteredPhotos.map((photo, idx) => {
                const isSelected = idx === spotlightIndex;
                return (
                  <button
                    key={photo.id}
                    onClick={() => setSpotlightIndex(idx)}
                    className={`shrink-0 relative w-24 sm:w-28 h-16 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black scale-105 opacity-100'
                        : 'opacity-50 hover:opacity-85'
                    }`}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODE 5: Rol Film Bebas (Horizontal Filmstrip Stream) */}
      {galleryMode === 'filmstrip' && filteredPhotos.length > 0 && (
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

          {/* Horizontally Scrollable Rail */}
          <div
            ref={filmstripRef}
            className="flex items-stretch gap-5 overflow-x-auto pb-6 pt-2 no-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className="snap-start shrink-0 w-[300px] sm:w-[380px] lg:w-[440px] 2xl:w-[520px] h-[480px] sm:h-[540px] 2xl:h-[620px] bento-card relative overflow-hidden group cursor-pointer"
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
                      Buka Eksibisi
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
          onSelectPhoto={(p) => setActivePhoto(p)}
        />
      )}
    </section>
  );
};
