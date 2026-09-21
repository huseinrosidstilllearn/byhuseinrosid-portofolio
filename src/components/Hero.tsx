import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, MessageCircle, MapPin, Pause, Play } from 'lucide-react';
import { PHOTOGRAPHER_PROFILE } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

interface HeroProps {
  onExploreClick?: () => void;
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
    title: 'Senyap di Kaki Bromo',
    category: 'Lanskap',
    location: 'Taman Nasional Bromo Tengger Semeru',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
    tagline: 'Keheningan kabut fajar yang merayap di lautan pasir kaldera sebelum fajar merekah.',
  },
  {
    id: 'frame-02',
    number: '02',
    title: 'Garis Bayang di Sudut Kota',
    category: 'Dokumenter',
    location: 'Surabaya, Jawa Timur',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1920&q=85',
    tagline: 'Permainan siluet dan cahaya kontras yang membelah geometri arsitektur kota tua.',
  },
  {
    id: 'frame-03',
    number: '03',
    title: 'Keteguhan dalam Diam',
    category: 'Portrait',
    location: 'Surabaya',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1920&q=85',
    tagline: 'Eksplorasi potret wajah dengan pencahayaan chiaroscuro yang menghormati karakter subjek.',
  },
  {
    id: 'frame-04',
    number: '04',
    title: 'Refleksi Keanggunan Minimalis',
    category: 'Komersial',
    location: 'Studio Surabaya',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=85',
    tagline: 'Kampanye editorial busana dengan tekstur kain alami dan pencahayaan studio terarah.',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto advance slides every 7 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveFrameIndex((prev) => (prev + 1) % FEATURED_HERO_FRAMES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeFrame = FEATURED_HERO_FRAMES[activeFrameIndex];

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden select-none">
      {/* Background Photographic Canvas with Smooth Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {FEATURED_HERO_FRAMES.map((frame, index) => {
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

      {/* Main Editorial Hero Content - Center Aligned */}
      <div className="relative z-30 max-w-4xl mx-auto my-auto text-center flex flex-col items-center">
        {/* Prestige Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-[#0E1118]/80 backdrop-blur-xl text-amber-300 text-[11px] font-semibold uppercase tracking-[0.25em] mb-6 sm:mb-8 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Arsip Visual &bull; Portofolio Fotografi &bull; Surabaya, ID</span>
        </div>

        {/* Monumental Bold Editorial Headline with Split Letter Wave */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.06] tracking-tight text-white max-w-4xl drop-shadow-md mx-auto">
          Stories Told in the{' '}
          <span
            className="italic text-amber-400 font-bold inline-block split-wave cursor-pointer"
            aria-label="Quiet Spaces"
          >
            <span aria-hidden="true">
              {'Quiet Spaces'.split('').map((char, i) => (
                <i
                  key={i}
                  style={{ '--i': i } as React.CSSProperties}
                  className={char === ' ' ? 'inline-block w-2 sm:w-4' : ''}
                >
                  {char}
                </i>
              ))}
            </span>
          </span>{' '}
          Between Moments.
        </h1>

        {/* Narrative Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mt-6 max-w-2xl mx-auto text-balance">
          {PHOTOGRAPHER_PROFILE.subheadline} Menghidupkan kembali keheningan, kejujuran rasa, dan keindahan setiap tarikan napas melalui lensa dokumenter dan komersial berstandar tinggi.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10 mx-auto">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_24px_rgba(245,158,11,0.45)] hover:scale-105 cursor-pointer"
          >
            <span>Jelajahi Galeri Karya</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <a
            href={createWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/25 hover:border-amber-400 bg-white/[0.05] hover:bg-white/10 backdrop-blur-xl text-white hover:text-amber-300 font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg"
          >
            <MessageCircle className="w-4 h-4 text-amber-400" />
            <span>Minta Penawaran Sesi</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 mt-5 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-slate-400 text-xs font-light">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Berbasis di Surabaya &bull; Siap Penugasan Seluruh Nusantara</span>
        </div>
      </div>

      {/* Bottom Exhibition HUD: Active Frame Info & Chapter Switcher */}
      <div className="relative z-30 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Active Curated Frame Metadata */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl flex flex-col items-center justify-center text-amber-400 shrink-0 shadow-lg">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Arsip</span>
            <span className="font-editorial text-lg font-bold text-amber-400 leading-none">{activeFrame.number}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                {activeFrame.category}
              </span>
              <span className="text-xs text-slate-400 font-light">
                {activeFrame.location} &bull; {activeFrame.year}
              </span>
            </div>
            <h3 className="font-editorial text-xl sm:text-2xl text-white font-medium mt-1">
              {activeFrame.title}
            </h3>
            <p className="text-xs text-slate-400 font-light mt-0.5 max-w-md hidden sm:block">
              {activeFrame.tagline}
            </p>
          </div>
        </div>

        {/* Right: Chapter Switcher Tabs & Progress Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1.5 rounded-2xl bg-[#0E1118]/85 border border-white/15 backdrop-blur-xl shadow-2xl">
            {FEATURED_HERO_FRAMES.map((frame, index) => {
              const isActive = index === activeFrameIndex;
              return (
                <button
                  key={frame.id}
                  onClick={() => {
                    setActiveFrameIndex(index);
                    setIsPlaying(false);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs transition-all duration-300 cursor-pointer ${
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

            {/* Play / Pause Toggle Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 ml-1 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isPlaying ? 'Jeda rotasi otomatis' : 'Lanjutkan rotasi otomatis'}
              aria-label={isPlaying ? 'Jeda rotasi otomatis' : 'Lanjutkan rotasi otomatis'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
