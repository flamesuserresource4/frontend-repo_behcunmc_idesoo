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

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || '16px');
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('highContrast') === 'true');
  const [motionEnabled, setMotionEnabled] = useState(() => localStorage.getItem('motionEnabled') !== 'false');
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  // Quiz state
  const [personality, setPersonality] = useState({});
  const [mood, setMood] = useState({});

  // Apply theme to <html> ASAP to avoid flash
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    const body = document.body;
    body.dataset.hc = highContrast ? 'true' : 'false';
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('motionEnabled', String(motionEnabled));
  }, [motionEnabled]);

  const onToggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const onOpenAccessibility = () => setAccessibilityOpen(true);

  const gradientBg = useMemo(() => {
    if (highContrast) return 'bg-white text-black';
    return 'bg-gradient-to-b from-white to-indigo-50 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100';
  }, [highContrast]);

  // Quiz definitions
  const personalityQuestions = [
    {
      id: 'p1',
      q: "What’s your favorite way to spend free time?",
      options: [
        { v: 'A', l: 'Going outdoors to explore or hike (Adventurous, Fitness)' },
        { v: 'B', l: 'Reading or learning something new (Intellectual)' },
        { v: 'C', l: 'Creating art, music, or crafts (Creative)' },
        { v: 'D', l: 'Hanging out with friends and family (Social)' },
        { v: 'E', l: 'Enjoying quiet moments alone (Introvert, Spiritual)' },
      ],
    },
    {
      id: 'p2',
      q: 'When you face a challenge, what do you usually do?',
      options: [
        { v: 'A', l: 'Jump right in and get things moving (Energetic)' },
        { v: 'B', l: 'Think carefully and make a plan (Intellectual)' },
        { v: 'C', l: 'Look for creative solutions (Creative)' },
        { v: 'D', l: 'Talk it through with others (Social)' },
        { v: 'E', l: 'Stay calm and find peace inside (Calm, Spiritual)' },
      ],
    },
    {
      id: 'p3',
      q: 'How do you like to relax after a busy day?',
      options: [
        { v: 'A', l: 'Exercise or play sports (Fitness)' },
        { v: 'B', l: 'Cook something new or enjoy tasty food (Foodie)' },
        { v: 'C', l: 'Watch movies, shows, or theater (Entertainment)' },
        { v: 'D', l: 'Explore new technology or gadgets (Tech)' },
        { v: 'E', l: 'Meditate or spend quiet time (Spiritual, Calm)' },
      ],
    },
    {
      id: 'p4',
      q: 'What kind of conversations do you enjoy most?',
      options: [
        { v: 'A', l: 'Stories about adventures or travel (Adventurous)' },
        { v: 'B', l: 'Talks about science, ideas, or learning (Intellectual)' },
        { v: 'C', l: 'Chat about art, music, and creativity (Creative)' },
        { v: 'D', l: 'Talking about people, events, and social life (Social)' },
        { v: 'E', l: 'Talking about feelings or personal growth (Introvert, Spiritual)' },
      ],
    },
    {
      id: 'p5',
      q: 'How would your friends describe you?',
      options: [
        { v: 'A', l: 'Energetic and adventurous' },
        { v: 'B', l: 'Smart and thoughtful' },
        { v: 'C', l: 'Artistic and imaginative' },
        { v: 'D', l: 'Friendly and outgoing' },
        { v: 'E', l: 'Calm and reflective' },
      ],
    },
  ];

  const moodQuestions = [
    {
      id: 'm1',
      q: 'What kind of sound or music do you want right now?',
      options: [
        { v: 'A', l: 'Calm nature sounds or meditation music (Calm)' },
        { v: 'B', l: 'Fun, energetic beats (Energetic)' },
        { v: 'C', l: 'Slow, emotional songs (Sad)' },
        { v: 'D', l: 'Sweet, romantic tunes (Romantic)' },
      ],
    },
    {
      id: 'm2',
      q: 'If you could be anywhere right now, which place?',
      options: [
        { v: 'A', l: 'A quiet beach or garden (Calm)' },
        { v: 'B', l: 'A lively party or event (Energetic)' },
        { v: 'C', l: 'Cozy spot that reminds you of the past (Nostalgic)' },
        { v: 'D', l: 'Romantic setting, like a candlelit dinner (Romantic)' },
      ],
    },
    {
      id: 'm3',
      q: 'Which colors are you drawn to today?',
      options: [
        { v: 'A', l: 'Soft blues, greens, or pastels (Calm)' },
        { v: 'B', l: 'Bright reds, oranges, yellows (Energetic)' },
        { v: 'C', l: 'Dark or muted colors (Sad, Nostalgic)' },
        { v: 'D', l: 'Soft pinks or reds (Romantic)' },
      ],
    },
    {
      id: 'm4',
      q: 'How do you feel most like spending your evening?',
      options: [
        { v: 'A', l: 'Relaxing quietly or meditating (Calm, Spiritual)' },
        { v: 'B', l: 'Going out and having fun with friends (Energetic, Social)' },
        { v: 'C', l: 'Thinking deeply or journaling (Reflective)' },
        { v: 'D', l: 'Spending time with someone you love (Romantic)' },
      ],
    },
    {
      id: 'm5',
      q: 'What kind of mood fits you best right now?',
      options: [
        { v: 'A', l: 'Peaceful and calm (Calm)' },
        { v: 'B', l: 'Motivated and excited (Motivated)' },
        { v: 'C', l: 'Deep in thought (Reflective)' },
        { v: 'D', l: 'Loving and warm (Romantic)' },
        { v: 'E', l: 'Feeling a little down or blue (Sad)' },
      ],
    },
    {
      id: 'm6',
      q: 'Which activity sounds most like you today?',
      options: [
        { v: 'A', l: 'Yoga or meditation (Calm, Spiritual)' },
        { v: 'B', l: 'Sports or workout (Energetic, Fitness)' },
        { v: 'C', l: 'Remembering good times (Nostalgic)' },
        { v: 'D', l: 'Making or enjoying creative things (Creative, Inspired)' },
      ],
    },
    {
      id: 'm7',
      q: 'What kind of stories or shows do you want to see?',
      options: [
        { v: 'A', l: 'Calm and uplifting (Calm, Inspired)' },
        { v: 'B', l: 'Action and adventure (Energetic)' },
        { v: 'C', l: 'Sad or emotional (Sad, Reflective)' },
        { v: 'D', l: 'Romantic and heartwarming (Romantic)' },
      ],
    },
  ];

  const totalPersonality = personalityQuestions.length;
  const totalMood = moodQuestions.length;
  const personalityDone = Object.keys(personality).length;
  const moodDone = Object.keys(mood).length;
  const allAnswered = personalityDone === totalPersonality && moodDone === totalMood;

  function handleSelect(group, id, value) {
    if (group === 'personality') setPersonality((prev) => ({ ...prev, [id]: value }));
    else setMood((prev) => ({ ...prev, [id]: value }));
  }

  function handleGenerate() {
    // Placeholder action — later hook to backend
    const payload = { personality, mood };
    console.log('Generate Cube payload', payload);
    alert('Thanks! Your preferences were captured. Next step: generate your cube.');
  }

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-semibold">Take the Quiz</h2>
              <p className="text-sm opacity-80">
                {personalityDone}/{totalPersonality} personality • {moodDone}/{totalMood} mood answered
              </p>
            </div>

            {/* Personality Quiz */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              <h3 className="text-lg font-medium">Personality</h3>
              {personalityQuestions.map((q, idx) => (
                <fieldset
                  key={q.id}
                  className={`rounded-xl p-4 border ${
                    highContrast
                      ? 'bg-white text-black border-black'
                      : 'bg-white/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <legend className="font-medium">
                    {idx + 1}. {q.q}
                  </legend>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const inputId = `${q.id}-${opt.v}`;
                      const selected = personality[q.id] === opt.v;
                      return (
                        <label
                          key={opt.v}
                          htmlFor={inputId}
                          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                            selected
                              ? highContrast
                                ? 'border-black bg-black text-white'
                                : 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
                              : highContrast
                                ? 'border-black'
                                : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <input
                            id={inputId}
                            type="radio"
                            name={q.id}
                            value={opt.v}
                            checked={selected}
                            onChange={() => handleSelect('personality', q.id, opt.v)}
                            className="mt-1 h-4 w-4"
                          />
                          <span className="text-sm">{opt.l}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            {/* Mood Quiz */}
            <div className="mt-8 grid grid-cols-1 gap-4">
              <h3 className="text-lg font-medium">Mood</h3>
              {moodQuestions.map((q, idx) => (
                <fieldset
                  key={q.id}
                  className={`rounded-xl p-4 border ${
                    highContrast
                      ? 'bg-white text-black border-black'
                      : 'bg-white/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <legend className="font-medium">
                    {idx + 1}. {q.q}
                  </legend>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const inputId = `${q.id}-${opt.v}`;
                      const selected = mood[q.id] === opt.v;
                      return (
                        <label
                          key={opt.v}
                          htmlFor={inputId}
                          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                            selected
                              ? highContrast
                                ? 'border-black bg-black text-white'
                                : 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
                              : highContrast
                                ? 'border-black'
                                : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <input
                            id={inputId}
                            type="radio"
                            name={q.id}
                            value={opt.v}
                            checked={selected}
                            onChange={() => handleSelect('mood', q.id, opt.v)}
                            className="mt-1 h-4 w-4"
                          />
                          <span className="text-sm">{opt.l}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm opacity-80">
                Complete all questions to enable generation.
              </p>
              <button
                disabled={!allAnswered}
                onClick={handleGenerate}
                className={`inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-medium shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 ${
                  allAnswered
                    ? highContrast
                      ? 'bg-black text-white hover:bg-zinc-800'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : highContrast
                      ? 'bg-zinc-300 text-zinc-700 cursor-not-allowed'
                      : 'bg-zinc-300 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 cursor-not-allowed'
                }`}
                aria-disabled={!allAnswered}
                aria-label="Generate your personalized cube"
              >
                Generate Cube
              </button>
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
