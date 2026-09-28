import React, { useState } from 'react';
import { ShieldCheck, MessageSquareCode, Menu, X, Globe } from 'lucide-react';

interface HeaderProps {
  lang: 'pt' | 'en';
  setLang: (lang: 'pt' | 'en') => void;
  onOpenAiTwin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang, onOpenAiTwin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#sobre', label: lang === 'pt' ? 'Visão Geral' : 'Overview' },
    { href: '#projetos', label: lang === 'pt' ? 'Ecossistema & Projetos' : 'Ecosystem & Projects' },
    { href: '#roadmap', label: lang === 'pt' ? 'Roadmap de Carreira' : 'Career Roadmap' },
    { href: '#sandbox-ast', label: lang === 'pt' ? 'Sandbox AST' : 'AST Sandbox' },
    { href: '#simulador-sla', label: lang === 'pt' ? 'Simulador Pix' : 'Pix Simulator' },
    { href: '#stack', label: lang === 'pt' ? 'Stack & Competências' : 'Stack & Matrix' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element with clean styling) */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-base tracking-wider group-hover:border-emerald-400 transition-colors shrink-0">
            MA
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Marco Antônio Conceição
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-emerald-400 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Interactive Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all cursor-pointer shrink-0"
            title={lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
            aria-label="Language switch"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'pt' ? 'PT-BR' : 'EN-US'}</span>
          </button>

          {/* Ask AI Twin Button */}
          <button
            onClick={onOpenAiTwin}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/60 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer shrink-0"
          >
            <MessageSquareCode className="w-4 h-4 text-emerald-400" />
            <span className="whitespace-nowrap">{lang === 'pt' ? 'Arquiteto AI' : 'Architect AI'}</span>
          </button>

          {/* Primary CTA */}
          <a
            href="#contato"
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-semibold transition shadow-lg shadow-emerald-950/40 whitespace-nowrap shrink-0"
          >
            {lang === 'pt' ? 'Contato Direto' : 'Direct Contact'}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-emerald-400 py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-900 flex flex-col space-y-2">
            <button
              onClick={() => {
                onOpenAiTwin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 text-xs font-medium text-emerald-400 py-1"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Conversar com Arquiteto AI' : 'Chat with Architect AI'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
