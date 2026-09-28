import React, { useState } from 'react';
import { Layers, ShieldCheck, GitPullRequest, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';

interface BpmnWorkflowExplorerProps {
  lang: 'pt' | 'en';
}

export const BpmnWorkflowExplorer: React.FC<BpmnWorkflowExplorerProps> = ({ lang }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-ast');

  const nodes = [
    {
      id: 'node-git',
      title: { pt: '1. Evento GitHub Sync', en: '1. GitHub Sync Trigger' },
      role: 'CI/CD Event',
      desc: {
        pt: 'WebHook acionado em mrcoantonioconceicao-ctrl/contratos-inteligentes ao abrir Pull Request.',
        en: 'Webhook triggered on mrcoantonioconceicao-ctrl/contratos-inteligentes when PR is opened.',
      },
      rules: ['Verificação SHA-256 de Commit', 'GPG Signature Check', 'Termux Pre-flight Hook'],
    },
    {
      id: 'node-ast',
      title: { pt: '2. Parser AST Rust/Anchor', en: '2. Rust/Anchor AST Parser' },
      role: 'AST Static Scanner',
      desc: {
        pt: 'Gera a Árvore Sintática Abstrata do programa Anchor e calcula o discriminador de 8 bytes e alinhamento Borsh.',
        en: 'Generates Abstract Syntax Tree for Anchor program, calculates 8-byte discriminator and Borsh alignment.',
      },
      rules: ['Discriminator 8-byte check', 'Borsh 49-byte layout validation', 'Constraint has_one check'],
    },
    {
      id: 'node-graphrag',
      title: { pt: '3. Grafo Risk Node GraphRAG', en: '3. GraphRAG Risk Node Graph' },
      role: 'Graph Security Service',
      desc: {
        pt: 'Inspeciona chamadas cruzadas de instrução (cross-instruction reentrancy & CPI calls) no Neo4j.',
        en: 'Inspects cross-instruction CPI calls and reentrancy vectors on Neo4j graph nodes.',
      },
      rules: ['CPI Reentrancy Traversal', 'Account Owner Validation', 'PDA Bump Seed Check'],
    },
    {
      id: 'node-mcp',
      title: { pt: '4. Servidor MCP & Auto-PR', en: '4. MCP Server & Auto-PR' },
      role: 'Protocol & Remediation',
      desc: {
        pt: 'Servidor MCP (@modelcontextprotocol/sdk) formata o relatório de auditoria e submete o Auto-Fix via GitHub API.',
        en: 'MCP Server (@modelcontextprotocol/sdk) structures audit report and submits Auto-Fix via GitHub API.',
      },
      rules: ['MCP Tool Call STDIO', 'Auto-Fix PR Generation', 'Cryptographic Signature Audit'],
    },
  ];

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>BPMN 2.0 WORKFLOW & GRAPHRAG DEVSECOPS ORCHESTRATOR</span>
        </div>
        <h3 className="text-xl font-extrabold text-white">
          {lang === 'pt' ? 'Orquestrador de Processos de Segurança DevSecOps' : 'DevSecOps Security Process Orchestrator'}
        </h3>
      </div>

      {/* BPMN Workflow Node Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {nodes.map((node, idx) => {
          const isSelected = node.id === selectedNodeId;

          return (
            <div
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-950/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">{node.role}</span>
                <h4 className="text-xs font-bold text-white mb-2">{node.title[lang]}</h4>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-800/60">
                <span>STAGE 0{idx + 1}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details */}
      <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">{activeNode.title[lang]}</span>
          </div>
          <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px]">
            {activeNode.role}
          </span>
        </div>

        <p className="text-slate-300 leading-relaxed">{activeNode.desc[lang]}</p>

        <div>
          <span className="text-[11px] font-bold text-slate-400 block mb-2">
            {lang === 'pt' ? 'REGRAS DE VALIDAÇÃO EXECUTADAS:' : 'EXECUTED VALIDATION RULES:'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {activeNode.rules.map((rule, idx) => (
              <div key={idx} className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-[11px] flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
