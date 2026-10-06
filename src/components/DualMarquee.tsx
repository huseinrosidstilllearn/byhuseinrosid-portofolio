import React, { useState, useMemo } from 'react';
import { Play, Pause, Gauge } from 'lucide-react';
import { PORTFOLIO_PHOTOS } from '../data/portfolioData';
import type { PhotoItem, MarqueeConfig } from '../types/portfolio';

interface DualMarqueeProps {
  photos?: PhotoItem[];
  config?: MarqueeConfig;
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const DualMarquee: React.FC<DualMarqueeProps> = ({
  photos = PORTFOLIO_PHOTOS,
  config,
  onSelectPhoto,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speedMode, setSpeedMode] = useState<'slow' | 'normal' | 'fast'>(
    config?.speed || 'normal'
  );

  // Filter foto berdasarkan konfigurasi yang dipilih pengguna
  const selectedPhotos = useMemo(() => {
    const sourcePhotos = photos.length > 0 ? photos : PORTFOLIO_PHOTOS;
    const maxLimit = config?.maxItems || 24;

    // 1. Jika mode manual dengan ID foto spesifik
    if (
      config?.selectionMode === 'manual' &&
      Array.isArray(config.customPhotoIds) &&
      config.customPhotoIds.length > 0
    ) {
      const manual = sourcePhotos.filter((p) => config.customPhotoIds?.includes(p.id));
      if (manual.length > 0) {
        return manual.slice(0, maxLimit);
      }
    }

    // 2. Default: Prioritaskan foto bertanda Unggulan (featured)
    const featured = sourcePhotos.filter((p) => p.featured);
    if (featured.length >= 4) {
      return featured.slice(0, maxLimit);
    }

    // 3. Fallback jika foto featured belum cukup: ambil kurasi awal
    return sourcePhotos.slice(0, Math.min(16, maxLimit));
  }, [photos, config]);

  // Bagi foto menjadi dua baris independen (genap & ganjil) agar kedua lintasan menampilkan variasi berbeda
  const { row1, row2, trackDuration } = useMemo(() => {
    if (selectedPhotos.length === 0) {
      return { row1: [], row2: [], trackDuration: 90 };
    }

    const set1: PhotoItem[] = [];
    const set2: PhotoItem[] = [];

    selectedPhotos.forEach((photo, idx) => {
      if (idx % 2 === 0) {
        set1.push(photo);
      } else {
        set2.push(photo);
      }
    });

    // Jika salah satu baris terlalu sedikit, seimbangkan
    const finalSet1 = set1.length >= 2 ? set1 : selectedPhotos;
    const finalSet2 = set2.length >= 2 ? set2 : [...selectedPhotos].reverse();

    // Gandakan untuk infinite loop tanpa celah
    const duplicated1 = [...finalSet1, ...finalSet1];
    const duplicated2 = [...finalSet2, ...finalSet2];

    // Hitung durasi berdasarkan kecepatan konstan per pixel
    // slow: 14 px/s, normal: 24 px/s, fast: 36 px/s
    const speedPx = speedMode === 'slow' ? 14 : speedMode === 'fast' ? 36 : 24;
    // Lebar satu putaran: jumlah item asli x (320px lebar card + 16px gap = 336px)
    const singleLoopWidth = Math.max(finalSet1.length, finalSet2.length) * 336;
    const duration = Math.max(45, Math.round(singleLoopWidth / speedPx));

    return {
      row1: duplicated1,
      row2: duplicated2,
      trackDuration: duration,
    };
  }, [selectedPhotos, speedMode]);

  return (
    <section
      className="w-full py-8 overflow-hidden marquee-container relative z-10 select-none"
      aria-label="Pameran Berjalan Karya Pilihan"
    >
      {/* Kontrol Header Marquee */}
      <div className="w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 mx-auto mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">
            Pameran Berjalan &bull; {selectedPhotos.length} Karya Pilihan
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Tombol Kecepatan */}
          <button
            type="button"
            onClick={() => {
              setSpeedMode((prev) => (prev === 'normal' ? 'slow' : prev === 'slow' ? 'fast' : 'normal'));
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 hover:text-amber-300 font-mono transition-colors cursor-pointer"
            title="Ubah kecepatan gerak"
          >
            <Gauge className="w-3 h-3 text-amber-400" />
            <span>
              {speedMode === 'slow' ? 'Santai (0.6x)' : speedMode === 'fast' ? 'Aktif (1.5x)' : 'Normal (1x)'}
            </span>
          </button>

          {/* Tombol Jeda / Lanjutkan */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 hover:text-white font-mono transition-colors cursor-pointer"
            title={isPaused ? 'Lanjutkan gerakan' : 'Jeda gerakan'}
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Putar</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-amber-400" />
                <span>Jeda</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Gradien Mask pada Tepi Layar */}
      <div className="w-full space-y-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        {/* Lintasan Atas (Bergerak ke Kiri) */}
        <div
          className="flex gap-4 w-max animate-marquee-left"
          style={{
            animationDuration: `${trackDuration}s`,
            animationPlayState: isPaused ? 'paused' : undefined,
          }}
        >
          {row1.map((photo, index) => (
            <div
              key={`r1-${photo.id}-${index}`}
              onClick={() => onSelectPhoto(photo)}
              className="w-[260px] sm:w-[320px] h-[190px] sm:h-[230px] rounded-2xl overflow-hidden relative group cursor-pointer shrink-0 border border-white/[0.08] hover:border-amber-400/60 transition-all duration-300 shadow-md"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                  {photo.category}
                </span>
                <span className="text-sm font-editorial text-white font-medium truncate">
                  {photo.title}
                </span>
                <span className="text-[11px] text-slate-400 font-light truncate mt-0.5">
                  {photo.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lintasan Bawah (Bergerak ke Kanan) */}
        <div
          className="flex gap-4 w-max animate-marquee-right"
          style={{
            animationDuration: `${trackDuration}s`,
            animationPlayState: isPaused ? 'paused' : undefined,
          }}
        >
          {row2.map((photo, index) => (
            <div
              key={`r2-${photo.id}-${index}`}
              onClick={() => onSelectPhoto(photo)}
              className="w-[260px] sm:w-[320px] h-[190px] sm:h-[230px] rounded-2xl overflow-hidden relative group cursor-pointer shrink-0 border border-white/[0.08] hover:border-amber-400/60 transition-all duration-300 shadow-md"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                  {photo.category}
                </span>
                <span className="text-sm font-editorial text-white font-medium truncate">
                  {photo.title}
                </span>
                <span className="text-[11px] text-slate-400 font-light truncate mt-0.5">
                  {photo.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
