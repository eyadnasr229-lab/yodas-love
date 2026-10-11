import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

export const FloatingHeartsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      color: string;
    }

    const colors = [
      'rgba(244, 63, 94, 0.25)',  // rose-500
      'rgba(251, 113, 133, 0.3)', // rose-400
      'rgba(253, 164, 175, 0.35)',// rose-300
      'rgba(245, 158, 11, 0.2)'   // amber warm gold
    ];

    const particles: Particle[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 6 + 3,
      speedY: Math.random() * 0.45 + 0.25,
      speedX: Math.sin(Math.random() * Math.PI) * 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.4 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        // Draw soft petal/oval shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 1.5, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isEnabled]);

  return (
    <>
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-30"
          style={{ opacity: 0.8 }}
        />
      )}

      {/* Subtle bottom-right toggle in RTL */}
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        title={isEnabled ? 'إيقاف تساقط البتلات' : 'تشغيل تساقط البتلات'}
        className="fixed bottom-4 right-4 z-40 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-600 border border-stone-200/80 shadow-md backdrop-blur-xs transition-colors text-xs flex items-center gap-1.5"
      >
        <Sparkles className={`w-3.5 h-3.5 ${isEnabled ? 'text-rose-600' : 'text-stone-400'}`} />
        <span className="hidden sm:inline text-xs font-medium text-stone-600">
          {isEnabled ? 'البتلات نشطة' : 'البتلات متوقفة'}
        </span>
      </button>
    </>
  );
};
