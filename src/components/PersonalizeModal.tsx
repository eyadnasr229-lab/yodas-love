import React, { useState } from 'react';
import { X, Check, RotateCcw, Sparkles } from 'lucide-react';
import { LoveProfile } from '../types/romantic';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: LoveProfile;
  onSaveProfile: (profile: LoveProfile) => void;
  onResetDefaults: () => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetDefaults
}) => {
  const [form, setForm] = useState<LoveProfile>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(form);
    onClose();
  };

  const handleChange = (key: keyof LoveProfile, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-stone-400 hover:text-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>تخصيص الموقع لحكايتكم الجميلة</span>
        </div>

        <h3 className="font-serif font-bold text-2xl text-stone-900 mb-2">
          تعديل تفاصيل الحكاية
        </h3>
        <p className="text-xs text-stone-500 mb-6">
          حدّث اسم حبيبتك، اسمك، تاريخ اللقاء، وألقاب المحبة. تُحفظ وتُطبّق التغييرات فوراً في متصفحك.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                اسم حبيبتك
              </label>
              <input
                type="text"
                required
                value={form.girlfriendName}
                onChange={(e) => handleChange('girlfriendName', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="مثال: جنى"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                اسمك
              </label>
              <input
                type="text"
                required
                value={form.boyfriendName}
                onChange={(e) => handleChange('boyfriendName', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="مثال: إياد"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                تاريخ ذكرى البداية واللقاء
              </label>
              <input
                type="date"
                required
                value={form.anniversaryDate}
                onChange={(e) => handleChange('anniversaryDate', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                اللقب المحبب لقلبها
              </label>
              <input
                type="text"
                value={form.nickname}
                onChange={(e) => handleChange('nickname', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="مثال: شمس حياتي، وردتي"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              عنوان الواجهة الرئيسي
            </label>
            <input
              type="text"
              value={form.heroHeadline}
              onChange={(e) => handleChange('heroHeadline', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              النص التعبيري الترحيبي
            </label>
            <textarea
              rows={2}
              value={form.heroSubtitle}
              onChange={(e) => handleChange('heroSubtitle', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onResetDefaults();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة الإعدادات الأصلية</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-rose-900 hover:bg-rose-800 rounded-lg transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>حفظ وتطبيق التغييرات</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
