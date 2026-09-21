import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlurRevealProps {
  children: string;
  className?: string;
  /** 'word' splits by word, 'char' splits by character */
  splitBy?: 'word' | 'char';
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Stagger delay between each unit (seconds) */
  stagger?: number;
  /** Only animate once when scrolled into view */
  once?: boolean;
  /** Element tag to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const BlurReveal: React.FC<BlurRevealProps> = ({
  children,
  className = '',
  splitBy = 'word',
  delay = 0,
  stagger = 0.04,
  once = true,
  as = 'div',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  const units = splitBy === 'word'
    ? children.split(' ')
    : children.split('');

  const MotionTag = motion.create(as);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const unitVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ display: 'flex', flexWrap: 'wrap', gap: splitBy === 'word' ? '0.3em' : '0' }}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          variants={unitVariants}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
        >
          {unit === ' ' ? '\u00A0' : unit}
        </motion.span>
      ))}
    </MotionTag>
  );
};
