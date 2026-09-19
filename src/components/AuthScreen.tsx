import React, { useState } from 'react';
import {
  Dumbbell,
  Mail,
  Lock,
  User as UserIcon,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Zap
} from 'lucide-react';
import { AppLogo } from './AppLogo';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types/user';

interface AuthScreenProps {
  onContinueAsGuest?: () => void;
  onOpenOnboardingTest?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onContinueAsGuest, onOpenOnboardingTest }) => {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('murilolemoslopes@gmail.com');
  const [password, setPassword] = useState('mumu2013');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetFormState = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleSwitchMode = (newMode: 'login' | 'register' | 'forgot') => {
    resetFormState();
    setMode(newMode);
    if (newMode === 'register') {
      setEmail('');
      setPassword('');
      setDisplayName('');
    } else if (newMode === 'login' && !email) {
      setEmail('murilolemoslopes@gmail.com');
      setPassword('mumu2013');
    }
  };

  const getFriendlyError = (code: string) => {
    switch (code) {
      case 'auth/operation-not-allowed':
        return 'O provedor de E-mail/Senha ainda não foi ativado no Firebase Console! Vá em Authentication > Sign-in method (Método de login) > E-mail/senha e clique em Ativar/Salvar.';
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'E-mail ou senha inválidos. Se ainda não criou a conta, clique na aba "Criar Conta".';
      case 'auth/email-already-in-use':
        return 'Este e-mail já está cadastrado. Tente entrar.';
      case 'auth/weak-password':
        return 'A senha deve conter no mínimo 6 caracteres.';
      case 'auth/invalid-email':
        return 'Digite um e-mail válido.';
      case 'auth/popup-closed-by-user':
        return 'Login cancelado na janela do Google.';
      case 'auth/network-request-failed':
        return 'Falha de conexão com o Firebase. Verifique sua internet.';
      default:
        return `Ocorreu um erro no Firebase (${code || 'desconhecido'}). Verifique se o provedor está ativo no Console.`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();
    setLoading(true);

    try {
      if (mode === 'login') {
        try {
          await signInWithEmail(email.trim(), password);
        } catch (signInErr: unknown) {
          const anyErr = signInErr as { code?: string };
          // Se for a conta do Murilo e ainda não estiver criada no Firebase Auth, cria automaticamente!
          if (
            email.trim().toLowerCase() === 'murilolemoslopes@gmail.com' &&
            (anyErr.code === 'auth/invalid-credential' || anyErr.code === 'auth/user-not-found')
          ) {
            await signUpWithEmail(email.trim(), password, 'Murilo Lopes', 'student');
            return;
          }
          throw signInErr;
        }
      } else if (mode === 'register') {
        if (!displayName.trim()) {
          throw new Error('Informe seu nome completo.');
        }
        await signUpWithEmail(email.trim(), password, displayName.trim(), role);
      } else if (mode === 'forgot') {
        await resetPassword(email.trim());
        setSuccessMsg('Link de recuperação enviado para o seu e-mail!');
      }
    } catch (err: unknown) {
      const anyErr = err as { code?: string; message?: string };
      setErrorMsg(anyErr.code ? getFriendlyError(anyErr.code) : anyErr.message || 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickMuriloLogin = async () => {
    resetFormState();
    setLoading(true);
    setEmail('murilolemoslopes@gmail.com');
    setPassword('mumu2013');

    try {
      try {
        await signInWithEmail('murilolemoslopes@gmail.com', 'mumu2013');
      } catch (err: unknown) {
        const anyErr = err as { code?: string };
        if (anyErr.code === 'auth/invalid-credential' || anyErr.code === 'auth/user-not-found') {
          // Cria a conta do Murilo automaticamente se ainda não existir
          await signUpWithEmail('murilolemoslopes@gmail.com', 'mumu2013', 'Murilo Lopes', 'student');
        } else {
          throw err;
        }
      }
    } catch (err: unknown) {
      const anyErr = err as { code?: string; message?: string };
      setErrorMsg(anyErr.code ? getFriendlyError(anyErr.code) : anyErr.message || 'Erro ao entrar.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    resetFormState();
    setLoading(true);
    try {
      await signInWithGoogle(role);
    } catch (err: unknown) {
      const anyErr = err as { code?: string };
      setErrorMsg(anyErr.code ? getFriendlyError(anyErr.code) : 'Erro ao autenticar com Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        background: 'radial-gradient(ellipse at 50% 10%, rgba(48, 209, 88, 0.12), #09090b 70%)',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'linear-gradient(160deg, rgba(24, 24, 28, 0.95), rgba(12, 12, 15, 0.98))',
          borderRadius: '28px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.16)',
          padding: '32px 28px',
          color: '#ffffff',
          position: 'relative'
        }}
      >
        {/* Brand Logo & Título */}
        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: '#000000',
              border: '1.5px solid rgba(255, 255, 255, 0.18)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
              boxShadow: '0 12px 28px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            }}
          >
            <AppLogo size={36} color="#ffffff" />
          </div>
          <h1
            style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              margin: '0 0 6px 0',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(180deg, #ffffff, #d4d4d8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            IronPulse Academy
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#8e8e93', margin: 0 }}>
            {mode === 'login' && 'Acesse seus treinos, cargas e evolução na nuvem'}
            {mode === 'register' && 'Cadastre-se para sincronizar seus treinos'}
            {mode === 'forgot' && 'Recupere o acesso à sua conta'}
          </p>
        </div>

        {/* Atalho de Login Direto da Conta Pessoal (Murilo Lopes) */}
        {mode === 'login' && (
          <div
            onClick={handleQuickMuriloLogin}
            style={{
              background: 'linear-gradient(135deg, rgba(48, 209, 88, 0.15), rgba(48, 209, 88, 0.05))',
              border: '1px solid rgba(48, 209, 88, 0.35)',
              borderRadius: '16px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(48, 209, 88, 0.7)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(48, 209, 88, 0.35)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1rem'
                }}
              >
                ML
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.94rem' }}>Entrar como Murilo Lopes</span>
                  <Sparkles size={14} color="#ffffff" />
                </div>
                <div style={{ fontSize: '0.78rem', color: '#a1a1aa' }}>murilolemoslopes@gmail.com</div>
              </div>
            </div>
            <ChevronRight size={18} color="#ffffff" />
          </div>
        )}

        {/* Botão de Teste do Onboarding MadMuscles */}
        {onOpenOnboardingTest && (
          <div
            onClick={onOpenOnboardingTest}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Zap size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>
                    Testar Onboarding (Estilo MadMuscles)
                  </span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#a1a1aa' }}>
                  Etapas, IMC, meta e geração de treino com IA
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="#ffffff" />
          </div>
        )}

        {/* Seletor de Abas: Entrar / Criar Conta */}
        {mode !== 'forgot' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: 'rgba(255, 255, 255, 0.06)',
              padding: '4px',
              borderRadius: '14px',
              marginBottom: '20px'
            }}
          >
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              style={{
                background: mode === 'login' ? '#ffffff' : 'transparent',
                color: mode === 'login' ? '#000000' : '#a1a1aa',
                fontWeight: mode === 'login' ? 700 : 500,
                border: 'none',
                padding: '10px 0',
                borderRadius: '11px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode('register')}
              style={{
                background: mode === 'register' ? '#ffffff' : 'transparent',
                color: mode === 'register' ? '#000000' : '#a1a1aa',
                fontWeight: mode === 'register' ? 700 : 500,
                border: 'none',
                padding: '10px 0',
                borderRadius: '11px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Criar Conta
            </button>
          </div>
        )}

        {/* Botão Google */}
        {mode !== 'forgot' && (
          <>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                padding: '12px',
                borderRadius: '14px',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                />
              </svg>
              Continuar com Google
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '18px 0',
                color: '#636366',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
              <span style={{ padding: '0 12px' }}>ou com e-mail</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
            </div>
          </>
        )}

        {/* Feedback de erro */}
        {errorMsg && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 55, 95, 0.15)',
              border: '1px solid rgba(255, 55, 95, 0.35)',
              color: '#ff6b8b',
              padding: '12px 14px',
              borderRadius: '12px',
              fontSize: '0.86rem',
              marginBottom: '16px'
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Feedback de sucesso */}
        {successMsg && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              color: '#ffffff',
              padding: '12px 14px',
              borderRadius: '12px',
              fontSize: '0.86rem',
              marginBottom: '16px'
            }}
          >
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Formulário Principal */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Se estiver no cadastro: Nome e Escolha de Perfil */}
          {mode === 'register' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#a1a1aa', marginBottom: '6px' }}>
                  Nome Completo
                </label>
                <div style={{ position: 'relative' }}>
                  <UserIcon
                    size={17}
                    color="#71717a"
                    style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ex: Carlos Oliveira"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      padding: '12px 14px 12px 42px',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Seletor de Perfil (Aluno vs Personal) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#a1a1aa', marginBottom: '6px' }}>
                  Tipo de Conta
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    style={{
                      padding: '11px',
                      borderRadius: '12px',
                      border: role === 'student' ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: role === 'student' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.3)',
                      color: role === 'student' ? '#ffffff' : '#a1a1aa',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Dumbbell size={16} />
                    Aluno
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('trainer')}
                    style={{
                      padding: '11px',
                      borderRadius: '12px',
                      border: role === 'trainer' ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: role === 'trainer' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.3)',
                      color: role === 'trainer' ? '#ffffff' : '#a1a1aa',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <ShieldCheck size={16} />
                    Personal
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Campo E-mail */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#a1a1aa', marginBottom: '6px' }}>
              E-mail
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={17}
                color="#71717a"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '12px 14px 12px 42px',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Campo Senha */}
          {mode !== 'forgot' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', color: '#a1a1aa' }}>Senha</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('forgot')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#64d2ff',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Esqueceu?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={17}
                  color="#71717a"
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '12px',
                    padding: '12px 14px 12px 42px',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              width: '100%',
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              padding: '14px',
              borderRadius: '14px',
              fontSize: '0.96rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(255, 255, 255, 0.25)',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? (
              <span>Carregando...</span>
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Entrar na Plataforma'}
                  {mode === 'register' && 'Cadastrar e Começar'}
                  {mode === 'forgot' && 'Enviar link de recuperação'}
                </span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Voltar para login se forgot */}
        {mode === 'forgot' ? (
          <div style={{ textAlign: 'center', marginTop: '18px' }}>
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#a1a1aa',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              ← Voltar para o login
            </button>
          </div>
        ) : (
          onContinueAsGuest && (
            <div style={{ textAlign: 'center', marginTop: '18px' }}>
              <button
                type="button"
                onClick={onContinueAsGuest}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#71717a',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Continuar como convidado (modo local)
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
