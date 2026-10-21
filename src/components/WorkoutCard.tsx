import React from 'react';
import type { WorkoutDay, Exercise } from '../types/workout';
import { Play, Clock, Dumbbell, CheckCircle2, ChevronRight, Moon, ShieldCheck, Flame, Target } from 'lucide-react';
import { getExerciseMedia } from '../utils/exerciseMedia';

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
      <div className="clean-rest-card">
        <div className="clean-rest-icon-circle">
          <Moon size={28} />
        </div>
        <span className="clean-rest-badge">Descanso Ativo</span>
        <h2 className="clean-rest-title">{workoutDay.name}</h2>
        <p className="clean-rest-tagline">{workoutDay.tagline}</p>

        {workoutDay.coachTips && workoutDay.coachTips.length > 0 && (
          <div className="clean-rest-tips-box">
            <h4 className="clean-rest-tips-heading">
              <ShieldCheck size={16} /> Recomendações do Treinador:
            </h4>
            <ul className="clean-rest-tips-list">
              {workoutDay.coachTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`clean-workout-view ${isCompleted ? 'is-completed' : ''}`}>
      {/* Header do Treino em Foco */}
      <section className="clean-workout-hero">
        <div className="clean-hero-tags">
          <span className="clean-focus-tag">
            <Target size={12} />
            {workoutDay.focus || 'Hipertrofia'}
          </span>
          {isToday && (
            <span className="clean-today-badge">
              <Flame size={12} />
              Hoje
            </span>
          )}
          <span className="clean-duration-tag">
            <Clock size={12} />
            {workoutDay.estimatedMinutes} min
          </span>
        </div>

        <h2 className="clean-workout-heading">{workoutDay.name}</h2>
        {workoutDay.tagline && (
          <p className="clean-workout-subtext">{workoutDay.tagline}</p>
        )}

        {/* Botão de Iniciar com Destaque sem Excesso */}
        <div className="clean-cta-container">
          <button onClick={onStartWorkout} className="clean-start-btn">
            <Play size={16} fill="currentColor" />
            <span>{isCompleted ? 'Refazer Treino' : 'Iniciar Treino'}</span>
          </button>

          {isCompleted && (
            <span className="clean-completed-badge">
              <CheckCircle2 size={15} />
              Concluído
            </span>
          )}
        </div>
      </section>

      {/* Lista de Exercícios Limpa e Arejada com Preview Visual */}
      <section className="clean-exercise-list-section">
        <div className="clean-exercise-header-row">
          <h3 className="clean-exercise-count-title">
            <Dumbbell size={16} />
            Exercícios ({workoutDay.exercises.length})
          </h3>
          <span className="clean-exercise-hint">Toque para detalhes</span>
        </div>

        <div className="clean-exercise-items">
          {workoutDay.exercises.map((exercise, idx) => {
            const media = getExerciseMedia(exercise.id, exercise.visualType);
            const previewSrc = exercise.gifUrl || exercise.jpgUrl || media.gif || media.jpg;

            return (
              <div
                key={exercise.id}
                className="clean-exercise-item"
                onClick={() => onSelectExercise(exercise)}
                role="button"
                tabIndex={0}
              >
                <div className="clean-item-thumb-wrapper">
                  <img
                    src={previewSrc}
                    alt={exercise.name}
                    className="clean-item-thumb-img"
                    loading="lazy"
                    onError={(e) => {
                      if (media.jpg && e.currentTarget.src !== media.jpg) {
                        e.currentTarget.src = media.jpg;
                      }
                    }}
                  />
                  <span className="clean-item-thumb-num">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="clean-item-content">
                  <span className="clean-item-machine">{exercise.machineName}</span>
                  <h4 className="clean-item-title">{exercise.name}</h4>
                  <div className="clean-item-badges">
                    <span className="clean-meta-chip sets">
                      {exercise.sets} séries × {exercise.reps}
                    </span>
                    <span className="clean-meta-chip rest">
                      <Clock size={10} /> {exercise.suggestedRestSeconds}s
                    </span>
                  </div>
                </div>

                <div className="clean-item-arrow">
                  <ChevronRight size={18} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
