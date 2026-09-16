import React, { useState, useEffect } from 'react';
import type { Cardio } from '../types/workout';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  HeartPulse, 
  Gauge, 
  Timer as TimerIcon,
  Flame,
  Sparkles,
  Plus,
  Minus
} from 'lucide-react';
import { playSuccessChime, playTimerBeep } from '../utils/sound';

interface CardioSectionProps {
  cardio?: Cardio;
  onCardioFinished?: () => void;
}

export const CardioSection: React.FC<CardioSectionProps> = ({
  cardio,
  onCardioFinished
}) => {
  if (!cardio) return null;

  const totalSeconds = cardio.durationMinutes * 60;
  const [targetSeconds, setTargetSeconds] = useState(totalSeconds);
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const s = cardio.durationMinutes * 60;
    setTargetSeconds(s);
    setTimeLeft(s);
    setIsRunning(false);
    setIsCompleted(false);
  }, [cardio]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      setIsCompleted(true);
      playSuccessChime();
      if (onCardioFinished) onCardioFinished();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          playTimerBeep(true);
        } else if (prev <= 4) {
          playTimerBeep(false);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onCardioFinished]);

  const minutes = Math.floor(Math.max(0, timeLeft) / 60);
  const seconds = Math.max(0, timeLeft) % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const progressPercent = targetSeconds > 0 ? ((targetSeconds - timeLeft) / targetSeconds) * 100 : 0;

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(targetSeconds);
    setIsCompleted(false);
  };

  const handleAdjustMinutes = (delta: number) => {
    const nextSeconds = Math.max(60, targetSeconds + delta * 60);
    setTargetSeconds(nextSeconds);
    setTimeLeft((prev) => Math.max(0, prev + delta * 60));
  };

  const handleToggleComplete = () => {
    const next = !isCompleted;
    setIsCompleted(next);
    if (next) {
      setIsRunning(false);
      playSuccessChime();
      if (onCardioFinished) onCardioFinished();
    }
  };

  // Resumir instrução para 1 frase direta e objetiva
  const shortInstruction = cardio.instruction
    ? cardio.instruction.split('.')[0] + '.'
    : 'Caminhada moderada para acelerar a recuperação e drenagem metabólica.';

  return (
    <div className={`cardio-card ${isCompleted ? 'completed-border' : ''}`}>
      {/* Header */}
      <div className="section-title-row">
        <div className="title-with-icon">
          <div className="icon-badge cyan">
            <HeartPulse size={18} />
          </div>
          <div>
            <h3 className="section-title">Cardio &bull; Desaquecimento</h3>
            <p className="section-subtitle">Recuperação Ativa &bull; {cardio.durationMinutes} min</p>
          </div>
        </div>

        <button
          onClick={handleToggleComplete}
          className={`cardio-status-badge ${isCompleted ? 'done' : ''}`}
          type="button"
        >
          {isCompleted ? (
            <>
              <CheckCircle2 size={13} />
              <span>Concluído</span>
            </>
          ) : (
            <>
              <Flame size={12} />
              <span>Marcar Feito</span>
            </>
          )}
        </button>
      </div>

      {/* Grid de Métricas com Ícones */}
      <div className="cardio-metrics-grid">
        <div className="cardio-metric-chip">
          <div className="metric-chip-icon cyan">
            <Gauge size={14} />
          </div>
          <div className="metric-chip-info">
            <span className="metric-chip-label">RITMO</span>
            <span className="metric-chip-value">{cardio.targetPace || '4.5 - 5.0 km/h'}</span>
          </div>
        </div>

        <div className="cardio-metric-chip">
          <div className="metric-chip-icon emerald">
            <TimerIcon size={14} />
          </div>
          <div className="metric-chip-info">
            <span className="metric-chip-label">TEMPO</span>
            <span className="metric-chip-value">{Math.round(targetSeconds / 60)} min</span>
          </div>
        </div>

        <div className="cardio-metric-chip">
          <div className="metric-chip-icon purple">
            <HeartPulse size={14} />
          </div>
          <div className="metric-chip-info">
            <span className="metric-chip-label">IMPACTO</span>
            <span className="metric-chip-value">Baixo (LISS)</span>
          </div>
        </div>
      </div>

      {/* Instrução resumida */}
      <div className="cardio-summary-pill">
        <Sparkles size={13} className="pill-sparkle" />
        <p className="cardio-summary-text">{shortInstruction}</p>
      </div>

      {/* Widget Interativo de Cronômetro */}
      <div className={`cardio-timer-pod ${isRunning ? 'running' : ''}`}>
        <div className="timer-pod-header">
          <div className="timer-live-badge">
            <span className={`live-pulse-dot ${isRunning ? 'active' : ''}`} />
            <span className="live-status-label">{isRunning ? 'EM ANDAMENTO' : isCompleted ? 'CONCLUÍDO' : 'PRONTO'}</span>
          </div>

          {/* Ajustes rápidos de tempo */}
          <div className="timer-quick-adjusts">
            <button 
              type="button" 
              onClick={() => handleAdjustMinutes(-1)} 
              className="quick-adjust-btn"
              title="Diminuir 1 min"
            >
              <Minus size={12} />
            </button>
            <span className="adjust-unit">1m</span>
            <button 
              type="button" 
              onClick={() => handleAdjustMinutes(1)} 
              className="quick-adjust-btn"
              title="Aumentar 1 min"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>

        {/* Display do Tempo */}
        <div className="timer-pod-digits-wrap">
          <span className="timer-pod-digits">{formattedTime}</span>
        </div>

        {/* Barra de Progresso com Glow */}
        <div className="timer-pod-progress-track">
          <div
            className="timer-pod-progress-bar"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>

        {/* Controles */}
        <div className="timer-pod-actions">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`timer-main-action ${isRunning ? 'pause' : 'play'}`}
          >
            {isRunning ? (
              <>
                <Pause size={16} />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play size={16} fill="currentColor" />
                <span>Iniciar Cardio</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="timer-reset-action"
            title="Reiniciar tempo"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
