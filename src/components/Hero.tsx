import React, { useState, useEffect, useMemo } from 'react';
import { ArrowDown, ArrowUpRight, MessageCircle, MapPin } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';

import type { PhotographerProfile, ContactConfig, PhotoItem, HeroSliderConfig } from '../types/portfolio';

interface HeroProps {
  photos?: PhotoItem[];
  onExploreClick?: () => void;
  profile?: PhotographerProfile;
  contact?: ContactConfig;
  config?: HeroSliderConfig;
}

interface HeroFrame {
  id: string;
  number: string;
  title: string;
  category: string;
  location: string;
  year: string;
  imageUrl: string;
  tagline: string;
}

const FEATURED_HERO_FRAMES: HeroFrame[] = [
  {
    id: 'frame-01',
    number: '01',
    title: 'Khitanan Massal IPHI JATIM #39',
    category: 'Event Documentation',
    location: 'Wates, Blitar',
    year: '2022',
    imageUrl: 'https://photos.byhuseinrosid.my.id/photos/1791379720825-DSC07976.webp',
    tagline: 'Merekam atmosfer, dinamika acara, dan memori kebersamaan yang otentik.',
  },
  {
    id: 'frame-02',
    number: '02',
    title: 'Graduation of Aifi #36',
    category: 'Graduation',
    location: 'UIN Sunan Ampel Surabaya',
    year: '2025',
    imageUrl: 'https://photos.byhuseinrosid.my.id/photos/1791302624013-DSC05030.webp',
    tagline: 'Mengabadikan senyum kebanggaan, pelukan hangat keluarga, dan tonggak kelulusan.',
  },
  {
    id: 'frame-03',
    number: '03',
    title: 'Couple of Michelle & Samuel #5',
    category: 'Couple Session',
    location: 'Surabaya',
    year: '2025',
    imageUrl: 'https://photos.byhuseinrosid.my.id/photos/1791303743989-DSC07603.webp',
    tagline: 'Merekam kehangatan tatapan, tawa lepas, dan romansa otentik dua insan.',
  },
];

