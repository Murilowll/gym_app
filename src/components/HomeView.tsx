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
import { TopStreakBanner } from './TopStreakBanner';

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
  streakTriggerAnimation?: boolean;
  streakOldValue?: number;
  onStreakAnimationComplete?: () => void;
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
  onOpenHistoryModal,
  streakTriggerAnimation = false,
  streakOldValue,
  onStreakAnimationComplete
}) => {
  const { user, profile } = useAuth();

  const displayName = profile?.displayName || user?.displayName || (user?.email?.includes('murilo') ? 'Murilo Lopes' : 'Atleta');
  const firstName = displayName.split(' ')[0];

  // Data atual formatada com elegância
  const todayDateFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  }).format(new Date());
  const capitalizedDate = todayDateFormatted.charAt(0).toUpperCase() + todayDateFormatted.slice(1);

  // Checar se o treino de hoje já foi feito
  const todayString = new Date().toISOString().split('T')[0];
  const isTodayCompleted = history.some((h) => h.date === todayString);

  // Tempo total acumulado
  const totalMinutes = history.reduce((acc, h) => acc + (h.durationMinutes || 45), 0);
  const totalHours = Math.floor(totalMinutes / 60);

  // Monitor diário de água (inicia sempre zerado para ser preenchido ao longo do dia)
  const [waterMl, setWaterMl] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`ironpulse_water_${todayString}`);
      if (saved !== null && saved !== '1250') {
        const val = parseInt(saved, 10);
        return isNaN(val) ? 0 : val;
      }
      return 0;
    } catch {
      return 0;
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

  return (
    <div className="home-view-container">
      {/* Header Limpo e Sofisticado com Ofensiva no Topo */}
      <header className="home-clean-header">
        <div className="home-clean-greeting">
          <span className="home-clean-date">{capitalizedDate}</span>
          <h2 className="home-clean-name">Olá, {firstName}</h2>
        </div>

        <div className="home-clean-actions">
          {/* Badge de Ofensiva Animado Lá em Cima */}
          <TopStreakBanner
            currentStreak={stats.streakDays}
            initialOldStreak={streakOldValue}
            triggerAnimation={streakTriggerAnimation}
            onGoToStreak={onGoToStreak}
            onAnimationComplete={onStreakAnimationComplete}
          />

          <button
            onClick={onGoToProfile}
            className="home-clean-avatar-btn"
            aria-label="Abrir Perfil"
            title="Meu Perfil"
          >
            <div className="home-clean-avatar-circle">
              {profile?.displayName?.charAt(0).toUpperCase() || 'M'}
            </div>
          </button>
        </div>
      </header>

      {/* Card Destaque: Treino do Dia (Foco Principal sem Poluição) */}
      <section className="home-hero-workout-card">
        <div className="hero-workout-header">
          <span className={`hero-status-pill ${isTodayCompleted ? 'completed' : 'active'}`}>
            {isTodayCompleted ? (
              <>
                <CheckCircle2 size={13} />
                Concluído hoje
              </>
            ) : (
              <>
                <span className="hero-status-dot" />
                Treino de Hoje
              </>
            )}
          </span>
          <span className="hero-time-tag">~{workoutDay.estimatedMinutes} min</span>
        </div>

        <div className="hero-workout-body">
          <h3 className="hero-workout-title">{workoutDay.name}</h3>
          <p className="hero-workout-meta">
            {workoutDay.exercises.length} exercícios • {workoutDay.focus || 'Hipertrofia & Força'}
          </p>
        </div>

        <button
          onClick={onGoToWorkout}
          className={`hero-workout-cta ${isTodayCompleted ? 'completed' : ''}`}
        >
          <Dumbbell size={18} />
          <span>{isTodayCompleted ? 'Visualizar Treino Realizado' : 'Iniciar Treino Agora'}</span>
          <ArrowRight size={18} className="cta-arrow" />
        </button>
      </section>

      {/* Grid de Métricas Limpo e Equilibrado */}
      <section className="home-clean-metrics-grid">
        <div
          className="clean-metric-tile"
          onClick={onGoToStreak}
          role="button"
          tabIndex={0}
        >
          <div className="clean-metric-icon-wrap streak">
            <Flame size={18} />
          </div>
          <div className="clean-metric-content">
            <span className="clean-metric-value">{stats.streakDays} {stats.streakDays === 1 ? 'dia' : 'dias'}</span>
            <span className="clean-metric-label">Ofensiva</span>
          </div>
        </div>

        <div
          className="clean-metric-tile"
          onClick={onOpenHistoryModal}
          role="button"
          tabIndex={0}
        >
          <div className="clean-metric-icon-wrap time">
            <Clock size={18} />
          </div>
          <div className="clean-metric-content">
            <span className="clean-metric-value">{totalHours}h</span>
            <span className="clean-metric-label">Treinadas</span>
          </div>
        </div>

        <div
          className="clean-metric-tile"
          onClick={onOpenHistoryModal}
          role="button"
          tabIndex={0}
        >
          <div className="clean-metric-icon-wrap trophy">
            <Award size={18} />
          </div>
          <div className="clean-metric-content">
            <span className="clean-metric-value">{stats.totalWorkouts}</span>
            <span className="clean-metric-label">Sessões</span>
          </div>
        </div>

        <div
          className="clean-metric-tile"
          onClick={onGoToProfile}
          role="button"
          tabIndex={0}
        >
          <div className="clean-metric-icon-wrap weight">
            <TrendingUp size={18} />
          </div>
          <div className="clean-metric-content">
            <span className="clean-metric-value">{profile?.weightKg || 78} kg</span>
            <span className="clean-metric-label">Meta: {profile?.targetWeightKg || 83}kg</span>
          </div>
        </div>
      </section>

      {/* Monitor de Hidratação Minimalista */}
      <section className="home-water-clean-card">
        <div className="water-clean-top">
          <div className="water-clean-info">
            <div className="water-clean-icon">
              <Droplets size={16} />
            </div>
            <div>
              <h4 className="water-clean-title">Hidratação</h4>
              <span className="water-clean-meta">
                {waterMl} / {waterTargetMl} ml ({waterProgress}%)
              </span>
            </div>
          </div>

          <div className="water-clean-actions">
            <button
              onClick={handleAddWater}
              className="water-clean-add-btn"
              title="Adicionar 250ml de água"
            >
              <Plus size={14} />
              <span>250ml</span>
            </button>
            {waterMl > 0 && (
              <button
                onClick={handleResetWater}
                className="water-clean-reset-btn"
                title="Zerar água"
              >
                <RotateCcw size={12} />
              </button>
            )}
          </div>
        </div>

        <div className="water-clean-track">
          <div
            className="water-clean-fill"
            style={{ width: `${waterProgress}%` }}
          />
        </div>
      </section>

      {/* Acesso Rápido Minimalista */}
      <section className="home-quick-actions-section">
        <h4 className="quick-actions-title">Acesso Rápido</h4>
        <div className="quick-actions-grid">
          <button onClick={onOpenCatalog} className="quick-action-tile">
            <div className="quick-icon-wrap catalog">
              <BookOpen size={18} />
            </div>
            <div className="quick-tile-text">
              <span className="quick-title">Biblioteca</span>
              <span className="quick-subtitle">Exercícios & GIFs</span>
            </div>
          </button>

          <button onClick={onOpenOnboarding} className="quick-action-tile">
            <div className="quick-icon-wrap ai">
              <Sparkles size={18} />
            </div>
            <div className="quick-tile-text">
              <span className="quick-title">Protocolo IA</span>
              <span className="quick-subtitle">Ajustar Ficha</span>
            </div>
          </button>

          <button onClick={onOpenHistoryModal} className="quick-action-tile">
            <div className="quick-icon-wrap history">
              <Clock size={18} />
            </div>
            <div className="quick-tile-text">
              <span className="quick-title">Histórico</span>
              <span className="quick-subtitle">Cargas & Recordes</span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
