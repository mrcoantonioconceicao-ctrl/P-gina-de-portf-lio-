export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'rust_pix' | 'cloud_security' | 'devsecops' | 'solana' | 'ai_ingestion' | 'fintech' | 'flagship';
  categoryLabel: { pt: string; en: string };
  iconName: string;
  techStack: string[];
  metrics: { label: { pt: string; en: string }; value: string }[];
  githubUrl?: string;
  repoName?: string;
  architectureHighlights: { pt: string[]; en: string[] };
  compliance: string[];
  sampleCode: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface SkillCategory {
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  skills: { name: string; level: string; desc: { pt: string; en: string } }[];
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'pix-shield-qpo',
    title: 'PIX-SHIELD-QPO',
    shortDesc: 'Motor antifraude Pix em tempo real com SLA Sub-8ms (P99), GraphRAG via Protocolo MCP, governança LGPD (Art. 7º) e ganchos Bacen (Resolução 147/2021).',
    fullDesc: `O PIX-SHIELD-QPO é um motor de alta concorrência projetado em Rust assíncrono (Tokio runtime) para validação antifraude de transações do ecossistema Pix. Processa grafos de relacionamento de contas bancárias em tempo real utilizando GraphRAG sobre Neo4j com latency budget estrito de P99 < 8ms. Incorpora regras da Resolução BACEN nº 147/2021 e anonimização de dados pessoais em conformidade com o Artigo 7º da LGPD.`,
    category: 'rust_pix',
    categoryLabel: { pt: 'Pix & Rust', en: 'Pix & Rust' },
    iconName: 'Shield',
    techStack: ['Rust', 'Tokio', 'Neo4j', 'GraphRAG', 'MCP Protocol', 'BACEN Pix', 'LGPD'],
    metrics: [
      { label: { pt: 'SLA Latência P99', en: 'P99 Latency SLA' }, value: '< 8ms' },
      { label: { pt: 'Througput Target', en: 'Target Throughput' }, value: '35.000 TPS' },
      { label: { pt: 'Conformidade', en: 'Compliance' }, value: 'BACEN 147 / LGPD Art. 7' }
    ],
    githubUrl: 'https://github.com/Mrcoantonioconceicao-ctrl/PIX-SHIELD-QPO',
    repoName: 'Mrcoantonioconceicao-ctrl/PIX-SHIELD-QPO',
    architectureHighlights: {
      pt: [
        'Arquitetura Tokio async zero-copy memory allocation',
        'Grafo RAG com Neo4j Cypher pre-compiled queries',
        'Protocolo MCP (Model Context Protocol) para integração com agentes de IA',
        'Módulo de anonimização SHA-256 / Salt em conformidade com LGPD Art. 7º'
      ],
      en: [
        'Tokio async zero-copy memory allocation architecture',
        'Graph RAG with Neo4j Cypher pre-compiled queries',
        'MCP (Model Context Protocol) integration for AI Agents',
        'SHA-256 / Salt anonymization module complying with LGPD Art. 7'
      ]
    },
    compliance: ['BACEN Resolução 147/2021', 'LGPD Art. 7º', 'ISO 27001 Zero-Trust'],
    sampleCode: {
      language: 'rust',
      filename: 'pix_shield_engine.rs',
      code: `use tokio::time::{Instant, Duration};
use neo4rs::*;

pub struct PixRiskEngine {
    neo4j_graph: Graph,
    p99_budget_ms: f64,
}

impl PixRiskEngine {
    pub async fn evaluate_transaction_risk(&self, tx: &PixTransaction) -> Result<RiskScore, EngineError> {
        let start = Instant::now();
        
        // Step 1: LGPD Art. 7 Anonymization Hash
        let anon_payer = hash_cpf_salt(&tx.payer_cpf, &tx.salt);
        
        // Step 2: Neo4j GraphRAG Node Traversal (P99 < 5ms)
        let mut query = query("MATCH (p:Payer {hash: $hash})-[r:TRANSFERRED*1..3]->(rec:Receiver) RETURN count(r) as hop_count, sum(r.amount) as total")
            .param("hash", anon_payer);
            
        let mut stream = self.neo4j_graph.execute(query).await?;
        let elapsed = start.elapsed().as_secs_f64() * 1000.0;
        
        if elapsed > self.p99_budget_ms {
            tracing::warn!(elapsed_ms = elapsed, "SLA SLA Budget Breach Alert");
        }
        
        Ok(RiskScore::Safe { latency_ms: elapsed })
    }
}`
    }
  },
  {
    id: 'rustshield-quantum-aws',
    title: 'RustShield Quantum & AWS',
    shortDesc: 'Plataforma autônoma de governança IAM para AWS com auditoria AST, cálculo de Entropia de Shannon H(S), provas lógicas SAT e conformidade LGPD (Art. 46 & 48).',
    fullDesc: `Solução corporativa para auditoria de políticas de acesso AWS IAM baseada em AST (Abstract Syntax Tree). Executa análise sintática estática sobre JSON/HCL, calcula a Entropia de Shannon H(S) em chaves e identificadores para detectar segredos expostos, e emprega provadores SAT para garantir o Princípio do Menor Privilégio e conformidade com o Artigo 46 e 48 da LGPD.`,
    category: 'cloud_security',
    categoryLabel: { pt: 'Cloud Security', en: 'Cloud Security' },
    iconName: 'Cloud',
    techStack: ['TypeScript', 'AST Parser', 'AWS IAM', 'Shannon Entropy', 'SAT Solvers', 'LGPD'],
    metrics: [
      { label: { pt: 'Cobertura AST', en: 'AST Coverage' }, value: '100% IAM Rules' },
      { label: { pt: 'Análise Entrópica', en: 'Entropy Analysis' }, value: 'H(S) Shannon Metric' },
      { label: { pt: 'Conformidade', en: 'Compliance' }, value: 'LGPD Art. 46 & 48' }
    ],
    githubUrl: 'https://github.com/Mrcoantonioconceicao-ctrl/aws-enterprise-security',
    repoName: 'Mrcoantonioconceicao-ctrl/aws-enterprise-security',
    architectureHighlights: {
      pt: [
        'Parser AST dedicado para verificação estática de IAM Policies sem chamadas de API',
        'Cálculo matemático H(S) = -sum(p_i * log2(p_i)) para identificação de credenciais',
        'Verificação formal de caminhos de privilégio excessivos (Wildcards * banidos)',
        'Notificação automatizada de vazamentos conforme Artigo 48 da LGPD'
      ],
      en: [
        'Dedicated AST parser for static IAM Policy verification without API calls',
        'Mathematical calculation H(S) = -sum(p_i * log2(p_i)) to detect exposed credentials',
        'Formal verification of over-privileged paths (banning Action * wildcards)',
        'Automated breach notifications according to LGPD Article 48'
      ]
    },
    compliance: ['AWS Well-Architected Framework', 'LGPD Art. 46 & 48', 'CIS AWS Benchmarks'],
    sampleCode: {
      language: 'json',
      filename: 'aws_iam_ast_policy.json',
      code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RestrictedS3Access",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::corporate-vault",
        "arn:aws:s3:::corporate-vault/*"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "true"
        }
      }
    }
  ]
}`
    }
  },
  {
    id: 'autonomous-devsecops',
    title: 'Autonomous DevSecOps (sec)',
    shortDesc: 'Agente autônomo de controle e governança operando em ambientes restritos (Termux), automatizando pre-flight checks, clonagem e Pull Requests.',
    fullDesc: `Agente de linha de comando leve e autônomo desenvolvido para operar em nós com recursos altamente limitados (como contêineres Android Termux ou EDGE gateway). Realiza automação completa do ciclo de DevSecOps: validação estática de vulnerabilidades, linting, pre-flight checks e submissão automatizada de Pull Requests com assina de commits verificados.`,
    category: 'devsecops',
    categoryLabel: { pt: 'DevSecOps', en: 'DevSecOps' },
    iconName: 'Terminal',
    techStack: ['CLI', 'Termux', 'GitHub Actions', 'Shell/Bash', 'TypeScript', 'Git Hooks'],
    metrics: [
      { label: { pt: 'Ambiente', en: 'Environment' }, value: 'Termux & Edge ARM' },
      { label: { pt: 'Tempo Pre-flight', en: 'Pre-flight Time' }, value: '< 1.2s' },
      { label: { pt: 'Automação', en: 'Automation' }, value: '100% PR Lifecycle' }
    ],
    architectureHighlights: {
      pt: [
        'Suporte nativo para Termux Android sem necessidade de root',
        'Hooks Git com auto-remediação de arquivos com privilégios incorretos',
        'Pipeline leve integrada via GitHub REST & GraphQL APIs',
        'Assinatura GPG e validação de checksum de dependências'
      ],
      en: [
        'Native Termux Android support with zero root requirements',
        'Git hooks with auto-remediation for permission errors',
        'Lightweight pipeline integration via GitHub REST & GraphQL APIs',
        'GPG commit signing and dependency checksum validation'
      ]
    },
    compliance: ['SLSA Level 3 Provenance', 'NIST SSDF', 'OWASP Top 10 CLI'],
    sampleCode: {
      language: 'bash',
      filename: 'sec-agent-preflight.sh',
      code: `#!/usr/bin/env bash
