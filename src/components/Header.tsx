import { Flame, SlidersHorizontal, Bot } from 'lucide-react';

interface HeaderProps {
  streak: number;
  onOpenAi: () => void;
  onOpenHistory: () => void;
  activeTab: 'workouts' | 'history';
}

export const Header: React.FC<HeaderProps> = ({
  streak,
  onOpenAi,
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
        <div className="header-title-block">
          <h1 className="header-main-title">Workouts</h1>
          <span className="header-sub-caption">IronPulse &bull; {todayFormatted}</span>
        </div>

        <div className="header-actions">
          <div className="liquid-badge-pill" title="Sequência de treinos ativos">
            <Flame size={14} className="flame-icon" />
            <span className="liquid-badge-value">{streak}</span>
            <span className="liquid-badge-unit">dias</span>
          </div>

          <button
            type="button"
            onClick={onOpenHistory}
            className={`liquid-circle-btn ${activeTab === 'history' ? 'active' : ''}`}
            title="Histórico de Treinos e Volume"
          >
            <SlidersHorizontal size={17} />
          </button>

          <button
            type="button"
            onClick={onOpenAi}
            className="liquid-circle-btn liquid-btn-ai"
            title="Abrir Coach IA"
          >
            <Bot size={17} />
            <span className="circle-ai-dot" />
          </button>
        </div>
      </div>
    </header>
  );
};
