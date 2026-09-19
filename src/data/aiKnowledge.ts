export interface AiQuickPrompt {
  id: string;
  label: string;
  query: string;
}

export const AI_QUICK_PROMPTS: AiQuickPrompt[] = [
  {
    id: 'qp-machine-busy',
    label: 'Aparelho Ocupado?',
    query: 'O aparelho que preciso usar está ocupado agora na academia. O que posso fazer no lugar?'
  },
  {
    id: 'qp-progressive-overload',
    label: 'Como Subir a Carga?',
    query: 'Como sei o momento certo de aumentar o peso dos exercícios para hipertrofia?'
  },
  {
    id: 'qp-post-workout-food',
    label: 'O que Comer Pós-Treino?',
    query: 'O que devo comer após o treino para maximizar o ganho de massa muscular?'
  },
  {
    id: 'qp-shoulder-pain',
    label: 'Não Sentir o Ombro no Supino',
    query: 'Como posicionar as escápulas e os cotovelos para não sentir dor no ombro no supino?'
  },
  {
    id: 'qp-rest-time',
    label: 'Quanto Descansar Entre Séries?',
    query: 'Qual é o melhor tempo de descanso entre séries para ganhar massa muscular?'
  }
];

export function generateSmartAiResponse(userMessage: string, currentDayName?: string, currentExerciseName?: string): string {
  const query = userMessage.toLowerCase();

  // 1. Aparelho ocupado / Substituição
  if (query.includes('ocupado') || query.includes('substituir') || query.includes('trocar') || query.includes('outro exercicio') || query.includes('no lugar')) {
    if (currentExerciseName) {
      return `**Substituição Rápida para ${currentExerciseName}**:\n\nSe o aparelho estiver cheio, você tem excelentes opções de peso livre ou polia para não perder o ritmo:\n\n- **Opção 1 (Pesos Livres):** Use halteres em banco ajustável mantendo o mesmo padrão de movimento e ângulo de fibras.\n- **Opção 2 (Polia / Cabos):** Os cabos garantem tensão contínua em todo o arco.\n- **Dica de ouro:** Mantenha a mesma faixa de repetições (8 a 12) e foque em 2 a 3 segundos de descida controlada para gerar o mesmo estímulo de hipertrofia!`;
    }
    return `**Como agir quando o aparelho estiver ocupado:**\n\n1. **Peck Deck / Voador ocupado:** Vá para o banco reto com halteres e faça Crucifixo Reto ou use o Crossover em polia média.\n2. **Puxada Alta ocupada:** Vá para a barra fixa ou faça Remada Curvada com Halteres apoiado no banco.\n3. **Leg Press 45° ocupado:** Faça Agachamento Búlgaro com halteres ou Agachamento Hack/Smith.\n4. **Cadeira Extensora ocupada:** Faça Agachamento Sissy no chão ou Afundo caminhando.\n5. **Mesa Flexora ocupada:** Faça Stiff com halteres ou Flexora unilateral em pé com caneleira.\n\nVocê também pode clicar no botão "Substituir" dentro do card de cada exercício no app para ver as alternativas diretas!`;
  }

  // 2. Sobrecarga progressiva / aumento de carga
  if (query.includes('aumentar') || query.includes('subir') || query.includes('peso') || query.includes('carga') || query.includes('sobrecarga')) {
    return `**Regra de Ouro da Sobrecarga Progressiva (Double Progression):**\n\nPara ganhar massa com segurança e sem lesões:\n\n1. **Domine o teto de repetições primeiro:** Se a faixa é de 8 a 12 reps, só aumente a carga quando conseguir fazer **12 repetições perfeitas** em todas as séries com a carga atual.\n2. **Aumento gradual (micro-loading):** Adicione apenas 1kg a 2kg por lado nos exercícios grandes (supino, leg press) e 0.5kg a 1kg nos isolados (elevação lateral, rosca).\n3. **Se as repetições caírem para 8:** Perfeito! Fique nessa nova carga até conseguir alcançar as 12 reps novamente. Esse ciclo contínuo é o que constrói músculos de verdade.`;
  }

  // 3. Nutrição / Pós-treino / Pré-treino / Dieta
  if (query.includes('comer') || query.includes('pós-treino') || query.includes('pre-treino') || query.includes('pos treino') || query.includes('proteina') || query.includes('alimentação') || query.includes('dieta')) {
    return `**Nutrição Otimizada para Hipertrofia:**\n\n- **Pós-Treino Ideal (Janela Anabólica):**\n  - **Proteína de Alta Qualidade:** 30g a 40g (frango, ovos, carne magra, peixe ou Whey Protein).\n  - **Carboidrato para Reposição:** 40g a 60g (arroz branco, batata, banana, aveia) para restaurar o glicogênio e sinalizar o anabolismo via insulina.\n\n- **Total Diário Recomendado:** Consuma entre **1.6g a 2.2g de proteína por kg de peso corporal** dividido em 4 a 5 refeições ao longo do dia.\n\n- **Água:** Mínimo de 35ml a 40ml de água por kg ao dia. Músculo desidratado perde até 15% da capacidade contrátil!`;
  }

  // 4. Dor de ombro / Supino / Postura
  if (query.includes('ombro') || query.includes('dor') || query.includes('cotovelo') || query.includes('lombar') || query.includes('postura') || query.includes('escapula')) {
    return `**Proteção Articular e Postura no Supino & Empurradas:**\n\n1. **Retração e Depressão Escapular:** Antes de tirar a barra ou os halteres, "encaixe as escápulas no bolso de trás da calça" e mantenha o peito estufado o tempo inteiro.\n2. **Ângulo dos Cotovelos (Formato de Flecha):** Nunca abra os cotovelos a 90° em linha com as orelhas! Mantenha-os a aproximadamente **45° a 60° em relação ao tronco**.\n3. **Pegada Firme no Punho:** Deixe a barra apoiada na base da palma da mão (eminência tenar), não perto dos dedos, para não dobrar o punho para trás.\n4. **Se a dor persistir:** Substitua temporariamente por halteres com pegada semi-neutra ou máquina articulada convergente.`;
  }

  // 5. Descanso entre séries
  if (query.includes('descanso') || query.includes('tempo') || query.includes('esperar') || query.includes('intervalo')) {
    return `**Tempo de Descanso Científico para Hipertrofia:**\n\n- **Exercícios Compostos Pesados (Leg Press, Supinos, Remadas):** **90 a 120 segundos**. Permite a ressíntese de fosfocreatina (CP) para que você mantenha alto rendimento e peso na próxima série.\n- **Exercícios Isoladores (Elevação Lateral, Rosca, Tríceps, Extensora):** **60 a 75 segundos**. Suficiente para recuperação local sem alongar demais o treino.\n\n*O app já ativa um cronômetro automático na tela ao você marcar uma série como concluída!*`;
  }

  // 6. Cardio e Hipertrofia
  if (query.includes('cardio') || query.includes('esteira') || query.includes('catabolizar') || query.includes('correr') || query.includes('gordura')) {
    return `**Cardio Inteligente para Quem Quer Ganhar Massa:**\n\n- **A regra de ouro:** O cardio deve ser feito **SEMPRE DEPOIS da musculação** ou em horário separado.\n- **Por quê?** Se fizer antes, você esgota as reservas de glicogênio e não consegue erguer a carga necessária para estimular a hipertrofia.\n- **Protocolo Ideal:** 15 minutos em intensidade leve a moderada (ex: esteira inclinada a 5km/h com inclinação de 6% a 8%). Isso melhora a sensibilidade à insulina, oxigena os tecidos e não cataboliza nem 1 grama de músculo!`;
  }

  // Resposta padrão inteligente
  return `**Coach IA IronPulse:**\n\nEstou acompanhando sua rotina${currentDayName ? ` no treino de **${currentDayName}**` : ''}!\n\nLembre-se dos 3 pilares da hipertrofia:\n1. **Tensão Mecânica:** Execução com amplitude e proximidade da falha muscular.\n2. **Constância:** Treinar de Segunda a Sábado mantendo o Domingo como regeneração anabólica total.\n3. **Sobrecarga Progressiva:** Anote suas cargas aqui no app e tente somar 1 repetição ou 1kg extra toda semana!\n\nSe precisar de substituição de aparelho ocupado, conferir altura de regulagem ou dicas de alimentação, basta me perguntar!`;
}
