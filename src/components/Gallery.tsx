import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  MapPin,
  Grid,
  Film,
  Columns3,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
  Maximize2,
  Calendar,
  Compass,
  ArrowUpRight,
  Search,
  X,
  ArrowDown,
} from 'lucide-react';
import { PHOTO_CATEGORIES, PORTFOLIO_PHOTOS } from '../data/portfolioData';
import type { PhotoItem } from '../types/portfolio';
import { LightboxModal } from './LightboxModal';

interface GalleryProps {
  photos?: PhotoItem[];
  onSelectPhoto?: (photo: PhotoItem) => void;
  onSelectCategory?: (categoryName: string) => void;
}

export type GalleryLayoutMode = 'matrix' | 'filmstrip' | 'grid' | 'masonry' | 'spotlight';

interface ModeOption {
  id: GalleryLayoutMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const GALLERY_MODES: ModeOption[] = [
  { id: 'matrix', label: 'Bento', icon: Grid, description: 'Komposisi asimetris ritmik' },
  { id: 'grid', label: 'Grid', icon: Columns3, description: 'Tata letak presisi multi-kolom' },
  { id: 'masonry', label: 'Masonry', icon: Layers, description: 'Proporsi alami tanpa crop' },
  { id: 'spotlight', label: 'Spotlight', icon: Sparkles, description: 'Pameran panggung sinematik' },
  { id: 'filmstrip', label: 'Filmstrip', icon: Film, description: 'Gulir horizontal sinematik' },
];

const INITIAL_PAGE_SIZE = 24;
const LOAD_INCREMENT = 18;

export const Gallery: React.FC<GalleryProps> = ({
  photos = PORTFOLIO_PHOTOS,
  onSelectPhoto,
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [galleryMode, setGalleryMode] = useState<GalleryLayoutMode>('matrix');
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE);

  const filmstripRef = useRef<HTMLDivElement>(null);
  const spotlightThumbRef = useRef<HTMLDivElement>(null);
  const loadMoreSentinelRef = useRef<HTMLDivElement>(null);

  const activePhotoSet = photos.length > 0 ? photos : PORTFOLIO_PHOTOS;

  const handlePhotoClick = (photo: PhotoItem) => {
    if (onSelectPhoto) {
      onSelectPhoto(photo);
    } else {
      setActivePhoto(photo);
    }
  };

  // Filter foto berdasarkan kategori dan kata kunci pencarian
  const filteredPhotos = useMemo(() => {
    return activePhotoSet.filter((p) => {
      // 1. Filter Kategori
      if (selectedCategory === 'Unggulan' && !p.featured) return false;
      if (
        selectedCategory !== 'Semua' &&
        selectedCategory !== 'Unggulan' &&
        p.category !== selectedCategory
      ) {
        return false;
      }

      // 2. Filter Pencarian Cepat
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchLocation = p.location.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchYear = p.year.includes(q);
        const matchDesc = p.description ? p.description.toLowerCase().includes(q) : false;

        if (!matchTitle && !matchLocation && !matchCategory && !matchYear && !matchDesc) {
          return false;
        }
      }

      return true;
    });
  }, [activePhotoSet, selectedCategory, searchQuery]);

  // Reset batas rendering bertahap saat kategori, pencarian, atau mode berganti
  useEffect(() => {
    setVisibleCount(INITIAL_PAGE_SIZE);
  }, [selectedCategory, searchQuery, galleryMode]);

  // Reset spotlight index jika data foto berubah
  useEffect(() => {
    if (spotlightIndex >= filteredPhotos.length) {
      setSpotlightIndex(0);
    }
  }, [filteredPhotos.length, spotlightIndex]);

  // IntersectionObserver untuk auto load-more saat pengguna scroll mendekati batas bawah galeri
  useEffect(() => {
    const sentinel = loadMoreSentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < filteredPhotos.length) {
          setVisibleCount((prev) => Math.min(prev + LOAD_INCREMENT, filteredPhotos.length));
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, filteredPhotos.length]);

