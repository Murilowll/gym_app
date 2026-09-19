import React, { useState } from 'react';
import {
  X,
  Search,
  Dumbbell,
  ChevronRight
} from 'lucide-react';
import type { Exercise, MuscleCategory } from '../types/workout';
import { ALL_EXERCISES_LIBRARY, MUSCLE_CATEGORIES } from '../data/exerciseLibrary';
import { ExerciseIllustration } from './ExerciseIllustration';

const EQUIPMENT_TYPES = ['Todos', 'Halteres', 'Barra', 'Máquina', 'Cabo/Polia', 'Peso Corporal'];

interface ExerciseCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExerciseCatalogModal: React.FC<ExerciseCatalogModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MuscleCategory | 'Todos'>('Todos');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('Todos');
  const [previewExercise, setPreviewExercise] = useState<Exercise | null>(null);

  if (!isOpen) return null;

  const filteredExercises = ALL_EXERCISES_LIBRARY.filter((ex) => {
    const matchCategory = selectedCategory === 'Todos' || ex.category === selectedCategory;
    const matchEquipment = selectedEquipment === 'Todos' || ex.equipmentType === selectedEquipment;
    const query = searchTerm.toLowerCase();
    const matchSearch =
      !query ||
      ex.name.toLowerCase().includes(query) ||
      ex.machineName.toLowerCase().includes(query) ||
      ex.targetMuscles.some((m) => m.toLowerCase().includes(query));

    return matchCategory && matchEquipment && matchSearch;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="catalog-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(150deg, #141418, #0c0c0f)',
          borderRadius: '26px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          width: '95%',
          maxWidth: '850px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          color: '#ffffff',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Topo do Modal */}
        <div
          style={{
            padding: '20px 24px 16px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Dumbbell size={18} color="#ffffff" />
              </div>
              <h2 style={{ margin: 0, fontSize: '1.28rem', fontWeight: 700 }}>
                Catálogo de Exercícios
              </h2>
              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#ffffff'
                }}
              >
                {ALL_EXERCISES_LIBRARY.length} disponíveis
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: '#8e8e93' }}>
              Prontos em stand by para montagem e consulta de execução com animação
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#a1a1aa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Barra de Busca e Filtros */}
        <div style={{ padding: '16px 24px 10px 24px' }}>
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <Search
              size={17}
              color="#71717a"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar exercício por nome, músculo ou máquina..."
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '11px 14px 11px 40px',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Filtro de Músculos (Carrossel Horizontal) */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '6px',
              scrollbarWidth: 'none'
            }}
          >
            <button
              onClick={() => setSelectedCategory('Todos')}
              style={{
                padding: '6px 12px',
                borderRadius: '10px',
                border: selectedCategory === 'Todos' ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.08)',
                background: selectedCategory === 'Todos' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                color: selectedCategory === 'Todos' ? '#ffffff' : '#a1a1aa',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Todos ({ALL_EXERCISES_LIBRARY.length})
            </button>
            {MUSCLE_CATEGORIES.map((cat) => {
              const count = ALL_EXERCISES_LIBRARY.filter((e) => e.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '10px',
                    border: selectedCategory === cat ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: selectedCategory === cat ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    color: selectedCategory === cat ? '#ffffff' : '#a1a1aa',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Filtro de Equipamento */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              paddingTop: '6px',
              paddingBottom: '2px',
              scrollbarWidth: 'none'
            }}
          >
            {EQUIPMENT_TYPES.map((eq) => (
              <button
                key={eq}
                onClick={() => setSelectedEquipment(eq)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '8px',
                  border: selectedEquipment === eq ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.06)',
                  background: selectedEquipment === eq ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                  color: selectedEquipment === eq ? '#ffffff' : '#71717a',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {eq}
              </button>
            ))}
          </div>
        </div>

        {/* Área de Listagem dos Exercícios */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '10px 24px 24px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '12px'
          }}
        >
          {filteredExercises.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#8e8e93' }}>
              Nenhum exercício encontrado com esse filtro.
            </div>
          ) : (
            filteredExercises.map((ex) => (
              <div
                key={ex.id}
                onClick={() => setPreviewExercise(ex)}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.18s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(48, 209, 88, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#64d2ff',
                        background: 'rgba(100, 210, 255, 0.12)',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {ex.category || 'Treino'}
                    </span>
                    {ex.equipmentType && (
                      <span style={{ fontSize: '0.72rem', color: '#8e8e93' }}>
                        {ex.equipmentType}
                      </span>
                    )}
                  </div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '0.94rem', fontWeight: 600, lineHeight: '1.3' }}>
                    {ex.name}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#8e8e93' }}>
                    {ex.machineName}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: '#ffffff'
                  }}
                >
                  <span>Ver execução & GIF</span>
                  <ChevronRight size={15} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Sobreposto de Pré-visualização do Exercício Selecionado */}
        {previewExercise && (
          <div
            className="modal-backdrop"
            style={{ zIndex: 1100 }}
            onClick={() => setPreviewExercise(null)}
          >
            <div
              className="preview-detail-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#131317',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '24px',
                padding: '24px',
                width: '90%',
                maxWidth: '480px',
                maxHeight: '85vh',
                overflowY: 'auto',
                color: '#ffffff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#a1a1aa', fontWeight: 700 }}>
                    {previewExercise.category} • {previewExercise.equipmentType}
                  </span>
                  <h3 style={{ margin: '2px 0 0 0', fontSize: '1.25rem' }}>{previewExercise.name}</h3>
                </div>
                <button
                  onClick={() => setPreviewExercise(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    color: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Animação / Ilustração */}
              <div style={{ marginBottom: '16px', borderRadius: '16px', overflow: 'hidden' }}>
                <ExerciseIllustration
                  id={previewExercise.id}
                  type={previewExercise.visualType}
                  targetMuscles={previewExercise.targetMuscles}
                  secondaryMuscles={previewExercise.secondaryMuscles}
                />
              </div>

              {/* Músculos Alvo */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.75rem', color: '#8e8e93', marginBottom: '6px' }}>Músculos Alvo</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {previewExercise.targetMuscles.map((m, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem'
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dicas de Execução */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.78rem', color: '#a1a1aa', fontWeight: 600, marginBottom: '6px' }}>
                  Dicas de Biomecânica:
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: '#d4d4d8', lineHeight: '1.5' }}>
                  {previewExercise.executionTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Botão de Fechar Prévia */}
              <button
                onClick={() => setPreviewExercise(null)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
