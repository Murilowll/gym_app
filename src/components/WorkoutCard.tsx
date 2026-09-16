import React from 'react';
import type { WorkoutDay, Exercise } from '../types/workout';
import { Play, Dumbbell, CheckCircle2, ChevronRight, Moon, ShieldCheck, SlidersHorizontal } from 'lucide-react';

interface WorkoutCardProps {
  workoutDay: WorkoutDay;
  isToday: boolean;
  isCompleted: boolean;
  onStartWorkout: () => void;
  onSelectExercise: (exercise: Exercise) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workoutDay,
  isToday,
  isCompleted,
  onStartWorkout,
  onSelectExercise
}) => {
  if (workoutDay.isRestDay) {
    return (
      <div className="rest-day-card">
        <div className="rest-day-header">
          <div className="rest-icon-ring">
            <Moon size={32} />
          </div>
          <span className="rest-day-pill">DOMINGO &bull; REPOUSO ANABÓLICO</span>
          <h2 className="rest-day-title">{workoutDay.name}</h2>
          <p className="rest-day-subtitle">{workoutDay.tagline}</p>
        </div>

        <div className="rest-guide-box">
          <h4 className="rest-guide-title">
            <ShieldCheck size={16} /> Dicas do Coach para Hoje:
          </h4>
          <ul className="rest-guide-tips">
            {workoutDay.coachTips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const dayNamesMap: Record<string, string> = {
    segunda: 'Segunda-feira',
    terca: 'Terça-feira',
    quarta: 'Quarta-feira',
    quinta: 'Quinta-feira',
    sexta: 'Sexta-feira',
    sabado: 'Sábado',
    domingo: 'Domingo'
  };

  const dayLabel = dayNamesMap[workoutDay.key] || 'Treino';

  return (
    <div className="workout-view-stack">
      {/* Grade Superior Modular Estilo Liquid Glass (Igual à imagem de referência) */}
      <div className="modular-hero-grid">
        {/* Card 1: Número do Treino, Nome e Dia */}
        <div className="modular-mini-card">
          <div className="modular-card-head">
            <div className="modular-circle-badge">
              <span>{workoutDay.dayNumber}</span>
            </div>
            <button type="button" className="modular-tune-btn" title="Configurações do treino">
              <SlidersHorizontal size={14} />
            </button>
          </div>
          <div className="modular-card-body">
            <h3 className="modular-card-title">{workoutDay.name.split('(')[0].trim()}</h3>
            <span className="modular-card-subtitle">{dayLabel}</span>
          </div>
        </div>

        {/* Card 2: Métrica de Volume / Duração e Foco */}
        <div className="modular-mini-card">
          <div className="modular-card-head">
            <div className="modular-big-metric">
              <span className="metric-val">~{workoutDay.estimatedMinutes}</span>
              <span className="metric-unit">min</span>
            </div>
            <button type="button" className="modular-tune-btn" title="Opções">
              <SlidersHorizontal size={14} />
            </button>
          </div>
          <div className="modular-card-body">
            <h3 className="modular-card-title">{workoutDay.exercises.length} Exercícios</h3>
            <span className="modular-card-subtitle">Foco Hipertrofia</span>
          </div>
        </div>
      </div>

      {/* Card Horizontal do Treino com Heatmap de Atividade */}
      <div className={`workout-overview-card ${isCompleted ? 'completed' : ''}`}>
        <div className="activity-matrix-bar">
          <div className="activity-month-col">
            <span className="month-label">Jan</span>
            <div className="dots-row">
              <span className="act-dot" /><span className="act-dot active" /><span className="act-dot" /><span className="act-dot" /><span className="act-dot active" />
            </div>
            <div className="dots-row">
              <span className="act-dot active" /><span className="act-dot" /><span className="act-dot active" /><span className="act-dot" /><span className="act-dot" />
            </div>
          </div>
          <div className="activity-month-col">
            <span className="month-label">Fev</span>
            <div className="dots-row">
              <span className="act-dot" /><span className="act-dot active" /><span className="act-dot active" /><span className="act-dot" /><span className="act-dot" />
            </div>
            <div className="dots-row">
              <span className="act-dot active" /><span className="act-dot" /><span className="act-dot active" /><span className="act-dot active" /><span className="act-dot" />
            </div>
          </div>
          <div className="activity-month-col">
            <span className="month-label">Mar</span>
            <div className="dots-row">
              <span className="act-dot active" /><span className="act-dot" /><span className="act-dot" /><span className="act-dot" /><span className="act-dot" />
            </div>
            <div className="dots-row">
              <span className="act-dot" /><span className="act-dot active" /><span className="act-dot" /><span className="act-dot" /><span className="act-dot" />
            </div>
          </div>
        </div>

        {/* Informações Centrais e Botão de Ação */}
        <div className="workout-banner">
          <div className="banner-top-badges">
            <span className="focus-pill">🎯 {workoutDay.focus}</span>
            {isToday && (
              <span className="today-pill-subtle">
                HOJE
              </span>
            )}
          </div>

          <h2 className="workout-main-title">{workoutDay.name}</h2>
          <p className="workout-tagline">{workoutDay.tagline}</p>

          <div className="workout-cta-row">
            <button type="button" onClick={onStartWorkout} className="start-workout-hero-btn">
              <Play size={18} fill="currentColor" />
              <span>{isCompleted ? 'Refazer Treino' : 'Iniciar Treino Agora'}</span>
            </button>

            {isCompleted && (
              <div className="completed-tag">
                <CheckCircle2 size={16} />
                <span>Concluído</span>
              </div>
            )}
          </div>
        </div>

        {/* Lista Compacta de Exercícios de Musculação */}
        <div className="exercises-overview-section">
          <div className="section-header-compact">
            <h3 className="section-title-clean">
              <Dumbbell size={17} />
              Exercícios ({workoutDay.exercises.length})
            </h3>
            <span className="section-hint">Toque para biomecânica</span>
          </div>

          <div className="exercises-compact-grid">
            {workoutDay.exercises.map((exercise, idx) => (
              <div
                key={exercise.id}
                className="exercise-compact-item"
                onClick={() => onSelectExercise(exercise)}
              >
                <div className="compact-left">
                  <span className="compact-index">{idx + 1}</span>
                  <div className="compact-text">
                    <span className="compact-machine">{exercise.machineName}</span>
                    <h4 className="compact-name">{exercise.name}</h4>
                    <div className="compact-meta-row">
                      <span className="badge-meta">{exercise.sets} séries</span>
                      <span className="badge-meta">{exercise.reps} reps</span>
                      <span className="badge-meta rest">⏱️ {exercise.suggestedRestSeconds}s</span>
                    </div>
                  </div>
                </div>

                <div className="compact-right">
                  <ChevronRight size={18} className="chevron-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
