import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSection({ highContrast, motionEnabled }) {
  const content = (
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white dark:via-zinc-900/40 dark:to-zinc-950" />
      <div className="relative z-10 max-w-3xl mx-auto text-center px-2 sm:px-6 pointer-events-auto">
        <h1
          className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm ${
            highContrast ? 'text-black' : 'text-zinc-900 dark:text-white'
          }`}
        >
          Cubed — Mood & Personality Multimedia
        </h1>
        <p className={`mt-3 sm:mt-4 text-sm sm:text-lg ${highContrast ? 'text-black' : 'text-zinc-700 dark:text-zinc-300'}`}>
          Turn your feelings into a living cube. Explore images, videos, audio, quotes, and articles curated to your vibe.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <a
            href="#generate"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 ${
              highContrast
                ? 'bg-black text-white hover:bg-zinc-800'
                : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
            aria-label="Generate your cube"
          >
            Generate Cube
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#dashboard"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 ${
              highContrast
                ? 'border-black text-black hover:bg-black hover:text-white'
                : 'border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            aria-label="View your dashboard"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="relative w-full h-[60vh] sm:h-[70vh] min-h-[420px] sm:min-h-[520px]"
      aria-label="Hero section with interactive 3D background"
    >
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode"
          aria-label="Interactive 3D cover scene"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      {motionEnabled ? <AnimatePresence>{content}</AnimatePresence> : content}
    </section>
  );
}