  // Hitung jumlah karya per kategori (tanpa dipengaruhi query pencarian)
  const getCategoryCount = (category: string) => {
    if (category === 'Semua') return activePhotoSet.length;
    if (category === 'Unggulan') return activePhotoSet.filter((p) => p.featured).length;
    return activePhotoSet.filter((p) => p.category === category).length;
  };

  // Potong foto yang dirender agar DOM tetap ringan dan cepat (60-120 FPS di ponsel dan laptop)
  const renderedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleCount);
  }, [filteredPhotos, visibleCount]);

  // Bento span rhythm generator
  const getBentoColSpan = (index: number) => {
    const cycle = index % 5;
    if (cycle === 0) return 'col-span-12 lg:col-span-8 min-h-[260px] sm:min-h-[460px] 2xl:min-h-[540px]';
    if (cycle === 1) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[260px] sm:min-h-[460px] 2xl:min-h-[540px]';
    if (cycle === 2) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[220px] sm:min-h-[380px] 2xl:min-h-[440px]';
    if (cycle === 3) return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[220px] sm:min-h-[380px] 2xl:min-h-[440px]';
    return 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[220px] sm:min-h-[380px] 2xl:min-h-[440px]';
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
    <section id="galeri" className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 max-w-[1920px] mx-auto scroll-mt-24 sm:scroll-mt-28">
      {/* Gallery Header & Controls */}
      <div className="flex flex-col gap-5 sm:gap-6 mb-8 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
        {/* Title, Subtitle, & Quick Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white font-bold tracking-tight">
              Showcase Utama
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light mt-2 max-w-md">
              Koleksi kurasi lintas genre yang mewakili karakter, atmosfer, dan visi visual Husein Rosid.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari lokasi, acara, tahun (misal: Surabaya)..."
              className="w-full pl-9 pr-9 py-2 rounded-2xl bg-white/85 dark:bg-[#0E1118]/85 border border-black/10 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-amber-400/50 backdrop-blur-xl transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 cursor-pointer"
                aria-label="Bersihkan pencarian"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action Controls: 5-Layout Mode Switcher & Category Filters */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
          {/* 5-Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/85 dark:bg-[#0E1118]/85 border border-black/10 dark:border-white/10 backdrop-blur-xl overflow-x-auto no-scrollbar shadow-sm touch-pan-x overscroll-x-contain">
            {GALLERY_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = galleryMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setGalleryMode(mode.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-medium tracking-wider whitespace-nowrap active:scale-[0.98] transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_2px_12px_rgba(245,158,11,0.35)] scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                  }`}
                  title={mode.description}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Category Filter Pills & Direct Category Navigation */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/85 dark:bg-[#0E1118]/85 border border-black/10 dark:border-white/10 backdrop-blur-xl overflow-x-auto no-scrollbar shadow-sm touch-pan-x overscroll-x-contain">
            {(['Semua', 'Unggulan'] as const).map((filter) => {
              const count = getCategoryCount(filter);
              const isActive = selectedCategory === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedCategory(filter)}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-amber-500/15 dark:bg-white/15 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30 dark:border-amber-400/40 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{filter}</span>
                  <span
                    className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            <span className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1 hidden sm:block shrink-0" />

            {PHOTO_CATEGORIES.filter((c) => c !== 'Semua').map((category) => {
              const count = getCategoryCount(category);
              return (
                <button
                  key={category}
                  onClick={() => {
                    if (onSelectCategory) {
                      onSelectCategory(category);
                    } else {
                      setSelectedCategory(category);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 group"
                  title={`Buka Ruang Kategori ${category}`}
                >
                  <span>{category}</span>
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-400 group-hover:bg-amber-500/20 group-hover:text-amber-600 dark:group-hover:text-amber-300">
                    {count}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-amber-500 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredPhotos.length === 0 && (
        <div className="py-20 text-center bento-card p-12 rounded-3xl border border-black/10 dark:border-white/10">
          <p className="font-editorial text-2xl text-slate-900 dark:text-white">Tidak ada karya visual yang ditemukan</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            {searchQuery
              ? `Tidak ada karya yang cocok dengan kata kunci "${searchQuery}". Coba kata kunci lain atau bersihkan pencarian.`
              : 'Silakan pilih kategori lain atau lihat koleksi lengkap.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Semua');
              setSearchQuery('');
            }}
            className="mt-6 px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 transition-all"
          >
            Lihat Semua Foto
          </button>
        </div>
      )}

      {/* MODE 1: Asymmetric Bento Grid (Progressive Rendered Set) */}
      {galleryMode === 'matrix' && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 animate-in fade-in duration-300">
          {renderedPhotos.map((photo, index) => {
            const spanClass = getBentoColSpan(index);
            return (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className={`${spanClass} bento-card relative overflow-hidden group cursor-pointer skeleton-shimmer`}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  onLoad={(e) => {
                    e.currentTarget.classList.remove('opacity-0');
                    e.currentTarget.parentElement?.classList.remove('skeleton-shimmer');
                  }}
                  ref={(el) => {
                    if (el && el.complete && el.naturalWidth > 0) {
                      el.classList.remove('opacity-0');
                      el.parentElement?.classList.remove('skeleton-shimmer');
                    }
                  }}
                  className="w-full h-full object-cover object-center absolute inset-0 transition-all duration-700 ease-out group-hover:scale-105 opacity-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20 flex flex-col justify-between p-6 sm:p-7 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        if (onSelectCategory) {
                          e.stopPropagation();
                          onSelectCategory(photo.category);
                        }
                      }}
                      className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold uppercase tracking-wider text-amber-400 hover:bg-amber-500 hover:text-black hover:border-amber-400 transition-all cursor-pointer"
                      title={`Buka Ruang Kategori ${photo.category}`}
                    >
                      {photo.category} &rarr;
                    </button>

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

      {/* MODE 2: Grid Seragam (Progressive Rendered Set) */}
      {galleryMode === 'grid' && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-6 animate-in fade-in duration-300">
          {renderedPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => handlePhotoClick(photo)}
              className="bento-card overflow-hidden group cursor-pointer border border-black/10 dark:border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-[#0E1118] skeleton-shimmer">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  onLoad={(e) => {
                    e.currentTarget.classList.remove('opacity-0');
                    e.currentTarget.parentElement?.classList.remove('skeleton-shimmer');
                  }}
                  ref={(el) => {
                    if (el && el.complete && el.naturalWidth > 0) {
                      el.classList.remove('opacity-0');
                      el.parentElement?.classList.remove('skeleton-shimmer');
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out opacity-0"
                />
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      if (onSelectCategory) {
                        e.stopPropagation();
                        onSelectCategory(photo.category);
                      }
                    }}
                    className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-amber-400 hover:bg-amber-500 hover:text-black hover:border-amber-400 transition-all cursor-pointer flex items-center gap-1"
                    title={`Buka Ruang Kategori ${photo.category}`}
                  >
                    <span className="truncate max-w-[70px] sm:max-w-none">{photo.category}</span>
                    <ArrowUpRight className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                  </button>
                </div>
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                  <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-amber-400">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between bg-white/90 dark:bg-[#0E1118]/80">
                <div>
                  <h3 className="font-editorial text-sm sm:text-xl text-slate-900 dark:text-white font-medium group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors line-clamp-1">
                    {photo.title}
                  </h3>
                  {photo.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-light mt-1.5 line-clamp-2 leading-relaxed hidden sm:block">
                      {photo.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-light pt-2 sm:pt-3 mt-2 sm:mt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
                  <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 dark:text-amber-400 shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 font-mono text-[9px] sm:text-[11px] text-slate-500">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400 dark:text-slate-600" />
                    <span>{photo.year}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODE 3: Masonry Dinamis (Progressive Rendered Set) */}
      {galleryMode === 'masonry' && filteredPhotos.length > 0 && (
        <div className="columns-2 sm:columns-2 lg:columns-3 2xl:columns-4 gap-3 sm:gap-5 space-y-3 sm:space-y-5 animate-in fade-in duration-300">
          {renderedPhotos.map((photo) => {
            const isTall = photo.aspectRatio === 'portrait';
            return (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className="break-inside-avoid bento-card relative overflow-hidden group cursor-pointer border border-black/10 dark:border-white/10 hover:border-amber-400/40 transition-all duration-300"
              >
                <div className={`relative overflow-hidden bg-slate-200 dark:bg-[#0E1118] skeleton-shimmer ${isTall ? 'min-h-[220px] sm:min-h-[400px] 2xl:min-h-[480px]' : 'min-h-[150px] sm:min-h-[280px] 2xl:min-h-[340px]'}`}>
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => {
                      e.currentTarget.classList.remove('opacity-0');
                      e.currentTarget.parentElement?.classList.remove('skeleton-shimmer');
                    }}
                    ref={(el) => {
                      if (el && el.complete && el.naturalWidth > 0) {
                        el.classList.remove('opacity-0');
                        el.parentElement?.classList.remove('skeleton-shimmer');
                      }
                    }}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-all duration-700 ease-out opacity-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-85 sm:opacity-80 sm:group-hover:opacity-95 transition-opacity" />

                  <div className="absolute inset-0 p-2.5 sm:p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          if (onSelectCategory) {
                            e.stopPropagation();
                            onSelectCategory(photo.category);
                          }
                        }}
                        className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-amber-400 hover:bg-amber-500 hover:text-black hover:border-amber-400 transition-all cursor-pointer flex items-center gap-1"
                        title={`Buka Ruang Kategori ${photo.category}`}
                      >
                        <span className="truncate max-w-[65px] sm:max-w-none">{photo.category}</span>
                        <ArrowUpRight className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      </button>
                      <span className="text-[8px] sm:text-[10px] font-mono uppercase text-slate-400 bg-black/60 px-1.5 py-0.5 rounded border border-white/10 hidden sm:inline-block">
                        {photo.aspectRatio}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-editorial text-xs sm:text-2xl text-white font-medium group-hover:text-amber-300 transition-colors line-clamp-1 sm:line-clamp-none">
                        {photo.title}
                      </h3>
                      <div className="flex items-center gap-1 sm:gap-2 text-[9px] sm:text-xs text-slate-300 font-light mt-0.5 sm:mt-1.5">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{photo.location}</span>
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

      {/* Progressive Load More Bar & Auto-Trigger Sentinel */}
      {(galleryMode === 'matrix' || galleryMode === 'grid' || galleryMode === 'masonry') &&
        visibleCount < filteredPhotos.length && (
          <div className="mt-12 flex flex-col items-center justify-center gap-3">
            <div ref={loadMoreSentinelRef} className="h-4 w-full pointer-events-none" />
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Menampilkan <span className="text-amber-500 dark:text-amber-400 font-bold">{renderedPhotos.length}</span> dari{' '}
              <span className="text-slate-900 dark:text-white font-bold">{filteredPhotos.length}</span> Karya Visual
            </p>
            <button
              onClick={() =>
                setVisibleCount((prev) => Math.min(prev + LOAD_INCREMENT, filteredPhotos.length))
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-95 text-slate-900 dark:text-white text-xs font-semibold uppercase tracking-wider border border-black/10 dark:border-white/10 hover:border-amber-500/40 transition-all cursor-pointer shadow-md"
            >
              <span>Muat Lebih Banyak ({filteredPhotos.length - renderedPhotos.length} Tersisa)</span>
              <ArrowDown className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            </button>
          </div>
        )}

      {/* MODE 4: Sorotan Tunggal (Cinematic Spotlight Centerpiece) */}
      {galleryMode === 'spotlight' && currentSpotlightPhoto && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Centerpiece Cinema Stage */}
          <div className="bento-card relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl min-h-[520px] sm:min-h-[640px] lg:min-h-[740px] 2xl:min-h-[820px] flex flex-col justify-between bg-[#0E1118] skeleton-shimmer">
            {/* Background Image */}
            <img
              src={currentSpotlightPhoto.imageUrl}
              alt={currentSpotlightPhoto.title}
              decoding="async"
              onLoad={(e) => {
                e.currentTarget.classList.remove('opacity-0');
                e.currentTarget.parentElement?.classList.remove('skeleton-shimmer');
              }}
              ref={(el) => {
                if (el && el.complete && el.naturalWidth > 0) {
                  el.classList.remove('opacity-0');
                  el.parentElement?.classList.remove('skeleton-shimmer');
                }
              }}
              className="w-full h-full object-cover object-center absolute inset-0 transition-all duration-700 opacity-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />

            {/* Top Bar HUD */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.stopPropagation();
                      onSelectCategory(currentSpotlightPhoto.category);
                    }
                  }}
                  className="px-3.5 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  title={`Buka Ruang Kategori ${currentSpotlightPhoto.category}`}
                >
                  <span>{currentSpotlightPhoto.category}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
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
            <div className="absolute inset-y-0 inset-x-2 sm:inset-x-4 flex items-center justify-between pointer-events-none z-10">
              <button
                onClick={handlePrevSpotlight}
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white hover:text-amber-400 backdrop-blur-md transition-all pointer-events-auto cursor-pointer shadow-xl hover:scale-110"
                aria-label="Karya sebelumnya"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={handleNextSpotlight}
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white hover:text-amber-400 backdrop-blur-md transition-all pointer-events-auto cursor-pointer shadow-xl hover:scale-110"
                aria-label="Karya berikutnya"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Bottom Details HUD */}
            <div className="relative z-10 p-5 sm:p-8 max-w-3xl">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-amber-400 font-mono tracking-widest uppercase mb-1.5 sm:mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Eksibisi Unggulan</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight mb-2 sm:mb-3">
                {currentSpotlightPhoto.title}
              </h3>
              {currentSpotlightPhoto.description && (
                <p className="text-slate-300 text-xs sm:text-base font-light leading-relaxed mb-3 sm:mb-4 max-w-2xl">
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

          {/* Interactive Thumbnail Carousel Strip (Limited to Top 24) */}
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
              {filteredPhotos.slice(0, 24).map((photo, idx) => {
                const isSelected = idx === spotlightIndex;
                return (
                  <button
                    key={photo.id}
                    onClick={() => setSpotlightIndex(idx)}
                    className={`shrink-0 relative w-24 sm:w-28 h-16 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer bg-[#0E1118] skeleton-shimmer ${
                      isSelected
                        ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black scale-105 opacity-100'
                        : 'opacity-50 hover:opacity-85'
                    }`}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      loading="lazy"
                      decoding="async"
                      onLoad={(e) => {
                        e.currentTarget.classList.remove('opacity-0');
                        e.currentTarget.parentElement?.classList.remove('skeleton-shimmer');
                      }}
                      ref={(el) => {
                        if (el && el.complete && el.naturalWidth > 0) {
                          el.classList.remove('opacity-0');
                          el.parentElement?.classList.remove('skeleton-shimmer');
                        }
                      }}
                      className="w-full h-full object-cover opacity-0 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODE 5: Rol Film Bebas (Horizontal Filmstrip Stream - Top 24 Items) */}
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
            {filteredPhotos.slice(0, 24).map((photo) => (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className="snap-start shrink-0 w-[300px] sm:w-[380px] lg:w-[440px] 2xl:w-[520px] h-[480px] sm:h-[540px] 2xl:h-[620px] bento-card relative overflow-hidden group cursor-pointer bg-[#0E1118] skeleton-shimmer"
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  onLoad={(e) => {
                    e.currentTarget.classList.remove('opacity-0');
                    e.currentTarget.parentElement?.classList.remove('skeleton-shimmer');
                  }}
                  ref={(el) => {
                    if (el && el.complete && el.naturalWidth > 0) {
                      el.classList.remove('opacity-0');
                      el.parentElement?.classList.remove('skeleton-shimmer');
                    }
                  }}
                  className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 opacity-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20 flex flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        if (onSelectCategory) {
                          e.stopPropagation();
                          onSelectCategory(photo.category);
                        }
                      }}
                      className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold uppercase tracking-wider text-amber-400 hover:bg-amber-500 hover:text-black hover:border-amber-400 transition-all cursor-pointer flex items-center gap-1"
                      title={`Buka Ruang Kategori ${photo.category}`}
                    >
                      <span>{photo.category}</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </button>
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
