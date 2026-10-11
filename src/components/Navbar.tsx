import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  girlfriendName: string;
  boyfriendName: string;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  girlfriendName,
  boyfriendName,
  onOpenSettings
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F5]/90 backdrop-blur-md border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-2xl font-serif font-bold tracking-tight text-stone-900 hover:text-rose-900 transition-colors whitespace-nowrap shrink-0"
        >
          {girlfriendName} &amp; {boyfriendName}
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#letter" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            رسالة الحب
          </a>
          <a href="#reasons" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            أسباب حبي لكِ
          </a>
          <a href="#open-when" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            افتحيها حين...
          </a>
          <a href="#quiz" className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0">
            اختبارنا اللطيف
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onOpenSettings}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-950 bg-rose-100/80 border border-rose-200/80 rounded-lg hover:bg-rose-200/80 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>تخصيص لحبيبتي</span>
          </button>
        </div>
      </div>
    </header>
  );
};
