import React, { useState, useRef, useMemo } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Hand, MapPin, Maximize2 } from 'lucide-react';
import { PHOTO_CATEGORIES, PORTFOLIO_PHOTOS, PHOTOGRAPHER_PROFILE } from '../data/portfolioData';
import type { PhotoItem } from '../types/portfolio';
import { LightboxModal } from './LightboxModal';
import { CanvasMiniMap } from './CanvasMiniMap';

const CANVAS_WIDTH = 4000;
const CANVAS_HEIGHT = 3000;

// Pre-defined artistic spatial coordinates for each photograph across the 2D world
const SPATIAL_LAYOUTS = [
  { id: 'p-01', x: 1300, y: 1100, width: 340, height: 480 }, // Garis Bayang (Portrait)
  { id: 'p-02', x: 2350, y: 1050, width: 520, height: 350 }, // Refleksi Keanggunan (Landscape)
  { id: 'p-03', x: 2000, y: 700,  width: 320, height: 460 }, // Tatapan Laut (Portrait)
  { id: 'p-04', x: 1250, y: 1750, width: 560, height: 370 }, // Senyap Bromo (Landscape)
  { id: 'p-05', x: 2500, y: 1600, width: 340, height: 490 }, // Janji Senja (Portrait)
  { id: 'p-06', x: 750,  y: 1150, width: 360, height: 360 }, // Tekstur Kopi (Square)
  { id: 'p-07', x: 2950, y: 1100, width: 540, height: 360 }, // Langkah Penarik Gerobak (Landscape)
  { id: 'p-08', x: 1950, y: 2000, width: 340, height: 480 }, // Keteguhan dalam Diam (Portrait)
  { id: 'p-09', x: 700,  y: 1700, width: 520, height: 350 }, // Hening di Tepi Waduk (Landscape)
  { id: 'p-10', x: 3050, y: 1650, width: 330, height: 470 }, // Tawa Renda (Portrait)
  { id: 'p-11', x: 1400, y: 550,  width: 340, height: 480 }, // Bentuk & Proporsi (Portrait)
  { id: 'p-12', x: 2550, y: 550,  width: 360, height: 360 }, // Gerimis Halte (Square)
];

