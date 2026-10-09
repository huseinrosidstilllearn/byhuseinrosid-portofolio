import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import { ThemeProvider } from '../context/ThemeContext';
import { JadwalApp } from './JadwalApp';

createRoot(document.getElementById('jadwal-root')!).render(
  <StrictMode>
    <ThemeProvider>
      <JadwalApp />
    </ThemeProvider>
  </StrictMode>
);
