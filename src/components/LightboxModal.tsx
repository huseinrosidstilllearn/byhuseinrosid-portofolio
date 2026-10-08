import React, { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, ZoomIn, ZoomOut, MessageCircle } from 'lucide-react';
import type { PhotoItem } from '../types/portfolio';
import { createPhotoInquiryLink } from '../utils/whatsapp';

interface LightboxModalProps {
  photo: PhotoItem | null;
  allPhotos: PhotoItem[];
  onClose: () => void;
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  allPhotos,
  onClose,
  onSelectPhoto,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  useEffect(() => {
    setIsZoomed(false);
    setIsLoading(true);
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [photo, allPhotos]);

  if (!photo) return null;

  const currentIndex = allPhotos.findIndex(p => p.id === photo.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectPhoto(allPhotos[currentIndex - 1]);
    } else {
      onSelectPhoto(allPhotos[allPhotos.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < allPhotos.length - 1) {
      onSelectPhoto(allPhotos[currentIndex + 1]);
    } else {
      onSelectPhoto(allPhotos[0]);
    }
  };

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
    const minSwipeDistance = 50; // minimum distance in px

    if (distance > minSwipeDistance) {
      // Swiped left -> next photo
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> previous photo
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-6 select-none animate-in fade-in duration-300 overflow-y-auto sm:overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between text-white/80">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-semibold">
            {currentIndex + 1} / {allPhotos.length}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-xs tracking-wider uppercase text-slate-300 font-medium truncate max-w-[140px] sm:max-w-none">
            {photo.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Toggle Button */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            aria-label={isZoomed ? "Perkecil Foto" : "Perbesar Foto"}
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
        onClick={e => e.stopPropagation()}
      >
        <div className={`relative transition-transform duration-300 overflow-hidden flex items-center justify-center ${isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'}`}>
          {isLoading && (
            <div className="absolute inset-0 min-h-[300px] flex items-center justify-center bg-white/[0.02] rounded-lg">
              <div className="w-8 h-8 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
            </div>
          )}
          <img
            src={photo.imageUrl}
            alt={photo.title}
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

          {/* Action Row: Mobile Navigation & WhatsApp Direct CTA */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            {/* Mobile Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Foto Sebelumnya"
              className="sm:hidden p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

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
