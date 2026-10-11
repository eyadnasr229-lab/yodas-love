import React, { useState } from 'react';
import { Mail, Heart, Sparkles, X, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OpenWhenLetter } from '../types/romantic';

interface OpenWhenSectionProps {
  letters: OpenWhenLetter[];
  girlfriendName: string;
  boyfriendName: string;
}

export const OpenWhenSection: React.FC<OpenWhenSectionProps> = ({
  letters,
  girlfriendName,
  boyfriendName
}) => {
  const [selectedLetter, setSelectedLetter] = useState<OpenWhenLetter | null>(null);
  const [sentHug, setSentHug] = useState(false);

  const handleOpenLetter = (letter: OpenWhenLetter) => {
    setSelectedLetter(letter);
    setSentHug(false);
  };

  const handleSendHug = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { x, y },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#e11d48']
    });

    setSentHug(true);
  };

  return (
    <section id="open-when" className="py-20 md:py-28 border-b border-stone-200/70 bg-[#F7F4F0]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-800 mb-2">
            <span>لكل وقت تحتاجينني فيه</span>
            <span aria-hidden="true">·</span>
            <span>قريبٌ منكِ في كل ثانية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            رسائل "افتحيها حين..."
          </h2>
          <p className="text-stone-600 mt-3 text-sm sm:text-base">
            كلما شعرتِ بتعب أو احتجتِ لتذكير رقيق بحبي وتقديري، افتحي الظرف الذي يطابق ما تمرين به الآن.
          </p>
        </div>

        {/* Envelope Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {letters.map((letter) => (
            <div
              key={letter.id}
              onClick={() => handleOpenLetter(letter)}
              className="group cursor-pointer bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Postal Stamp Accent */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-800 group-hover:bg-rose-100 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono tracking-wider text-stone-400 border border-dashed border-stone-300 px-2 py-0.5 rounded">
                  {letter.badge}
                </div>
              </div>

              <div className="text-xs font-semibold text-rose-800 mb-1">
                افتحيها حين...
              </div>

              <h3 className="font-serif font-bold text-2xl text-stone-900 mb-2 group-hover:text-rose-900 transition-colors">
                {letter.trigger}
              </h3>

              <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                {letter.title}
              </p>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-600">
                <span className="flex items-center gap-1 text-rose-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  اقرئي الرسالة
                </span>
                <span className="text-stone-400 group-hover:-translate-x-1 transition-transform">
                  ←
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Letter Modal */}
      {selectedLetter && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedLetter(null)}
        >
          <div
            className="bg-[#FCFBF8] border border-[#E3DDD1] rounded-2xl max-w-xl w-full p-8 sm:p-10 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLetter(null)}
              className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 mb-2">
              <span>افتحيها حين: {selectedLetter.trigger}</span>
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mb-4">
              {selectedLetter.title}
            </h3>

            <div className="font-serif text-xl text-stone-800 leading-[2] bg-white/70 p-6 rounded-xl border border-stone-200/80 mb-6">
              "{selectedLetter.content}"
            </div>

            {/* Comfort Assignment */}
            <div className="bg-rose-50/80 border border-rose-100 p-4 rounded-xl mb-6 text-xs text-rose-950 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">مهمتكِ المريحة: </span>
                <span>{selectedLetter.cheerUpPrompt}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500 font-serif italic">
                من {boyfriendName} بكل حنان ومحبة
              </div>

              <button
                onClick={handleSendHug}
                disabled={sentHug}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-rose-900 hover:bg-rose-800 disabled:bg-rose-800/80 rounded-xl transition-colors shadow-xs"
              >
                <Heart className={`w-3.5 h-3.5 fill-current ${sentHug ? 'animate-ping' : ''}`} />
                <span>{sentHug ? 'تم إرسال العناق بحب! ❤️' : 'أرسلي عناقاً لإياد'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
