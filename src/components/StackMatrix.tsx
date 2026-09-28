import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { ShieldCheck, Cpu, Code, Database, Lock, CheckCircle } from 'lucide-react';

interface StackMatrixProps {
  lang: 'pt' | 'en';
}

export const StackMatrix: React.FC<StackMatrixProps> = ({ lang }) => {
  return (
    <section id="stack" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
          {lang === 'pt' ? 'Stack Tecnológica & Matriz de Competências' : 'Tech Stack & Competency Matrix'}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          {lang === 'pt'
            ? 'Domínio profundo de linguagens de sistemas, ecossistemas em nuvem, criptografia e conformidade regulatória.'
            : 'Deep mastery of systems languages, cloud ecosystems, cryptography, and regulatory compliance.'}
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
            
            {/* Category Title */}
            <div className="mb-6 border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white mb-1">
                {cat.title[lang]}
              </h3>
              <p className="text-xs text-slate-400">
                {cat.description[lang]}
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 flex flex-col justify-between hover:border-emerald-500/40 transition">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-white">{skill.name}</span>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold block mb-3">
                      {skill.level}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {skill.desc[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
