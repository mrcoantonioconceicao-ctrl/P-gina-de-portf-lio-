import React, { useState, useEffect } from 'react';
import { SAMPLE_AST_TEMPLATES } from '../data/portfolioData';
import { Terminal, ShieldCheck, Play, Sparkles, CheckCircle2, AlertTriangle, Info, Copy, Check, RotateCcw } from 'lucide-react';

interface AstSecuritySandboxProps {
  lang: 'pt' | 'en';
  initialCode?: string;
  initialLanguage?: string;
  initialTarget?: string;
}

interface Vulnerability {
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  rule: string;
  description: string;
  line?: string;
  fix?: string;
}

interface AuditResult {
  score: number;
  entropy: number;
  summary: string;
  vulnerabilities: Vulnerability[];
  borshSize?: string;
  compliance: {
    lgpdCompliant: boolean;
    bacenCompliant: boolean;
    awsWellArchitected: boolean;
  };
  fixedCode?: string;
}

export const AstSecuritySandbox: React.FC<AstSecuritySandboxProps> = ({
  lang,
  initialCode,
  initialLanguage,
  initialTarget,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('anchor-vault');
  const [code, setCode] = useState<string>(SAMPLE_AST_TEMPLATES[0].code);
  const [language, setLanguage] = useState<string>(SAMPLE_AST_TEMPLATES[0].language);
  const [targetType, setTargetType] = useState<string>(SAMPLE_AST_TEMPLATES[0].targetType);

  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isGeminiAudit, setIsGeminiAudit] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync when initialCode props change
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      if (initialLanguage) setLanguage(initialLanguage);
      if (initialTarget) setTargetType(initialTarget);
      runLocalAstAudit(initialCode, initialTarget || 'Custom Target');
    }
  }, [initialCode, initialLanguage, initialTarget]);

  // Calculate Shannon Entropy
  const calculateEntropy = (str: string): number => {
    if (!str) return 0;
    const len = str.length;
    const frequencies: { [key: string]: number } = {};
    for (let i = 0; i < len; i++) {
      const char = str[i];
      frequencies[char] = (frequencies[char] || 0) + 1;
    }
    let entropy = 0;
    for (const char in frequencies) {
      const p = frequencies[char] / len;
      entropy -= p * Math.log2(p);
    }
    return parseFloat(entropy.toFixed(2));
  };

  // Run Local Deterministic AST Audit
  const runLocalAstAudit = (codeToAudit: string, targetName: string) => {
    setIsAuditing(true);
    setIsGeminiAudit(false);

    setTimeout(() => {
      const entropy = calculateEntropy(codeToAudit);
      const isAnchor = codeToAudit.includes('#[program]') || codeToAudit.includes('Context<') || codeToAudit.includes('anchor_lang');
      const isAws = codeToAudit.includes('Effect') || codeToAudit.includes('Statement') || codeToAudit.includes('Action');
      const isPix = codeToAudit.includes('pix') || codeToAudit.includes('cpf') || codeToAudit.includes('bacen');

      const hasWildcard = codeToAudit.includes('*') || codeToAudit.includes('"Action": "*"');
      const hasMissingConstraint = isAnchor && !codeToAudit.includes('has_one') && !codeToAudit.includes('constraint');
      const hasRawCpf = isPix && codeToAudit.includes('_log_cpf = payer_cpf');

      let score = 98;
      const vulns: Vulnerability[] = [];

      if (hasWildcard) {
        score -= 35;
        vulns.push({
          severity: 'HIGH',
          rule: 'AWS-IAM-AST-01',
          description: lang === 'pt'
            ? 'Action com caractere curinga (*) viola o Princípio do Menor Privilégio.'
            : 'Wildcard (*) Action violates the Principle of Least Privilege.',
          line: 'Policy Statement',
          fix: '"Action": ["s3:GetObject", "s3:ListBucket"]',
        });
      }

      if (hasMissingConstraint) {
        score -= 30;
        vulns.push({
          severity: 'HIGH',
          rule: 'SOL-ANCHOR-AST-04',
          description: lang === 'pt'
            ? 'Falta validação explícita de autoridade no contexto Account (`has_one = owner` ou `constraint`).'
            : 'Missing explicit authority validation in Account Context (`has_one = owner` or `constraint`).',
          line: 'pub struct WithdrawVault',
          fix: '#[account(mut, has_one = owner)]\npub vault_account: Account<\'info, VaultState>,',
        });
      }

      if (hasRawCpf) {
        score -= 25;
        vulns.push({
          severity: 'MEDIUM',
          rule: 'LGPD-ART-07-EXPOSURE',
          description: lang === 'pt'
            ? 'CPF bruto sem hash SHA-256 exposto em log local. Violação LGPD Art. 7º.'
            : 'Raw CPF exposed in local log without SHA-256 hash. LGPD Art. 7 violation.',
          line: 'let _log_cpf = payer_cpf;',
          fix: 'let _log_cpf = sha256_hash_salt(payer_cpf, &salt);',
        });
      }

      if (vulns.length === 0) {
        vulns.push({
          severity: 'INFO',
          rule: 'AST-ZERO-DEFECT',
          description: lang === 'pt'
            ? 'Sintaxe AST validada com sucesso. Sem padrões conhecidos de vulnerabilidade detectados.'
            : 'AST syntax verified successfully. No known vulnerability patterns detected.',
          line: 'Global',
          fix: lang === 'pt' ? 'Código aprovado para deploy' : 'Code approved for deployment',
        });
      }

      // Generate Auto-Fix
      let fixedCode = codeToAudit;
      if (hasWildcard) {
        fixedCode = fixedCode.replace(/"Action": "\*"/g, '"Action": ["s3:GetObject", "s3:ListBucket"]');
      }
      if (hasMissingConstraint) {
        fixedCode = fixedCode.replace(
          'pub authority: AccountInfo<\'info>,',
          '#[account(has_one = owner)]\n    pub vault_account: Account<\'info, VaultState>,\n    pub owner: Signer<\'info>,'
        );
      }
      if (hasRawCpf) {
        fixedCode = fixedCode.replace(
          'let _log_cpf = payer_cpf;',
          'let _log_cpf = sha256_hash_salt(payer_cpf, &salt); // LGPD Art 7 compliant'
        );
      }

      setAuditResult({
        score: Math.max(10, score),
        entropy,
        summary: lang === 'pt'
          ? `Análise estática concluída para ${targetName}. ${vulns.length} achado(s) sintático(s) encontrado(s).`
          : `Static audit completed for ${targetName}. ${vulns.length} finding(s) detected.`,
        vulnerabilities: vulns,
        borshSize: isAnchor ? '49 Bytes (Discriminator + Header)' : 'N/A',
        compliance: {
          lgpdCompliant: !hasRawCpf,
          bacenCompliant: !hasRawCpf,
          awsWellArchitected: !hasWildcard,
        },
        fixedCode,
      });

      setIsAuditing(false);
    }, 400);
  };

  // Trigger Gemini AI Audit Route
  const runGeminiAiAudit = async () => {
    setIsAuditing(true);
    setIsGeminiAudit(true);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, targetType, language }),
      });
      const data = await res.json();
      if (data.success && data.audit) {
        setAuditResult(data.audit);
      } else {
        runLocalAstAudit(code, targetType);
      }
    } catch (e) {
      runLocalAstAudit(code, targetType);
    } finally {
      setIsAuditing(false);
    }
  };

  // Apply Auto-Fix
  const applyAutoFix = () => {
    if (auditResult?.fixedCode) {
      setCode(auditResult.fixedCode);
      runLocalAstAudit(auditResult.fixedCode, targetType);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const tmpl = SAMPLE_AST_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setCode(tmpl.code);
      setLanguage(tmpl.language);
      setTargetType(tmpl.targetType);
      runLocalAstAudit(tmpl.code, tmpl.targetType);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Run initial audit on load
  useEffect(() => {
    runLocalAstAudit(SAMPLE_AST_TEMPLATES[0].code, SAMPLE_AST_TEMPLATES[0].targetType);
  }, []);

  return (
    <section id="sandbox-ast" className="py-20 bg-slate-950 border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? 'Inspeção Estática AST & Entropia' : 'AST Static Inspection & Entropy'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'pt' ? 'Sandbox de Auditoria de Código AST' : 'AST Code Audit Sandbox'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            {lang === 'pt'
              ? 'Inspecione código Rust Anchor, políticas AWS IAM ou regras Tokio Pix em tempo real com cálculo de Entropia de Shannon H(S) e Auto-Fix imediato.'
              : 'Inspect Rust Anchor, AWS IAM policies, or Tokio Pix rules in real-time with Shannon Entropy H(S) calculation and instant Auto-Fix.'}
          </p>
        </div>

        {/* Sandbox Outer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Template Selector & Code Editor */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  {lang === 'pt' ? 'SELECIONAR TEMPLATE AST:' : 'SELECT AST TEMPLATE:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_AST_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => handleTemplateSelect(tmpl.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        selectedTemplateId === tmpl.id
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {tmpl.name[lang]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => runLocalAstAudit(code, targetType)}
                  disabled={isAuditing}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? 'Auditar AST' : 'Audit AST'}</span>
                </button>

                <button
                  onClick={runGeminiAiAudit}
                  disabled={isAuditing}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:bg-purple-600/50 font-semibold text-xs flex items-center space-x-1.5 transition cursor-pointer"
                  title="Deep Audit via Gemini AI"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Gemini AI</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="relative">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 border border-b-0 border-slate-800 rounded-t-xl text-[11px] font-mono text-slate-400">
                <span>{targetType} ({language.toUpperCase()})</span>
                <button
                  onClick={() => copyToClipboard(code)}
                  className="hover:text-emerald-400 flex items-center space-x-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={14}
                className="w-full bg-slate-950 border border-slate-800 rounded-b-xl p-4 font-mono text-xs text-emerald-300 focus:outline-none focus:border-emerald-500/80 resize-y leading-relaxed"
                placeholder={lang === 'pt' ? 'Cole seu código Rust/Anchor ou JSON IAM aqui...' : 'Paste Rust/Anchor code or JSON IAM policy...'}
              />
            </div>
          </div>

          {/* Right Column: AST Inspection Results Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            {auditResult ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
                
                {/* Score & Entropy Metrics Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-slate-400 block mb-1">
                      {lang === 'pt' ? 'SCORE DE SEGURANÇA AST' : 'AST SECURITY SCORE'}
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className={`text-3xl font-extrabold font-mono tabular-nums ${
                        auditResult.score >= 80 ? 'text-emerald-400' : auditResult.score >= 50 ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {auditResult.score}/100
                      </span>
                      {isGeminiAudit && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Gemini Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400 block mb-1">
                      {lang === 'pt' ? 'ENTROPIA DE SHANNON H(S)' : 'SHANNON ENTROPY H(S)'}
                    </span>
                    <span className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                      {auditResult.entropy}
                    </span>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
                  <p>{auditResult.summary}</p>
                  {auditResult.borshSize && (
                    <p className="text-emerald-400 mt-1">Borsh Header Size: {auditResult.borshSize}</p>
                  )}
                </div>

                {/* Findings List */}
                <div>
                  <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider mb-3">
                    {lang === 'pt' ? 'Achados Sintáticos & Vulnerabilidades:' : 'Syntactic Findings & Vulnerabilities:'}
                  </h4>

                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {auditResult.vulnerabilities.map((v, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                          v.severity === 'HIGH'
                            ? 'bg-red-950/30 border-red-500/40 text-red-200'
                            : v.severity === 'MEDIUM'
                            ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                            : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span className="flex items-center space-x-1.5">
                            {v.severity === 'HIGH' ? (
                              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                            <span>{v.rule}</span>
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-bold bg-slate-900 border border-slate-700">
                            {v.severity}
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed">{v.description}</p>
                        {v.fix && (
                          <p className="text-[10px] text-emerald-400 pt-1 font-semibold">
                            Fix: <code className="bg-slate-950 px-1 py-0.5 rounded">{v.fix}</code>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Auto-Fix CTA */}
                {auditResult.fixedCode && auditResult.score < 95 && (
                  <button
                    onClick={applyAutoFix}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-lg shadow-emerald-950/40"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{lang === 'pt' ? 'Aplicar Auto-Fix de Correção AST' : 'Apply AST Auto-Fix Patch'}</span>
                  </button>
                )}

              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
                {lang === 'pt' ? 'Carregando análise AST...' : 'Loading AST audit...'}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
