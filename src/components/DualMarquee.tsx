import React, { useMemo } from 'react';
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
  const speedMode = config?.speed || 'normal';

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
      className="w-full py-4 sm:py-6 overflow-hidden marquee-container relative z-10 select-none group/marquee"
      aria-label="Pameran Berjalan Karya Pilihan"
    >
      {/* Gradien Mask pada Tepi Layar */}
      <div className="w-full space-y-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        {/* Lintasan Atas (Bergerak ke Kiri) */}
        <div
          className="flex gap-4 w-max animate-marquee-left group-hover/marquee:[animation-play-state:paused]"
          style={{
            animationDuration: `${trackDuration}s`,
          }}
        >
          {row1.map((photo, index) => (
            <div
              key={`r1-${photo.id}-${index}`}
              onClick={() => onSelectPhoto(photo)}
              className="w-[230px] sm:w-[320px] h-[165px] sm:h-[230px] rounded-2xl overflow-hidden relative group cursor-pointer shrink-0 border border-white/[0.08] hover:border-amber-400/60 transition-all duration-300 shadow-md"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover sm:grayscale sm:contrast-[1.05] sm:group-hover:grayscale-0 sm:group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                  {photo.category}
                </span>
                <span className="text-xs sm:text-sm font-editorial text-white font-medium truncate">
                  {photo.title}
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-300 sm:text-slate-400 font-light truncate mt-0.5">
                  {photo.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lintasan Bawah (Bergerak ke Kanan) */}
        <div
          className="flex gap-4 w-max animate-marquee-right group-hover/marquee:[animation-play-state:paused]"
          style={{
            animationDuration: `${trackDuration}s`,
          }}
        >
          {row2.map((photo, index) => (
            <div
              key={`r2-${photo.id}-${index}`}
              onClick={() => onSelectPhoto(photo)}
              className="w-[230px] sm:w-[320px] h-[165px] sm:h-[230px] rounded-2xl overflow-hidden relative group cursor-pointer shrink-0 border border-white/[0.08] hover:border-amber-400/60 transition-all duration-300 shadow-md"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover sm:grayscale sm:contrast-[1.05] sm:group-hover:grayscale-0 sm:group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                  {photo.category}
                </span>
                <span className="text-xs sm:text-sm font-editorial text-white font-medium truncate">
                  {photo.title}
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-300 sm:text-slate-400 font-light truncate mt-0.5">
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
