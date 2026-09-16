import React from 'react';
import type { CompletedWorkoutRecord, UserStats } from '../types/workout';
import { Trophy, Calendar, Dumbbell, Flame, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface HistoryViewProps {
  history: CompletedWorkoutRecord[];
  stats: UserStats;
  onClose: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, stats, onClose }) => {
  const formatWorkoutDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="history-view-container">
      <div className="history-header">
        <div>
          <h2 className="history-title">Progresso</h2>
          <p className="history-subtitle">Histórico e evolução de cargas</p>
        </div>
        <button onClick={onClose} className="history-back-btn">
          Voltar
        </button>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="history-stats-grid">
        <div className="history-stat-card">
          <div className="stat-icon-wrap flame">
            <Flame size={20} />
          </div>
          <div className="stat-data">
            <span className="stat-number">{stats.streakDays}</span>
            <span className="stat-label">Dias Ofensiva</span>
          </div>
        </div>

        <div className="history-stat-card">
          <div className="stat-icon-wrap trophy">
            <Trophy size={20} />
          </div>
          <div className="stat-data">
            <span className="stat-number">{stats.totalWorkouts}</span>
            <span className="stat-label">Treinos</span>
          </div>
        </div>

        <div className="history-stat-card">
          <div className="stat-icon-wrap dumb">
            <Dumbbell size={20} />
          </div>
          <div className="stat-data">
            <span className="stat-number">
              {Object.keys(stats.weightHistory).length}
            </span>
            <span className="stat-label">Exercícios</span>
          </div>
        </div>
      </div>

      {/* Registros Recentes */}
      <div className="history-records-section">
        <h3 className="section-title-clean">
          <Calendar size={16} />
          Treinos Recentes
        </h3>

        {history.length === 0 ? (
          <div className="empty-history-box">
            <Dumbbell size={28} className="empty-icon" />
            <h4>Nenhum treino ainda</h4>
            <p>Conclua seu primeiro treino para acompanhar sua evolução aqui.</p>
          </div>
        ) : (
          <div className="history-list">
            {history.map((record) => (
              <div key={record.id} className="history-item-row">
                <div className="history-item-left">
                  <div className="check-success-badge">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="record-day-name">{record.dayName}</h4>
                    <span className="record-date">{formatWorkoutDate(record.date)}</span>
                  </div>
                </div>

                <div className="history-item-right">
                  <div className="record-chip">
                    <span>{record.completedSetsCount} séries</span>
                  </div>
                  {record.totalVolumeKg > 0 && (
                    <div className="record-chip highlight">
                      <span>{record.totalVolumeKg.toLocaleString('pt-BR')} kg</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recordes de Carga Recentes */}
      {Object.keys(stats.weightHistory).length > 0 && (
        <div className="prs-section">
          <h3 className="section-title-clean">
            <TrendingUp size={16} />
            Recordes de Carga
          </h3>
          <div className="prs-grid">
            {Object.entries(stats.weightHistory).map(([exId, records]) => {
              const latest = records[records.length - 1];
              return (
                <div key={exId} className="pr-badge-card">
                  <div className="pr-top">
                    <span className="pr-ex-name">{exId.replace('p1-', '').replace('p2-', '').replace('p3-', '').replace('p4-', '').replace('p5-', '').replace('p6-', '').replace(/-/g, ' ')}</span>
                    <Sparkles size={13} className="pr-sparkle" />
                  </div>
                  <div className="pr-weight-val">
                    <strong>{latest.maxWeightKg}</strong> kg
                  </div>
                  <span className="pr-date">Último: {formatWorkoutDate(latest.date)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
