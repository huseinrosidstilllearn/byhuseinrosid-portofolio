import React from 'react';
import { PHOTO_STORIES } from '../data/portfolioData';

export const PhotoStories: React.FC = () => {
  return (
    <section id="kisah" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto scroll-mt-24 border-t border-[#1A1A1A]/10 dark:border-white/10">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#1A1A1A]/10 dark:border-white/10 mb-20">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] font-semibold block mb-3">
            02 &bull; Esai & Cerita Visual
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal tracking-tight">
            Kisah di Balik Lensa
          </h2>
        </div>

        <p className="max-w-md text-sm sm:text-base text-[#1A1A1A]/70 dark:text-[#F3EFEA]/70 font-light leading-relaxed">
          Eksplorasi narasi mendalam yang dirangkai dari dialog hening antara fotografer, subjek, dan lanskap kehidupan.
        </p>
      </div>

      {/* Stories Sequence */}
      <div className="space-y-32 sm:space-y-44">
        {PHOTO_STORIES.map((story, index) => (
          <article key={story.id} className="space-y-12 sm:space-y-16">
            {/* Story Meta Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#1A1A1A]/10 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="font-editorial text-xl text-[#8B7355] font-medium">
                  0{index + 1}
                </span>
                <span className="text-xs uppercase tracking-[0.22em] text-[#8A857D] font-medium">
                  {story.category}
                </span>
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#8A857D]">
                {story.location} &bull; {story.year}
              </div>
            </div>

            {/* Story Main Cover Image */}
            <div className="overflow-hidden bg-[#F3EFEA] dark:bg-[#16181F] max-h-[75vh]">
              <img
                src={story.coverImage}
                alt={story.title}
                loading="lazy"
                className="w-full h-full object-cover max-h-[75vh]"
              />
            </div>

            {/* Story Editorial Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 pt-4">
              {/* Title & Subtitle */}
              <div className="lg:col-span-5">
                <h3 className="font-editorial text-3xl sm:text-5xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal leading-snug">
                  {story.title}
                </h3>
                <p className="text-sm font-medium text-[#8B7355] mt-3 italic">
                  {story.subtitle}
                </p>
              </div>

              {/* Narrative & Pull Quote */}
              <div className="lg:col-span-7 space-y-8">
                <p className="text-base sm:text-lg text-[#1A1A1A]/85 dark:text-[#F3EFEA]/85 font-light leading-relaxed">
                  {story.narrative}
                </p>

                {/* Minimal Pull Quote */}
                <div className="py-6 border-y border-[#1A1A1A]/10 dark:border-white/10 my-8">
                  <blockquote className="font-editorial italic text-xl sm:text-2xl text-[#1A1A1A] dark:text-[#F3EFEA] leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                  <cite className="block text-xs uppercase tracking-widest text-[#8B7355] font-medium mt-3 not-italic">
                    &mdash; Catatan Husein Rosid
                  </cite>
                </div>

                {/* Thumbnail Strip */}
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A857D] font-medium block mb-3">
                    Dokumentasi Tambahan
                  </span>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {story.images.map((img, i) => (
                      <div
                        key={i}
                        className="overflow-hidden bg-[#F3EFEA] dark:bg-[#16181F] aspect-[4/3]"
                      >
                        <img
                          src={img}
                          alt={`${story.title} thumbnail ${i + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
