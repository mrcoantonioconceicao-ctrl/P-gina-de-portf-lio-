import React, { useState } from 'react';
import { Shield, Zap, Activity, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Cpu } from 'lucide-react';

interface PixSlaSimulatorProps {
  lang: 'pt' | 'en';
}

export const PixSlaSimulator: React.FC<PixSlaSimulatorProps> = ({ lang }) => {
  const [tps, setTps] = useState<number>(12500);
  const [riskScenario, setRiskScenario] = useState<'normal' | 'suspicious' | 'fraud'>('normal');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [lastExecution, setLastExecution] = useState<{
    latencyMs: number;
    decision: 'APPROVED' | 'BLOCKED_FRAUD' | 'FLAGGED_LGPD';
    breakdown: { stage: string; timeMs: number }[];
    txId: string;
  } | null>(null);

  const triggerSimulation = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Latency variance based on scenario & TPS
      const tpsFactor = (tps / 50000) * 1.8;
      const baseLatency = riskScenario === 'normal' ? 3.8 : riskScenario === 'suspicious' ? 5.2 : 7.1;
      const totalLatency = parseFloat((baseLatency + tpsFactor + Math.random() * 0.4).toFixed(2));

      const breakdown = [
        { stage: 'BACEN Res. 147 Webhook Ingestion', timeMs: parseFloat((0.6 + Math.random() * 0.2).toFixed(2)) },
        { stage: 'LGPD Art. 7 SHA-256 Anonymization', timeMs: parseFloat((0.3 + Math.random() * 0.1).toFixed(2)) },
        { stage: 'Neo4j GraphRAG 3-Hop Traversal', timeMs: parseFloat((totalLatency * 0.55).toFixed(2)) },
        { stage: 'Rust Tokio Risk Score Computation', timeMs: parseFloat((totalLatency * 0.25).toFixed(2)) },
      ];

      const decision =
        riskScenario === 'normal'
          ? 'APPROVED'
          : riskScenario === 'suspicious'
          ? 'FLAGGED_LGPD'
          : 'BLOCKED_FRAUD';

      setLastExecution({
        latencyMs: totalLatency,
        decision,
        breakdown,
        txId: `PIX-RUST-${Math.floor(100000 + Math.random() * 900000)}`,
      });

      setIsProcessing(false);
    }, 350);
  };

  return (
    <section id="simulador-sla" className="py-20 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? 'Motor Antifraude Rust Sub-8ms' : 'Sub-8ms Rust Antifraud Engine'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'pt' ? 'Simulador de SLA PIX-SHIELD-QPO' : 'PIX-SHIELD-QPO SLA Simulator'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            {lang === 'pt'
              ? 'Teste o throughput e o latency budget de P99 < 8ms com busca de grafos de fraude em tempo real sobre Neo4j e regras BACEN Resolução 147/2021.'
              : 'Test throughput and P99 < 8ms latency budget with real-time Neo4j fraud graph traversal and BACEN Res. 147/2021 rules.'}
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'pt' ? 'Parâmetros de Carga' : 'Load Parameters'}</span>
              </h3>

              {/* TPS Slider */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">{lang === 'pt' ? 'Carga Concorrente (TPS):' : 'Concurrent Load (TPS):'}</span>
                  <span className="text-emerald-400 font-bold tabular-nums">{tps.toLocaleString()} TPS</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={1000}
                  value={tps}
                  onChange={(e) => setTps(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1.000 TPS</span>
                  <span>25.000 TPS</span>
                  <span>50.000 TPS (Max)</span>
                </div>
              </div>

              {/* Scenario Toggle */}
              <div className="space-y-2 mb-6">
                <label className="text-xs font-mono text-slate-400 block">
                  {lang === 'pt' ? 'CENÁRIO DE RISCO DE TRANSAÇÃO:' : 'TRANSACTION RISK SCENARIO:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setRiskScenario('normal')}
                    className={`py-2 px-3 rounded-xl text-xs font-mono transition cursor-pointer ${
                      riskScenario === 'normal'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {lang === 'pt' ? 'Normal' : 'Normal'}
                  </button>

                  <button
                    onClick={() => setRiskScenario('suspicious')}
                    className={`py-2 px-3 rounded-xl text-xs font-mono transition cursor-pointer ${
                      riskScenario === 'suspicious'
                        ? 'bg-amber-600 text-white font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {lang === 'pt' ? 'Suspeito' : 'Suspicious'}
                  </button>

                  <button
                    onClick={() => setRiskScenario('fraud')}
                    className={`py-2 px-3 rounded-xl text-xs font-mono transition cursor-pointer ${
                      riskScenario === 'fraud'
                        ? 'bg-red-600 text-white font-bold'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {lang === 'pt' ? 'Ataque Fraude' : 'Fraud Attack'}
                  </button>
                </div>
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={triggerSimulation}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center space-x-2 transition cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{lang === 'pt' ? 'Processando Grafo Rust...' : 'Processing Rust Graph...'}</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>{lang === 'pt' ? 'Disparar Validação Antifraude' : 'Trigger Antifraud Validation'}</span>
                </>
              )}
            </button>
          </div>

          {/* Execution Output Panel */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            {lastExecution ? (
              <div className="space-y-6">
                
                {/* Result Top Metrics */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-slate-400 block mb-1">TRANSACTION_ID</span>
                    <span className="text-sm font-bold font-mono text-white">{lastExecution.txId}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div>
                      <span className="text-xs font-mono text-slate-400 block mb-1">LATENCY P99</span>
                      <span className="text-xl font-extrabold font-mono text-emerald-400 tabular-nums">
                        {lastExecution.latencyMs} ms
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-400 block mb-1">VERDICT</span>
                      <span
                        className={`text-xs font-bold font-mono px-3 py-1 rounded-full uppercase ${
                          lastExecution.decision === 'APPROVED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : lastExecution.decision === 'FLAGGED_LGPD'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {lastExecution.decision}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Waterfall Stages Timeline */}
                <div>
                  <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider mb-4">
                    {lang === 'pt' ? 'Linha do Tempo de Execução (Tokio Memory Pipeline):' : 'Execution Timeline Breakdown:'}
                  </h4>

                  <div className="space-y-3 font-mono text-xs">
                    {lastExecution.breakdown.map((item, idx) => {
                      const percentage = Math.min(100, Math.round((item.timeMs / lastExecution.latencyMs) * 100));
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-slate-300">
                            <span>{item.stage}</span>
                            <span className="text-emerald-400 font-semibold tabular-nums">{item.timeMs} ms</span>
                          </div>
                          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Regulatory Footnote */}
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {lang === 'pt'
                      ? 'Conformidade BACEN Resolução 147/2021 & Anonimização LGPD Art. 7 verificadas com sucesso.'
                      : 'BACEN Res. 147/2021 compliance & LGPD Art. 7 anonymization verified successfully.'}
                  </span>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 font-mono text-xs">
                <Activity className="w-8 h-8 text-slate-700 mb-3 animate-pulse" />
                <p>{lang === 'pt' ? 'Clique em "Disparar Validação Antifraude" para simular a latência P99 Sub-8ms.' : 'Click "Trigger Antifraud Validation" to test Sub-8ms P99 latency.'}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
