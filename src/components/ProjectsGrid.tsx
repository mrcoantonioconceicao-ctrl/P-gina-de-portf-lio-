import React, { useState, useMemo } from 'react';
import { PORTFOLIO_PROJECTS, Project } from '../data/portfolioData';
import { Shield, Cloud, Terminal, Cpu, Flame, Zap, ShieldAlert, ExternalLink, Code, Search, Layers } from 'lucide-react';
import ideDashboardPath from '../assets/images/ide_security_dashboard_1790605520663.jpg';

interface ProjectsGridProps {
  lang: 'pt' | 'en';
  onSelectProject: (project: Project) => void;
  onLoadCodeToSandbox: (code: string, language: string, targetType: string) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  lang,
  onSelectProject,
  onLoadCodeToSandbox,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: lang === 'pt' ? 'Todos' : 'All' },
    { id: 'rust_pix', label: 'Pix & Rust' },
    { id: 'cloud_security', label: 'Cloud Security' },
    { id: 'devsecops', label: 'DevSecOps' },
    { id: 'solana', label: 'Web3 / Solana' },
    { id: 'ai_ingestion', label: 'AI & Ingestion' },
    { id: 'fintech', label: 'Fintech Hybrid' },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'rust_pix':
        return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'cloud_security':
        return <Cloud className="w-5 h-5 text-blue-400" />;
      case 'devsecops':
        return <Terminal className="w-5 h-5 text-purple-400" />;
      case 'solana':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'ai_ingestion':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'fintech':
        return <Zap className="w-5 h-5 text-teal-400" />;
      default:
        return <Layers className="w-5 h-5 text-emerald-400" />;
    }
  };

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_PROJECTS.filter((p) => {
      if (p.category === 'flagship') return false; // Flagship handled separately below
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const flagshipProject = PORTFOLIO_PROJECTS.find((p) => p.category === 'flagship');

  return (
    <section id="projetos" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
          {lang === 'pt' ? 'Portfólio de Soluções Enterprise' : 'Enterprise Solutions Portfolio'}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {lang === 'pt'
            ? 'Arquiteturas avançadas desenvolvidas com foco em auditoria estática, conformidade regulatória, IA generativa e alta concorrência.'
            : 'Advanced architectures engineered with static analysis, regulatory compliance, generative AI, and high concurrency.'}
        </p>
      </div>

      {/* Filter Bar & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-slate-900/60 p-2 sm:p-3 rounded-2xl border border-slate-800/80">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'pt' ? 'Buscar tecnologia, tag ou projeto...' : 'Search tech, tag or project...'}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-all"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group hover:shadow-xl hover:shadow-emerald-950/20"
          >
            <div>
              {/* Top Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                  {project.categoryLabel[lang]}
                </span>
                {getCategoryIcon(project.category)}
              </div>

              {/* Title & Short Description */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed line-clamp-3">
                {project.shortDesc}
              </p>

              {/* Key Metric Highlights */}
              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 mb-6 space-y-1.5 font-mono text-xs">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">{m.label[lang]}</span>
                    <span className="text-emerald-400 font-semibold">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Tech Stack (Zero-Pill Text Separators) */}
            <div>
              {/* Unboxed Tech Stack */}
              <div className="text-xs text-slate-400 mb-4 font-mono truncate">
                {project.techStack.join(' · ')}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectProject(project)}
                  className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span>{lang === 'pt' ? 'Detalhes & Specs' : 'Details & Specs'}</span>
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      onLoadCodeToSandbox(
                        project.sampleCode.code,
                        project.sampleCode.language,
                        project.title
                      )
                    }
                    className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1 cursor-pointer"
                    title={lang === 'pt' ? 'Inspecionar no Sandbox AST' : 'Inspect in AST Sandbox'}
                  >
                    <Code className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AST</span>
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                      title="GitHub Repository"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State if No Projects Match Search */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">
            {lang === 'pt'
              ? 'Nenhum projeto encontrado para o filtro aplicado.'
              : 'No projects found matching the selected filter.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 text-xs font-semibold text-emerald-400 underline cursor-pointer"
          >
            {lang === 'pt' ? 'Limpar filtros' : 'Clear filters'}
          </button>
        </div>
      )}

      {/* Flagship IDE Ecosystem Banner Highlight */}
      {flagshipProject && (
        <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl shadow-emerald-950/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-extrabold uppercase tracking-wider font-mono">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'pt' ? 'SISTEMA FLAGSHIP INTEGRADO' : 'INTEGRATED FLAGSHIP SYSTEM'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {flagshipProject.title}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {flagshipProject.fullDesc}
              </p>

              {/* Unboxed Highlights */}
              <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-slate-400">
                <span>AST Static Security</span>
                <span>·</span>
                <span>GraphRAG Cross-Instruction Risk</span>
                <span>·</span>
                <span>BPMN 2.0 Workflows</span>
                <span>·</span>
                <span>MCP Protocol STDIO/HTTP</span>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectProject(flagshipProject)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-950/40 cursor-pointer"
                >
                  {lang === 'pt' ? 'Ver Especificação Completa' : 'View Full Architecture Spec'}
                </button>

                <a
                  href="https://github.com/Mrcoantonioconceicao-ctrl/contratos-inteligentes"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 text-slate-300 hover:text-white font-semibold text-xs transition flex items-center space-x-2"
                >
                  <span>github.com/Mrcoantonioconceicao-ctrl/contratos-inteligentes</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Right Image Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 group">
                <img
                  src={ideDashboardPath}
                  alt="Solana Anchor DevSecOps IDE"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-xs font-mono text-slate-300 flex justify-between">
                  <span>GRAPH_RAG: ONLINE</span>
                  <span className="text-emerald-400">MCP SDK: CONNECTED</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
