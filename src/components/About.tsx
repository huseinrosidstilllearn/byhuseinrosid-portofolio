import React, { useRef } from 'react';
import { MapPin, Compass, Eye, Heart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PHOTOGRAPHER_PROFILE } from '../data/portfolioData';
import { ScrollReveal } from './animations/ScrollReveal';
import { StaggerContainer } from './animations/StaggerContainer';
import { BlurReveal } from './animations/BlurReveal';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Moves the image at a slightly slower speed than scroll (parallax)
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={sectionRef} id="tentang" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Photographer Portrait Image */}
        <ScrollReveal variant="fade-right" className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Ambient Border Backdrop */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-transparent to-amber-500/10 blur-lg" />
            
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl h-[480px] sm:h-[560px]">
              <motion.img
                style={{ y: imageY, scale: 1.15 }}
                src={PHOTOGRAPHER_PROFILE.avatarUrl}
                alt="Husein Rosid — Fotografer"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-amber-400">
                  Fotografer & Visual Storyteller
                </span>
                <h3 className="font-editorial text-2xl font-medium mt-1">
                  Husein Rosid
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-300 mt-1 font-light">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Surabaya, Jawa Timur</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Biography & Philosophy Copy */}
        <ScrollReveal variant="fade-left" delay={0.15} className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-500 mb-3 block">
            Mengenal Lebih Dekat
          </span>
          
          <h2 className="font-editorial text-3xl sm:text-5xl text-slate-900 dark:text-white font-medium leading-tight">
            <BlurReveal>Mendengar Melalui Mata,</BlurReveal>
            <span className="italic text-amber-500/90 dark:text-amber-400">Bercerita Melalui Rasa.</span>
          </h2>

          <StaggerContainer direction="up" stagger={0.1} className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-light leading-relaxed mt-6">
            {PHOTOGRAPHER_PROFILE.bioFull.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </StaggerContainer>

          {/* Pillars of Visual Work */}
          <StaggerContainer direction="up" stagger={0.15} delay={0.3} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-200 dark:border-white/10">
            <div className="flex flex-col">
              <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-3 cursor-pointer">
                <Eye className="w-5 h-5" />
              </motion.div>
              <h4 className="font-editorial text-base text-slate-900 dark:text-white font-medium">
                Ketajaman Observasi
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Menemukan keindahan dalam detil kecil yang kerap terlewatkan mata biasa.
              </p>
            </div>

            <div className="flex flex-col">
              <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-3 cursor-pointer">
                <Heart className="w-5 h-5" />
              </motion.div>
              <h4 className="font-editorial text-base text-slate-900 dark:text-white font-medium">
                Kejujuran Emosi
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Tanpa kepura-puraan; membiarkan subjek tampil apa adanya dengan rasa nyaman.
              </p>
            </div>

            <div className="flex flex-col">
              <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-3 cursor-pointer">
                <Compass className="w-5 h-5" />
              </motion.div>
              <h4 className="font-editorial text-base text-slate-900 dark:text-white font-medium">
                Eksplorasi Tak Henti
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Siap menjelajahi ragam sudut nusantara untuk proyek visual bernilai tinggi.
              </p>
            </div>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  );
};
