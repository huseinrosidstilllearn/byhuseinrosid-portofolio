import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Camera,
  Palette,
  Users,
  Wrench,
} from 'lucide-react';
import { SKILLS } from '../../data/journeyData';
import type { SkillItem } from '../../types/portfolio';
import { resolveIconComponent } from '../../utils/iconCatalog';

const CATEGORY_META: Record<
  SkillItem['category'],
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  teknis: { label: 'Teknis Fotografi', icon: Camera, color: 'text-amber-400' },
  editing: { label: 'Post-Processing & Color Science', icon: Palette, color: 'text-amber-300' },
  softskill: { label: 'Penyutradaraan & Pengarahan Set', icon: Users, color: 'text-amber-400' },
  gear: { label: 'Sistem Kamera & Peralatan', icon: Wrench, color: 'text-amber-300' },
};

const CATEGORIES: SkillItem['category'][] = ['teknis', 'editing', 'softskill', 'gear'];

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const IconComponent = resolveIconComponent(skill.icon);

  return (
    <motion.div
      ref={ref}
      className="bento-card p-5 rounded-2xl border border-black/10 dark:border-white/10 hover:border-amber-400/40 active:scale-[0.98] group transition-all duration-300 cursor-default"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <div className="flex items-start gap-3.5 mb-2.5">
        <div className="w-9 h-9 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0 group-hover:scale-105 group-hover:border-amber-400/50 transition-all">
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-slate-900 dark:text-white font-semibold text-sm leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-200 transition-colors">
            {skill.name}
          </h4>
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400/80 mt-1 block">
            {skill.level === 'Ahli' ? 'Spesialisasi Inti' : skill.level === 'Mahir' ? 'Standar Industri' : 'Kompetensi Terapan'}
          </span>
        </div>
      </div>
      {skill.description && (
        <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mt-2 line-clamp-2">
          {skill.description}
        </p>
      )}
    </motion.div>
  );
}

export function Skills({ skills = SKILLS }: { skills?: SkillItem[] }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  const activeSkills = skills && skills.length > 0 ? skills : SKILLS;

  return (
    <section id="keahlian" className="relative py-24 sm:py-32 px-4 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 mx-auto">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="max-w-2xl mb-16 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]"
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
            Disiplin & Kapabilitas Teknis
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed mt-3">
            Dibangun selama lebih dari 7 tahun melalui penugasan lapangan nyata, mulai dari ketepatan pencahayaan studio hingga dokumentasi medan dinamis.
          </p>
        </motion.div>

        {/* Category Groups */}
        <div className="space-y-14">
          {CATEGORIES.map((cat) => {
            const catMeta = CATEGORY_META[cat];
            const catSkills = activeSkills.filter((s) => s.category === cat);

            return (
              <div key={cat}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-black/[0.04] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 flex items-center justify-center text-amber-500 dark:text-amber-400">
                    <catMeta.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{catMeta.label}</h3>
                  <div className="flex-1 h-px bg-black/10 dark:bg-white/10 ml-2" />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {catSkills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
