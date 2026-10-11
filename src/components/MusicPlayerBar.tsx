import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';
import { romanticAudio } from '../utils/audioPlayer';

export const MusicPlayerBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(romanticAudio.getCurrentTrack());
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
      setCurrentTrack(romanticAudio.getCurrentTrack());
    });
  }, []);

  const handleToggle = () => {
    romanticAudio.togglePlay();
  };

  const handleNext = () => {
    romanticAudio.nextTrack();
  };

  const handlePrev = () => {
    romanticAudio.prevTrack();
  };

  const handleToggleMute = () => {
    if (isMuted) {
      romanticAudio.setVolume(0.35);
      setIsMuted(false);
    } else {
      romanticAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <aside
      aria-label="مشغل الألحان الرومانسية الهادئة"
      className="fixed bottom-4 left-4 z-40 bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-xl rounded-2xl p-3 sm:p-4 text-stone-800 transition-all duration-300 max-w-xs sm:max-w-sm w-full"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Track info & mini waveform */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700 shrink-0 relative">
            <Music className="w-4 h-4" />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            )}
          </div>

          <div className="truncate">
            <div className="text-xs font-semibold text-stone-900 truncate">
              {currentTrack.name}
            </div>
            <div className="text-[11px] text-stone-500 truncate">
              {isPlaying ? currentTrack.mood : 'انقري لتشغيل لحن رومانسي هادئ'}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handlePrev}
            title="اللحن السابق"
            className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-100"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleToggle}
            title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل أنغام العشاق'}
            className="p-2 text-white bg-rose-900 hover:bg-rose-800 rounded-xl transition-all shadow-xs active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={handleNext}
            title="اللحن التالي"
            className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors rounded-lg hover:bg-stone-100"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleToggleMute}
            title={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
            className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors rounded-lg hover:bg-stone-100"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
