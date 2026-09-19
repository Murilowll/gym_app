import React, { useState } from 'react';
import { Flame, History, LogIn, LogOut, User as UserIcon, ShieldCheck, BookOpen, Sparkles, Sun, Moon } from 'lucide-react';
import { AppLogo } from './AppLogo';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

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
  const { isDark, toggleTheme } = useTheme();
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
            <AppLogo size={22} color={isDark ? '#ffffff' : '#000000'} />
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
                  background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                  borderRadius: '12px'
                }}
                title="Minha Conta"
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: isDark ? '#ffffff' : '#000000',
                    color: isDark ? '#000000' : '#ffffff',
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
                    color: 'var(--text-primary)'
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
                    background: isDark ? 'rgba(20, 20, 22, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)'}`,
                    borderRadius: '14px',
                    padding: '8px',
                    minWidth: '220px',
                    zIndex: 100,
                    boxShadow: isDark ? '0 12px 30px rgba(0,0,0,0.8)' : '0 12px 30px rgba(0,0,0,0.12)',
                    color: 'var(--text-primary)',
                    backdropFilter: 'blur(20px)'
                  }}
                  onClick={() => setShowUserMenu(false)}
                >
                  <div style={{ padding: '8px 10px', borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}` }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-pure)' }}>{profile?.displayName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{profile?.email}</div>
                    <div style={{ marginTop: '6px' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '6px',
                          background: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
                          color: 'var(--text-pure)'
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
                      background: activeTab === 'profile' ? (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)') : 'none',
                      border: 'none',
                      padding: '10px',
                      color: 'var(--text-primary)',
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

                  {/* BOTÃO PARA ALTERNAR MODO ESCURO / MODO CLARO */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheme();
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
                      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'}`,
                      padding: '9px 10px',
                      color: 'var(--text-pure)',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      margin: '4px 0'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {isDark ? <Sun size={15} /> : <Moon size={15} />}
                      <span style={{ fontWeight: 600 }}>{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {isDark ? 'Ativar' : 'Ativar'}
                    </span>
                  </button>

                  {isTrainer && (
                    <button
                      onClick={() => onSelectTab('trainer')}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: activeTab === 'trainer' ? (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)') : 'none',
                        border: 'none',
                        padding: '10px',
                        color: 'var(--text-primary)',
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
                        color: 'var(--text-primary)',
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
                      color: 'var(--text-secondary)',
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
                      color: '#ff453a',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={toggleTheme}
                className="header-icon-btn"
                title={isDark ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button
                onClick={onOpenAuth}
                style={{
                  background: isDark ? '#ffffff' : '#000000',
                  border: 'none',
                  color: isDark ? '#000000' : '#ffffff',
                  padding: '7px 15px',
                  borderRadius: '12px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <LogIn size={15} color={isDark ? '#000000' : '#ffffff'} />
                Entrar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


