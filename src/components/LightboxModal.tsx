import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  MessageCircle,
  SlidersHorizontal,
} from 'lucide-react';
import type { PhotoItem } from '../types/portfolio';
import { createPhotoInquiryLink } from '../utils/whatsapp';

interface LightboxModalProps {
  photo: PhotoItem | null;
  allPhotos: PhotoItem[];
  onClose: () => void;
  onSelectPhoto: (photo: PhotoItem) => void;
  onOpenEstimator?: (category: string, photoTitle: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  allPhotos,
  onClose,
  onSelectPhoto,
  onOpenEstimator,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const lastTapRef = useRef<number>(0);

  const currentIndex = photo ? allPhotos.findIndex((p) => p.id === photo.id) : -1;

  const handlePrev = useCallback(() => {
    if (!photo || allPhotos.length === 0) return;
    if (currentIndex > 0) {
      onSelectPhoto(allPhotos[currentIndex - 1]);
    } else {
      onSelectPhoto(allPhotos[allPhotos.length - 1]);
    }
  }, [currentIndex, allPhotos, onSelectPhoto, photo]);

  const handleNext = useCallback(() => {
    if (!photo || allPhotos.length === 0) return;
    if (currentIndex < allPhotos.length - 1) {
      onSelectPhoto(allPhotos[currentIndex + 1]);
    } else {
      onSelectPhoto(allPhotos[0]);
    }
  }, [currentIndex, allPhotos, onSelectPhoto, photo]);

  useEffect(() => {
    setIsZoomed(false);
    setIsLoading(true);
  }, [photo]);

  // Pause slideshow if user activates zoom
  useEffect(() => {
    if (isZoomed) {
      setIsPlayingSlideshow(false);
    }
  }, [isZoomed]);

  // Autoplay Slideshow 3.5s per foto
  useEffect(() => {
    if (!isPlayingSlideshow || !photo) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPlayingSlideshow, photo, handleNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlayingSlideshow((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [photo, allPhotos, onClose, handlePrev, handleNext]);

  if (!photo) return null;

  // Touch swipe gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Deteksi double tap untuk zoom cepat di layar sentuh
  const handleImageTouchEnd = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 280) {
      setIsZoomed((prev) => !prev);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 select-none animate-in fade-in duration-300 overflow-y-auto sm:overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slideshow Progress Bar */}
      {isPlayingSlideshow && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-40 overflow-hidden">
          <div
            key={photo.id}
            className="h-full bg-amber-400"
            style={{
              animation: 'lightboxSlideProgress 3.5s linear forwards',
            }}
          />
        </div>
      )}

      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between text-white/80">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
            {currentIndex + 1} / {allPhotos.length}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-xs tracking-wider uppercase text-slate-300 font-medium truncate max-w-[130px] sm:max-w-none">
            {photo.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Autoplay Slideshow Button */}
          <button
            onClick={() => setIsPlayingSlideshow((prev) => !prev)}
            aria-label={isPlayingSlideshow ? 'Jeda Slideshow Otomatis (Spasi)' : 'Putar Slideshow Otomatis (Spasi)'}
            title={isPlayingSlideshow ? 'Jeda Slideshow (Spasi)' : 'Putar Slideshow (Spasi)'}
            className={`px-3 py-2 sm:px-3.5 sm:py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider ${
              isPlayingSlideshow
                ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {isPlayingSlideshow ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Slide</span>
              </>
            )}
          </button>

          {/* Zoom Toggle Button */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            aria-label={isZoomed ? 'Perkecil Foto' : 'Perbesar Foto'}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Tutup Tampilan Penuh"
            className="p-2.5 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Navigation Buttons */}
      <button
        onClick={handlePrev}
        aria-label="Foto Sebelumnya"
        className="absolute left-3 sm:left-6 z-30 p-3 rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white hover:border-amber-400 hover:scale-110 transition-all cursor-pointer hidden sm:flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Foto Berikutnya"
        className="absolute right-3 sm:right-6 z-30 p-3 rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white hover:border-amber-400 hover:scale-110 transition-all cursor-pointer hidden sm:flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Center Image Canvas */}
      <div
        className="relative max-w-5xl max-h-[88vh] w-full flex flex-col items-center justify-center my-auto cursor-default py-12 sm:py-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative transition-transform duration-300 overflow-hidden flex items-center justify-center ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onTouchEnd={handleImageTouchEnd}
        >
          {isLoading && (
            <div className="absolute inset-0 min-h-[300px] flex items-center justify-center bg-white/[0.02] rounded-lg">
              <div className="w-8 h-8 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
            </div>
          )}
          <img
            src={photo.imageUrl}
            alt={photo.title}
            decoding="async"
            onLoad={() => setIsLoading(false)}
            onClick={() => setIsZoomed(!isZoomed)}
            className={`max-h-[58vh] sm:max-h-[68vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300 ${
              isLoading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
            }`}
          />
        </div>

        {/* Narrative & Photo Details Footer */}
        <div className="w-full max-w-3xl mt-3 sm:mt-4 px-4 text-center">
          <h2 className="font-editorial text-lg sm:text-2xl text-white font-medium">
            {photo.title}
          </h2>
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs text-slate-400 mt-1">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              {photo.location}
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {photo.year}
            </span>
          </div>
          {photo.description && (
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-1.5 sm:mt-2 max-w-xl mx-auto leading-relaxed line-clamp-2 sm:line-clamp-none">
              {photo.description}
            </p>
          )}

          {/* Swipe indicator hint on mobile */}
          <div className="sm:hidden flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-2">
            <span>&larr; Geser layar untuk karya lain &rarr;</span>
          </div>

          {/* Action Row: Mobile Navigation & WhatsApp CTAs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            {/* Mobile Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Foto Sebelumnya"
              className="sm:hidden p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Tombol Konsultasi Estimator (Jika handler disediakan) */}
            {onOpenEstimator ? (
              <button
                onClick={() => onOpenEstimator(photo.category, photo.title)}
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 font-medium text-xs sm:text-sm tracking-wide border border-amber-500/30 transition-all cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Konsultasi Sesi</span>
              </button>
            ) : null}

            {/* Direct WhatsApp CTA Button */}
            <a
              href={createPhotoInquiryLink(photo.title, photo.category)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_2px_16px_rgba(245,158,11,0.35)] transition-all cursor-pointer group"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Tanya Sesi Gaya Ini</span>
            </a>

            {/* Mobile Next Button */}
            <button
              onClick={handleNext}
              aria-label="Foto Berikutnya"
              className="sm:hidden p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
