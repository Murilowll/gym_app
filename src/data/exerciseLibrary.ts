import type { Exercise, MuscleCategory } from '../types/workout';

export const ALL_EXERCISES_LIBRARY: Exercise[] = [
  // ==========================================
  // PEITO (CHEST)
  // ==========================================
  {
    id: 'p1-incline-db',
    name: 'Supino Inclinado com Halteres',
    machineName: 'Banco Inclinado (30° a 45°)',
    category: 'Peito',
    equipmentType: 'Halteres',
    targetMuscles: ['Peitoral Superior (Clavicular)', 'Deltoide Anterior'],
    secondaryMuscles: ['Tríceps Braquial'],
    sets: 4,
    reps: '8 - 10',
    suggestedRestSeconds: 90,
    visualType: 'incline-bench',
    machineAdjustment: [
      'Incline o encosto entre 30° e 45° (mais que 45° sobrecarrega os ombros).',
      'Ajuste o assento levemente para cima para não escorregar.'
    ],
    executionTips: [
      'Desça os halteres em formato de seta (cotovelos a ~60° do tronco).',
      'Alongue bem o peito na base e suba com explosão controlada.'
    ],
    commonMistakes: [
      'Bater os halteres no topo perdendo tensão.',
      'Abrir cotovelos a 90° forçando o manguito rotador.'
    ],
    alternatives: [
      { name: 'Supino Inclinado Smith', equipment: 'Smith Machine', reason: 'Maior estabilidade para falhar com segurança' },
      { name: 'Supino Inclinado com Barra', equipment: 'Barra Olímpica', reason: 'Excelente para sobrecarga de peso' }
    ]
  },
  {
    id: 'p1-chest-press',
    name: 'Supino Reto na Máquina Convergente',
    machineName: 'Chest Press Articulado',
    category: 'Peito',
    equipmentType: 'Máquina',
    targetMuscles: ['Peitoral Maior (Esternal)'],
    secondaryMuscles: ['Deltoide Anterior', 'Tríceps'],
    sets: 4,
    reps: '8 - 12',
    suggestedRestSeconds: 90,
    visualType: 'chest-press',
    machineAdjustment: [
      'Ajuste a altura do banco para que as manoplas fiquem na linha média do mamilo.',
      'Encaixe os pés firmes no chão.'
    ],
    executionTips: [
      'Mantenha as escápulas retraídas durante todo o arco.',
      'Evite travar os cotovelos no final da extensão.'
    ],
    commonMistakes: [
      'Projetar os ombros para frente no topo.',
      'Deixar o peso bater na pilha entre as repetições.'
    ],
    alternatives: [
      { name: 'Supino Reto com Barra', equipment: 'Barra Olímpica', reason: 'Clássico para força máxima e hipertrofia' },
      { name: 'Supino Reto com Halteres', equipment: 'Halteres', reason: 'Permite maior amplitude de alongamento' }
    ]
  },
  {
    id: 'ex-bench-press-barbell',
    name: 'Supino Reto com Barra Olímpica',
    machineName: 'Banco Supino Reto Olímpico',
    category: 'Peito',
    equipmentType: 'Barra',
    targetMuscles: ['Peitoral Maior (Esternocostal)', 'Peitoral Médio'],
    secondaryMuscles: ['Tríceps Braquial', 'Deltoide Anterior'],
    sets: 4,
    reps: '6 - 10',
    suggestedRestSeconds: 120,
    visualType: 'bench-press',
    machineAdjustment: [
      'Posicione os olhos logo abaixo da barra quando deitado no banco.',
      'Pés 100% plantados e firmes no solo criando base sólida.'
    ],
    executionTips: [
      'Pegada ligeiramente mais larga que a largura dos ombros.',
      'Toque a barra no esterno inferior sem quicar no peito.',
      'Gere leg drive empurrando o chão com os pés.'
    ],
    commonMistakes: [
      'Tirar a lombar e o glúteo do banco excessivamente.',
      'Bater a barra no peito para pegar impulso.'
    ],
    alternatives: [
      { name: 'Supino Reto com Halteres', equipment: 'Halteres', reason: 'Alivia tensão articular no punho e ombro' }
    ]
  },
  {
    id: 'p1-peck-deck',
    name: 'Peck Deck (Voador / Crucifixo Máquina)',
    machineName: 'Peck Deck Fly Machine',
    category: 'Peito',
    equipmentType: 'Máquina',
    targetMuscles: ['Peitoral Maior (Fibras Esternais e Adutores)'],
    secondaryMuscles: ['Deltoide Anterior'],
    sets: 4,
    reps: '10 - 12',
    suggestedRestSeconds: 60,
    visualType: 'peck-deck',
    machineAdjustment: [
      'Ajuste o assento para que os braços fiquem paralelos ao chão ou levemente abaixo da linha do ombro.'
    ],
    executionTips: [
      'Pense em encostar os bíceps na lateral do tórax.',
      'Segure 1 segundo no pico de contração.'
    ],
    commonMistakes: [
      'Projetar o pescoço e ombros para frente ao fechar.',
      'Deixar os cotovelos caírem durante o movimento.'
    ],
    alternatives: [
      { name: 'Crucifixo com Halteres', equipment: 'Halteres', reason: 'Excelente pico de alongamento fascial' }
    ]
  },
  {
    id: 'p4-cable-crossover',
    name: 'Crossover na Polia Média / Alta',
    machineName: 'Cross Over / Polia Dupla',
    category: 'Peito',
    equipmentType: 'Cabo/Polia',
    targetMuscles: ['Peitoral Inferior e Miolo de Peito'],
    secondaryMuscles: ['Deltoide Anterior'],
    sets: 3,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'cable-crossover',
    machineAdjustment: [
      'Ajuste as roldanas acima da cabeça para foco inferior ou na altura do peito para foco geral.',
      'Dê um passo à frente com base anteroposterior.'
    ],
    executionTips: [
      'Cotovelos semi-flexionados fixos.',
      'Cruze levemente as mãos à frente para contração máxima.'
    ],
    commonMistakes: [
      'Balançar o tronco para empurrar o cabo.',
      'Transformar o crucifixo em um supino fechando e esticando cotovelos.'
    ],
    alternatives: [
      { name: 'Paralelas no Graviton', equipment: 'Graviton / Paralelas', reason: 'Construtor clássico de linha inferior do peito' }
    ]
  },
  {
    id: 'p4-incline-press-machine',
    name: 'Supino Inclinado na Máquina Articulada',
    machineName: 'Incline Chest Press Machine',
    category: 'Peito',
    equipmentType: 'Máquina',
    targetMuscles: ['Peitoral Superior', 'Deltoide Anterior'],
    secondaryMuscles: ['Tríceps'],
    sets: 4,
    reps: '8 - 12',
    suggestedRestSeconds: 90,
    visualType: 'incline-bench',
    machineAdjustment: [
      'Regule o banco para que as pegadas fiquem na linha da clavícula.'
    ],
    executionTips: [
      'Contraia as escápulas contra o estofado.',
      'Faça a descida em 3 segundos sentindo o alongamento do peito.'
    ],
    commonMistakes: [
      'Empurrar o peso desencostando as costas do apoio.'
    ],
    alternatives: [
      { name: 'Supino Inclinado Halteres', equipment: 'Halteres', reason: 'Maior liberdade angular' }
    ]
  },
  {
    id: 'ex-dips-chest',
    name: 'Paralelas com Foco em Peitoral',
    machineName: 'Barras Paralelas / Graviton',
    category: 'Peito',
    equipmentType: 'Peso Corporal',
    targetMuscles: ['Peitoral Inferior', 'Tríceps'],
    secondaryMuscles: ['Deltoide Anterior'],
    sets: 3,
    reps: '8 - 12',
    suggestedRestSeconds: 90,
    visualType: 'dips',
    machineAdjustment: [
      'Se usar o graviton, selecione a placa de contrapeso proporcional à sua força.'
    ],
    executionTips: [
      'Incline o tronco para frente em ~30° para direcionar o estímulo para o peitoral.',
      'Desça até os cotovelos atingirem 90°.'
    ],
    commonMistakes: [
      'Ficar com o tronco 100% ereto (joga o foco todo no tríceps).',
      'Descer além do limite anatômico do ombro.'
    ],
    alternatives: [
      { name: 'Crossover Polia Alta', equipment: 'Polia', reason: 'Isolamento sem impacto articular' }
    ]
  },
  {
    id: 'ex-pushup',
    name: 'Flexão de Braços (Push-Up)',
    machineName: 'Solo / Colchonete',
    category: 'Peito',
    equipmentType: 'Peso Corporal',
    targetMuscles: ['Peitoral Maior', 'Core'],
    secondaryMuscles: ['Tríceps', 'Deltoide Anterior'],
    sets: 3,
    reps: '15 - 20',
    suggestedRestSeconds: 60,
    visualType: 'pushup',
    machineAdjustment: [
      'Mãos afastadas na largura dos ombros ou ligeiramente mais abertas.'
    ],
    executionTips: [
      'Corpo em linha reta da cabeça aos calcanhares.',
      'Ative o glúteo e abdômen para não hiperestender a lombar.'
    ],
    commonMistakes: [
      'Deixar o quadril cair em direção ao chão.'
    ],
    alternatives: [
      { name: 'Supino Reto Halteres', equipment: 'Halteres', reason: 'Controle exato de carga progressiva' }
    ]
  },
  {
    id: 'ex-decline-bench',
    name: 'Supino Declinado com Barra',
    machineName: 'Banco Declinado com Apoio de Pernas',
    category: 'Peito',
    equipmentType: 'Barra',
    targetMuscles: ['Peitoral Inferior (Porção Esternal/Abdominal)'],
    secondaryMuscles: ['Tríceps Braquial', 'Deltoide Anterior'],
    sets: 3,
    reps: '8 - 12',
    suggestedRestSeconds: 90,
    visualType: 'bench-press',
    machineAdjustment: [
      'Trave os tornozelos com segurança nos roletes de apoio do banco declinado.',
      'Ajuste o ângulo de declínio entre 15° e 30°.'
    ],
    executionTips: [
      'Desça a barra controladamente em direção à linha inferior do peitoral.',
      'Empurre estendendo os cotovelos sem tirar as escápulas do banco.'
    ],
    commonMistakes: [
      'Descer a barra muito acima no pescoço.',
      'Subir de forma explosiva desregulando a estabilidade da cabeça.'
    ],
    alternatives: [
      { name: 'Crossover Polia Alta', equipment: 'Polia', reason: 'Foco na mesma porção inferior com tensão contínua' }
    ]
  },
  {
    id: 'ex-dumbbell-pullover',
    name: 'Pullover com Halter no Banco',
    machineName: 'Banco Reto Tradicional',
    category: 'Peito',
    equipmentType: 'Halteres',
    targetMuscles: ['Peitoral Maior', 'Serrátil Anterior', 'Dorsal'],
    secondaryMuscles: ['Tríceps Cabeça Longa'],
    sets: 3,
    reps: '10 - 12',
    suggestedRestSeconds: 75,
    visualType: 'bench-press',
    machineAdjustment: [
      'Deite transversalmente ou longitudinalmente no banco com cabeça apoiada.'
    ],
    executionTips: [
      'Segure o halter com as duas mãos em formato de diamante sob a placa superior.',
      'Mantenha uma leve flexão nos cotovelos e desça o peso atrás da cabeça sentindo a expansão da caixa torácica.'
    ],
    commonMistakes: [
      'Dobrar demais os cotovelos transformando o movimento em tríceps testa.',
      'Arquear a lombar tirando os pés do chão.'
    ],
    alternatives: [
      { name: 'Pulldown com Corda no Pulley', equipment: 'Polia', reason: 'Ótimo isolamento para dorsal e serrátil' }
    ]
  },

  // ==========================================
  // COSTAS (BACK)
  // ==========================================
  {
    id: 'p2-lat-pulldown',
    name: 'Puxada Alta Aberta no Pulley',
    machineName: 'Lat Pulldown Machine',
    category: 'Costas',
    equipmentType: 'Cabo/Polia',
    targetMuscles: ['Latíssimo do Dorso (Dorsal - Asa)'],
    secondaryMuscles: ['Bíceps', 'Braquial', 'Redondo Maior'],
    sets: 4,
    reps: '8 - 12',
    suggestedRestSeconds: 90,
    visualType: 'lat-pulldown',
    machineAdjustment: [
      'Trave os apoios de coxa firmemente contra as pernas para evitar subir com o peso.'
    ],
    executionTips: [
      'Incline o tronco em apenas 10° a 15°.',
      'Puxe com os cotovelos em direção ao quadril, puxando até a altura do queixo/peito superior.'
    ],
    commonMistakes: [
      'Jogar o corpo excessivamente para trás usando a lombar como pêndulo.',
      'Puxar a barra atrás da nuca (arriscado para os ombros).'
    ],
    alternatives: [
      { name: 'Barra Fixa Pronada', equipment: 'Barra Fixa', reason: 'Excelente para força relativa' }
    ]
  },
  {
    id: 'p2-seated-cable-row',
    name: 'Remada Baixa no Cabo com Triângulo',
    machineName: 'Seated Cable Row',
    category: 'Costas',
    equipmentType: 'Cabo/Polia',
    targetMuscles: ['Trapézio Médio/Inferior', 'Romboides', 'Dorsal'],
    secondaryMuscles: ['Bíceps', 'Eretores da Espinha'],
    sets: 4,
    reps: '10 - 12',
    suggestedRestSeconds: 75,
    visualType: 'seated-cable-row',
    machineAdjustment: [
      'Sente com joelhos ligeiramente flexionados, nunca travados.'
    ],
    executionTips: [
      'Peito estufado, puxe o triângulo rente ao umbigo esmagando as escápulas.',
      'Alongue a dorsal na volta sem arredondar a coluna.'
    ],
    commonMistakes: [
      'Balançar o tronco para frente e para trás em excesso.',
      'Encolher os ombros na direção das orelhas.'
    ],
    alternatives: [
      { name: 'Remada Curvada com Barra', equipment: 'Barra', reason: 'Construção maciça de espessura de costas' }
    ]
  },
  {
    id: 'p5-bent-over-row',
    name: 'Remada Curvada com Barra (Pronada)',
    machineName: 'Barra Olímpica Livre',
    category: 'Costas',
    equipmentType: 'Barra',
    targetMuscles: ['Dorsal', 'Romboides', 'Trapézio Médio'],
    secondaryMuscles: ['Lombar', 'Bíceps', 'Posterior de Coxa'],
    sets: 4,
    reps: '8 - 10',
    suggestedRestSeconds: 90,
    visualType: 'bent-over-row',
    machineAdjustment: [
      'Pés na largura do quadril, joelhos destravados.'
    ],
    executionTips: [
      'Incline o tronco a aproximadamente 45° mantendo a coluna neutra.',
      'Puxe a barra em direção à linha da cintura/umbigo.'
    ],
    commonMistakes: [
      'Curvar a lombar (risco de lesão discal).',
      'Levantar o tronco a cada repetição.'
    ],
    alternatives: [
      { name: 'Remada Cavalinho T-Bar', equipment: 'Barra T', reason: 'Menor sobrecarga na lombar' }
    ]
  },
  {
    id: 'p5-close-grip-pulldown',
    name: 'Puxada Fechada com Triângulo',
    machineName: 'Lat Pulldown Machine',
    category: 'Costas',
    equipmentType: 'Cabo/Polia',
    targetMuscles: ['Latíssimo do Dorso Inferior', 'Braquial'],
    secondaryMuscles: ['Bíceps', 'Trapézio'],
    sets: 3,
    reps: '10 - 12',
    suggestedRestSeconds: 75,
    visualType: 'lat-pulldown',
    machineAdjustment: [
      'Substitua a barra aberta pelo pegador triângulo.'
    ],
    executionTips: [
      'Mantenha os cotovelos fechados apontando para baixo durante a tração.'
    ],
    commonMistakes: [
      'Soltar o peso de forma brusca no topo.'
    ],
    alternatives: [
      { name: 'Puxada Supinada', equipment: 'Polley', reason: 'Maior ativação de bíceps e dorsal baixa' }
    ]
  },
  {
    id: 'ex-one-arm-row',
    name: 'Remada Unilateral com Halter (Serrote)',
    machineName: 'Banco Reto + Halter',
    category: 'Costas',
    equipmentType: 'Halteres',
    targetMuscles: ['Latíssimo do Dorso', 'Romboides'],
    secondaryMuscles: ['Bíceps', 'Deltoide Posterior'],
    sets: 3,
    reps: '10 - 12',
    suggestedRestSeconds: 60,
    visualType: 'bent-over-row',
    machineAdjustment: [
      'Apoie o joelho e a mão do mesmo lado no banco reto, tronco paralelo ao chão.'
    ],
    executionTips: [
      'Puxe o halter em arco em direção ao quadril, não em direção ao peito.',
      'Mantenha as escápulas estáveis.'
    ],
    commonMistakes: [
      'Girar o tronco para levantar o halter.',
      'Puxar usando apenas a força do braço.'
    ],
    alternatives: [
      { name: 'Remada Máquina Unilateral', equipment: 'Máquina', reason: 'Estabilidade torácica total' }
    ]
  },
  {
    id: 'ex-pullup',
    name: 'Barra Fixa Pronada (Pull-Up)',
    machineName: 'Barra Fixa',
    category: 'Costas',
    equipmentType: 'Peso Corporal',
    targetMuscles: ['Latíssimo do Dorso', 'Redondo Maior'],
    secondaryMuscles: ['Bíceps', 'Antebraço'],
    sets: 4,
    reps: '6 - 10',
    suggestedRestSeconds: 120,
    visualType: 'pullup',
    machineAdjustment: [
      'Pegada ligeiramente mais larga que os ombros.'
    ],
    executionTips: [
      'Inicie o movimento deprimindo as escápulas antes de dobrar os braços.',
      'Passe o queixo da linha da barra com controle.'
    ],
    commonMistakes: [
      'Espernear ou balançar o corpo (kipping).',
      'Descer apenas metade do caminho.'
    ],
    alternatives: [
      { name: 'Puxada Alta Pulley', equipment: 'Cabo', reason: 'Excelente para calibrar o peso' }
    ]
  },
  {
    id: 'ex-deadlift-conventional',
    name: 'Levantamento Terra Convencional',
    machineName: 'Barra Olímpica Livre',
    category: 'Costas',
    equipmentType: 'Barra',
    targetMuscles: ['Eretores da Espinha', 'Dorsal', 'Glúteos', 'Isquiotibiais'],
    secondaryMuscles: ['Quadríceps', 'Trapézio', 'Antebraço'],
    sets: 4,
    reps: '5 - 8',
    suggestedRestSeconds: 150,
    visualType: 'deadlift',
    machineAdjustment: [
      'Barra encostada nas canelas, pés na largura dos quadris.'
    ],
    executionTips: [
      'Trave as dorsais puxando a barra contra a perna ("quebre a barra").',
      'Empurre o chão com os pés mantendo a coluna em bloco único.'
    ],
    commonMistakes: [
      'Arredondar a região lombar.',
      'Hiperestender as costas no topo do movimento.'
    ],
    alternatives: [
      { name: 'Terra Romeno (RDL)', equipment: 'Barra', reason: 'Mais isolamento em cadeia posterior' }
    ]
  },

  // ==========================================
  // OMBROS (SHOULDERS) & TRAPÉZIO
  // ==========================================
  {
    id: 'p4-shoulder-press',
    name: 'Desenvolvimento com Halteres Sentado',
    machineName: 'Banco com Encosto a 80°',
    category: 'Ombros',
    equipmentType: 'Halteres',
    targetMuscles: ['Deltoide Anterior', 'Deltoide Lateral'],
    secondaryMuscles: ['Tríceps', 'Trapézio Superior'],
    sets: 4,
    reps: '8 - 10',
    suggestedRestSeconds: 90,
    visualType: 'seated-overhead-press',
    machineAdjustment: [
      'Ajuste o banco em ~80° a 85° (nunca 90° rígido para não travar a escápula).'
    ],
    executionTips: [
      'Desça os halteres até a altura das orelhas mantendo cotovelos a 45° à frente.',
      'Empurre para cima sem encostar os halteres no topo.'
    ],
    commonMistakes: [
      'Abrir cotovelos demais na linha das orelhas.',
      'Tirar a lombar do encosto fazendo ponte.'
    ],
    alternatives: [
      { name: 'Desenvolvimento Militar Barra', equipment: 'Barra', reason: 'Maior recrutamento de core' },
      { name: 'Desenvolvimento Máquina', equipment: 'Máquina', reason: 'Segurança extrema até a falha' }
    ]
  },
  {
    id: 'p1-lateral-raise',
    name: 'Elevação Lateral com Halteres',
    machineName: 'Halteres Livres',
    category: 'Ombros',
    equipmentType: 'Halteres',
    targetMuscles: ['Deltoide Lateral (Ombro Médio)'],
    secondaryMuscles: ['Trapézio', 'Deltoide Anterior'],
    sets: 4,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'lateral-raise',
    machineAdjustment: [
      'Pés firmes, joelhos destravados, leve inclinação do tronco para frente (5°).'
    ],
    executionTips: [
      'Levante os pesos guiando pelos cotovelos no plano escapular.',
      'Segure 1 segundo no ponto mais alto na linha dos ombros.'
    ],
    commonMistakes: [
      'Jogar o tronco para trás e dar impulso com as pernas.',
      'Subir as mãos mais alto que os cotovelos.'
    ],
    alternatives: [
      { name: 'Elevação Lateral no Cabo', equipment: 'Cabo/Polia', reason: 'Tensão constante desde a base' }
    ]
  },
  {
    id: 'p4-cable-lateral-raise',
    name: 'Elevação Lateral na Polia Baixa',
    machineName: 'Crossover / Polia Baixa',
    category: 'Ombros',
    equipmentType: 'Cabo/Polia',
    targetMuscles: ['Deltoide Lateral'],
    secondaryMuscles: ['Trapézio'],
    sets: 3,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'lateral-raise',
    machineAdjustment: [
      'Ajuste a roldana na altura do joelho ou tornozelo.'
    ],
    executionTips: [
      'Puxe o cabo passando por trás ou pela frente do corpo.',
      'Foco em afastar a mão para longe do corpo, não apenas para cima.'
    ],
    commonMistakes: [
      'Usar carga excessiva e dobrar muito o braço.'
    ],
    alternatives: [
      { name: 'Elevação Lateral Halteres', equipment: 'Halteres', reason: 'Mais prático em academia cheia' }
    ]
  },
  {
    id: 'p2-reverse-fly',
    name: 'Crucifixo Invertido no Peck Deck (Deltoide Posterior)',
    machineName: 'Peck Deck / Reverse Fly Machine',
    category: 'Ombros',
    equipmentType: 'Máquina',
    targetMuscles: ['Deltoide Posterior', 'Romboides'],
    secondaryMuscles: ['Trapézio Médio'],
    sets: 4,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'reverse-fly',
    machineAdjustment: [
      'Ajuste as hastes na posição mais recuada para frente.',
      'Ajuste o assento para que os braços fiquem na linha dos ombros.'
    ],
    executionTips: [
      'Cotovelos levemente flexionados e travados no mesmo ângulo.',
      'Abra os braços focando em contrair a parte de trás do ombro.'
    ],
    commonMistakes: [
      'Juntar as escápulas antes de ativar o ombro (vira exercício de costas).'
    ],
    alternatives: [
      { name: 'Crucifixo Invertido com Halteres', equipment: 'Halteres', reason: 'Permite rotação livre do punho' }
    ]
  },
  {
    id: 'ex-face-pull',
    name: 'Face Pull na Polia Alta com Corda',
    machineName: 'Polia Alta',
    category: 'Ombros',
    equipmentType: 'Cabo/Polia',
    targetMuscles: ['Deltoide Posterior', 'Manguito Rotador', 'Trapézio Superior'],
    secondaryMuscles: ['Romboides'],
    sets: 4,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'face-pull',
    machineAdjustment: [
      'Posicione a polia na altura dos olhos ou um pouco acima.'
    ],
    executionTips: [
      'Puxe a corda em direção à testa/nariz, abrindo as mãos no final da puxada.',
      'Faça rotação externa de ombro no final de cada repetição.'
    ],
    commonMistakes: [
      'Puxar para o queixo ou peito.',
      'Usar peso tão alto que o corpo é puxado para a máquina.'
    ],
    alternatives: [
      { name: 'Crucifixo Invertido Halteres', equipment: 'Halteres', reason: 'Excelente alternativa' }
    ]
  },
  {
    id: 'ex-arnold-press',
    name: 'Desenvolvimento Arnold com Halteres',
    machineName: 'Banco com Encosto a 90°',
    category: 'Ombros',
    equipmentType: 'Halteres',
    targetMuscles: ['Deltoide Anterior', 'Deltoide Lateral'],
    secondaryMuscles: ['Tríceps Braquial', 'Trapézio Superior'],
    sets: 4,
    reps: '8 - 12',
    suggestedRestSeconds: 90,
    visualType: 'arnold-press',
    machineAdjustment: [
      'Ajuste o banco em 85° a 90° com apoio total da coluna.'
    ],
    executionTips: [
      'Inicie com as palmas voltadas para você na altura do peito.',
      'Gire os punhos para fora conforme empurra para cima, finalizando com as palmas para frente.'
    ],
    commonMistakes: [
      'Balançar a cabeça para frente no topo.',
      'Usar carga excessiva perdendo o controle da rotação.'
    ],
    alternatives: [
      { name: 'Desenvolvimento Militar com Halteres', equipment: 'Halteres', reason: 'Movimento sem rotação de punho' }
    ]
  },
  {
    id: 'ex-front-raise',
    name: 'Elevação Frontal com Halteres',
    machineName: 'Halteres Livres',
    category: 'Ombros',
    equipmentType: 'Halteres',
    targetMuscles: ['Deltoide Anterior (Porção Frontal)'],
    secondaryMuscles: ['Peitoral Superior', 'Trapézio'],
    sets: 3,
    reps: '10 - 12',
    suggestedRestSeconds: 60,
    visualType: 'lateral-raise',
    machineAdjustment: [
      'Em pé com pés na largura do quadril e abdômen contraído.'
    ],
    executionTips: [
      'Eleve os halteres à frente até a linha dos olhos com cotovelos levemente semiflexionados.',
      'Segure por 1 segundo no pico de contração antes de descer controladamente.'
    ],
    commonMistakes: [
      'Jogar o tronco para trás pegando impulso com a lombar.',
      'Ultrapassar a altura da cabeça.'
    ],
    alternatives: [
      { name: 'Elevação Frontal na Polia Baixa', equipment: 'Polia', reason: 'Tensão muscular uniforme em todo o arco' }
    ]
  },
  {
    id: 'p5-shrugs',
    name: 'Encolhimento de Ombros com Halteres (Trapézio)',
    machineName: 'Halteres Livres',
    category: 'Ombros',
    equipmentType: 'Halteres',
    targetMuscles: ['Trapézio Superior'],
    secondaryMuscles: ['Levantador da Escápula'],
    sets: 4,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'shrug',
    machineAdjustment: [
      'Postura ereta, halteres segurados na lateral das coxas.'
    ],
    executionTips: [
      'Eleve os ombros reto para cima, em direção às orelhas.',
      'Segure 2 segundos no topo contraindo forte.'
    ],
    commonMistakes: [
      'Fazer rotação circular com os ombros (desgasta a articulação sem ganho muscular).'
    ],
    alternatives: [
      { name: 'Encolhimento no Smith', equipment: 'Smith', reason: 'Permite cargas muito altas com segurança' }
    ]
  },

  // ==========================================
  // BÍCEPS (BICEPS) & ANTEBRAÇO
  // ==========================================
  {
    id: 'p2-cable-biceps-curl',
    name: 'Rosca Bíceps na Polia com Barra Reta',
    machineName: 'Polia Baixa',
    category: 'Bíceps',
    equipmentType: 'Cabo/Polia',
    targetMuscles: ['Bíceps Braquial (Cabeça Curta e Longa)'],
    secondaryMuscles: ['Braquial', 'Braquiorradial'],
    sets: 3,
    reps: '10 - 12',
    suggestedRestSeconds: 60,
    visualType: 'preacher-curl',
    machineAdjustment: [
      'Polia na posição mais baixa, barra reta conectada.'
    ],
    executionTips: [
      'Cotovelos colados nas costelas sem avançar.',
      'Suba esmagando o bíceps e resista à descida.'
    ],
    commonMistakes: [
      'Projetar cotovelos para frente transformando em elevação frontal.',
      'Balançar o tronco para subir o peso.'
    ],
    alternatives: [
      { name: 'Rosca Direta Barra W', equipment: 'Barra W', reason: 'Clássico para massa muscular' }
    ]
  },
  {
    id: 'p2-hammer-curl',
    name: 'Rosca Martelo com Halteres',
    machineName: 'Halteres Livres',
    category: 'Bíceps',
    equipmentType: 'Halteres',
    targetMuscles: ['Braquial', 'Braquiorradial (Antebraço)'],
    secondaryMuscles: ['Bíceps Braquial (Cabeça Longa)'],
    sets: 3,
    reps: '10 - 12',
    suggestedRestSeconds: 60,
    visualType: 'preacher-curl',
    machineAdjustment: [
      'Em pé ou sentado, pegada neutra (palmas voltadas uma para a outra).'
    ],
    executionTips: [
      'Mantenha a pegada neutra durante todo o trajeto.',
      'Excelente para dar largura e espessura ao braço.'
    ],
    commonMistakes: [
      'Girar o punho no meio do caminho.'
    ],
    alternatives: [
      { name: 'Rosca Martelo na Corda', equipment: 'Cabo', reason: 'Tensão contínua' }
    ]
  },
  {
    id: 'p5-preacher-curl',
    name: 'Rosca Scott com Barra W',
    machineName: 'Banco Scott (Preacher)',
    category: 'Bíceps',
    equipmentType: 'Barra',
    targetMuscles: ['Bíceps Braquial (Pico e Alongamento)'],
    secondaryMuscles: ['Braquial'],
    sets: 4,
    reps: '8 - 12',
    suggestedRestSeconds: 75,
    visualType: 'preacher-curl',
    machineAdjustment: [
      'Ajuste a altura do banco para que o topo do apoio fique firme na axila.'
    ],
    executionTips: [
      'Não tire os braços do estofado.',
      'Desça de forma controlada sem esticar 100% o cotovelo para proteger o tendão.'
    ],
    commonMistakes: [
      'Tirar o peito do estofado ao cansar.',
      'Despencar a barra no final da descida.'
    ],
    alternatives: [
      { name: 'Rosca Scott Máquina', equipment: 'Máquina', reason: 'Tensão contínua até o topo' }
    ]
  },
  {
    id: 'p5-incline-curl',
    name: 'Rosca Inclinada no Banco 45°',
    machineName: 'Banco Inclinado a 45° + Halteres',
    category: 'Bíceps',
    equipmentType: 'Halteres',
    targetMuscles: ['Bíceps Braquial (Cabeça Longa - Pico)'],
    secondaryMuscles: ['Braquial'],
    sets: 3,
    reps: '10 - 12',
    suggestedRestSeconds: 60,
    visualType: 'incline-curl',
    machineAdjustment: [
      'Banco regulado entre 45° e 60°.'
    ],
    executionTips: [
      'Deixe os braços caírem em direção ao chão para alongar a cabeça longa.',
      'Supine a mão conforme sobe (gire o dedinho para fora).'
    ],
    commonMistakes: [
      'Projetar os cotovelos para frente durante a subida.'
    ],
    alternatives: [
      { name: 'Rosca Alternada em Pé', equipment: 'Halteres', reason: 'Permite maior carga' }
    ]
  },
  {
    id: 'ex-barbell-curl-w',
    name: 'Rosca Direta com Barra W',
    machineName: 'Barra W Livre',
    category: 'Bíceps',
    equipmentType: 'Barra',
    targetMuscles: ['Bíceps Braquial'],
    secondaryMuscles: ['Antebraços'],
    sets: 4,
    reps: '8 - 10',
    suggestedRestSeconds: 90,
    visualType: 'preacher-curl',
    machineAdjustment: [
      'Pegada anatômica nas curvaturas da barra W para proteger os punhos.'
    ],
    executionTips: [
      'Mantenha os cotovelos fixos ao lado do corpo.',
      'Suba com força controlada e segure 1 segundo no topo.'
    ],
    commonMistakes: [
      'Jogar as costas para trás no início do movimento.'
    ],
    alternatives: [
      { name: 'Rosca Direta Barra Reta', equipment: 'Barra Reta', reason: 'Máxima supinação' }
    ]
  },
  {
    id: 'ex-concentration-curl',
    name: 'Rosca Concentrada com Halter',
    machineName: 'Banco Reto + Halter',
    category: 'Bíceps',
    equipmentType: 'Halteres',
    targetMuscles: ['Bíceps Braquial (Pico de Contração Isolado)'],
    secondaryMuscles: ['Braquial'],
    sets: 3,
    reps: '10 - 12',
    suggestedRestSeconds: 60,
    visualType: 'preacher-curl',
    machineAdjustment: [
      'Sentado na ponta do banco, pernas afastadas.'
    ],
    executionTips: [
      'Apoie o cotovelo na parte interna da coxa correspondente.',
      'Flexione o braço em direção ao ombro contraindo no ponto mais alto sem balanço do tronco.'
    ],
    commonMistakes: [
      'Usar o tronco para puxar o peso.',
      'Descolar o cotovelo da coxa.'
    ],
    alternatives: [
      { name: 'Rosca Scott Unilateral com Halter', equipment: 'Halteres', reason: 'Isolamento estrito com apoio' }
    ]
  },

  // ==========================================
  // TRÍCEPS (TRICEPS)
  // ==========================================
  {
    id: 'p1-triceps-pushdown',
    name: 'Tríceps Pushdown no Pulley com Barra Reta',
    machineName: 'Polia Alta',
    category: 'Tríceps',
    equipmentType: 'Cabo/Polia',
    targetMuscles: ['Tríceps Braquial (Cabeça Lateral e Medial)'],
    secondaryMuscles: ['Antebraço'],
    sets: 4,
    reps: '10 - 12',
    suggestedRestSeconds: 60,
    visualType: 'triceps-pushdown',
    machineAdjustment: [
      'Polia na altura máxima com barra reta ou V conectada.'
    ],
    executionTips: [
      'Cotovelos travados na lateral do corpo como um eixo fixo.',
      'Empurre para baixo até estender completamente o braço.'
    ],
    commonMistakes: [
      'Subir os cotovelos junto com o peso.',
      'Afastar os cotovelos para os lados.'
    ],
    alternatives: [
      { name: 'Tríceps Corda', equipment: 'Cabo', reason: 'Maior liberdade para abrir no final' }
    ]
  },
  {
    id: 'p1-triceps-extension',
    name: 'Tríceps Francês na Polia (Overhead Cable Extension)',
    machineName: 'Crossover / Polia Média-Alta',
    category: 'Tríceps',
    equipmentType: 'Cabo/Polia',
    targetMuscles: ['Tríceps Braquial (Cabeça Longa em Alongamento)'],
    secondaryMuscles: ['Deltoide Posterior'],
    sets: 3,
    reps: '10 - 12',
    suggestedRestSeconds: 60,
    visualType: 'triceps-extension',
    machineAdjustment: [
      'Ajuste a roldana na altura do peito ou cabeça, de costas para a máquina com corda.'
    ],
    executionTips: [
      'Incline o tronco para frente, cotovelos apontados para frente.',
      'Estenda os braços abrindo a corda no final.'
    ],
    commonMistakes: [
      'Movimentar os ombros durante a extensão.'
    ],
    alternatives: [
      { name: 'Tríceps Francês com Halter', equipment: 'Halter', reason: 'Executado sentado no banco' }
    ]
  },
  {
    id: 'p4-skull-crusher',
    name: 'Tríceps Testa com Barra W (Skull Crusher)',
    machineName: 'Banco Reto + Barra W',
    category: 'Tríceps',
    equipmentType: 'Barra',
    targetMuscles: ['Tríceps Braquial (Cabeça Longa e Medial)'],
    secondaryMuscles: ['Peitoral Superior'],
    sets: 4,
    reps: '8 - 10',
    suggestedRestSeconds: 75,
    visualType: 'skull-crusher',
    machineAdjustment: [
      'Deite no banco com a barra alinhada acima da testa.'
    ],
    executionTips: [
      'Incline os braços ligeiramente para trás (não a 90° retos) para manter tensão contínua.',
      'Flexione os cotovelos trazendo a barra na direção do topo da cabeça.'
    ],
    commonMistakes: [
      'Abrir os cotovelos para fora durante a descida.',
      'Bater a barra na testa por falta de controle.'
    ],
    alternatives: [
      { name: 'Tríceps Testa com Halteres', equipment: 'Halteres', reason: 'Alivia estresse nos cotovelos' }
    ]
  },
  {
    id: 'ex-close-grip-bench',
    name: 'Supino Fechado com Barra',
    machineName: 'Banco Supino Reto',
    category: 'Tríceps',
    equipmentType: 'Barra',
    targetMuscles: ['Tríceps Braquial'],
    secondaryMuscles: ['Peitoral', 'Deltoide Anterior'],
    sets: 3,
    reps: '8 - 10',
    suggestedRestSeconds: 90,
    visualType: 'bench-press',
    machineAdjustment: [
      'Pegada na largura dos ombros (nunca mãos coladas para não forçar os punhos).'
    ],
    executionTips: [
      'Desça a barra rente ao peito inferior com os cotovelos colados ao tronco.',
      'Empurre estendendo com foco no tríceps.'
    ],
    commonMistakes: [
      'Pegar muito fechado machucando a articulação do punho.'
    ],
    alternatives: [
      { name: 'Mergulho nas Paralelas', equipment: 'Paralelas', reason: 'Excelente construtor de volume' }
    ]
  },
  {
    id: 'ex-triceps-kickback',
    name: 'Tríceps Coice com Halter (Kickback)',
    machineName: 'Banco Reto + Halter',
    category: 'Tríceps',
    equipmentType: 'Halteres',
    targetMuscles: ['Tríceps Braquial (Cabeça Lateral e Longa)'],
    secondaryMuscles: ['Deltoide Posterior'],
    sets: 3,
    reps: '10 - 12',
    suggestedRestSeconds: 60,
    visualType: 'triceps-pushdown',
    machineAdjustment: [
      'Apoie uma mão e joelho no banco, tronco quase paralelo ao solo.'
    ],
    executionTips: [
      'Mantenha o braço fixo paralelo ao tronco e estenda apenas o antebraço para trás.',
      'Segure 1 segundo no pico de contração com o braço totalmente esticado.'
    ],
    commonMistakes: [
      'Deixar o cotovelo cair e balançar o halter como um pêndulo.',
      'Usar carga muito pesada e não conseguir estender até o final.'
    ],
    alternatives: [
      { name: 'Tríceps Coice na Polia Baixa', equipment: 'Polia', reason: 'Tensão contínua por todo o arco' }
    ]
  },

  // ==========================================
  // QUADRÍCEPS (QUADS)
  // ==========================================
  {
    id: 'p3-leg-extension',
    name: 'Cadeira Extensora',
    machineName: 'Leg Extension Machine',
    category: 'Quadríceps',
    equipmentType: 'Máquina',
    targetMuscles: ['Quadríceps (Reto Femoral, Vasto Lateral, Vasto Medial)'],
    secondaryMuscles: [],
    sets: 4,
    reps: '10 - 12',
    suggestedRestSeconds: 60,
    visualType: 'leg-extension',
    machineAdjustment: [
      'Alinhe o eixo de rotação da máquina exatamente com a articulação do seu joelho.',
      'O rolo de espuma deve apoiar logo acima do peito do pé.'
    ],
    executionTips: [
      'Segure firmemente nas manoplas laterais para travar o glúteo no banco.',
      'Segure 1 a 2 segundos em extensão máxima no topo.'
    ],
    commonMistakes: [
      'Balançar o quadril saindo do banco para levantar o peso.',
      'Soltar o peso de uma vez na descida.'
    ],
    alternatives: [
      { name: 'Sissy Squat', equipment: 'Peso Corporal', reason: 'Alongamento brutal do reto femoral' }
    ]
  },
  {
    id: 'p3-leg-press',
    name: 'Leg Press 45°',
    machineName: 'Leg Press 45 Graus',
    category: 'Quadríceps',
    equipmentType: 'Máquina',
    targetMuscles: ['Quadríceps Completo', 'Glúteo Máximo'],
    secondaryMuscles: ['Isquiotibiais'],
    sets: 4,
    reps: '8 - 12',
    suggestedRestSeconds: 120,
    visualType: 'leg-press',
    machineAdjustment: [
      'Encosto ajustado para apoiar toda a coluna sem retroversão da pelve.',
      'Pés na largura dos ombros, pontas ligeiramente para fora.'
    ],
    executionTips: [
      'Desça até a amplitude máxima sem tirar a lombar e o glúteo do encosto.',
      'Nunca trave os joelhos no final da extensão.'
    ],
    commonMistakes: [
      'Travar os joelhos no topo (risco grave de hiperextensão).',
      'Descer com amplitude curta de 10cm ("meio leg press").'
    ],
    alternatives: [
      { name: 'Agachamento Hack', equipment: 'Hack Squat', reason: 'Maior verticalização e foco em quadríceps' },
      { name: 'Agachamento Livre', equipment: 'Barra', reason: 'Rei dos exercícios de pernas' }
    ]
  },
  {
    id: 'ex-squat-barbell',
    name: 'Agachamento Livre com Barra',
    machineName: 'Gaiola de Agachamento / Squat Rack',
    category: 'Quadríceps',
    equipmentType: 'Barra',
    targetMuscles: ['Quadríceps', 'Glúteos'],
    secondaryMuscles: ['Core', 'Adutores', 'Eretores da Espinha'],
    sets: 4,
    reps: '6 - 10',
    suggestedRestSeconds: 150,
    visualType: 'squat',
    machineAdjustment: [
      'Ajuste os suportes da barra na altura do peito médio.'
    ],
    executionTips: [
      'Apoie a barra no trapézio médio (pegada firme).',
      'Desça empurrando os joelhos para fora na direção dos dedos dos pés.',
      'Desça pelo menos até as coxas ficarem paralelas ao chão.'
    ],
    commonMistakes: [
      'Deixar os joelhos colapsarem para dentro (valgo dinâmico).',
      'Subir tirando o calcanhar do chão.'
    ],
    alternatives: [
      { name: 'Agachamento Smith', equipment: 'Smith', reason: 'Trajetória fixa guiada' }
    ]
  },
  {
    id: 'p3-bulgarian-split',
    name: 'Agachamento Búlgaro com Halteres',
    machineName: 'Banco Reto + Halteres',
    category: 'Quadríceps',
    equipmentType: 'Halteres',
    targetMuscles: ['Quadríceps', 'Glúteo Máximo'],
    secondaryMuscles: ['Estabilizadores do Core'],
    sets: 3,
    reps: '10 - 12 (cada perna)',
    suggestedRestSeconds: 75,
    visualType: 'bulgarian-split',
    machineAdjustment: [
      'Apoie a ponta de um dos pés no banco atrás de você a cerca de 2 a 3 passos de distância.'
    ],
    executionTips: [
      'Desça com o joelho traseiro em direção ao chão.',
      'O peso deve estar 85% concentrado no calcanhar da perna dianteira.'
    ],
    commonMistakes: [
      'Distância muito curta esmagando o joelho da frente.',
      'Perder o equilíbrio por falta de fixação do olhar.'
    ],
    alternatives: [
      { name: 'Avanço / Passada', equipment: 'Halteres', reason: 'Excelente dinâmica com deslocamento' }
    ]
  },
  {
    id: 'ex-hack-squat',
    name: 'Agachamento Hack Machine',
    machineName: 'Hack Squat Machine',
    category: 'Quadríceps',
    equipmentType: 'Máquina',
    targetMuscles: ['Quadríceps (Vasto Lateral e Medial)'],
    secondaryMuscles: ['Glúteos'],
    sets: 4,
    reps: '8 - 12',
    suggestedRestSeconds: 90,
    visualType: 'hack-squat',
    machineAdjustment: [
      'Apoie as costas e ombros no encosto, pés posicionados no centro da plataforma.'
    ],
    executionTips: [
      'Desça suavemente até flexionar os joelhos a 90° ou mais.',
      'Suba mantendo tensão contínua nas coxas sem esticar 100% no topo.'
    ],
    commonMistakes: [
      'Tirar os calcanhares da plataforma.'
    ],
    alternatives: [
      { name: 'Leg Press 45°', equipment: 'Máquina', reason: 'Excelente alternativa' }
    ]
  },

  // ==========================================
  // POSTERIORES DE COXA (HAMSTRINGS)
  // ==========================================
  {
    id: 'p6-lying-leg-curl',
    name: 'Mesa Flexora (Flexão de Joelhos Deitado)',
    machineName: 'Lying Leg Curl Machine',
    category: 'Posteriores',
    equipmentType: 'Máquina',
    targetMuscles: ['Isquiotibiais (Bíceps Femoral, Semitendíneo, Semimembranoso)'],
    secondaryMuscles: ['Gastrocnêmio'],
    sets: 4,
    reps: '10 - 12',
    suggestedRestSeconds: 75,
    visualType: 'lying-leg-curl',
    machineAdjustment: [
      'Alinhe o eixo da máquina com o joelho.',
      'O rolete deve apoiar logo acima do tendão de Aquiles.'
    ],
    executionTips: [
      'Pressione a pelve firmemente contra o estofado (não empine o bumbum).',
      'Puxe os calcanhares em direção aos glúteos e segure 1 segundo.'
    ],
    commonMistakes: [
      'Levantar o quadril do banco para conseguir puxar o peso.'
    ],
    alternatives: [
      { name: 'Cadeira Flexora', equipment: 'Máquina', reason: 'Maior alongamento dos isquiotibiais pelo quadril flexionado' }
    ]
  },
  {
    id: 'p6-seated-leg-curl',
    name: 'Cadeira Flexora Sentada',
    machineName: 'Seated Leg Curl Machine',
    category: 'Posteriores',
    equipmentType: 'Máquina',
    targetMuscles: ['Isquiotibiais (Ênfase no alongamento)'],
    secondaryMuscles: ['Gastrocnêmio'],
    sets: 4,
    reps: '10 - 12',
    suggestedRestSeconds: 75,
    visualType: 'seated-leg-curl',
    machineAdjustment: [
      'Abaixe a trava superior de coxas para manter as pernas presas.',
      'Ajuste o encosto de modo que as costas fiquem totalmente apoiadas.'
    ],
    executionTips: [
      'Puxe os calcanhares para baixo e para trás até a contração máxima.',
      'Volte devagar em 3 segundos sentindo o estiramento posterior.'
    ],
    commonMistakes: [
      'Deixar a trava frouxa permitindo que as coxas subam.'
    ],
    alternatives: [
      { name: 'Mesa Flexora', equipment: 'Máquina', reason: 'Excelente alternativa deitada' }
    ]
  },
  {
    id: 'p6-romanian-deadlift',
    name: 'Levantamento Terra Romeno (RDL com Barra ou Halteres)',
    machineName: 'Barra Olímpica ou Halteres',
    category: 'Posteriores',
    equipmentType: 'Barra',
    targetMuscles: ['Isquiotibiais', 'Glúteo Máximo'],
    secondaryMuscles: ['Eretores da Espinha', 'Trapézio'],
    sets: 4,
    reps: '8 - 10',
    suggestedRestSeconds: 90,
    visualType: 'romanian-deadlift',
    machineAdjustment: [
      'Pés na largura dos quadris, joelhos com leve flexão fixa (20°).'
    ],
    executionTips: [
      'Inicie empurrando o quadril para trás ("feche a gaveta com o bumbum").',
      'Mantenha a barra/halteres deslizando rente às pernas.',
      'Desça até sentir o alongamento máximo dos posteriores (abaixo do joelho).'
    ],
    commonMistakes: [
      'Arredondar as costas para descer o peso mais perto do chão.',
      'Dobrar demais os joelhos transformando em agachamento.'
    ],
    alternatives: [
      { name: 'Stiff com Halteres', equipment: 'Halteres', reason: 'Excelente controle de trajetória' }
    ]
  },

  // ==========================================
  // GLÚTEOS (GLUTES)
  // ==========================================
  {
    id: 'p6-hip-thrust',
    name: 'Elevação Pélvica com Barra (Hip Thrust)',
    machineName: 'Banco Estofado + Barra com Espuma',
    category: 'Glúteos',
    equipmentType: 'Barra',
    targetMuscles: ['Glúteo Máximo'],
    secondaryMuscles: ['Posteriores de Coxa', 'Quadríceps'],
    sets: 4,
    reps: '8 - 12',
    suggestedRestSeconds: 90,
    visualType: 'hip-thrust',
    machineAdjustment: [
      'Apoie as escápulas na borda do banco.',
      'Coloque a barra protegida com almofada na dobra do quadril.'
    ],
    executionTips: [
      'Pés firmes no chão de modo que os joelhos fiquem a 90° no topo.',
      'Suba o quadril até ficar em linha reta e aperte os glúteos por 1 segundo no topo.',
      'Queixo apontando para o peito.'
    ],
    commonMistakes: [
      'Hiperestender a lombar jogando a cabeça para trás.',
      'Pés muito perto ou muito longe do banco.'
    ],
    alternatives: [
      { name: 'Elevação Pélvica na Máquina', equipment: 'Máquina', reason: 'Setup muito mais rápido e seguro' }
    ]
  },
  {
    id: 'ex-abductor-machine',
    name: 'Cadeira Abdutora',
    machineName: 'Abductor Machine',
    category: 'Glúteos',
    equipmentType: 'Máquina',
    targetMuscles: ['Glúteo Médio', 'Glúteo Mínimo', 'Tensor da Fáscia Lata'],
    secondaryMuscles: [],
    sets: 4,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'abductor',
    machineAdjustment: [
      'Ajuste o assento para manter as costas apoiadas.',
      'Feche as hastes para iniciar com o músculo alongado.'
    ],
    executionTips: [
      'Abra as pernas com força constante.',
      'Incline o tronco levemente para frente para aumentar o recrutamento do glúteo médio.'
    ],
    commonMistakes: [
      'Usar impulso para abrir e bater os pesos na volta.'
    ],
    alternatives: [
      { name: 'Abdução no Cabo com Tornozeleira', equipment: 'Cabo', reason: 'Isolamento unilateral' }
    ]
  },
  {
    id: 'ex-adductor-machine',
    name: 'Cadeira Adutora',
    machineName: 'Adductor Machine',
    category: 'Glúteos',
    equipmentType: 'Máquina',
    targetMuscles: ['Adutores da Coxa (Adutor Magno, Longo e Curto)'],
    secondaryMuscles: ['Grácil', 'Pectíneo'],
    sets: 4,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'adductor',
    machineAdjustment: [
      'Abra as almofadas na amplitude máxima confortável para esticar os adutores.',
      'Apoie os pés nos suportes e mantenha as costas no encosto.'
    ],
    executionTips: [
      'Feche as pernas controladamente focando na contração da virilha e interior da coxa.',
      'Segure 1 segundo na posição fechada antes de abrir lentamente.'
    ],
    commonMistakes: [
      'Deixar os pesos baterem na volta perdendo tensão.',
      'Arquear o tronco para conseguir juntar as almofadas.'
    ],
    alternatives: [
      { name: 'Adução na Polia com Tornozeleira', equipment: 'Cabo', reason: 'Excelente trabalho unilateral e estabilização' }
    ]
  },

  // ==========================================
  // PANTURRILHAS (CALVES)
  // ==========================================
  {
    id: 'p3-calf-raise',
    name: 'Panturrilha em Pé no Smith ou Bloco',
    machineName: 'Smith Machine / Bloco de Apoio',
    category: 'Panturrilhas',
    equipmentType: 'Máquina',
    targetMuscles: ['Gastrocnêmio (Medial e Lateral)'],
    secondaryMuscles: ['Sóleo'],
    sets: 4,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'calf-raise',
    machineAdjustment: [
      'Apoie a bola dos pés na borda do bloco com calcanhares livres.'
    ],
    executionTips: [
      'Desça o calcanhar ao ponto máximo sentindo alongar a fáscia plantar.',
      'Suba na ponta dos pés e segure 2 segundos na contração máxima.'
    ],
    commonMistakes: [
      'Fazer quiques rápidos sem pausa excêntrica.'
    ],
    alternatives: [
      { name: 'Panturrilha no Leg Press', equipment: 'Leg Press', reason: 'Segurança articular total' }
    ]
  },
  {
    id: 'p6-seated-calf',
    name: 'Panturrilha Sentado (Gêmeos / Cadeira de Sóleo)',
    machineName: 'Seated Calf Raise Machine',
    category: 'Panturrilhas',
    equipmentType: 'Máquina',
    targetMuscles: ['Sóleo (Músculo profundo da panturrilha)'],
    secondaryMuscles: [],
    sets: 4,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'seated-calf',
    machineAdjustment: [
      'Apoie as almofadas na parte inferior da coxa, logo acima dos joelhos.'
    ],
    executionTips: [
      'Amplitude completa: desça tudo, suba tudo.',
      'Mantenha 2 segundos de parada no fundo e no topo.'
    ],
    commonMistakes: [
      'Usar carga tão alta que o movimento vira apenas um tremor de 2cm.'
    ],
    alternatives: [
      { name: 'Panturrilha em Pé', equipment: 'Máquina', reason: 'Foco no gastrocnêmio' }
    ]
  },
  {
    id: 'ex-leg-press-calf',
    name: 'Panturrilha no Leg Press 45°',
    machineName: 'Leg Press 45°',
    category: 'Panturrilhas',
    equipmentType: 'Máquina',
    targetMuscles: ['Gastrocnêmio', 'Sóleo'],
    secondaryMuscles: ['Tibial Anterior'],
    sets: 4,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'calf-raise',
    machineAdjustment: [
      'Apoie apenas a ponta dos pés na borda inferior da plataforma do Leg Press.',
      'Mantenha as travas de segurança de emergência acionadas na altura correta.'
    ],
    executionTips: [
      'Mantenha os joelhos quase esticados mas destravados (leve flexão de segurança de 5°).',
      'Faça flexão plantar empurrando a plataforma com as pontas dos pés e alongue ao máximo na volta.'
    ],
    commonMistakes: [
      'Deixar os pés escorregarem da borda.',
      'Travar totalmente os joelhos esticados.'
    ],
    alternatives: [
      { name: 'Panturrilha em Pé no Smith', equipment: 'Smith', reason: 'Movimento vertical livre' }
    ]
  },

  // ==========================================
  // ABDÔMEN & CORE (ABS)
  // ==========================================
  {
    id: 'p3-abs-crunch',
    name: 'Abdominal Crunch no Cabo com Corda',
    machineName: 'Polia Alta + Corda',
    category: 'Abdômen',
    equipmentType: 'Cabo/Polia',
    targetMuscles: ['Reto Abdominal'],
    secondaryMuscles: ['Oblíquos'],
    sets: 4,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'abs-cable',
    machineAdjustment: [
      'Polia na altura máxima com corda conectada.',
      'Ajoelhe-se no colchonete a cerca de meio metro da máquina.'
    ],
    executionTips: [
      'Segure as pontas da corda coladas na têmpora/queixo.',
      'Flexione a coluna vertebral enrolando o tronco em direção aos joelhos.',
      'Solte o ar na descida esvaziando o abdômen.'
    ],
    commonMistakes: [
      'Sentar nos calcanhares movendo o quadril (vira exercício de quadríceps/quadril).'
    ],
    alternatives: [
      { name: 'Abdominal Máquina', equipment: 'Máquina', reason: 'Estabilidade guiada' }
    ]
  },
  {
    id: 'ex-hanging-leg-raise',
    name: 'Elevação de Pernas na Barra Fixa / Capitão',
    machineName: 'Barra Fixa ou Cadeira do Capitão',
    category: 'Abdômen',
    equipmentType: 'Peso Corporal',
    targetMuscles: ['Reto Abdominal Inferior', 'Flexores do Quadril'],
    secondaryMuscles: ['Oblíquos'],
    sets: 3,
    reps: '10 - 15',
    suggestedRestSeconds: 60,
    visualType: 'hanging-leg-raise',
    machineAdjustment: [
      'Pendure-se na barra ou apoie os antebraços nos suportes da cadeira capitão.'
    ],
    executionTips: [
      'Eleve os joelhos enrolando a pelve para cima (não mexa apenas as pernas).',
      'Controle a descida para não balançar como pêndulo.'
    ],
    commonMistakes: [
      'Balançar o corpo para usar inércia.'
    ],
    alternatives: [
      { name: 'Abdominal Crunch no Chão', equipment: 'Colchonete', reason: 'Fácil para iniciantes' }
    ]
  },
  {
    id: 'ex-plank',
    name: 'Prancha Frontal Estática',
    machineName: 'Colchonete no Solo',
    category: 'Abdômen',
    equipmentType: 'Peso Corporal',
    targetMuscles: ['Transverso do Abdômen', 'Reto Abdominal', 'Core Estabilizador'],
    secondaryMuscles: ['Glúteos', 'Ombros'],
    sets: 3,
    reps: '45 - 60 seg',
    suggestedRestSeconds: 60,
    visualType: 'plank',
    machineAdjustment: [
      'Apoie os antebraços e as pontas dos pés no solo.'
    ],
    executionTips: [
      'Mantenha o corpo perfeitamente reto em linha horizontal.',
      'Aperte o glúteo e puxe o umbigo para dentro em direção à coluna.'
    ],
    commonMistakes: [
      'Deixar o quadril cair ou empinar o glúteo muito alto.'
    ],
    alternatives: [
      { name: 'Ab Wheel (Roda Abdominal)', equipment: 'Roda Abdominal', reason: 'Nível avançado de sobrecarga' }
    ]
  },
  {
    id: 'ex-cable-crunch',
    name: 'Crunch Abdominal Ajoelhado na Polia',
    machineName: 'Polia Alta + Corda',
    category: 'Abdômen',
    equipmentType: 'Cabo/Polia',
    targetMuscles: ['Reto Abdominal (Ênfase Superior e Média)'],
    secondaryMuscles: ['Oblíquos'],
    sets: 4,
    reps: '12 - 15',
    suggestedRestSeconds: 60,
    visualType: 'cable-crunch',
    machineAdjustment: [
      'Prenda a corda na roldana mais alta.',
      'Ajoelhe-se de frente ou de costas para o aparelho com o quadril imóvel.'
    ],
    executionTips: [
      'Mãos presas nas laterais da cabeça, flexione o tronco enrolando a espinha em direção ao chão.',
      'Mantenha os quadris travados sem sentar nos calcanhares.'
    ],
    commonMistakes: [
      'Puxar com a força dos braços em vez de flexionar a coluna com o abdômen.',
      'Movimentar o quadril para frente e para trás.'
    ],
    alternatives: [
      { name: 'Abdominal na Máquina Articulada', equipment: 'Máquina', reason: 'Caminho biomecânico guiado' }
    ]
  }
];

export const MUSCLE_CATEGORIES: MuscleCategory[] = [
  'Peito',
  'Costas',
  'Ombros',
  'Bíceps',
  'Tríceps',
  'Quadríceps',
  'Posteriores',
  'Glúteos',
  'Panturrilhas',
  'Abdômen'
];
