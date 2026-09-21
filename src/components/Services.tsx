import React from 'react';
import { Briefcase, Check, ArrowUpRight, Sparkles, MessageCircle } from 'lucide-react';
import { SERVICE_PACKAGES } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

export const Services: React.FC = () => {
  return (
    <section id="layanan" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Kolaborasi & Penugasan</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-white font-medium">
            Katalog Layanan
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
          Setiap penugasan dirancang secara seksama untuk mewujudkan visi visual dan cerita unik Anda.
        </p>
      </div>

      {/* Services 3 Bento Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SERVICE_PACKAGES.map((service, index) => {
          const isFeatured = index === 0;

          return (
            <div
              key={service.id}
              className={`bento-card p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden ${
                isFeatured ? 'border-amber-500/40 bg-gradient-to-b from-[#161A26]/80 to-[#0D0F16]/80' : ''
              }`}
            >
              {isFeatured && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 mb-4 self-start shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>Paling Diminati</span>
                </div>
              )}

              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-semibold block mb-2">
                  {service.category}
                </span>

                <h3 className="font-editorial text-2xl font-medium text-white mb-2">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                  {service.tagline}
                </p>

                <div className="pt-4 border-t border-white/[0.08] mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-3">
                    Cakupan Penugasan:
                  </span>
                  <ul className="space-y-2.5">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-white/[0.08] mt-6">
                <p className="text-[11px] text-slate-400 italic mb-4">
                  {service.note}
                </p>

                <a
                  href={createWhatsAppLink(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isFeatured
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Minta Penawaran</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
