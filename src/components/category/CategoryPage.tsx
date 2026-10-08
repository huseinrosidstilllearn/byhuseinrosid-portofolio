import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  Maximize2,
  MapPin,
  Grid,
  Layers,
  Columns3,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import {
  getCategoryInfo,
  getNextCategory,
  CATEGORY_ORDER,
} from '../../data/categoryData';
import { createWhatsAppLink } from '../../utils/whatsapp';
import type { PhotoItem } from '../../types/portfolio';

interface CategoryPageProps {
  categoryName: string;
  allPhotos: PhotoItem[];
  onSelectPhoto: (photo: PhotoItem) => void;
  onSelectCategory: (categoryName: string) => void;
  onBackToMain: () => void;
}

export type CategoryLayoutMode = 'masonry' | 'grid' | 'matrix' | 'spotlight';

interface LayoutOption {
  id: CategoryLayoutMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const LAYOUT_OPTIONS: LayoutOption[] = [
  { id: 'masonry', label: 'Masonry', icon: Layers, description: 'Proporsi murni tanpa crop' },
  { id: 'grid', label: 'Grid', icon: Columns3, description: 'Tata letak teratur dengan info' },
  { id: 'matrix', label: 'Bento', icon: Grid, description: 'Ritme asimetris editorial' },
  { id: 'spotlight', label: 'Spotlight', icon: Sparkles, description: 'Pameran panggung tunggal' },
];

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryName,
  allPhotos,
  onSelectPhoto,
  onSelectCategory,
  onBackToMain,
}) => {
  const [layoutMode, setLayoutMode] = useState<CategoryLayoutMode>('masonry');
  const [filterFeaturedOnly, setFilterFeaturedOnly] = useState<boolean>(false);
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);

  const info = getCategoryInfo(categoryName);
  const nextInfo = getNextCategory(categoryName);
  const Icon = info.icon;

  const INITIAL_PAGE_SIZE = 24;
  const LOAD_INCREMENT = 18;
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PAGE_SIZE);
  const loadMoreSentinelRef = useRef<HTMLDivElement>(null);

  // Filter foto berdasarkan kategori yang sedang aktif
  const categoryPhotos = allPhotos.filter((p) => p.category === categoryName);
  const displayedPhotos = filterFeaturedOnly
    ? categoryPhotos.filter((p) => p.featured)
    : categoryPhotos;

  // Reset pagination & spotlight index saat filter atau kategori berganti
  useEffect(() => {
    setSpotlightIndex(0);
    setVisibleCount(INITIAL_PAGE_SIZE);
  }, [categoryName, filterFeaturedOnly, layoutMode]);

  // Sentinel auto load-more saat scroll mendekat
  useEffect(() => {
    const sentinel = loadMoreSentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < displayedPhotos.length) {
          setVisibleCount((prev) => Math.min(prev + LOAD_INCREMENT, displayedPhotos.length));
        }
      },
      { rootMargin: '400px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, displayedPhotos.length]);

  const renderedPhotos = useMemo(() => {
    return displayedPhotos.slice(0, visibleCount);
  }, [displayedPhotos, visibleCount]);

  const currentSpotlightPhoto = displayedPhotos[spotlightIndex] || displayedPhotos[0] || null;

  const handleNextSpotlight = () => {
    if (displayedPhotos.length === 0) return;
    setSpotlightIndex((prev) => (prev + 1) % displayedPhotos.length);
  };

  const handlePrevSpotlight = () => {
    if (displayedPhotos.length === 0) return;
    setSpotlightIndex((prev) => (prev - 1 + displayedPhotos.length) % displayedPhotos.length);
  };

  return (
    <div className="w-full min-h-screen pt-20 sm:pt-28 pb-16 animate-in fade-in duration-400">
      {/* ── STICKY TOP BREADCRUMB & NAVIGATION BAR ── */}
      <div className="sticky top-16 sm:top-20 z-40 bg-[#050505]/90 backdrop-blur-xl border-y border-white/[0.08] py-2.5 sm:py-3 px-3 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 mb-6 sm:mb-10">
        <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          {/* Breadcrumb + Back Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onBackToMain}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Showcase Utama</span>
            </button>
            <span className="text-white/20">/</span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold truncate max-w-[150px] sm:max-w-none">
              {info.name}
            </span>
          </div>

          {/* Horizontal Category Quick Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 touch-pan-x overscroll-x-contain">
            {CATEGORY_ORDER.map((cat) => {
              const isActive = cat === categoryName;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`relative px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wider uppercase whitespace-nowrap active:scale-95 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-slate-950 font-bold bg-amber-500 shadow-[0_2px_12px_rgba(245,158,11,0.4)]'
                      : 'text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 mx-auto">
        {/* ── MINIMAL PHOTO-FIRST CATEGORY HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/[0.08]">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                <Icon className="w-3 h-3" />
                <span>Kategori Eksibisi</span>
              </div>
              {categoryName === 'Graduation' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                  Fokus Layanan Aktif: Wisuda & Kelulusan
                </span>
              )}
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight">
              {info.name}
            </h1>
            <p className="text-xs sm:text-base text-slate-300 font-light mt-2 leading-relaxed">
              {info.subtitle}
            </p>
            {info.tags && info.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.06]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mr-1">
                  Tag Subjek:
                </span>
                {info.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] text-slate-400 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-3">
              Total <span className="text-amber-400 font-bold">{categoryPhotos.length}</span> karya terkurasi dalam arsip ini
            </p>
          </div>
          <a
            href={createWhatsAppLink(info.waTemplate)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95 shrink-0 w-full sm:w-fit cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{categoryName === 'Graduation' ? 'Booking / Tanya Sesi Wisuda' : `Tanya Sesi ${info.name}`}</span>
          </a>
        </div>

        {/* ── TOOLBAR: LAYOUT SWITCHER & FILTER CONTROLS ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/[0.08]">
          {/* Layout Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#0E1118]/85 border border-white/10 backdrop-blur-xl overflow-x-auto no-scrollbar shadow-lg">
            {LAYOUT_OPTIONS.map((opt) => {
              const OptIcon = opt.icon;
              const isActive = layoutMode === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setLayoutMode(opt.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_2px_12px_rgba(245,158,11,0.35)] scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                  title={opt.description}
                >
                  <OptIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterFeaturedOnly(false)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                !filterFeaturedOnly
                  ? 'bg-white/15 text-amber-300 border border-amber-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/10'
              }`}
            >
              Semua Foto ({categoryPhotos.length})
            </button>
            <button
              onClick={() => setFilterFeaturedOnly(true)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                filterFeaturedOnly
                  ? 'bg-white/15 text-amber-300 border border-amber-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/[0.03] border border-white/10'
              }`}
            >
              Hanya Unggulan ({categoryPhotos.filter((p) => p.featured).length})
            </button>
          </div>
        </div>

        {/* ── EMPTY STATE ── */}
        {displayedPhotos.length === 0 && (
          <div className="py-20 text-center bento-card p-12 rounded-3xl border border-white/10 my-8">
            <p className="font-editorial text-2xl text-white">
              Belum ada foto yang ditampilkan untuk filter ini
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Cobalah memilih "Semua Foto" untuk melihat seluruh koleksi kategori ini.
            </p>
            <button
              onClick={() => setFilterFeaturedOnly(false)}
              className="mt-6 px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Tampilkan Semua Foto {info.name}
            </button>
          </div>
        )}

        {/* ── LAYOUT 1: MASONRY BEBAS (2-KOLOM MOBILE / MULTI-KOLOM DESKTOP) ── */}
        {layoutMode === 'masonry' && displayedPhotos.length > 0 && (
          <div className="columns-2 sm:columns-2 lg:columns-3 2xl:columns-4 gap-3 sm:gap-6 space-y-3 sm:space-y-6 animate-in fade-in duration-300">
            {renderedPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="break-inside-avoid bento-card rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-amber-400/50 transition-all duration-300 relative"
              >
                <div className="relative overflow-hidden bg-[#0E1118] skeleton-shimmer">
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
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-5">
                    <div className="flex justify-end">
                      <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-amber-400 hidden sm:flex">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-editorial text-sm sm:text-lg text-white font-medium leading-snug">
                        {photo.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-300 font-light mt-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span className="truncate">{photo.location}</span>
                        <span>&bull;</span>
                        <span>{photo.year}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtitle caption below image */}
                <div className="p-3 sm:p-4 bg-[#0E1118]/80">
                  <h4 className="font-editorial text-xs sm:text-base text-white font-medium group-hover:text-amber-300 transition-colors truncate">
                    {photo.title}
                  </h4>
                  {photo.description && (
                    <p className="text-xs text-slate-400 font-light mt-1 line-clamp-2 leading-relaxed hidden sm:block">
                      {photo.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-light pt-2 sm:pt-2.5 mt-2 sm:mt-2.5 border-t border-white/[0.08]">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </span>
                    <span className="font-mono shrink-0">{photo.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── LAYOUT 2: GRID PRESISI (2-KOLOM MOBILE / MULTI-KOLOM DESKTOP) ── */}
        {layoutMode === 'grid' && displayedPhotos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-6 animate-in fade-in duration-300">
            {renderedPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="bento-card rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-amber-400/50 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0E1118] skeleton-shimmer">
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
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-amber-400">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between bg-[#0E1118]/80">
                  <div>
                    <h4 className="font-editorial text-xs sm:text-lg text-white font-medium group-hover:text-amber-300 transition-colors line-clamp-1">
                      {photo.title}
                    </h4>
                    {photo.description && (
                      <p className="text-xs text-slate-400 font-light mt-1.5 line-clamp-2 leading-relaxed hidden sm:block">
                        {photo.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-light pt-2 sm:pt-3 mt-2 sm:mt-4 border-t border-white/[0.08]">
                    <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </div>
                    <span className="font-mono text-slate-400 shrink-0">{photo.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── LAYOUT 3: BENTO MATRIX ── */}
        {layoutMode === 'matrix' && displayedPhotos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 animate-in fade-in duration-300">
            {renderedPhotos.map((photo, index) => {
              const cycle = index % 4;
              const spanClass =
                cycle === 0
                  ? 'sm:col-span-12 lg:col-span-8 min-h-[380px] sm:min-h-[460px]'
                  : cycle === 1
                  ? 'sm:col-span-12 sm:col-span-6 lg:col-span-4 min-h-[380px] sm:min-h-[460px]'
                  : 'sm:col-span-12 sm:col-span-6 lg:col-span-6 min-h-[320px] sm:min-h-[380px]';

              return (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo)}
                  className={`${spanClass} bento-card rounded-2xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-amber-400/50 transition-all duration-300 bg-[#0E1118] skeleton-shimmer`}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20 flex flex-col justify-between p-6 sm:p-7">
                    <div className="flex justify-end">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 px-2.5 py-1 rounded-md border border-white/10">
                        Buka Eksibisi
                      </span>
                    </div>
                    <div>
                      <h4 className="font-editorial text-xl sm:text-2xl text-white font-medium group-hover:text-amber-300 transition-colors">
                        {photo.title}
                      </h4>
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

        {/* ── LAYOUT 4: SPOTLIGHT SINEMATIK ── */}
        {layoutMode === 'spotlight' && currentSpotlightPhoto && (
          <div className="bento-card rounded-3xl p-6 sm:p-10 border border-white/10 animate-in fade-in duration-300">
            {/* Main Stage */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-[#0E1118] skeleton-shimmer mb-6 group cursor-pointer"
              onClick={() => onSelectPhoto(currentSpotlightPhoto)}
            >
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
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-between p-6 sm:p-10">
                <div className="flex justify-between items-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-amber-400 uppercase tracking-widest">
                    {spotlightIndex + 1} / {displayedPhotos.length}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="font-editorial text-2xl sm:text-4xl text-white font-medium">
                    {currentSpotlightPhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl mt-2 leading-relaxed">
                    {currentSpotlightPhoto.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-light mt-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {currentSpotlightPhoto.location}
                    </span>
                    <span>&bull;</span>
                    <span className="font-mono">{currentSpotlightPhoto.year}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls & Thumbnails */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrevSpotlight}
                className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 flex items-center justify-center text-white cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                {displayedPhotos.map((photo, i) => (
                  <button
                    key={photo.id}
                    onClick={() => setSpotlightIndex(i)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-[#0E1118] skeleton-shimmer ${
                      i === spotlightIndex
                        ? 'border-amber-400 scale-105 shadow-md'
                        : 'border-white/10 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.imageUrl}
                      alt=""
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
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextSpotlight}
                className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 flex items-center justify-center text-white cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ── LOAD MORE / INFINITE SCROLL SENTINEL ── */}
        {layoutMode !== 'spotlight' && displayedPhotos.length > visibleCount && (
          <div className="mt-12 flex flex-col items-center justify-center gap-3">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + LOAD_INCREMENT, displayedPhotos.length))}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-amber-400/40 text-xs font-mono uppercase tracking-wider text-slate-200 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Muat Lebih Banyak ({visibleCount} dari {displayedPhotos.length} foto)</span>
            </button>
            <div ref={loadMoreSentinelRef} className="h-4 w-full" aria-hidden="true" />
          </div>
        )}

        {layoutMode !== 'spotlight' && displayedPhotos.length <= visibleCount && displayedPhotos.length > INITIAL_PAGE_SIZE && (
          <div className="mt-12 text-center text-xs font-mono text-slate-500 uppercase tracking-widest">
            Semua {displayedPhotos.length} foto dalam kategori ini telah dimuat
          </div>
        )}

        {/* ── NEXT CATEGORY EXPLORER BANNER ── */}
        <div className="mt-16 pt-12 border-t border-white/[0.08]">
          <div className="bento-card p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400 block mb-1">
                Kategori Selanjutnya
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-medium">
                {nextInfo.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light mt-1 max-w-md">
                {nextInfo.subtitle}
              </p>
            </div>

            <button
              onClick={() => {
                onSelectCategory(nextInfo.name);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative z-10 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.25)] cursor-pointer"
            >
              <span>Jelajahi {nextInfo.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
