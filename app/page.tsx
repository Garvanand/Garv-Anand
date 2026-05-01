'use client';

import { Navigation } from './_components/Navigation';
import { HeroSection } from './_components/HeroSection';
import { ActOne } from './_components/acts/ActOne';
import { ActTwo } from './_components/acts/ActTwo';
import { ActThree } from './_components/acts/ActThree';
import { ActFour } from './_components/acts/ActFour';

export default function HomePage() {
  return (
    <div className="relative w-full bg-[var(--bg)] text-[var(--text)]">
      <Navigation />

      {/* Hero — viewport 0 */}
      <HeroSection />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>

      {/* Act 1: The Problem I Solve — viewport 1-2 */}
      <ActOne />

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>

      {/* Act 2: How I Think — viewport 2-3 */}
      <ActTwo />

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>

      {/* Act 3: What I've Built — viewport 3-4 (horizontal scroll) */}
      <ActThree />

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </div>

      {/* Act 4: Let's Work Together — viewport 4 */}
      <ActFour />
    </div>
  );
}
