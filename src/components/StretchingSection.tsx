import React, { useState } from 'react';
import type { Stretch } from '../types/workout';
import { ShieldCheck, Play, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { playTimerBeep } from '../utils/sound';

interface StretchingSectionProps {
  stretches: Stretch[];
  onAllCompleted?: () => void;
}

export const StretchingSection: React.FC<StretchingSectionProps> = ({
  stretches,
  onAllCompleted
}) => {
  const [completedStretches, setCompletedStretches] = useState<string[]>([]);
  const [activeStretchId, setActiveStretchId] = useState<string | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const startStretchTimer = (stretch: Stretch) => {
    if (intervalId) clearInterval(intervalId);

    setActiveStretchId(stretch.id);
    setSecondsRemaining(stretch.durationSeconds);

    const id = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setIntervalId(null);
          setActiveStretchId(null);
          playTimerBeep(true);
          toggleStretchCompleted(stretch.id);
          return 0;
        }
        if (prev <= 4) {
          playTimerBeep(false);
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  const stopStretchTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setActiveStretchId(null);
  };

  const toggleStretchCompleted = (id: string) => {
    setCompletedStretches((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (next.length === stretches.length && onAllCompleted) {
        onAllCompleted();
      }
      return next;
    });
  };

  return (
    <div className="stretching-card">
      <div className="section-title-row">
        <div className="title-with-icon">
          <div className="icon-badge green">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h3 className="section-title">Mobilidade & Alongamento Dinâmico</h3>
            <p className="section-subtitle">
              Faça antes do treino para aquecer a articulação e prevenir lesões
            </p>
          </div>
        </div>
        <span className="count-badge">
          {completedStretches.length}/{stretches.length} feitos
        </span>
      </div>

      <div className="stretches-list">
        {stretches.map((stretch) => {
          const isDone = completedStretches.includes(stretch.id);
          const isTiming = activeStretchId === stretch.id;

          return (
            <div
              key={stretch.id}
              className={`stretch-item-row ${isDone ? 'done' : ''} ${isTiming ? 'timing' : ''}`}
            >
              <button
                onClick={() => toggleStretchCompleted(stretch.id)}
                className={`check-square-btn ${isDone ? 'checked' : ''}`}
                title={isDone ? 'Desmarcar' : 'Marcar como feito'}
              >
                {isDone ? <CheckCircle2 size={18} /> : <div className="square-empty" />}
              </button>

              <div className="stretch-content">
                <div className="stretch-header-line">
                  <span className="stretch-name">{stretch.name}</span>
                  <span className="joint-tag">🎯 {stretch.targetJoint}</span>
                </div>
                <p className="stretch-instruction">{stretch.instruction}</p>
                <div className="stretch-tip">
                  <Sparkles size={12} className="tip-star" />
                  <span>{stretch.focusTip}</span>
                </div>
              </div>

              <div className="stretch-actions">
                {isTiming ? (
                  <button
                    onClick={stopStretchTimer}
                    className="timer-action-pill active"
                  >
                    <Clock size={13} className="spin-slow" />
                    <span>{secondsRemaining}s</span>
                  </button>
                ) : (
                  <button
                    onClick={() => startStretchTimer(stretch)}
                    className="timer-action-pill"
                    title="Iniciar cronômetro para este alongamento"
                  >
                    <Play size={12} />
                    <span>{stretch.durationSeconds}s</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
