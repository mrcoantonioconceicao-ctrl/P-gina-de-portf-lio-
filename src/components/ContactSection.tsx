import React, { useState } from 'react';
import { Mail, MessageSquare, Github, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  lang: 'pt' | 'en';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('Auditoria de Segurança AST & Solana Anchor');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
  };

  return (
    <section id="contato" className="py-24 border-t border-slate-900 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'pt' ? 'Vamos Conectar e Construir o Futuro?' : 'Let\'s Connect and Engineer the Future'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            {lang === 'pt'
              ? 'Disponível para consultorias de arquitetura, projetos de alta complexidade em Rust, Web3, segurança em nuvem e engenharia de prompt avançada.'
              : 'Available for architectural consulting, high-complexity Rust projects, Web3, cloud security, and prompt engineering.'}
          </p>
        </div>

        {/* Direct Link Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <a
            href="mailto:Mrcoantonioconceicao@gmail.com"
            className="flex items-center space-x-3 px-6 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 transition text-slate-200 hover:text-white shadow-lg"
          >
            <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-mono font-medium">Mrcoantonioconceicao@gmail.com</span>
          </a>

          <a
            href="https://wa.me/5547992345371"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-3 px-6 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 transition text-slate-200 hover:text-white shadow-lg"
          >
            <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-mono font-medium">+55 (47) 99234-5371</span>
          </a>

          <a
            href="https://github.com/Mrcoantonioconceicao-ctrl"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-3 px-6 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 transition text-slate-200 hover:text-white shadow-lg"
          >
            <Github className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-mono font-medium">mrcoantonioconceicao-ctrl</span>
          </a>
        </div>

        {/* Consultation Request Form */}
        <div className="max-w-2xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4 font-mono">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                {lang === 'pt' ? 'Solicitação Enviada com Sucesso!' : 'Inquiry Submitted Successfully!'}
              </h3>
              <p className="text-xs text-slate-300">
                {lang === 'pt'
                  ? 'Obrigado por seu contato. Marco Antônio responderá diretamente ao seu e-mail no menor prazo.'
                  : 'Thank you for reaching out. Marco Antônio will review your request and reply shortly.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-semibold text-emerald-400 underline cursor-pointer"
              >
                {lang === 'pt' ? 'Enviar outra mensagem' : 'Send another message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 border-b border-slate-800 pb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'pt' ? 'SOLICITAÇÃO DE CONSULTORIA ARQUITETURAL' : 'ARCHITECTURAL CONSULTATION INQUIRY'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    {lang === 'pt' ? 'SEU NOME / EMPRESA' : 'YOUR NAME / ORGANIZATION'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Tech Corp"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    {lang === 'pt' ? 'E-MAIL CORPORATIVO' : 'CORPORATE EMAIL'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@empresa.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  {lang === 'pt' ? 'TIPO DE CONSULTORIA OU PROJETO' : 'CONSULTATION CATEGORY'}
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/80"
                >
                  <option value="Auditoria de Segurança AST & Solana Anchor">
                    Auditoria de Segurança AST & Solana Anchor
                  </option>
                  <option value="Arquitetura Antifraude Pix Sub-8ms (BACEN Res 147)">
                    Arquitetura Antifraude Pix Sub-8ms (BACEN Res 147)
                  </option>
                  <option value="Infraestrutura Híbrida Nexa Pay & MCP Agents">
                    Infraestrutura Híbrida Nexa Pay & MCP Agents
                  </option>
                  <option value="DevSecOps & Automação Termux">
                    DevSecOps & Automação Termux
                  </option>
                  <option value="Consultoria Arquitetural Executiva">
                    Consultoria Arquitetural Executiva
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  {lang === 'pt' ? 'DESCRIÇÃO DO DESAFIO TÉCNICO' : 'CHALLENGE DETAILS'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'pt' ? 'Descreva os requisitos do projeto, SLAs desejados e prazos...' : 'Describe project requirements, target SLAs, and timeline...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 leading-relaxed resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-lg shadow-emerald-950/40"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'pt' ? 'Enviar Solicitação de Consultoria' : 'Submit Consultation Request'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer Copyright */}
        <div className="text-center text-xs font-mono text-slate-500 border-t border-slate-900 pt-12 mt-16">
          Copyright © 2026 Marco Antônio Conceição. Todos os direitos reservados.
        </div>

      </div>
    </section>
  );
};
