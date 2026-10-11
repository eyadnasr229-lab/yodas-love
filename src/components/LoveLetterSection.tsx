import React, { useState } from 'react';
import { Mail, Edit3, Check, Heart, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveProfile } from '../types/romantic';

interface LoveLetterSectionProps {
  profile: LoveProfile;
  isOpen: boolean;
  onToggleOpen: () => void;
  onUpdateLetter: (newText: string) => void;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({
  profile,
  isOpen,
  onToggleOpen,
  onUpdateLetter
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(profile.loveLetterBody);

  const handleUnseal = () => {
    if (!isOpen) {
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#fda4af', '#f43f5e', '#ffe4e6']
      });
    }
    onToggleOpen();
  };

  const handleSaveEdit = () => {
    onUpdateLetter(draft);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setDraft(profile.loveLetterBody);
    setIsEditing(false);
  };

  return (
    <section id="letter" className="py-20 md:py-28 border-b border-stone-200/70 bg-[#F7F4F0]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-800 mb-2">
            <span>كُتبت من صميم الفؤاد</span>
            <span aria-hidden="true">·</span>
            <span>بخط اليد خصيصاً لكِ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            رسالة حب إلى {profile.girlfriendName}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3">
            اضغطي على الختم الشمعي لفتح المشاعر والكلمات التي أحملها لكِ في كل حين.
          </p>
        </div>

        {/* Envelope Container */}
        <div className="relative mx-auto">
          
          {!isOpen ? (
            /* Sealed Envelope State */
            <div
              onClick={handleUnseal}
              className="group cursor-pointer max-w-xl mx-auto bg-[#EDE7DE] border border-[#D8CFC2] rounded-2xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden text-center"
            >
              {/* Envelope Flap Accent */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-[#E4DDD0] border-b border-[#D8CFC2] [clip-path:polygon(0_0,100%_0,50%_100%)] opacity-80" />

              <div className="relative z-10 pt-10 pb-6 flex flex-col items-center">
                {/* Wax Seal Button */}
                <div className="w-20 h-20 rounded-full bg-rose-900 border-4 border-rose-950/40 shadow-lg flex items-center justify-center text-rose-100 group-hover:scale-110 transition-transform duration-300 relative">
                  <div className="absolute inset-1 rounded-full border border-rose-700/60" />
                  <Heart className="w-8 h-8 fill-rose-300 text-rose-300" />
                </div>

                <div className="mt-8 font-serif text-3xl font-bold text-stone-800">
                  إلى: {profile.girlfriendName}
                </div>
                <div className="text-xs tracking-wider text-stone-500 font-sans mt-2">
                  مختومة بالحب الخالص · اضغطي لفتح الرسالة
                </div>

                <div className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 bg-white/70 backdrop-blur-xs rounded-full border border-stone-300/80 text-xs font-medium text-stone-700 group-hover:bg-white transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  <span>افتحي الختم الشمعي</span>
                </div>
              </div>
            </div>
          ) : (
            /* Unfolded Parchment Letter */
            <div className="relative bg-[#FCFBF8] border border-[#E3DDD1] rounded-2xl p-8 sm:p-14 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-500">
              
              {/* Decorative top ribbon */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-5 mb-8">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-700" />
                  <span className="text-xs tracking-widest font-serif font-bold text-stone-600">
                    رسالة تذكارية خاصة
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-rose-800 transition-colors px-2.5 py-1 rounded-md hover:bg-stone-100"
                      title="تعديل كلمات الرسالة"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل الرسالة</span>
                    </button>
                  ) : null}

                  <button
                    onClick={onToggleOpen}
                    className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors px-2.5 py-1 rounded-md hover:bg-stone-100"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة طي الرسالة</span>
                  </button>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-stone-600">
                    اكتب وعدّل رسالة حبك الخاصة
                  </label>
                  <textarea
                    rows={12}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="w-full p-4 rounded-xl border border-stone-300 bg-white font-serif text-lg leading-relaxed text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                      إلغاء
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-900 hover:bg-rose-800 rounded-lg transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>حفظ التعديلات</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="font-serif text-xl sm:text-2xl text-stone-800 leading-[2] space-y-6 whitespace-pre-line selection:bg-rose-200">
                  {profile.loveLetterBody}
                </div>
              )}

              {/* Letter Footer */}
              <div className="mt-12 pt-8 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-stone-500 text-xs font-sans">
                <div>
                  محفوظة في ملاذكِ الرقمي الخاص · لكِ دائماً وأبداً
                </div>
                <div className="font-serif italic text-lg text-stone-900 font-bold">
                  بكل ما أوتيتُ من حب، {profile.boyfriendName}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
