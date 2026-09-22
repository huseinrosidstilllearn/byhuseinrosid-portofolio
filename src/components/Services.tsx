import React from 'react';
import { Briefcase, ArrowUpRight, MessageCircle } from 'lucide-react';
import { SERVICE_PACKAGES } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';

import type { ServicePackage } from '../types/portfolio';

interface ServicesProps {
  packages?: ServicePackage[];
}

export const Services: React.FC<ServicesProps> = ({ packages = SERVICE_PACKAGES }) => {
  const activePackages = packages && packages.length > 0 ? packages : SERVICE_PACKAGES;

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
            Komisi & Penugasan Visual
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
          Setiap penugasan dirancang secara seksama untuk menghidupkan narasi visual yang jujur, berkarakter, dan bertahan melintasi waktu.
        </p>
      </div>

      {/* Services 3 Bento Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activePackages.map((service, index) => {
          const numberLabel = `0${index + 1}`;

          return (
            <div
              key={service.id}
              className="bento-card p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400/40 transition-all duration-500"
            >
              <div>
                {/* Top Number & Category */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]">
                  <span className="font-mono text-xs text-amber-400 font-semibold tracking-widest">
                    {numberLabel} / PENUGASAN
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                    {service.category}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl font-medium text-white mb-2.5 group-hover:text-amber-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                  {service.tagline}
                </p>

                {/* Scope of Assignment */}
                <div className="pt-4 border-t border-white/[0.08] mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-3">
                    Cakupan Penugasan:
                  </span>
                  <ul className="space-y-2.5">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-light leading-relaxed">
                        <span className="text-amber-400 font-serif select-none mt-[-1px]">&mdash;</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer & Action */}
              <div className="pt-5 border-t border-white/[0.08] mt-6">
                <p className="text-[11px] text-slate-400 italic mb-5 leading-relaxed">
                  {service.note}
                </p>

                <a
                  href={createWhatsAppLink(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2.5 bg-white/[0.05] hover:bg-amber-500 hover:text-slate-950 text-white border border-white/10 hover:border-amber-400 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Konsultasikan Penugasan</span>
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