export const Hero: React.FC<HeroProps> = ({ photos = [], onExploreClick, profile, contact, config }) => {
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Susun frame hero berdasarkan konfigurasi pilihan pengguna di admin atau fallback cerdas beda-kategori
  const heroFrames: HeroFrame[] = useMemo(() => {
    const activeConfigSlides = config?.slides?.filter((s) => s.enabled) || [];

    // 1. Jika konfigurasi tersimpan dengan slide aktif tersedia
    if (activeConfigSlides.length > 0 && photos.length > 0) {
      const frames: HeroFrame[] = [];
      activeConfigSlides.forEach((slide, idx) => {
        const categoryPhotos = photos.filter((p) => p.category === slide.category);

        let targetPhoto: PhotoItem | undefined;
        // Jika memilih foto spesifik
        if (slide.photoId && slide.photoId !== 'auto') {
          targetPhoto = photos.find((p) => p.id === slide.photoId);
        }
        // Jika mode otomatis (atau foto spesifik tidak ditemukan lagi)
        if (!targetPhoto && categoryPhotos.length > 0) {
          targetPhoto = categoryPhotos.find((p) => p.featured) || categoryPhotos[0];
        }
        // Fallback cadangan
        if (!targetPhoto) {
          targetPhoto = photos[idx % photos.length];
        }

        if (targetPhoto) {
          frames.push({
            id: `${slide.id}-${targetPhoto.id}`,
            number: String(idx + 1).padStart(2, '0'),
            title: slide.customTitle || targetPhoto.title,
            category: slide.category,
            location: targetPhoto.location || (profile?.location ? profile.location.split(',')[0].trim() : 'Surabaya'),
            year: targetPhoto.year || '2025',
            imageUrl: targetPhoto.imageUrl,
            tagline: slide.customTagline || targetPhoto.description || targetPhoto.title,
          });
        }
      });

      if (frames.length > 0) return frames;
    }

    // 2. Fallback cerdas: Utamakan 3 pilar kategori fokus (Dokumentasi, Wisuda, Couple Session)
    if (photos.length > 0) {
      const focusCategories = ['Event Documentation', 'Graduation', 'Couple Session'];
      const matchedPhotos: PhotoItem[] = [];

      focusCategories.forEach((cat) => {
        const found =
          photos.find((p) => p.category === cat && p.featured) ||
          photos.find((p) => p.category === cat);
        if (found) {
          matchedPhotos.push(found);
        }
      });

      // Jika ada kategori fokus yang belum memiliki foto di database, lengkapi dengan foto terbaik lainnya
      if (matchedPhotos.length < 3) {
        for (const p of photos) {
          if (!matchedPhotos.some((m) => m.id === p.id)) {
            matchedPhotos.push(p);
            if (matchedPhotos.length >= 3) break;
          }
        }
      }

      return matchedPhotos.map((p, idx) => ({
        id: p.id,
        number: String(idx + 1).padStart(2, '0'),
        title: p.title,
        category: p.category,
        location: p.location || (profile?.location ? profile.location.split(',')[0].trim() : 'Surabaya'),
        year: p.year || '2025',
        imageUrl: p.imageUrl,
        tagline: p.description || p.title,
      }));
    }

    return FEATURED_HERO_FRAMES;
  }, [photos, config, profile]);

  const intervalSeconds = (config?.intervalSeconds || 7) * 1000;
  const isAutoRotate = config?.autoRotate !== false;

  // Rotasi slide otomatis
  useEffect(() => {
    if (!isPlaying || !isAutoRotate || heroFrames.length <= 1) return;
    const timer = setInterval(() => {
      setActiveFrameIndex((prev) => (prev + 1) % heroFrames.length);
    }, intervalSeconds);
    return () => clearInterval(timer);
  }, [isPlaying, isAutoRotate, intervalSeconds, heroFrames.length]);

  // Jaga index dalam batas valid jika jumlah frame berubah
  useEffect(() => {
    if (activeFrameIndex >= heroFrames.length) {
      setActiveFrameIndex(0);
    }
  }, [heroFrames.length, activeFrameIndex]);

  const activeFrame = heroFrames[activeFrameIndex] || heroFrames[0];

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between pt-16 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-6 lg:px-12 overflow-hidden select-none">
      {/* Background Photographic Canvas with Smooth Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroFrames.map((frame, index) => {
          const isActive = index === activeFrameIndex;
          return (
            <div
              key={frame.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={frame.imageUrl}
                alt={frame.title}
                className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Cinematic Multi-Layer Dark Vignette & Atmospheric Gradients */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/45" />
        <div className="absolute inset-0 z-20 bg-radial from-transparent via-[#050505]/40 to-[#050505]/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-20" />
      </div>

      {/* Main Editorial Hero Content: Viewport Disciplined */}
      <div className="relative z-30 max-w-4xl mx-auto my-auto text-center flex flex-col items-center">
        {/* Prestige Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-amber-300 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] mb-3 sm:mb-6">
          <span>Portofolio Fotografi &bull; {profile?.location ? profile.location.split(',')[0].trim() : 'Surabaya'}</span>
        </div>

        {/* Monumental Architectural Headline */}
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.06] sm:leading-[1.03] tracking-tighter text-white max-w-4xl drop-shadow-md mx-auto">
          {profile?.headline && profile.headline.includes('Quiet Spaces') ? (
            <>
              {profile.headline.split('Quiet Spaces')[0]}
              <span
                className="font-couture text-amber-400 font-bold inline-block split-wave cursor-pointer leading-[1.15] pb-1"
                aria-label="Quiet Spaces"
              >
                <span aria-hidden="true">
                  {'Quiet Spaces'.split('').map((char, i) => (
                    <i
                      key={i}
                      style={{ '--i': i } as React.CSSProperties}
                      className={char === ' ' ? 'inline-block w-1.5 sm:w-4' : ''}
                    >
                      {char}
                    </i>
                  ))}
                </span>
              </span>
              {profile.headline.split('Quiet Spaces')[1]}
            </>
          ) : profile?.headline ? (
            profile.headline
          ) : (
            <>
              Stories Told in the{' '}
              <span
                className="font-couture text-amber-400 font-bold inline-block split-wave cursor-pointer leading-[1.15] pb-1"
                aria-label="Quiet Spaces"
              >
                <span aria-hidden="true">
                  {'Quiet Spaces'.split('').map((char, i) => (
                    <i
                      key={i}
                      style={{ '--i': i } as React.CSSProperties}
                      className={char === ' ' ? 'inline-block w-1.5 sm:w-4' : ''}
                    >
                      {char}
                    </i>
                  ))}
                </span>
              </span>{' '}
              Between Moments.
            </>
          )}
        </h1>

        {/* Narrative Subheadline: Strictly concise per taste-skill */}
        <p className="text-xs sm:text-base md:text-lg text-slate-300 font-light leading-relaxed mt-3 sm:mt-5 max-w-xl mx-auto text-balance">
          {profile?.subheadline || 'Dokumentasi sinematik dan eksplorasi visual yang menangkap kejujuran rasa, karakter, dan keindahan abadi di setiap momen.'}
        </p>

        {/* Action Button Row: Tactile Spring Physics */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-5 sm:mt-8 mx-auto">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] active:translate-y-[1px] text-slate-950 font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_4px_24px_rgba(245,158,11,0.45)] cursor-pointer"
          >
            <span>Jelajahi Showcase</span>
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <a
            href={contact?.whatsappNumber ? `https://wa.me/${contact.whatsappNumber}?text=Halo%20Mas%20Husein%2C%20saya%20tertarik%20untuk%20berkolaborasi!` : createWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3 rounded-full border border-white/20 hover:border-amber-400/80 active:scale-[0.98] active:translate-y-[1px] bg-white/[0.05] hover:bg-white/10 backdrop-blur-xl text-white hover:text-amber-300 font-semibold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>Konsultasi Sesi</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Exhibition HUD: Active Frame Info & Chapter Switcher */}
      <div className="relative z-30 pt-4 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-20 md:pb-0 md:pr-20 lg:pr-24">
        {/* Left: Active Curated Frame Metadata */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl flex flex-col items-center justify-center text-amber-400 shrink-0 shadow-lg">
            <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-widest text-slate-400">Arsip</span>
            <span className="font-editorial text-sm sm:text-base font-bold text-amber-400 leading-none">{activeFrame.number}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-300">
                {activeFrame.category}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-light flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400/80" />
                <span>{activeFrame.location} &bull; {activeFrame.year}</span>
              </span>
            </div>
            <h3 className="font-editorial text-base sm:text-xl text-white font-medium mt-0.5 line-clamp-1 sm:line-clamp-none">
              {activeFrame.title}
            </h3>
          </div>
        </div>

        {/* Right: Chapter Switcher Tabs & Progress Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center p-1 sm:p-1.5 rounded-2xl bg-[#0E1118]/85 border border-white/15 backdrop-blur-xl shadow-2xl overflow-x-auto no-scrollbar max-w-full">
            {heroFrames.map((frame, index) => {
              const isActive = index === activeFrameIndex;
              return (
                <button
                  key={frame.id}
                  onClick={() => {
                    setActiveFrameIndex(index);
                    setIsPlaying(false);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06] font-medium'
                  }`}
                  aria-label={`Lihat karya ${frame.title}`}
                >
                  <span className="text-[10px] opacity-75">{frame.number}</span>
                  <span className="hidden sm:inline tracking-wider">{frame.category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
