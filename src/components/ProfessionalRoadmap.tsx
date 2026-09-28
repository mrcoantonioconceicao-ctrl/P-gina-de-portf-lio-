import React, { useState, useRef, useEffect } from 'react';
import { ROADMAP_MILESTONES, RoadmapMilestone } from '../data/portfolioData';
import { Milestone, ChevronDown, ChevronUp, Cpu, Shield, Terminal, Layers, Zap, CheckCircle2, Award, Info } from 'lucide-react';

interface ProfessionalRoadmapProps {
  lang: 'pt' | 'en';
}

interface TechStats {
  exp: { pt: string; en: string };
  highlight: { pt: string; en: string };
}

const TECH_TOOLTIP_DATA: Record<string, TechStats> = {
  'Solana SVM': {
    exp: { pt: '2+ anos de experiência', en: '2+ years exp' },
    highlight: { pt: 'Smart contracts Anchor v0.30 & Deserialização Borsh 49B', en: 'Anchor v0.30 smart contracts & 49B Borsh deserialization' },
  },
  'Anchor v0.30': {
    exp: { pt: '2+ anos de experiência', en: '2+ years exp' },
    highlight: { pt: 'Auditoria estática de AST & Verificação de restrições Signer/Owner', en: 'AST static auditing & Signer/Owner constraint checks' },
  },
  'MCP Protocol': {
    exp: { pt: '1+ ano (Pioneiro)', en: '1+ year (Pioneer)' },
    highlight: { pt: 'Servidores STDIO/HTTP oficiais para orquestração por Agentes IA', en: 'Official STDIO/HTTP servers for AI Agent orchestration' },
  },
  'Rust AST': {
    exp: { pt: '3+ anos de experiência', en: '3+ years exp' },
    highlight: { pt: 'Parsers de sintaxe abstrata, linters customizados e análise de segurança', en: 'Abstract syntax parsers, custom linters & security analysis' },
  },
  'Borsh Layout': {
    exp: { pt: '2+ anos de experiência', en: '2+ years exp' },
    highlight: { pt: 'Garantia de alinhamento zerado e discriminator de 8 bytes + 41B header', en: 'Zeroed layout guarantees & 8-byte discriminator + 41B header' },
  },
  'GraphRAG': {
    exp: { pt: '3+ anos de experiência', en: '3+ years exp' },
    highlight: { pt: 'Travesia de triplas de risco no Neo4j e busca relacional vetorial', en: 'Neo4j risk triple traversal & relational vector queries' },
  },
  'TypeScript': {
    exp: { pt: '7+ anos de experiência', en: '7+ years exp' },
    highlight: { pt: 'Sistemas enterprise, parsers AST type-safe e CLIs em Node/Bun', en: 'Enterprise systems, type-safe AST parsers & Node/Bun CLIs' },
  },
  'Rust': {
    exp: { pt: '4+ anos de experiência', en: '4+ years exp' },
    highlight: { pt: 'Motores Tokio async de alta concorrência e SLAs P99 < 8ms', en: 'High-concurrency Tokio async engines & P99 < 8ms SLAs' },
  },
  'Tokio Async': {
    exp: { pt: '4+ anos de experiência', en: '4+ years exp' },
    highlight: { pt: 'Alocação de memória zero-copy e multithreading de baixa latência', en: 'Zero-copy memory allocation & low-latency multithreading' },
  },
  'Neo4j': {
    exp: { pt: '3+ anos de experiência', en: '3+ years exp' },
    highlight: { pt: 'Queries Cypher pré-compiladas para decisão de fraude em 3.2ms', en: 'Pre-compiled Cypher queries for fraud decision in 3.2ms' },
  },
  'BACEN Pix': {
    exp: { pt: '3+ anos de experiência', en: '3+ years exp' },
    highlight: { pt: 'Conformidade Resolução 147/2021 & Webhooks de até 35.000 TPS', en: 'BACEN Res. 147/2021 compliance & webhooks up to 35,000 TPS' },
  },
  'LGPD Art. 7': {
    exp: { pt: '4+ anos de experiência', en: '4+ years exp' },
    highlight: { pt: 'Anonimização SHA-256 + Salting dinâmico para dados bancários', en: 'SHA-256 + dynamic salting anonymization for banking payloads' },
  },
  'SHA-256 Salt': {
    exp: { pt: '4+ anos de experiência', en: '4+ years exp' },
    highlight: { pt: 'Hashes criptográficos protegendo contra vazamentos sensíveis', en: 'Cryptographic hashes preventing sensitive data leaks' },
  },
  'AWS IAM': {
    exp: { pt: '5+ anos de experiência', en: '5+ years exp' },
    highlight: { pt: 'Auditoria de políticas, eliminando 100% dos wildcards (*)', en: 'Policy auditing, eliminating 100% of wildcard (*) permissions' },
  },
  'Shannon Entropy': {
    exp: { pt: '3+ anos de experiência', en: '3+ years exp' },
    highlight: { pt: 'Cálculo matemático H(S) = -sum(p_i * log2 p_i) para segredos', en: 'Mathematical entropy calculation H(S) detecting exposed keys' },
  },
  'SAT Solvers': {
    exp: { pt: '2+ anos de experiência', en: '2+ years exp' },
    highlight: { pt: 'Provas formais de acessibilidade e alcance de privilégios em nuvem', en: 'Formal proofs of privilege reachability in cloud environments' },
  },
  'LGPD Art. 46 & 48': {
    exp: { pt: '4+ anos de experiência', en: '4+ years exp' },
    highlight: { pt: 'Padrão Zero-Trust e notificação automatizada de incidentes', en: 'Zero-Trust standard and automated incident notification' },
  },
  'Termux': {
    exp: { pt: '4+ anos de experiência', en: '4+ years exp' },
    highlight: { pt: 'DevSecOps autônomo e pipelines CI/CD em nós móveis ARM', en: 'Autonomous DevSecOps & CI/CD pipelines on mobile ARM nodes' },
  },
  'Bun': {
    exp: { pt: '2+ anos de experiência', en: '2+ years exp' },
    highlight: { pt: 'Runtime JS/TS de ultra velocidade consumindo < 65MB de RAM', en: 'Ultra-fast JS/TS runtime consuming < 65MB RAM' },
  },
  'Cheerio': {
    exp: { pt: '3+ anos de experiência', en: '3+ years exp' },
    highlight: { pt: 'Raspagem web de alta velocidade processando 1.200 docs/min', en: 'High-speed web scraping processing 1,200 docs/min' },
  },
  'GitHub Actions': {
    exp: { pt: '5+ anos de experiência', en: '5+ years exp' },
    highlight: { pt: 'Automação de PRs, pre-flight checks e assinaturas GPG', en: 'PR automation, pre-flight checks & GPG commit verification' },
  },
  'Shell/Bash': {
    exp: { pt: '8+ anos de experiência', en: '8+ years exp' },
    highlight: { pt: 'Scripts de orquestração resilientes, pre-commit hooks & CLI agents', en: 'Resilient orchestration scripts, pre-commit hooks & CLI agents' },
  },
  'DDD': {
    exp: { pt: '8+ anos de experiência', en: '8+ years exp' },
    highlight: { pt: 'Bounded Contexts, linguagens ubíquas & arquitetura limpa', en: 'Bounded Contexts, ubiquitous languages & clean architecture' },
  },
  'SOA': {
    exp: { pt: '8+ anos de experiência', en: '8+ years exp' },
    highlight: { pt: 'Microsserviços desacoplados e mensageria de eventos assíncronos', en: 'Decoupled microservices & asynchronous event messaging' },
  },
  'BPMN 2.0': {
    exp: { pt: '6+ anos de experiência', en: '6+ years exp' },
    highlight: { pt: 'Orquestração visual de processos e governança técnica', en: 'Visual process orchestration & technical governance' },
  },
  'Distributed Microservices': {
    exp: { pt: '7+ anos de experiência', en: '7+ years exp' },
    highlight: { pt: 'Migração de monolitos para microsserviços orientados a eventos', en: 'Monolith migration to event-driven microservices' },
  },
  'REST & gRPC APIs': {
    exp: { pt: '8+ anos de experiência', en: '8+ years exp' },
    highlight: { pt: 'APIs de alta performance com contratos protobuf e OpenAPI', en: 'High-performance APIs with protobuf and OpenAPI contracts' },
  },
  'SQL / NoSQL': {
    exp: { pt: '8+ anos de experiência', en: '8+ years exp' },
    highlight: { pt: 'PostgreSQL, Redis, Neo4j, MongoDB e bancos relacionais/vetoriais', en: 'PostgreSQL, Redis, Neo4j, MongoDB & relational/vector DBs' },
  },
};

