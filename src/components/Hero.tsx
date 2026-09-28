import React from 'react';
import { ShieldCheck, ArrowDown, Github, Terminal, Cpu, Zap, Activity } from 'lucide-react';
import heroPortraitPath from '../assets/images/hero_arch_portrait_1790605496107.jpg';

interface HeroProps {
  lang: 'pt' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  return (
    <section id="sobre" className="relative pt-12 pb-20 overflow-hidden border-b border-slate-900 bg-slate-950">
      {/* Background Subtle Gradient Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                {lang === 'pt'
                  ? 'Sistemas Críticos, Alta Performance & Conformidade Regulatória'
                  : 'Mission-Critical Systems, High Performance & Regulatory Compliance'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              {lang === 'pt' ? (
                <>
                  Engenharia de Software de{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Missão Crítica
                  </span>{' '}
                  & Web3.
                </>
              ) : (
                <>
                  Mission-Critical{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Software Engineering
                  </span>{' '}
                  & Web3.
                </>
              )}
            </h1>

            {/* Sub-Headline & Bio */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              {lang === 'pt'
                ? 'Arquiteto-Chefe Corporativo & Engenheiro Principal especializado em arquiteturas orientadas a domínio (DDD/SOA), motores de baixa latência em Rust, segurança estática AST, GraphRAG, LGPD e integração nativa com o ecossistema Solana e BACEN Pix.'
                : 'Chief Corporate Architect & Principal Engineer specializing in domain-driven architectures (DDD/SOA), low-latency Rust engines, AST static security, GraphRAG, LGPD compliance, and native integration with Solana & BACEN Pix.'}
            </p>

            {/* Key Metric Highlights (Unboxed typography, zero-pill discipline) */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-900 text-xs font-medium text-slate-400">
              <div>
                <span className="block text-xl font-bold font-mono text-emerald-400 tabular-nums">&lt; 8ms P99</span>
                <span className="text-slate-400">{lang === 'pt' ? 'SLA Antifraude Pix' : 'Pix Antifraud SLA'}</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-teal-300 tabular-nums">49 Bytes</span>
                <span className="text-slate-400">{lang === 'pt' ? 'Alinhamento Borsh' : 'Borsh Header Alignment'}</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-cyan-300 tabular-nums">MCP & GraphRAG</span>
                <span className="text-slate-400">{lang === 'pt' ? 'Agentes de IA' : 'AI Agent Protocol'}</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-emerald-400 tabular-nums">100% LGPD</span>
                <span className="text-slate-400">{lang === 'pt' ? 'BACEN 147 & Art. 7' : 'BACEN 147 & Art. 7'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a
                href="#projetos"
                className="px-6 py-3 rounded-xl bg-emerald-600 font-semibold text-white hover:bg-emerald-500 transition flex items-center space-x-2 shadow-lg shadow-emerald-950/40 text-sm cursor-pointer"
              >
                <span>{lang === 'pt' ? 'Explorar Projetos Enterprise' : 'Explore Enterprise Projects'}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#sandbox-ast"
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 font-semibold text-slate-200 hover:text-white transition flex items-center space-x-2 text-sm cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'pt' ? 'Testar Sandbox AST Live' : 'Test Live AST Sandbox'}</span>
              </a>

              <a
                href="https://github.com/Mrcoantonioconceicao-ctrl"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Column: Architectural Visual Card & Executive Profile */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-slate-950/80 overflow-hidden">
              
              {/* Top Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-300">
                    {lang === 'pt' ? 'PERFIL ARQUITETURAL' : 'ARCHITECTURAL PROFILE'}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ACTIVE ARCHITECT</span>
                </div>
              </div>

              {/* High-Res Executive Portrait Image */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-6 border border-slate-800 bg-slate-950">
                <img
                  src={heroPortraitPath}
                  alt="Marco Antônio Conceição - Arquiteto Chefe"
                  className="w-full h-full object-cover filter brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h3 className="text-lg font-bold text-white">Marco Antônio Conceição</h3>
                  <p className="text-xs text-emerald-400 font-medium">
                    {lang === 'pt' ? 'Arquiteto-Chefe Corporativo & Dev Principal' : 'Chief Corporate Architect & Principal Dev'}
                  </p>
                </div>
              </div>

              {/* Code / Architecture Quote */}
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 text-xs font-mono text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>SYSTEM_MINT.RS</span>
                  <span className="text-emerald-400">P99: 1.2ms</span>
                </div>
                <p className="text-emerald-300">
                  <span className="text-purple-400">fn</span> <span className="text-blue-300">assert_zero_trust</span>(&self) -&gt; <span className="text-teal-300">Result</span>&lt;(), AuditError&gt; &#123;
                </p>
                <p className="pl-4 text-slate-400">// Zero copy AST parsing &amp; LGPD hash validation</p>
                <p className="pl-4 text-emerald-300">self.neo4j_graph.verify_mcp_policy()?;Ok(())</p>
                <p className="text-emerald-300">&#125;</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
