export type DayKey = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

export interface ExerciseAlternative {
  name: string;
  equipment: string;
  reason: string;
}

export interface Exercise {
  id: string;
  name: string;
  machineName: string;
  targetMuscles: string[];
  secondaryMuscles: string[];
  sets: number;
  reps: string; // Ex: "8-10" ou "10-12"
  suggestedRestSeconds: number;
  machineAdjustment: string[];
  executionTips: string[];
  commonMistakes: string[];
  visualType: 'chest-press' | 'incline-bench' | 'peck-deck' | 'lat-pulldown' | 'seated-cable-row' | 'reverse-fly' | 'lateral-raise' | 'triceps-pushdown' | 'triceps-extension' | 'leg-extension' | 'leg-press' | 'bulgarian-split' | 'calf-raise' | 'seated-overhead-press' | 'bent-over-row' | 'shrug' | 'preacher-curl' | 'incline-curl' | 'lying-leg-curl' | 'seated-leg-curl' | 'romanian-deadlift' | 'hip-thrust' | 'abs-cable' | 'cable-crossover';
  alternatives: ExerciseAlternative[];
}

export interface Stretch {
  id: string;
  name: string;
  targetJoint: string;
  durationSeconds: number;
  instruction: string;
  focusTip: string;
  iconType: 'shoulders' | 'chest' | 'back' | 'hips' | 'ankles' | 'hamstrings' | 'neck';
}

export interface Cardio {
  type: string;
  title: string;
  durationMinutes: number;
  intensity: 'Leve' | 'Moderada' | 'Leve a Moderada';
  targetPace: string;
  instruction: string;
  hypertrophyReason: string;
}

export interface WorkoutDay {
  dayNumber: number; // 1 = Segunda, ..., 7 = Domingo
  key: DayKey;
  name: string;
  focus: string;
  tagline: string;
  estimatedMinutes: number;
  isRestDay?: boolean;
  stretches: Stretch[];
  exercises: Exercise[];
  cardio?: Cardio;
  coachTips: string[];
}

export interface SetLog {
  setIndex: number;
  weightKg: number;
  repsDone: number;
  completed: boolean;
}

export interface WorkoutProgress {
  [exerciseId: string]: SetLog[];
}

export interface CompletedWorkoutRecord {
  id: string;
  date: string; // YYYY-MM-DD
  dayKey: DayKey;
  dayName: string;
  durationMinutes: number;
  completedSetsCount: number;
  totalVolumeKg: number;
  exercisesCompleted: string[];
  cardioCompleted: boolean;
  stretchesCompleted: boolean;
}

export interface UserStats {
  streakDays: number;
  totalWorkouts: number;
  lastWorkoutDate: string | null;
  weightHistory: { [exerciseId: string]: { date: string; maxWeightKg: number }[] };
}
