import React, { useState } from 'react';
import { Dumbbell, Flame, History, LogIn, LogOut, User as UserIcon, ShieldCheck, BookOpen, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  streak: number;
  onOpenHistory: () => void;
  activeTab: 'home' | 'workouts' | 'streak' | 'history' | 'profile' | 'trainer';
  onOpenAuth: () => void;
  onSelectTab: (tab: 'home' | 'workouts' | 'streak' | 'history' | 'profile' | 'trainer') => void;
  onOpenCatalog?: () => void;
  onOpenOnboarding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  streak,
  onOpenHistory,
  activeTab,
  onOpenAuth,
  onSelectTab,
  onOpenCatalog,
  onOpenOnboarding
}) => {
  const { user, profile, signOutUser, switchRole } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const todayFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }).format(new Date());

  const isTrainer = profile?.role === 'trainer';

  return (
    <header className="app-header">
      <div className="header-top">
        <div
          className="brand-group"
          onClick={() => onSelectTab('home')}
          style={{ cursor: 'pointer' }}
          title="Ir para o Início (Home)"
        >
          <div className="logo-icon-wrapper">
            <Dumbbell className="brand-icon" size={22} />
          </div>
          <div>
            <h1 className="brand-title">IronPulse</h1>
            <p className="brand-subtitle">{todayFormatted}</p>
          </div>
        </div>

        <div className="header-actions">
          <div
            className={`streak-badge ${activeTab === 'streak' ? 'active' : ''}`}
            title={`${streak} dias seguidos (Ofensiva)`}
            onClick={() => onSelectTab('streak')}
            style={{ cursor: 'pointer' }}
          >
            <Flame size={15} className="flame-icon" />
            <span className="streak-number">{streak}</span>
          </div>

          {onOpenCatalog && (
            <button
              onClick={onOpenCatalog}
              className="header-icon-btn"
              title="Biblioteca de Exercícios"
            >
              <BookOpen size={18} />
            </button>
          )}

          <button
            onClick={onOpenHistory}
            className={`header-icon-btn ${activeTab === 'history' ? 'active' : ''}`}
            title="Histórico de Treinos"
          >
            <History size={18} />
          </button>

          {/* Autenticação & Perfil */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="header-icon-btn"
                style={{
                  padding: '4px 8px',
                  width: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px'
                }}
                title="Minha Conta"
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: isTrainer ? '#64d2ff' : '#30d158',
                    color: '#09090b',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    maxWidth: '85px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: '#ffffff'
                  }}
                >
                  {profile?.displayName?.split(' ')[0] || 'Atleta'}
                </span>
              </button>

              {/* Menu dropdown do usuário */}
              {showUserMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    background: 'rgba(24, 24, 28, 0.98)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '14px',
                    padding: '8px',
                    minWidth: '200px',
                    zIndex: 100,
                    boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
                    color: '#ffffff'
                  }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{profile?.displayName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#8e8e93' }}>{profile?.email}</div>
                    <div style={{ marginTop: '6px' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '6px',
                          background: isTrainer ? 'rgba(100, 210, 255, 0.2)' : 'rgba(48, 209, 88, 0.2)',
                          color: isTrainer ? '#64d2ff' : '#30d158'
                        }}
                      >
                        {isTrainer ? 'Personal / Treinador' : 'Aluno'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectTab('profile')}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: activeTab === 'profile' ? 'rgba(48, 209, 88, 0.15)' : 'none',
                      border: 'none',
                      padding: '10px',
                      color: activeTab === 'profile' ? '#30d158' : '#f4f4f5',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <UserIcon size={16} />
                    <span>Meu Perfil</span>
                  </button>

                  {isTrainer && (
                    <button
                      onClick={() => onSelectTab('trainer')}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: activeTab === 'trainer' ? 'rgba(100, 210, 255, 0.15)' : 'none',
                        border: 'none',
                        padding: '10px',
                        color: activeTab === 'trainer' ? '#64d2ff' : '#f4f4f5',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <ShieldCheck size={16} />
                      Painel do Personal
                    </button>
                  )}

                  {onOpenOnboarding && (
                    <button
                      onClick={onOpenOnboarding}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        padding: '10px',
                        color: '#30d158',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <Sparkles size={15} />
                      Gerar Novo Treino (Onboarding)
                    </button>
                  )}

                  {/* Alternar perfil Aluno/Personal para testes fáceis */}
                  <button
                    onClick={() => switchRole(isTrainer ? 'student' : 'trainer')}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      padding: '10px',
                      color: '#a1a1aa',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <UserIcon size={15} />
                    Mudar para {isTrainer ? 'Aluno' : 'Personal'}
                  </button>

                  <button
                    onClick={() => signOutUser()}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      padding: '10px',
                      color: '#ff6b8b',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={16} />
                    Sair da Conta
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                background: 'linear-gradient(135deg, rgba(48, 209, 88, 0.25), rgba(48, 209, 88, 0.1))',
                border: '1px solid rgba(48, 209, 88, 0.35)',
                color: '#30d158',
                padding: '7px 14px',
                borderRadius: '12px',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <LogIn size={15} />
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};