set -euo pipefail

echo "[+] DevSecOps Autonomous Agent (sec) - Running Termux Pre-flight Checks..."
CONFIG_FILE=".sec-governance.json"

if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "[-] Governance config missing. Injecting default AST policies..."
    exit 1
fi

# Run AST security scanner
ts-node --transpile-only ./src/cli/ast-scanner.ts --target . --strict

echo "[+] Pre-flight passed. Automating Pull Request creation..."
gh pr create --title "sec(auto-patch): Security AST remediations applied" \
             --body "Verified by Termux Autonomous DevSecOps Engine."`
    }
  },
  {
    id: 'solana-architect-studio',
    title: 'Solana Architect & Anchor Security Studio',
    shortDesc: 'Auditoria estática AST para smart contracts Anchor, suporte trilíngue, modos duplos (Júnior/Avançado), Auto-Fix de 49 bytes Borsh e automação de PRs.',
    fullDesc: `Estúdio de segurança estática especializado na máquina virtual da Solana (SVM) e framework Anchor (v0.30+). O motor inspeciona a AST do código Rust procurando vulnerabilidades clássicas de Solana (falta de validação de contas ` + "`AccountInfo`" + `, descuidada manipulação de derivadores PDA, estouro de tamanho no layout de serialização Borsh e ausência de restrição ` + "`has_one`" + `). Inclui gerador de Auto-Fix automatizado para alinhar estruturas Borsh em exatamente 49 bytes de header.`,
    category: 'solana',
    categoryLabel: { pt: 'Web3 / Solana', en: 'Web3 / Solana' },
    iconName: 'Cpu',
    techStack: ['Rust', 'Anchor v0.30', 'Solana SVM', 'AST Parser', 'Borsh', 'TypeScript'],
    metrics: [
      { label: { pt: 'Versão Anchor', en: 'Anchor Version' }, value: 'v0.30+ Native' },
      { label: { pt: 'Borsh Header', en: 'Borsh Header' }, value: '49 Bytes Fixed' },
      { label: { pt: 'Linter Rate', en: 'Linter Rate' }, value: '0 False Positives' }
    ],
    architectureHighlights: {
      pt: [
        'Análise da AST Rust do Anchor para encontrar inconsistências de PDA e Signer',
        'Garantia de layout Borsh zerado e cálculo exato do discriminator de 8 bytes + 41 bytes header',
        'Auto-Fix que injeta constraints `#[account(constraint = ...)]` diretamente no código',
        'Integração direta com repositórios GitHub para criação de PRs de correção'
      ],
      en: [
        'Anchor Rust AST analysis to detect PDA and Signer inconsistencies',
        'Borsh layout zeroing with exact 8-byte discriminator + 41-byte header calculation',
        'Auto-Fix engine injecting `#[account(constraint = ...)]` directly into source code',
        'Direct GitHub repository integration for automated security fix PRs'
      ]
    },
    compliance: ['Solana Security Standards', 'Anchor v0.30 Protocol Guidelines', 'Borsh Spec'],
    sampleCode: {
      language: 'rust',
      filename: 'solana_anchor_security_audit.rs',
      code: `use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod anchor_security_vault {
    use super::*;

    pub fn deposit_funds(ctx: Context<DepositVault>, amount: u64) -> Result<()> {
        let vault = &mut ctx.accounts.vault_account;
        vault.balance = vault.balance.checked_add(amount)
            .ok_or(ErrorCode::Overflow)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct DepositVault<'info> {
    #[account(
        mut,
        has_one = owner @ ErrorCode::UnauthorizedOwner,
        seeds = [b"vault", owner.key().as_ref()],
        bump
    )]
    pub vault_account: Account<'info, VaultState>,
    pub owner: Signer<'info>,
}

#[account]
pub struct VaultState {
    pub owner: Pubkey,   // 32 bytes
    pub balance: u64,    // 8 bytes
    pub bump: u8,        // 1 byte
} // Discriminator (8) + Data (41) = 49 bytes header`
    }
  },
  {
    id: 'firestarter-engine',
    title: 'Firestarter Engine',
    shortDesc: 'Extrator web autônomo e motor de ingestão GraphRAG rodando nativamente em ambiente Termux com Bun, TypeScript e Cheerio.',
    fullDesc: `Engine de alta eficiência desenvolvida para raspagem, extração estruturada de conteúdo web e ingestão contínua em grafos RAG. Rodando nativamente com o runtime Bun em sistemas de baixo consumo de memória (Termux), utiliza Cheerio e pipelines de vetorização para transformar páginas HTML não estruturadas em embeddings e triplas de conhecimento relacionais.`,
    category: 'ai_ingestion',
    categoryLabel: { pt: 'AI & Ingestion', en: 'AI & Ingestion' },
    iconName: 'Flame',
    techStack: ['Bun', 'TypeScript', 'Cheerio', 'GraphRAG', 'Termux', 'Vector DB'],
    metrics: [
      { label: { pt: 'Runtime', en: 'Runtime' }, value: 'Bun Native' },
      { label: { pt: 'Velocidade Ingestão', en: 'Ingestion Speed' }, value: '1.200 docs/min' },
      { label: { pt: 'Memória RAM', en: 'RAM Memory' }, value: '< 65MB Termux' }
    ],
    architectureHighlights: {
      pt: [
        'Execução otimizada em Bun runtime com I/O de disco ultra-veloz',
        'Extrator Cheerio resiliente a bloqueios e renderizações dinâmicas',
        'Pipeline de conversão de entidades em entidades GraphRAG',
        'Sincronização em tempo real com bancos de vetores e Neo4j'
      ],
      en: [
        'Optimized execution on Bun runtime with ultra-fast disk I/O',
        'Resilient Cheerio scraper handling rate-limits and dynamic pages',
        'Entity extraction pipeline converting raw text into GraphRAG triples',
        'Real-time synchronization with vector databases and Neo4j'
      ]
    },
    compliance: ['Robots.txt & Ethical Scraping', 'GDPR/LGPD Data Minimization'],
    sampleCode: {
      language: 'typescript',
      filename: 'firestarter_graph_ingest.ts',
      code: `import * as cheerio from 'cheerio';

export class FirestarterEngine {
  async extractAndGraphify(url: string) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('h1').text().trim();
    const paragraphs = $('p').map((_, el) => $(el).text()).get().join(' ');

    // Extract Entities & Relationships for GraphRAG
    const triples = this.parseKnowledgeTriples(paragraphs);
    
    return {
      title,
      textLength: paragraphs.length,
      triplesCount: triples.length,
      status: 'ingested_to_graphrag'
    };
  }

  private parseKnowledgeTriples(text: string) {
    // GraphRAG triple extraction logic
    return [{ subject: 'Solana', predicate: 'USES', object: 'SVM' }];
  }
}`
    }
  },
  {
    id: 'nexa-pay',
    title: 'Nexa Pay Infrastructure',
    shortDesc: 'Infraestrutura de pagamentos híbridos conectando BACEN PIX à Solana USDC sem custódia (Escrowless), com Saga Dual-Rail e suporte a Agentes IA via MCP.',
    fullDesc: `Solução híbrida de pagamentos internacionais que integra a liquidação instantânea do PIX do Banco Central do Brasil com a infraestrutura on-chain da Solana (USDC). Utiliza um padrão de Saga sem custódia (Escrowless), onde os fundos são bloqueados e liberados em garantia através de contratos inteligentes na Solana simultaneamente ao envio de webhooks autenticados do BACEN. Oferece suporte completo para chamadas automatizadas de Agentes de IA via Protocolo MCP.`,
    category: 'fintech',
    categoryLabel: { pt: 'Fintech Hybrid', en: 'Fintech Hybrid' },
    iconName: 'Zap',
    techStack: ['Solana', 'USDC', 'BACEN PIX', 'MCP Protocol', 'Saga Pattern', 'Escrowless', 'Rust'],
    metrics: [
      { label: { pt: 'Liquidação Híbrida', en: 'Hybrid Settlement' }, value: 'PIX <-> Solana USDC' },
      { label: { pt: 'Modelo Custódia', en: 'Custody Model' }, value: '0% Escrowless' },
      { label: { pt: 'Suporte IA', en: 'AI Support' }, value: 'Native MCP Protocol' }
    ],
    architectureHighlights: {
      pt: [
        'Saga Pattern Dual-Rail com reversão atômica em caso de falha no Pix ou na Solana',
        'Transação sem custódia (Escrowless) através de derivadores PDA com timelock',
        'Interface MCP oficial para que Agentes AI possam cotar e realizar pagamentos',
        'Trilhas de auditoria para conformidade regulatória cambial e BACEN'
      ],
      en: [
        'Dual-Rail Saga Pattern with atomic rollback if Pix or Solana fails',
        'Escrowless architecture using Solana PDA derivators with timelocks',
        'Official MCP interface allowing AI Agents to quote and execute settlements',
        'Comprehensive audit trails for FX regulatory and BACEN compliance'
      ]
    },
    compliance: ['BACEN Pix Regulations', 'Solana Pay Standards', 'AML/KYC Financial Standards'],
    sampleCode: {
      language: 'typescript',
      filename: 'nexa_pay_saga.ts',
      code: `export interface NexaPayDualRailOrder {
  orderId: string;
  pixQrCode: string;
  usdcAmount: number;
  recipientSolAddress: string;
  status: 'PENDING_PIX' | 'PIX_CONFIRMED' | 'SOLANA_DISPATCHED' | 'FAILED_ROLLED_BACK';
}

export class NexaPaySagaOrchestrator {
  async processPayment(order: NexaPayDualRailOrder) {
    console.log(\`[NexaPay] Inspecionando transação Pix ID: \${order.orderId}\`);
    // Step 1: Wait for BACEN Pix Webhook confirmation
    const pixVerified = await this.verifyBacenWebhook(order.orderId);
    
    if (!pixVerified) {
      return { status: 'FAILED_ROLLED_BACK', reason: 'Pix Payment Expired' };
    }
    
    // Step 2: Dispatch Solana USDC Escrowless Payment via PDA
    const txHash = await this.dispatchSolanaUsdc(order.recipientSolAddress, order.usdcAmount);
    
    return {
      status: 'SOLANA_DISPATCHED',
      solanaTxHash: txHash,
      latencyMs: 1420
    };
  }

  private async verifyBacenWebhook(id: string) { return true; }
  private async dispatchSolanaUsdc(address: string, amount: number) { return '5K...solanaTx'; }
}`
    }
  },
  {
    id: 'solana-anchor-devsecops-ide',
    title: 'Solana Anchor DevSecOps, AST & GraphRAG Security Auditor IDE',
    shortDesc: 'Ambiente integrado de engenharia que unifica Auditoria Estática AST, Servidor MCP oficial, serviço GraphRAG para riscos cross-instruction, modelagem DDD & SOA, BPMN 2.0 e sincronização GitHub.',
    fullDesc: `Plataforma Flagship de engenharia corporativa desenvolvida por Marco Antônio Conceição. Funciona como um estúdio IDE unificado para desenvolvimento seguro na ecossistema Solana. Integra parser AST em tempo real, servidor oficial MCP (@modelcontextprotocol/sdk), serviço de análise de vulnerabilidades cross-instruction alimentado por GraphRAG, modelador de domínio DDD/SOA, motor de fluxo BPMN 2.0 e sincronização contínua com repositórios GitHub no perfil mrcoantonioconceicao-ctrl/contratos-inteligentes.`,
    category: 'flagship',
    categoryLabel: { pt: 'Flagship Ecosystem', en: 'Flagship Ecosystem' },
    iconName: 'ShieldAlert',
    techStack: ['AST Security', 'GraphRAG Engine', 'BPMN 2.0 Workflows', 'MCP Protocol', 'Solana Anchor', 'GitHub API', 'DDD / SOA'],
    metrics: [
      { label: { pt: 'Arquitetura', en: 'Architecture' }, value: 'DDD + SOA + BPMN 2.0' },
      { label: { pt: 'Servidor MCP', en: 'MCP Server' }, value: '@modelcontextprotocol/sdk' },
      { label: { pt: 'Sincronização', en: 'Sync' }, value: 'GitHub Auto Sync' }
    ],
    githubUrl: 'https://github.com/Mrcoantonioconceicao-ctrl/contratos-inteligentes',
    repoName: 'mrcoantonioconceicao-ctrl/contratos-inteligentes',
    architectureHighlights: {
      pt: [
        'Inspecção profunda de instrução cruzada (cross-instruction vulnerability graph)',
        'Modelagem visual BPMN 2.0 integrada para processos de governança DevSecOps',
        'Servidor STDIO/HTTP MCP para orquestração por LLMs como Claude, GPT-4o e Gemini',
        'Exportação de relatórios de auditoria em formato PDF/JSON estruturado com hashes cryptográficos'
      ],
      en: [
        'Deep cross-instruction analysis using GraphRAG vulnerability graphs',
        'Integrated BPMN 2.0 visual modeling for DevSecOps governance workflows',
        'Official STDIO/HTTP MCP server for orchestration via LLMs like Claude, GPT-4o, and Gemini',
        'Exportable audit reports in structured PDF/JSON formats with cryptographic signatures'
      ]
    },
    compliance: ['ISO 27001', 'SOC2 Type II Controls', 'BPMN 2.0 Spec', 'Solana Audit Standard'],
    sampleCode: {
      language: 'typescript',
      filename: 'mcp_anchor_security_server.ts',
      code: `import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  { name: 'solana-anchor-ast-auditor', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'audit_anchor_program',
      description: 'Audit a Rust Anchor program AST for Solana security vulnerabilities and Borsh 49-byte layout errors',
      inputSchema: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Rust Anchor code content' }
        },
        required: ['code']
      }
    }
  ]
}));

console.log('[+] Solana Anchor AST Security MCP Server Initialized over STDIO');`
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: { pt: 'Arquitetura de Sistemas Críticos & Rust', en: 'Critical Systems Architecture & Rust' },
    description: { pt: 'Engenharia de alta concorrência e baixa latência com garantia de segurança de memória', en: 'High-concurrency, low-latency engineering with memory safety guarantees' },
    skills: [
      { name: 'Rust Async & Tokio Engine', level: 'Especialista / Architect', desc: { pt: 'Desenvolvimento de motores P99 < 8ms, zero-allocation memory pools e multithreading', en: 'P99 < 8ms engines, zero-allocation memory pools, and multithreading' } },
      { name: 'Domain-Driven Design (DDD) & SOA', level: 'Especialista / Architect', desc: { pt: 'Modelagem de contextos delimitados (Bounded Contexts), eventos de domínio e microsserviços', en: 'Bounded Contexts modeling, domain events, and decoupled microservices' } },
      { name: 'Arquitetura de Antifraude Pix', level: 'Sênior Principal', desc: { pt: 'Resolução BACEN 147/2021, análise vetorial de transações em tempo real e regras de risco', en: 'BACEN Res. 147/2021, real-time transaction vector analysis, and risk rule sets' } }
    ]
  },
  {
    title: { pt: 'Segurança Estática AST & Cloud Security', en: 'AST Static Security & Cloud Security' },
    description: { pt: 'Auditoria de código fonte, governança IAM e conformidade regulatória', en: 'Source code auditing, IAM governance, and regulatory compliance' },
    skills: [
      { name: 'Análise de Árvores Sintáticas (AST)', level: 'Especialista / Lead', desc: { pt: 'Desenvolvimento de linters customizados para Rust, Anchor e JSON IAM policies', en: 'Custom linter development for Rust, Anchor, and JSON IAM policies' } },
      { name: 'Entropia de Shannon H(S) & SAT', level: 'Especialista', desc: { pt: 'Modelos matemáticos de identificação de vazamentos de segredos e provas formais', en: 'Mathematical leak detection models for secrets and formal verification' } },
      { name: 'AWS IAM Governance & Well-Architected', level: 'Sênior Principal', desc: { pt: 'Princípio do menor privilégio, eliminação de wildcards e controle de acesso baseado em roles', en: 'Least privilege enforcement, wildcard elimination, and role-based access' } }
    ]
  },
  {
    title: { pt: 'Web3, Solana SVM & Smart Contracts', en: 'Web3, Solana SVM & Smart Contracts' },
    description: { pt: 'Desenvolvimento e auditoria em programas Anchor e arquitetura sem custódia', en: 'Development and auditing for Anchor programs and escrowless architecture' },
    skills: [
      { name: 'Framework Anchor v0.30+ & SVM', level: 'Especialista / Auditor', desc: { pt: 'Derivação de PDAs, validação de Signers e contabilidade com layouts Borsh', en: 'PDA derivation, Signer validations, and Borsh layout accounting' } },
      { name: 'Sistemas Híbridos Escrowless (Saga)', level: 'Architect', desc: { pt: 'Padrão Saga para conciliação off-chain/on-chain (Pix para Solana USDC)', en: 'Saga Pattern for off-chain/on-chain reconciliation (Pix to Solana USDC)' } },
      { name: 'DevSecOps para Smart Contracts', level: 'Lead Engineer', desc: { pt: 'Automação CI/CD de testes unitários e de integração com Solana CLI e Anchor Test', en: 'CI/CD unit and integration test automation with Solana CLI and Anchor Test' } }
    ]
  },
  {
    title: { pt: 'AI Generativa, GraphRAG & Protocolo MCP', en: 'Generative AI, GraphRAG & MCP Protocol' },
    description: { pt: 'Integração de agentes autônomos e bases de conhecimento relacionais', en: 'Autonomous agent integration and relational knowledge bases' },
    skills: [
      { name: 'Model Context Protocol (MCP)', level: 'Early Adopter & Dev', desc: { pt: 'Desenvolvimento de servidores MCP oficiais (@modelcontextprotocol/sdk) STDIO/HTTP', en: 'Official MCP server development (@modelcontextprotocol/sdk) STDIO/HTTP' } },
      { name: 'GraphRAG com Neo4j & Vetores', level: 'Sênior Specialist', desc: { pt: 'Construção de grafos de conhecimento de alto risco para auditoria e antifraude', en: 'High-risk knowledge graph construction for security audits and fraud' } },
      { name: 'Integração Gemini AI & LLMs', level: 'Sênior Specialist', desc: { pt: 'Prompt engineering técnico e integração de SDKs para inspeção em tempo real', en: 'Technical prompt engineering and SDK integration for real-time code inspection' } }
    ]
  },
  {
    title: { pt: 'Conformidade Regulatória & LGPD', en: 'Regulatory Compliance & LGPD' },
    description: { pt: 'Segurança da informação e privacidade por design em finanças e nuvem', en: 'Information security and privacy by design in fintech and cloud' },
    skills: [
      { name: 'LGPD (Lei Geral de Proteção de Dados)', level: 'Conformidade Técnica', desc: { pt: 'Aplicação dos Artigos 7º, 46º e 48º em dados sensíveis (CPF, chaves e credenciais)', en: 'Application of Articles 7, 46, and 48 on sensitive data (CPF, keys, credentials)' } },
      { name: 'BPNM 2.0 Process Orchestration', level: 'Architect', desc: { pt: 'Mapeamento executivo de fluxos operacionais e governança de software', en: 'Executive mapping of operational workflows and software governance' } },
      { name: 'Ambientes Restritos (Termux DevSecOps)', level: 'Pioneiro', desc: { pt: 'Execução de pipelines completos de verificação em nós móveis e EDGE', en: 'Executing full audit pipelines on mobile ARM nodes and EDGE devices' } }
    ]
  }
];

