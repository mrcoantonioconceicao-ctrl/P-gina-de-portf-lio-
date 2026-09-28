import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ProfessionalRoadmap } from './components/ProfessionalRoadmap';
import { AstSecuritySandbox } from './components/AstSecuritySandbox';
import { PixSlaSimulator } from './components/PixSlaSimulator';
import { NexaPaySimulator } from './components/NexaPaySimulator';
import { BpmnWorkflowExplorer } from './components/BpmnWorkflowExplorer';
import { StackMatrix } from './components/StackMatrix';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AiTwinModal } from './components/AiTwinModal';
import { Project } from './data/portfolioData';

export default function App() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAiTwinOpen, setIsAiTwinOpen] = useState<boolean>(false);

  // AST Sandbox loading state
  const [sandboxCode, setSandboxCode] = useState<string | undefined>(undefined);
  const [sandboxLang, setSandboxLang] = useState<string | undefined>(undefined);
  const [sandboxTarget, setSandboxTarget] = useState<string | undefined>(undefined);

  const handleLoadCodeToSandbox = (code: string, language: string, targetType: string) => {
    setSandboxCode(code);
    setSandboxLang(language);
    setSandboxTarget(targetType);

    const sandboxEl = document.getElementById('sandbox-ast');
    if (sandboxEl) {
      sandboxEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 min-h-screen">
      
      {/* Top Header Navigation */}
      <Header
        lang={lang}
        setLang={setLang}
        onOpenAiTwin={() => setIsAiTwinOpen(true)}
      />

      {/* Hero Section */}
      <Hero lang={lang} />

      {/* Main Portfolio Grid */}
      <ProjectsGrid
        lang={lang}
        onSelectProject={(project) => setSelectedProject(project)}
        onLoadCodeToSandbox={handleLoadCodeToSandbox}
      />

      {/* Professional Career Roadmap */}
      <ProfessionalRoadmap lang={lang} />

      {/* AST Security Sandbox Inspector */}
      <AstSecuritySandbox
        lang={lang}
        initialCode={sandboxCode}
        initialLanguage={sandboxLang}
        initialTarget={sandboxTarget}
      />

      {/* PIX Antifraud Sub-8ms SLA Simulator */}
      <PixSlaSimulator lang={lang} />

      {/* Interactive Architecture Demonstrations (Nexa Pay & BPMN Workflow) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <NexaPaySimulator lang={lang} />
        <BpmnWorkflowExplorer lang={lang} />
      </section>

      {/* Tech Stack & Competency Matrix */}
      <StackMatrix lang={lang} />

      {/* Contact & Consultation Section */}
      <ContactSection lang={lang} />

      {/* Project Detail Whitepaper Modal */}
      <ProjectDetailModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
        onLoadCodeToSandbox={handleLoadCodeToSandbox}
      />

      {/* Gemini AI Twin Chat Drawer */}
      <AiTwinModal
        isOpen={isAiTwinOpen}
        lang={lang}
        onClose={() => setIsAiTwinOpen(false)}
      />

    </div>
  );
}
