import React from 'react';
import { Check, MessageCircle, Sparkles } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { SERVICE_PACKAGES } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';
import { StaggerContainer } from './animations/StaggerContainer';

interface ServicePackage {
  id: string;
  category: string;
  title: string;
  tagline: string;
  features: string[];
  note: string;
}

const ServiceCard: React.FC<{ service: ServicePackage; index: number; isFeatured: boolean }> = ({ service, isFeatured }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(245,158,11,0.06), transparent 60%)`;

  return (
    <div className="relative group rounded-3xl h-full flex flex-col">
      {/* Pulse glow for featured */}
      {isFeatured && (
        <motion.div 
          className="absolute -inset-1 bg-amber-500/30 rounded-[2rem] blur-xl z-0"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Rotating gradient border wrapper */}
      <div className="relative h-full overflow-hidden rounded-3xl p-[1px] z-10 flex flex-col">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0%,#f59e0b_33%,#ea580c_66%,#fbbf24_100%)] opacity-40 group-hover:opacity-100 transition-opacity duration-500 z-0"
        />

        {/* Card Content */}
        <div 
          onMouseMove={handleMouseMove}
          className={`relative h-full flex flex-col justify-between p-8 rounded-[23px] transition-all duration-300 overflow-hidden z-10 ${
            isFeatured
              ? 'bg-slate-900/95 dark:bg-[#090d16]/95 text-white'
              : 'bg-white/95 dark:bg-[#111827]/95 text-slate-900 dark:text-white'
          }`}
        >
          {/* Spotlight */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[23px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{ background }}
          />

          {isFeatured && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md z-20">
              <Sparkles className="w-3 h-3" />
              <span>Paling Diminati</span>
            </div>
          )}

          <div className="relative z-10 flex-grow">
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

          <div className="relative z-10 pt-6 border-t border-slate-200/50 dark:border-white/10 mt-auto">
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
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  return (
    <section id="layanan" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-[#0c121e]/60 border-t border-slate-200 dark:border-white/5 scroll-mt-20 overflow-hidden">
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
        <StaggerContainer 
          direction="up" 
          stagger={0.12} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SERVICE_PACKAGES.map((service, index) => {
            const isFeatured = index === 0;
            return (
              <ServiceCard 
                key={service.id} 
                service={service as ServicePackage} 
                index={index} 
                isFeatured={isFeatured} 
              />
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