export const SAMPLE_AST_TEMPLATES = [
  {
    id: 'anchor-vault',
    name: { pt: 'Solana Anchor Vault (Sem Constraint Signer)', en: 'Solana Anchor Vault (Missing Constraint)' },
    language: 'rust',
    targetType: 'Solana Anchor Contract',
    code: `use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod vulnerable_vault {
    use super::*;

    pub fn withdraw_all(ctx: Context<WithdrawVault>) -> Result<()> {
        let vault = &mut ctx.accounts.vault_account;
        // WARNING: Missing owner constraint check!
        let amount = vault.balance;
        vault.balance = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct WithdrawVault<'info> {
    #[account(mut)]
    pub vault_account: Account<'info, VaultState>,
    pub authority: AccountInfo<'info>, // Missing Signer validation!
}

#[account]
pub struct VaultState {
    pub owner: Pubkey,
    pub balance: u64,
}`
  },
  {
    id: 'aws-iam-wildcard',
    name: { pt: 'AWS IAM Policy (Wildcard Action * & High Entropy)', en: 'AWS IAM Policy (Wildcard Action * & High Entropy)' },
    language: 'json',
    targetType: 'AWS IAM Policy',
    code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "OverlyPermissiveAccess",
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringLike": {
          "aws:PrincipalTag/Department": "Engineering"
        }
      }
    }
  ],
  "EmbeddedSecretKey": "AKIAIOSFODNN7EXAMPLE_EXPOSED_SECRET_TOKEN_991823"
}`
  },
  {
    id: 'pix-rule-eval',
    name: { pt: 'PIX Anti-Fraud Tokio Rule (Validação BACEN)', en: 'PIX Anti-Fraud Tokio Rule (BACEN Validation)' },
    language: 'rust',
    targetType: 'PIX Antifraud Rule Engine',
    code: `pub fn validate_pix_transfer(payer_cpf: &str, receiver_key: &str, amount_cents: u64) -> bool {
    // Check BACEN limit rules for night transactions
    if amount_cents > 100000 && is_night_time() {
        return false; // High risk
    }
    // Anonymize CPF before logging to satisfy LGPD Art. 7
    let _log_cpf = payer_cpf; // Warning: Raw unhashed CPF exposure!
    true
}`
  }
];

export interface RoadmapMilestone {
  id: string;
  yearPeriod: string;
  role: { pt: string; en: string };
  focusArea: { pt: string; en: string };
  category: 'flagship' | 'rust_pix' | 'cloud_security' | 'devsecops' | 'architecture';
  categoryLabel: { pt: string; en: string };
  summary: { pt: string; en: string };
  technologies: string[];
  keyAchievements: { pt: string[]; en: string[] };
  architecturalImpact: { pt: string; en: string };
  metrics: { label: { pt: string; en: string }; value: string }[];
}

export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    id: 'milestone-2025-2026',
    yearPeriod: '2025 – 2026',
    role: {
      pt: 'Arquiteto-Chefe Corporativo & Liderança Web3 / GraphRAG',
      en: 'Chief Corporate Architect & Web3 / GraphRAG Lead',
    },
    focusArea: {
      pt: 'Segurança AST para Solana Anchor, Servidores MCP & IDE Integrado',
      en: 'Solana Anchor AST Security, MCP Servers & Integrated IDE',
    },
    category: 'flagship',
    categoryLabel: { pt: 'Ecossistema Flagship', en: 'Flagship Ecosystem' },
    summary: {
      pt: 'Liderança na criação do ecossistema unificado para auditoria estática AST em programas Solana Anchor (v0.30+), servidor MCP oficial (@modelcontextprotocol/sdk) e infraestrutura de pagamentos híbridos Nexa Pay.',
      en: 'Led the creation of the unified AST static audit ecosystem for Solana Anchor programs (v0.30+), official MCP server (@modelcontextprotocol/sdk), and Nexa Pay hybrid escrowless payment infrastructure.',
    },
    technologies: ['Solana SVM', 'Anchor v0.30', 'MCP Protocol', 'Rust AST', 'Borsh Layout', 'GraphRAG', 'TypeScript'],
    keyAchievements: {
      pt: [
        'Engenharia do analisador AST que garante layout Borsh zerado com alinhamento de 49 bytes header',
        'Criação do Servidor MCP para integração nativa de agentes IA (Gemini, Claude, GPT-4o) em fluxos de auditoria',
        'Desenvolvimento da arquitetura Nexa Pay para liquidação dual-rail sem custódia (PIX ➔ Solana USDC)'
      ],
      en: [
        'Engineered AST analyzer ensuring zeroed Borsh layouts with 49-byte header alignment',
        'Built official MCP Server for native AI Agent (Gemini, Claude, GPT-4o) audit workflows',
        'Architected Nexa Pay non-custodial dual-rail payment settlement (PIX ➔ Solana USDC)'
      ]
    },
    architecturalImpact: {
      pt: 'Eliminação total de vulnerabilidades clássicas de account deserialization e falhas de signer em smart contracts Anchor, unificando inteligência artificial via protocolo MCP.',
      en: 'Complete elimination of classic account deserialization and signer flaws in Anchor smart contracts, unifying AI intelligence via the MCP protocol.'
    },
    metrics: [
      { label: { pt: 'Borsh Alignment', en: 'Borsh Alignment' }, value: '49 Bytes Fixed' },
      { label: { pt: 'Suporte Agentes IA', en: 'AI Agent Support' }, value: 'Native MCP Protocol' }
    ]
  },
  {
    id: 'milestone-2023-2025',
    yearPeriod: '2023 – 2025',
    role: {
      pt: 'Engenheiro Principal de Baixa Latência & Antifraude',
      en: 'Principal Low-Latency & Antifraud Engineer',
    },
    focusArea: {
      pt: 'Motor Rust Tokio, GraphRAG Neo4j & Conformidade BACEN Pix',
      en: 'Rust Tokio Engine, Neo4j GraphRAG & BACEN Pix Compliance',
    },
    category: 'rust_pix',
    categoryLabel: { pt: 'Rust & Pix Sub-8ms', en: 'Rust & Pix Sub-8ms' },
    summary: {
      pt: 'Projetação do PIX-SHIELD-QPO, motor de decisão antifraude de alta concorrência capaz de processar até 35.000 TPS com SLA estrito de latência P99 < 8ms e conformidade com BACEN 147/2021 e LGPD Art. 7º.',
      en: 'Engineered PIX-SHIELD-QPO, a high-concurrency fraud decision engine processing up to 35,000 TPS with strict P99 latency < 8ms and full BACEN 147/2021 and LGPD Art. 7 compliance.',
    },
    technologies: ['Rust', 'Tokio Async', 'Neo4j', 'GraphRAG', 'BACEN Pix', 'LGPD Art. 7', 'SHA-256 Salt'],
    keyAchievements: {
      pt: [
        'Arquitetura Tokio de alocação de memória zero-copy para processamento de pacotes bancários',
        'Busca em grafos de 3 saltos no Neo4j com latency budget de 3.2ms',
        'Módulo de criptografia com hash SHA-256 e salting para anonimização de dados de pagamento'
      ],
      en: [
        'Tokio zero-copy memory allocation architecture for banking payload processing',
        'Neo4j 3-hop graph traversal within a tight 3.2ms latency budget',
        'SHA-256 + salt cryptographic module for privacy-compliant payment data anonymization'
      ]
    },
    architecturalImpact: {
      pt: 'Capacidade de resposta em tempo real a tentativas de invasão e fraude em lote no ecossistema de pagamentos instantâneos brasileiro.',
      en: 'Real-time response capability against batch fraud attacks in the Brazilian instant payment ecosystem.'
    },
    metrics: [
      { label: { pt: 'SLA Latência P99', en: 'P99 Latency SLA' }, value: '< 8ms' },
      { label: { pt: 'Vazamento de Dados', en: 'Data Leakage' }, value: '0% (LGPD Compliant)' }
    ]
  },
  {
    id: 'milestone-2021-2023',
    yearPeriod: '2021 – 2023',
    role: {
      pt: 'Especialista em Cloud Security & Auditoria de Código AST',
      en: 'Cloud Security & AST Static Code Audit Specialist',
    },
    focusArea: {
      pt: 'Governança AWS IAM, Entropia de Shannon H(S) & Provas SAT',
      en: 'AWS IAM Governance, Shannon Entropy H(S) & SAT Proofs',
    },
    category: 'cloud_security',
    categoryLabel: { pt: 'Cloud Security', en: 'Cloud Security' },
    summary: {
      pt: 'Desenvolvimento do RustShield Quantum & AWS, plataforma de governança automatizada que analisa políticas IAM por parser AST e calcula formalmente a Entropia de Shannon para mitigar vazamentos de credenciais.',
      en: 'Developed RustShield Quantum & AWS, an automated governance platform that parses IAM policies via AST and formally calculates Shannon Entropy to mitigate credential leaks.',
    },
    technologies: ['TypeScript', 'AST Parser', 'AWS IAM', 'Shannon Entropy', 'SAT Solvers', 'LGPD Art. 46 & 48'],
    keyAchievements: {
      pt: [
        'Eliminação de 100% dos privilégios curinga (Wildcards *) em políticas de ambiente de produção',
        'Implementação da métrica de Entropia H(S) para detecção instantânea de segredos expostos em JSON/HCL',
        'Provas formais de acessibilidade de privilégios usando provadores de satisfatibilidade booleana (SAT)'
      ],
      en: [
        'Eliminated 100% of wildcard (*) privileges across production environment IAM policies',
        'Implemented Shannon Entropy H(S) metric for instant detection of exposed secrets in JSON/HCL',
        'Formal privilege reachability proofs using Boolean satisfiability (SAT) solvers'
      ]
    },
    architecturalImpact: {
      pt: 'Criação do padrão Zero-Trust de acesso a recursos de nuvem em larga escala, atendendo Artigos 46 e 48 da LGPD.',
      en: 'Established Zero-Trust cloud resource access standards at scale, satisfying LGPD Articles 46 and 48.'
    },
    metrics: [
      { label: { pt: 'Cobertura IAM', en: 'IAM Coverage' }, value: '100% Rule Set' },
      { label: { pt: 'Detecção de Segredos', en: 'Secrets Detection' }, value: 'H(S) Entropy Math' }
    ]
  },
  {
    id: 'milestone-2019-2021',
    yearPeriod: '2019 – 2021',
    role: {
      pt: 'Pioneiro em Automação DevSecOps & Ambientes Restritos',
      en: 'DevSecOps Automation & Edge Computing Pioneer',
    },
    focusArea: {
      pt: 'Ferramental CLI em Termux, Bun Engine & Ingestão GraphRAG',
      en: 'Termux CLI Tooling, Bun Engine & GraphRAG Ingestion',
    },
    category: 'devsecops',
    categoryLabel: { pt: 'DevSecOps & Edge', en: 'DevSecOps & Edge' },
    summary: {
      pt: 'Criação da CLI autônoma DevSecOps (sec) e do Firestarter Engine rodando nativamente em ambientes ARM restritos (Termux Android) para raspagem web resiliente e vetorização GraphRAG.',
      en: 'Created the autonomous DevSecOps CLI (sec) and Firestarter Engine running natively on constrained ARM environments (Termux Android) for resilient web extraction and GraphRAG vectorization.',
    },
    technologies: ['Termux', 'Bun', 'Cheerio', 'GitHub Actions', 'Shell/Bash', 'TypeScript', 'GraphRAG'],
    keyAchievements: {
      pt: [
        'Execução de pipelines de CI/CD completas em nós móveis e gateways EDGE sem acesso root',
        'Extrator web de alta velocidade processando 1.200 documentos/minuto sob consumo de < 65MB RAM',
        'Sincronização de PRs e verificações de integridade com assinaturas de commit verificadas'
      ],
      en: [
        'Executed full CI/CD pipelines on mobile nodes and EDGE gateways with zero root requirement',
        'High-speed web extractor processing 1,200 docs/min under < 65MB RAM consumption',
        'PR synchronization and health verification with verified GPG commit signatures'
      ]
    },
    architecturalImpact: {
      pt: 'Demonstração prática de DevSecOps autônomo em dispositivos de borda e ambientes air-gapped.',
      en: 'Practical demonstration of autonomous DevSecOps on edge devices and air-gapped environments.'
    },
    metrics: [
      { label: { pt: 'Consumo Memória', en: 'Memory Usage' }, value: '< 65MB RAM' },
      { label: { pt: 'Velocidade Ingestão', en: 'Ingestion Speed' }, value: '1,200 docs/min' }
    ]
  },
  {
    id: 'milestone-2016-2019',
    yearPeriod: '2016 – 2019',
    role: {
      pt: 'Arquiteto Corporativo & Desenvolvedor de Sistemas Core',
      en: 'Corporate Architect & Core Systems Developer',
    },
    focusArea: {
      pt: 'Domain-Driven Design (DDD), Microsserviços SOA & BPMN 2.0',
      en: 'Domain-Driven Design (DDD), SOA Microservices & BPMN 2.0',
    },
    category: 'architecture',
    categoryLabel: { pt: 'Arquitetura Core', en: 'Core Architecture' },
    summary: {
      pt: 'Modelagem de sistemas corporativos baseados em Domain-Driven Design (DDD), orquestração de processos bancários complexos via BPMN 2.0 e migração de monolitos para microsserviços desacoplados.',
      en: 'Engineered corporate systems based on Domain-Driven Design (DDD), complex banking workflow orchestration via BPMN 2.0, and monolith migration to decoupled microservices.',
    },
    technologies: ['DDD', 'SOA', 'BPMN 2.0', 'Distributed Microservices', 'REST & gRPC APIs', 'SQL / NoSQL'],
    keyAchievements: {
      pt: [
        'Mapeamento de Contextos Delimitados (Bounded Contexts) e linguagens ubíquas para domínio financeiro',
        'Implementação de barramentos de eventos assíncronos para desacoplamento de serviços core',
        'Padronização de fluxos de governança técnica e orquestração de processos via BPMN 2.0'
      ],
      en: [
        'Mapped Bounded Contexts and ubiquitous languages for high-value financial domains',
        'Implemented asynchronous event buses for decoupling core corporate microservices',
        'Standardized technical governance workflows and process orchestration via BPMN 2.0'
      ]
    },
    architecturalImpact: {
      pt: 'Estruturação da base arquitetural sólida que permitiu evolução contínua para motores de baixa latência e integração Web3.',
      en: 'Structured the solid architectural foundation enabling seamless evolution toward low-latency engines and Web3.'
    },
    metrics: [
      { label: { pt: 'Paradigma', en: 'Paradigm' }, value: 'DDD / SOA / BPMN' },
      { label: { pt: 'Desacoplamento', en: 'Decoupling' }, value: 'Event-Driven' }
    ]
  }
];
