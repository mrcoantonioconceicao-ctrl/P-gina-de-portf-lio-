import React, { useState } from 'react';
import { Zap, ArrowRight, CheckCircle2, Play, RefreshCw, Cpu, Layers } from 'lucide-react';

interface NexaPaySimulatorProps {
  lang: 'pt' | 'en';
}

export const NexaPaySimulator: React.FC<NexaPaySimulatorProps> = ({ lang }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const steps = [
    {
      title: { pt: '1. Depósito Pix BACEN', en: '1. BACEN Pix Deposit' },
      desc: {
        pt: 'Cliente inicia pagamento via QR Code Pix. Webhook autenticado do Banco Central é emitido com HMAC SHA256.',
        en: 'Client initiates Pix QR Code payment. Authenticated Central Bank webhook dispatched with HMAC SHA256 signature.',
      },
      statusText: 'WEBHOOK_RECEIVED',
    },
    {
      title: { pt: '2. Orquestração Saga Dual-Rail', en: '2. Dual-Rail Saga Orchestration' },
      desc: {
        pt: 'Orquestrador Saga valida a ordem de câmbio híbrido e prepara a transação Solana sem custódia (Escrowless).',
        en: 'Saga orchestrator validates hybrid FX order and prepares non-custodial (Escrowless) Solana transaction.',
      },
      statusText: 'SAGA_PREPARED',
    },
    {
      title: { pt: '3. Notificação Agente AI via MCP', en: '3. MCP AI Agent Event Dispatch' },
      desc: {
        pt: 'Notificação transmitida via Model Context Protocol (MCP) para validação por agentes autônomos de liquidação.',
        en: 'Notification dispatched via Model Context Protocol (MCP) for autonomous agent settlement verification.',
      },
      statusText: 'MCP_EVENT_EMITTED',
    },
    {
      title: { pt: '4. Liquidação On-Chain Solana USDC', en: '4. On-Chain Solana USDC Settlement' },
      desc: {
        pt: 'Disparo de transferência USDC via derivador PDA com timelock na Solana. Transação finalizada em 1.4s.',
        en: 'USDC transfer dispatched via Solana timelocked PDA derivator. Transaction finalized on-chain in 1.4s.',
      },
      statusText: 'ONCHAIN_FINALIZED',
    },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const handleAutoRun = () => {
    setIsExecuting(true);
    setCurrentStep(0);

    let stepCounter = 0;
    const interval = setInterval(() => {
      stepCounter++;
      if (stepCounter < steps.length) {
        setCurrentStep(stepCounter);
      } else {
        clearInterval(interval);
        setIsExecuting(false);
      }
    }, 1200);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-teal-400 text-xs font-bold font-mono uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4" />
            <span>NEXA PAY DUAL-RAIL PIPELINE</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {lang === 'pt' ? 'Simulador de Pagamentos Híbridos (PIX ➔ Solana USDC)' : 'Hybrid Payment Simulator (PIX ➔ Solana USDC)'}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleAutoRun}
            disabled={isExecuting}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition flex items-center space-x-2 cursor-pointer shadow-lg shadow-teal-950/40"
          >
            {isExecuting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>{lang === 'pt' ? 'Executar Dual-Rail Live' : 'Auto Run Dual-Rail'}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs font-mono transition cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Interactive Stepper Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const isActive = currentStep === idx;
          const isCompleted = currentStep > idx;

          return (
            <div
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-950/30 border-teal-500 text-white shadow-lg shadow-teal-950/20'
                  : isCompleted
                  ? 'bg-slate-950/80 border-slate-700 text-slate-300'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase text-slate-400">PASSO 0{idx + 1}</span>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-teal-400 animate-pulse' : 'bg-slate-700'}`} />
                )}
              </div>

              <h4 className="text-xs font-bold text-white mb-1">{step.title[lang]}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{step.desc[lang]}</p>
            </div>
          );
        })}
      </div>

      {/* Active Step Deep Inspector */}
      <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800/80 pb-2">
          <span>SAGA_STATUS: <span className="text-teal-400 font-bold">{steps[currentStep].statusText}</span></span>
          <span>STEP {currentStep + 1} OF 4</span>
        </div>

        <p className="text-slate-300 leading-relaxed">{steps[currentStep].desc[lang]}</p>

        <div className="pt-2 flex justify-between items-center">
          <span className="text-slate-500 text-[10px]">
            Dual-Rail Escrowless PDA: <code className="text-teal-300">8Kx9...NexaPayVault</code>
          </span>

          {currentStep < steps.length - 1 && (
            <button
              onClick={handleNextStep}
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center space-x-1 cursor-pointer"
            >
              <span>{lang === 'pt' ? 'Próximo Passo' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
