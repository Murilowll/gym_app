import React, { useState } from 'react';
import type { DayKey, Exercise, WorkoutDay, CompletedWorkoutRecord, UserStats } from './types/workout';
import { WORKOUT_DAYS } from './data/workoutsData';
import {
  getTodayKey,
  loadUserStats,
  loadWorkoutHistory,
  saveCompletedWorkout
} from './utils/storage';
import { Header } from './components/Header';
import { DaySelector } from './components/DaySelector';
import { WorkoutCard } from './components/WorkoutCard';
import { StretchingSection } from './components/StretchingSection';
import { CardioSection } from './components/CardioSection';
import { ActiveWorkoutModal } from './components/ActiveWorkoutModal';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { RestTimer } from './components/RestTimer';
import { AiCoachChat } from './components/AiCoachChat';
import { HistoryView } from './components/HistoryView';
import { BottomNav } from './components/BottomNav';

export const App: React.FC = () => {
  const todayKey = getTodayKey();
  const [selectedDayKey, setSelectedDayKey] = useState<DayKey>(todayKey);
  const [activeTab, setActiveTab] = useState<'workouts' | 'history'>('workouts');

  // Dados persistentes
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats);
  const [workoutHistory, setWorkoutHistory] = useState<CompletedWorkoutRecord[]>(loadWorkoutHistory);

  // Estados dos modais
  const [isActiveWorkoutOpen, setIsActiveWorkoutOpen] = useState(false);
  const [selectedExerciseForDetail, setSelectedExerciseForDetail] = useState<Exercise | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // Estado do Rest Timer
  const [restTimerSeconds, setRestTimerSeconds] = useState(60);
  const [isRestTimerActive, setIsRestTimerActive] = useState(false);

  // Treino do dia selecionado
  const currentWorkoutDay: WorkoutDay =
    WORKOUT_DAYS.find((d) => d.key === selectedDayKey) || WORKOUT_DAYS[0];

  // Checar se o treino de hoje ou selecionado já foi concluído
  const todayString = new Date().toISOString().split('T')[0];
  const completedDayKeys = workoutHistory
    .filter((h) => h.date === todayString)
    .map((h) => h.dayKey);

  const isCurrentDayCompleted = completedDayKeys.includes(selectedDayKey);

  // Ação de iniciar descanso
  const handleStartRestTimer = (seconds: number) => {
    setRestTimerSeconds(seconds);
    setIsRestTimerActive(true);
  };

  // Finalizar treino
  const handleFinishWorkout = (completedSets: number, totalVolumeKg: number) => {
    const record: CompletedWorkoutRecord = {
      id: `workout-${Date.now()}`,
      date: todayString,
      dayKey: currentWorkoutDay.key,
      dayName: currentWorkoutDay.name,
      durationMinutes: currentWorkoutDay.estimatedMinutes,
      completedSetsCount: completedSets,
      totalVolumeKg,
      exercisesCompleted: currentWorkoutDay.exercises.map((e) => e.name),
      cardioCompleted: false,
      stretchesCompleted: true
    };

    saveCompletedWorkout(record);
    setWorkoutHistory(loadWorkoutHistory());
    setUserStats(loadUserStats());
  };

  return (
    <div className="app-viewport">
      {/* Topo fixo com identidade visual e navegação */}
      <Header
        streak={userStats.streakDays}
        onOpenAi={() => setIsAiChatOpen(true)}
        onOpenHistory={() => setActiveTab(activeTab === 'history' ? 'workouts' : 'history')}
        activeTab={activeTab}
      />

      {activeTab === 'workouts' ? (
        <>
          {/* Seletor horizontal da semana (Segunda a Domingo) */}
          <DaySelector
            selectedDayKey={selectedDayKey}
            todayKey={todayKey}
            onSelectDay={(key) => setSelectedDayKey(key)}
            completedDays={completedDayKeys}
          />

          <main className="main-content-area">
            {/* Card Principal de Resumo do Treino */}
            <WorkoutCard
              workoutDay={currentWorkoutDay}
              isToday={selectedDayKey === todayKey}
              isCompleted={isCurrentDayCompleted}
              onStartWorkout={() => setIsActiveWorkoutOpen(true)}
              onSelectExercise={(ex) => setSelectedExerciseForDetail(ex)}
            />

            {/* Alongamento e Mobilidade Específica do Dia */}
            {currentWorkoutDay.stretches && currentWorkoutDay.stretches.length > 0 && (
              <StretchingSection stretches={currentWorkoutDay.stretches} />
            )}

            {/* Cardio Estratégico Pós-Treino */}
            {currentWorkoutDay.cardio && (
              <CardioSection cardio={currentWorkoutDay.cardio} />
            )}
          </main>
        </>
      ) : (
        <HistoryView
          history={workoutHistory}
          stats={userStats}
          onClose={() => setActiveTab('workouts')}
        />
      )}

      {/* Modal de Treino Ao Vivo (Série por Série + Cargas) */}
      <ActiveWorkoutModal
        workoutDay={currentWorkoutDay}
        isOpen={isActiveWorkoutOpen}
        onClose={() => setIsActiveWorkoutOpen(false)}
        onOpenDetail={(ex) => setSelectedExerciseForDetail(ex)}
        onStartRestTimer={handleStartRestTimer}
        onFinishWorkout={handleFinishWorkout}
      />

      {/* Modal de Detalhes da Máquina, Postura e Regulagem */}
      <ExerciseDetailModal
        exercise={selectedExerciseForDetail}
        onClose={() => setSelectedExerciseForDetail(null)}
        onStartTimer={handleStartRestTimer}
      />

      {/* Timer Flutuante de Descanso */}
      <RestTimer
        initialSeconds={restTimerSeconds}
        isActive={isRestTimerActive}
        onClose={() => setIsRestTimerActive(false)}
        onComplete={() => setIsRestTimerActive(false)}
      />

      {/* Chat do Treinador Inteligente (Coach IA) */}
      <AiCoachChat
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        currentDay={currentWorkoutDay}
        currentExercise={selectedExerciseForDetail}
      />

      {/* Dock Flutuante Liquid Glass de Navegação */}
      <BottomNav
        activeTab={activeTab}
        onSelectWorkouts={() => {
          setActiveTab('workouts');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectHistory={() => setActiveTab('history')}
        onOpenCalendar={() => {
          setActiveTab('workouts');
          const el = document.querySelector('.day-selector-container');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAi={() => setIsAiChatOpen(true)}
      />
    </div>
  );
};

export default App;
