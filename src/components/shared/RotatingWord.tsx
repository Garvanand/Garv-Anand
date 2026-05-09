'use client';

import { useState, useEffect } from 'react';

const WORDS = ['thinks', 'listens', 'sees', 'remembers'];
const TYPING_SPEED = 80;   // ms per char
const DELETING_SPEED = 50;
const PAUSE_AFTER = 1800;  // ms to pause when word is fully typed

export function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const target = WORDS[wordIndex];

    if (phase === 'typing') {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPING_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pausing'), PAUSE_AFTER);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'pausing') {
      setPhase('deleting');
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETING_SPEED);
        return () => clearTimeout(t);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, wordIndex]);

  return (
    <span
      className="inline-block min-w-[6ch] sm:min-w-[10ch]"
      style={{
        background: 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {displayed}
      <span
        className="inline-block w-[2px] h-[0.9em] ml-0.5 align-middle"
        style={{
          background: '#00D4FF',
          animation: 'cursor-blink 1s step-end infinite',
        }}
      />
      <style jsx>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
