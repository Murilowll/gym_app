import React from 'react';
import { Flame, Trophy, Award, Zap, ArrowRight, ShieldCheck, Dumbbell } from 'lucide-react';
import type { CompletedWorkoutRecord, UserStats } from '../types/workout';

interface StreakViewProps {
  stats: UserStats;
  history: CompletedWorkoutRecord[];
  onGoToWorkout: () => void;
}

export const StreakView: React.FC<StreakViewProps> = ({
  stats,
  history,
  onGoToWorkout
}) => {
  const currentStreak = stats.streakDays || 0;
  // Simulação de recorde de ofensiva baseada no streak ou treinos
  const maxStreak = Math.max(currentStreak, Math.min(stats.totalWorkouts, 14));

  // Determina os dias da semana atual que foram concluídos
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 domingo, 1 segunda...
  // Segunda como dia 0
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((label, idx) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + idx);
    const dateStr = d.toISOString().split('T')[0];
    const isToday = d.toDateString() === today.toDateString();
    const isCompleted = history.some((h) => h.date === dateStr);
    const isPast = d < today && !isToday;

    return {
      label,
      dateNum: d.getDate(),
      isCompleted,
      isToday,
      isPast
    };
  });

  const streakMilestones = [
    { days: 3, title: 'Faísca de Aço', desc: '3 dias consecutivos de treino', unlocked: currentStreak >= 3, icon: Zap },
    { days: 7, title: 'Hábito Blindado', desc: '1 semana inteira sem falhar', unlocked: currentStreak >= 7, icon: ShieldCheck },
    { days: 14, title: 'Disciplina de Titânio', desc: '2 semanas de consistência brutal', unlocked: currentStreak >= 14, icon: Award },
    { days: 30, title: 'Guerreiro de Ferro', desc: '1 mês na elite dos 1%', unlocked: currentStreak >= 30, icon: Trophy },
    { days: 60, title: 'Lenda Imparável', desc: '60 dias de evolução inabalável', unlocked: currentStreak >= 60, icon: Flame }
  ];

  return (
    <div className="streak-view-container">
      {/* Header da Seção */}
      <div className="streak-hero-card">
        <div className="streak-flame-circle">
          <Flame size={54} className="streak-flame-animated" />
          <div className="streak-flame-glow" />
        </div>

        <div className="streak-count-hero">
          <span className="streak-number-huge">{currentStreak}</span>
          <span className="streak-days-label">DIAS DE OFENSIVA</span>
        </div>

        <p className="streak-quote">
          {currentStreak === 0
            ? 'Treine hoje para acender a sua chama e iniciar sua sequência!'
            : currentStreak < 7
            ? 'Você está no ritmo certo! Cada dia conta para a sua transformação.'
            : 'Consistência lendária! Você está construindo uma disciplina inquebrável.'}
        </p>

        <button onClick={onGoToWorkout} className="streak-action-btn">
          <Dumbbell size={18} />
          <span>Manter Ofensiva Hoje</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Calendário da Semana da Ofensiva */}
      <div className="streak-week-card">
        <div className="streak-week-header">
          <span className="streak-week-title">Semana Atual</span>
          <span className="streak-record-badge">
            <Trophy size={14} color="#ffd60a" />
            Recorde: {maxStreak} dias
          </span>
        </div>

        <div className="streak-week-days-grid">
          {weekDays.map((day, idx) => (
            <div
              key={idx}
              className={`streak-day-pill ${day.isCompleted ? 'completed' : ''} ${
                day.isToday ? 'today' : ''
              }`}
            >
              <span className="streak-day-name">{day.label}</span>
              <div className="streak-day-circle">
                {day.isCompleted ? (
                  <Flame size={18} className="flame-active" />
                ) : day.isToday ? (
                  <span className="day-dot-today" />
                ) : (
                  <span className="day-number-muted">{day.dateNum}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conquistas de Ofensiva */}
      <div className="streak-milestones-section">
        <h3 className="section-title-clean">
          <Award size={18} />
          Marcos de Consistência
        </h3>

        <div className="milestones-list">
          {streakMilestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className={`milestone-card ${m.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="milestone-icon-wrap">
                  <Icon size={22} />
                </div>
                <div className="milestone-info">
                  <div className="milestone-top">
                    <span className="milestone-title">{m.title}</span>
                    <span className="milestone-days">{m.days} dias</span>
                  </div>
                  <p className="milestone-desc">{m.desc}</p>
                </div>
                {m.unlocked ? (
                  <div className="milestone-badge-unlocked">Conquistado</div>
                ) : (
                  <div className="milestone-badge-locked">
                    {Math.max(0, m.days - currentStreak)} dias restantes
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
