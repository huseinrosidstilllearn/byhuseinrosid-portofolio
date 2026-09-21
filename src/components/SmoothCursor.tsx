import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const SmoothCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const ringSpringConfig = { damping: 20, stiffness: 180, mass: 0.8 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    window.addEventListener('mousemove', handleMouseMove);
    
    // Track hover states on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor]');
      
      if (interactiveEl) {
        setIsHovering(true);
        const label = interactiveEl.getAttribute('data-cursor') || '';
        setCursorLabel(label);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor]');
      if (interactiveEl) {
        setIsHovering(false);
        setCursorLabel('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      {/* Add global cursor hiding style */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </motion.div>

      {/* Ring cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isHovering ? (cursorLabel ? 80 : 56) : 36,
          height: isHovering ? (cursorLabel ? 80 : 56) : 36,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div
          className="w-full h-full rounded-full border-[1.5px] border-white/60 flex items-center justify-center transition-colors duration-300"
          style={{
            backgroundColor: isHovering ? 'rgba(255,255,255,0.08)' : 'transparent',
          }}
        >
          {cursorLabel && isHovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[9px] font-semibold uppercase tracking-widest text-white whitespace-nowrap"
            >
              {cursorLabel}
            </motion.span>
          )}
        </div>
      </motion.div>
    </>
  );
};
