import type { WorkoutDay } from './workout';

export type FitnessGoal = 'gain_muscle' | 'lose_weight' | 'get_shredded' | 'strength';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type TrainingLocation = 'gym' | 'home_dumbbells';

export interface OnboardingAnswers {
  gender: 'male' | 'female';
  goal: FitnessGoal;
  selectedGoals?: string[];
  targetAreas: string[]; // e.g. ['Peito', 'Braços', 'Abdômen', 'Pernas', 'Costas']
  experience: ExperienceLevel;
  frequency: number; // 3, 4, 5, 6 days
  location: TrainingLocation;
  age: number;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  fullName?: string;
  nickname?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface GeneratedPlanResult {
  bmi: number;
  bmiCategory: string;
  dailyCalories: number;
  estimatedWeeks: number;
  splitName: string;
  splitDescription: string;
  workoutDays: WorkoutDay[];
}
