import React from 'react';
import { motion } from 'framer-motion';
import { PHOTOGRAPHER_PROFILE, CONTACT_CONFIG } from '../../data/portfolioData';
import { JOURNEY_STATS } from '../../data/journeyData';
import type { PhotographerProfile, ContactConfig, JourneyStats } from '../../types/portfolio';

interface JourneyHeroProps {
  profile?: PhotographerProfile;
  contact?: ContactConfig;
  stats?: JourneyStats;
}

export const JourneyHero: React.FC<JourneyHeroProps> = ({
  profile = PHOTOGRAPHER_PROFILE,
  contact = CONTACT_CONFIG,
  stats = JOURNEY_STATS,
}) => {
  const statList = [
    { value: `${stats.yearsExperience}+`, label: 'Tahun Berkarya' },
    { value: `${stats.totalProjects}+`, label: 'Proyek Selesai' },
    { value: `${stats.citiesVisited}`, label: 'Kota Dijelajahi' },
    { value: `${stats.clientsServed}+`, label: 'Klien Dipercaya' },
  ];

  const waLink = `https://wa.me/${contact.whatsappNumber}?text=Halo%20Mas%20Husein%2C%20saya%20tertarik%20untuk%20berkolaborasi!`;

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-8 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

      <div className="relative w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — Portrait & Badge */}
          <motion.div
            className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-400/40 via-amber-500/20 to-transparent blur-lg" />
              <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border border-amber-500/20">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bento-card px-3 py-2 rounded-xl border border-amber-500/30">
                <p className="text-amber-400 text-xs font-mono tracking-widest uppercase">
                  {profile.location.split(',')[0] || 'Surabaya, ID'}
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card px-4 py-2 rounded-xl text-sm text-white/60 hover:text-amber-400 transition-colors border border-white/5 hover:border-amber-500/30"
              >
                {contact.instagram}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="bento-card px-4 py-2 rounded-xl text-sm text-white/60 hover:text-amber-400 transition-colors border border-white/5 hover:border-amber-500/30"
              >
                Email
              </a>
            </div>
          </motion.div>

          {/* Right — Text Content */}
          <motion.div
            className="lg:col-span-8 flex flex-col gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-amber-500" />
              <span className="text-amber-400 text-xs font-mono tracking-[0.25em] uppercase">
                Perjalanan Visual &bull; {profile.experienceYears}
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight text-white mb-4">
                Husein
                <br />
                <span className="text-amber-400">Rosid</span>
              </h1>
              <p className="text-white/50 text-sm font-mono tracking-widest uppercase">
                {profile.headline}
              </p>
            </div>

            {/* Bio */}
            <div className="bento-card p-6 rounded-2xl border border-white/5 max-w-2xl">
              <p className="text-white/75 leading-relaxed text-base">
                {profile.bioShort}
              </p>
              {profile.bioFull && profile.bioFull[0] && (
                <p className="text-white/55 leading-relaxed text-sm mt-3">
                  {profile.bioFull[0]}
                </p>
              )}
            </div>

            {/* Philosophy */}
            <blockquote className="border-l-2 border-amber-500/60 pl-4">
              <p className="text-white/60 text-sm italic leading-relaxed">
                "{profile.philosophy}"
              </p>
            </blockquote>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all duration-300 hover:scale-105"
              >
                <span>💬</span>
                <span>Hubungi via WhatsApp</span>
              </a>
              <a
                href="#timeline"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-amber-500/50 text-white/70 hover:text-white text-sm transition-all duration-300"
              >
                <span>Lihat Perjalanan</span>
                <span>↓</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {statList.map((stat) => (
            <div
              key={stat.label}
              className="bento-card p-5 rounded-2xl border border-white/5 text-center group hover:border-amber-500/30 transition-colors"
            >
              <p className="font-headline text-3xl sm:text-4xl font-black text-amber-400 group-hover:text-amber-300 transition-colors">
                {stat.value}
              </p>
              <p className="text-white/40 text-xs mt-1 tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
