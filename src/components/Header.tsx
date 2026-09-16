import React from 'react';
import { Dumbbell, Flame, History } from 'lucide-react';

interface HeaderProps {
  streak: number;
  onOpenHistory: () => void;
  activeTab: 'workouts' | 'history';
}

export const Header: React.FC<HeaderProps> = ({
  streak,
  onOpenHistory,
  activeTab
}) => {
  const todayFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  }).format(new Date());

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-group">
          <div className="logo-icon-wrapper">
            <Dumbbell className="brand-icon" size={24} />
          </div>
          <div>
            <div className="brand-title-row">
              <span className="brand-title">IRONPULSE</span>
              <span className="brand-badge">ACADEMY</span>
            </div>
            <p className="brand-subtitle">
              Hipertrofia &bull; {capitalize(todayFormatted)}
            </p>
          </div>
        </div>

        <div className="header-actions">
          <div className="streak-badge" title="Sequência de treinos ativos">
            <Flame size={16} className="flame-icon" />
            <span className="streak-number">{streak}</span>
            <span className="streak-text">dias</span>
          </div>

          <button
            onClick={onOpenHistory}
            className={`header-icon-btn ${activeTab === 'history' ? 'active' : ''}`}
            title="Histórico de Treinos e Cargas"
          >
            <History size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

