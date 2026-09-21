import React from 'react';

interface AmbientAuraProps {
  glowColor?: string | null;
}

export const AmbientAura: React.FC<AmbientAuraProps> = ({ glowColor }) => {
  const primaryGlow = glowColor || '#f59e0b'; // Default warm gold aura

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-colors duration-1000 ease-out"
    >
      {/* Primary Radial Ambient Spotlight */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[700px] sm:h-[1000px] rounded-full blur-[140px] opacity-20 sm:opacity-25 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${primaryGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Secondary Counter-Spotlight for Museum Depth */}
      <div
        className="absolute bottom-10 right-1/4 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full blur-[160px] opacity-15 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${primaryGlow} 0%, #1e1b4b 60%, transparent 80%)`,
        }}
      />

      {/* Subtle Vignette Shading for Film Museum Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,10,17,0.7)_100%)] pointer-events-none" />
    </div>
  );
};
