import React, { useEffect, useState } from 'react';
import { Users, Dumbbell, Flame, Trophy, ChevronRight, Search, ShieldCheck, ArrowLeft } from 'lucide-react';
import { getTrainerStudents, type StudentSummary } from '../services/firestoreService';
import { useAuth } from '../contexts/AuthContext';

interface TrainerViewProps {
  onBackToWorkouts: () => void;
}

export const TrainerView: React.FC<TrainerViewProps> = ({ onBackToWorkouts }) => {
  const { user } = useAuth();
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentSummary | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      const data = await getTrainerStudents(user?.uid);
      setStudents(data);
      setLoading(false);
    };

    fetchStudents();
  }, [user]);

  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.profile.displayName.toLowerCase().includes(term) ||
      s.profile.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="trainer-view" style={{ padding: '16px', maxWidth: '900px', margin: '0 auto', color: '#ffffff' }}>
      {/* Topo do Painel */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onBackToWorkouts}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer'
            }}
            title="Voltar para a ficha de treinos"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Painel do Treinador</h2>
              <span
                style={{
                  background: 'rgba(100, 210, 255, 0.15)',
                  border: '1px solid rgba(100, 210, 255, 0.3)',
                  color: '#64d2ff',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ShieldCheck size={12} />
                Personal
              </span>
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#8e8e93' }}>
              Acompanhamento de alunos e frequência em tempo real
            </p>
          </div>
        </div>

        {/* Botão de treinar como aluno */}
        <button
          onClick={onBackToWorkouts}
          style={{
            background: '#ffffff',
            border: 'none',
            color: '#000000',
            padding: '10px 18px',
            borderRadius: '12px',
            fontSize: '0.88rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <Dumbbell size={16} />
          Fazer Meu Treino
        </button>
      </div>

      {/* Métricas do Personal */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          marginBottom: '24px'
        }}
      >
        <div
          style={{
            background: 'rgba(22, 22, 26, 0.72)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(100, 210, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64d2ff'
            }}
          >
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{students.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#8e8e93' }}>Alunos Cadastrados</div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(22, 22, 26, 0.72)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <Trophy size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              {students.reduce((acc, s) => acc + (s.stats?.totalWorkouts || 0), 0)}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#8e8e93' }}>Treinos Realizados</div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(22, 22, 26, 0.72)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(255, 214, 10, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffd60a'
            }}
          >
            <Flame size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              {students.filter((s) => (s.stats?.streakDays || 0) > 0).length}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#8e8e93' }}>Alunos Ativos com Streak</div>
          </div>
        </div>
      </div>

      {/* Barra de Pesquisa */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search
          size={18}
          color="#71717a"
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar aluno por nome ou e-mail..."
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: 'rgba(22, 22, 26, 0.72)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '14px',
            padding: '12px 16px 12px 46px',
            color: '#ffffff',
            fontSize: '0.92rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Lista de Alunos */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#8e8e93' }}>
          Carregando alunos do Cloud Firestore...
        </div>
      ) : filteredStudents.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '50px 20px',
            background: 'rgba(22, 22, 26, 0.4)',
            borderRadius: '20px',
            border: '1px dashed rgba(255, 255, 255, 0.15)'
          }}
        >
          <Users size={36} color="#636366" style={{ marginBottom: '12px' }} />
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.1rem' }}>Nenhum aluno encontrado</h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#8e8e93' }}>
            Quando novos alunos se cadastrarem selecionando o perfil "Aluno", eles aparecerão aqui em tempo real!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredStudents.map((item) => (
            <div
              key={item.profile.uid}
              onClick={() => setSelectedStudent(item)}
              style={{
                background: 'rgba(22, 22, 26, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(100, 210, 255, 0.35)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #27272a, #3f3f46)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  {item.profile.displayName?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>{item.profile.displayName}</div>
                  <div style={{ fontSize: '0.82rem', color: '#8e8e93' }}>{item.profile.email}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                    <Flame size={15} color="#ff375f" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ff375f' }}>
                      {item.stats?.streakDays || 0} dias
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#8e8e93' }}>
                    {item.stats?.totalWorkouts || 0} treinos feitos
                  </div>
                </div>
                <ChevronRight size={18} color="#71717a" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Detalhes do Aluno Selecionado */}
      {selectedStudent && (
        <div className="modal-backdrop" onClick={() => setSelectedStudent(null)}>
          <div
            className="auth-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#141418',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '24px',
              maxWidth: '500px',
              width: '100%',
              color: '#ffffff'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{selectedStudent.profile.displayName}</h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#8e8e93' }}>{selectedStudent.profile.email}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.78rem', color: '#8e8e93' }}>Sequência Atual</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ff375f' }}>
                  {selectedStudent.stats?.streakDays || 0} dias
                </div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.78rem', color: '#8e8e93' }}>Total de Treinos</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                  {selectedStudent.stats?.totalWorkouts || 0}
                </div>
              </div>
            </div>

            <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem' }}>Últimos Treinos Finalizados</h4>
            {(!selectedStudent.recentWorkouts || selectedStudent.recentWorkouts.length === 0) ? (
              <p style={{ fontSize: '0.85rem', color: '#8e8e93' }}>Nenhum treino registrado ainda.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedStudent.recentWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{workout.dayName}</div>
                      <div style={{ fontSize: '0.78rem', color: '#8e8e93' }}>
                        {workout.date} • {workout.durationMinutes} min
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: '#64d2ff', fontSize: '0.88rem' }}>
                      {workout.totalVolumeKg.toLocaleString()} kg
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
