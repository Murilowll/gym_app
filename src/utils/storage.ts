import type { DayKey, UserStats, CompletedWorkoutRecord, SetLog } from '../types/workout';

const STORAGE_KEYS = {
  STATS: 'ironpulse_user_stats_v1',
  HISTORY: 'ironpulse_history_v1',
  ACTIVE_SETS: 'ironpulse_active_sets_v1',
  LAST_SELECTED_DAY: 'ironpulse_selected_day_v1'
};

export function getTodayKey(): DayKey {
  const day = new Date().getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  switch (day) {
    case 1: return 'segunda';
    case 2: return 'terca';
    case 3: return 'quarta';
    case 4: return 'quinta';
    case 5: return 'sexta';
    case 6: return 'sabado';
    case 0:
    default:
      return 'domingo';
  }
}

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignora erro de parse
  }
  return {
    streakDays: 3, // Inicia motivador
    totalWorkouts: 12,
    lastWorkoutDate: null,
    weightHistory: {}
  };
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch {
    // Ignora
  }
}

export function loadWorkoutHistory(): CompletedWorkoutRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignora
  }
  return [];
}

export function saveCompletedWorkout(record: CompletedWorkoutRecord): void {
  try {
    const history = loadWorkoutHistory();
    history.unshift(record);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));

    // Atualiza estatísticas do usuário
    const stats = loadUserStats();
    stats.totalWorkouts += 1;
    stats.lastWorkoutDate = record.date;
    stats.streakDays += 1;
    saveUserStats(stats);
  } catch {
    // Ignora
  }
}

export function loadActiveSets(): { [exerciseId: string]: SetLog[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_SETS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignora
  }
  return {};
}

export function saveActiveSets(activeSets: { [exerciseId: string]: SetLog[] }): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SETS, JSON.stringify(activeSets));
  } catch {
    // Ignora
  }
}

export function recordExerciseWeight(exerciseId: string, maxWeightKg: number): void {
  const stats = loadUserStats();
  const today = new Date().toISOString().split('T')[0];

  if (!stats.weightHistory[exerciseId]) {
    stats.weightHistory[exerciseId] = [];
  }

  const existingToday = stats.weightHistory[exerciseId].find(h => h.date === today);
  if (existingToday) {
    if (maxWeightKg > existingToday.maxWeightKg) {
      existingToday.maxWeightKg = maxWeightKg;
    }
  } else {
    stats.weightHistory[exerciseId].push({ date: today, maxWeightKg });
  }

  saveUserStats(stats);
}
