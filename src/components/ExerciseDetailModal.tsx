import React from 'react';
import type { Exercise } from '../types/workout';
import { ExerciseIllustration } from './ExerciseIllustration';
import { X, Sliders, CheckCircle2, AlertTriangle, ArrowRightLeft, Target, Sparkles, Clock } from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  onClose: () => void;
  onSelectAlternative?: (altName: string) => void;
  onStartTimer: (seconds: number) => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  onClose,
  onSelectAlternative,
  onStartTimer
}) => {
  if (!exercise) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-text">
            <span className="modal-category-badge">
              <Target size={13} />
              {exercise.machineName}
            </span>
            <h2 className="modal-title">{exercise.name}</h2>
          </div>
          <button onClick={onClose} className="modal-close-btn" title="Fechar">
            <X size={20} />
          </button>
        </div>

        <div className="modal-scroll-body">
          {/* Demonstração visual de máquina e ativação muscular */}
          <div className="modal-visual-card">
            <ExerciseIllustration
              id={exercise.id}
              type={exercise.visualType}
              name={exercise.name}
              targetMuscles={exercise.targetMuscles}
              secondaryMuscles={exercise.secondaryMuscles}
            />
          </div>

          {/* Ficha rápida de hipertrofia */}
          {/* Ficha rápida de hipertrofia */}
          <div className="stats-pill-grid">
            <div className="stat-pill-box">
              <span className="stat-pill-label">Séries</span>
              <span className="stat-pill-value">{exercise.sets}</span>
            </div>
            <div className="stat-pill-box">
              <span className="stat-pill-label">Reps</span>
              <span className="stat-pill-value">{exercise.reps}</span>
            </div>
            <div className="stat-pill-box">
              <span className="stat-pill-label">Descanso</span>
              <button
                onClick={() => onStartTimer(exercise.suggestedRestSeconds)}
                className="stat-pill-btn"
                title="Iniciar timer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Clock size={13} /> {exercise.suggestedRestSeconds}s
              </button>
            </div>
          </div>

          {/* Como regular o aparelho */}
          <div className="guide-card">
            <div className="guide-card-header">
              <Sliders size={16} className="guide-icon cyan" />
              <h3>Ajuste do Aparelho</h3>
            </div>
            <ul className="guide-list">
              {exercise.machineAdjustment.map((step, idx) => (
                <li key={idx} className="guide-item">
                  <span className="step-num">{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dicas de Execução Correta */}
          <div className="guide-card">
            <div className="guide-card-header">
              <CheckCircle2 size={16} className="guide-icon green" />
              <h3>Execução</h3>
            </div>
            <ul className="guide-list">
              {exercise.executionTips.map((tip, idx) => (
                <li key={idx} className="guide-item check">
                  <span className="bullet-check">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Erros comuns a evitar */}
          <div className="guide-card warning-accent">
            <div className="guide-card-header">
              <AlertTriangle size={16} className="guide-icon amber" />
              <h3>Atenção</h3>
            </div>
            <ul className="guide-list">
              {exercise.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="guide-item alert">
                  <span className="bullet-alert">!</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Alternativas se o aparelho estiver ocupado */}
          {exercise.alternatives && exercise.alternatives.length > 0 && (
            <div className="guide-card alternatives-box">
              <div className="guide-card-header">
                <ArrowRightLeft size={16} className="guide-icon purple" />
                <h3>Substituições</h3>
              </div>
              <div className="alt-grid">
                {exercise.alternatives.map((alt, idx) => (
                  <div key={idx} className="alt-card">
                    <div className="alt-card-top">
                      <span className="alt-name">{alt.name}</span>
                      <span className="alt-equip">{alt.equipment}</span>
                    </div>
                    <p className="alt-reason">{alt.reason}</p>
                    {onSelectAlternative && (
                      <button
                        onClick={() => {
                          onSelectAlternative(alt.name);
                          onClose();
                        }}
                        className="alt-use-btn"
                      >
                        <Sparkles size={12} />
                        Usar este
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer-actions">
          <button
            onClick={() => onStartTimer(exercise.suggestedRestSeconds)}
            className="action-btn secondary"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <Clock size={14} /> {exercise.suggestedRestSeconds}s
          </button>
          <button onClick={onClose} className="action-btn primary">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