interface TechBadgeProps {
  techName: string;
  lang: 'pt' | 'en';
}

const TechBadgeWithTooltip: React.FC<TechBadgeProps> = ({ techName, lang }) => {
  const [isHovered, setIsHovered] = useState(false);
  const data = TECH_TOOLTIP_DATA[techName] || {
    exp: { pt: 'Especialista', en: 'Specialist' },
    highlight: { pt: 'Arquitetura de alta performance & produção', en: 'High-performance production architecture' },
  };

  return (
    <span
      className="relative inline-block group/tech cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      aria-label={`Technology ${techName}: ${data.exp[lang]}`}
    >
      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 group-hover/tech:text-emerald-400 group-hover/tech:border-emerald-500/50 transition-all font-mono text-xs">
        <span>{techName}</span>
        <Info className="w-3 h-3 text-slate-500 group-hover/tech:text-emerald-400 transition-colors shrink-0" />
      </span>

      {/* Hover Floating Tooltip Box */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-950/95 border border-emerald-500/40 rounded-xl shadow-2xl backdrop-blur-md z-30 pointer-events-none animate-fadeIn font-sans text-left">
          {/* Tooltip Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80 mb-1.5 font-mono">
            <span className="font-bold text-white text-xs">{techName}</span>
            <span className="text-[10px] font-semibold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              {data.exp[lang]}
            </span>
          </div>

          {/* Achievement Stat / Highlight */}
          <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
            {data.highlight[lang]}
          </p>

          {/* Bottom Tooltip Arrow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-950 border-r border-b border-emerald-500/40 rotate-45" />
        </div>
      )}
    </span>
  );
};

interface TimelineItemProps {
  milestone: RoadmapMilestone;
  index: number;
  isExpanded: boolean;
  lang: 'pt' | 'en';
  onToggleExpand: (id: string) => void;
  getCategoryIcon: (category: string) => React.ReactNode;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  milestone,
  index,
  isExpanded,
  lang,
  onToggleExpand,
  getCategoryIcon,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
      className={`relative group transform transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      {/* Timeline Connector Node Badge */}
      <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-2xl bg-slate-950 border-2 border-emerald-500/50 flex items-center justify-center shadow-lg shadow-emerald-950/50 group-hover:border-emerald-400 group-hover:scale-110 transition-all">
        {getCategoryIcon(milestone.category)}
      </div>

      {/* Milestone Card */}
      <div className="bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/40 rounded-3xl p-6 sm:p-8 transition-all duration-200 shadow-xl space-y-6">
        
        {/* Milestone Top Meta Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold text-emerald-400 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              {milestone.yearPeriod}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {milestone.categoryLabel[lang]}
            </span>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => onToggleExpand(milestone.id)}
            className="flex items-center space-x-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition cursor-pointer shrink-0"
          >
            <span>
              {isExpanded
                ? lang === 'pt' ? 'Recolher Detalhes' : 'Collapse Details'
                : lang === 'pt' ? 'Ver Especificação Técnica' : 'View Tech Specs'}
            </span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Role Title & Focus */}
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
            {milestone.role[lang]}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-emerald-300/90 font-medium mb-4">
            {milestone.focusArea[lang]}
          </p>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {milestone.summary[lang]}
          </p>
        </div>

        {/* Technologies List with Hover Tooltips */}
        <div className="pt-2 border-t border-slate-800/60 font-mono text-xs text-slate-400 flex flex-wrap items-center gap-2">
          <span className="text-slate-500 font-bold uppercase">{lang === 'pt' ? 'STACK:' : 'STACK:'}</span>
          {milestone.technologies.map((tech, tIdx) => (
            <React.Fragment key={tIdx}>
              <TechBadgeWithTooltip techName={tech} lang={lang} />
              {tIdx < milestone.technologies.length - 1 && <span className="text-slate-600">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Toggleable Deep Technical Details */}
        {isExpanded && (
          <div className="pt-6 border-t border-slate-800/80 space-y-6 animate-fadeIn">
            
            {/* Key Achievements Bullets */}
            <div>
              <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'pt' ? 'Realizações de Arquitetura & Código:' : 'Architecture & Engineering Achievements:'}</span>
              </h4>

              <ul className="space-y-2 text-xs font-mono text-slate-300">
                {milestone.keyAchievements[lang].map((achievement, aIdx) => (
                  <li key={aIdx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architectural Impact */}
            <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-xs font-mono space-y-1">
              <span className="text-emerald-400 font-bold uppercase block mb-1">
                {lang === 'pt' ? 'IMPACTO SISTÊMICO & SEGURANÇA:' : 'SYSTEMIC & SECURITY IMPACT:'}
              </span>
              <p className="text-slate-300 leading-relaxed">
                {milestone.architecturalImpact[lang]}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 font-mono text-xs">
              {milestone.metrics.map((m, mIdx) => (
                <div key={mIdx} className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">{m.label[lang]}</span>
                  <span className="text-emerald-400 font-bold">{m.value}</span>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export const ProfessionalRoadmap: React.FC<ProfessionalRoadmapProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(['milestone-2025-2026', 'milestone-2023-2025'])
  );

  const categories = [
    { id: 'all', label: lang === 'pt' ? 'Todas as Fases' : 'All Eras' },
    { id: 'flagship', label: 'Flagship Web3' },
    { id: 'rust_pix', label: 'Rust & Pix' },
    { id: 'cloud_security', label: 'Cloud Security' },
    { id: 'devsecops', label: 'DevSecOps' },
    { id: 'architecture', label: 'Arquitetura Core' },
  ];

  const filteredMilestones = ROADMAP_MILESTONES.filter((m) => {
    return selectedCategory === 'all' || m.category === selectedCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(ROADMAP_MILESTONES.map((m) => m.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'flagship':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'rust_pix':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'cloud_security':
        return <Shield className="w-5 h-5 text-blue-400" />;
      case 'devsecops':
        return <Terminal className="w-5 h-5 text-purple-400" />;
      default:
        return <Layers className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="roadmap" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
          <Milestone className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'pt' ? 'Evolução Técnica & Marcos de Carreira' : 'Technical Evolution & Career Milestones'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
          {lang === 'pt' ? 'Roadmap de Arquitetura & Engenharia' : 'Engineering & Architecture Roadmap'}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          {lang === 'pt'
            ? 'A trajetória executiva de Marco Antônio Conceição: passe o cursor sobre as tecnologias da stack para explorar anos de experiência e estatísticas de conquistas técnicas.'
            : 'Marco Antônio Conceição\'s executive trajectory: hover over technology stack badges to explore years of experience and key achievement stats.'}
        </p>
      </div>

      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
        
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Global Expand / Collapse */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-white text-xs font-mono transition cursor-pointer"
          >
            {lang === 'pt' ? 'Expandir Todos' : 'Expand All'}
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs font-mono transition cursor-pointer"
          >
            {lang === 'pt' ? 'Recolher Todos' : 'Collapse All'}
          </button>
        </div>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800/80 space-y-12">
        {filteredMilestones.map((milestone, idx) => (
          <TimelineItem
            key={milestone.id}
            milestone={milestone}
            index={idx}
            isExpanded={expandedIds.has(milestone.id)}
            lang={lang}
            onToggleExpand={toggleExpand}
            getCategoryIcon={getCategoryIcon}
          />
        ))}
      </div>

    </section>
  );
};
