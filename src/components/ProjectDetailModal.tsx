import React, { useState, useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, Copy, Check, Shield, Code, Terminal, Cpu } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  lang: 'pt' | 'en';
  onClose: () => void;
  onLoadCodeToSandbox: (code: string, language: string, targetType: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  lang,
  onClose,
  onLoadCodeToSandbox,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.sampleCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              {project.categoryLabel[lang]}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-950 rounded-xl border border-slate-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Overview Description */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-wider">
            {lang === 'pt' ? 'Visão Geral & Arquitetura:' : 'Overview & Architecture:'}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
            {project.fullDesc}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-slate-500 block">{m.label[lang]}</span>
              <span className="text-emerald-400 font-bold text-base">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Architectural Highlights */}
        <div>
          <h3 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-wider mb-3">
            {lang === 'pt' ? 'Destaques de Engenharia:' : 'Engineering Highlights:'}
          </h3>
          <ul className="space-y-2 text-xs font-mono text-slate-300">
            {project.architectureHighlights[lang].map((h, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-emerald-400">▹</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Compliance Standards */}
        <div>
          <h3 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-wider mb-2">
            {lang === 'pt' ? 'Normas de Conformidade:' : 'Compliance Standards:'}
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-slate-400">
            {project.compliance.join(' · ')}
          </div>
        </div>

        {/* Sample Code Viewer */}
        <div>
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border border-b-0 border-slate-800 rounded-t-xl text-xs font-mono text-slate-400">
            <span>{project.sampleCode.filename}</span>
            <button
              onClick={handleCopyCode}
              className="hover:text-emerald-400 flex items-center space-x-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 border border-slate-800 rounded-b-xl p-4 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed">
            <code>{project.sampleCode.code}</code>
          </pre>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              onLoadCodeToSandbox(
                project.sampleCode.code,
                project.sampleCode.language,
                project.title
              );
              onClose();
              const sandboxEl = document.getElementById('sandbox-ast');
              if (sandboxEl) sandboxEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center space-x-2 cursor-pointer shadow-lg shadow-emerald-950/40"
          >
            <Code className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Testar este Código no Sandbox AST' : 'Test Code in AST Sandbox'}</span>
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 text-slate-300 hover:text-white font-semibold text-xs transition flex items-center space-x-2"
            >
              <span>{lang === 'pt' ? 'Ver Repositório no GitHub' : 'View Repository on GitHub'}</span>
              <ExternalLink className="w-4 h-4 text-emerald-400" />
            </a>
          )}
        </div>

      </div>

    </div>
  );
};
