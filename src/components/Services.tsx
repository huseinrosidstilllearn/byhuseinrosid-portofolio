import React from 'react';
import { Check, MessageCircle, Sparkles } from 'lucide-react';
import { SERVICE_PACKAGES } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

export const Services: React.FC = () => {
  return (
    <section id="layanan" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-[#0c121e]/60 border-t border-slate-200 dark:border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-500 mb-3 block">
            Kolaborasi & Sesi Foto
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-slate-900 dark:text-white font-medium">
            Katalog Layanan
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-light mt-3">
            Setiap penugasan dirancang secara seksama untuk mewujudkan visi visual dan cerita unik Anda.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICE_PACKAGES.map((service, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
                  isFeatured
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 dark:from-[#111827] dark:to-[#090d16] text-white shadow-2xl border-2 border-amber-500/40'
                    : 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 shadow-lg'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                    <Sparkles className="w-3 h-3" />
                    <span>Paling Diminati</span>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500 block mb-2">
                    {service.category}
                  </span>
                  
                  <h3 className="font-editorial text-2xl font-medium mb-3">
                    {service.title}
                  </h3>
                  
                  <p className={`text-xs sm:text-sm font-light leading-relaxed mb-6 ${
                    isFeatured ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    {service.tagline}
                  </p>

                  <div className="pt-4 border-t border-slate-200/50 dark:border-white/10 mb-6">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                      Cakupan Penugasan:
                    </h4>
                    <ul className="space-y-3">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-light">
                          <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className={isFeatured ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200/50 dark:border-white/10 mt-6">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mb-5">
                    {service.note}
                  </p>
                  
                  <a
                    href={createWhatsAppLink(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isFeatured
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.35)]'
                        : 'border border-slate-300 dark:border-white/20 hover:border-amber-500 hover:text-amber-500 dark:hover:text-amber-400'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-amber-500 group-hover:text-amber-400" />
                    <span>Minta Penawaran</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
