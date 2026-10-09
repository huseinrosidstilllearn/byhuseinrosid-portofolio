import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TIMELINE_MILESTONES } from '../../data/journeyData';
import { resolveIconComponent } from '../../utils/iconCatalog';

function MilestoneCard({ milestone, index }: { milestone: typeof TIMELINE_MILESTONES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;
  const IconComponent = resolveIconComponent(milestone.icon);

  return (
    <div ref={ref} className={`relative flex items-start gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'} md:gap-0`}>
      {/* Mobile Node Indicator */}
      <div
        className={`md:hidden absolute left-[15px] top-6 w-2.5 h-2.5 rounded-full border-2 z-10 ${
          milestone.highlight
            ? 'bg-amber-400 border-black shadow-[0_0_8px_rgba(245,158,11,0.6)]'
            : 'bg-[#12151E] border-amber-500/50'
        }`}
      />

      {/* Card Side */}
      <motion.div
        className={`w-full pl-9 md:pl-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className={`bento-card p-5 rounded-2xl border active:scale-[0.98] transition-all duration-300 group
          ${milestone.highlight
            ? 'border-amber-500/40 hover:border-amber-400/60 bg-amber-500/5'
            : 'border-black/10 dark:border-white/5 hover:border-black/20 dark:hover:border-white/15'
          }`}
        >
          {/* Year tag */}
          <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
            <span className="font-mono text-xs text-amber-600 dark:text-amber-500/70 tracking-widest">{milestone.year}</span>
            {milestone.highlight && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono tracking-wider uppercase font-semibold">
                Tonggak Penting
              </span>
            )}
          </div>

          {/* Icon + Title */}
          <div className={`flex items-start gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : 'flex-row'} flex-row`}>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400 flex-shrink-0 group-hover:scale-105 group-hover:border-amber-400/50 transition-all">
              <IconComponent className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-lg font-black text-slate-900 dark:text-white leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-100 transition-colors pt-1.5">
              {milestone.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-white/55 text-sm leading-relaxed">{milestone.description}</p>

          {/* Tags */}
          {milestone.tags && milestone.tags.length > 0 && (
            <div className={`flex flex-wrap gap-1.5 mt-4 ${isLeft ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
              {milestone.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-slate-600 dark:text-white/35 text-[10px] font-mono tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Center Timeline Node: hidden on mobile, shown on md+ */}
      <div className="hidden md:flex w-16 flex-shrink-0 flex-col items-center">
        <motion.div
          className={`w-4 h-4 rounded-full border-2 mt-6 z-10 flex-shrink-0
            ${milestone.highlight
              ? 'bg-amber-500 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
              : 'bg-slate-200 dark:bg-[#12151E] border-black/20 dark:border-white/20'
            }`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
      </div>

      {/* Empty spacer for opposite side */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </div>
  );
}

export function Timeline({ milestones = TIMELINE_MILESTONES }: { milestones?: typeof TIMELINE_MILESTONES }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  const activeMilestones = milestones && milestones.length > 0 ? milestones : TIMELINE_MILESTONES;

  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-editorial text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
            Perjalanan <span className="text-amber-500 dark:text-amber-400">Visual</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed mt-3">
            Setiap tahun membawa kedewasaan rasa, dan setiap proyek mengasah ketajaman dalam menangkap kejujuran subjek.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical center line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/40 via-black/10 dark:via-white/10 to-transparent -translate-x-1/2" />

          {/* Vertical left line (mobile only) */}
          <div className="md:hidden absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-amber-500/40 via-black/10 dark:via-white/10 to-transparent" />

          {/* Milestones */}
          <div className="flex flex-col gap-8">
            {activeMilestones.map((milestone, index) => (
              <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
            ))}
          </div>

          {/* Bottom fade */}
          <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2">
            <div className="w-px h-12 bg-gradient-to-b from-white/10 to-transparent" />
            <div className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50 -ml-1 mt-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
