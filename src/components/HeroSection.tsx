import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveProfile } from '../types/romantic';

interface HeroSectionProps {
  profile: LoveProfile;
  onOpenLetter: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenLetter
}) => {
  const [loveCount, setLoveCount] = useState<number>(() => {
    const saved = localStorage.getItem('love_heart_taps');
    return saved ? parseInt(saved, 10) : 520;
  });

  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const anniversary = new Date(profile.anniversaryDate).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, now - anniversary);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [profile.anniversaryDate]);

  const handleSendHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 24,
      spread: 60,
      origin: { x, y },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#e11d48']
    });

    const next = loveCount + 1;
    setLoveCount(next);
    localStorage.setItem('love_heart_taps', next.toString());
  };

  return (
    <section id="top" className="pt-10 pb-16 md:pt-16 md:pb-24 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left / Primary Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 mb-4">
              <span>مُهدى بكل الحب إلى {profile.girlfriendName}</span>
              <span aria-hidden="true">·</span>
              <span>{profile.nickname}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.25] mb-6 max-w-2xl text-balance">
              {profile.heroHeadline}
            </h1>

            <p className="text-lg text-stone-600 leading-relaxed max-w-xl mb-8">
              {profile.heroSubtitle}
            </p>

            {/* Live Relationship Counter */}
            <div className="bg-white/80 backdrop-blur-sm border border-stone-200/80 rounded-2xl p-6 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-stone-500">
                  أيامنا وساعاتنا معاً حتى اللحظة
                </span>
                <span className="text-xs text-rose-700 font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  كل ثانية معكِ نعمة
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-[#FAF7F5] rounded-xl p-3 border border-stone-200/50">
                  <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-stone-900">
                    {timeTogether.days.toLocaleString()}
                  </div>
                  <div className="text-xs font-medium text-stone-500 mt-1">
                    يوم
                  </div>
                </div>
                <div className="bg-[#FAF7F5] rounded-xl p-3 border border-stone-200/50">
                  <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-stone-900">
                    {timeTogether.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs font-medium text-stone-500 mt-1">
                    ساعة
                  </div>
                </div>
                <div className="bg-[#FAF7F5] rounded-xl p-3 border border-stone-200/50">
                  <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-stone-900">
                    {timeTogether.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs font-medium text-stone-500 mt-1">
                    دقيقة
                  </div>
                </div>
                <div className="bg-[#FAF7F5] rounded-xl p-3 border border-stone-200/50">
                  <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-rose-700">
                    {timeTogether.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs font-medium text-stone-500 mt-1">
                    ثانية
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenLetter}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-rose-900 hover:bg-rose-800 rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <BookOpen className="w-4 h-4" />
                <span>افتحي رسالة الحب</span>
              </button>

              <a
                href="#reasons"
                className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-50 rounded-xl transition-colors shadow-sm"
              >
                <span>أسباب حبي لكِ</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer polaroid framing */}
              <div className="relative bg-white p-4 md:p-5 rounded-2xl shadow-xl border border-stone-200/80 transition-transform duration-300 hover:-rotate-1">
                
                {/* Washi tape sticker */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-100/80 backdrop-blur-xs border border-amber-200/60 rotate-1 shadow-xs z-10" />

                <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-xl overflow-hidden bg-stone-100">
                  <img
                    src="/src/assets/images/lanterns_boat_couple_1791727835803.jpg"
                    alt={`ربانزل وحبيبها بين فوانيس الضوء العائمة - إهداء إلى ${profile.girlfriendName}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-sm font-serif italic text-white/95">
                      "وأخيراً أرى النور.. ومكاني الآن معكِ."
                    </p>
                  </div>
                </div>

                {/* Bottom card footer */}
                <div className="pt-4 flex items-center justify-between text-stone-700">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900">
                      {profile.girlfriendName} &amp; {profile.boyfriendName}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      مكتوب في النجوم · معاً دائماً
                    </p>
                  </div>

                  <button
                    onClick={handleSendHeart}
                    title="أرسلي نبضة حب"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-lg border border-rose-200 text-xs font-semibold transition-transform active:scale-95"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                    <span className="font-mono tabular-nums">{loveCount}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
