import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { SpatialCanvas } from './components/SpatialCanvas';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { PhotoStories } from './components/PhotoStories';
import { About } from './components/About';
import { Services } from './components/Services';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const [viewMode, setViewMode] = useState<'bento' | 'spatial'>('bento');

  const handleToggleViewMode = () => {
    setViewMode(prev => (prev === 'spatial' ? 'bento' : 'spatial'));
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (viewMode === 'spatial') {
      setViewMode('bento');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#050505] text-[#F8FAFC] selection:bg-amber-500/30 selection:text-amber-300 relative overflow-x-hidden">
        {/* Subtle Architectural Grid Pattern & Ambient Top Vignette */}
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />
        <div className="fixed top-0 left-0 right-0 h-[600px] radial-vignette pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar
            viewMode={viewMode}
            onToggleViewMode={handleToggleViewMode}
            onNavigateToSection={handleNavigateToSection}
          />

          {viewMode === 'spatial' ? (
            <main className="w-screen h-screen overflow-hidden">
              <SpatialCanvas />
            </main>
          ) : (
            <main className="flex-grow space-y-24 sm:space-y-36 pb-20">
              <Hero onExploreClick={() => handleNavigateToSection('galeri')} />
              <Gallery />
              <PhotoStories />
              <About />
              <Services />
              <ContactSection />
              <Footer onSwitchToSpatial={() => setViewMode('spatial')} />
            </main>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
