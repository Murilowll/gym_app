import React from 'react';
import type { DayKey, WorkoutDay } from '../types/workout';
import { WORKOUT_DAYS } from '../data/workoutsData';
import { CheckCircle2, Moon, Zap, Flame } from 'lucide-react';

interface DaySelectorProps {
  selectedDayKey: DayKey;
  todayKey: DayKey;
  onSelectDay: (key: DayKey) => void;
  completedDays: string[];
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDayKey,
  todayKey,
  onSelectDay,
  completedDays
}) => {
  const shortNames: Record<DayKey, string> = {
    segunda: 'SEG',
    terca: 'TER',
    quarta: 'QUA',
    quinta: 'QUI',
    sexta: 'SEX',
    sabado: 'SÁB',
    domingo: 'DOM'
  };

  const getSubTag = (day: WorkoutDay) => {
    if (day.isRestDay) return 'Descanso';
    if (day.name.includes('Push A')) return 'Push A';
    if (day.name.includes('Pull A')) return 'Pull A';
    if (day.name.includes('Legs A')) return 'Legs A';
    if (day.name.includes('Push B')) return 'Push B';
    if (day.name.includes('Pull B')) return 'Pull B';
    if (day.name.includes('Legs B')) return 'Legs B';
    return 'Treino';
  };

  return (
    <div className="day-selector-wrapper">
      <div className="day-selector-scroll">
        {WORKOUT_DAYS.map((day) => {
          const isSelected = day.key === selectedDayKey;
          const isToday = day.key === todayKey;
          const isCompleted = completedDays.includes(day.key);

          return (
            <button
              key={day.key}
              onClick={() => onSelectDay(day.key)}
              className={`day-chip ${isSelected ? 'selected' : ''} ${isToday ? 'is-today' : ''} ${day.isRestDay ? 'is-rest' : ''}`}
            >
              <div className="day-chip-top">
                {isCompleted ? (
                  <CheckCircle2 size={13} className="completed-icon" />
                ) : isToday ? (
                  <Flame size={13} className="today-icon" />
                ) : day.isRestDay ? (
                  <Moon size={12} className="moon-icon" />
                ) : (
                  <Zap size={11} className="gym-zap" />
                )}
              </div>

              <span className="day-short-name">{shortNames[day.key]}</span>
              <span className="day-subtag">{getSubTag(day)}</span>

              {isSelected && <div className="active-indicator-dot" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
