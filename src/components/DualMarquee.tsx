import React from 'react';
import { PORTFOLIO_PHOTOS } from '../data/portfolioData';
import type { PhotoItem } from '../types/portfolio';

interface DualMarqueeProps {
  onSelectPhoto: (photo: PhotoItem) => void;
}

export const DualMarquee: React.FC<DualMarqueeProps> = ({ onSelectPhoto }) => {
  // Split photos into two rows
  const row1 = [...PORTFOLIO_PHOTOS, ...PORTFOLIO_PHOTOS];
  const row2 = [...PORTFOLIO_PHOTOS].reverse().concat([...PORTFOLIO_PHOTOS].reverse());

  return (
    <section className="w-full py-8 overflow-hidden marquee-container relative z-10" aria-label="Infinite Dual Marquee Gallery">
      {/* Edge gradient mask for smooth fading */}
      <div className="w-full space-y-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        
        {/* Top Track — Glides Left */}
        <div className="flex gap-4 w-max animate-marquee-left">
          {row1.map((photo, index) => (
            <div
              key={`row1-${photo.id}-${index}`}
              onClick={() => onSelectPhoto(photo)}
              className="w-[260px] sm:w-[320px] h-[190px] sm:h-[230px] rounded-2xl overflow-hidden relative group cursor-pointer shrink-0 border border-white/[0.08] hover:border-amber-400/50 transition-all duration-300"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                  {photo.category}
                </span>
                <span className="text-sm font-editorial text-white font-medium truncate">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Track — Glides Right */}
        <div className="flex gap-4 w-max animate-marquee-right">
          {row2.map((photo, index) => (
            <div
              key={`row2-${photo.id}-${index}`}
              onClick={() => onSelectPhoto(photo)}
              className="w-[260px] sm:w-[320px] h-[190px] sm:h-[230px] rounded-2xl overflow-hidden relative group cursor-pointer shrink-0 border border-white/[0.08] hover:border-amber-400/50 transition-all duration-300"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                  {photo.category}
                </span>
                <span className="text-sm font-editorial text-white font-medium truncate">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
