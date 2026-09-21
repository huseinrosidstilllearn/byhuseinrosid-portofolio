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
import { AmbientAura } from './components/AmbientAura';
import { FloatingDock } from './components/FloatingDock';

export function App() {
  const [viewMode, setViewMode] = useState<'spatial' | 'editorial'>('spatial');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

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
      <div className="min-h-screen bg-[#070a11] text-[#f8fafc] dark:bg-[#070a11] dark:text-[#f8fafc] transition-colors duration-500 flex flex-col selection:bg-amber-500/30 selection:text-amber-300 overflow-x-hidden relative">
        {/* Dynamic Global Ambient Light Aura for Museum Vibe */}
        {viewMode === 'editorial' && <AmbientAura />}

        <Navbar
          viewMode={viewMode}
          onToggleViewMode={handleToggleViewMode}
          onNavigateToSection={handleNavigateToSection}
        />

        {/* Dynamic Experience: Spatial Infinite Canvas vs Editorial Story Feed */}
        {viewMode === 'spatial' ? (
          <main className="w-screen h-screen overflow-hidden">
            <SpatialCanvas />
          </main>
        ) : (
          <main className="flex-grow animate-in fade-in duration-500 pb-20">
            <Hero />
            <Gallery />
            <PhotoStories />
            <About />
            <Services />
            <ContactSection />
            <Footer />
          </main>
        )}

        {/* Floating Glass Dock Bar in Editorial Mode for Fast Navigation */}
        {viewMode === 'editorial' && (
          <FloatingDock
            viewMode={viewMode}
            onToggleViewMode={handleToggleViewMode}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const el = document.getElementById('galeri');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
