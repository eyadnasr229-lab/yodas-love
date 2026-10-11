import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  girlfriendName: string;
  boyfriendName: string;
}

export const Footer: React.FC<FooterProps> = ({
  girlfriendName,
  boyfriendName
}) => {
  return (
    <footer className="bg-[#F4EFEB] border-t border-stone-200/80 py-16 text-stone-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
          
          <div>
            <div className="font-serif font-bold text-2xl text-stone-900">
              {girlfriendName} &amp; {boyfriendName}
            </div>
            <p className="text-xs text-stone-500 mt-1 max-w-sm">
              "في هذا العالم بأسره، لا يوجد قلبٌ لقلبي كقلبكِ، ولا حبٌ لحبكِ كحبي."
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-stone-500 font-medium">
            <a href="#letter" className="hover:text-stone-900 transition-colors">
              رسالة الحب
            </a>
            <a href="#reasons" className="hover:text-stone-900 transition-colors">
              أسباب حبي لكِ
            </a>
            <a href="#open-when" className="hover:text-stone-900 transition-colors">
              افتحيها حين...
            </a>
            <a href="#quiz" className="hover:text-stone-900 transition-colors">
              اختبارنا
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span>صُنع بكل مشاعر الحب بواسطة</span>
            <span className="font-semibold text-stone-800">{boyfriendName}</span>
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-stone-200/60 text-center text-xs text-stone-400">
          ملاذ رقمي خالد للحكايات الدافئة · كل سطر كُتب بوفاء وصدق
        </div>
      </div>
    </footer>
  );
};
