import React from 'react';

export default function Footer({ highContrast }) {
  return (
    <footer
      role="contentinfo"
      className={`w-full border-t ${
        highContrast
          ? 'bg-white text-black border-black'
          : 'bg-white/60 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800'
      }`}
      aria-label="Footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="opacity-80">© {new Date().getFullYear()} Cubed. All rights reserved.</p>
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <a className="hover:opacity-80" href="#accessibility" aria-label="Accessibility policy">Accessibility</a>
          <a className="hover:opacity-80" href="#privacy" aria-label="Privacy policy">Privacy</a>
          <a className="hover:opacity-80" href="#terms" aria-label="Terms of service">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
