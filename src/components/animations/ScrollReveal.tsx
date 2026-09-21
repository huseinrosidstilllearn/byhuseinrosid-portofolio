import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation type */
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur';
  /** Duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Only animate once */
  once?: boolean;
  /** Distance in pixels for directional variants */
  distance?: number;
}

const getVariants = (variant: string, distance: number) => {
  const baseHidden: Record<string, number | string> = { opacity: 0 };
  const baseVisible: Record<string, number | string> = { opacity: 1 };

  switch (variant) {
    case 'fade-up':
      baseHidden.y = distance;
      baseVisible.y = 0;
      break;
    case 'fade-down':
      baseHidden.y = -distance;
      baseVisible.y = 0;
      break;
    case 'fade-left':
      baseHidden.x = distance;
      baseVisible.x = 0;
      break;
    case 'fade-right':
      baseHidden.x = -distance;
      baseVisible.x = 0;
      break;
    case 'scale':
      baseHidden.scale = 0.85;
      baseVisible.scale = 1;
      break;
    case 'blur':
      baseHidden.filter = 'blur(10px)';
      baseVisible.filter = 'blur(0px)';
      break;
  }

  return { hidden: baseHidden, visible: baseVisible };
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  variant = 'fade-up',
  duration = 0.7,
  delay = 0,
  once = true,
  distance = 40,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  const variants = getVariants(variant, distance);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...variants.visible,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
