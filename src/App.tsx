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
  const [viewMode, setViewMode] = useState<'spatial' | 'editorial'>('editorial');

  const handleToggleViewMode = () => {
    setViewMode(prev => (prev === 'spatial' ? 'editorial' : 'spatial'));
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (viewMode === 'spatial') {
      setViewMode('editorial');
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
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0E1015] text-[#1A1A1A] dark:text-[#F3EFEA] selection:bg-[#8B7355]/20 selection:text-[#8B7355] transition-colors duration-500 flex flex-col overflow-x-hidden relative">
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
          <main className="flex-grow">
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
    </ThemeProvider>
  );
}

export default App;
