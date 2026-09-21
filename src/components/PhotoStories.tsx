import React from 'react';
import { Quote, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { PHOTO_STORIES } from '../data/portfolioData';
import { BlurReveal } from './animations/BlurReveal';
import { ScrollReveal } from './animations/ScrollReveal';

export const PhotoStories: React.FC = () => {
  return (
    <section id="kisah" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-[#0c121e]/60 border-y border-slate-200 dark:border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-500 mb-3 block">
            Esai & Cerita Visual
          </span>
          <BlurReveal as="h2" className="font-editorial text-3xl sm:text-5xl text-slate-900 dark:text-white font-medium">
            Kisah di Balik Lensa
          </BlurReveal>
          <ScrollReveal variant="fade-up" delay={0.2}>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light mt-3">
              Eksplorasi narasi mendalam yang dirangkai dari dialog hening antara fotografer, subjek, dan lanskap kehidupan.
            </p>
          </ScrollReveal>
        </div>

        {/* Stories List */}
        <div className="space-y-28">
          {PHOTO_STORIES.map((story, index) => {
            const isReversed = index % 2 === 1;
            const imgVariant = isReversed ? 'fade-left' : 'fade-right';
            const textVariant = isReversed ? 'fade-right' : 'fade-left';

            return (
              <article
                key={story.id}
                className={`flex flex-col ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-12 lg:gap-16 items-center`}
              >
                {/* Images Visual Collage */}
                <ScrollReveal variant={imgVariant} className="w-full lg:w-7/12">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative group overflow-hidden rounded-2xl shadow-xl border border-slate-200 dark:border-white/10"
                  >
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-[380px] sm:h-[480px] object-cover transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8 pointer-events-none">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-amber-400">
                          {story.category}
                        </span>
                        <h3 className="font-editorial text-2xl sm:text-3xl text-white font-medium mt-1">
                          {story.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>

                  {/* Thumbnail Spread */}
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {story.images.map((img, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.08, zIndex: 10 }}
                        transition={{ duration: 0.3 }}
                        className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-white/5 h-24 sm:h-32"
                      >
                        <img
                          src={img}
                          alt={`${story.title} thumbnail ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Narrative & Editorial Copy */}
                <ScrollReveal variant={textVariant} className="w-full lg:w-5/12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs text-amber-500 dark:text-amber-400 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{story.location}</span>
                    <span>&bull;</span>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{story.year}</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-4xl text-slate-900 dark:text-white font-medium leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 italic">
                    {story.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-light leading-relaxed mt-6">
                    {story.narrative}
                  </p>

                  {/* Pull Quote */}
                  <ScrollReveal variant="fade-up" delay={0.2} className="mt-8 relative">
                    <blockquote className="p-6 rounded-2xl bg-amber-500/10 text-slate-800 dark:text-slate-200 relative overflow-hidden">
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="absolute left-0 top-0 w-1 bg-amber-500"
                      />
                      <Quote className="w-6 h-6 text-amber-500/40 absolute top-4 right-4" />
                      <p className="font-editorial italic text-base leading-relaxed relative z-10">
                        "{story.quote}"
                      </p>
                      <cite className="block text-xs uppercase tracking-wider text-amber-500 font-medium mt-3 not-italic relative z-10">
                        &mdash; Catatan Husein Rosid
                      </cite>
                    </blockquote>
                  </ScrollReveal>
                </ScrollReveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
