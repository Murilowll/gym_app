import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  LogOut,
  ShieldCheck,
  Activity,
  Target,
  Scale,
  Ruler,
  TrendingUp,
  Users,
  Edit3,
  Check,
  X,
  Save
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { UserStats } from '../types/workout';

interface ProfileViewProps {
  stats: UserStats;
  onOpenOnboarding: () => void;
  onOpenCatalog: () => void;
  onOpenTrainer?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  stats,
  onOpenOnboarding,
  onOpenCatalog,
  onOpenTrainer
}) => {
  const { user, profile, signOutUser, switchRole, updateUserProfileData } = useAuth();

  const isTrainer = profile?.role === 'trainer';
  const displayName = profile?.displayName || user?.displayName || (user?.email?.includes('murilo') ? 'Murilo Lopes' : 'Atleta IronPulse');
  const userInitial = displayName.charAt(0).toUpperCase();

  // Biometria
  const heightCm = profile?.heightCm || 178;
  const weightKg = profile?.weightKg || 78;
  const targetWeightKg = profile?.targetWeightKg || 83;
  const age = profile?.age || 25;
  const phone = profile?.phone || '';
  const goal = profile?.goal || 'Ganhar Massa Muscular';

  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  let bmiLabel = 'Peso Normal';
  if (bmi < 18.5) bmiLabel = 'Abaixo do peso';
  else if (bmi >= 25 && bmi < 30) bmiLabel = 'Sobrepeso Leve';
  else if (bmi >= 30) bmiLabel = 'Obesidade';

  // Estado do Modal de Edição de Conta
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(displayName);
  const [editWeight, setEditWeight] = useState(weightKg.toString());
  const [editTargetWeight, setEditTargetWeight] = useState(targetWeightKg.toString());
  const [editHeight, setEditHeight] = useState(heightCm.toString());
  const [editAge, setEditAge] = useState(age.toString());
  const [editPhone, setEditPhone] = useState(phone);
  const [editGoal, setEditGoal] = useState(goal);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleOpenEdit = () => {
    setEditName(displayName);
    setEditWeight(weightKg.toString());
    setEditTargetWeight(targetWeightKg.toString());
    setEditHeight(heightCm.toString());
    setEditAge(age.toString());
    setEditPhone(phone);
    setEditGoal(goal);
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserProfileData({
        displayName: editName.trim() || displayName,
        weightKg: parseFloat(editWeight) || weightKg,
        targetWeightKg: parseFloat(editTargetWeight) || targetWeightKg,
        heightCm: parseInt(editHeight, 10) || heightCm,
        age: parseInt(editAge, 10) || age,
        phone: editPhone.trim(),
        goal: editGoal
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setIsEditing(false);
        setSaveSuccess(false);
      }, 700);
    } catch (err) {
      console.error('Erro ao salvar alterações:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-view-container">
      {/* Card Principal do Usuário */}
      <div className="profile-hero-card">
        <div className="profile-avatar-circle">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={displayName} className="profile-avatar-img" />
          ) : (
            <span className="profile-avatar-text">{userInitial}</span>
          )}
          <div className={`profile-status-dot ${isTrainer ? 'trainer' : 'student'}`} />
        </div>

        <div className="profile-identity">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <h2 className="profile-name">{displayName}</h2>
            <button
              onClick={handleOpenEdit}
              className="profile-edit-btn-pill"
              title="Editar Minha Conta"
            >
              <Edit3 size={14} />
              <span>Editar</span>
            </button>
          </div>
          <p className="profile-email">{user?.email || 'Modo Visitante Local'}</p>

          <div className="profile-badges-row">
            <span className={`profile-role-chip ${isTrainer ? 'trainer' : 'student'}`}>
              <ShieldCheck size={13} />
              {isTrainer ? 'Personal Trainer' : 'Aluno'}
            </span>
            <span className="profile-streak-chip">
              🔥 {stats.streakDays} dias de ofensiva
            </span>
          </div>
        </div>
      </div>

      {/* Métricas Biométricas & Objetivo */}
      <div className="profile-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <h3 className="section-title-clean">
            <Activity size={18} />
            Métricas Biométricas & Meta
          </h3>
          <button
            onClick={handleOpenEdit}
            style={{
              background: 'none',
              border: 'none',
              color: '#30d158',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Edit3 size={13} />
            Editar Dados
          </button>
        </div>

        <div className="profile-metrics-grid">
          <div className="profile-metric-box">
            <div className="metric-box-icon scale">
              <Scale size={18} />
            </div>
            <div className="metric-box-data">
              <span className="metric-box-val">{weightKg} kg</span>
              <span className="metric-box-label">Peso Atual</span>
            </div>
          </div>

          <div className="profile-metric-box">
            <div className="metric-box-icon target">
              <Target size={18} />
            </div>
            <div className="metric-box-data">
              <span className="metric-box-val">{targetWeightKg} kg</span>
              <span className="metric-box-label">Peso Meta</span>
            </div>
          </div>

          <div className="profile-metric-box">
            <div className="metric-box-icon ruler">
              <Ruler size={18} />
            </div>
            <div className="metric-box-data">
              <span className="metric-box-val">{heightCm} cm</span>
              <span className="metric-box-label">Altura</span>
            </div>
          </div>

          <div className="profile-metric-box">
            <div className="metric-box-icon trending">
              <TrendingUp size={18} />
            </div>
            <div className="metric-box-data">
              <span className="metric-box-val">{bmi}</span>
              <span className="metric-box-label">{bmiLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ações e Ferramentas */}
      <div className="profile-section">
        <h3 className="section-title-clean">
          <Sparkles size={18} />
          Treino & Recursos
        </h3>

        <div className="profile-actions-list">
          <button onClick={handleOpenEdit} className="profile-action-btn">
            <div className="action-btn-left">
              <div className="action-icon-pill role" style={{ background: 'rgba(100, 210, 255, 0.2)', color: '#64d2ff' }}>
                <Edit3 size={20} />
              </div>
              <div className="action-text">
                <strong>Editar Dados da Conta</strong>
                <span>Altere nome, peso atual, peso meta e altura</span>
              </div>
            </div>
          </button>

          <button onClick={onOpenOnboarding} className="profile-action-btn highlight">
            <div className="action-btn-left">
              <div className="action-icon-pill ai">
                <Sparkles size={20} />
              </div>
              <div className="action-text">
                <strong>Refazer Onboarding com IA</strong>
                <span>Personalize seu treino e recalcule calorias</span>
              </div>
            </div>
          </button>

          <button onClick={onOpenCatalog} className="profile-action-btn">
            <div className="action-btn-left">
              <div className="action-icon-pill catalog">
                <BookOpen size={20} />
              </div>
              <div className="action-text">
                <strong>Catálogo de Exercícios</strong>
                <span>54 exercícios com animações em GIF e biomecânica</span>
              </div>
            </div>
          </button>

          {onOpenTrainer && (
            <button onClick={onOpenTrainer} className="profile-action-btn">
              <div className="action-btn-left">
                <div className="action-icon-pill trainer">
                  <Users size={20} />
                </div>
                <div className="action-text">
                  <strong>Painel de Treinador</strong>
                  <span>Gerenciar alunos e prescrição de treinos</span>
                </div>
              </div>
            </button>
          )}

          {/* Alternar Perfil Aluno / Personal */}
          <button
            onClick={() => switchRole(isTrainer ? 'student' : 'trainer')}
            className="profile-action-btn"
          >
            <div className="action-btn-left">
              <div className="action-icon-pill role">
                <ShieldCheck size={20} />
              </div>
              <div className="action-text">
                <strong>Alternar Função</strong>
                <span>Mudar para {isTrainer ? 'Aluno' : 'Personal Trainer'}</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Cloud Status e Logout */}
      <div className="profile-section">
        <div className="profile-footer-card">
          <div className="cloud-status-row">
            <span className="cloud-indicator online" />
            <span className="cloud-text">Sincronizado com Firebase Cloud Firestore</span>
          </div>

          <button onClick={signOutUser} className="profile-logout-btn">
            <LogOut size={16} />
            <span>Sair da Conta</span>
          </button>
        </div>
      </div>

      {/* MODAL DE EDIÇÃO DE CONTA */}
      {isEditing && (
        <div className="modal-backdrop" onClick={() => setIsEditing(false)}>
          <div
            className="edit-profile-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="edit-profile-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="edit-icon-wrap">
                  <Edit3 size={18} color="#30d158" />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Editar Conta</h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="edit-close-btn"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="edit-profile-form">
              <div className="edit-field">
                <label className="edit-label">Nome Completo</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="edit-input"
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className="edit-grid-2">
                <div className="edit-field">
                  <label className="edit-label">Peso Atual (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                    className="edit-input"
                    placeholder="Ex: 78.5"
                    required
                  />
                </div>

                <div className="edit-field">
                  <label className="edit-label">Peso Meta (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editTargetWeight}
                    onChange={(e) => setEditTargetWeight(e.target.value)}
                    className="edit-input"
                    placeholder="Ex: 83"
                    required
                  />
                </div>
              </div>

              <div className="edit-grid-2">
                <div className="edit-field">
                  <label className="edit-label">Altura (cm)</label>
                  <input
                    type="number"
                    value={editHeight}
                    onChange={(e) => setEditHeight(e.target.value)}
                    className="edit-input"
                    placeholder="Ex: 178"
                    required
                  />
                </div>

                <div className="edit-field">
                  <label className="edit-label">Idade (anos)</label>
                  <input
                    type="number"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                    className="edit-input"
                    placeholder="Ex: 25"
                  />
                </div>
              </div>

              <div className="edit-field">
                <label className="edit-label">Objetivo Principal</label>
                <select
                  value={editGoal}
                  onChange={(e) => setEditGoal(e.target.value)}
                  className="edit-input edit-select"
                >
                  <option value="Ganhar Massa Muscular">Ganhar Massa Muscular (Hipertrofia)</option>
                  <option value="Perder Gordura">Perder Gordura / Secar</option>
                  <option value="Definição & Tônus">Definição & Tônus</option>
                  <option value="Força Máxima">Força Máxima</option>
                </select>
              </div>

              <div className="edit-field">
                <label className="edit-label">Telefone / WhatsApp (opcional)</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="edit-input"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="edit-actions-row">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="edit-cancel-btn"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="edit-submit-btn"
                >
                  {saveSuccess ? (
                    <>
                      <Check size={18} />
                      <span>Salvo com Sucesso!</span>
                    </>
                  ) : isSaving ? (
                    <span>Salvando...</span>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Salvar Alterações</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
