import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Dumbbell, ShieldCheck, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { AppLogo } from './AppLogo';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types/user';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetFormState = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleSwitchMode = (newMode: 'login' | 'register' | 'forgot') => {
    resetFormState();
    setMode(newMode);
  };

  const getFriendlyError = (code: string) => {
    switch (code) {
      case 'auth/operation-not-allowed':
        return 'O provedor de E-mail/Senha ainda não foi ativado no Firebase Console! Vá em Authentication > Sign-in method (Método de login) > E-mail/senha e clique em Ativar/Salvar.';
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'E-mail ou senha inválidos.';
      case 'auth/email-already-in-use':
        return 'Este e-mail já está em uso por outra conta.';
      case 'auth/weak-password':
        return 'A senha deve conter no mínimo 6 caracteres.';
      case 'auth/invalid-email':
        return 'Digite um endereço de e-mail válido.';
      case 'auth/popup-closed-by-user':
        return 'Login cancelado pela janela pop-up.';
      case 'auth/network-request-failed':
        return 'Falha de conexão com o Firebase. Verifique sua internet.';
      default:
        return `Ocorreu um erro (${code || 'desconhecido'}). Verifique se o serviço está ativo no Firebase Console.`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();
    setLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
        onClose();
      } else if (mode === 'register') {
        if (!displayName.trim()) {
          throw new Error('Por favor, informe seu nome.');
        }
        await signUpWithEmail(email, password, displayName.trim(), role);
        onClose();
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccessMsg('Enviamos um link de redefinição de senha para seu e-mail!');
      }
    } catch (err: unknown) {
      const anyErr = err as { code?: string; message?: string };
      setErrorMsg(anyErr.code ? getFriendlyError(anyErr.code) : anyErr.message || 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    resetFormState();
    setLoading(true);
    try {
      await signInWithGoogle(role);
      onClose();
    } catch (err: unknown) {
      const anyErr = err as { code?: string };
      setErrorMsg(anyErr.code ? getFriendlyError(anyErr.code) : 'Erro ao conectar com Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="auth-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, rgba(24, 24, 28, 0.96), rgba(12, 12, 14, 0.98))',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          padding: '28px',
          width: '100%',
          maxWidth: '440px',
          color: '#ffffff',
          position: 'relative'
        }}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#a1a1aa'
          }}
        >
          <X size={18} />
        </button>

        {/* Cabeçalho do Modal */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: '#000000',
              border: '1.5px solid rgba(255, 255, 255, 0.18)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              boxShadow: '0 10px 24px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            }}
          >
            <AppLogo size={32} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            {mode === 'login' && 'Entrar no IronPulse'}
            {mode === 'register' && 'Criar sua Conta'}
            {mode === 'forgot' && 'Recuperar Senha'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#8e8e93', margin: 0 }}>
            {mode === 'login' && 'Sincronize seus treinos, cargas e histórico na nuvem'}
            {mode === 'register' && 'Escolha seu perfil e inicie sua jornada na nuvem'}
            {mode === 'forgot' && 'Digite seu e-mail para receber as instruções'}
          </p>
        </div>

        {/* Abas Alternar Entrar / Cadastrar (se não estiver em forgot) */}
        {mode !== 'forgot' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: 'rgba(255, 255, 255, 0.06)',
              padding: '4px',
              borderRadius: '12px',
              marginBottom: '20px'
            }}
          >
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              style={{
                background: mode === 'login' ? '#30d158' : 'transparent',
                color: mode === 'login' ? '#09090b' : '#a1a1aa',
                fontWeight: mode === 'login' ? 700 : 500,
                border: 'none',
                padding: '9px 0',
                borderRadius: '9px',
                fontSize: '0.88rem',
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
                background: mode === 'register' ? '#30d158' : 'transparent',
                color: mode === 'register' ? '#09090b' : '#a1a1aa',
                fontWeight: mode === 'register' ? 700 : 500,
                border: 'none',
                padding: '9px 0',
                borderRadius: '9px',
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Criar Conta
            </button>
          </div>
        )}

        {/* Botão Google (se não for forgot) */}
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
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginBottom: '16px'
            }}
          >
            <AlertCircle size={17} style={{ flexShrink: 0 }} />
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
              background: 'rgba(48, 209, 88, 0.15)',
              border: '1px solid rgba(48, 209, 88, 0.35)',
              color: '#30d158',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              marginBottom: '16px'
            }}
          >
            <CheckCircle2 size={17} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Formulário Principal */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Se estiver no cadastro: Nome e Escolha de Perfil */}
          {mode === 'register' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '6px' }}>
                  Seu Nome
                </label>
                <div style={{ position: 'relative' }}>
                  <UserIcon
                    size={16}
                    color="#71717a"
                    style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ex: Carlos Silva"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      padding: '11px 14px 11px 40px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Seletor de Perfil (Aluno vs Personal) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '6px' }}>
                  Tipo de Acesso
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    style={{
                      padding: '10px',
                      borderRadius: '12px',
                      border: role === 'student' ? '1.5px solid #30d158' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: role === 'student' ? 'rgba(48, 209, 88, 0.12)' : 'rgba(0, 0, 0, 0.3)',
                      color: role === 'student' ? '#30d158' : '#a1a1aa',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Dumbbell size={15} />
                    Aluno
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('trainer')}
                    style={{
                      padding: '10px',
                      borderRadius: '12px',
                      border: role === 'trainer' ? '1.5px solid #64d2ff' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: role === 'trainer' ? 'rgba(100, 210, 255, 0.12)' : 'rgba(0, 0, 0, 0.3)',
                      color: role === 'trainer' ? '#64d2ff' : '#a1a1aa',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <ShieldCheck size={15} />
                    Personal
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Campo de E-mail */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '6px' }}>
              E-mail
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
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
                  padding: '11px 14px 11px 40px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Campo de Senha (se não for forgot) */}
          {mode !== 'forgot' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Senha</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('forgot')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#64d2ff',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Esqueceu a senha?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={16}
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
                    padding: '11px 14px 11px 40px',
                    color: '#ffffff',
                    fontSize: '0.9rem',
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
              background: '#30d158',
              color: '#09090b',
              border: 'none',
              padding: '13px',
              borderRadius: '14px',
              fontSize: '0.94rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(48, 209, 88, 0.35)',
              transition: 'transform 0.15s ease, opacity 0.15s ease',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? (
              <span>Carregando...</span>
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Entrar'}
                  {mode === 'register' && 'Concluir Cadastro'}
                  {mode === 'forgot' && 'Enviar link de recuperação'}
                </span>
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Voltar para Login se estiver em modo Forgot */}
        {mode === 'forgot' && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
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
        )}
      </div>
    </div>
  );
};
