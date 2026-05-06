'use client';

import { HeroSection } from '@/components/sections/HeroMain';
import { ActOne } from '@/components/sections/acts/ActOne';
import { ActTwo } from '@/components/sections/acts/ActTwo';
import { ActThree } from '@/components/sections/acts/ActThree';
import { ActFour } from '@/components/sections/acts/ActFour';

export default function HomePage() {
  return (
    <div className="relative w-full bg-[var(--bg)] text-[var(--text)]">

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
