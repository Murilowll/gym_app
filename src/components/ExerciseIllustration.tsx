import React, { useState } from 'react';
import { Play, Activity } from 'lucide-react';

interface ExerciseIllustrationProps {
  id?: string;
  type?: string;
  name?: string;
  targetMuscles: string[];
  secondaryMuscles?: string[];
}

const ID_TO_IMAGE_MAP: Record<string, { gif: string; jpg: string }> = {
  'p1-incline-db': { gif: '/exercises/p1-incline-db.gif', jpg: '/exercises/p1-incline-db.jpg' },
  'p1-peck-deck': { gif: '/exercises/p1-peck-deck.gif', jpg: '/exercises/p1-peck-deck.jpg' },
  'p1-chest-press': { gif: '/exercises/p1-chest-press.gif', jpg: '/exercises/p1-chest-press.jpg' },
  'p1-lateral-raise': { gif: '/exercises/p1-lateral-raise.gif', jpg: '/exercises/p1-lateral-raise.jpg' },
  'p1-triceps-pushdown': { gif: '/exercises/p1-triceps-pushdown.gif', jpg: '/exercises/p1-triceps-pushdown.jpg' },
  'p1-triceps-extension': { gif: '/exercises/p1-triceps-extension.gif', jpg: '/exercises/p1-triceps-extension.jpg' },
  'p2-lat-pulldown': { gif: '/exercises/p2-lat-pulldown.gif', jpg: '/exercises/p2-lat-pulldown.jpg' },
  'p2-seated-cable-row': { gif: '/exercises/p2-seated-cable-row.gif', jpg: '/exercises/p2-seated-cable-row.jpg' },
  'p2-reverse-fly': { gif: '/exercises/p2-reverse-fly.gif', jpg: '/exercises/p2-reverse-fly.jpg' },
  'p2-cable-biceps-curl': { gif: '/exercises/p2-cable-biceps-curl.gif', jpg: '/exercises/p2-cable-biceps-curl.jpg' },
  'p2-hammer-curl': { gif: '/exercises/p2-hammer-curl.gif', jpg: '/exercises/p2-hammer-curl.jpg' },
  'p3-leg-extension': { gif: '/exercises/p3-leg-extension.gif', jpg: '/exercises/p3-leg-extension.jpg' },
  'p3-leg-press': { gif: '/exercises/p3-leg-press.gif', jpg: '/exercises/p3-leg-press.jpg' },
  'p3-bulgarian-split': { gif: '/exercises/p3-bulgarian-split.gif', jpg: '/exercises/p3-bulgarian-split.jpg' },
  'p3-calf-raise': { gif: '/exercises/p3-calf-raise.gif', jpg: '/exercises/p3-calf-raise.jpg' },
  'p3-abs-crunch': { gif: '/exercises/p3-abs-crunch.gif', jpg: '/exercises/p3-abs-crunch.jpg' },
  'p4-shoulder-press': { gif: '/exercises/p4-shoulder-press.gif', jpg: '/exercises/p4-shoulder-press.jpg' },
  'p4-cable-lateral-raise': { gif: '/exercises/p4-cable-lateral-raise.gif', jpg: '/exercises/p4-cable-lateral-raise.jpg' },
  'p4-incline-press-machine': { gif: '/exercises/p4-incline-press-machine.gif', jpg: '/exercises/p4-incline-press-machine.jpg' },
  'p4-cable-crossover': { gif: '/exercises/p4-cable-crossover.gif', jpg: '/exercises/p4-cable-crossover.jpg' },
  'p4-skull-crusher': { gif: '/exercises/p4-skull-crusher.gif', jpg: '/exercises/p4-skull-crusher.jpg' },
  'p5-bent-over-row': { gif: '/exercises/p5-bent-over-row.gif', jpg: '/exercises/p5-bent-over-row.jpg' },
  'p5-close-grip-pulldown': { gif: '/exercises/p5-close-grip-pulldown.gif', jpg: '/exercises/p5-close-grip-pulldown.jpg' },
  'p5-shrugs': { gif: '/exercises/p5-shrugs.gif', jpg: '/exercises/p5-shrugs.jpg' },
  'p5-preacher-curl': { gif: '/exercises/p5-preacher-curl.gif', jpg: '/exercises/p5-preacher-curl.jpg' },
  'p5-incline-curl': { gif: '/exercises/p5-incline-curl.gif', jpg: '/exercises/p5-incline-curl.jpg' },
  'p6-lying-leg-curl': { gif: '/exercises/p6-lying-leg-curl.gif', jpg: '/exercises/p6-lying-leg-curl.jpg' },
  'p6-seated-leg-curl': { gif: '/exercises/p6-seated-leg-curl.gif', jpg: '/exercises/p6-seated-leg-curl.jpg' },
  'p6-romanian-deadlift': { gif: '/exercises/p6-romanian-deadlift.gif', jpg: '/exercises/p6-romanian-deadlift.jpg' },
  'p6-hip-thrust': { gif: '/exercises/p6-hip-thrust.gif', jpg: '/exercises/p6-hip-thrust.jpg' },
  'p6-seated-calf': { gif: '/exercises/p6-seated-calf.gif', jpg: '/exercises/p6-seated-calf.jpg' },
};

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
  'hip-thrust': 'p6-hip-thrust'
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
                🎯 {muscle}
              </span>
            ))}
            {secondaryMuscles.map((muscle, idx) => (
              <span key={`sec-${idx}`} className="muscle-pill secondary" title="Secundário">
                ⚡ {muscle}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
