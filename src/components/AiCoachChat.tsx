import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { AI_QUICK_PROMPTS, generateSmartAiResponse } from '../data/aiKnowledge';
import type { WorkoutDay, Exercise } from '../types/workout';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface AiCoachChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay?: WorkoutDay;
  currentExercise?: Exercise | null;
}

export const AiCoachChat: React.FC<AiCoachChatProps> = ({
  isOpen,
  onClose,
  currentDay,
  currentExercise
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Olá! Sou seu **IronCoach IA**, seu treinador pessoal de hipertrofia.\n\nComo posso te ajudar hoje? Posso sugerir **substituição de aparelhos ocupados**, ensinar a **regular o banco/polia**, dar dicas de **alimentação pós-treino** ou **progressão de carga**! 🔥`,
      timestamp: 'Agora'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(
        new Date()
      )
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simula resposta natural rápida
    setTimeout(() => {
      const responseText = generateSmartAiResponse(
        text,
        currentDay?.name,
        currentExercise?.name
      );

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(
          new Date()
        )
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="ai-chat-backdrop" onClick={onClose}>
      <div className="ai-chat-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Cabeçalho do Chat IA */}
        <div className="ai-chat-header">
          <div className="ai-header-brand">
            <div className="ai-avatar">
              <Bot size={20} className="ai-bot-icon" />
              <span className="online-indicator" />
            </div>
            <div>
              <div className="ai-title-row">
                <h3>IronCoach IA</h3>
                <span className="ia-badge">HIPERTROFIA 24/7</span>
              </div>
              <p className="ai-status-sub">
                {currentDay ? `Conectado ao treino: ${currentDay.name.split('(')[0]}` : 'Assistente Ativo'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="ai-close-btn" title="Fechar Chat">
            <X size={20} />
          </button>
        </div>

        {/* Atalhos Rápidos no Topo */}
        <div className="quick-prompts-bar">
          <div className="quick-prompts-scroll">
            {AI_QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handleSendMessage(prompt.query)}
                className="quick-prompt-chip"
              >
                <Sparkles size={12} />
                <span>{prompt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Área de Mensagens */}
        <div className="ai-messages-container">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message-row ${msg.sender === 'user' ? 'user' : 'ai'}`}
            >
              <div className="message-bubble">
                <div className="message-content" style={{ whiteSpace: 'pre-line' }}>
                  {msg.text}
                </div>
                <span className="message-timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message-row ai">
              <div className="message-bubble typing-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Inferior de Envio */}
        <div className="ai-chat-input-row">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte sobre máquinas, postura, dieta..."
            className="ai-chat-input"
          />
          <button
            onClick={() => handleSendMessage()}
            className="ai-chat-send-btn"
            disabled={!inputMessage.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
