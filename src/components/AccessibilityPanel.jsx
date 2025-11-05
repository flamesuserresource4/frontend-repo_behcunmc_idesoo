import React from 'react';
import { X, Circle, CircleDot } from 'lucide-react';

const sizes = [
  { key: 'small', label: 'Small', value: '14px' },
  { key: 'medium', label: 'Medium', value: '16px' },
  { key: 'large', label: 'Large', value: '18px' },
];

export default function AccessibilityPanel({ open, onClose, fontSize, onSetFontSize, highContrast, onToggleContrast, motionEnabled, onToggleMotion }) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Accessibility settings"
      className="fixed inset-0 z-30 flex items-end sm:items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full sm:max-w-md m-0 sm:m-6 rounded-t-2xl sm:rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-base font-semibold">Accessibility</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
            aria-label="Close accessibility panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 py-4 space-y-6">
          <section aria-label="Font size settings">
            <p className="text-sm mb-2">Font size</p>
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button
                  key={s.key}
                  onClick={() => onSetFontSize(s.value)}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 ${
                    fontSize === s.value
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                  aria-pressed={fontSize === s.value}
                  aria-label={`Set font size to ${s.label}`}
                >
                  {fontSize === s.value ? <CircleDot className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  {s.label}
                </button>
              ))}
            </div>
          </section>

          <section aria-label="Color contrast toggle" className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">High contrast</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Improve text visibility across the app</p>
            </div>
            <button
              onClick={onToggleContrast}
              className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 ${
                highContrast ? 'bg-black' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
              role="switch"
              aria-checked={highContrast}
              aria-label="Toggle high contrast mode"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  highContrast ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </section>

          <section aria-label="Motion toggle" className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Motion animations</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Reduce motion for sensitive users</p>
            </div>
            <button
              onClick={onToggleMotion}
              className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 ${
                motionEnabled ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
              role="switch"
              aria-checked={motionEnabled}
              aria-label="Toggle motion animations"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  motionEnabled ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
