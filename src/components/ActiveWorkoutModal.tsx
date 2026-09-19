import React, { useState, useEffect } from 'react';
import type { Exercise, WorkoutDay, SetLog } from '../types/workout';
import {
  ChevronLeft,
  Check,
  Pause,
  Play,
  ArrowRight,
  Flame,
  Clock,
  Dumbbell,
  Heart,
  TrendingUp,
  Trophy,
  RotateCcw,
  CheckCircle2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime, playTickSound } from '../utils/sound';
import { recordExerciseWeight } from '../utils/storage';
import { getExerciseMedia } from '../utils/exerciseMedia';

interface ActiveWorkoutModalProps {
  workoutDay: WorkoutDay;
  isOpen: boolean;
  onClose: () => void;
  onOpenDetail?: (exercise: Exercise) => void;
  onStartRestTimer: (seconds: number) => void;
  onFinishWorkout: (completedSets: number, totalVolumeKg: number) => void;
}

export const ActiveWorkoutModal: React.FC<ActiveWorkoutModalProps> = ({
  workoutDay,
  isOpen,
  onClose,
  onStartRestTimer,
  onFinishWorkout
}) => {
  // Fases: 'stretching' -> 'exercises' -> 'cardio' -> 'summary'
  const hasStretches = Boolean(workoutDay.stretches && workoutDay.stretches.length > 0);
  const hasCardio = Boolean(workoutDay.cardio);

  const [phase, setPhase] = useState<'stretching' | 'exercises' | 'cardio' | 'summary'>('stretching');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);

  // Séries por exercício
  const [exerciseSets, setExerciseSets] = useState<{ [exerciseId: string]: SetLog[] }>({});

  // Confirmação para sair
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Modal rápido de edição de carga / repetições
  const [editingSet, setEditingSet] = useState<{
    exerciseId: string;
    setIndex: number;
    weightKg: number;
    repsDone: number;
  } | null>(null);

  // Cronômetro do Cardio
  const [cardioSeconds, setCardioSeconds] = useState(0);
  const [isCardioRunning, setIsCardioRunning] = useState(false);

  // Cronômetro total do treino
  const [totalWorkoutSeconds, setTotalWorkoutSeconds] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    setPhase(hasStretches ? 'stretching' : 'exercises');
    setCurrentExerciseIndex(0);
    setTotalWorkoutSeconds(0);
    setCardioSeconds(0);
    setIsCardioRunning(false);

    // Inicializa as séries de cada exercício
    const initial: { [exerciseId: string]: SetLog[] } = {};
    workoutDay.exercises.forEach((ex) => {
      initial[ex.id] = Array.from({ length: ex.sets }, (_, i) => ({
        setIndex: i + 1,
        weightKg: 30 + i * 5,
        repsDone: parseInt(ex.reps.split('-')[0].trim(), 10) || 10,
        completed: false
      }));
    });
    setExerciseSets(initial);
  }, [isOpen, workoutDay, hasStretches]);

  // Timer geral do treino
  useEffect(() => {
    if (!isOpen || phase === 'summary') return;
    const timer = setInterval(() => {
      setTotalWorkoutSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, phase]);

  // Timer do Cardio
  useEffect(() => {
    if (!isCardioRunning) return;
    const timer = setInterval(() => {
      setCardioSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isCardioRunning]);

  if (!isOpen) return null;

  const currentExercise = workoutDay.exercises[currentExerciseIndex] || workoutDay.exercises[0];
  const currentSets = exerciseSets[currentExercise?.id] || [];

  // Encontra qual é a primeira série incompleta (série ativa)
  const activeSetIndex = currentSets.find((s) => !s.completed)?.setIndex || currentSets.length;

  // Toggle de conclusão de série
  const handleToggleSet = (setIndex: number) => {
    if (!currentExercise) return;

    setExerciseSets((prev) => {
      const sets = prev[currentExercise.id] || [];
      const updated = sets.map((s) => {
        if (s.setIndex === setIndex) {
          const nextCompleted = !s.completed;
          if (nextCompleted) {
            playTickSound();
            onStartRestTimer(currentExercise.suggestedRestSeconds || 60);
            recordExerciseWeight(currentExercise.id, s.weightKg);
          }
          return { ...s, completed: nextCompleted };
        }
        return s;
      });
      return { ...prev, [currentExercise.id]: updated };
    });
  };

  // Salvar edição rápida de carga / reps
  const handleSaveEditSet = (weight: number, reps: number) => {
    if (!editingSet) return;
    setExerciseSets((prev) => {
      const sets = prev[editingSet.exerciseId] || [];
      const updated = sets.map((s) =>
        s.setIndex === editingSet.setIndex
          ? { ...s, weightKg: Math.max(0, weight), repsDone: Math.max(1, reps) }
          : s
      );
      return { ...prev, [editingSet.exerciseId]: updated };
    });
    setEditingSet(null);
  };

  // Avançar exercício ou fase
  const handleNext = () => {
    if (currentExerciseIndex < workoutDay.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      // Último exercício -> vai para Cardio ou Conclusão
      if (hasCardio) {
        setPhase('cardio');
        setIsCardioRunning(true);
      } else {
        handleCompleteWorkout();
      }
    }
  };

  // Concluir treino geral
  const handleCompleteWorkout = () => {
    setPhase('summary');
    playSuccessChime();
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  // Cálculos de totais para o resumo
  const allCompletedSets = Object.values(exerciseSets)
    .flat()
    .filter((s) => s.completed);

  const totalCompletedCount = allCompletedSets.length;
  const totalVolumeKg = allCompletedSets.reduce((acc, s) => acc + s.weightKg * s.repsDone, 0);
  const totalMinutes = Math.max(1, Math.round(totalWorkoutSeconds / 60));

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="workout-session-fullscreen">
      {/* Barra de Navegação Superior */}
      <div className="workout-session-top-nav">
        <button
          type="button"
          className="circular-nav-btn"
          onClick={() => setShowExitConfirm(true)}
          title="Minimizar / Sair do Treino"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          style={{
            background: 'rgba(22, 25, 33, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#ffffff'
          }}
        >
          <Clock size={14} color="#ff9500" />
          <span>{formatTimer(totalWorkoutSeconds)}</span>
        </div>

        <button
          type="button"
          className="circular-nav-btn pause"
          onClick={() => setShowExitConfirm(true)}
          title="Pausar Treino"
        >
          <Pause size={18} fill="currentColor" />
        </button>
      </div>

      {/* =========================================================
          FASE 1: ALONGAMENTO & AQUECIMENTO
          ========================================================= */}
      {phase === 'stretching' && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '80px 24px 30px',
            overflowY: 'auto'
          }}
        >
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span
                style={{
                  background: 'rgba(100, 210, 255, 0.15)',
                  color: '#64d2ff',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              >
                Aquecimento & Mobilidade
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '8px 0 4px', color: '#ffffff' }}>
                Alongamentos do Dia
              </h2>
              <p style={{ fontSize: '13px', color: '#a1a1aa' }}>
                Prepare suas articulações e previna lesões antes de pegar pesado.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {workoutDay.stretches?.map((st) => (
                <div
                  key={st.id}
                  style={{
                    background: '#1a1d24',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                      {st.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#a1a1aa' }}>
                      {st.durationSeconds}s • {st.targetJoint}
                    </p>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64d2ff', fontWeight: 600 }}>
                    {st.durationSeconds}s
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
            <button
              type="button"
              className="btn-next-exercise-cta"
              onClick={() => setPhase('exercises')}
            >
              <span>Iniciar Exercícios de Musculação</span>
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => setPhase('exercises')}
              style={{
                background: 'none',
                border: 'none',
                color: '#a1a1aa',
                fontSize: '13px',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              Pular Alongamento
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          FASE 2: EXERCÍCIOS DE MUSCULAÇÃO (DESIGN IDÊNTICO À FOTO)
          ========================================================= */}
      {phase === 'exercises' && currentExercise && (
        <>
          {/* GIF DE FUNDO REAL E NÍTIDO */}
          <div className="workout-session-gif-wrap">
            <img
              src={getExerciseMedia(currentExercise.id).gif}
              alt={currentExercise.name}
              className="workout-session-gif-img"
            />
            <div className="workout-session-gradient-overlay" />
          </div>

          {/* ÁREA INFERIOR DE SÉRIES E DADOS */}
          <div className="workout-session-body">
            {/* Tabela de Séries (Série, Carga, Repetições, Check) */}
            <div className="workout-sets-table">
              {currentSets.map((set) => {
                const isActive = set.setIndex === activeSetIndex;

                return (
                  <div key={set.setIndex} className="workout-set-row">
                    {/* Indicador de Número ou Ponto Ativo Laranja */}
                    <div className="set-index-col">
                      {isActive ? (
                        <span className="set-active-dot" />
                      ) : (
                        <span>{set.setIndex}</span>
                      )}
                    </div>

                    {/* Botão de Carga (kg) */}
                    <button
                      type="button"
                      className="set-pill-btn"
                      onClick={() =>
                        setEditingSet({
                          exerciseId: currentExercise.id,
                          setIndex: set.setIndex,
                          weightKg: set.weightKg,
                          repsDone: set.repsDone
                        })
                      }
                      title="Clique para editar a carga"
                    >
                      {set.weightKg} kg
                    </button>

                    {/* Botão de Repetições (x) */}
                    <button
                      type="button"
                      className="set-pill-btn"
                      onClick={() =>
                        setEditingSet({
                          exerciseId: currentExercise.id,
                          setIndex: set.setIndex,
                          weightKg: set.weightKg,
                          repsDone: set.repsDone
                        })
                      }
                      title="Clique para editar as repetições"
                    >
                      {set.repsDone}x
                    </button>

                    {/* Botão de Checkmark Circular */}
                    <button
                      type="button"
                      className={`set-check-btn ${set.completed ? 'completed' : ''}`}
                      onClick={() => handleToggleSet(set.setIndex)}
                      aria-label={`Concluir série ${set.setIndex}`}
                    >
                      <Check size={22} strokeWidth={2.8} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Barra Inferior com Indicadores e Paginação */}
            <div className="workout-bottom-indicator-bar">
              {/* Badge Circular de Progresso (ex: 3/8) */}
              <div className="exercise-progress-ring-badge">
                {currentExerciseIndex + 1}/{workoutDay.exercises.length}
              </div>

              {/* Nome do Exercício e Músculo Alvo */}
              <div className="exercise-name-badge">
                <strong>{currentExercise.name}</strong>
                <span>{currentExercise.targetMuscles.join(', ')}</span>
              </div>

              {/* Trilho de Números de Paginação */}
              <div className="exercise-pagination-track">
                {workoutDay.exercises.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`exercise-page-num ${idx === currentExerciseIndex ? 'active' : ''}`}
                    onClick={() => setCurrentExerciseIndex(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão de Ação: Próximo Exercício */}
            <button
              type="button"
              className="btn-next-exercise-cta"
              onClick={handleNext}
            >
              <span>
                {currentExerciseIndex === workoutDay.exercises.length - 1
                  ? hasCardio
                    ? 'Ir para o Cardio'
                    : 'Finalizar Treino'
                  : 'Próximo Exercício'}
              </span>
              <ArrowRight size={18} />
            </button>
          </div>
        </>
      )}

      {/* =========================================================
          FASE 3: CARDIO PÓS-TREINO
          ========================================================= */}
      {phase === 'cardio' && workoutDay.cardio && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '80px 24px 30px',
            textAlign: 'center'
          }}
        >
          <div>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(255, 149, 0, 0.15)',
                color: '#ff9500',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}
            >
              <Heart size={34} />
            </div>

            <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 6px', color: '#ffffff' }}>
              Cardio Estratégico
            </h2>
            <p style={{ fontSize: '14px', color: '#a1a1aa', margin: '0 0 28px' }}>
              {workoutDay.cardio.type} • Meta: {workoutDay.cardio.durationMinutes} minutos
            </p>

            {/* Cronômetro Grande */}
            <div
              style={{
                background: '#1a1d24',
                borderRadius: '24px',
                padding: '32px 20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '20px'
              }}
            >
              <div style={{ fontSize: '56px', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff' }}>
                {formatTimer(cardioSeconds)}
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>
                {workoutDay.cardio.targetPace ? `Ritmo recomendado: ${workoutDay.cardio.targetPace}` : 'Queimando gordura em ritmo constante'}
              </p>
            </div>

            {/* Controles de Play / Pause do Cardio */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
              <button
                type="button"
                onClick={() => setIsCardioRunning(!isCardioRunning)}
                style={{
                  height: '46px',
                  padding: '0 24px',
                  borderRadius: '9999px',
                  background: isCardioRunning ? '#ff453a' : '#ffffff',
                  color: isCardioRunning ? '#ffffff' : '#000000',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {isCardioRunning ? (
                  <>
                    <Pause size={16} fill="currentColor" /> Pausar
                  </>
                ) : (
                  <>
                    <Play size={16} fill="currentColor" /> Iniciar
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCardioSeconds(0);
                  setIsCardioRunning(false);
                }}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#262a34',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Reiniciar"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn-next-exercise-cta"
            onClick={handleCompleteWorkout}
          >
            <span>Concluir Treino Completo</span>
            <CheckCircle2 size={18} />
          </button>
        </div>
      )}

      {/* =========================================================
          FASE 4: RESUMO & CONQUISTA FINAL
          ========================================================= */}
      {phase === 'summary' && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '70px 24px 30px',
            textAlign: 'center'
          }}
        >
          <div>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}
            >
              <Trophy size={40} />
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px', color: '#ffffff' }}>
              Treino Finalizado!
            </h2>
            <p style={{ fontSize: '14px', color: '#a1a1aa', margin: '0 0 24px' }}>
              Excelente consistência! Mais um treino concluído com sucesso.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '20px'
              }}
            >
              <div style={{ background: '#1a1d24', borderRadius: '18px', padding: '16px' }}>
                <Clock size={20} color="#ffffff" style={{ marginBottom: '6px' }} />
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                  {totalMinutes} min
                </div>
                <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Tempo Total</div>
              </div>

              <div style={{ background: '#1a1d24', borderRadius: '18px', padding: '16px' }}>
                <Dumbbell size={20} color="#ffffff" style={{ marginBottom: '6px' }} />
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                  {totalCompletedCount} séries
                </div>
                <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Séries Feitas</div>
              </div>

              <div style={{ background: '#1a1d24', borderRadius: '18px', padding: '16px' }}>
                <TrendingUp size={20} color="#ffffff" style={{ marginBottom: '6px' }} />
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                  {totalVolumeKg} kg
                </div>
                <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Volume Total</div>
              </div>

              <div style={{ background: '#1a1d24', borderRadius: '18px', padding: '16px' }}>
                <Flame size={20} color="#ff375f" style={{ marginBottom: '6px' }} />
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                  ~{totalMinutes * 7} kcal
                </div>
                <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Gasto Estimado</div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn-next-exercise-cta"
            onClick={() => {
              onFinishWorkout(totalCompletedCount, totalVolumeKg);
              onClose();
            }}
          >
            <span>Salvar no Histórico e Voltar</span>
            <Check size={18} strokeWidth={3} />
          </button>
        </div>
      )}

      {/* =========================================================
          MODAL RÁPIDO DE EDIÇÃO DE CARGA E REPETIÇÕES
          ========================================================= */}
      {editingSet && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
          onClick={() => setEditingSet(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              background: '#1a1d24',
              borderRadius: '28px 28px 0 0',
              padding: '24px 24px 34px',
              color: '#ffffff'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
                Ajustar Série {editingSet.setIndex}
              </h3>
              <button
                type="button"
                onClick={() => setEditingSet(null)}
                style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Ajuste de Carga */}
            <div style={{ marginBottom: '18px' }}>
              <span style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }}>Carga (kg):</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() =>
                    setEditingSet((prev) => (prev ? { ...prev, weightKg: Math.max(0, prev.weightKg - 5) } : null))
                  }
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#262a34',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  -5
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditingSet((prev) => (prev ? { ...prev, weightKg: Math.max(0, prev.weightKg - 1) } : null))
                  }
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#262a34',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  -1
                </button>

                <div
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '28px',
                    fontWeight: 800,
                    color: '#ffffff'
                  }}
                >
                  {editingSet.weightKg} kg
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEditingSet((prev) => (prev ? { ...prev, weightKg: prev.weightKg + 1 } : null))
                  }
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#262a34',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  +1
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditingSet((prev) => (prev ? { ...prev, weightKg: prev.weightKg + 5 } : null))
                  }
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#262a34',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  +5
                </button>
              </div>
            </div>

            {/* Ajuste de Repetições */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }}>Repetições:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() =>
                    setEditingSet((prev) => (prev ? { ...prev, repsDone: Math.max(1, prev.repsDone - 1) } : null))
                  }
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#262a34',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  -1
                </button>

                <div
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '28px',
                    fontWeight: 800,
                    color: '#ffffff'
                  }}
                >
                  {editingSet.repsDone} reps
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEditingSet((prev) => (prev ? { ...prev, repsDone: prev.repsDone + 1 } : null))
                  }
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#262a34',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  +1
                </button>
              </div>
            </div>

            <button
              type="button"
              className="btn-next-exercise-cta"
              onClick={() => handleSaveEditSet(editingSet.weightKg, editingSet.repsDone)}
            >
              Salvar Ajuste
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          CONFIRMAÇÃO DE SAÍDA / PAUSA
          ========================================================= */}
      {showExitConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3500,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '340px',
              background: '#1a1d24',
              borderRadius: '24px',
              padding: '24px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px', color: '#ffffff' }}>
              Deseja pausar o treino?
            </h3>
            <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '0 0 20px' }}>
              Você completou {totalCompletedCount} séries até agora.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                className="btn-next-exercise-cta"
                onClick={() => setShowExitConfirm(false)}
              >
                Continuar Treinando
              </button>
              <button
                type="button"
                onClick={handleCompleteWorkout}
                style={{
                  height: '48px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Encerrar e Salvar Agora
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff453a',
                  fontSize: '13px',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                Descartar Sessão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
