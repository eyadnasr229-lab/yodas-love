import React, { useState } from 'react';
import { Award, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types/romantic';

interface CoupleQuizSectionProps {
  questions: QuizQuestion[];
  girlfriendName: string;
  boyfriendName: string;
}

export const CoupleQuizSection: React.FC<CoupleQuizSectionProps> = ({
  questions,
  girlfriendName,
  boyfriendName
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#fda4af', '#f43f5e', '#fb7185']
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="py-20 md:py-28 border-b border-stone-200/70 bg-[#F7F4F0]">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-800 mb-2">
            <span>اختبار حب عفوي وممتع</span>
            <span aria-hidden="true">·</span>
            <span>إلى أي مدى تتذكرين تفاصيلنا؟</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            اختبار حكايتنا اللطيف
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base">
            اختبري ذاكرتكِ في أسرارنا ونكاتنا الخاصة ولحظاتنا المشتركة!
          </p>
        </div>

        {!isCompleted ? (
          /* Question Card */
          <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-10 shadow-sm relative">
            
            {/* Progress indicators */}
            <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
              <span className="font-medium text-rose-800">
                السؤال {currentIndex + 1} من {questions.length}
              </span>
              <span className="font-mono tabular-nums">
                النتيجة: {score}/{currentIndex + (hasAnswered ? 1 : 0)}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-stone-100 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-rose-700 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h3 className="font-serif font-bold text-2xl text-stone-900 mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, idx) => {
                let optionStyle = 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-700';

                if (hasAnswered) {
                  if (idx === currentQ.correctIndex) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                  } else if (selectedOption === idx) {
                    optionStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                  } else {
                    optionStyle = 'border-stone-200 opacity-50 text-stone-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-right text-sm transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {hasAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Next Button */}
            {hasAnswered && (
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200">
                <p className="text-xs text-stone-600 font-serif italic text-center sm:text-right">
                  "{currentQ.explanation}"
                </p>

                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-rose-900 hover:bg-rose-800 rounded-xl transition-colors shadow-xs"
                >
                  <span>{currentIndex + 1 === questions.length ? 'مشاهدة شهادة التقدير' : 'السؤال التالي'}</span>
                  <span>←</span>
                </button>
              </div>
            )}

          </div>
        ) : (
          /* Completion Diploma Certificate */
          <div className="bg-[#FCFBF8] border-2 border-[#D8CFC2] rounded-3xl p-8 sm:p-14 shadow-xl text-center relative overflow-hidden">
            
            <div className="w-16 h-16 rounded-full bg-rose-100 border border-rose-200 mx-auto flex items-center justify-center text-rose-800 mb-4">
              <Award className="w-8 h-8" />
            </div>

            <div className="text-xs font-mono text-stone-500 mb-2">
              وثيقة رسمية في المحبة التي لا تُقارن
            </div>

            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 mb-2">
              ممنوحة بكل فخر إلى {girlfriendName}
            </h3>

            <p className="font-serif text-xl italic text-stone-700 max-w-md mx-auto my-6 leading-relaxed">
              "لنيلها أعلى درجات الرقة، وخفة الظل، واحتلال قلب {boyfriendName} بالكامل إلى أبد الآبدين."
            </p>

            <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 max-w-sm mx-auto mb-8">
              <div className="text-xs text-rose-800 font-semibold mb-1">
                التقييم والدرجة النهائية
              </div>
              <div className="font-serif text-2xl font-bold text-rose-950">
                التقدير: توأم الروح بنسبة 100%
              </div>
              <div className="text-xs text-stone-500 mt-1">
                النتيجة: {score}/{questions.length} · ملاك معتمد
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-xl transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة الاختبار</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
