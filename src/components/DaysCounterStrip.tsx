import React from 'react';
import { Sparkles, Coffee, Heart, MapPin, Smile } from 'lucide-react';

interface DaysCounterStripProps {
  daysCount: number;
}

export const DaysCounterStrip: React.FC<DaysCounterStripProps> = ({ daysCount }) => {
  const metrics = [
    {
      label: 'أيام من حبكِ',
      value: `${daysCount.toLocaleString()}+`,
      icon: Heart,
      subtext: 'وكل فجر يزيدها عمقاً ونوراً'
    },
    {
      label: 'فناجين قهوة دافئة',
      value: '240+',
      icon: Coffee,
      subtext: 'برسمة قلب وأحاديث هادئة'
    },
    {
      label: 'أماكن زرناها معاً',
      value: '18+',
      icon: MapPin,
      subtext: 'كل درب أجمل بصحبتكِ'
    },
    {
      label: 'ضحكات نابعة من القلب',
      value: '∞',
      icon: Smile,
      subtext: 'عفوية وفرح لا ينتهي'
    },
    {
      label: 'لحظات محفورة في الذاكرة',
      value: '10,000+',
      icon: Sparkles,
      subtext: 'تُضيء كل زاوية في حياتنا'
    }
  ];

  return (
    <section className="bg-stone-100/70 border-b border-stone-200/70 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-stone-200/70">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-4 md:pt-0 md:pr-6' : ''}`}
              >
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-700 mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-stone-900 tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs font-semibold text-stone-700 mt-1">
                  {item.label}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  {item.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
