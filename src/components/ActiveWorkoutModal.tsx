import React, { useState, useEffect } from 'react';
import type { Exercise, WorkoutDay, SetLog } from '../types/workout';
import { ExerciseIllustration } from './ExerciseIllustration';
import {
  X,
  Check,
  Sliders,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  Timer,
  Trophy,
  Dumbbell
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../utils/sound';
import { recordExerciseWeight } from '../utils/storage';

interface ActiveWorkoutModalProps {
  workoutDay: WorkoutDay;
  isOpen: boolean;
  onClose: () => void;
  onOpenDetail: (exercise: Exercise) => void;
  onStartRestTimer: (seconds: number) => void;
  onFinishWorkout: (completedSets: number, totalVolumeKg: number) => void;
}

export const ActiveWorkoutModal: React.FC<ActiveWorkoutModalProps> = ({
  workoutDay,
  isOpen,
  onClose,
  onOpenDetail,
  onStartRestTimer,
  onFinishWorkout
}) => {
  // Estado das séries de cada exercício
  const [exerciseSets, setExerciseSets] = useState<{ [exerciseId: string]: SetLog[] }>({});
  const [collapsedExercises, setCollapsedExercises] = useState<{ [exerciseId: string]: boolean }>({});
  const [exerciseOverrides, setExerciseOverrides] = useState<{ [exerciseId: string]: string }>({});

  useEffect(() => {
    if (!isOpen) return;

    // Inicializa as séries se ainda não existirem
    const initial: { [exerciseId: string]: SetLog[] } = {};
    workoutDay.exercises.forEach((ex) => {
      initial[ex.id] = Array.from({ length: ex.sets }, (_, i) => ({
        setIndex: i + 1,
        weightKg: 20, // Padrão inicial razoável
        repsDone: parseInt(ex.reps.split('-')[0].trim()) || 10,
        completed: false
      }));
    });
    setExerciseSets(initial);
  }, [isOpen, workoutDay]);

  if (!isOpen) return null;

  const totalSets = workoutDay.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const completedSetsCount = Object.values(exerciseSets)
    .flat()
    .filter((s) => s.completed).length;
  const progressPercent = totalSets > 0 ? (completedSetsCount / totalSets) * 100 : 0;

  const handleToggleSet = (exercise: Exercise, setIndex: number) => {
    setExerciseSets((prev) => {
      const currentSets = prev[exercise.id] || [];
      const updated = currentSets.map((s) => {
        if (s.setIndex === setIndex) {
          const nextCompleted = !s.completed;
          if (nextCompleted) {
            // Dispara timer de descanso automático para hipertrofia
            onStartRestTimer(exercise.suggestedRestSeconds);
            // Salva a carga máxima para o histórico
            recordExerciseWeight(exercise.id, s.weightKg);
          }
          return { ...s, completed: nextCompleted };
        }
        return s;
      });
      return { ...prev, [exercise.id]: updated };
    });
  };

  const handleUpdateWeight = (exerciseId: string, setIndex: number, newWeight: number) => {
    setExerciseSets((prev) => {
      const currentSets = prev[exerciseId] || [];
      const updated = currentSets.map((s) =>
        s.setIndex === setIndex ? { ...s, weightKg: Math.max(0, newWeight) } : s
      );
      return { ...prev, [exerciseId]: updated };
    });
  };

  const handleUpdateReps = (exerciseId: string, setIndex: number, newReps: number) => {
    setExerciseSets((prev) => {
      const currentSets = prev[exerciseId] || [];
      const updated = currentSets.map((s) =>
        s.setIndex === setIndex ? { ...s, repsDone: Math.max(1, newReps) } : s
      );
      return { ...prev, [exerciseId]: updated };
    });
  };

  const toggleCollapse = (exerciseId: string) => {
    setCollapsedExercises((prev) => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  const handleFinish = () => {
    // Calcula volume total em kg (peso x reps)
    let totalVol = 0;
    Object.values(exerciseSets)
      .flat()
      .forEach((s) => {
        if (s.completed) {
          totalVol += s.weightKg * s.repsDone;
        }
      });

    playSuccessChime();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    onFinishWorkout(completedSetsCount, totalVol);
    onClose();
  };

  return (
    <div className="active-workout-fullscreen">
      {/* Topo fixo do treino ativo */}
      <div className="active-workout-header">
        <div className="active-header-main">
          <div>
            <div className="live-pill">
              <span className="live-dot" />
              Em Andamento
            </div>
            <h2 className="active-workout-title">{workoutDay.name}</h2>
          </div>
          <button onClick={onClose} className="active-close-btn" title="Minimizar treino">
            <X size={20} />
          </button>
        </div>

        {/* Barra de progresso de séries */}
        <div className="active-progress-container">
          <div className="active-progress-info">
            <span className="active-progress-text">
              {completedSetsCount} de {totalSets} séries concluídas
            </span>
            <span className="active-progress-pct">{Math.round(progressPercent)}%</span>
          </div>
          <div className="active-progress-bar-track">
            <div
              className="active-progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lista de Exercícios para execução */}
      <div className="active-workout-body">
        {workoutDay.exercises.map((exercise, exIndex) => {
          const sets = exerciseSets[exercise.id] || [];
          const isAllDone = sets.length > 0 && sets.every((s) => s.completed);
          const isCollapsed = collapsedExercises[exercise.id];
          const activeName = exerciseOverrides[exercise.id] || exercise.name;

          return (
            <div
              key={exercise.id}
              className={`active-exercise-card ${isAllDone ? 'all-done' : ''}`}
            >
              {/* Topo do Exercício com Ilustração Compacta */}
              <div className="active-ex-top-row">
                <div className="active-ex-index">{exIndex + 1}</div>

                <div className="active-ex-info" onClick={() => onOpenDetail(exercise)}>
                  <span className="active-machine-tag">{exercise.machineName}</span>
                  <h3 className="active-ex-name">{activeName}</h3>
                  <div className="active-ex-meta">
                    <span>{exercise.sets}x {exercise.reps}</span> &bull;{' '}
                    <span className="rest-hint">⏱️ {exercise.suggestedRestSeconds}s</span>
                  </div>
                </div>

                <div className="active-ex-top-actions">
                  <button
                    onClick={() => onOpenDetail(exercise)}
                    className="detail-peek-btn"
                    title="Ver detalhes da máquina"
                  >
                    <Sliders size={16} />
                  </button>
                  <button
                    onClick={() => toggleCollapse(exercise.id)}
                    className="collapse-toggle-btn"
                  >
                    {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                  </button>
                </div>
              </div>

              {!isCollapsed && (
                <>
                  {/* Ilustração visual da máquina e ativação */}
                  <div
                    className="active-visual-embed"
                    onClick={() => onOpenDetail(exercise)}
                    title="Clique para ver detalhes"
                  >
                    <ExerciseIllustration
                      id={exercise.id}
                      type={exercise.visualType}
                      name={exercise.name}
                      targetMuscles={exercise.targetMuscles}
                      secondaryMuscles={exercise.secondaryMuscles}
                    />
                    <div className="visual-overlay-hint">
                      <Sliders size={13} /> Detalhes
                    </div>
                  </div>

                  {/* Tabela de Séries (Set, Peso, Reps, Concluir) */}
                  <div className="sets-table-wrapper">
                    <div className="sets-table-head">
                      <span>#</span>
                      <span>CARGA (KG)</span>
                      <span>REPS</span>
                      <span>OK</span>
                    </div>

                    <div className="sets-table-rows">
                      {sets.map((set) => (
                        <div
                          key={set.setIndex}
                          className={`set-row ${set.completed ? 'completed' : ''}`}
                        >
                          <span className="set-num-badge">{set.setIndex}</span>

                          {/* Input de Carga (kg) */}
                          <div className="input-with-stepper">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateWeight(exercise.id, set.setIndex, set.weightKg - 2)
                              }
                              className="step-btn"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={set.weightKg}
                              onChange={(e) =>
                                handleUpdateWeight(
                                  exercise.id,
                                  set.setIndex,
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="weight-input"
                              min="0"
                              step="1"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateWeight(exercise.id, set.setIndex, set.weightKg + 2)
                              }
                              className="step-btn"
                            >
                              +
                            </button>
                          </div>

                          {/* Input de Repetições */}
                          <div className="input-with-stepper">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateReps(exercise.id, set.setIndex, set.repsDone - 1)
                              }
                              className="step-btn"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={set.repsDone}
                              onChange={(e) =>
                                handleUpdateReps(
                                  exercise.id,
                                  set.setIndex,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="reps-input"
                              min="1"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateReps(exercise.id, set.setIndex, set.repsDone + 1)
                              }
                              className="step-btn"
                            >
                              +
                            </button>
                          </div>

                          {/* Botão de Concluir Série */}
                          <button
                            type="button"
                            onClick={() => handleToggleSet(exercise, set.setIndex)}
                            className={`set-check-btn ${set.completed ? 'done' : ''}`}
                            title={set.completed ? 'Desmarcar' : 'Concluir série'}
                          >
                            {set.completed ? <Check size={18} /> : <span className="empty-check" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ações Rápidas do Exercício */}
                  <div className="active-ex-actions-row">
                    <button
                      onClick={() => onStartRestTimer(exercise.suggestedRestSeconds)}
                      className="quick-timer-link"
                    >
                      <Timer size={14} />
                      Descanso {exercise.suggestedRestSeconds}s
                    </button>

                    {exercise.alternatives && exercise.alternatives.length > 0 && (
                      <button
                        onClick={() => {
                          const nextAlt = exercise.alternatives[0].name;
                          setExerciseOverrides((prev) => ({ ...prev, [exercise.id]: nextAlt }));
                        }}
                        className="alt-swap-link"
                        title="Trocar por exercício reserva"
                      >
                        <ArrowRightLeft size={13} />
                        Trocar
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Barra Inferior com Finalizar Treino */}
      <div className="active-workout-bottom-bar">
        <div className="bottom-bar-summary">
          <Dumbbell size={16} className="summary-icon" />
          <span>{completedSetsCount} séries concluídas</span>
        </div>

        <button onClick={handleFinish} className="finish-workout-btn">
          <Trophy size={16} />
          <span>Concluir Treino</span>
        </button>
      </div>
    </div>
  );
};
