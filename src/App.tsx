import React, { useState, useEffect } from 'react';
import {
  DEFAULT_PROFILE,
  DEFAULT_REASONS,
  DEFAULT_OPEN_WHEN,
  DEFAULT_QUIZ
} from './data/defaultContent';
import { LoveProfile, LoveReason } from './types/romantic';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DaysCounterStrip } from './components/DaysCounterStrip';
import { LoveLetterSection } from './components/LoveLetterSection';
import { ReasonsJarSection } from './components/ReasonsJarSection';
import { OpenWhenSection } from './components/OpenWhenSection';
import { CoupleQuizSection } from './components/CoupleQuizSection';
import { Footer } from './components/Footer';
import { MusicPlayerBar } from './components/MusicPlayerBar';
import { FloatingHeartsCanvas } from './components/FloatingHeartsCanvas';
import { PersonalizeModal } from './components/PersonalizeModal';

export default function App() {
  // Profile State
  const [profile, setProfile] = useState<LoveProfile>(() => {
    try {
      const saved = localStorage.getItem('love_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.girlfriendName === 'Sophia' || parsed.girlfriendName === 'حبيبتي') {
          parsed.girlfriendName = 'جنى';
          parsed.heroHeadline = 'إلى جنى، من جعلت كل أيامي قصيدة دافئة';
          parsed.loveLetterBody = DEFAULT_PROFILE.loveLetterBody;
        }
        return parsed;
      }
      return DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Reasons State - Always ensure Arabic reasons
  const [reasons, setReasons] = useState<LoveReason[]>(() => {
    try {
      const saved = localStorage.getItem('love_reasons');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If cached reasons contain English letters or are too short, refresh with Arabic DEFAULT_REASONS
        const hasEnglish = Array.isArray(parsed) && parsed.some((r: LoveReason) => /[a-zA-Z]{3,}/.test(r.text));
        if (hasEnglish || !Array.isArray(parsed) || parsed.length === 0) {
          localStorage.setItem('love_reasons', JSON.stringify(DEFAULT_REASONS));
          return DEFAULT_REASONS;
        }
        return parsed;
      }
      return DEFAULT_REASONS;
    } catch {
      return DEFAULT_REASONS;
    }
  });

  // UI state
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('love_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('love_reasons', JSON.stringify(reasons));
  }, [reasons]);

  // Calculate days together for the strip
  const daysTogether = Math.max(
    0,
    Math.floor(
      (new Date().getTime() - new Date(profile.anniversaryDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  // Handlers
  const handleUpdateLetter = (newText: string) => {
    setProfile(prev => ({ ...prev, loveLetterBody: newText }));
  };

  const handleAddReason = (reason: LoveReason) => {
    setReasons(prev => [reason, ...prev]);
  };

  const handleSaveProfile = (newProfile: LoveProfile) => {
    setProfile(newProfile);
  };

  const handleResetDefaults = () => {
    setProfile(DEFAULT_PROFILE);
    setReasons(DEFAULT_REASONS);
    localStorage.removeItem('love_profile');
    localStorage.removeItem('love_reasons');
    localStorage.removeItem('love_heart_taps');
  };

  const handleScrollToLetter = () => {
    setIsLetterOpen(true);
    const element = document.getElementById('letter');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-stone-900 flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Falling soft rose petals canvas */}
      <FloatingHeartsCanvas />

      {/* Top Navigation Bar with strict 3-zone contract */}
      <Navbar
        girlfriendName={profile.girlfriendName}
        boyfriendName={profile.boyfriendName}
        onOpenSettings={() => setIsPersonalizeOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          profile={profile}
          onOpenLetter={handleScrollToLetter}
        />

        {/* Days and shared moments counter strip */}
        <DaysCounterStrip daysCount={daysTogether} />

        {/* Wax Seal Love Letter */}
        <LoveLetterSection
          profile={profile}
          isOpen={isLetterOpen}
          onToggleOpen={() => setIsLetterOpen(!isLetterOpen)}
          onUpdateLetter={handleUpdateLetter}
        />

        {/* Reasons Jar Section */}
        <ReasonsJarSection
          reasons={reasons}
          girlfriendName={profile.girlfriendName}
          onAddReason={handleAddReason}
        />

        {/* Open When Letters */}
        <OpenWhenSection
          letters={DEFAULT_OPEN_WHEN}
          girlfriendName={profile.girlfriendName}
          boyfriendName={profile.boyfriendName}
        />

        {/* Couple Trivia Quiz */}
        <CoupleQuizSection
          questions={DEFAULT_QUIZ}
          girlfriendName={profile.girlfriendName}
          boyfriendName={profile.boyfriendName}
        />
      </main>

      {/* Ambient Acoustic Music Player Widget */}
      <MusicPlayerBar />

      {/* Footer */}
      <Footer
        girlfriendName={profile.girlfriendName}
        boyfriendName={profile.boyfriendName}
      />

      {/* Personalization Modal for Boyfriend / Customizer */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
