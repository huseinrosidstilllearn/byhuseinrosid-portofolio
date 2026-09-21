import React from 'react';
import { BookOpen, MapPin, Calendar, Quote } from 'lucide-react';
import { PHOTO_STORIES } from '../data/portfolioData';

export const PhotoStories: React.FC = () => {
  return (
    <section id="kisah" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
      {/* Stories Bento Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Esai Foto & Narasi</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-white font-medium">
            Kisah di Balik Lensa
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
          Eksplorasi cerita mendalam yang dirangkai dari dialog hening antara fotografer, subjek, dan lanskap kehidupan.
        </p>
      </div>

      {/* Bento Stories Exhibition */}
      <div className="space-y-8 sm:space-y-12">
        {PHOTO_STORIES.map((story, idx) => (
          <div
            key={story.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 bento-card p-6 sm:p-8 relative overflow-hidden"
          >
            {/* Story Visual Tile (7 cols) */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[440px] group">
              <img
                src={story.coverImage}
                alt={story.title}
                loading="lazy"
                className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-between p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                    Esai 0{idx + 1} &bull; {story.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-white font-medium">
                    {story.title}
                  </h3>
                  <p className="text-xs text-amber-300/90 font-light mt-1 italic">
                    {story.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Story Narrative & Thumbnails Bento (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-light mb-4 pb-3 border-b border-white/[0.08]">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{story.location}</span>
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{story.year}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {story.narrative}
                </p>

                {/* Pull Quote Card */}
                <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] relative">
                  <Quote className="w-5 h-5 text-amber-500/30 absolute top-3 right-3" />
                  <p className="font-editorial text-sm italic text-slate-200 leading-relaxed pr-6">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <span className="block text-[10px] uppercase tracking-wider text-amber-400 font-medium mt-2">
                    &mdash; Catatan Husein Rosid
                  </span>
                </div>
              </div>

              {/* Thumbnails Bento Row */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold block mb-2.5">
                  Dokumentasi Seri
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {story.images.map((img, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden aspect-[4/3] border border-white/10 group cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`${story.title} ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
