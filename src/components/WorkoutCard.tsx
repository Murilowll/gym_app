import React from 'react';
import type { WorkoutDay, Exercise } from '../types/workout';
import { Play, Clock, Dumbbell, CheckCircle2, ChevronRight, Moon, ShieldCheck, Info, Flame } from 'lucide-react';

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
            <Moon size={32} className="moon-pulse" />
          </div>
          <span className="rest-day-pill">DOMINGO &bull; REPOUSO ANABÓLICO</span>
          <h2 className="rest-day-title">{workoutDay.name}</h2>
          <p className="rest-day-subtitle">{workoutDay.tagline}</p>
        </div>

        <div className="rest-guide-box">
          <h4 className="rest-guide-title">
            <ShieldCheck size={16} /> Orientações de Recuperação:
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

  return (
    <div className={`workout-overview-card ${isCompleted ? 'completed' : ''}`}>
      {/* Topo do Card de Treino */}
      <div className="workout-banner">
        <div className="banner-top-badges">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="focus-pill">🎯 {workoutDay.focus}</span>
            {isToday && (
              <span className="today-pill" style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#f59e0b',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                padding: '3px 8px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Flame size={12} /> HOJE
              </span>
            )}
          </div>
          <div className="banner-time">
            <Clock size={14} />
            <span>~{workoutDay.estimatedMinutes} min</span>
          </div>
        </div>

        <h1 className="workout-main-title">{workoutDay.name}</h1>
        <p className="workout-tagline">{workoutDay.tagline}</p>

        {/* Dicas Rápidas do Treinador */}
        {workoutDay.coachTips && workoutDay.coachTips.length > 0 && (
          <div className="coach-highlight-quote">
            <Info size={15} className="info-icon" />
            <span>{workoutDay.coachTips[0]}</span>
          </div>
        )}

        {/* Botão de Chamada Principal */}
        <div className="workout-cta-row">
          <button onClick={onStartWorkout} className="start-workout-hero-btn">
            <Play size={20} className="play-icon-pulse" />
            <span>{isCompleted ? 'Refazer Treino' : 'Iniciar Treino Agora'}</span>
          </button>

          {isCompleted && (
            <div className="completed-tag">
              <CheckCircle2 size={16} />
              <span>Treino Concluído Hoje</span>
            </div>
          )}
        </div>
      </div>

      {/* Grade de Exercícios do Treino */}
      <div className="exercises-overview-section">
        <div className="section-header-compact">
          <h3 className="section-title-clean">
            <Dumbbell size={18} />
            Exercícios de Musculação ({workoutDay.exercises.length})
          </h3>
          <span className="section-hint">Toque para ver postura e máquina</span>
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
  );
};
