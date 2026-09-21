import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, ZoomIn, ZoomOut } from 'lucide-react';
import type { PhotoItem } from '../types/portfolio';

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

  useEffect(() => {
    setIsZoomed(false);
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-6 select-none animate-in fade-in duration-300"
    >
      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white/80">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            {currentIndex + 1} / {allPhotos.length}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-xs tracking-wider uppercase text-slate-300">
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

      {/* Navigation Buttons (Desktop & Tablet) */}
      <button
        onClick={handlePrev}
        aria-label="Foto Sebelumnya"
        className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-black/50 border border-white/10 text-white/80 hover:text-white hover:border-amber-400 hover:scale-110 transition-all cursor-pointer hidden sm:flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Foto Berikutnya"
        className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-black/50 border border-white/10 text-white/80 hover:text-white hover:border-amber-400 hover:scale-110 transition-all cursor-pointer hidden sm:flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Center Image Canvas */}
      <div
        className="relative max-w-5xl max-h-[82vh] w-full flex flex-col items-center justify-center my-auto cursor-default"
        onClick={e => e.stopPropagation()}
      >
        <div className={`transition-transform duration-300 overflow-hidden flex items-center justify-center ${isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <img
            src={photo.imageUrl}
            alt={photo.title}
            onClick={() => setIsZoomed(!isZoomed)}
            className="max-h-[72vh] max-w-full object-contain rounded-lg shadow-2xl transition-all"
          />
        </div>

        {/* Narrative & Photo Details Footer */}
        <div className="w-full max-w-3xl mt-4 px-4 text-center">
          <h2 className="font-editorial text-xl sm:text-2xl text-white font-medium">
            {photo.title}
          </h2>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mt-1">
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
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 max-w-xl mx-auto leading-relaxed">
            {photo.description}
          </p>
        </div>
      </div>
    </div>
  );
};
