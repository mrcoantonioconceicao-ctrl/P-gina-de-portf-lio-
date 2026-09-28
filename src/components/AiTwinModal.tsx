import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquareCode, Sparkles, Bot, User, RefreshCw } from 'lucide-react';

interface AiTwinModalProps {
  isOpen: boolean;
  lang: 'pt' | 'en';
  onClose: () => void;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export const AiTwinModal: React.FC<AiTwinModalProps> = ({ isOpen, lang, onClose }) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text:
        lang === 'pt'
          ? 'Olá! Sou o Arquiteto AI Gêmeo de Marco Antônio Conceição. Posso responder dúvidas técnicas sobre nossas arquiteturas Rust de baixa latência, segurança AST para Solana Anchor, PIX antifraude sub-8ms, protocolo MCP e LGPD/BACEN. Como posso ajudar seu projeto hoje?'
          : 'Hello! I am Marco Antônio Conceição\'s AI Architectural Twin. I can answer technical queries about low-latency Rust engines, Solana Anchor AST security, sub-8ms Pix antifraud, MCP protocol, and compliance. How can I assist your engineering team today?',
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    lang === 'pt'
      ? 'Como o PIX-SHIELD-QPO garante SLA P99 < 8ms com Neo4j?'
      : 'How does PIX-SHIELD-QPO guarantee < 8ms P99 SLA with Neo4j?',
    lang === 'pt'
      ? 'Como é feito o alinhamento Borsh de 49 bytes no Solana Anchor Studio?'
      : 'How is 49-byte Borsh header alignment calculated in Anchor Studio?',
    lang === 'pt'
      ? 'Como funciona a arquitetura híbrida sem custódia do Nexa Pay?'
      : 'How does Nexa Pay escrowless dual-rail payment architecture work?',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text:
              lang === 'pt'
                ? 'Obrigado por consultar a arquitetura! Nossos sistemas são projetados com Rust Tokio async zero-copy memory allocation e verificações AST estáticas.'
                : 'Thank you for reaching out! Our systems are built with Rust Tokio async zero-copy allocation and static AST verification.',
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text:
            lang === 'pt'
              ? 'Erro na consulta do modelo. Você pode contatar Marco diretamente pelo email Mrcoantonioconceicao@gmail.com.'
              : 'Model request failed. You can reach Marco directly at Mrcoantonioconceicao@gmail.com.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-hidden">
      
      {/* Drawer Container */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col h-[85vh]">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                {lang === 'pt' ? 'Arquiteto AI Gêmeo' : 'Architect AI Twin'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'pt' ? 'Gêmeo Digital de Marco Antônio Conceição (Gemini-2.5)' : 'Digital Twin of Marco Antônio Conceição'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-950 rounded-xl border border-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Quick Questions */}
        <div className="py-3 border-b border-slate-800/80 flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-950 text-slate-300 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Thread */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 font-mono rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{lang === 'pt' ? 'Processando resposta do Arquiteto...' : 'Processing Twin response...'}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={lang === 'pt' ? 'Pergunte sobre as arquiteturas, Rust, Solana ou LGPD...' : 'Ask about architecture, Rust, Solana or compliance...'}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 font-sans"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
