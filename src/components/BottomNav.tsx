import React from 'react';
import { LayoutGrid, CalendarDays, TrendingUp, MessageSquare } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'workouts' | 'history';
  onSelectWorkouts: () => void;
  onSelectHistory: () => void;
  onOpenCalendar: () => void;
  onOpenAi: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectWorkouts,
  onSelectHistory,
  onOpenCalendar,
  onOpenAi
}) => {
  return (
    <nav className="bottom-liquid-dock" aria-label="Navegação Principal">
      <button
        type="button"
        onClick={onSelectWorkouts}
        className={`dock-btn ${activeTab === 'workouts' ? 'active' : ''}`}
        title="Treinos"
      >
        <LayoutGrid size={21} strokeWidth={activeTab === 'workouts' ? 2.5 : 1.8} />
      </button>

      <button
        type="button"
        onClick={onOpenCalendar}
        className="dock-btn"
        title="Dias da Semana"
      >
        <CalendarDays size={21} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        onClick={onSelectHistory}
        className={`dock-btn ${activeTab === 'history' ? 'active' : ''}`}
        title="Histórico e Volume"
      >
        <TrendingUp size={21} strokeWidth={activeTab === 'history' ? 2.5 : 1.8} />
      </button>

      <button
        type="button"
        onClick={onOpenAi}
        className="dock-btn dock-btn-ai"
        title="Coach IA"
      >
        <MessageSquare size={21} strokeWidth={1.8} />
        <span className="dock-ai-dot" />
      </button>
    </nav>
  );
};
