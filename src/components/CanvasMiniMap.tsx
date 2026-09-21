import React from 'react';
import { Compass } from 'lucide-react';

interface CanvasMiniMapProps {
  canvasWidth: number;
  canvasHeight: number;
  panX: number;
  panY: number;
  zoom: number;
  photoPositions: Array<{ id: string; x: number; y: number; category: string }>;
  activeCategory: string;
}

export const CanvasMiniMap: React.FC<CanvasMiniMapProps> = ({
  canvasWidth,
  canvasHeight,
  panX,
  panY,
  zoom,
  photoPositions,
  activeCategory,
}) => {
  // Dimension of the mini-map in pixels
  const mapWidth = 140;
  const mapHeight = 100;

  const scaleX = mapWidth / canvasWidth;
  const scaleY = mapHeight / canvasHeight;

  // Viewport box dimensions
  const viewWidth = Math.min(mapWidth, (window.innerWidth / (canvasWidth * zoom)) * mapWidth);
  const viewHeight = Math.min(mapHeight, (window.innerHeight / (canvasHeight * zoom)) * mapHeight);

  // Viewport position on the map
  const viewX = Math.max(0, Math.min(mapWidth - viewWidth, (-panX / canvasWidth) * mapWidth));
  const viewY = Math.max(0, Math.min(mapHeight - viewHeight, (-panY / canvasHeight) * mapHeight));

  return (
    <div className="fixed bottom-8 left-6 z-30 hidden sm:flex flex-col gap-1.5 p-2 rounded-2xl bg-black/60 dark:bg-black/70 backdrop-blur-md border border-white/10 shadow-2xl pointer-events-none select-none">
      <div className="flex items-center justify-between px-1 text-[9px] uppercase tracking-[0.2em] text-slate-400 font-mono">
        <span className="flex items-center gap-1">
          <Compass className="w-2.5 h-2.5 text-amber-400 animate-spin duration-10000" />
          Radar Spasial
        </span>
        <span className="text-amber-400 font-semibold">{Math.round(zoom * 100)}%</span>
      </div>

      <div
        className="relative rounded-lg overflow-hidden bg-slate-900/90 border border-white/5"
        style={{ width: `${mapWidth}px`, height: `${mapHeight}px` }}
      >
        {/* Subtle grid pattern inside radar */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:14px_14px]" />

        {/* Photo nodes on radar */}
        {photoPositions.map(photo => {
          const isHighlighted = activeCategory === 'Semua' || photo.category === activeCategory;
          return (
            <div
              key={photo.id}
              className={`absolute rounded-full transition-all duration-300 ${
                isHighlighted
                  ? 'w-1.5 h-1.5 bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]'
                  : 'w-1 h-1 bg-white/20'
              }`}
              style={{
                left: `${photo.x * scaleX}px`,
                top: `${photo.y * scaleY}px`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}

        {/* Current Camera Viewport Box */}
        <div
          className="absolute border border-amber-400/80 bg-amber-400/10 rounded-sm transition-all duration-75 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
          style={{
            width: `${viewWidth}px`,
            height: `${viewHeight}px`,
            left: `${viewX}px`,
            top: `${viewY}px`,
          }}
        />
      </div>
    </div>
  );
};
