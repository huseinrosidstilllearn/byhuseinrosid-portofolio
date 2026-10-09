import React, { useMemo, useState, useEffect, useRef } from 'react';
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);
  const speedMode = config?.speed || 'normal';

  // Hentikan animasi marquee saat elemen berada di luar layar untuk menghemat CPU & GPU
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Filter foto dengan batas jumlah item yang optimal untuk performa
  const selectedPhotos = useMemo(() => {
    const sourcePhotos = photos.length > 0 ? photos : PORTFOLIO_PHOTOS;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxLimit = isMobile ? Math.min(config?.maxItems || 8, 8) : (config?.maxItems || 12);

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

    // 3. Fallback jika foto featured belum cukup
    return sourcePhotos.slice(0, Math.min(10, maxLimit));
  }, [photos, config]);

  // Bagi foto menjadi dua baris independen (genap & ganjil)
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

    const finalSet1 = set1.length >= 2 ? set1 : selectedPhotos;
    const finalSet2 = set2.length >= 2 ? set2 : [...selectedPhotos].reverse();

    const duplicated1 = [...finalSet1, ...finalSet1];
    const duplicated2 = [...finalSet2, ...finalSet2];

    const speedPx = speedMode === 'slow' ? 14 : speedMode === 'fast' ? 36 : 22;
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
      ref={sectionRef}
      className="w-full py-4 sm:py-6 overflow-hidden marquee-container relative z-10 select-none group/marquee"
      aria-label="Pameran Berjalan Karya Pilihan"
      style={{ contain: 'layout paint', transform: 'translateZ(0)' }}
    >
      {/* Zero-cost pointer-events-none side gradients adapt to current theme */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-20 pointer-events-none transition-colors duration-200" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-20 pointer-events-none transition-colors duration-200" />

      <div className="w-full space-y-4">
        {/* Lintasan Atas (Bergerak ke Kiri) */}
        <div
          className="flex gap-4 w-max animate-marquee-left group-hover/marquee:[animation-play-state:paused]"
          style={{
            animationDuration: `${trackDuration}s`,
            animationPlayState: isInView ? undefined : 'paused',
            willChange: 'transform',
          }}
        >
          {row1.map((photo, index) => (
            <div
              key={`r1-${photo.id}-${index}`}
              onClick={() => onSelectPhoto(photo)}
              className="w-[220px] sm:w-[320px] h-[150px] sm:h-[220px] rounded-2xl overflow-hidden relative group cursor-pointer shrink-0 border border-black/[0.08] dark:border-white/[0.08] hover:border-amber-400/60 transition-all duration-300 shadow-md bg-white dark:bg-[#0D1017] bento-card"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale-0 sm:grayscale sm:group-hover:grayscale-0 sm:group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          ))}
        </div>

        {/* Lintasan Bawah (Bergerak ke Kanan) */}
        <div
          className="flex gap-4 w-max animate-marquee-right group-hover/marquee:[animation-play-state:paused]"
          style={{
            animationDuration: `${trackDuration}s`,
            animationPlayState: isInView ? undefined : 'paused',
            willChange: 'transform',
          }}
        >
          {row2.map((photo, index) => (
            <div
              key={`r2-${photo.id}-${index}`}
              onClick={() => onSelectPhoto(photo)}
              className="w-[220px] sm:w-[320px] h-[150px] sm:h-[220px] rounded-2xl overflow-hidden relative group cursor-pointer shrink-0 border border-black/[0.08] dark:border-white/[0.08] hover:border-amber-400/60 transition-all duration-300 shadow-md bg-white dark:bg-[#0D1017] bento-card"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale-0 sm:grayscale sm:group-hover:grayscale-0 sm:group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
