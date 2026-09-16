import type { WorkoutDay } from '../types/workout';

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    dayNumber: 1,
    key: 'segunda',
    name: 'Push A (Peito, Ombros e Tríceps)',
    focus: 'Peitoral Completo, Deltoide Lateral/Anterior & Tríceps',
    tagline: 'Foco em espessura de peito, amplitude e tríceps pesado',
    estimatedMinutes: 65,
    coachTips: [
      'Retraia e deprima as escápulas antes de qualquer pressão de supino para proteger seus ombros.',
      'Controle a fase excêntrica (descida do peso) em 2 a 3 segundos para maximizar o dano muscular produtivo.',
      'No final de cada série, busque chegar próximo à falha mecânica (RPE 8-9).'
    ],
    stretches: [
      {
        id: 'str-1-1',
        name: 'Manguito Rotador Dinâmico (Rotação Externa)',
        targetJoint: 'Ombros e Manguito Rotador',
        durationSeconds: 40,
        instruction: 'Mantenha os cotovelos colados ao tronco a 90°. Gire as mãos para fora abrindo o peito, usando um elástico leve ou sem peso para irrigar a articulação glenoumeral.',
        focusTip: 'Não afaste o cotovelo do corpo. Movimento controlado e fluido.',
        iconType: 'shoulders'
      },
      {
        id: 'str-1-2',
        name: 'Alongamento Dinâmico de Peitoral em Vão/Poste',
        targetJoint: 'Peitoral Maior e Menor',
        durationSeconds: 40,
        instruction: 'Apoie o antebraço em uma coluna ou máquina com cotovelo a 90°. Dê um passo à frente girando suavemente o tronco para sentir a fibra peitoral se estender.',
        focusTip: 'Faça suaves pulsos sem trancos, respirando fundo na fase de alongamento.',
        iconType: 'chest'
      },
      {
        id: 'str-1-3',
        name: 'Circundução Escapular e de Ombros',
        targetJoint: 'Cintura Escapular',
        durationSeconds: 30,
        instruction: 'Faça círculos amplos com os ombros para trás 15 vezes e depois para frente 15 vezes, focando em apertar as escápulas.',
        focusTip: 'Libera a fáscia e prepara o peito para suportar carga pesada.',
        iconType: 'shoulders'
      }
    ],
    exercises: [
      {
        id: 'p1-incline-db',
        name: 'Supino Inclinado com Halteres',
        machineName: 'Banco Inclinado (Ajuste 30° a 45°)',
        targetMuscles: ['Peitoral Superior (Clavicular)', 'Deltoide Anterior'],
        secondaryMuscles: ['Tríceps Braquial'],
        sets: 4,
        reps: '8 - 10',
        suggestedRestSeconds: 90,
        visualType: 'incline-bench',
        machineAdjustment: [
          'Incline o encosto do banco entre 30° e 45° (inclinações maiores que 45° jogam o esforço nos ombros).',
          'Ajuste o assento ligeiramente inclinado para cima para não escorregar durante o exercício.'
        ],
        executionTips: [
          'Apoie os halteres nas coxas para chutar com os joelhos ao deitar.',
          'Pés firmes no chão gerando leg drive.',
          'Desça os halteres em formato de seta (cotovelos a ~60° do tronco, nunca a 90° abertos).',
          'Alongue bem o peitoral na base antes de subir com explosão controlada.'
        ],
        commonMistakes: [
          'Bater os halteres no topo (perde tensão muscular).',
          'Abrir os cotovelos em linha com as orelhas (estresse excessivo no manguito).'
        ],
        alternatives: [
          { name: 'Supino Inclinado na Máquina Articulada', equipment: 'Máquina Convergente', reason: 'Excelente estabilidade caso não encontre o par de halteres ideal.' },
          { name: 'Supino Inclinado no Smith', equipment: 'Barra Guiada', reason: 'Trajetória fixa que permite focar 100% na conexão mente-músculo.' }
        ]
      },
      {
        id: 'p1-peck-deck',
        name: 'Peck Deck / Voador Máquina',
        machineName: 'Máquina Flye / Peck Deck',
        targetMuscles: ['Peitoral Médio', 'Esterno-costal'],
        secondaryMuscles: ['Deltoide Anterior'],
        sets: 3,
        reps: '10 - 12',
        suggestedRestSeconds: 75,
        visualType: 'peck-deck',
        machineAdjustment: [
          'Ajuste a altura do banco para que as manoplas fiquem na linha média do seu peito (mamilos).',
          'Regule o ângulo dos braços para uma amplitude que permita esticar o peito sem estalar o ombro.'
        ],
        executionTips: [
          'Peito estufado e ombros para trás encostados no apoio.',
          'Mantenha uma leve flexão nos cotovelos durante todo o arco de movimento.',
          'Aperte o peitoral por 1 segundo no pico de contração máxima ao fechar.'
        ],
        commonMistakes: [
          'Deixar os ombros avançarem para frente ao fechar as manoplas.',
          'Soltar o peso rápido sem resistir ao retorno excêntrico.'
        ],
        alternatives: [
          { name: 'Crucifixo com Halteres no Banco Reto', equipment: 'Halteres + Banco', reason: 'Ótima alternativa livre com grande amplitude de alongamento.' },
          { name: 'Crossover na Polia Média', equipment: 'Cross Station', reason: 'Mantém tensão contínua na contração.' }
        ]
      },
      {
        id: 'p1-chest-press',
        name: 'Supino Reto na Máquina Articulada',
        machineName: 'Chest Press Machine',
        targetMuscles: ['Peitoral Maior', 'Tríceps'],
        secondaryMuscles: ['Deltoide Anterior'],
        sets: 3,
        reps: '8 - 10',
        suggestedRestSeconds: 90,
        visualType: 'chest-press',
        machineAdjustment: [
          'Regule a altura do assento para que as manoplas fiquem alinhadas com a parte inferior/média do tórax.',
          'Se a máquina tiver pedal de início, use-o para iniciar sem arriscar o ombro.'
        ],
        executionTips: [
          'Mantenha as costas e glúteos bem colados no encosto.',
          'Empurre com força controlada sem travar os cotovelos totalmente no final (mantenha a tensão viva no peito).',
          'Sinta as fibras do peitoral empurrando a carga.'
        ],
        commonMistakes: [
          'Tirar as costas do encosto para conseguir mais força de alavanca.',
          'Descer pouco a carga sem aproveitar toda a amplitude articular.'
        ],
        alternatives: [
          { name: 'Supino Reto com Barra', equipment: 'Banco de Supino', reason: 'Clássico construtor de força e densidade peitoral.' },
          { name: 'Supino Reto com Halteres', equipment: 'Halteres + Banco', reason: 'Permite rotação natural do punho e amplitude maior.' }
        ]
      },
      {
        id: 'p1-lateral-raise',
        name: 'Elevação Lateral com Halteres / Polia',
        machineName: 'Halteres ou Polia Baixa',
        targetMuscles: ['Deltoide Lateral (Ombro 3D)'],
        secondaryMuscles: ['Trapézio Superior (mínimo)'],
        sets: 4,
        reps: '12 - 15',
        suggestedRestSeconds: 60,
        visualType: 'lateral-raise',
        machineAdjustment: [
          'Se for usar polia: ajuste a roldana na altura do joelho ou no ponto mais baixo com pegador estribo.',
          'Se for com halteres: escolha um peso que não exija impulso com a lombar.'
        ],
        executionTips: [
          'Incline o tronco 10° levemente à frente para alinhar a gravidade com a fibra do deltoide lateral.',
          'Pense em "jogar o peso para as paredes" e não para cima.',
          'Suba até a altura da linha dos ombros com o cotovelo levemente flexionado.'
        ],
        commonMistakes: [
          'Balançar o corpo e jogar a coluna para trás.',
          'Encolher os ombros ativando o trapézio em vez do deltoide lateral.'
        ],
        alternatives: [
          { name: 'Elevação Lateral na Máquina de Ombros', equipment: 'Lateral Raise Machine', reason: 'Isolamento perfeito com almofada apoiada no braço.' },
          { name: 'Elevação Lateral Unilateral na Polia', equipment: 'Cabo', reason: 'Tensão do início ao fim do movimento.' }
        ]
      },
      {
        id: 'p1-triceps-pushdown',
        name: 'Tríceps Corda na Polia Alta',
        machineName: 'Crossover / Polia Alta',
        targetMuscles: ['Tríceps (Cabeça Lateral e Medial)'],
        secondaryMuscles: ['Antebraço'],
        sets: 3,
        reps: '10 - 12',
        suggestedRestSeconds: 60,
        visualType: 'triceps-pushdown',
        machineAdjustment: [
          'Fixe a corda dupla no mosquetão na posição mais alta da torre de polia.',
          'Coloque o pino de peso seguro na torre.'
        ],
        executionTips: [
          'Dê um pequeno passo para trás, incline o tronco levemente à frente e cole os cotovelos na cintura.',
          'Estenda os cotovelos para baixo e, no final, abra as pontas da corda para fora para máxima contração.',
          'Volte o antebraço até passar de 90° sentindo o tríceps alongar.'
        ],
        commonMistakes: [
          'Mexer os cotovelos para frente e para trás como se estivesse remando.',
          'Usar o peso do corpo caindo em cima da corda.'
        ],
        alternatives: [
          { name: 'Tríceps Barra Reta ou V na Polia', equipment: 'Barra V', reason: 'Permite mais carga com pegada estável.' },
          { name: 'Mergulho em Paralelas / Banco', equipment: 'Barras Paralelas', reason: 'Excelente exercício com peso corporal para volume.' }
        ]
      },
      {
        id: 'p1-triceps-extension',
        name: 'Tríceps Francês Unilateral na Polia ou Halter',
        machineName: 'Polia Média / Banco com Halter',
        targetMuscles: ['Tríceps (Cabeça Longa)'],
        secondaryMuscles: ['Estabilizadores de Ombro'],
        sets: 3,
        reps: '10 - 12',
        suggestedRestSeconds: 60,
        visualType: 'triceps-extension',
        machineAdjustment: [
          'Se na polia: ajuste na altura do ombro ou peito. Segure a corda ou manopla puxando por cima da cabeça.',
          'Se com halter: sente em um banco com encosto curto para manter a postura ereta.'
        ],
        executionTips: [
          'A cabeça longa do tríceps só atinge alongamento completo com o braço elevado acima da cabeça.',
          'Desça o peso flexionando o cotovelo atrás da nuca, sentindo o músculo esticar bastante.',
          'Estenda o braço sem afastar o cotovelo da cabeça.'
        ],
        commonMistakes: [
          'Abrir os cotovelos em excesso para os lados.',
          'Movimentar a coluna lombar em vez de movimentar apenas a articulação do cotovelo.'
        ],
        alternatives: [
          { name: 'Tríceps Testa com Barra W', equipment: 'Barra W + Banco', reason: 'Grande construtor de espessura da cabeça longa do tríceps.' },
          { name: 'Tríceps Coice com Cabo', equipment: 'Polia Baixa', reason: 'Pico de contração com cotovelo fixo atrás do corpo.' }
        ]
      }
    ],
    cardio: {
      type: 'Esteira Inclinada LISS',
      title: 'Cardio Pós-Treino: Caminhada Inclinada (LISS)',
      durationMinutes: 15,
      intensity: 'Leve a Moderada',
      targetPace: '4.8 - 5.4 km/h | Inclinação 6% a 8%',
      instruction: 'Suba na esteira, regule a velocidade em passo firme sem precisar correr e eleve a inclinação para 6% a 8%. Mantenha os braços livres sem se segurar no painel para ativar o core.',
      hypertrophyReason: 'A caminhada inclinada em baixa intensidade (LISS) ativa a queima de gordura e circulação sem gerar impacto articular e sem induzir a via catabólica AMPK, preservando 100% dos ganhos de massa muscular.'
    }
  },
  {
    dayNumber: 2,
    key: 'terca',
    name: 'Pull A (Costas, Deltoide Posterior e Bíceps)',
    focus: 'Largura Dorsal, Densidade de Costas & Bíceps Completo',
    tagline: 'Construindo o formato V-Taper clássico com pegadas controladas',
    estimatedMinutes: 65,
    coachTips: [
      'Inicie todo movimento de puxada acionando as escápulas antes de dobrar os braços (iniciação escapular).',
      'Pense nas mãos apenas como ganchos: puxe o peso com os cotovelos para isolar as dorsais.',
      'Use straps se a sua pegada cansar antes do músculo das costas atingir a falha.'
    ],
    stretches: [
      {
        id: 'str-2-1',
        name: 'Dead Hang (Descompressão Pendurado na Barra)',
        targetJoint: 'Coluna Lombar e Fáscia Dorsal',
        durationSeconds: 35,
        instruction: 'Segure em uma barra fixa com pegada na largura dos ombros e deixe o peso do corpo tracionar suavemente a coluna para baixo, relaxando o quadril.',
        focusTip: 'Respire profundamente pelo diafragma soltando a tensão das vértebras.',
        iconType: 'back'
      },
      {
        id: 'str-2-2',
        name: 'Gato-Camelo Torácico',
        targetJoint: 'Mobilidade da Coluna Vertebral',
        durationSeconds: 40,
        instruction: 'Em 4 apoios, alterne entre arquear as costas para cima como um gato assustado (soltando o ar) e afundar a coluna olhando para frente (puxando o ar).',
        focusTip: 'Movimento contínuo e suave, sem forçar o pescoço.',
        iconType: 'back'
      },
      {
        id: 'str-2-3',
        name: 'Alongamento Dinâmico de Bíceps e Antebraço',
        targetJoint: 'Flexores do Cotovelo e Punho',
        durationSeconds: 30,
        instruction: 'Estenda o braço à frente com a palma para cima e, com a outra mão, puxe suavemente os dedos para baixo alongando a fáscia do antebraço e bíceps.',
        focusTip: 'Excelente para prevenir epicondilite ao treinar bíceps pesado.',
        iconType: 'shoulders'
      }
    ],
    exercises: [
      {
        id: 'p2-lat-pulldown',
        name: 'Puxada Alta Aberta na Polia (Lat Pulldown)',
        machineName: 'Torre de Puxada Alta / Lat Pulldown',
        targetMuscles: ['Grande Dorsal (Asas)', 'Redondo Maior'],
        secondaryMuscles: ['Bíceps Braquial', 'Deltoide Posterior'],
        sets: 4,
        reps: '8 - 10',
        suggestedRestSeconds: 90,
        visualType: 'lat-pulldown',
        machineAdjustment: [
          'Regule a almofada de coxas para que suas pernas fiquem firmes e travadas sem folga.',
          'Escolha uma barra longa com pegada pronada ligeiramente mais larga que os ombros.'
        ],
        executionTips: [
          'Incline o tronco levemente para trás (~15°) e abra o peito.',
          'Puxe a barra em direção à clavícula/parte superior do peitoral, puxando pelos cotovelos para baixo e para dentro.',
          'Suba controlando a subida até sentir a dorsal esticar no topo.'
        ],
        commonMistakes: [
          'Dar um tranco violento com a lombar deitando quase reto no banco.',
          'Puxar a barra atrás do pescoço (risco alto para a coluna cervical e manguito).'
        ],
        alternatives: [
          { name: 'Barra Fixa com Pegada Aberta', equipment: 'Barra Fixa', reason: 'Excelente exercício com peso corporal para amplitude dorsal.' },
          { name: 'Puxada Articulada Convergente', equipment: 'Máquina Plate-Loaded', reason: 'Trajetória anatômica convergente que acompanha as fibras dorsais.' }
        ]
      },
      {
        id: 'p2-seated-cable-row',
        name: 'Remada Baixa com Triângulo (Polia Sentado)',
        machineName: 'Máquina de Remada Baixa / Low Row',
        targetMuscles: ['Romboides', 'Trapézio Médio/Inferior', 'Dorsais'],
        secondaryMuscles: ['Bíceps', 'Eretores da Espinha'],
        sets: 3,
        reps: '10 - 12',
        suggestedRestSeconds: 75,
        visualType: 'seated-cable-row',
        machineAdjustment: [
          'Conecte a manopla de triângulo (pegada neutra) no cabo baixo.',
          'Apoie os pés na plataforma mantendo os joelhos suavemente flexionados (nunca travados).'
        ],
        executionTips: [
          'Mantenha a postura ereta e coluna neutra durante todo o exercício.',
          'Puxe o triângulo em direção ao umbigo, espremendo as escápulas uma contra a outra atrás.',
          'Volte permitindo que as escápulas se abram ligeiramente sem curvar a coluna lombar.'
        ],
        commonMistakes: [
          'Balançar a coluna para frente e para trás a cada repetição como se estivesse remando no barco.',
          'Subir os ombros perto das orelhas.'
        ],
        alternatives: [
          { name: 'Remada na Máquina com Apoio no Peito', equipment: 'Chest-Supported Row', reason: 'Elimina totalmente a fadiga da lombar.' },
          { name: 'Remada Unilateral com Halter (Serrote)', equipment: 'Halter + Banco', reason: 'Permite corrigir assimetrias musculares.' }
        ]
      },
      {
        id: 'p2-reverse-fly',
        name: 'Crucifixo Invertido na Máquina Peck Deck',
        machineName: 'Máquina Flye / Reversa',
        targetMuscles: ['Deltoide Posterior', 'Romboides'],
        secondaryMuscles: ['Trapézio Médio'],
        sets: 3,
        reps: '12 - 15',
        suggestedRestSeconds: 60,
        visualType: 'reverse-fly',
        machineAdjustment: [
          'Sente-se de frente para o encosto da máquina.',
          'Ajuste os braços da máquina na posição mais recuada para que as manoplas comecem na frente.',
          'Regule o banco para que as manoplas fiquem na linha dos ombros.'
        ],
        executionTips: [
          'Peito colado no apoio, braços com leve flexão no cotovelo.',
          'Abra os braços para fora focando em contrair a parte de trás do ombro.',
          'Não deixe o pescoço projetar para a frente.'
        ],
        commonMistakes: [
          'Pegar peso demais e fazer um movimento curto e espasmódico.',
          'Usar apenas a força do trapézio e escápula em vez de focar no deltoide posterior.'
        ],
        alternatives: [
          { name: 'Face Pull na Polia com Corda', equipment: 'Polia Alta + Corda', reason: 'Excelente para saúde postural e deltoide posterior.' },
          { name: 'Crucifixo Invertido com Halteres Inclinado', equipment: 'Halteres + Banco', reason: 'Ótima opção livre para sentir a musculatura.' }
        ]
      },
      {
        id: 'p2-cable-biceps-curl',
        name: 'Rosca Direta na Polia com Barra W / Reta',
        machineName: 'Polia Baixa / Torre de Cabos',
        targetMuscles: ['Bíceps Braquial (Cabeça Curta e Longa)'],
        secondaryMuscles: ['Braquiorradial'],
        sets: 3,
        reps: '10 - 12',
        suggestedRestSeconds: 60,
        visualType: 'preacher-curl',
        machineAdjustment: [
          'Encaixe a barra W ou barra reta no mosquetão inferior da polia.',
          'Fique em pé a cerca de meio metro da máquina com pés estáveis.'
        ],
        executionTips: [
          'Cotovelos alinhados e firmes nas laterais da costela.',
          'Flexione os braços levando a barra em direção ao peito sem mexer os cotovelos.',
          'A polia garante que haja tensão constante mesmo no topo do movimento (diferente do halter).'
        ],
        commonMistakes: [
          'Jogar os cotovelos para frente no topo do movimento.',
          'Arquear a coluna lombar para impulsionar a barra.'
        ],
        alternatives: [
          { name: 'Rosca Direta com Barra W Livre', equipment: 'Barra W + Anilhas', reason: 'Clássico peso livre para progressão de carga.' },
          { name: 'Rosca Direta com Halteres com Supinação', equipment: 'Halteres', reason: 'Permite rotação anatômica do punho durante a subida.' }
        ]
      },
      {
        id: 'p2-hammer-curl',
        name: 'Rosca Martelo com Halteres',
        machineName: 'Halteres Livres',
        targetMuscles: ['Braquial (Espessura do Braço)', 'Braquiorradial'],
        secondaryMuscles: ['Bíceps Braquial'],
        sets: 3,
        reps: '10 - 12',
        suggestedRestSeconds: 60,
        visualType: 'incline-curl',
        machineAdjustment: [
          'Selecione halteres que permitam execução limpa sem gangorra.',
          'Pode ser feito em pé ou sentado com as costas apoiadas.'
        ],
        executionTips: [
          'Segure os halteres com pegada neutra (palmas das mãos viradas uma para a outra o tempo todo).',
          'Suba os halteres controladamente até a altura do peito/ombro.',
          'Esse exercício "empurra" o bíceps para cima, deixando o braço visualmente muito mais grosso.'
        ],
        commonMistakes: [
          'Girar o punho no meio do caminho (deve permanecer neutro como se segurasse um martelo).',
          'Balançar o quadril para iniciar o movimento.'
        ],
        alternatives: [
          { name: 'Rosca Martelo com Corda na Polia Baixa', equipment: 'Polia + Corda', reason: 'Tensão linear contínua sem pontos mortos.' },
          { name: 'Rosca Inversa com Barra W', equipment: 'Barra W', reason: 'Foco intenso no antebraço e braquiorradial.' }
        ]
      }
    ],
    cardio: {
      type: 'Transport / Elíptico Suave',
      title: 'Cardio Pós-Treino: Elíptico / Cross Trainer',
      durationMinutes: 15,
      intensity: 'Leve a Moderada',
      targetPace: 'Cadência constante de 50 a 60 rpm',
      instruction: 'Suba no elíptico, coloque resistência nível 4 a 6 (leve) e mantenha um ritmo fluido usando as manoplas móveis para estimular a oxigenação sistêmica.',
      hypertrophyReason: 'Zero impacto articular nos tornozelos e joelhos, promovendo reciclagem de lactato e acelerando o fluxo de nutrientes para a musculatura das costas e braços.'
    }
  },
  {
    dayNumber: 3,
    key: 'quarta',
    name: 'Legs A (Foco Quadríceps, Panturrilhas e Abdômen)',
    focus: 'Desenvolvimento de Quadríceps, Força de Base & Abdômen',
    tagline: 'O treino anabólico mais importante da semana para estímulo hormonal',
    estimatedMinutes: 70,
    coachTips: [
      'Faça aquecimento progressivo de carga (warm-up sets) antes de colocar o peso principal no Leg Press.',
      'A amplitude completa constrói muito mais músculo do que meia repetição com excesso de peso.',
      'Controle a respiração: expire na subida e inspire na descida sustentando a pressão intra-abdominal (manobra de Valsalva).'
    ],
    stretches: [
      {
        id: 'str-3-1',
        name: 'Mobilidade de Tornozelo (Dorsiflexão na Parede)',
        targetJoint: 'Articulação Talocrural (Tornozelo)',
        durationSeconds: 40,
        instruction: 'Coloque o pé a cerca de 10 cm da parede e empurre o joelho para frente em direção à parede sem levantar o calcanhar do chão. Segure 3 segundos e retorne.',
        focusTip: 'Tornozelo móvel permite agachar muito mais fundo sem dobrar a coluna.',
        iconType: 'ankles'
      },
      {
        id: 'str-3-2',
        name: 'Mobilidade de Quadril 90/90 no Chão',
        targetJoint: 'Quadril e Fêmur',
        durationSeconds: 45,
        instruction: 'Sente-se no chão com uma perna flexionada a 90° à frente e a outra a 90° de lado. Gire suavemente o tronco em direção ao joelho da frente e depois troque o lado.',
        focusTip: 'Libera a rotação interna e externa do fêmur na fossa do acetábulo.',
        iconType: 'hips'
      },
      {
        id: 'str-3-3',
        name: 'Balanço Ativo de Pernas e Glúteos',
        targetJoint: 'Flexores de Quadril',
        durationSeconds: 30,
        instruction: 'Apoie uma mão na parede ou máquina e balance a perna suavemente para frente e para trás, aumentando a amplitude gradualmente.',
        focusTip: 'Aquece a musculatura do quadríceps e posterior antes das cargas.',
        iconType: 'hips'
      }
    ],
    exercises: [
      {
        id: 'p3-leg-extension',
        name: 'Cadeira Extensora (Pré-Exaustão Controlada)',
        machineName: 'Cadeira Extensora / Leg Extension',
        targetMuscles: ['Quadríceps (Reto Femoral e Vasto Lateral)'],
        secondaryMuscles: ['Vasto Medial'],
        sets: 3,
        reps: '12 - 15',
        suggestedRestSeconds: 75,
        visualType: 'leg-extension',
        machineAdjustment: [
          'Ajuste o encosto de costas para que a articulação do seu joelho fique exatamente alinhada com o eixo redondo de giro da máquina.',
          'O rolo acolchoado dos pés deve apoiar logo acima do peito do pé (não na canela).'
        ],
        executionTips: [
          'Segure firme nas manoplas laterais puxando o quadril para baixo contra o assento.',
          'Estenda as pernas controladamente até a contração máxima e segure 1 segundo no topo.',
          'Desça o peso resistindo à gravidade em 2 segundos.'
        ],
        commonMistakes: [
          'Deixar a bunda descolar do banco no momento do esforço.',
          'Dar tranco com a coluna e arremessar o rolo para cima.'
        ],
        alternatives: [
          { name: 'Sissy Squat Guiado', equipment: 'Banco Sissy', reason: 'Alongamento brutal de quadríceps com peso corporal.' },
          { name: 'Extensora Unilateral', equipment: 'Cadeira Extensora', reason: 'Equilíbrio de força entre perna direita e esquerda.' }
        ]
      },
      {
        id: 'p3-leg-press',
        name: 'Leg Press 45°',
        machineName: 'Leg Press 45 Graus',
        targetMuscles: ['Quadríceps Completo', 'Glúteo Máximo'],
        secondaryMuscles: ['Adutores', 'Isquiotibiais'],
        sets: 4,
        reps: '8 - 10',
        suggestedRestSeconds: 120,
        visualType: 'leg-press',
        machineAdjustment: [
          'Regule a inclinação do encosto para uma posição confortável que não curve sua lombar na descida.',
          'Posicione os pés na plataforma na largura dos ombros, pontas levemente apontadas para fora (10-15°).'
        ],
        executionTips: [
          'Destrave a segurança e segure firmemente nas alavancas laterais mantendo a pelve travada no banco.',
          'Desça o carrinho até um ângulo de cerca de 90° ou até o ponto máximo em que sua lombar permaneça 100% colada no encosto.',
          'Empurre a plataforma pelo meio do pé e calcanhar sem hiperestender (travar) o joelho no topo.'
        ],
        commonMistakes: [
          'Tirar a lombar do encosto (retroversão pélvica) - causa principal de dor lombar em academias.',
          'Colocar anilhas demais e descer apenas 5 centímetros (ego lifting).'
        ],
        alternatives: [
          { name: 'Agachamento no Hack Machine', equipment: 'Hack Machine', reason: 'Excelente controle de trajetória e segurança com cargas pesadas.' },
          { name: 'Agachamento Livre com Barra', equipment: 'Gaiola de Agachamento', reason: 'O exercício rei para densidade e força funcional.' }
        ]
      },
      {
        id: 'p3-bulgarian-split',
        name: 'Agachamento Búlgaro ou Hack Machine',
        machineName: 'Banco Reto com Halteres / Hack Machine',
        targetMuscles: ['Quadríceps', 'Glúteo Médio e Máximo'],
        secondaryMuscles: ['Posterior de Coxa'],
        sets: 3,
        reps: '8 - 10 cada perna',
        suggestedRestSeconds: 90,
        visualType: 'bulgarian-split',
        machineAdjustment: [
          'Apoie o peito do pé de trás na beirada de um banco a cerca de 40-50 cm do chão.',
          'Dê um passo à frente com a perna da frente de forma que, ao agachar, o joelho fique em ~90°.'
        ],
        executionTips: [
          'Mantenha o tronco levemente inclinado à frente para descarregar o peso no quadríceps e glúteo da perna da frente.',
          'Desça até o joelho de trás quase tocar o chão com total controle.',
          'Suba empurrando o chão pelo calcanhar da frente.'
        ],
        commonMistakes: [
          'Apoiar muito perto do banco, forçando excessivamente a patela para frente.',
          'Perder o equilíbrio por não fixar o olhar em um ponto fixo à frente.'
        ],
        alternatives: [
          { name: 'Passada / Afundo com Halteres Caminhando', equipment: 'Halteres Livres', reason: 'Excelente trabalho dinâmico unilateral de pernas.' },
          { name: 'Agachamento Smith com Pés à Frente', equipment: 'Máquina Smith', reason: 'Estabilidade guiada para quem tem dificuldade de equilíbrio.' }
        ]
      },
      {
        id: 'p3-calf-raise',
        name: 'Panturrilha no Smith / Máquina em Pé',
        machineName: 'Smith Machine com Step ou Panturrilha em Pé',
        targetMuscles: ['Gastrocnêmio (Cabeça Lateral e Medial)'],
        secondaryMuscles: ['Sóleo'],
        sets: 4,
        reps: '15 - 20',
        suggestedRestSeconds: 60,
        visualType: 'calf-raise',
        machineAdjustment: [
          'Coloque um bloco ou step firme sob a barra do Smith.',
          'Apoie a metade anterior dos pés (metatarsos) no degrau, deixando os calcanhares livres.'
        ],
        executionTips: [
          'Desça os calcanhares ao máximo sentindo um alongamento profundo na panturrilha e segure por 1 segundo embaixo.',
          'Suba na ponta dos pés o mais alto que puder e segure 1 segundo no pico de contração.',
          'O segredo do crescimento de panturrilha está nas pausas no ponto de alongamento para anular o reflexo elástico do tendão de Aquiles.'
        ],
        commonMistakes: [
          'Ficar quicando rapidamente sem pausar (o tendão faz o trabalho, o músculo não cresce).',
          'Dobrar os joelhos durante a subida.'
        ],
        alternatives: [
          { name: 'Panturrilha no Leg Press 45°', equipment: 'Leg Press', reason: 'Facilidade de segurança e grande capacidade de carga.' },
          { name: 'Panturrilha Unilateral com Halter', equipment: 'Halter + Step', reason: 'Excelente isolamento sem sobrecarga na coluna.' }
        ]
      },
      {
        id: 'p3-abs-crunch',
        name: 'Abdominal Supra na Polia ou Máquina',
        machineName: 'Crossover / Polia Média com Corda',
        targetMuscles: ['Reto Abdominal'],
        secondaryMuscles: ['Oblíquos'],
        sets: 3,
        reps: '15 reps',
        suggestedRestSeconds: 60,
        visualType: 'abs-cable',
        machineAdjustment: [
          'Ajoelhe-se em frente à polia média/alta segurando a corda colada nas têmporas/pescoço.',
          'Trave o quadril em uma posição fixa sem sentar nos calcanhares.'
        ],
        executionTips: [
          'Curve a coluna para frente aproximando o osso externo do púbis (enrole o tronco).',
          'Expire todo o ar no final da contração apertando o abdômen por 1 segundo.',
          'Volte esticando sem mexer o quadril.'
        ],
        commonMistakes: [
          'Dobrar o quadril em vez de enrolar a coluna torácica.',
          'Puxar o peso com os braços em vez do abdômen.'
        ],
        alternatives: [
          { name: 'Abdominal Crunch no Banco Declinado', equipment: 'Banco Declinado', reason: 'Grande amplitude de alongamento com o próprio peso.' },
          { name: 'Prancha Abdominal com Apoio de Cotovelos', equipment: 'Colchonete', reason: 'Fortalecimento isométrico profundo do transverso abdominal.' }
        ]
      }
    ],
    cardio: {
      type: 'Caminhada Regenerativa Leve',
      title: 'Desaquecimento / Cardio Leve',
      durationMinutes: 10,
      intensity: 'Leve',
      targetPace: '4.0 - 4.5 km/h em esteira plana',
      instruction: 'Apenas caminhe em ritmo calmo e relaxado para baixar os batimentos cardíacos e acelerar a drenagem de metabólitos das pernas.',
      hypertrophyReason: 'Após um treino pesado de quadríceps, cardios longos ou intensos atrapalham a recuperação muscular. 10 minutos de caminhada plana servem estritamente para relaxamento vascular.'
    }
  },
  {
    dayNumber: 4,
    key: 'quinta',
    name: 'Push B (Foco Ombros Deltoides, Peitoral Superior e Tríceps)',
    focus: 'Deltoides 3D, Clavicular (Superior) & Tríceps Força',
    tagline: 'Foco na silhueta em V e ombros densos e definidos',
    estimatedMinutes: 65,
    coachTips: [
      'O deltoide responde magnificamente a volumes mais altos e contrações com pico isométrico.',
      'Mantenha as manoplas firmes e cotovelos alinhados com o plano escapular.',
      'Sempre termine com uma série de burnout ou drop-set na elevação lateral se sentir energia.'
    ],
    stretches: [
      {
        id: 'str-4-1',
        name: 'Deslocamento com Bastão ou Toalha para Ombros',
        targetJoint: 'Cápsula Anterior de Ombro',
        durationSeconds: 40,
        instruction: 'Segure um bastão ou toalha com pegada ampla e passe por cima da cabeça até as costas com braços esticados, voltando suavemente à frente.',
        focusTip: 'Se sentir travamento, afaste mais as mãos na pegada.',
        iconType: 'shoulders'
      },
      {
        id: 'str-4-2',
        name: 'Alongamento em 4 Apoios para Peitoral e Dorsal',
        targetJoint: 'Tórax e Cintura Escapular',
        durationSeconds: 35,
        instruction: 'Ajoelhe-se e estique os braços à frente no chão (posição da criança do yoga), afundando o peito em direção ao chão para abrir as axilas.',
        focusTip: 'Alongamento suave que alivia a tensão acumulada do dia de peito.',
        iconType: 'chest'
      }
    ],
    exercises: [
      {
        id: 'p4-shoulder-press',
        name: 'Desenvolvimento com Halteres Sentado',
        machineName: 'Banco Regulável (Ajuste a 75°-80°)',
        targetMuscles: ['Deltoide Anterior e Lateral'],
        secondaryMuscles: ['Tríceps Braquial', 'Trapézio Superior'],
        sets: 4,
        reps: '8 - 10',
        suggestedRestSeconds: 90,
        visualType: 'seated-overhead-press',
        machineAdjustment: [
          'Ajuste o encosto a cerca de 75° ou 80° (não em 90° retos para não sobrecarregar a articulação do ombro).',
          'Sente-se com as costas firmes e peito aberto.'
        ],
        executionTips: [
          'Empurre os halteres para cima descrevendo um arco sutil até quase tocarem no topo.',
          'Desça até a altura das orelhas sentindo o deltoide alongar.',
          'Mantenha os cotovelos apontados ligeiramente para a frente (~30° do corpo).'
        ],
        commonMistakes: [
          'Abrir os cotovelos totalmente em linha com as orelhas ao descer.',
          'Arquear a lombar tirando as costas do banco para usar o peitoral.'
        ],
        alternatives: [
          { name: 'Desenvolvimento Militar no Smith ou Máquina', equipment: 'Shoulder Press Machine', reason: 'Excelente estabilidade que permite carga máxima sem risco de queda.' },
          { name: 'Desenvolvimento com Barra Sentado', equipment: 'Barra Olímpica', reason: 'Construção maciça de força nos ombros.' }
        ]
      },
      {
        id: 'p4-cable-lateral-raise',
        name: 'Elevação Lateral Unilateral na Polia Baixa',
        machineName: 'Crossover / Polia Baixa',
        targetMuscles: ['Deltoide Lateral'],
        secondaryMuscles: ['Deltoide Anterior'],
        sets: 4,
        reps: '12 - 15',
        suggestedRestSeconds: 60,
        visualType: 'lateral-raise',
        machineAdjustment: [
          'Coloque a roldana da polia na altura do joelho ou no chão com manopla estribo.',
          'Passe o cabo por trás do corpo ou pela frente (conforme conforto articular).'
        ],
        executionTips: [
          'Incline o corpo levemente para o lado oposto da máquina segurando na barra de apoio.',
          'Puxe o cabo elevando o braço até a linha do ombro, sentindo a tensão contínua mesmo no início da subida.',
          'Faça uma descida lenta de 2 segundos.'
        ],
        commonMistakes: [
          'Girar o corpo junto com o movimento do braço.',
          'Puxar com o bíceps dobrando demais o cotovelo.'
        ],
        alternatives: [
          { name: 'Elevação Lateral com Halteres Inclinado no Banco', equipment: 'Halteres + Banco 60°', reason: 'Tensão máxima no deltoide médio sem uso de impulso corporal.' },
          { name: 'Elevação Lateral na Máquina Sentado', equipment: 'Lateral Raise Machine', reason: 'Excelente para quem quer se concentrar puramente no músculo.' }
        ]
      },
      {
        id: 'p4-incline-press-machine',
        name: 'Supino Inclinado na Máquina Articulada',
        machineName: 'Incline Chest Machine',
        targetMuscles: ['Peitoral Superior (Porção Clavicular)'],
        secondaryMuscles: ['Tríceps', 'Deltoide Anterior'],
        sets: 3,
        reps: '8 - 10',
        suggestedRestSeconds: 90,
        visualType: 'incline-bench',
        machineAdjustment: [
          'Ajuste o assento para que os pegadores fiquem na linha da sua clavícula.',
          'Encaixe os pés no suporte ou no chão com boa firmeza.'
        ],
        executionTips: [
          'Mantenha o peito alto e escápulas contraídas contra o estofamento.',
          'Empurre para cima e para dentro aproveitando o arco natural da máquina.',
          'Desça lentamente sentindo o peitoral superior esticar profundamente.'
        ],
        commonMistakes: [
          'Deixar as escápulas se soltarem na fase de empurrar.',
          'Segurar as manoplas muito afastadas causando dor no punho.'
        ],
        alternatives: [
          { name: 'Supino Inclinado no Smith', equipment: 'Smith Machine', reason: 'Trajetória estável e segura para ir até a falha com travas.' },
          { name: 'Flexão de Braço com Pés Elevados no Banco', equipment: 'Banco Reto', reason: 'Excelente exercício com o peso do corpo para o topo do peito.' }
        ]
      },
      {
        id: 'p4-cable-crossover',
        name: 'Crossover na Polia Média / Baixa',
        machineName: 'Crossover de Cabos Duplo',
        targetMuscles: ['Peitoral Médio e Inferior'],
        secondaryMuscles: ['Deltoide Anterior'],
        sets: 3,
        reps: '12 - 15',
        suggestedRestSeconds: 60,
        visualType: 'cable-crossover',
        machineAdjustment: [
          'Ajuste as duas roldanas na altura dos ombros ou levemente abaixo.',
          'Dê um passo à frente com uma das pernas para garantir estabilidade.'
        ],
        executionTips: [
          'Mantenha uma flexão fixa de cotovelos durante todo o movimento.',
          'Aproxime as mãos à frente do umbigo/peito como se estivesse abraçando uma árvore grande.',
          'Segure 1 segundo cruzando levemente as mãos para ativação máxima das fibras internas.'
        ],
        commonMistakes: [
          'Transformar o crucifixo em um supino empurrando para frente.',
          'Balançar o tronco para a frente e para trás a cada repetição.'
        ],
        alternatives: [
          { name: 'Crucifixo Reto com Halteres', equipment: 'Halteres + Banco Reto', reason: 'Excelente tensão de alongamento.' },
          { name: 'Peck Deck Fechado', equipment: 'Máquina Peck Deck', reason: 'Isolamento fixo sem perda de alinhamento de cabos.' }
        ]
      },
      {
        id: 'p4-skull-crusher',
        name: 'Tríceps Testa na Barra W no Banco Reto',
        machineName: 'Banco Reto com Barra W',
        targetMuscles: ['Tríceps (Cabeça Longa e Medial)'],
        secondaryMuscles: ['Antebraço'],
        sets: 3,
        reps: '10 - 12',
        suggestedRestSeconds: 75,
        visualType: 'triceps-extension',
        machineAdjustment: [
          'Use a pegada mais fechada e angulada da barra W para preservar os punhos.',
          'Deite de costas no banco reto com pés firmes no chão.'
        ],
        executionTips: [
          'Inicie com a barra estendida acima do peito e incline os braços cerca de 10° para trás da cabeça.',
          'Dobre apenas os cotovelos trazendo a barra em direção ao topo da cabeça / testa.',
          'Estenda os cotovelos sem deixá-los abrirem para os lados.'
        ],
        commonMistakes: [
          'Deixar os cotovelos abrirem excessivamente para fora como asas de frango.',
          'Descer o peso no nariz ou testa sem controle de velocidade.'
        ],
        alternatives: [
          { name: 'Tríceps Testa com Halteres', equipment: 'Halteres Livres', reason: 'Permite pegada neutra muito mais confortável para o punho.' },
          { name: 'Tríceps Testa na Polia com Corda', equipment: 'Polia Baixa + Banco', reason: 'Tensão constante sem perda de torque no topo.' }
        ]
      }
    ],
    cardio: {
      type: 'Escada ou Esteira Inclinada',
      title: 'Cardio Pós-Treino: Simulador de Escada ou Esteira Inclinada',
      durationMinutes: 15,
      intensity: 'Moderada',
      targetPace: 'Nível 4 a 6 na escada | Esteira a 5.0 km/h com 7% inclinação',
      instruction: 'Suba na escada com passos completos apoiando o pé inteiro no degrau (sem ficar apenas na ponta do pé). Mantenha postura ereta.',
      hypertrophyReason: 'Ativação vigorosa do fluxo sanguíneo nos membros inferiores e gasto calórico eficiente sem causar desgaste de membros superiores.'
    }
  },
  {
    dayNumber: 5,
    key: 'sexta',
    name: 'Pull B (Costas Espessura, Trapézio e Bíceps Pico)',
    focus: 'Espessura de Costas, Romboides, Trapézio & Pico de Bíceps',
    tagline: 'Densidade muscular nas costas para criar relevo tridimensional',
    estimatedMinutes: 65,
    coachTips: [
      'Na remada curvada, contraia o abdômen para proteger a lombar e mantenha as pernas semi-flexionadas.',
      'Sinta a compressão dos romboides e trapézio médio como se estivesse segurando uma caneta entre as escápulas.',
      'No bíceps, pause 1 segundo na contração máxima de cada repetição.'
    ],
    stretches: [
      {
        id: 'str-5-1',
        name: 'Alongamento de Trapézio e Pescoço Lateral',
        targetJoint: 'Trapézio Superior e Escalenos',
        durationSeconds: 30,
        instruction: 'Com a mão direita sobre a orelha esquerda, puxe suavemente a cabeça em direção ao ombro direito enquanto deixa o ombro esquerdo relaxar para baixo.',
        focusTip: 'Movimento sutil e suave, nunca dê puxões fortes.',
        iconType: 'neck'
      },
      {
        id: 'str-5-2',
        name: 'Mobilidade Torácica com Rotação em 4 Apoios',
        targetJoint: 'Coluna Torácica e Costelas',
        durationSeconds: 40,
        instruction: 'Em 4 apoios no chão, coloque a mão na nuca e gire o cotovelo para cima em direção ao teto abrindo o peito, depois desça em direção ao chão.',
        focusTip: 'Mantém a caixa torácica elástica e móvel para puxadas pesadas.',
        iconType: 'back'
      }
    ],
    exercises: [
      {
        id: 'p5-bent-over-row',
        name: 'Remada Curvada com Barra ou Máquina Cavalinho',
        machineName: 'Máquina Cavalinho (T-Bar) ou Barra Olímpica',
        targetMuscles: ['Trapézio Médio/Inferior', 'Romboides', 'Dorsais'],
        secondaryMuscles: ['Eretores da Espinha', 'Bíceps'],
        sets: 4,
        reps: '8 - 10',
        suggestedRestSeconds: 90,
        visualType: 'bent-over-row',
        machineAdjustment: [
          'Se na máquina cavalinho com apoio no peito: regule a altura para que a almofada apoie no esterno.',
          'Se na T-bar de solo: posicione os pés na largura dos ombros com joelhos destravados.'
        ],
        executionTips: [
          'Incline o tronco mantendo a coluna 100% alinhada e peito aberto.',
          'Puxe a barra em direção à boca do estômago, puxando com os cotovelos bem próximos ao corpo.',
          'Aperte as costas no topo antes de esticar os braços controladamente.'
        ],
        commonMistakes: [
          'Arredondar a coluna lombar (risco de hérnia de disco).',
          'Fazer o movimento curto levantando o tronco a cada puxada.'
        ],
        alternatives: [
          { name: 'Remada Curvada com Halteres com Apoio no Banco', equipment: 'Banco Inclinado + Halteres', reason: 'Elimina totalmente a tensão na lombar enquanto isola a musculatura das costas.' },
          { name: 'Remada Articulada Pegada Pronada', equipment: 'Máquina Articulada', reason: 'Estabilidade guiada e alta segurança.' }
        ]
      },
      {
        id: 'p5-close-grip-pulldown',
        name: 'Puxada Fechada com Triângulo na Polia Alta',
        machineName: 'Torre de Puxada Alta / Lat Pulldown',
        targetMuscles: ['Grande Dorsal (Fibras Inferiores)', 'Redondo Maior'],
        secondaryMuscles: ['Bíceps', 'Braquial'],
        sets: 3,
        reps: '10 - 12',
        suggestedRestSeconds: 75,
        visualType: 'lat-pulldown',
        machineAdjustment: [
          'Encaixe o acessório de triângulo de ferro no mosquetão superior.',
          'Trave bem as pernas no rolo estofado.'
        ],
        executionTips: [
          'Segure no triângulo com pegada neutra e incline o tronco ligeiramente para trás.',
          'Puxe a manopla em direção ao peitoral superior, trazendo os cotovelos colados na frente do corpo.',
          'Permita que a dorsal se estenda completamente na subida.'
        ],
        commonMistakes: [
          'Deitar totalmente no banco para puxar o peso como se fosse remada.',
          'Encolher os ombros na subida.'
        ],
        alternatives: [
          { name: 'Puxada Unilateral no Cabo', equipment: 'Polia Alta', reason: 'Permite acompanhar o ângulo exato de inserção da sua dorsal.' },
          { name: 'Barra Fixa com Pegada Neutra (Triângulo)', equipment: 'Barra Fixa', reason: 'Recrutamento motor espetacular com peso do corpo.' }
        ]
      },
      {
        id: 'p5-shrugs',
        name: 'Encolhimento de Ombros na Máquina Smith ou Halteres',
        machineName: 'Smith Machine ou Halteres Livres',
        targetMuscles: ['Trapézio Superior'],
        secondaryMuscles: ['Levantador da Escápula'],
        sets: 4,
        reps: '12 - 15',
        suggestedRestSeconds: 60,
        visualType: 'shrug',
        machineAdjustment: [
          'No Smith: regule a barra na altura da coxa.',
          'Com halteres: pegue o par e mantenha os braços estendidos ao lado do corpo.'
        ],
        executionTips: [
          'Mantenha a cabeça reta (olhar fixo à frente, nunca abaixe o queixo).',
          'Eleve os ombros reto para cima em direção às orelhas como se dissesse "não sei".',
          'Segure 2 segundos no topo espremendo a massa do trapézio e desça devagar.'
        ],
        commonMistakes: [
          'Ficar rodando os ombros em círculos (danifica a articulação glenoumeral sem nenhum benefício muscular).',
          'Usar carga que obriga o corpo a dobrar os cotovelos.'
        ],
        alternatives: [
          { name: 'Encolhimento com Barra por Trás', equipment: 'Smith Machine', reason: 'Ativação profunda de fibras médias do trapézio.' },
          { name: 'Encolhimento na Máquina de Panturrilha em Pé', equipment: 'Calf Machine', reason: 'A carga fica nos ombros sem fadigar as mãos.' }
        ]
      },
      {
        id: 'p5-preacher-curl',
        name: 'Rosca Scott na Máquina ou Banco Scott',
        machineName: 'Máquina de Rosca Scott / Preacher Curl',
        targetMuscles: ['Bíceps Braquial (Isolamento da Cabeça Curta)'],
        secondaryMuscles: ['Braquial'],
        sets: 3,
        reps: '10 - 12',
        suggestedRestSeconds: 60,
        visualType: 'preacher-curl',
        machineAdjustment: [
          'Ajuste o assento para que a axila fique perfeitamente encaixada na borda superior da almofada inclinada.',
          'Toda a parte de trás dos seus braços deve permanecer colada no estofamento.'
        ],
        executionTips: [
          'Segure a barra ou pegadores com pegada firme.',
          'Puxe contraindo o bíceps até a flexão máxima.',
          'Desça controladamente sem soltar o peso no final para proteger o tendão do bíceps.'
        ],
        commonMistakes: [
          'Levantar o corpo do banco para puxar o peso com as costas.',
          'Esticar o braço de forma violenta na base causando hiperextensão do cotovelo.'
        ],
        alternatives: [
          { name: 'Rosca Scott com Barra W Livre', equipment: 'Banco Scott + Barra W', reason: 'O exercício clássico usado por Arnold Schwarzenegger para pico de bíceps.' },
          { name: 'Rosca Concentrada com Halter Sentado', equipment: 'Halter + Banco', reason: 'Isolamento unilateral cirúrgico.' }
        ]
      },
      {
        id: 'p5-incline-curl',
        name: 'Rosca Inclinada com Halteres no Banco 45°',
        machineName: 'Banco Regulável Inclinado a 45°',
        targetMuscles: ['Bíceps Braquial (Cabeça Longa - Pico)'],
        secondaryMuscles: ['Braquiorradial'],
        sets: 3,
        reps: '10 - 12',
        suggestedRestSeconds: 60,
        visualType: 'incline-curl',
        machineAdjustment: [
          'Incline o encosto do banco a exatamente 45° ou 50°.',
          'Sente-se com as costas e cabeça apoiadas.'
        ],
        executionTips: [
          'Deixe os braços caírem retos para trás com halteres, sentindo o alongamento da cabeça longa do bíceps.',
          'Flexione os braços mantendo os cotovelos fixos para trás do corpo.',
          'Gire a palma da mão para fora (supinação) no terço final da subida.'
        ],
        commonMistakes: [
          'Trazer os cotovelos para frente tirando o efeito do banco inclinado.',
          'Levantar a cabeça e arquear a coluna.'
        ],
        alternatives: [
          { name: 'Rosca Bíceps na Polia com Encosto Inclinado', equipment: 'Polia Baixa + Banco', reason: 'Tensão do cabo no ângulo ideal de alongamento.' },
          { name: 'Rosca Aranha (Spider Curl)', equipment: 'Banco Inclinado', reason: 'Foco no pico de contração com peito apoiado no banco.' }
        ]
      }
    ],
    cardio: {
      type: 'Bicicleta Ergométrica',
      title: 'Cardio Pós-Treino: Bike Ergométrica Constante',
      durationMinutes: 15,
      intensity: 'Moderada',
      targetPace: 'Cadência de 65 - 75 RPM em carga média',
      instruction: 'Ajuste a altura do banco para que sua perna fique quase estendida (95%) no ponto mais baixo do pedal. Pedale com respiração nasal e cadência ritmada.',
      hypertrophyReason: 'Sem nenhum impacto nas articulações, a bicicleta estimula o retorno venoso dos membros inferiores e queima calorias com segurança.'
    }
  },
  {
    dayNumber: 6,
    key: 'sabado',
    name: 'Legs B (Posterior de Coxa, Glúteos e Panturrilhas)',
    focus: 'Cadeia Posterior, Isquiotibiais, Glúteo Máximo & Panturrilhas',
    tagline: 'Equilíbrio anatômico, postura e potência muscular de pernas',
    estimatedMinutes: 65,
    coachTips: [
      'Isquiotibiais fortes protegem seus joelhos contra lesões de ligamento cruzado e dão o formato redondo à perna.',
      'No Stiff, o movimento é de bisagra de quadril (hip hinge): jogue o quadril para trás, não curve a coluna.',
      'Aperte o glúteo no ponto de extensão máxima na elevação pélvica.'
    ],
    stretches: [
      {
        id: 'str-6-1',
        name: 'Alongamento Ativo de Isquiotibiais com Toalha/Elástico',
        targetJoint: 'Cadeia Posterior da Coxa',
        durationSeconds: 45,
        instruction: 'Deite de costas no colchonete, passe a toalha na sola do pé e puxe a perna estendida para cima até sentir a parte de trás da coxa esticar sem dor.',
        focusTip: 'Mantenha a outra perna apoiada no chão e relaxe a respiração.',
        iconType: 'hamstrings'
      },
      {
        id: 'str-6-2',
        name: 'Mobilidade de Quadril em Afundo (Lunge Stretch)',
        targetJoint: 'Psoas Ilíaco e Flexores de Quadril',
        durationSeconds: 40,
        instruction: 'Em posição de lunge com o joelho de trás no chão, empurre a bacia suavemente para frente sentindo alongar a virilha da perna de trás.',
        focusTip: 'Essencial para liberar a tensão do quadril antes do Stiff.',
        iconType: 'hips'
      }
    ],
    exercises: [
      {
        id: 'p6-lying-leg-curl',
        name: 'Mesa Flexora Deitada',
        machineName: 'Mesa Flexora / Lying Leg Curl',
        targetMuscles: ['Isquiotibiais (Bíceps Femoral, Semitendíneo)'],
        secondaryMuscles: ['Panturrilha (Gastrocnêmio)'],
        sets: 4,
        reps: '10 - 12',
        suggestedRestSeconds: 75,
        visualType: 'lying-leg-curl',
        machineAdjustment: [
          'Alinhe a articulação do joelho com o eixo de rotação circular da máquina.',
          'Regule o rolo acolchoado para que encoste logo acima do calcanhar (tendão de Aquiles).'
        ],
        executionTips: [
          'Segure firme nas manoplas de apoio pressionando a pelve contra o banco para não empinar a bunda.',
          'Flexione os joelhos trazendo o rolo em direção aos glúteos e segure 1 segundo no topo.',
          'Desça controlando a descida em 2 a 3 segundos.'
        ],
        commonMistakes: [
          'Levantar o quadril da mesa ao fazer força (tira o trabalho do posterior e joga na lombar).',
          'Soltar o peso rápido batendo as placas da máquina.'
        ],
        alternatives: [
          { name: 'Cadeira Flexora Sentada', equipment: 'Cadeira Flexora', reason: 'Excelente estiramento prévio pela posição de quadril flexionado.' },
          { name: 'Flexão Nórdica com Apoio', equipment: 'Colchonete + Apoio de Calcanhar', reason: 'O exercício excêntrico mais poderoso para posteriores.' }
        ]
      },
      {
        id: 'p6-seated-leg-curl',
        name: 'Cadeira Flexora Sentada',
        machineName: 'Cadeira Flexora / Seated Leg Curl',
        targetMuscles: ['Isquiotibiais (Foco em Alongamento Máximo)'],
        secondaryMuscles: ['Glúteos'],
        sets: 3,
        reps: '12 - 15',
        suggestedRestSeconds: 60,
        visualType: 'seated-leg-curl',
        machineAdjustment: [
          'Regule o encosto para o joelho ficar no eixo da máquina.',
          'Abaixe a trava superior de coxas para prensar firmemente suas pernas contra o assento.'
        ],
        executionTips: [
          'Como o quadril fica a 90°, os isquiotibiais começam em estado de grande estiramento.',
          'Puxe as pernas para baixo e para trás com vigor.',
          'Volte lentamente controlando até as pernas ficarem quase retas.'
        ],
        commonMistakes: [
          'Deixar a trava de coxas frouxa permitindo que a perna suba solta.',
          'Curvar as costas para a frente.'
        ],
        alternatives: [
          { name: 'Flexora em Pé Unilateral na Máquina', equipment: 'Standing Leg Curl', reason: 'Isolamento de cada perna individualmente.' },
          { name: 'Flexora com Caneleira na Polia Baixa', equipment: 'Polia + Caneleira', reason: 'Boa alternativa quando as máquinas estiverem ocupadas.' }
        ]
      },
      {
        id: 'p6-romanian-deadlift',
        name: 'Stiff com Halteres ou Barra',
        machineName: 'Halteres Livres ou Barra com Anilhas',
        targetMuscles: ['Posterior de Coxa', 'Glúteo Máximo'],
        secondaryMuscles: ['Eretores da Coluna Lombar'],
        sets: 4,
        reps: '8 - 10',
        suggestedRestSeconds: 90,
        visualType: 'romanian-deadlift',
        machineAdjustment: [
          'Selecione halteres confortáveis e seguros para a pegada.',
          'Pés afastados na largura do quadril, apontados para a frente.'
        ],
        executionTips: [
          'Mantenha os joelhos com uma leve microflexão FIXA (não dobre mais durante o exercício).',
          'Empurre o quadril para trás como se quisesse encostar a bunda em uma parede atrás de você.',
          'Desça os halteres colados na canela até sentir um estiramento intenso nos posteriores de coxa.',
          'Suba empurrando o quadril para frente e apertando os glúteos.'
        ],
        commonMistakes: [
          'Arredondar a coluna torácica e lombar como uma concha.',
          'Dobrar os joelhos em excesso transformando o stiff em agachamento.'
        ],
        alternatives: [
          { name: 'Stiff no Smith Machine', equipment: 'Smith Machine', reason: 'A barra guiada ajuda a focar 100% no movimento de quadril.' },
          { name: 'Bom Dia (Good Morning) com Barra Leve', equipment: 'Barra', reason: 'Exercício de dobradiça de quadril altamente formativo.' }
        ]
      },
      {
        id: 'p6-hip-thrust',
        name: 'Elevação Pélvica na Máquina ou Banco com Barra',
        machineName: 'Máquina de Elevação Pélvica (Hip Thrust Machine)',
        targetMuscles: ['Glúteo Máximo (Contração Máxima)'],
        secondaryMuscles: ['Posterior de Coxa', 'Core'],
        sets: 3,
        reps: '10 - 12',
        suggestedRestSeconds: 90,
        visualType: 'hip-thrust',
        machineAdjustment: [
          'Se na máquina: regule o cinto acolchoado ou almofada sobre os ossos do quadril (crista ilíaca).',
          'Se no banco: apoie as escápulas na beirada de um banco com proteção estofada na barra.'
        ],
        executionTips: [
          'Pés firmes no chão a cerca de 90° em relação aos joelhos no topo do movimento.',
          'Empurre o quadril para cima até o tronco e as coxas formarem uma linha reta paralela ao chão.',
          'Contraia os glúteos no topo por 2 segundos segurando o ar antes de descer.'
        ],
        commonMistakes: [
          'Hiperestender a coluna lombar no topo em vez de empurrar com a bacia.',
          'Deixar os pés muito perto dos glúteos ou muito longe.'
        ],
        alternatives: [
          { name: 'Cadeira Abdutora na Máquina', equipment: 'Cadeira Abdutora', reason: 'Excelente trabalho complementar para glúteo médio e formato lateral.' },
          { name: 'Glúteo na Polia com Caneleira', equipment: 'Polia Baixa', reason: 'Tensão contínua para extensão de quadril.' }
        ]
      },
      {
        id: 'p6-seated-calf',
        name: 'Panturrilha Sentado na Máquina (Gêmeos)',
        machineName: 'Máquina de Panturrilha Sentado',
        targetMuscles: ['Músculo Sóleo (Espessura e Volume Lateral da Canela)'],
        secondaryMuscles: ['Tendão Calcâneo'],
        sets: 4,
        reps: '15 - 20',
        suggestedRestSeconds: 60,
        visualType: 'calf-raise',
        machineAdjustment: [
          'Ajuste as almofadas acolchoadas para ficarem bem pressionadas em cima do final da coxa (próximo aos joelhos).',
          'Apoie as pontas dos pés no suporte mantendo o calcanhar livre para descer.'
        ],
        executionTips: [
          'Com os joelhos a 90°, o músculo sóleo assume o trabalho principal (diferente da panturrilha em pé).',
          'Desça o calcanhar até o limite do alongamento e pause 1 segundo.',
          'Suba no máximo da amplitude e pause 1 segundo no topo.'
        ],
        commonMistakes: [
          'Ficar quicando sem pausar no ponto de estiramento.',
          'Colocar o apoio das coxas muito alto permitindo jogo e folga.'
        ],
        alternatives: [
          { name: 'Panturrilha Sentado com Halter nas Coxas', equipment: 'Halter + Step', reason: 'Excelente improviso caso a máquina esteja ocupada.' },
          { name: 'Panturrilha Unilateral no Smith', equipment: 'Smith', reason: 'Grande foco em força e amplitude.' }
        ]
      }
    ],
    cardio: {
      type: 'Caminhada Rápida na Esteira',
      title: 'Cardio Pós-Treino: Caminhada Rápida Firme',
      durationMinutes: 15,
      intensity: 'Leve a Moderada',
      targetPace: '5.2 a 5.6 km/h em esteira com 3% inclinação',
      instruction: 'Mantenha passada longa e ritmada, mantendo o abdômen contraído e postura ereta.',
      hypertrophyReason: 'Ativa a circulação e liberação de endorfinas sem esgotar as reservas de glicogênio necessárias para a recuperação do final de semana.'
    }
  },
  {
    dayNumber: 7,
    key: 'domingo',
    name: 'Descanso e Recuperação Ativa (Rest Day)',
    focus: 'Síntese Proteica, Sono Reparador & Reconstrução Muscular',
    tagline: 'O músculo não cresce durante o treino, cresce no descanso!',
    estimatedMinutes: 0,
    isRestDay: true,
    coachTips: [
      'A hipertrofia acontece durante o descanso profundo: priorize pelo menos 7 a 9 horas de sono de qualidade esta noite.',
      'Mantenha a ingestão de proteínas alta (1.8g a 2.2g por kg de peso corporal) mesmo sem treinar hoje.',
      'Beba pelo menos 35ml a 40ml de água por quilo de peso para manter os tecidos hidratados e facilitar o anabolismo.',
      'Se quiser, faça apenas os alongamentos leves para soltar a musculatura e caminhar um pouco ao ar livre.'
    ],
    stretches: [
      {
        id: 'str-7-1',
        name: 'Alongamento Completo da Coluna e Cadeia Posterior',
        targetJoint: 'Coluna Vertebral e Fáscias',
        durationSeconds: 60,
        instruction: 'Em pé ou sentado, incline suavemente o tronco à frente soltando os braços e a cabeça em direção ao chão, respirando fundo e deixando o peso da gravidade alongar suas costas.',
        focusTip: 'Solte a mandíbula e relaxe os ombros completamente.',
        iconType: 'back'
      },
      {
        id: 'str-7-2',
        name: 'Abertura de Peito e Respiração Diafragmática',
        targetJoint: 'Caixa Torácica e Pulmões',
        durationSeconds: 60,
        instruction: 'Deite de costas no colchonete com os braços abertos em cruz e palmas para cima. Puxe o ar inflando a barriga em 4 segundos e solte lentamente em 6 segundos.',
        focusTip: 'Reduz os níveis de cortisol (hormônio catabólico) e ativa o sistema nervoso parassimpático.',
        iconType: 'chest'
      }
    ],
    exercises: [],
    cardio: {
      type: 'Recuperação Ativa Opcional',
      title: 'Passeio / Caminhada Leve ao Ar Livre',
      durationMinutes: 20,
      intensity: 'Leve',
      targetPace: 'Passeio descontraído',
      instruction: 'Apenas uma caminhada leve na rua ou parque para tomar sol (vitamina D) e oxigenar o cérebro.',
      hypertrophyReason: 'Ajuda na redução de estresse sem gastar calorias excessivas.'
    }
  }
];
