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
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(new Date());

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-group">
          <div className="logo-icon-wrapper">
            <Dumbbell className="brand-icon" size={22} />
          </div>
          <div>
            <h1 className="brand-title">IronPulse</h1>
            <p className="brand-subtitle">{todayFormatted}</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="streak-badge" title={`${streak} dias seguidos`}>
            <Flame size={15} className="flame-icon" />
            <span className="streak-number">{streak}</span>
          </div>

          <button
            onClick={onOpenHistory}
            className={`header-icon-btn ${activeTab === 'history' ? 'active' : ''}`}
            title="Histórico de Treinos"
          >
            <History size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};


