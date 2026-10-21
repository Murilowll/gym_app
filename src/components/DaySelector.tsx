import React from 'react';
import type { DayKey } from '../types/workout';
import { WORKOUT_DAYS } from '../data/workoutsData';
import { Check, Flame } from 'lucide-react';

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

  return (
    <nav className="clean-day-selector" aria-label="Dias da Semana">
      <div className="clean-day-scroll">
        {WORKOUT_DAYS.map((day) => {
          const isSelected = day.key === selectedDayKey;
          const isToday = day.key === todayKey;
          const isCompleted = completedDays.includes(day.key);

          return (
            <button
              key={day.key}
              onClick={() => onSelectDay(day.key)}
              className={`clean-day-pill ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${day.isRestDay ? 'rest' : ''}`}
              aria-selected={isSelected}
              title={`${day.name}${isToday ? ' (Hoje)' : ''}`}
            >
              <span className="clean-day-label">{shortNames[day.key]}</span>
              
              <div className="clean-day-indicator">
                {isCompleted ? (
                  <Check size={11} className="clean-check-icon" strokeWidth={3} />
                ) : isToday ? (
                  <Flame size={11} className="clean-today-icon" />
                ) : (
                  <span className={`clean-dot ${isSelected ? 'active-dot' : ''}`} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
