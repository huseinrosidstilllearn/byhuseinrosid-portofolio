import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay between children (seconds) */
  stagger?: number;
  /** Initial delay before first child animates (seconds) */
  delay?: number;
  /** Only animate once */
  once?: boolean;
  /** Direction children slide in from */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Distance of slide in pixels */
  distance?: number;
}

const directionMap = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  once = true,
  direction = 'up',
  distance = 30,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  const dir = directionMap[direction];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: dir.x * distance,
      y: dir.y * distance,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
