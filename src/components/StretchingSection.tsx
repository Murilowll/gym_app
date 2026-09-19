import React, { useState } from 'react';
import type { Stretch } from '../types/workout';
import { ShieldCheck, Play, CheckCircle2, Clock, Sparkles, X, Maximize2 } from 'lucide-react';
import { playTimerBeep } from '../utils/sound';
import { getStretchGif } from '../utils/stretchMedia';

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
  const [previewStretch, setPreviewStretch] = useState<Stretch | null>(null);

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
            <h3 className="section-title">Mobilidade & Alongamento</h3>
            <p className="section-subtitle">Aquecimento articular com animação biomecânica</p>
          </div>
        </div>
        <span className="count-badge">
          {completedStretches.length}/{stretches.length}
        </span>
      </div>

      <div className="stretches-list">
        {stretches.map((stretch) => {
          const isDone = completedStretches.includes(stretch.id);
          const isTiming = activeStretchId === stretch.id;
          const gifUrl = getStretchGif(stretch);

          // Encurtar instrução longa para 1 frase direta
          const shortInstruction = stretch.instruction.split('.')[0] + '.';

          return (
            <div
              key={stretch.id}
              className={`stretch-item-row ${isDone ? 'done' : ''} ${isTiming ? 'timing' : ''}`}
            >
              <button
                type="button"
                onClick={() => toggleStretchCompleted(stretch.id)}
                className={`check-square-btn ${isDone ? 'checked' : ''}`}
                title={isDone ? 'Desmarcar' : 'Concluir'}
              >
                {isDone ? <CheckCircle2 size={18} /> : <div className="square-empty" />}
              </button>

              {/* GIF Animado em Miniatura */}
              <div
                className="stretch-thumb-wrapper"
                onClick={() => setPreviewStretch(stretch)}
                title="Toque para ampliar demonstração animada"
              >
                <img
                  src={gifUrl}
                  alt={stretch.name}
                  className="stretch-gif-thumb"
                  loading="lazy"
                />
                <div className="stretch-thumb-zoom-icon">
                  <Maximize2 size={11} />
                </div>
              </div>

              <div className="stretch-content">
                <div className="stretch-header-line">
                  <span
                    className="stretch-name"
                    onClick={() => setPreviewStretch(stretch)}
                    style={{ cursor: 'pointer' }}
                    title="Ver detalhes do alongamento"
                  >
                    {stretch.name}
                  </span>
                  <span className="joint-tag">{stretch.targetJoint}</span>
                </div>
                <p className="stretch-instruction">{shortInstruction}</p>
                {stretch.focusTip && (
                  <div className="stretch-tip">
                    <Sparkles size={11} className="tip-star" />
                    <span>{stretch.focusTip}</span>
                  </div>
                )}
              </div>

              <div className="stretch-actions">
                {isTiming ? (
                  <button
                    type="button"
                    onClick={stopStretchTimer}
                    className="timer-action-pill active"
                  >
                    <Clock size={12} className="spin-slow" />
                    <span>{secondsRemaining}s</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => startStretchTimer(stretch)}
                    className="timer-action-pill"
                    title="Iniciar timer"
                  >
                    <Play size={11} fill="currentColor" />
                    <span>{stretch.durationSeconds}s</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Demonstração em Tela Cheia do Alongamento */}
      {previewStretch && (
        <div className="modal-backdrop" onClick={() => setPreviewStretch(null)}>
          <div
            className="stretch-preview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="stretch-preview-header">
              <div>
                <span className="joint-tag" style={{ display: 'inline-block', marginBottom: '6px' }}>
                  {previewStretch.targetJoint}
                </span>
                <h3 className="stretch-preview-title">{previewStretch.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewStretch(null)}
                className="stretch-preview-close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="stretch-preview-media-box">
              <img
                src={getStretchGif(previewStretch)}
                alt={previewStretch.name}
                className="stretch-preview-gif"
              />
            </div>

            <div className="stretch-preview-info">
              <div className="stretch-preview-instruction-box">
                <strong>Instrução Biomecânica:</strong>
                <p>{previewStretch.instruction}</p>
              </div>

              {previewStretch.focusTip && (
                <div className="stretch-preview-tip-box">
                  <Sparkles size={14} className="tip-star" />
                  <span><strong>Dica do Treinador:</strong> {previewStretch.focusTip}</span>
                </div>
              )}

              <div className="stretch-preview-timer-cta">
                {activeStretchId === previewStretch.id ? (
                  <button
                    type="button"
                    onClick={stopStretchTimer}
                    className="stretch-timer-big-btn active"
                  >
                    <Clock size={16} className="spin-slow" />
                    <span>Pausar ({secondsRemaining}s restantes)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => startStretchTimer(previewStretch)}
                    className="stretch-timer-big-btn"
                  >
                    <Play size={16} fill="currentColor" />
                    <span>Iniciar Alongamento ({previewStretch.durationSeconds}s)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
