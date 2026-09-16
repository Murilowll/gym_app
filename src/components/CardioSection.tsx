import React, { useState, useEffect } from 'react';
import type { Cardio } from '../types/workout';
import { Activity, Play, Pause, RotateCcw, CheckCircle2, Flame } from 'lucide-react';
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
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setTimeLeft(cardio.durationMinutes * 60);
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
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onCardioFinished]);

  const minutes = Math.floor(Math.max(0, timeLeft) / 60);
  const seconds = Math.max(0, timeLeft) % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const progressPercent = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
    setIsCompleted(false);
  };

  const handleToggleComplete = () => {
    const next = !isCompleted;
    setIsCompleted(next);
    if (next) {
      playSuccessChime();
      if (onCardioFinished) onCardioFinished();
    }
  };

  return (
    <div className={`cardio-card ${isCompleted ? 'completed-border' : ''}`}>
      <div className="section-title-row">
        <div className="title-with-icon">
          <div className="icon-badge cyan">
            <Activity size={18} />
          </div>
          <div>
            <h3 className="section-title">{cardio.title}</h3>
            <p className="section-subtitle">
              {cardio.durationMinutes} min &bull; Intensidade {cardio.intensity}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleComplete}
          className={`cardio-status-badge ${isCompleted ? 'done' : ''}`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 size={14} />
              <span>Concluído</span>
            </>
          ) : (
            <>
              <Flame size={13} />
              <span>Iniciar</span>
            </>
          )}
        </button>
      </div>

      <div className="cardio-stats-bar">
        <div className="cardio-stat">
          <span className="label">Ritmo</span>
          <span className="val">{cardio.targetPace}</span>
        </div>
        <div className="cardio-stat">
          <span className="label">Tempo</span>
          <span className="val">{cardio.durationMinutes} min</span>
        </div>
        <div className="cardio-stat">
          <span className="label">Impacto</span>
          <span className="val highlight">Baixo</span>
        </div>
      </div>

      <p className="cardio-instruction-text">
        {cardio.instruction}
      </p>

      {/* Cronômetro integrado de cardio */}
      <div className="cardio-timer-box">
        <div className="cardio-timer-display">
          <span className="cardio-time-digits">{formattedTime}</span>
        </div>

        <div className="cardio-progress-bar-bg">
          <div
            className="cardio-progress-fill"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>

        <div className="cardio-timer-controls">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`timer-ctrl-btn ${isRunning ? 'active' : 'primary'}`}
          >
            {isRunning ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
            <span>{isRunning ? 'Pausar' : 'Iniciar'}</span>
          </button>
          <button onClick={handleReset} className="timer-ctrl-btn secondary" title="Reiniciar">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
