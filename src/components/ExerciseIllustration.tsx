import React, { useState } from 'react';
import { Play, Activity } from 'lucide-react';
import { ID_TO_IMAGE_MAP } from '../utils/exerciseMedia';

interface ExerciseIllustrationProps {
  id?: string;
  type?: string;
  name?: string;
  targetMuscles: string[];
  secondaryMuscles?: string[];
}

const TYPE_TO_FALLBACK_ID: Record<string, string> = {
  'incline-bench': 'p1-incline-db',
  'peck-deck': 'p1-peck-deck',
  'chest-press': 'p1-chest-press',
  'lateral-raise': 'p1-lateral-raise',
  'triceps-pushdown': 'p1-triceps-pushdown',
  'triceps-extension': 'p1-triceps-extension',
  'lat-pulldown': 'p2-lat-pulldown',
  'seated-cable-row': 'p2-seated-cable-row',
  'reverse-fly': 'p2-reverse-fly',
  'leg-extension': 'p3-leg-extension',
  'leg-press': 'p3-leg-press',
  'bulgarian-split': 'p3-bulgarian-split',
  'calf-raise': 'p3-calf-raise',
  'abs-cable': 'p3-abs-crunch',
  'seated-overhead-press': 'p4-shoulder-press',
  'cable-crossover': 'p4-cable-crossover',
  'bent-over-row': 'p5-bent-over-row',
  'shrug': 'p5-shrugs',
  'preacher-curl': 'p5-preacher-curl',
  'incline-curl': 'p5-incline-curl',
  'lying-leg-curl': 'p6-lying-leg-curl',
  'seated-leg-curl': 'p6-seated-leg-curl',
  'romanian-deadlift': 'p6-romanian-deadlift',
  'hip-thrust': 'p6-hip-thrust',
  'bench-press': 'ex-bench-press-barbell',
  'dips': 'ex-dips-chest',
  'pushup': 'ex-pushup',
  'pullup': 'ex-pullup',
  'squat': 'ex-squat-barbell',
  'deadlift': 'ex-deadlift-conventional',
  'hack-squat': 'ex-hack-squat',
  'arnold-press': 'ex-arnold-press',
  'face-pull': 'ex-face-pull',
  'abductor': 'ex-abductor-machine',
  'adductor': 'ex-adductor-machine',
  'plank': 'ex-plank',
  'hanging-leg-raise': 'ex-hanging-leg-raise',
  'cable-crunch': 'ex-cable-crunch'
};

export const ExerciseIllustration: React.FC<ExerciseIllustrationProps> = ({
  id,
  type,
  name,
  targetMuscles,
  secondaryMuscles = []
}) => {
  const [viewMode, setViewMode] = useState<'animated' | 'anatomy'>('animated');

  // Determina o ID correto do exercício ou fallback
  const resolvedId = (id && ID_TO_IMAGE_MAP[id])
    ? id
    : (type && TYPE_TO_FALLBACK_ID[type])
      ? TYPE_TO_FALLBACK_ID[type]
      : 'p1-incline-db';

  const asset = ID_TO_IMAGE_MAP[resolvedId] || ID_TO_IMAGE_MAP['p1-incline-db'];
  const mediaUrl = viewMode === 'animated' ? asset.gif : asset.jpg;

  return (
    <div className="exercise-visual-container">
      {/* Abas para alternar entre GIF animado e Modelo Anatômico estático */}
      <div className="visual-mode-tabs">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setViewMode('animated');
          }}
          className={`visual-tab-btn ${viewMode === 'animated' ? 'active' : ''}`}
        >
          <Play size={12} fill={viewMode === 'animated' ? 'currentColor' : 'none'} />
          <span>Execução</span>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setViewMode('anatomy');
          }}
          className={`visual-tab-btn ${viewMode === 'anatomy' ? 'active' : ''}`}
        >
          <Activity size={13} />
          <span>Anatomia 3D</span>
        </button>
      </div>

      {/* Canvas da Ilustração */}
      <div className="exercise-visual-canvas">
        <div className="real-exercise-photo-wrapper">
          <img
            key={mediaUrl}
            src={mediaUrl}
            alt={`Demonstração de ${name || 'Exercício'}`}
            className="real-exercise-img"
            loading="eager"
          />

          {/* Badge superior com status da demonstração */}
          <div className="real-photo-badge">
            <span className="live-real-dot" />
            <span>{viewMode === 'animated' ? 'Em Loop' : 'Músculos'}</span>
          </div>
        </div>
      </div>

      {/* Rodapé com Músculos Alvo e Secundários */}
      <div className="exercise-visual-footer">
        <div className="muscle-tags">
          <div className="muscle-tags-left">
            {targetMuscles.map((muscle, idx) => (
              <span key={idx} className="muscle-pill active" title="Principal">
                {muscle}
              </span>
            ))}
            {secondaryMuscles.map((muscle, idx) => (
              <span key={`sec-${idx}`} className="muscle-pill secondary" title="Secundário">
                {muscle}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
