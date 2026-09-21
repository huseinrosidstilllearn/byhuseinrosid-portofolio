import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { PhotoStories } from './components/PhotoStories';
import { About } from './components/About';
import { Services } from './components/Services';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-[#090d16] dark:text-[#f8fafc] transition-colors duration-500 flex flex-col selection:bg-amber-500/30 selection:text-amber-300">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Gallery />
          <PhotoStories />
          <About />
          <Services />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
