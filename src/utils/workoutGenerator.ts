import type { OnboardingAnswers, GeneratedPlanResult } from '../types/onboarding';
import type { WorkoutDay, Exercise, DayKey } from '../types/workout';
import { ALL_EXERCISES_LIBRARY } from '../data/exerciseLibrary';

const DAY_KEYS: DayKey[] = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

export function generatePersonalizedWorkout(answers: OnboardingAnswers): GeneratedPlanResult {
  const heightM = answers.heightCm / 100;
  const bmi = parseFloat((answers.weightKg / (heightM * heightM)).toFixed(1));

  let bmiCategory = 'Peso Normal';
  if (bmi < 18.5) bmiCategory = 'Abaixo do Peso';
  else if (bmi >= 25 && bmi < 30) bmiCategory = 'Sobrepeso Leve';
  else if (bmi >= 30) bmiCategory = 'Obesidade';

  // Taxa Metabólica Basal (Mifflin-St Jeor)
  const baseBMR =
    answers.gender === 'male'
      ? 10 * answers.weightKg + 6.25 * answers.heightCm - 5 * answers.age + 5
      : 10 * answers.weightKg + 6.25 * answers.heightCm - 5 * answers.age - 161;

  let calorieTarget = Math.round(baseBMR * 1.5);
  if (answers.goal === 'gain_muscle') calorieTarget += 350;
  else if (answers.goal === 'lose_weight') calorieTarget -= 450;
  else if (answers.goal === 'get_shredded') calorieTarget -= 300;
  else if (answers.goal === 'strength') calorieTarget += 150;

  const diffKg = Math.abs(answers.weightKg - answers.targetWeightKg);
  const estimatedWeeks = Math.max(4, Math.min(24, Math.round(diffKg / 0.5) || 8));

  // Configuração de repetições e descanso com base no objetivo
  const repRange =
    answers.goal === 'strength'
      ? '5 - 8'
      : answers.goal === 'gain_muscle'
      ? '8 - 12'
      : '12 - 15';

  const restSeconds =
    answers.goal === 'strength'
      ? 120
      : answers.goal === 'gain_muscle'
      ? 90
      : 60;

  // Filtra exercícios por local de treino se for halteres/casa
  const availableExercises = ALL_EXERCISES_LIBRARY.filter((ex) => {
    if (answers.location === 'home_dumbbells') {
      return ex.equipmentType === 'Halteres' || ex.equipmentType === 'Peso Corporal';
    }
    return true;
  });

  const getExercisesByCategories = (categories: string[], count = 5): Exercise[] => {
    const list = availableExercises.filter((ex) => categories.includes(ex.category || ''));
    // Prioriza os que combinam com as targetAreas do usuário
    list.sort((a, b) => {
      const aPriority = answers.targetAreas.includes(a.category || '') ? 1 : 0;
      const bPriority = answers.targetAreas.includes(b.category || '') ? 1 : 0;
      return bPriority - aPriority;
    });

    return list.slice(0, count).map((ex) => ({
      ...ex,
      reps: repRange,
      suggestedRestSeconds: restSeconds
    }));
  };

  // Estruturação do Split com base na frequência
  let splitName = '';
  let splitDescription = '';
  const workoutDays: WorkoutDay[] = [];

  const defaultStretches = [
    {
      id: 'gen-str-1',
      name: 'Alongamento Dinâmico Geral e Mobilidade',
      targetJoint: 'Ombros e Quadril',
      durationSeconds: 40,
      instruction: 'Faça movimentos articulares suaves respirando fundo para preparar a musculatura.',
      focusTip: 'Fluidez e aquecimento pré-treino.',
      iconType: 'shoulders' as const
    }
  ];

  const defaultCardio = answers.goal === 'lose_weight' || answers.goal === 'get_shredded'
    ? {
        type: 'Esteira / Caminhada Inclinada',
        title: 'Cardio Queima Pós-Treino',
        durationMinutes: 20,
        intensity: 'Moderada' as const,
        targetPace: '110-130 BPM',
        instruction: 'Mantenha inclinação de 5% a 8% em velocidade de caminhada rápida.',
        hypertrophyReason: 'Potencializa a oxidação de gorduras preservando a massa muscular construída.'
      }
    : undefined;

  if (answers.frequency <= 3) {
    splitName = 'Full Body 3x (Corpo Inteiro Alta Eficiência)';
    splitDescription = 'Estímulo completo 3 vezes na semana com dias de descanso intercalados, ideal para conciliar com rotina corrida.';

    const trainingDayIndexes = [0, 2, 4]; // Seg, Qua, Sex
    DAY_KEYS.forEach((key, idx) => {
      const isTrain = trainingDayIndexes.includes(idx);
      if (isTrain) {
        const letter = idx === 0 ? 'A' : idx === 2 ? 'B' : 'C';
        workoutDays.push({
          dayNumber: idx + 1,
          key,
          name: `Full Body ${letter} (Corpo Todo)`,
          focus: 'Peitoral, Costas, Pernas & Core',
          tagline: `Estímulo global de hipertrofia com foco em ${answers.targetAreas.slice(0, 2).join(' e ') || 'equilíbrio muscular'}`,
          estimatedMinutes: 55,
          isRestDay: false,
          stretches: defaultStretches,
          exercises: getExercisesByCategories(['Peito', 'Costas', 'Quadríceps', 'Posteriores', 'Ombros', 'Bíceps'], 6),
          cardio: defaultCardio,
          coachTips: [
            'Mantenha alta intensidade em cada série, pois você terá 48h de descanso entre as sessões.',
            'Beba pelo menos 500ml de água durante a sessão.'
          ]
        });
      } else {
        workoutDays.push({
          dayNumber: idx + 1,
          key,
          name: 'Descanso e Recuperação Ativa',
          focus: 'Síntese Proteica e Regeneração do SNC',
          tagline: 'O músculo cresce durante o repouso e hidratação',
          estimatedMinutes: 0,
          isRestDay: true,
          stretches: defaultStretches,
          exercises: [],
          coachTips: ['Dia de recarregar as energias, bater a meta de proteínas e dormir 8 horas.']
        });
      }
    });
  } else if (answers.frequency === 4) {
    splitName = 'Upper / Lower 4x (Superior & Inferior Estratégico)';
    splitDescription = 'A divisão de ouro para hipertrofia: 2 treinos para tronco e 2 treinos para pernas completas.';

    const dayConfigs: Record<number, { isTrain: boolean; name: string; focus: string; cats: string[] }> = {
      0: { isTrain: true, name: 'Superior A (Peito, Costas & Braços)', focus: 'Tronco Completo', cats: ['Peito', 'Costas', 'Ombros', 'Bíceps', 'Tríceps'] },
      1: { isTrain: true, name: 'Inferior A (Quadríceps & Glúteos)', focus: 'Pernas & Panturrilhas', cats: ['Quadríceps', 'Glúteos', 'Panturrilhas', 'Abdômen'] },
      2: { isTrain: false, name: 'Descanso Ativo', focus: 'Recuperação', cats: [] },
      3: { isTrain: true, name: 'Superior B (Força & Espessura)', focus: 'Costas, Ombros & Peito', cats: ['Costas', 'Peito', 'Ombros', 'Tríceps', 'Bíceps'] },
      4: { isTrain: true, name: 'Inferior B (Posteriores & Panturrilha)', focus: 'Cadeia Posterior e Core', cats: ['Posteriores', 'Glúteos', 'Panturrilhas', 'Abdômen'] },
      5: { isTrain: false, name: 'Descanso', focus: 'Regeneração', cats: [] },
      6: { isTrain: false, name: 'Descanso', focus: 'Regeneração', cats: [] }
    };

    DAY_KEYS.forEach((key, idx) => {
      const cfg = dayConfigs[idx];
      if (cfg.isTrain) {
        workoutDays.push({
          dayNumber: idx + 1,
          key,
          name: cfg.name,
          focus: cfg.focus,
          tagline: `Foco em máxima densidade muscular e progressão contínua de cargas`,
          estimatedMinutes: 60,
          isRestDay: false,
          stretches: defaultStretches,
          exercises: getExercisesByCategories(cfg.cats, 6),
          cardio: defaultCardio,
          coachTips: ['Controle a velocidade da descida e priorize a postura antes do peso.']
        });
      } else {
        workoutDays.push({
          dayNumber: idx + 1,
          key,
          name: 'Descanso e Recuperação',
          focus: 'Recuperação Muscular',
          tagline: 'Recuperação do sistema neuromuscular para o próximo treino',
          estimatedMinutes: 0,
          isRestDay: true,
          stretches: defaultStretches,
          exercises: [],
          coachTips: ['Mantenha a ingestão hídrica alta e faça refeições ricas em micronutrientes.']
        });
      }
    });
  } else {
    // 5 ou 6 dias: Push / Pull / Legs Moderno
    splitName = answers.frequency === 5 ? 'Push / Pull / Legs + Upper / Lower (5x)' : 'Push / Pull / Legs 2x (6x Alta Performance)';
    splitDescription = 'Estrutura profissional dividindo músculos agonistas e antagonistas para máximo volume e definição muscular.';

    const dayConfigs: Record<number, { isTrain: boolean; name: string; focus: string; cats: string[] }> = {
      0: { isTrain: true, name: 'Push A (Peito, Ombros e Tríceps)', focus: 'Músculos de Empurrar', cats: ['Peito', 'Ombros', 'Tríceps'] },
      1: { isTrain: true, name: 'Pull A (Costas, Trapézio e Bíceps)', focus: 'Músculos de Puxar', cats: ['Costas', 'Ombros', 'Bíceps'] },
      2: { isTrain: true, name: 'Legs A (Quadríceps, Panturrilhas e Core)', focus: 'Pernas Foco Quadríceps', cats: ['Quadríceps', 'Glúteos', 'Panturrilhas', 'Abdômen'] },
      3: { isTrain: answers.frequency === 6, name: answers.frequency === 6 ? 'Push B (Peito & Ombros Foco Hipertrofia)' : 'Descanso Ativo', focus: 'Recuperação', cats: ['Peito', 'Ombros', 'Tríceps'] },
      4: { isTrain: true, name: answers.frequency === 5 ? 'Superior Completo (Upper)' : 'Pull B (Costas & Bíceps Foco Espessura)', focus: 'Tronco Superior', cats: ['Costas', 'Peito', 'Ombros', 'Bíceps'] },
      5: { isTrain: true, name: answers.frequency === 5 ? 'Inferior Completo (Lower)' : 'Legs B (Posteriores e Glúteos)', focus: 'Cadeia Posterior', cats: ['Posteriores', 'Glúteos', 'Panturrilhas'] },
      6: { isTrain: false, name: 'Descanso Total', focus: 'Regeneração', cats: [] }
    };

    DAY_KEYS.forEach((key, idx) => {
      const cfg = dayConfigs[idx];
      if (cfg.isTrain) {
        workoutDays.push({
          dayNumber: idx + 1,
          key,
          name: cfg.name,
          focus: cfg.focus,
          tagline: `Desenvolvimento acelerado com ênfase nas suas áreas prioritárias`,
          estimatedMinutes: 60,
          isRestDay: false,
          stretches: defaultStretches,
          exercises: getExercisesByCategories(cfg.cats, 6),
          cardio: defaultCardio,
          coachTips: ['Atingir RPE 8-9 nas últimas séries de cada exercício.']
        });
      } else {
        workoutDays.push({
          dayNumber: idx + 1,
          key,
          name: 'Descanso Total',
          focus: 'Regeneração Celular',
          tagline: 'Dia livre para relaxamento e regeneração',
          estimatedMinutes: 0,
          isRestDay: true,
          stretches: defaultStretches,
          exercises: [],
          coachTips: ['Priorize sono de qualidade e alongamentos leves se desejar.']
        });
      }
    });
  }

  return {
    bmi,
    bmiCategory,
    dailyCalories: calorieTarget,
    estimatedWeeks,
    splitName,
    splitDescription,
    workoutDays
  };
}
