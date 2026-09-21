import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, MessageCircle, MapPin } from 'lucide-react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, useInView } from 'framer-motion';
import { PHOTOGRAPHER_PROFILE } from '../data/portfolioData';
import { createWhatsAppLink } from '../utils/whatsapp';
import { ScrollReveal } from './animations/ScrollReveal';

export const Hero: React.FC = () => {
  // Cursor Spotlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Parallax Background
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);

  // Floating Particles
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 2,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 5,
  }));

  // Stats Counter
  const [yearsCount, setYearsCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isStatsInView) {
      let current = 0;
      const timer = setInterval(() => {
        current += 1;
        setYearsCount(current);
        if (current >= 7) clearInterval(timer);
      }, 150);
      return () => clearInterval(timer);
    }
  }, [isStatsInView]);

  return (
    <section 
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Spotlight Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 sm:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(245,158,11,0.08), transparent 40%)`,
        }}
      />

      {/* Cinematic Background with Atmospheric Vignette & Parallax */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.img
          style={{ y: bgY }}
          src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=85"
          alt="Atmospheric Background By Husein Rosid"
          className="w-full h-[120%] object-cover object-center filter brightness-[0.35] dark:brightness-[0.25] scale-105"
        />
        {/* Layered Editorial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/70 to-transparent dark:from-[#090d16] dark:via-[#090d16]/70 from-white via-white/80" />
        <div className="absolute inset-0 bg-radial at-center from-transparent via-black/40 to-[#090d16]/90 dark:to-[#090d16]" />
        
        {/* Floating Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-amber-500/40 blur-[1px]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center z-10">
        {/* Location & Status Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-8"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-amber-200">
            Surabaya, Indonesia &bull; Terbuka untuk Penugasan
          </span>
        </motion.div>

        {/* The Chosen English Editorial Headline */}
        <ScrollReveal variant="blur" duration={1.2} className="max-w-4xl mb-6">
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight text-slate-900 dark:text-white">
            <motion.span 
              initial={{ opacity: 0, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, filter: 'blur(0px)' }} 
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Stories Told in the{' '}
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, filter: 'blur(0px)' }} 
              transition={{ delay: 0.5, duration: 0.8 }}
              className="italic text-amber-500/90 dark:text-amber-400"
            >
              Quiet Spaces{' '}
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, filter: 'blur(0px)' }} 
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Between Moments.
            </motion.span>
          </h1>
        </ScrollReveal>

        {/* Indonesian Subheadline & Philosophy */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-10"
        >
          {PHOTOGRAPHER_PROFILE.subheadline} Menghidupkan kembali keheningan, kejujuran rasa, dan keindahan setiap tarikan napas melalui lensa fotografi.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#galeri"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-white text-slate-950 hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-colors cursor-pointer"
          >
            <span>Jelajahi Karya</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href={createWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white hover:border-amber-500 hover:text-amber-400 backdrop-blur-sm transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-amber-400" />
            <span>Minta Penawaran</span>
          </motion.a>
        </motion.div>

        {/* Experience & Trust Badges */}
        <motion.div 
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-slate-200/50 dark:border-white/10 grid grid-cols-3 gap-6 sm:gap-16 text-center"
        >
          <div>
            <div className="font-editorial text-2xl sm:text-3xl text-slate-900 dark:text-white font-medium">{yearsCount}+</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">Tahun Menatap Lensa</div>
          </div>
          <div>
            <div className="font-editorial text-2xl sm:text-3xl text-amber-500 dark:text-amber-400 font-medium">100%</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">Kejujuran Emosi</div>
          </div>
          <div>
            <div className="font-editorial text-2xl sm:text-3xl text-slate-900 dark:text-white font-medium">Surabaya</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">Basis Nusantara</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
