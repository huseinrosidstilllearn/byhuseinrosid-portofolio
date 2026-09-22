import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILLS } from '../../data/journeyData';
import type { SkillItem } from '../../types/portfolio';

const CATEGORY_META: Record<SkillItem['category'], { label: string; icon: string; color: string }> = {
  teknis: { label: 'Teknis Fotografi', icon: '📷', color: 'text-amber-400' },
  editing: { label: 'Post-Processing', icon: '🎨', color: 'text-sky-400' },
  softskill: { label: 'Keahlian Lunak', icon: '🤝', color: 'text-emerald-400' },
  gear: { label: 'Peralatan', icon: '🔧', color: 'text-rose-400' },
};

const LEVEL_META: Record<SkillItem['level'], { dots: number; color: string }> = {
  Terampil: { dots: 1, color: 'bg-white/30' },
  Mahir: { dots: 2, color: 'bg-amber-400' },
  Ahli: { dots: 3, color: 'bg-amber-400' },
};

const CATEGORIES: SkillItem['category'][] = ['teknis', 'editing', 'softskill', 'gear'];

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const { dots, color } = LEVEL_META[skill.level];


  return (
    <motion.div
      ref={ref}
      className="bento-card p-4 rounded-xl border border-white/5 hover:border-white/15 group transition-all duration-300 cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="flex items-start gap-3 mb-2">
        <span className="text-xl flex-shrink-0">{skill.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-white/85 text-sm font-semibold leading-tight group-hover:text-white transition-colors truncate">
            {skill.name}
          </p>
          <p className="text-white/35 text-[11px] mt-0.5">{skill.level}</p>
        </div>
        {/* Level dots */}
        <div className="flex gap-1 flex-shrink-0 mt-1">
          {[1, 2, 3].map((d) => (
            <div
              key={d}
              className={`w-1.5 h-1.5 rounded-full ${d <= dots ? color : 'bg-white/10'}`}
            />
          ))}
        </div>
      </div>
      {skill.description && (
        <p className="text-white/35 text-[11px] leading-relaxed line-clamp-2">{skill.description}</p>
      )}
    </motion.div>
  );
}

export function Skills({ skills = SKILLS }: { skills?: SkillItem[] }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  const activeSkills = skills && skills.length > 0 ? skills : SKILLS;

  return (
    <section id="keahlian" className="relative py-24 px-4 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/3 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-amber-500/50" />
            <span className="text-amber-400/70 text-xs font-mono tracking-[0.3em] uppercase">Keahlian & Spesialisasi</span>
            <div className="w-12 h-px bg-amber-500/50" />
          </div>
          <h2 className="font-headline text-5xl sm:text-6xl font-black text-white mb-4">
            Yang Saya <span className="text-amber-400">Kuasai</span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
            Dibangun selama 7+ tahun dari lapangan nyata, bukan sekadar teori — dari studio hingga puncak gunung berapi.
          </p>
        </motion.div>

        {/* Category Groups */}
        <div className="space-y-12">
          {CATEGORIES.map((cat) => {
            const catMeta = CATEGORY_META[cat];
            const catSkills = activeSkills.filter((s) => s.category === cat);

            return (
              <div key={cat}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xl">{catMeta.icon}</span>
                  <h3 className={`font-headline text-xl font-black ${catMeta.color}`}>{catMeta.label}</h3>
                  <div className="flex-1 h-px bg-white/5 ml-2" />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {catSkills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <motion.div
          className="flex justify-center gap-6 mt-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={isTitleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {(['Terampil', 'Mahir', 'Ahli'] as SkillItem['level'][]).map((level) => {
            const { dots, color } = LEVEL_META[level];
            return (
              <div key={level} className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((d) => (
                    <div key={d} className={`w-1.5 h-1.5 rounded-full ${d <= dots ? color : 'bg-white/10'}`} />
                  ))}
                </div>
                <span className="text-white/35 text-xs">{level}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
