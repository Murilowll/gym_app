import React, { useEffect, useState } from 'react';
import { Flame, Sparkles, X, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TopStreakBannerProps {
  currentStreak: number;
  initialOldStreak?: number;
  triggerAnimation?: boolean;
  onGoToStreak: () => void;
  onAnimationComplete?: () => void;
}

export const TopStreakBanner: React.FC<TopStreakBannerProps> = ({
  currentStreak,
  initialOldStreak,
  triggerAnimation = false,
  onGoToStreak,
  onAnimationComplete
}) => {
  const [displayNumber, setDisplayNumber] = useState<number>(() => {
    return triggerAnimation && initialOldStreak !== undefined ? initialOldStreak : currentStreak;
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [numberFlipping, setNumberFlipping] = useState(false);

  useEffect(() => {
    if (!triggerAnimation) {
      setDisplayNumber(currentStreak);
      return;
    }

    // Inicia a animação após breve intervalo (logo após a transição da Splash)
    const startTimer = setTimeout(() => {
      setIsAnimating(true);
      setShowToast(true);

      // Efeito sonoro / vibração leve tátil se disponível
      if ('vibrate' in navigator) {
        try {
          navigator.vibrate([40, 60, 100]);
        } catch {}
      }

      // Dispara confetes comemorativos com foco no topo
      try {
        confetti({
          particleCount: 38,
          spread: 60,
          origin: { y: 0.1, x: 0.8 },
          colors: ['#ff375f', '#ff9f0a', '#ffd60a', '#ffffff'],
          disableForReducedMotion: true
        });
      } catch {}

      // Animação de subida do número (Flip vertical)
      setNumberFlipping(true);

      setTimeout(() => {
        setDisplayNumber(currentStreak);
        setNumberFlipping(false);
      }, 500);

      // Fecha o toast comemorativo após 4 segundos
      const closeTimer = setTimeout(() => {
        setShowToast(false);
        setIsAnimating(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 4200);

      return () => clearTimeout(closeTimer);
    }, 450);

    return () => clearTimeout(startTimer);
  }, [triggerAnimation, currentStreak, onAnimationComplete]);

  return (
    <>
      {/* Badge Superior Fixo / Lá em Cima */}
      <button
        type="button"
        onClick={onGoToStreak}
        className={`top-streak-badge-btn ${isAnimating ? 'pulse-level-up' : ''}`}
        title={`Ofensiva Atual: ${displayNumber} dias seguidos. Toque para ver detalhes.`}
        aria-label="Ver Ofensiva"
      >
        <div className="top-streak-flame-wrap">
          <Flame
            size={18}
            className={`top-streak-flame-icon ${isAnimating ? 'flame-flare' : ''}`}
          />
          {isAnimating && <span className="flame-sparkle-dot" />}
        </div>

        <div className="top-streak-number-roller">
          <span className={`top-streak-val ${numberFlipping ? 'flip-up' : ''}`}>
            {displayNumber}
          </span>
          <span className="top-streak-unit">dias</span>
        </div>
      </button>

      {/* Toast Flutuante Notificando a Ofensiva Diária no Topo */}
      {showToast && (
        <div
          className="top-streak-toast"
          onClick={onGoToStreak}
          role="status"
          aria-live="polite"
        >
          <div className="toast-streak-flame">
            <Flame size={20} className="toast-flame-icon" />
          </div>

          <div className="toast-streak-info">
            <div className="toast-streak-header-row">
              <span className="toast-streak-title">OFENSIVA DO DIA MANTIDA!</span>
              <Sparkles size={12} className="toast-sparkle" />
            </div>
            <p className="toast-streak-sub">
              Você marcou presença hoje • <strong>+{displayNumber} dias seguidos</strong>
            </p>
          </div>

          <div className="toast-streak-actions">
            <ChevronRight size={16} className="toast-chevron" />
            <button
              type="button"
              className="toast-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowToast(false);
              }}
              title="Fechar notificação"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
