import React, { useEffect, useState } from 'react';
import { Timer, X, Plus, Pause, Play, RotateCcw } from 'lucide-react';
import { playTimerBeep } from '../utils/sound';

interface RestTimerProps {
  initialSeconds: number;
  isActive: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  initialSeconds,
  isActive,
  onClose,
  onComplete
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);

  useEffect(() => {
    setTimeLeft(initialSeconds);
    setTotalSeconds(initialSeconds);
    setIsPaused(false);
  }, [initialSeconds, isActive]);

  useEffect(() => {
    if (!isActive || isPaused) return;

    if (timeLeft <= 0) {
      playTimerBeep(true);
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next <= 3 && next > 0) {
          playTimerBeep(false);
        } else if (next === 0) {
          playTimerBeep(true);
          if (onComplete) onComplete();
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft, onComplete]);

  if (!isActive) return null;

  const minutes = Math.floor(Math.max(0, timeLeft) / 60);
  const seconds = Math.max(0, timeLeft) % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 100;
  const strokeDashoffset = 283 - (283 * Math.min(100, Math.max(0, progressPercent))) / 100;

  const handleAdd30 = () => {
    setTimeLeft((prev) => prev + 30);
    setTotalSeconds((prev) => prev + 30);
  };

  const handleReset = () => {
    setTimeLeft(initialSeconds);
    setTotalSeconds(initialSeconds);
    setIsPaused(false);
  };

  return (
    <div className="rest-timer-floating-card">
      <div className="timer-circle-wrapper">
        <svg className="timer-svg" viewBox="0 0 100 100">
          <circle
            className="timer-circle-bg"
            cx="50"
            cy="50"
            r="45"
          />
          <circle
            className="timer-circle-progress"
            cx="50"
            cy="50"
            r="45"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="timer-time-display">
          <span className="timer-digits">{formattedTime}</span>
          <span className="timer-label">descanso</span>
        </div>
      </div>

      <div className="timer-info-content">
        <div className="timer-title-row">
          <span className="timer-badge">
            <Timer size={14} className="spin-slow" />
            Descanso Ativo
          </span>
          <button onClick={onClose} className="timer-close-btn" title="Fechar Timer">
            <X size={16} />
          </button>
        </div>
        <p className="timer-hint">Respire fundo para a próxima série!</p>

        <div className="timer-controls">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="timer-btn primary"
            title={isPaused ? 'Continuar' : 'Pausar'}
          >
            {isPaused ? <Play size={15} /> : <Pause size={15} />}
            <span>{isPaused ? 'Continuar' : 'Pausar'}</span>
          </button>

          <button
            onClick={handleAdd30}
            className="timer-btn secondary"
            title="Adicionar 30 segundos"
          >
            <Plus size={14} />
            <span>+30s</span>
          </button>

          <button
            onClick={handleReset}
            className="timer-btn icon-only"
            title="Reiniciar"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
