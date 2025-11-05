import React, { useEffect, useMemo, useState, useLayoutEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import AccessibilityPanel from './components/AccessibilityPanel.jsx';
import Footer from './components/Footer.jsx';

function getInitialTheme() {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

// App handles: theme (light/dark), accessibility prefs (font size, high contrast, motion)
export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || '16px');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('highContrast') === 'true');
  const [motionEnabled, setMotionEnabled] = useState(() => localStorage.getItem('motionEnabled') !== 'false');

  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  // Apply theme to <html> ASAP to avoid flash
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    // Hint browsers for form controls, scrollbars on mobile
    root.style.colorScheme = theme;
  }, [theme]);

  // Persist theme
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply font size to <html>
  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // Apply high-contrast marker to <body>
  useEffect(() => {
    const body = document.body;
    body.dataset.hc = highContrast ? 'true' : 'false';
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);

  // Persist motion preference
  useEffect(() => {
    localStorage.setItem('motionEnabled', String(motionEnabled));
  }, [motionEnabled]);

  const onToggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const onOpenAccessibility = () => setAccessibilityOpen(true);

  const gradientBg = useMemo(() => {
    if (highContrast) return 'bg-white text-black';
    return 'bg-gradient-to-b from-white to-indigo-50 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100';
  }, [highContrast]);

  return (
    <div className={gradientBg}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <NavBar
        theme={theme}
        onToggleTheme={onToggleTheme}
        onOpenAccessibility={onOpenAccessibility}
        highContrast={highContrast}
      />

      <main id="main" className="min-h-screen">
        <HeroSection highContrast={highContrast} motionEnabled={motionEnabled} />

        <section id="generate" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div
            className={`rounded-2xl p-6 sm:p-8 border ${
              highContrast
                ? 'bg-white text-black border-black'
                : 'bg-white/70 dark:bg-zinc-900/70 backdrop-blur border-zinc-200 dark:border-zinc-800 shadow-lg'
            }`}
          >
            <h2 className="text-xl sm:text-2xl font-semibold">How it works</h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300">
              Take a quick mood and personality quiz. We’ll curate a glossy cube filled with images, videos, audio, quotes, and articles. Save cubes to your dashboard and revisit your vibe anytime.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: '1. Quiz', desc: 'Answer 12 quick questions.' },
                { title: '2. Generate', desc: 'We build your personalized cube.' },
                { title: '3. Explore', desc: 'Dive into media tailored to you.' },
              ].map((c) => (
                <div
                  key={c.title}
                  className={`rounded-xl p-4 sm:p-5 border ${
                    highContrast
                      ? 'bg-white text-black border-black'
                      : 'bg-white/70 dark:bg-zinc-900/70 border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm mt-1 opacity-80">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer highContrast={highContrast} />

      <AccessibilityPanel
        open={accessibilityOpen}
        onClose={() => setAccessibilityOpen(false)}
        fontSize={fontSize}
        onSetFontSize={setFontSize}
        highContrast={highContrast}
        onToggleContrast={() => setHighContrast((v) => !v)}
        motionEnabled={motionEnabled}
        onToggleMotion={() => setMotionEnabled((v) => !v)}
      />
    </div>
  );
}
