import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Sparkles,
  Camera,
  Mail,
  User,
  Flame,
  TrendingUp
} from 'lucide-react';
import type {
  OnboardingAnswers,
  GeneratedPlanResult,
  FitnessGoal,
  ExperienceLevel
} from '../types/onboarding';
import { generatePersonalizedWorkout } from '../utils/workoutGenerator';
import { useAuth } from '../contexts/AuthContext';

interface OnboardingFunnelProps {
  isOpen: boolean;
  onClose: () => void;
  onFinishPlan: (plan: GeneratedPlanResult, answers: OnboardingAnswers) => void;
  isTestMode?: boolean;
}

interface SlideItem {
  image: string;
  title: string;
  desc: string;
}

export const OnboardingFunnel: React.FC<OnboardingFunnelProps> = ({
  isOpen,
  onClose,
  onFinishPlan,
  isTestMode: _isTestMode = false
}) => {
  const { user, profile, updateUserProfileData } = useAuth();

  // 0: Intro Carousel, 1: Gender, 2: Age, 3: Weight, 4: Height, 5: Goal, 6: Activity Level, 7: Profile, 8: Analyzing, 9: Result
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  // Respostas do usuário
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    gender: 'male',
    goal: 'gain_muscle',
    selectedGoals: ['Construir Músculos / Hipertrofia', 'Ficar em Forma & Definido'],
    targetAreas: ['Peito', 'Braços', 'Costas'],
    experience: 'intermediate',
    frequency: 4,
    location: 'gym',
    age: 25,
    heightCm: 175,
    weightKg: 75,
    targetWeightKg: 80,
    fullName: profile?.displayName || user?.displayName || '',
    nickname: '',
    email: user?.email || '',
    phone: profile?.phone || '',
    avatarUrl: user?.photoURL || ''
  });

  // Estado da Análise com IA
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisPhase, setAnalysisPhase] = useState(0);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlanResult | null>(null);

  // Slides de Apresentação (Imagens geradas de alta fidelidade)
  const introSlides: SlideItem[] = [
    {
      image: '/onboarding/slide-1.jpg',
      title: 'Bem-vindo ao 👋\nIronPulse',
      desc: 'O melhor aplicativo de musculação para transformar seus treinos e acompanhar sua evolução.'
    },
    {
      image: '/onboarding/slide-2.jpg',
      title: 'Encontre o treino ideal para suas metas',
      desc: 'Rotinas personalizadas estruturadas com base na ciência do treinamento e hipertrofia.'
    },
    {
      image: '/onboarding/slide-3.jpg',
      title: 'Treinos precisos e resultados reais',
      desc: 'Catálogo de alta definição com biomecânica aplicada e execução perfeita de cada movimento.'
    },
    {
      image: '/onboarding/slide-4.jpg',
      title: 'Treine certo e viva saudável com a gente',
      desc: 'Controle sua constância com ofensivas, metas de hidratação e veja sua evolução diária.'
    }
  ];

  // Opções de Objetivos
  const goalOptions = [
    { id: 'fitter', label: 'Ficar em Forma (Get Fitter)', goalKey: 'gain_muscle' as FitnessGoal },
    { id: 'gain', label: 'Ganhar Peso & Cargas (Gain Weight)', goalKey: 'gain_muscle' as FitnessGoal },
    { id: 'lose', label: 'Perder Peso & Queimar Gordura (Lose Weight)', goalKey: 'lose_weight' as FitnessGoal },
    { id: 'muscle', label: 'Construir Músculos / Hipertrofia (Building Muscles)', goalKey: 'gain_muscle' as FitnessGoal },
    { id: 'endurance', label: 'Melhorar Resistência (Improving Endurance)', goalKey: 'strength' as FitnessGoal },
    { id: 'longevity', label: 'Saúde Geral & Longevidade (Wellness)', goalKey: 'strength' as FitnessGoal }
  ];

  // Opções de Nível
  const activityLevels = [
    {
      level: 'beginner' as ExperienceLevel,
      title: 'Iniciante',
      desc: 'Estou começando agora ou treino há menos de 6 meses.'
    },
    {
      level: 'intermediate' as ExperienceLevel,
      title: 'Intermediário',
      desc: 'Treino com consistência há mais de 6 meses até 2 anos.'
    },
    {
      level: 'advanced' as ExperienceLevel,
      title: 'Avançado',
      desc: 'Treino intensamente há mais de 2 anos com boas cargas.'
    }
  ];

  // Frases durante a análise
  const analysisPhrases = [
    'Calculando Índice de Massa Corporal (IMC) e taxa metabólica...',
    'Ajustando volume semanal e séries de acordo com seu objetivo...',
    'Selecionando os melhores exercícios do catálogo biomecânico...',
    'Finalizando sua rotina exclusiva de treinos inteligentes!'
  ];

  // Navegação no Carousel
  const handleNextSlide = () => {
    if (carouselIndex < introSlides.length - 1) {
      setCarouselIndex((prev) => prev + 1);
    } else {
      setCurrentStep(1); // Vai para Gênero
    }
  };

  // Alternar Gols
  const handleToggleGoal = (label: string, goalKey: FitnessGoal) => {
    setAnswers((prev) => {
      const current = prev.selectedGoals || [];
      const exists = current.includes(label);
      let updated: string[];
      if (exists) {
        if (current.length === 1) return prev;
        updated = current.filter((g) => g !== label);
      } else {
        updated = [...current, label];
      }
      return {
        ...prev,
        selectedGoals: updated,
        goal: goalKey
      };
    });
  };

  // Iniciar análise de IA
  const handleStartAnalysis = () => {
    setCurrentStep(8);
    setAnalysisProgress(0);
    setAnalysisPhase(0);
  };

  // Efeito da barra de progresso da análise com IA
  useEffect(() => {
    if (currentStep === 8) {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            const plan = generatePersonalizedWorkout(answers);
            setGeneratedPlan(plan);
            setTimeout(() => setCurrentStep(9), 400);
            return 100;
          }
          const next = prev + 5;
          if (next > 25 && next <= 50) setAnalysisPhase(1);
          if (next > 50 && next <= 75) setAnalysisPhase(2);
          if (next > 75) setAnalysisPhase(3);
          return next;
        });
      }, 60);

      return () => clearInterval(interval);
    }
  }, [currentStep, answers]);

  // Concluir e aplicar plano
  const handleFinish = async () => {
    if (!generatedPlan) return;

    // Se preencheu dados de perfil e está logado, salva na conta
    if (user && updateUserProfileData) {
      try {
        await updateUserProfileData({
          displayName: answers.fullName || user.displayName || 'Atleta',
          age: answers.age,
          heightCm: answers.heightCm,
          weightKg: answers.weightKg,
          targetWeightKg: answers.targetWeightKg,
          phone: answers.phone,
          goal: answers.selectedGoals?.[0] || 'Hipertrofia'
        });
      } catch (err) {
        console.warn('Erro ao atualizar perfil pelo onboarding:', err);
      }
    }

    onFinishPlan(generatedPlan, answers);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="onboarding-fullscreen-modal">
      <div className="onboarding-wrapper">
        {/* =========================================================
            TELA 0: CAROUSEL INTRODUTÓRIO COM FOTOS
            ========================================================= */}
        {currentStep === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh' }}>
            <div className="onboarding-nav-bar">
              <div style={{ width: '40px' }} />
              <button
                onClick={() => setCurrentStep(1)}
                className="onboarding-skip-link"
                type="button"
              >
                Pular
              </button>
            </div>

            <div className="onboarding-slide-card">
              <img
                src={introSlides[carouselIndex].image}
                alt={`Slide ${carouselIndex + 1}`}
                className="onboarding-slide-img"
              />
              <div className="onboarding-slide-gradient" />

              <div className="onboarding-slide-body">
                <h1
                  className="onboarding-slide-title"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {introSlides[carouselIndex].title}
                </h1>
                <p className="onboarding-slide-desc">
                  {introSlides[carouselIndex].desc}
                </p>

                <div className="onboarding-dots-row">
                  {introSlides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`onboarding-dot ${idx === carouselIndex ? 'active' : ''}`}
                      onClick={() => setCarouselIndex(idx)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="onboarding-bottom-actions">
              <button
                type="button"
                onClick={handleNextSlide}
                className="btn-onboarding-primary full-width"
              >
                <span>{carouselIndex === introSlides.length - 1 ? 'Começar Agora' : 'Próximo'}</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TELA 1: GÊNERO / SEXO ("Tell Us About Yourself")
            ========================================================= */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh' }}>
            <div className="onboarding-nav-bar">
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                className="onboarding-back-icon-btn"
                aria-label="Voltar"
              >
                <ArrowLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="onboarding-skip-link"
              >
                Pular
              </button>
            </div>

            <div className="onboarding-step-body">
              <div className="onboarding-step-header">
                <h2 className="onboarding-step-title">Conte-nos sobre você</h2>
                <p className="onboarding-step-subtitle">
                  Para uma melhor experiência e resultados sob medida, precisamos saber seu gênero.
                </p>
              </div>

              <div className="gender-picker-wrap">
                <button
                  type="button"
                  className={`gender-circle-btn ${answers.gender === 'male' ? 'active' : ''}`}
                  onClick={() => setAnswers((prev) => ({ ...prev, gender: 'male' }))}
                >
                  <span className="gender-circle-icon">♂</span>
                  <span className="gender-circle-label">Masculino</span>
                </button>

                <button
                  type="button"
                  className={`gender-circle-btn ${answers.gender === 'female' ? 'active' : ''}`}
                  onClick={() => setAnswers((prev) => ({ ...prev, gender: 'female' }))}
                >
                  <span className="gender-circle-icon">♀</span>
                  <span className="gender-circle-label">Feminino</span>
                </button>
              </div>
            </div>

            <div className="onboarding-bottom-actions">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn-onboarding-primary full-width"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TELA 2: IDADE ("How Old Are You?")
            ========================================================= */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh' }}>
            <div className="onboarding-nav-bar">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="onboarding-back-icon-btn"
                aria-label="Voltar"
              >
                <ArrowLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="onboarding-skip-link"
              >
                Pular
              </button>
            </div>

            <div className="onboarding-step-body">
              <div className="onboarding-step-header">
                <h2 className="onboarding-step-title">Qual a sua idade?</h2>
                <p className="onboarding-step-subtitle">
                  Idade em anos. Isso ajudará a calibrar o volume e intensidade ideais para você.
                </p>
              </div>

              <div className="vertical-roller-box">
                <div className="roller-divider-line top" />
                <div className="roller-divider-line bottom" />

                <div className="roller-numbers-column">
                  {[answers.age - 2, answers.age - 1, answers.age, answers.age + 1, answers.age + 2].map(
                    (val) => (
                      <div
                        key={val}
                        className={`roller-number-item ${val === answers.age ? 'selected' : ''}`}
                        onClick={() => setAnswers((prev) => ({ ...prev, age: Math.max(14, Math.min(85, val)) }))}
                      >
                        {val}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="onboarding-bottom-actions">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="btn-onboarding-back"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn-onboarding-primary"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TELA 3: PESO ("What Is Your Weight?")
            ========================================================= */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh' }}>
            <div className="onboarding-nav-bar">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="onboarding-back-icon-btn"
                aria-label="Voltar"
              >
                <ArrowLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="onboarding-skip-link"
              >
                Pular
              </button>
            </div>

            <div className="onboarding-step-body">
              <div className="onboarding-step-header">
                <h2 className="onboarding-step-title">Qual o seu peso?</h2>
                <p className="onboarding-step-subtitle">
                  Peso em kg. Não se preocupe, você sempre poderá alterá-lo no seu perfil.
                </p>
              </div>

              <div className="horizontal-ruler-box">
                <div className="ruler-selected-display">
                  <span className="ruler-large-value">{answers.weightKg}</span>
                  <span className="ruler-unit">kg</span>
                </div>

                <div className="ruler-pointer-arrow" />

                <div className="ruler-scroll-track">
                  {[
                    answers.weightKg - 3,
                    answers.weightKg - 2,
                    answers.weightKg - 1,
                    answers.weightKg,
                    answers.weightKg + 1,
                    answers.weightKg + 2,
                    answers.weightKg + 3
                  ].map((val) => (
                    <div
                      key={val}
                      className={`ruler-tick-group ${val === answers.weightKg ? 'selected' : ''}`}
                      onClick={() => setAnswers((prev) => ({ ...prev, weightKg: Math.max(35, Math.min(180, val)) }))}
                    >
                      <div className="ruler-tick-mark" />
                      <span className="ruler-tick-num">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="onboarding-bottom-actions">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn-onboarding-back"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="btn-onboarding-primary"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TELA 4: ALTURA ("What Is Your Height?")
            ========================================================= */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh' }}>
            <div className="onboarding-nav-bar">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="onboarding-back-icon-btn"
                aria-label="Voltar"
              >
                <ArrowLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="onboarding-skip-link"
              >
                Pular
              </button>
            </div>

            <div className="onboarding-step-body">
              <div className="onboarding-step-header">
                <h2 className="onboarding-step-title">Qual a sua altura?</h2>
                <p className="onboarding-step-subtitle">
                  Altura em cm. Usada para estimar com precisão seu gasto calórico e IMC.
                </p>
              </div>

              <div className="vertical-roller-box">
                <div className="roller-divider-line top" />
                <div className="roller-divider-line bottom" />

                <div className="roller-numbers-column">
                  {[
                    answers.heightCm - 2,
                    answers.heightCm - 1,
                    answers.heightCm,
                    answers.heightCm + 1,
                    answers.heightCm + 2
                  ].map((val) => (
                    <div
                      key={val}
                      className={`roller-number-item ${val === answers.heightCm ? 'selected' : ''}`}
                      onClick={() => setAnswers((prev) => ({ ...prev, heightCm: Math.max(130, Math.min(230, val)) }))}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="onboarding-bottom-actions">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn-onboarding-back"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="btn-onboarding-primary"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TELA 5: OBJETIVO ("What Is Your Goal?")
            ========================================================= */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh' }}>
            <div className="onboarding-nav-bar">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="onboarding-back-icon-btn"
                aria-label="Voltar"
              >
                <ArrowLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="onboarding-skip-link"
              >
                Pular
              </button>
            </div>

            <div className="onboarding-step-body">
              <div className="onboarding-step-header">
                <h2 className="onboarding-step-title">Qual o seu objetivo?</h2>
                <p className="onboarding-step-subtitle">
                  Você pode escolher mais de um. Pode alterá-los a qualquer momento.
                </p>
              </div>

              <div className="goal-pills-list">
                {goalOptions.map((opt) => {
                  const isSelected = answers.selectedGoals?.includes(opt.label);

                  return (
                    <div
                      key={opt.id}
                      className={`goal-pill-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleToggleGoal(opt.label, opt.goalKey)}
                    >
                      <span className="goal-pill-label">{opt.label}</span>
                      <div className="goal-checkbox-circle">
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="onboarding-bottom-actions">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="btn-onboarding-back"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="btn-onboarding-primary"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TELA 6: NÍVEL DE ATIVIDADE FÍSICA ("Physical Activity Level?")
            ========================================================= */}
        {currentStep === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh' }}>
            <div className="onboarding-nav-bar">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="onboarding-back-icon-btn"
                aria-label="Voltar"
              >
                <ArrowLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(7)}
                className="onboarding-skip-link"
              >
                Pular
              </button>
            </div>

            <div className="onboarding-step-body">
              <div className="onboarding-step-header">
                <h2 className="onboarding-step-title">Nível de Atividade Física?</h2>
                <p className="onboarding-step-subtitle">
                  Escolha seu nível regular. Isso nos ajudará a dosar as cargas e treinos ideais.
                </p>
              </div>

              <div className="activity-levels-list">
                {activityLevels.map((lvl) => {
                  const isSelected = answers.experience === lvl.level;

                  return (
                    <div
                      key={lvl.level}
                      className={`activity-level-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setAnswers((prev) => ({ ...prev, experience: lvl.level }))}
                    >
                      <span className="activity-level-title">{lvl.title}</span>
                      <span className="activity-level-desc">{lvl.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="onboarding-bottom-actions">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="btn-onboarding-back"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(7)}
                className="btn-onboarding-primary"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TELA 7: PREENCHA SEU PERFIL ("Fill Your Profile")
            ========================================================= */}
        {currentStep === 7 && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh' }}>
            <div className="onboarding-nav-bar">
              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="onboarding-back-icon-btn"
                aria-label="Voltar"
              >
                <ArrowLeft size={22} />
              </button>
              <button
                type="button"
                onClick={handleStartAnalysis}
                className="onboarding-skip-link"
              >
                Pular
              </button>
            </div>

            <div className="onboarding-step-body">
              <div className="onboarding-step-header" style={{ marginBottom: '20px' }}>
                <h2 className="onboarding-step-title">Preencha seu Perfil</h2>
                <p className="onboarding-step-subtitle">
                  Não se preocupe, você pode alterar depois ou preencher agora.
                </p>
              </div>

              <div className="profile-fill-container">
                <div className="profile-avatar-upload-box" title="Foto de Perfil">
                  <div className="profile-avatar-circle-preview">
                    {answers.avatarUrl ? (
                      <img src={answers.avatarUrl} alt="Avatar" />
                    ) : (
                      <User size={44} />
                    )}
                  </div>
                  <div className="profile-avatar-edit-badge">
                    <Camera size={16} />
                  </div>
                </div>

                <div className="profile-inputs-list">
                  <input
                    type="text"
                    placeholder="Nome Completo"
                    className="profile-input-field"
                    value={answers.fullName || ''}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, fullName: e.target.value }))}
                  />

                  <input
                    type="text"
                    placeholder="Apelido / Como quer ser chamado"
                    className="profile-input-field"
                    value={answers.nickname || ''}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, nickname: e.target.value }))}
                  />

                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      placeholder="Seu E-mail"
                      className="profile-input-field"
                      value={answers.email || ''}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, email: e.target.value }))}
                      style={{ paddingRight: '42px' }}
                    />
                    <Mail
                      size={18}
                      color="#a1a1aa"
                      style={{ position: 'absolute', right: '16px', top: '17px', pointerEvents: 'none' }}
                    />
                  </div>

                  <div className="phone-field-wrapper">
                    <div className="phone-country-pill">
                      <span>🇧🇷</span>
                      <span>+55</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={answers.phone || ''}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="onboarding-bottom-actions">
              <button
                type="button"
                onClick={handleStartAnalysis}
                className="btn-onboarding-back"
              >
                Pular
              </button>
              <button
                type="button"
                onClick={handleStartAnalysis}
                className="btn-onboarding-primary"
              >
                Concluir
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            TELA 8: ANÁLISE DINÂMICA COM IA
            ========================================================= */}
        {currentStep === 8 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              minHeight: '100vh',
              padding: '24px',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'rgba(112, 82, 255, 0.15)',
                border: '2px solid #7052ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '28px',
                boxShadow: '0 0 32px rgba(112, 82, 255, 0.35)'
              }}
            >
              <Sparkles size={40} color="#7052ff" />
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
              Criando seu Treino Sob Medida
            </h2>

            <p style={{ fontSize: '14px', color: '#a1a1aa', maxWidth: '340px', minHeight: '44px' }}>
              {analysisPhrases[analysisPhase]}
            </p>

            <div
              style={{
                width: '100%',
                maxWidth: '320px',
                height: '8px',
                background: '#262a34',
                borderRadius: '9999px',
                overflow: 'hidden',
                margin: '28px 0 14px'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${analysisProgress}%`,
                  background: 'linear-gradient(90deg, #7052ff, #a855f7)',
                  borderRadius: '9999px',
                  transition: 'width 0.1s linear'
                }}
              />
            </div>

            <span style={{ fontSize: '14px', fontWeight: 700, color: '#7052ff' }}>
              {analysisProgress}%
            </span>
          </div>
        )}

        {/* =========================================================
            TELA 9: APRESENTAÇÃO DO PLANO GERADO
            ========================================================= */}
        {currentStep === 9 && generatedPlan && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh', padding: '24px' }}>
            <div style={{ textAlign: 'center', margin: '20px 0 24px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(112, 82, 255, 0.15)',
                  color: '#7052ff',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '12px'
                }}
              >
                <Sparkles size={14} />
                PLANO INTELIGENTE GERADO
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                {generatedPlan.splitName}
              </h2>
              <p style={{ fontSize: '13px', color: '#a1a1aa' }}>
                {generatedPlan.splitDescription}
              </p>
            </div>

            {/* Grid de Métricas do Plano */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '24px'
              }}
            >
              <div
                style={{
                  background: '#1f222a',
                  borderRadius: '16px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <TrendingUp size={22} color="#7052ff" />
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                    {generatedPlan.bmi}
                  </div>
                  <div style={{ fontSize: '11px', color: '#a1a1aa' }}>
                    {generatedPlan.bmiCategory}
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: '#1f222a',
                  borderRadius: '16px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Flame size={22} color="#ff9500" />
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                    ~{generatedPlan.dailyCalories} kcal
                  </div>
                  <div style={{ fontSize: '11px', color: '#a1a1aa' }}>Gasto Estimado</div>
                </div>
              </div>
            </div>

            {/* Dias de Treino Estruturados */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase' }}>
                Sua Divisão Semanal ({generatedPlan.workoutDays.length} treinos):
              </div>

              {generatedPlan.workoutDays.map((day) => (
                <div
                  key={day.key}
                  style={{
                    background: '#1f222a',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '16px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'rgba(112, 82, 255, 0.15)',
                        color: '#7052ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '13px'
                      }}
                    >
                      {day.name.split(' ')[1] || 'T'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>
                        {day.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#a1a1aa' }}>
                        {day.exercises.length} exercícios • {day.estimatedMinutes} min
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} color="#7052ff" />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="btn-onboarding-primary full-width"
            >
              <span>Salvar e Começar a Treinar</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
