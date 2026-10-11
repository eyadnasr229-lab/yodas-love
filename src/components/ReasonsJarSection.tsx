import React, { useState } from 'react';
import { Sparkles, Heart, Plus, Shuffle, Quote, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveReason } from '../types/romantic';

interface ReasonsJarSectionProps {
  reasons: LoveReason[];
  girlfriendName: string;
  onAddReason: (reason: LoveReason) => void;
}

export const ReasonsJarSection: React.FC<ReasonsJarSectionProps> = ({
  reasons,
  girlfriendName,
  onAddReason
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [drawnReason, setDrawnReason] = useState<LoveReason | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newReasonText, setNewReasonText] = useState('');
  const [newReasonCategory, setNewReasonCategory] = useState<LoveReason['category']>('تفاصيل صغيرة');

  const categories = [
    'الكل',
    'تفاصيل صغيرة',
    'ضحك ومرح',
    'مغامراتنا',
    'عمق المشاعر',
    'يومياتنا'
  ];

  const filteredReasons = activeCategory === 'الكل'
    ? reasons
    : reasons.filter(r => r.category === activeCategory);

  const handleDrawNote = () => {
    if (reasons.length === 0) return;
    const randomIdx = Math.floor(Math.random() * reasons.length);
    const chosen = reasons[randomIdx];
    setDrawnReason(chosen);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#f43f5e', '#fb7185', '#fda4af']
    });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReasonText.trim()) return;

    const newReason: LoveReason = {
      id: `r-${Date.now()}`,
      text: newReasonText.trim(),
      category: newReasonCategory
    };

    onAddReason(newReason);
    setNewReasonText('');
    setIsAddModalOpen(false);
  };

  return (
    <section id="reasons" className="py-20 md:py-28 border-b border-stone-200/70 bg-[#FAF7F5]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-800 mb-2">
            <span>تفاصيل صغيرة تعني لي العالم بأسره</span>
            <span aria-hidden="true">·</span>
            <span>كل يوم أحبكِ أكثر وأكثر</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            أسباب حبي لـ {girlfriendName}
          </h2>
          <p className="text-stone-600 mt-3 text-sm sm:text-base">
            مطوية في جرة ذكريات زجاجية. اسحبي ورقة عشوائية في أي وقت ترغبين فيه بتذكير دافئ ينير قلبكِ.
          </p>
        </div>

        {/* Interactive Jar Draw Banner */}
        <div className="max-w-2xl mx-auto bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-sm mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700 shrink-0">
              <Heart className="w-7 h-7 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <div className="font-serif font-bold text-xl text-stone-900">
                جرة الذكريات المحفوظة
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {reasons.length} ورقة مطوية بخط اليد بانتظار ابتسامتكِ
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleDrawNote}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-rose-900 hover:bg-rose-800 rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <Shuffle className="w-4 h-4" />
              <span>اسحبي ورقة من الجرة</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              title="إضافة سبب جديد"
              className="p-3 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 mb-10 p-1.5 bg-stone-200/60 max-w-xl mx-auto rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReasons.map((reason, idx) => (
            <div
              key={reason.id}
              className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-3">
                  <span className="font-mono tabular-nums">#{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-xs text-rose-800 font-semibold bg-rose-50/80 px-2.5 py-0.5 rounded-md">
                    {reason.category}
                  </span>
                </div>
                <p className="font-serif text-xl text-stone-800 leading-relaxed">
                  "{reason.text}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1 text-rose-600 font-medium">
                  <Sparkles className="w-3 h-3" />
                  أحبكِ دائماً وأبداً
                </span>
                <span className="italic">السبب رقم #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Drawn Reason Modal */}
      {drawnReason && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDrawnReason(null)}
        >
          <div
            className="bg-[#FCFBF8] border border-[#E3DDD1] rounded-2xl max-w-lg w-full p-8 sm:p-10 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDrawnReason(null)}
              className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 mx-auto flex items-center justify-center mb-4">
              <Quote className="w-6 h-6" />
            </div>

            <div className="text-xs font-semibold text-rose-800 mb-2">
              رسالة ورقية مطوية من إياد إلى جنى
            </div>

            <p className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-relaxed my-6">
              "{drawnReason.text}"
            </p>

            <div className="pt-6 border-t border-stone-200/80 flex items-center justify-center gap-3">
              <button
                onClick={handleDrawNote}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-950 bg-rose-100 hover:bg-rose-200 rounded-lg transition-colors"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>اسحبي ورقة أخرى</span>
              </button>
              <button
                onClick={() => setDrawnReason(null)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
              >
                احفظيها في القلب
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Reason Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-2xl text-stone-900 mb-1">
              إضافة سبب جديد
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              أضف طبعاً مميزاً أو تفصيلة تعشقها في جنى.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  التصنيف
                </label>
                <select
                  value={newReasonCategory}
                  onChange={(e) => setNewReasonCategory(e.target.value as LoveReason['category'])}
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                >
                  <option value="تفاصيل صغيرة">تفاصيل صغيرة</option>
                  <option value="ضحك ومرح">ضحك ومرح</option>
                  <option value="مغامراتنا">مغامراتنا</option>
                  <option value="عمق المشاعر">عمق المشاعر</option>
                  <option value="يومياتنا">يومياتنا</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  نص السبب
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="مثال: كيف تمسكين بيدي بحنان كلما قطعنا الشارع معاً..."
                  value={newReasonText}
                  onChange={(e) => setNewReasonText(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-rose-900 hover:bg-rose-800 rounded-lg"
                >
                  إيداع في الجرة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
