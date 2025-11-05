import React from 'react';
import { Menu, Sun, Moon, Home, User, Settings } from 'lucide-react';

export default function NavBar({ theme, onToggleTheme, onOpenAccessibility, highContrast }) {
  return (
    <header
      role="banner"
      className={`w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-zinc-900/50 ${
        highContrast ? 'bg-white text-black border-b border-black' : 'bg-white/60 dark:bg-zinc-900/60'
      }`}
      aria-label="Main Header"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Primary Navigation"
      >
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <a href="#" className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100" aria-label="Go to home">
            Cubed
          </a>
        </div>
        <div className="hidden md:flex items-center gap-6" role="menubar" aria-label="Navigation links">
          <a href="#dashboard" role="menuitem" className="text-sm hover:opacity-80 flex items-center gap-2" aria-label="Dashboard">
            <Home className="h-4 w-4" /> Dashboard
          </a>
          <a href="#generate" role="menuitem" className="text-sm hover:opacity-80" aria-label="Generate Cube">
            Generate Cube
          </a>
          <button
            onClick={onOpenAccessibility}
            className="text-sm hover:opacity-80 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
            aria-label="Open accessibility settings"
          >
            <Settings className="h-4 w-4" /> Accessibility
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <a
            href="#profile"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            aria-label="Profile"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Profile</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