export const SpatialCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [zoom, setZoom] = useState<number>(0.9);
  const [isHintVisible, setIsHintVisible] = useState<boolean>(true);

  // Initial center position
  const initialX = -(CANVAS_WIDTH / 2 - (typeof window !== 'undefined' ? window.innerWidth / 2 : 700));
  const initialY = -(CANVAS_HEIGHT / 2 - (typeof window !== 'undefined' ? window.innerHeight / 2 : 450));

  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  const [currentPan, setCurrentPan] = useState({ x: initialX, y: initialY });
  const isDraggingRef = useRef(false);

  // Merge photo data with spatial coordinates
  const spatialPhotos = useMemo(() => {
    return PORTFOLIO_PHOTOS.map(photo => {
      const layout = SPATIAL_LAYOUTS.find(l => l.id === photo.id) || {
        x: 2000,
        y: 1500,
        width: 380,
        height: 480,
      };
      return {
        ...photo,
        ...layout,
      };
    });
  }, []);

  const handleDragStart = () => {
    isDraggingRef.current = true;
    setIsHintVisible(false);
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 150);
  };

  const handlePhotoClick = (photo: PhotoItem) => {
    if (!isDraggingRef.current) {
      setActivePhoto(photo);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(1.4, prev + 0.15));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(0.5, prev - 0.15));
  };

  const handleRecenter = () => {
    animate(x, initialX, { type: 'spring', damping: 25, stiffness: 120 });
    animate(y, initialY, { type: 'spring', damping: 25, stiffness: 120 });
    setCurrentPan({ x: initialX, y: initialY });
    setZoom(0.9);
  };

  const focusOnCategory = (category: string) => {
    setSelectedCategory(category);
    setIsHintVisible(false);
    if (category === 'Semua') {
      handleRecenter();
      return;
    }
    const matchingPhoto = spatialPhotos.find(p => p.category === category);
    if (matchingPhoto) {
      const targetX = -(matchingPhoto.x - window.innerWidth / 2 + matchingPhoto.width / 2);
      const targetY = -(matchingPhoto.y - window.innerHeight / 2 + matchingPhoto.height / 2);
      animate(x, targetX, { type: 'spring', damping: 25, stiffness: 120 });
      animate(y, targetY, { type: 'spring', damping: 25, stiffness: 120 });
      setCurrentPan({ x: targetX, y: targetY });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden select-none bg-[#070a11] dark:bg-[#070a11] cursor-grab active:cursor-grabbing"
    >
      {/* Subtle Spatial Ambient Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-25">
        <div className="w-full h-full bg-[radial-gradient(#ffffff18_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Floating Canvas Draggable Surface */}
      <motion.div
        drag
        dragMomentum={true}
        dragElastic={0.15}
        dragConstraints={{
          left: -(CANVAS_WIDTH - (typeof window !== 'undefined' ? window.innerWidth : 1200) + 400),
          right: 400,
          top: -(CANVAS_HEIGHT - (typeof window !== 'undefined' ? window.innerHeight : 800) + 400),
          bottom: 400,
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onUpdate={() => {
          setCurrentPan({ x: x.get(), y: y.get() });
        }}
        style={{
          x,
          y,
          scale: zoom,
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
        }}
        className="relative transform-gpu will-change-transform"
      >
        {/* CENTERPIECE: Grand Exhibition Hub */}
        <div
          className="absolute flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl pointer-events-none"
          style={{
            left: `${CANVAS_WIDTH / 2}px`,
            top: `${CANVAS_HEIGHT / 2}px`,
            width: '640px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-semibold">
              Surabaya, Indonesia &bull; Ruang Pameran Spasial
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Stories Told in the <br />
            <span className="italic text-amber-400">Quiet Spaces</span> Between Moments.
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-light mt-4 max-w-md leading-relaxed">
            {PHOTOGRAPHER_PROFILE.subheadline}
          </p>

          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10 text-[11px] uppercase tracking-widest text-slate-400">
            <span>&larr; Dokumenter</span>
            <span>&bull;</span>
            <span>&uarr; Portrait</span>
            <span>&bull;</span>
            <span>Lanskap &rarr;</span>
          </div>
        </div>

        {/* Spatial Photographs Floating Across The Canvas */}
        {spatialPhotos.map(photo => {
          const isCategoryMatch = selectedCategory === 'Semua' || photo.category === selectedCategory;

          return (
            <div
              key={photo.id}
              onClick={() => handlePhotoClick(photo)}
              style={{
                left: `${photo.x}px`,
                top: `${photo.y}px`,
                width: `${photo.width}px`,
                height: `${photo.height}px`,
              }}
              className={`group absolute rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer shadow-2xl ${
                isCategoryMatch
                  ? 'border-white/10 hover:border-amber-400/80 hover:shadow-[0_0_35px_rgba(245,158,11,0.35)] opacity-100 scale-100'
                  : 'border-white/5 opacity-30 grayscale scale-95'
              }`}
            >
              {/* Photo Image */}
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Spatial Photo Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
                      {photo.category}
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-white/70" />
                  </div>
                  <h3 className="font-editorial text-base sm:text-lg text-white font-medium line-clamp-1">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-300 font-light mt-0.5">
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
      </motion.div>

      {/* FLOATING HUD: Category Filter Pills */}
      <div className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 shadow-2xl max-w-[95vw] overflow-x-auto no-scrollbar">
        {PHOTO_CATEGORIES.map(category => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => focusOnCategory(category)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* FLOATING HUD: Zoom & Recenter Controls */}
      <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-30 flex items-center gap-1 sm:gap-2 p-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 shadow-2xl">
        <button
          onClick={handleZoomIn}
          aria-label="Perbesar Kanvas"
          className="p-2 sm:p-2.5 rounded-full text-slate-200 hover:text-amber-400 hover:bg-white/10 transition-all cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          aria-label="Perkecil Kanvas"
          className="p-2 sm:p-2.5 rounded-full text-slate-200 hover:text-amber-400 hover:bg-white/10 transition-all cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-white/10" />
        <button
          onClick={handleRecenter}
          aria-label="Pusatkan Kembali"
          className="p-2 sm:p-2.5 rounded-full text-slate-200 hover:text-amber-400 hover:bg-white/10 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* FLOATING HUD: Radar Mini-Map in Bottom-Left */}
      <CanvasMiniMap
        canvasWidth={CANVAS_WIDTH}
        canvasHeight={CANVAS_HEIGHT}
        panX={currentPan.x}
        panY={currentPan.y}
        zoom={zoom}
        photoPositions={spatialPhotos.map(p => ({
          id: p.id,
          x: p.x + p.width / 2,
          y: p.y + p.height / 2,
          category: p.category,
        }))}
        activeCategory={selectedCategory}
      />

      {/* Helpful Floating Interaction Hint (Auto-fades on drag) */}
      {isHintVisible && (
        <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 backdrop-blur-md text-amber-200 text-[11px] sm:text-xs font-medium shadow-lg whitespace-nowrap">
            <Hand className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Tarik &amp; Geser Bebas ke Segala Arah &bull; Klik Foto untuk Layar Penuh</span>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      <LightboxModal
        photo={activePhoto}
        allPhotos={PORTFOLIO_PHOTOS}
        onClose={() => setActivePhoto(null)}
        onSelectPhoto={photo => setActivePhoto(photo)}
      />
    </div>
  );
};
