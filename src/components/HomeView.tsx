import React, { useState } from 'react';
import {
  Dumbbell,
  Flame,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Droplets,
  CheckCircle2,
  TrendingUp,
  Award,
  Plus,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { WorkoutDay, UserStats, CompletedWorkoutRecord } from '../types/workout';

interface HomeViewProps {
  workoutDay: WorkoutDay;
  stats: UserStats;
  history: CompletedWorkoutRecord[];
  onGoToWorkout: () => void;
  onGoToStreak: () => void;
  onGoToProfile: () => void;
  onOpenCatalog: () => void;
  onOpenOnboarding: () => void;
  onOpenHistoryModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  workoutDay,
  stats,
  history,
  onGoToWorkout,
  onGoToStreak,
  onGoToProfile,
  onOpenCatalog,
  onOpenOnboarding,
  onOpenHistoryModal
}) => {
  const { user, profile } = useAuth();

  const displayName = profile?.displayName || user?.displayName || (user?.email?.includes('murilo') ? 'Murilo Lopes' : 'Atleta');
  const firstName = displayName.split(' ')[0];

  // Checar se o treino de hoje já foi feito
  const todayString = new Date().toISOString().split('T')[0];
  const isTodayCompleted = history.some((h) => h.date === todayString);

  // Tempo total acumulado
  const totalMinutes = history.reduce((acc, h) => acc + (h.durationMinutes || 45), 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;

  // Monitor diário de água (salvo em localStorage com a data de hoje)
  const [waterMl, setWaterMl] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`ironpulse_water_${todayString}`);
      return saved ? parseInt(saved, 10) : 1250;
    } catch {
      return 1250;
    }
  });

  const waterTargetMl = 3000;
  const waterProgress = Math.min(100, Math.round((waterMl / waterTargetMl) * 100));

  const handleAddWater = () => {
    setWaterMl((prev) => {
      const next = prev + 250;
      try {
        localStorage.setItem(`ironpulse_water_${todayString}`, next.toString());
      } catch (e) {
        console.warn('Erro ao salvar água:', e);
      }
      return next;
    });
  };

  const handleResetWater = () => {
    setWaterMl(0);
    try {
      localStorage.setItem(`ironpulse_water_${todayString}`, '0');
    } catch {}
  };

  // Frases do dia
  const motivationalPhrases = [
    'O segredo do resultado extraordinário é a consistência diária.',
    'Cada repetição hoje constrói a sua melhor versão amanhã.',
    'Disciplina é escolher entre o que você quer agora e o que você mais quer.',
    'Foco no processo: a carga aumenta, a mente fortalece!'
  ];
  const phrase = motivationalPhrases[new Date().getDay() % motivationalPhrases.length];

  return (
    <div className="home-view-container">
      {/* Saudação do Topo */}
      <div className="home-header-greeting">
        <div>
          <span className="greeting-pill">SEJA BEM-VINDO DE VOLTA</span>
          <h2 className="greeting-name">Olá, {firstName}! 👋</h2>
          <p className="greeting-subtitle">{phrase}</p>
        </div>

        <button onClick={onGoToProfile} className="home-avatar-btn" title="Meu Perfil">
          <div className="home-avatar-circle">
            {profile?.displayName?.charAt(0).toUpperCase() || 'M'}
          </div>
        </button>
      </div>

      {/* Card Destaque: Treino de Hoje */}
      <div className="home-today-workout-card">
        <div className="today-card-badge-row">
          <span className={`today-status-badge ${isTodayCompleted ? 'completed' : 'pending'}`}>
            {isTodayCompleted ? (
              <>
                <CheckCircle2 size={13} />
                Treino de Hoje Concluído!
              </>
            ) : (
              <>
                <span className="live-dot" />
                Treino Programado para Hoje
              </>
            )}
          </span>
          <span className="today-duration-tag">~{workoutDay.estimatedMinutes} min</span>
        </div>

        <h3 className="today-workout-title">{workoutDay.name}</h3>
        <p className="today-workout-muscles">
          Foco: {workoutDay.exercises.map((e) => e.targetMuscles[0]).slice(0, 3).join(' • ')}
        </p>

        <div className="today-exercises-preview-chips">
          {workoutDay.exercises.slice(0, 4).map((ex) => (
            <span key={ex.id} className="ex-preview-chip">
              {ex.name}
            </span>
          ))}
          {workoutDay.exercises.length > 4 && (
            <span className="ex-preview-chip more">
              +{workoutDay.exercises.length - 4} exercícios
            </span>
          )}
        </div>

        <button onClick={onGoToWorkout} className="today-workout-cta-btn">
          <Dumbbell size={18} />
          <span>{isTodayCompleted ? 'Rever Treino Concluído' : 'Iniciar Treino de Hoje'}</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Métricas Rápidas */}
      <div className="home-metrics-grid">
        <div className="home-metric-card flame" onClick={onGoToStreak} role="button" tabIndex={0}>
          <div className="metric-icon-wrap flame">
            <Flame size={20} />
          </div>
          <div className="metric-data">
            <span className="metric-val">{stats.streakDays} dias</span>
            <span className="metric-label">Ofensiva Atual 🔥</span>
          </div>
        </div>

        <div className="home-metric-card clock" onClick={onOpenHistoryModal} role="button" tabIndex={0}>
          <div className="metric-icon-wrap clock">
            <Clock size={20} />
          </div>
          <div className="metric-data">
            <span className="metric-val">{totalHours}h {remainingMins}m</span>
            <span className="metric-label">Horas Treinadas ⏱️</span>
          </div>
        </div>

        <div className="home-metric-card trophy" onClick={onOpenHistoryModal} role="button" tabIndex={0}>
          <div className="metric-icon-wrap trophy">
            <Award size={20} />
          </div>
          <div className="metric-data">
            <span className="metric-val">{stats.totalWorkouts}</span>
            <span className="metric-label">Treinos Feitos</span>
          </div>
        </div>

        <div className="home-metric-card target" onClick={onGoToProfile} role="button" tabIndex={0}>
          <div className="metric-icon-wrap target">
            <TrendingUp size={20} />
          </div>
          <div className="metric-data">
            <span className="metric-val">{profile?.weightKg || 78} kg</span>
            <span className="metric-label">Meta: {profile?.targetWeightKg || 83} kg</span>
          </div>
        </div>
      </div>

      {/* Monitor de Hidratação Diária */}
      <div className="home-water-tracker-card">
        <div className="water-tracker-top">
          <div className="water-title-wrap">
            <div className="water-icon-circle">
              <Droplets size={18} />
            </div>
            <div>
              <h4 className="water-title">Hidratação do Atleta</h4>
              <span className="water-subtitle">{waterMl} ml de {waterTargetMl} ml ({waterProgress}%)</span>
            </div>
          </div>

          <div className="water-btns">
            <button onClick={handleAddWater} className="water-add-btn" title="Adicionar 250ml">
              <Plus size={15} />
              <span>+250ml</span>
            </button>
            {waterMl > 0 && (
              <button onClick={handleResetWater} className="water-reset-btn" title="Zerar contagem">
                <RotateCcw size={13} />
              </button>
            )}
          </div>
        </div>

        <div className="water-progress-bar-track">
          <div className="water-progress-bar-fill" style={{ width: `${waterProgress}%` }} />
        </div>
      </div>

      {/* Funções Rápidas para o Usuário */}
      <div className="home-functions-section">
        <h3 className="section-title-clean">
          <Sparkles size={18} />
          Funções Rápidas
        </h3>

        <div className="home-functions-grid">
          <button onClick={onOpenCatalog} className="function-card">
            <div className="function-icon-pill catalog">
              <BookOpen size={22} />
            </div>
            <div className="function-info">
              <strong>Catálogo de Exercícios</strong>
              <span>54 exercícios com animações em GIF e biomecânica</span>
            </div>
            <ArrowRight size={16} className="function-arrow" />
          </button>

          <button onClick={onOpenOnboarding} className="function-card highlight">
            <div className="function-icon-pill ai">
              <Sparkles size={22} />
            </div>
            <div className="function-info">
              <strong>Refazer Onboarding com IA</strong>
              <span>Gere nova divisão de treinos personalizada</span>
            </div>
            <ArrowRight size={16} className="function-arrow" />
          </button>

          <button onClick={onOpenHistoryModal} className="function-card">
            <div className="function-icon-pill history">
              <Clock size={22} />
            </div>
            <div className="function-info">
              <strong>Histórico & Recordes (PRs)</strong>
              <span>Veja sua evolução de peso e cargas máximas</span>
            </div>
            <ArrowRight size={16} className="function-arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};
