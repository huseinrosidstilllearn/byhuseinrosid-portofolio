import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICE_PACKAGES } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

export const Services: React.FC = () => {
  return (
    <section id="layanan" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto scroll-mt-24 border-t border-[#1A1A1A]/10 dark:border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#1A1A1A]/10 dark:border-white/10 mb-16">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355] font-semibold block mb-3">
            04 &bull; Kolaborasi & Sesi Foto
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl text-[#1A1A1A] dark:text-[#F3EFEA] font-normal tracking-tight">
            Katalog Layanan
          </h2>
        </div>

        <p className="max-w-md text-sm sm:text-base text-[#1A1A1A]/70 dark:text-[#F3EFEA]/70 font-light leading-relaxed">
          Setiap penugasan dirancang secara seksama untuk mewujudkan visi visual dan cerita unik Anda.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
        {SERVICE_PACKAGES.map((service, index) => {
          const isFeatured = index === 0;

          return (
            <div
              key={service.id}
              className={`flex flex-col justify-between p-8 sm:p-10 transition-colors duration-300 ${
                isFeatured
                  ? 'bg-[#1A1A1A] text-[#FAF8F5] dark:bg-[#151720] dark:text-[#F3EFEA]'
                  : 'bg-[#F3EFEA]/60 dark:bg-white/[0.02] text-[#1A1A1A] dark:text-[#F3EFEA] border border-[#1A1A1A]/10 dark:border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355] font-semibold">
                    0{index + 1} &bull; {service.category}
                  </span>
                  {isFeatured && (
                    <span className="text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 bg-[#8B7355] text-white font-medium">
                      Paling Diminati
                    </span>
                  )}
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-normal mb-3">
                  {service.title}
                </h3>

                <p className={`text-sm font-light leading-relaxed mb-8 ${
                  isFeatured ? 'text-[#FAF8F5]/80' : 'text-[#8A857D]'
                }`}>
                  {service.tagline}
                </p>

                <div className="space-y-6 pt-6 border-t border-current/15">
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-70 font-medium">
                    Cakupan Penugasan:
                  </div>
                  <ul className="space-y-3">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-light">
                        <Check className="w-3.5 h-3.5 text-[#8B7355] shrink-0 mt-0.5" />
                        <span className="opacity-90">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-10 border-t border-current/15 flex flex-col gap-4">
                <p className="text-xs opacity-70 italic">
                  {service.note}
                </p>

                <a
                  href={createWhatsAppLink(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-between w-full pt-2 pb-1 text-xs uppercase tracking-[0.22em] font-medium transition-colors border-b ${
                    isFeatured
                      ? 'border-[#FAF8F5]/30 hover:border-[#FAF8F5] text-[#FAF8F5]'
                      : 'border-[#1A1A1A]/30 dark:border-white/30 hover:border-[#8B7355] text-[#1A1A1A] dark:text-[#F3EFEA] hover:text-[#8B7355]'
                  }`}
                >
                  <span>Minta Penawaran Sesi</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
