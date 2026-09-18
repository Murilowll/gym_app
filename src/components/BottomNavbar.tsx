import React from 'react';
import { Home, Dumbbell, Flame, User } from 'lucide-react';

export type AppTab = 'home' | 'workouts' | 'streak' | 'profile' | 'history';

interface BottomNavbarProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  streakCount: number;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({
  activeTab,
  onSelectTab,
  streakCount
}) => {
  const tabs = [
    {
      id: 'home' as AppTab,
      label: 'Home',
      icon: Home,
      badge: null
    },
    {
      id: 'workouts' as AppTab,
      label: 'Treino',
      icon: Dumbbell,
      badge: null
    },
    {
      id: 'streak' as AppTab,
      label: 'Ofensiva',
      icon: Flame,
      badge: streakCount > 0 ? `${streakCount}` : null
    },
    {
      id: 'profile' as AppTab,
      label: 'Perfil',
      icon: User,
      badge: null
    }
  ];

  return (
    <nav className="bottom-navbar" aria-label="Navegação Principal">
      <div className="bottom-navbar-inner">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
              aria-label={tab.label}
              title={tab.label}
              aria-selected={isActive}
            >
              <div className="bottom-nav-icon-wrap">
                <Icon
                  size={24}
                  className="bottom-nav-icon"
                  fill={isActive ? 'currentColor' : 'none'}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                {tab.badge && (
                  <span className="bottom-nav-badge">
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
