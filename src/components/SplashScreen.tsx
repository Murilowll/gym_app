import React, { useEffect, useState } from 'react';
import { AppLogo } from './AppLogo';

interface SplashScreenProps {
  onFinish?: () => void;
  minDurationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  minDurationMs = 1800
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animação de progresso suave
    const start = performance.now();
    const interval = setInterval(() => {
      const elapsed = performance.now() - start;
      const current = Math.min(100, Math.round((elapsed / minDurationMs) * 100));
      setProgress(current);

      if (elapsed >= minDurationMs) {
        clearInterval(interval);
        setIsFadingOut(true);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 450); // tempo para o fade-out concluir suavemente
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDurationMs, onFinish]);

  return (
    <div className={`splash-screen-container ${isFadingOut ? 'splash-fade-out' : ''}`}>
      {/* Luz ambiente volumétrica de fundo */}
      <div className="splash-ambient-glow" />

      {/* Núcleo da Marca */}
      <div className="splash-brand-core">
        <div className="splash-logo-wrapper">
          <div className="splash-logo-ring" />
          <div className="splash-logo-shimmer" />
          <AppLogo size={76} color="#ffffff" className="splash-logo-svg" />
        </div>

        <div className="splash-typography">
          <h1 className="splash-brand-title">IRONPULSE</h1>
          <div className="splash-brand-divider">
            <span className="splash-divider-line" />
            <span className="splash-brand-tag">ACADEMY & PERFORMANCE</span>
            <span className="splash-divider-line" />
          </div>
        </div>
      </div>

      {/* Barra de Carregamento Minimalista */}
      <div className="splash-bottom-indicator">
        <div className="splash-progress-track">
          <div
            className="splash-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="splash-status-text">
          {progress < 40 ? 'Inicializando rotinas...' : progress < 80 ? 'Carregando treinos...' : 'Pronto para treinar'}
        </span>
      </div>
    </div>
  );
};

export default SplashScreen;
