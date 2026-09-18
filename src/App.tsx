import React, { useState, useEffect } from 'react';
import type { DayKey, Exercise, WorkoutDay, CompletedWorkoutRecord, UserStats } from './types/workout';
import { WORKOUT_DAYS } from './data/workoutsData';
import {
  getTodayKey,
  loadUserStats,
  loadWorkoutHistory,
  saveCompletedWorkout,
  syncLocalWithCloud
} from './utils/storage';
import { loadCloudUserStats, loadCloudWorkoutHistory } from './services/firestoreService';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DaySelector } from './components/DaySelector';
import { WorkoutCard } from './components/WorkoutCard';
import { StretchingSection } from './components/StretchingSection';
import { CardioSection } from './components/CardioSection';
import { ActiveWorkoutModal } from './components/ActiveWorkoutModal';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { Dumbbell } from 'lucide-react';
import { RestTimer } from './components/RestTimer';
import { HistoryView } from './components/HistoryView';
import { AuthModal } from './components/AuthModal';
import { AuthScreen } from './components/AuthScreen';
import { TrainerView } from './components/TrainerView';
import { ExerciseCatalogModal } from './components/ExerciseCatalogModal';
import { OnboardingFunnel } from './components/OnboardingFunnel';
import { BottomNavbar } from './components/BottomNavbar';
import type { AppTab } from './components/BottomNavbar';
import { HomeView } from './components/HomeView';
import { StreakView } from './components/StreakView';
import { ProfileView } from './components/ProfileView';
import type { GeneratedPlanResult } from './types/onboarding';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [isGuest, setIsGuest] = useState(false);

  const todayKey = getTodayKey();
  const [selectedDayKey, setSelectedDayKey] = useState<DayKey>(todayKey);
  const [activeTab, setActiveTab] = useState<'home' | 'workouts' | 'streak' | 'history' | 'profile' | 'trainer'>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Ficha de treino ativa (por padrão a rotina de Murilo WORKOUT_DAYS, ou o plano gerado pelo onboarding)
  const [activeWorkoutPlan, setActiveWorkoutPlan] = useState<WorkoutDay[]>(WORKOUT_DAYS);

  // Dados persistentes
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats);
  const [workoutHistory, setWorkoutHistory] = useState<CompletedWorkoutRecord[]>(loadWorkoutHistory);

  // Estados dos modais
  const [isActiveWorkoutOpen, setIsActiveWorkoutOpen] = useState(false);
  const [selectedExerciseForDetail, setSelectedExerciseForDetail] = useState<Exercise | null>(null);

  // Estado do Rest Timer
  const [restTimerSeconds, setRestTimerSeconds] = useState(60);
  const [isRestTimerActive, setIsRestTimerActive] = useState(false);

  // Sincroniza dados da nuvem quando o usuário faz login
  useEffect(() => {
    if (user) {
      setIsGuest(false);
      Promise.all([
        loadCloudUserStats(user.uid),
        loadCloudWorkoutHistory(user.uid)
      ]).then(([cloudStats, cloudHistory]) => {
        if (cloudStats) {
          setUserStats(cloudStats);
        }
        if (cloudHistory && cloudHistory.length > 0) {
          setWorkoutHistory(cloudHistory);
        }
        syncLocalWithCloud(cloudStats, cloudHistory);
      });
    }
  }, [user]);

  const [forceReady, setForceReady] = useState(false);

  // Garante que a tela de carregamento nunca fique presa
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceReady(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Se o Firebase ainda está verificando a sessão (com limite de 1.2s)
  if (loading && !forceReady) {
    return (
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b',
          color: '#ffffff'
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '20px',
            background: 'rgba(48, 209, 88, 0.18)',
            border: '1.5px solid rgba(48, 209, 88, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}
        >
          <Dumbbell size={30} color="#30d158" />
        </div>
        <p style={{ color: '#8e8e93', fontSize: '0.92rem', margin: 0 }}>
          Carregando IronPulse...
        </p>
        <button
          onClick={() => setForceReady(true)}
          style={{
            marginTop: '20px',
            background: 'none',
            border: 'none',
            color: '#64d2ff',
            fontSize: '0.8rem',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Continuar para o aplicativo
        </button>
      </div>
    );
  }

  // Finalização do fluxo de onboarding para testes
  const handleFinishOnboardingTest = (plan: GeneratedPlanResult) => {
    setActiveWorkoutPlan(plan.workoutDays);
    setIsOnboardingOpen(false);
    setIsGuest(true);
  };

  // Fluxo de Login / Registro obrigatório antes de entrar no app
  if (!user && !isGuest) {
    return (
      <>
        <AuthScreen
          onContinueAsGuest={() => setIsGuest(true)}
          onOpenOnboardingTest={() => setIsOnboardingOpen(true)}
        />
        <OnboardingFunnel
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onFinishPlan={handleFinishOnboardingTest}
          isTestMode={true}
        />
      </>
    );
  }

  // Se o usuário logado for personal e não tiver selecionado aba, pode manter em workouts
  // Treino do dia selecionado (usa o plano dinâmico ativo ou a rotina pessoal padrão)
  const currentWorkoutDay: WorkoutDay =
    activeWorkoutPlan.find((d) => d.key === selectedDayKey) || activeWorkoutPlan[0] || WORKOUT_DAYS[0];

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
      {activeTab === 'trainer' ? (
        <TrainerView onBackToWorkouts={() => setActiveTab('workouts')} />
      ) : activeTab === 'home' ? (
        <HomeView
          workoutDay={currentWorkoutDay}
          stats={userStats}
          history={workoutHistory}
          onGoToWorkout={() => setActiveTab('workouts')}
          onGoToStreak={() => setActiveTab('streak')}
          onGoToProfile={() => setActiveTab('profile')}
          onOpenCatalog={() => setIsCatalogOpen(true)}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onOpenHistoryModal={() => setActiveTab('history')}
        />
      ) : activeTab === 'workouts' ? (
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
      ) : activeTab === 'streak' ? (
        <StreakView
          stats={userStats}
          history={workoutHistory}
          onGoToWorkout={() => setActiveTab('workouts')}
        />
      ) : activeTab === 'history' ? (
        <HistoryView
          history={workoutHistory}
          stats={userStats}
          onClose={() => setActiveTab('workouts')}
        />
      ) : activeTab === 'profile' ? (
        <ProfileView
          stats={userStats}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onOpenCatalog={() => setIsCatalogOpen(true)}
          onOpenTrainer={() => setActiveTab('trainer')}
        />
      ) : null}

      {/* Barra de Navegação Inferior Fixa (4 Sessões) */}
      <BottomNavbar
        activeTab={activeTab === 'trainer' ? 'profile' : activeTab}
        onSelectTab={(tab: AppTab) => setActiveTab(tab)}
        streakCount={userStats.streakDays}
      />

      {/* Modal de Onboarding Interativo com IA */}
      <OnboardingFunnel
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onFinishPlan={handleFinishOnboardingTest}
        isTestMode={true}
      />

      {/* Modal de Catálogo Completo de Exercícios em Standby */}
      <ExerciseCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
      />

      {/* Modal de Autenticação / Login / Cadastro / Recuperação */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

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
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

