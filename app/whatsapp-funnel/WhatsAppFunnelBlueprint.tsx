"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Language = "pt" | "en";
type Copy = { pt: string; en: string };
type Stage = {
  id: string;
  icon: string;
  title: Copy;
  subtitle: Copy;
  objective: Copy;
  system: string;
  automation: Copy;
  human: Copy;
  metric: Copy;
  gate: Copy;
};

const stages: Stage[] = [
  {
    id: "capture",
    icon: "◎",
    title: { pt: "Captação", en: "Acquisition" },
    subtitle: { pt: "Conteúdo, parceiros e iscas", en: "Content, partners and lead magnets" },
    objective: {
      pt: "Atrair decisores com uma dor operacional específica — sem prometer ROI não comprovado.",
      en: "Attract decision-makers through a specific operational pain — without unproven ROI claims.",
    },
    system: "Content · Partners · Market Audit PDF · CEO Skill",
    automation: {
      pt: "Registra origem, campanha e ativo baixado.",
      en: "Records source, campaign and downloaded asset.",
    },
    human: {
      pt: "Marketing aprova copy, audiência e uso de qualquer prova.",
      en: "Marketing approves copy, audience and every proof claim.",
    },
    metric: { pt: "Visitas qualificadas por origem", en: "Qualified visits by source" },
    gate: { pt: "Fonte e promessa aprovadas", en: "Source and promise approved" },
  },
  {
    id: "landing",
    icon: "▣",
    title: { pt: "Micro-site", en: "Micro-site" },
    subtitle: { pt: "Jornada móvel e premium", en: "Premium mobile journey" },
    objective: {
      pt: "Explicar problema, mecanismo, limites, prova autorizada e próximo passo em uma narrativa contínua.",
      en: "Explain the problem, mechanism, boundaries, authorized proof and next step in one continuous narrative.",
    },
    system: "Landing page · Analytics · A/B test",
    automation: {
      pt: "Personaliza apenas por campanha e intenção declarada.",
      en: "Personalizes only by campaign and declared intent.",
    },
    human: {
      pt: "Founder aprova oferta, preço e alegações antes de publicar.",
      en: "Founder approves offer, price and claims before publishing.",
    },
    metric: { pt: "Conversão visita → opt-in", en: "Visit → opt-in conversion" },
    gate: { pt: "QA mobile + copy factual", en: "Mobile QA + factual copy" },
  },
  {
    id: "consent",
    icon: "✓",
    title: { pt: "Consentimento", en: "Consent" },
    subtitle: { pt: "Entrada transparente", en: "Transparent entry" },
    objective: {
      pt: "Obter autorização clara para contato no WhatsApp e informar finalidade, uso e saída.",
      en: "Obtain clear authorization for WhatsApp contact and disclose purpose, use and opt-out.",
    },
    system: "Form · Consent log · Privacy notice",
    automation: {
      pt: "Valida telefone, deduplica o lead e salva a versão do consentimento.",
      en: "Validates the phone, deduplicates the lead and stores the consent version.",
    },
    human: {
      pt: "Jurídico/privacidade valida base legal, retenção e texto.",
      en: "Legal/privacy validates legal basis, retention and wording.",
    },
    metric: { pt: "Opt-in válido e revogações", en: "Valid opt-ins and revocations" },
    gate: { pt: "Consentimento verificável", en: "Verifiable consent" },
  },
  {
    id: "whatsapp",
    icon: "◉",
    title: { pt: "Agente WhatsApp", en: "WhatsApp Agent" },
    subtitle: { pt: "Conversa guiada por limites", en: "Boundary-driven conversation" },
    objective: {
      pt: "Entender o contexto, responder dentro da base aprovada e avançar apenas quando houver sinal suficiente.",
      en: "Understand context, answer from the approved knowledge base and advance only with enough signal.",
    },
    system: "Meta Cloud API · Webhooks · Agent policy",
    automation: {
      pt: "Classifica intenção, resume a conversa e sugere a próxima ação.",
      en: "Classifies intent, summarizes the conversation and suggests the next action.",
    },
    human: {
      pt: "Recebe alertas em baixa confiança, objeção sensível ou pedido explícito.",
      en: "Receives alerts on low confidence, sensitive objections or explicit requests.",
    },
    metric: { pt: "Resposta, avanço e intervenção", en: "Response, progression and intervention" },
    gate: { pt: "Sandbox + templates aprovados", en: "Sandbox + approved templates" },
  },
  {
    id: "qualify",
    icon: "◇",
    title: { pt: "Qualificação", en: "Qualification" },
    subtitle: { pt: "Company · Signal · Workflow", en: "Company · Signal · Workflow" },
    objective: {
      pt: "Confirmar problema, impacto, urgência, autoridade e capacidade real de implementação.",
      en: "Confirm problem, impact, urgency, authority and actual implementation capacity.",
    },
    system: "Qualification engine · Scorecard",
    automation: {
      pt: "Aplica score explicável e separa educar, nutrir, agendar ou escalar.",
      en: "Applies an explainable score and routes to educate, nurture, book or escalate.",
    },
    human: {
      pt: "Vendas revisa contas estratégicas e toda desqualificação contestada.",
      en: "Sales reviews strategic accounts and every disputed disqualification.",
    },
    metric: { pt: "SQLs e motivo de perda", en: "SQLs and loss reason" },
    gate: { pt: "Regra explicável e auditável", en: "Explainable, auditable rule" },
  },
  {
    id: "takeover",
    icon: "♟",
    title: { pt: "Tomada humana", en: "Human takeover" },
    subtitle: { pt: "Sostenes assume o fechamento", en: "Sostenes takes over the close" },
    objective: {
      pt: "Transferir contexto completo, pausar a IA e permitir negociação humana sem mensagens concorrentes.",
      en: "Transfer full context, pause AI and allow human negotiation without competing messages.",
    },
    system: "Operator inbox · Pause lock · SLA alerts",
    automation: {
      pt: "Produz resumo, objeções, próximos passos e rascunho — não envia após a pausa.",
      en: "Produces summary, objections, next steps and a draft — sends nothing after pause.",
    },
    human: {
      pt: "Sostenes decide mensagem, proposta, desconto e retomada do agente.",
      en: "Sostenes decides message, proposal, discount and agent resumption.",
    },
    metric: { pt: "Tempo para assumir e conversão", en: "Takeover time and conversion" },
    gate: { pt: "Pausa atômica testada", en: "Atomic pause tested" },
  },
  {
    id: "calendar",
    icon: "□",
    title: { pt: "Agendamento", en: "Scheduling" },
    subtitle: { pt: "Calendly no momento certo", en: "Calendly at the right moment" },
    objective: {
      pt: "Liberar a agenda adequada somente após qualificação ou decisão humana.",
      en: "Release the right calendar only after qualification or a human decision.",
    },
    system: "Calendly link · Booking webhook",
    automation: {
      pt: "Envia o link correto, registra booking, cancelamento e remarcação.",
      en: "Sends the correct link and records bookings, cancellations and reschedules.",
    },
    human: {
      pt: "Vendas define agendas, critérios e exceções para contas-alvo.",
      en: "Sales defines calendars, criteria and target-account exceptions.",
    },
    metric: { pt: "Booking e show rate", en: "Booking and show rate" },
    gate: { pt: "Webhook idempotente", en: "Idempotent webhook" },
  },
  {
    id: "payment",
    icon: "$",
    title: { pt: "Pagamento", en: "Payment" },
    subtitle: { pt: "Checkout em dólares", en: "USD checkout" },
    objective: {
      pt: "Converter uma decisão aprovada em pagamento rastreável, com confirmação no servidor.",
      en: "Turn an approved decision into traceable payment, confirmed server-side.",
    },
    system: "Stripe Checkout · Payment webhook",
    automation: {
      pt: "Gera sessão, confirma o evento e atualiza o estágio uma única vez.",
      en: "Creates the session, confirms the event and updates the stage exactly once.",
    },
    human: {
      pt: "Founder aprova preço, parcelamento, reembolso e qualquer cobrança real.",
      en: "Founder approves price, installments, refunds and every real charge.",
    },
    metric: { pt: "Checkout iniciado → pago", en: "Checkout started → paid" },
    gate: { pt: "Teste Stripe antes de live", en: "Stripe test mode before live" },
  },
  {
    id: "dashboard",
    icon: "▥",
    title: { pt: "Dashboard", en: "Dashboard" },
    subtitle: { pt: "Receita e operação observáveis", en: "Observable revenue and operations" },
    objective: {
      pt: "Dar ao time uma fila única com conversa, consentimento, score, responsável e resultado.",
      en: "Give the team one queue with conversation, consent, score, owner and outcome.",
    },
    system: "Supabase · Realtime · RLS · CRM adapter",
    automation: {
      pt: "Atualiza estados, alerta gargalos e monta o relatório semanal.",
      en: "Updates states, flags bottlenecks and builds the weekly report.",
    },
    human: {
      pt: "Gestores auditam conversas, corrigem regras e aprovam mudanças.",
      en: "Managers audit conversations, correct rules and approve changes.",
    },
    metric: { pt: "Funil, receita e qualidade", en: "Funnel, revenue and quality" },
    gate: { pt: "RLS + trilha de auditoria", en: "RLS + audit trail" },
  },
];

const messages = {
  ai: [
    { side: "lead", text: "Temos 42 pessoas e o onboarding ainda depende de planilhas e cobranças manuais." },
    { side: "agent", text: "Entendi. Para medir a prioridade: quantas horas o time perde por semana e quem aprovaria uma mudança no processo?" },
    { side: "lead", text: "Perto de 30 horas. Eu sou a CEO e a operação participa da decisão." },
    { side: "agent", text: "Há impacto e autoridade claros. Posso fazer mais duas perguntas e, se houver aderência, abrir a agenda do especialista?" },
  ],
  human: [
    { side: "lead", text: "Precisamos integrar com dados financeiros. Quem garante a segurança?" },
    { side: "agent", text: "Sinal sensível identificado. A IA foi pausada e o contexto foi encaminhado para Sostenes." },
    { side: "human", text: "Olá, aqui é Sostenes. Antes de falar em integração, vamos delimitar dados, acessos e o piloto sem escrita em produção." },
  ],
};

const syntheticLeads = [
  { company: "Aurum Logística", source: "Audit PDF", score: 86, state: "Humano", next: "Revisar segurança", owner: "Sostenes" },
  { company: "Norte Retail", source: "CEO Skill", score: 74, state: "IA", next: "Pergunta 4/5", owner: "Agent" },
  { company: "Vale Serviços", source: "Partner", score: 92, state: "Booked", next: "Aug 06 · 10:00", owner: "Sostenes" },
  { company: "Lumen Foods", source: "Content", score: 48, state: "Nurture", next: "Case note", owner: "Agent" },
];

const phases = [
  {
    n: "00",
    title: { pt: "Aprovar o blueprint", en: "Approve the blueprint" },
    body: { pt: "Fluxo, mensagens, dados, regras e donos. Nenhuma integração real.", en: "Flow, messages, data, rules and owners. No live integration." },
    exit: { pt: "Decisões abaixo fechadas", en: "Decisions below closed" },
  },
  {
    n: "01",
    title: { pt: "Instrumentar a entrada", en: "Instrument acquisition" },
    body: { pt: "Landing, formulário, consentimento, eventos e Stripe em modo de teste.", en: "Landing, form, consent, events and Stripe in test mode." },
    exit: { pt: "Dados chegam íntegros e sem duplicação", en: "Data arrives intact and without duplicates" },
  },
  {
    n: "02",
    title: { pt: "Sandbox WhatsApp", en: "WhatsApp sandbox" },
    body: { pt: "Número de teste, webhooks, base aprovada e conversas sintéticas.", en: "Test number, webhooks, approved knowledge and synthetic conversations." },
    exit: { pt: "100% dos testes críticos passam", en: "100% of critical tests pass" },
  },
  {
    n: "03",
    title: { pt: "Dashboard + tomada", en: "Dashboard + takeover" },
    body: { pt: "Inbox, RLS, pausa atômica, trilha de auditoria e SLA.", en: "Inbox, RLS, atomic pause, audit trail and SLA." },
    exit: { pt: "Zero mensagens da IA durante pausa", en: "Zero AI messages while paused" },
  },
  {
    n: "04",
    title: { pt: "Conectar conversão", en: "Connect conversion" },
    body: { pt: "Calendly, Stripe, CRM e relatório semanal com reconciliação.", en: "Calendly, Stripe, CRM and reconciled weekly reporting." },
    exit: { pt: "Booking e pagamento reconciliados", en: "Bookings and payments reconciled" },
  },
  {
    n: "05",
    title: { pt: "Piloto controlado", en: "Controlled pilot" },
    body: { pt: "10–12 leads aquecidos, uma oferta e revisão humana de 100% das mensagens.", en: "10–12 warm leads, one offer and human review of 100% of messages." },
    exit: { pt: "≥6 completam, ≥3 qualificam e ≥2 aceitam próximo passo humano", en: "≥6 complete, ≥3 qualify and ≥2 accept a human next step" },
  },
];

const approvalItems = [
  { pt: "Oferta inicial e CTA do funil", en: "Initial offer and funnel CTA" },
  { pt: "Até 5 perguntas e regra de qualificação", en: "Up to 5 questions and qualification rule" },
  { pt: "Quando a IA deve parar e chamar Sostenes", en: "When AI must stop and call Sostenes" },
  { pt: "Dados coletados, retenção e aviso de privacidade", en: "Collected data, retention and privacy notice" },
  { pt: "Calendário, preço em USD e política de reembolso", en: "Calendar, USD price and refund policy" },
  { pt: "Fontes autorizadas de depoimentos e provas", en: "Authorized testimonial and proof sources" },
];

const funnelMetrics = [
  ["01", "Visitantes qualificados", "Qualified visitors"],
  ["02", "Opt-ins com consentimento", "Consented opt-ins"],
  ["03", "Conversas iniciadas", "Conversations started"],
  ["04", "Leads qualificados", "Qualified leads"],
  ["05", "Reuniões agendadas", "Meetings booked"],
  ["06", "Reuniões realizadas", "Meetings held"],
  ["07", "Pagamentos confirmados", "Payments confirmed"],
];

export default function WhatsAppFunnelBlueprint() {
  const [language, setLanguage] = useState<Language>("pt");
  const [activeStage, setActiveStage] = useState(stages[0].id);
  const [conversationMode, setConversationMode] = useState<"ai" | "human">("ai");
  const [approved, setApproved] = useState<number[]>([]);
  const [localDecision, setLocalDecision] = useState(false);

  const t = (copy: Copy) => copy[language];
  const selected = useMemo(
    () => stages.find((stage) => stage.id === activeStage) ?? stages[0],
    [activeStage],
  );

  const toggleApproval = (index: number) => {
    setApproved((items) =>
      items.includes(index) ? items.filter((item) => item !== index) : [...items, index],
    );
    setLocalDecision(false);
  };

  return (
    <main className="wf-shell">
      <header className="wf-topbar">
        <Link className="wf-brand" href="/" aria-label="Deployment.co home">
          Deployment<span>.co</span>
        </Link>
        <div className="wf-top-actions">
          <span className="wf-prototype-chip">{language === "pt" ? "Protótipo de aprovação" : "Approval prototype"}</span>
          <div className="wf-language" aria-label="Language selector">
            <button className={language === "pt" ? "active" : ""} onClick={() => setLanguage("pt")}>PT</button>
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
          </div>
        </div>
      </header>

      <section className="wf-hero">
        <div className="wf-kicker">Deployment.co · Revenue Architecture · 2026</div>
        <div className="wf-hero-grid">
          <div>
            <p className="wf-eyebrow">{language === "pt" ? "Blueprint visual para decisão" : "Visual decision blueprint"}</p>
            <h1>{language === "pt" ? "Do primeiro clique à receita — com o humano no controle." : "From first click to revenue — with humans in control."}</h1>
            <p className="wf-lead">
              {language === "pt"
                ? "Um sistema de aquisição, WhatsApp, qualificação, fechamento e mensuração desenhado para ser observado, assumido e melhorado pelo time."
                : "An acquisition, WhatsApp, qualification, closing and measurement system designed to be observed, taken over and improved by the team."}
            </p>
            <div className="wf-hero-actions">
              <a className="wf-primary" href="#flow">{language === "pt" ? "Explorar o fluxo" : "Explore the flow"}</a>
              <a className="wf-secondary" href="#approval">{language === "pt" ? "Ver decisões" : "See decisions"}</a>
            </div>
          </div>
          <div className="wf-hero-visual">
            {/* The static asset is intentionally unoptimized because this app runs on vinext/Workers. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/whatsapp-revenue-system.png"
              alt={language === "pt" ? "Ilustração editorial do funil completo" : "Editorial illustration of the full funnel"}
              width={1200}
              height={630}
            />
          </div>
        </div>
        <div className="wf-safety-strip" role="note">
          <span>◌ {language === "pt" ? "Dados sintéticos" : "Synthetic data"}</span>
          <span>◌ {language === "pt" ? "Nenhuma mensagem enviada" : "No messages sent"}</span>
          <span>◌ {language === "pt" ? "Nenhum pagamento processado" : "No payment processed"}</span>
          <span>◌ {language === "pt" ? "Sem integração ativa" : "No live integration"}</span>
        </div>
      </section>

      <section className="wf-section wf-thesis" aria-labelledby="thesis-title">
        <div className="wf-section-label">01 · {language === "pt" ? "A tese" : "The thesis"}</div>
        <div className="wf-thesis-grid">
          <h2 id="thesis-title">{language === "pt" ? "A página não é o funil. O sistema completo é o produto." : "The page is not the funnel. The full system is the product."}</h2>
          <div className="wf-thesis-copy">
            <p>{language === "pt" ? "O lead entra por um ativo relevante, entende a proposta em uma jornada móvel, autoriza o contato e é conduzido até a melhor próxima ação." : "The lead enters through a relevant asset, understands the offer in a mobile journey, authorizes contact and is guided to the best next action."}</p>
            <p>{language === "pt" ? "A IA reduz trabalho repetitivo. O humano preserva confiança, segurança, negociação e julgamento." : "AI reduces repetitive work. Humans preserve trust, safety, negotiation and judgment."}</p>
          </div>
        </div>
      </section>

      <section className="wf-section" id="flow" aria-labelledby="flow-title">
        <div className="wf-section-label">02 · {language === "pt" ? "Mapa do funil" : "Funnel map"}</div>
        <div className="wf-section-heading">
          <div>
            <p className="wf-eyebrow">{language === "pt" ? "Clique em cada etapa" : "Click each stage"}</p>
            <h2 id="flow-title">{language === "pt" ? "Nove movimentos. Uma única trilha de dados." : "Nine moves. One data trail."}</h2>
          </div>
          <p>{language === "pt" ? "Cada cartão revela automação, responsabilidade humana, métrica e porta de aprovação." : "Each card reveals automation, human responsibility, metric and approval gate."}</p>
        </div>

        <div className="wf-stage-rail" role="tablist" aria-label="Funnel stages">
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              className={`wf-stage-card ${activeStage === stage.id ? "active" : ""}`}
              onClick={() => setActiveStage(stage.id)}
              role="tab"
              aria-selected={activeStage === stage.id}
              aria-controls="stage-detail"
            >
              <span className="wf-stage-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="wf-stage-icon" aria-hidden="true">{stage.icon}</span>
              <strong>{t(stage.title)}</strong>
              <small>{t(stage.subtitle)}</small>
            </button>
          ))}
        </div>

        <article className="wf-stage-detail" id="stage-detail" role="tabpanel">
          <div className="wf-detail-intro">
            <span className="wf-detail-icon" aria-hidden="true">{selected.icon}</span>
            <div>
              <p className="wf-eyebrow">{t(selected.subtitle)}</p>
              <h3>{t(selected.title)}</h3>
              <p>{t(selected.objective)}</p>
            </div>
          </div>
          <div className="wf-detail-grid">
            <div><span>{language === "pt" ? "Sistemas" : "Systems"}</span><strong>{selected.system}</strong></div>
            <div><span>{language === "pt" ? "A IA faz" : "AI does"}</span><strong>{t(selected.automation)}</strong></div>
            <div><span>{language === "pt" ? "O humano decide" : "Human decides"}</span><strong>{t(selected.human)}</strong></div>
            <div><span>{language === "pt" ? "Métrica" : "Metric"}</span><strong>{t(selected.metric)}</strong></div>
          </div>
          <div className="wf-gate"><span>Gate</span>{t(selected.gate)}</div>
        </article>

        <div className="wf-route-map" aria-label={language === "pt" ? "Rotas comerciais" : "Commercial routes"}>
          <div className="wf-route-start"><span>QUALIFIED INTENT</span><strong>{language === "pt" ? "O sistema escolhe a próxima ação — não empurra todos pelo mesmo caminho." : "The system chooses the next action — it does not push everyone down the same path."}</strong></div>
          <article>
            <span className="wf-route-letter">A</span>
            <div><p className="wf-eyebrow">US$99 · Fixed offer</p><h3>Implementation Day</h3><p>{language === "pt" ? "Landing → consentimento → Stripe Checkout → confirmação → WhatsApp de onboarding." : "Landing → consent → Stripe Checkout → confirmation → onboarding WhatsApp."}</p></div>
            <small>{language === "pt" ? "Sem reunião obrigatória · reembolso até 24h antes" : "No mandatory meeting · refund until 24h before"}</small>
          </article>
          <article>
            <span className="wf-route-letter">B</span>
            <div><p className="wf-eyebrow">High-ticket · Custom scope</p><h3>{language === "pt" ? "Implementação empresarial" : "Enterprise implementation"}</h3><p>{language === "pt" ? "WhatsApp → qualificação → Sostenes assume → Calendly → escopo/acordo → Stripe." : "WhatsApp → qualification → Sostenes takes over → Calendly → scope/agreement → Stripe."}</p></div>
            <small>{language === "pt" ? "Cobrança após decisão humana" : "Charge after human decision"}</small>
          </article>
          <article>
            <span className="wf-route-letter">C</span>
            <div><p className="wf-eyebrow">Not yet ready</p><h3>{language === "pt" ? "Nutrição com permissão" : "Permission-based nurture"}</h3><p>{language === "pt" ? "Entregar conteúdo útil, respeitar canal/frequência e permitir opt-out imediato." : "Deliver useful content, respect channel/frequency and allow immediate opt-out."}</p></div>
            <small>{language === "pt" ? "Sem insistência automática" : "No automated pressure"}</small>
          </article>
        </div>
      </section>

      <section className="wf-section wf-acquisition" aria-labelledby="acquisition-title">
        <div className="wf-section-label">03 · {language === "pt" ? "Portas de entrada" : "Entry points"}</div>
        <div className="wf-section-heading">
          <div>
            <p className="wf-eyebrow">{language === "pt" ? "Captação por valor" : "Value-led acquisition"}</p>
            <h2 id="acquisition-title">{language === "pt" ? "Três razões para o decisor começar." : "Three reasons for a decision-maker to start."}</h2>
          </div>
          <p>{language === "pt" ? "Uma oferta por campanha; o sistema registra qual ativo iniciou a conversa." : "One offer per campaign; the system records which asset started the conversation."}</p>
        </div>
        <div className="wf-three-cards">
          <article><span className="wf-big-icon">⌁</span><p className="wf-eyebrow">Lead magnet 01</p><h3>CEO Operating Skill</h3><p>{language === "pt" ? "Download com passo a passo. Captura empresa, cargo, desafio e autorização antes da entrega." : "Step-by-step download. Captures company, role, challenge and authorization before delivery."}</p><small>{language === "pt" ? "Hipótese a validar" : "Hypothesis to validate"}</small></article>
          <article><span className="wf-big-icon">⌕</span><p className="wf-eyebrow">Lead magnet 02</p><h3>AI Opportunity Audit</h3><p>{language === "pt" ? "PDF profissional com gargalos observados e perguntas — sem fingir diagnóstico profundo ou resultado garantido." : "Professional PDF with observed gaps and questions — without pretending to be a deep diagnosis or guaranteed result."}</p><small>{language === "pt" ? "Gerado com evidência citada" : "Generated with cited evidence"}</small></article>
          <article><span className="wf-big-icon">◫</span><p className="wf-eyebrow">Conversion event</p><h3>Implementation Day</h3><p>{language === "pt" ? "Evento pago que transforma intenção em experiência e abre duas rotas de oferta durante a entrega." : "Paid event that turns intent into experience and opens two offer paths during delivery."}</p><small>Aug 15 · Online · US$99 · 100 seats</small></article>
        </div>
      </section>

      <section className="wf-section wf-demo" aria-labelledby="demo-title">
        <div className="wf-section-label">04 · {language === "pt" ? "Demonstração" : "Demonstration"}</div>
        <div className="wf-section-heading">
          <div>
            <p className="wf-eyebrow">{language === "pt" ? "Conversa fictícia" : "Fictional conversation"}</p>
            <h2 id="demo-title">{language === "pt" ? "A IA avança. O humano pode interromper." : "AI advances. A human can interrupt."}</h2>
          </div>
          <div className="wf-mode-switch" aria-label="Conversation mode">
            <button className={conversationMode === "ai" ? "active" : ""} onClick={() => setConversationMode("ai")}>{language === "pt" ? "IA ativa" : "AI active"}</button>
            <button className={conversationMode === "human" ? "active" : ""} onClick={() => setConversationMode("human")}>{language === "pt" ? "Tomada humana" : "Human takeover"}</button>
          </div>
        </div>
        <div className="wf-demo-grid">
          <div className="wf-phone">
            <div className="wf-phone-header">
              <span className="wf-avatar">D</span>
              <div><strong>Deployment.co</strong><small>{conversationMode === "ai" ? (language === "pt" ? "Agente ativo · protótipo" : "Agent active · prototype") : (language === "pt" ? "Sostenes assumiu · IA pausada" : "Sostenes joined · AI paused")}</small></div>
              <span className={`wf-live-dot ${conversationMode}`} />
            </div>
            <div className="wf-chat">
              {messages[conversationMode].map((message, index) => (
                <div key={`${conversationMode}-${index}`} className={`wf-bubble ${message.side}`}>{message.text}</div>
              ))}
            </div>
            <div className="wf-disabled-composer"><span>{language === "pt" ? "Simulação — envio desativado" : "Simulation — sending disabled"}</span><button disabled>➤</button></div>
          </div>
          <aside className="wf-context-panel">
            <div className="wf-panel-header"><span>{language === "pt" ? "Contexto transferido" : "Transferred context"}</span><strong>{conversationMode === "ai" ? "AI" : "HUMAN"}</strong></div>
            <dl>
              <div><dt>{language === "pt" ? "Empresa" : "Company"}</dt><dd>Aurum Logística <em>{language === "pt" ? "fictícia" : "fictional"}</em></dd></div>
              <div><dt>{language === "pt" ? "Dor" : "Pain"}</dt><dd>{language === "pt" ? "30 h/semana em tarefas manuais" : "30 h/week in manual tasks"}</dd></div>
              <div><dt>{language === "pt" ? "Autoridade" : "Authority"}</dt><dd>CEO + Operations</dd></div>
              <div><dt>Score</dt><dd>86 / 100 · {language === "pt" ? "explicável" : "explainable"}</dd></div>
              <div><dt>{language === "pt" ? "Próxima ação" : "Next action"}</dt><dd>{conversationMode === "ai" ? (language === "pt" ? "Validar 2 perguntas" : "Validate 2 questions") : (language === "pt" ? "Revisão de segurança" : "Security review")}</dd></div>
              <div><dt>Owner · SLA</dt><dd>{conversationMode === "ai" ? "Agent · instant" : "Sostenes · 15 min"}</dd></div>
            </dl>
            <div className="wf-confidence"><span>{language === "pt" ? "Confiança do agente" : "Agent confidence"}</span><div><i style={{ width: conversationMode === "ai" ? "82%" : "38%" }} /></div><strong>{conversationMode === "ai" ? "82%" : "38%"}</strong></div>
            <button className={`wf-takeover ${conversationMode === "human" ? "paused" : ""}`} onClick={() => setConversationMode(conversationMode === "ai" ? "human" : "ai")}>
              {conversationMode === "ai" ? (language === "pt" ? "Pausar IA e assumir" : "Pause AI and take over") : (language === "pt" ? "Devolver à IA com aprovação" : "Return to AI with approval")}
            </button>
            <small>{language === "pt" ? "Ação apenas visual. Nenhum sistema externo é alterado." : "Visual action only. No external system is changed."}</small>
          </aside>
        </div>
      </section>

      <section className="wf-section wf-architecture" aria-labelledby="architecture-title">
        <div className="wf-section-label">05 · {language === "pt" ? "Arquitetura" : "Architecture"}</div>
        <div className="wf-section-heading">
          <div><p className="wf-eyebrow">{language === "pt" ? "Camadas independentes" : "Independent layers"}</p><h2 id="architecture-title">{language === "pt" ? "Trocar ferramentas sem perder o processo." : "Change tools without losing the process."}</h2></div>
          <p>{language === "pt" ? "O banco guarda o estado; integrações entram por adaptadores; toda mudança crítica gera evento e trilha." : "The database holds state; integrations enter through adapters; every critical change creates an event and trail."}</p>
        </div>
        <div className="wf-system-map">
          <div className="wf-map-row edge">
            <div><span>▣</span><strong>Premium micro-site</strong><small>Form · Consent · Source</small></div>
            <b>→</b>
            <div><span>◉</span><strong>Meta WhatsApp</strong><small>Cloud API · Webhooks</small></div>
            <b>→</b>
            <div><span>◇</span><strong>Agent Orchestrator</strong><small>Policy · Score · Handoff</small></div>
          </div>
          <div className="wf-map-core">
            <span className="wf-core-label">SYSTEM OF RECORD</span>
            <div><span>▦</span><strong>Supabase</strong><small>Leads · Messages · Consent · Events</small></div>
            <div><span>♟</span><strong>Operator Dashboard</strong><small>Queue · Takeover · Audit</small></div>
            <div><span>⌁</span><strong>Policy & Evaluation</strong><small>Confidence · Red flags · QA</small></div>
          </div>
          <div className="wf-map-row adapters">
            <div><span>□</span><strong>Calendly adapter</strong><small>Book · Cancel · Reschedule</small></div>
            <div><span>$</span><strong>Stripe adapter</strong><small>Checkout · Paid · Refund</small></div>
            <div><span>▤</span><strong>CRM adapter</strong><small>Stage · Owner · Outcome</small></div>
            <div><span>⌕</span><strong>Research adapter</strong><small>Approved public inputs</small></div>
          </div>
        </div>
        <div className="wf-rule-strip"><strong>{language === "pt" ? "Regra arquitetural" : "Architecture rule"}</strong><span>{language === "pt" ? "Webhooks podem repetir. Processamento deve ser idempotente, auditável e reversível." : "Webhooks can repeat. Processing must be idempotent, auditable and reversible."}</span></div>
      </section>

      <section className="wf-section wf-dashboard" aria-labelledby="dashboard-title">
        <div className="wf-section-label">06 · {language === "pt" ? "Painel de controle" : "Control dashboard"}</div>
        <div className="wf-section-heading">
          <div><p className="wf-eyebrow">{language === "pt" ? "Dados 100% sintéticos" : "100% synthetic data"}</p><h2 id="dashboard-title">{language === "pt" ? "O dono vê o que a IA está fazendo." : "The owner sees what AI is doing."}</h2></div>
          <p>{language === "pt" ? "A fila responde quatro perguntas: quem entrou, por quê, quem controla e qual é a próxima ação." : "The queue answers four questions: who entered, why, who controls it and what happens next."}</p>
        </div>
        <div className="wf-dashboard-shell">
          <div className="wf-dashboard-nav"><strong>Deployment<span>.co</span></strong><span>{language === "pt" ? "Pipeline ao vivo · conceito" : "Live pipeline · concept"}</span><button>{language === "pt" ? "Exportar relatório" : "Export report"}</button></div>
          <div className="wf-dashboard-controls">
            <span>✓ {language === "pt" ? "Consentimento registrado" : "Consent recorded"}</span>
            <span>◷ {language === "pt" ? "Retenção a definir" : "Retention to define"}</span>
            <span>♟ {language === "pt" ? "RBAC + MFA obrigatórios" : "RBAC + MFA required"}</span>
            <button>{language === "pt" ? "Opt-out / exportar / apagar" : "Opt-out / export / delete"}</button>
          </div>
          <div className="wf-kpis">
            <div><span>{language === "pt" ? "Conversas" : "Conversations"}</span><strong>24</strong><small>{language === "pt" ? "valor ilustrativo" : "illustrative value"}</small></div>
            <div><span>{language === "pt" ? "Qualificados" : "Qualified"}</span><strong>7</strong><small>29.2% · {language === "pt" ? "hipótese" : "hypothesis"}</small></div>
            <div><span>{language === "pt" ? "Intervenções" : "Interventions"}</span><strong>3</strong><small>12.5% · {language === "pt" ? "hipótese" : "hypothesis"}</small></div>
            <div><span>{language === "pt" ? "Agendados" : "Booked"}</span><strong>4</strong><small>16.7% · {language === "pt" ? "hipótese" : "hypothesis"}</small></div>
          </div>
          <div className="wf-table-wrap">
            <table>
              <thead><tr><th>{language === "pt" ? "Conta" : "Account"}</th><th>{language === "pt" ? "Origem" : "Source"}</th><th>Score</th><th>{language === "pt" ? "Controle" : "Control"}</th><th>{language === "pt" ? "Próximo passo" : "Next step"}</th><th>Owner</th></tr></thead>
              <tbody>{syntheticLeads.map((lead) => <tr key={lead.company}><td><strong>{lead.company}</strong><small>{language === "pt" ? "empresa fictícia" : "fictional company"}</small></td><td>{lead.source}</td><td><span className={`wf-score score-${lead.score >= 80 ? "high" : lead.score >= 60 ? "mid" : "low"}`}>{lead.score}</span></td><td><span className={`wf-status ${lead.state.toLowerCase()}`}>{lead.state}</span></td><td>{lead.next}</td><td>{lead.owner}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="wf-section wf-evidence" aria-labelledby="evidence-title">
        <div className="wf-section-label">07 · {language === "pt" ? "Prova e linguagem" : "Proof and language"}</div>
        <div className="wf-section-heading">
          <div><p className="wf-eyebrow">{language === "pt" ? "Sem prova inventada" : "No invented proof"}</p><h2 id="evidence-title">{language === "pt" ? "Pesquisa entra como insumo. Evidência sai com permissão." : "Research enters as input. Evidence exits with permission."}</h2></div>
          <p>{language === "pt" ? "Firecrawl pode apoiar pesquisa pública autorizada; não transforma comentários de terceiros em depoimentos da Deployment.co." : "Firecrawl can support authorized public research; it does not turn third-party comments into Deployment.co testimonials."}</p>
        </div>
        <div className="wf-proof-grid">
          <article className="good"><span>01</span><h3>{language === "pt" ? "Voz do mercado" : "Market language"}</h3><p>{language === "pt" ? "Extrair padrões agregados e anonimizados de fontes permitidas; guardar URL e data; sintetizar com palavras próprias." : "Extract aggregated, anonymized patterns from permitted sources; retain URL and date; synthesize in original language."}</p></article>
          <article className="good"><span>02</span><h3>{language === "pt" ? "Depoimento real" : "Real testimonial"}</h3><p>{language === "pt" ? "Publicar somente com origem verificável, autorização e contexto suficiente para não induzir erro." : "Publish only with a verifiable source, permission and enough context to avoid misleading readers."}</p></article>
          <article className="good"><span>03</span><h3>{language === "pt" ? "Relatório de auditoria" : "Audit report"}</h3><p>{language === "pt" ? "Separar observação, inferência e recomendação. Não chamar estimativa de perda ou ganho de resultado medido." : "Separate observation, inference and recommendation. Never call estimated loss or gain a measured outcome."}</p></article>
          <article className="bad"><span>×</span><h3>{language === "pt" ? "Fora do sistema" : "Outside the system"}</h3><p>{language === "pt" ? "Scraping sem permissão, depoimento automático, métrica fictícia, urgência falsa, promessa de receita ou decisão irreversível só pela IA." : "Unauthorized scraping, automatic testimonials, fictional metrics, false urgency, revenue guarantees or AI-only irreversible decisions."}</p></article>
        </div>
      </section>

      <section className="wf-section wf-metrics" aria-labelledby="metrics-title">
        <div className="wf-section-label">08 · {language === "pt" ? "Medição" : "Measurement"}</div>
        <div className="wf-section-heading">
          <div><p className="wf-eyebrow">{language === "pt" ? "Uma equação operacional" : "One operating equation"}</p><h2 id="metrics-title">{language === "pt" ? "Receita é consequência de sete conversões observáveis." : "Revenue is the consequence of seven observable conversions."}</h2></div>
          <p>{language === "pt" ? "As taxas ainda não são resultados. O piloto cria a primeira linha de base confiável." : "The rates are not results yet. The pilot creates the first reliable baseline."}</p>
        </div>
        <div className="wf-metric-chain">
          {funnelMetrics.map((metric, index) => <div key={metric[0]}><span>{metric[0]}</span><strong>{language === "pt" ? metric[1] : metric[2]}</strong>{index < funnelMetrics.length - 1 && <b>×</b>}</div>)}
        </div>
        <div className="wf-metric-callout"><span>North Star</span><strong>{language === "pt" ? "Receita confirmada por origem ÷ custo total do sistema" : "Confirmed revenue by source ÷ total system cost"}</strong><small>{language === "pt" ? "Com qualidade: opt-out, intervenção, erro e tempo humano ao lado da receita." : "With quality: opt-out, intervention, error and human time next to revenue."}</small></div>
      </section>

      <section className="wf-section wf-roadmap" aria-labelledby="roadmap-title">
        <div className="wf-section-label">09 · {language === "pt" ? "Plano de implementação" : "Implementation plan"}</div>
        <div className="wf-section-heading">
          <div><p className="wf-eyebrow">{language === "pt" ? "Seis gates reversíveis" : "Six reversible gates"}</p><h2 id="roadmap-title">{language === "pt" ? "Construir do controle para a automação." : "Build from control toward automation."}</h2></div>
          <p>{language === "pt" ? "A fase seguinte só abre quando o critério de saída anterior estiver comprovado." : "The next phase opens only after the previous exit criterion is proven."}</p>
        </div>
        <div className="wf-phase-list">
          {phases.map((phase) => <article key={phase.n}><span>{phase.n}</span><div><h3>{t(phase.title)}</h3><p>{t(phase.body)}</p></div><small><b>EXIT</b>{t(phase.exit)}</small></article>)}
        </div>
      </section>

      <section className="wf-section wf-risks" aria-labelledby="risk-title">
        <div className="wf-section-label">10 · {language === "pt" ? "Controles" : "Controls"}</div>
        <div className="wf-section-heading">
          <div><p className="wf-eyebrow">{language === "pt" ? "O que precisa existir antes do piloto" : "What must exist before the pilot"}</p><h2 id="risk-title">{language === "pt" ? "Automação sem visibilidade não entra em produção." : "Automation without visibility does not enter production."}</h2></div>
        </div>
        <div className="wf-control-grid">
          <div><span>01</span><strong>{language === "pt" ? "Identidade clara" : "Clear identity"}</strong><p>{language === "pt" ? "A conversa informa que existe automação e oferece atendimento humano." : "The conversation discloses automation and offers human service."}</p></div>
          <div><span>02</span><strong>{language === "pt" ? "Mínimo de dados" : "Data minimization"}</strong><p>{language === "pt" ? "Coletar só o necessário, definir retenção e atender revogação/eliminação." : "Collect only what is needed, define retention and honor revocation/deletion."}</p></div>
          <div><span>03</span><strong>{language === "pt" ? "Pausa real" : "Real pause"}</strong><p>{language === "pt" ? "Takeover bloqueia envios do agente até liberação humana explícita." : "Takeover blocks agent sends until explicit human release."}</p></div>
          <div><span>04</span><strong>{language === "pt" ? "Segredos no servidor" : "Server-side secrets"}</strong><p>{language === "pt" ? "Tokens Meta, Stripe, Calendly e service role nunca chegam ao navegador." : "Meta, Stripe, Calendly and service-role tokens never reach the browser."}</p></div>
          <div><span>05</span><strong>{language === "pt" ? "Trilha de decisão" : "Decision trail"}</strong><p>{language === "pt" ? "Quem mudou regra, assumiu conversa, enviou proposta ou confirmou pagamento." : "Who changed a rule, took a conversation, sent a proposal or confirmed payment."}</p></div>
          <div><span>06</span><strong>{language === "pt" ? "Kill switch" : "Kill switch"}</strong><p>{language === "pt" ? "Um comando interrompe todos os envios sem apagar o histórico." : "One command stops all sends without deleting history."}</p></div>
        </div>
      </section>

      <section className="wf-section wf-approval" id="approval" aria-labelledby="approval-title">
        <div className="wf-section-label">11 · {language === "pt" ? "Decisão do Founder" : "Founder decision"}</div>
        <div className="wf-approval-grid">
          <div>
            <p className="wf-eyebrow">{language === "pt" ? "Antes de escrever uma linha de integração" : "Before writing one integration line"}</p>
            <h2 id="approval-title">{language === "pt" ? "Seis definições precisam ser fechadas." : "Six definitions must be closed."}</h2>
            <p>{language === "pt" ? "Marque para simular a revisão. Esta página não grava a decisão nem inicia implementação." : "Check to simulate the review. This page does not save the decision or start implementation."}</p>
            <div className="wf-progress"><div><i style={{ width: `${(approved.length / approvalItems.length) * 100}%` }} /></div><strong>{approved.length}/{approvalItems.length}</strong></div>
          </div>
          <div className="wf-checklist">
            {approvalItems.map((item, index) => <label key={item.pt} className={approved.includes(index) ? "checked" : ""}><input type="checkbox" checked={approved.includes(index)} onChange={() => toggleApproval(index)} /><span>{approved.includes(index) ? "✓" : String(index + 1).padStart(2, "0")}</span><strong>{t(item)}</strong></label>)}
            <button className="wf-decision-button" disabled={approved.length !== approvalItems.length} onClick={() => setLocalDecision(true)}>{language === "pt" ? "Registrar aprovação nesta demonstração" : "Record approval in this demo"}</button>
            {localDecision && <div className="wf-local-confirmation">✓ {language === "pt" ? "Pronto para transformar este blueprint em especificação técnica. Nenhuma integração foi iniciada." : "Ready to turn this blueprint into a technical specification. No integration was started."}</div>}
          </div>
        </div>
      </section>

      <section className="wf-section wf-proof-boundary">
        <div className="wf-section-label">12 · {language === "pt" ? "Fronteira da demonstração" : "Demo boundary"}</div>
        <div className="wf-boundary-grid">
          <div><span>PROVES</span><h3>{language === "pt" ? "O que este protótipo prova" : "What this prototype proves"}</h3><ul><li>{language === "pt" ? "Fluxo compreensível de ponta a ponta" : "Comprehensible end-to-end flow"}</li><li>{language === "pt" ? "Responsabilidade de IA e humano separada" : "Separated AI and human responsibility"}</li><li>{language === "pt" ? "Arquitetura e gates implementáveis" : "Implementable architecture and gates"}</li><li>{language === "pt" ? "Métricas definidas antes do piloto" : "Metrics defined before the pilot"}</li></ul></div>
          <div><span>DOES NOT PROVE</span><h3>{language === "pt" ? "O que ainda precisa de evidência" : "What still needs evidence"}</h3><ul><li>{language === "pt" ? "Conversão, receita ou ROI" : "Conversion, revenue or ROI"}</li><li>{language === "pt" ? "Aprovação da Meta ou contas conectadas" : "Meta approval or connected accounts"}</li><li>{language === "pt" ? "Segurança de produção e conformidade jurídica" : "Production security and legal compliance"}</li><li>{language === "pt" ? "Capacidade de operar em escala" : "Ability to operate at scale"}</li></ul></div>
        </div>
      </section>

      <footer className="wf-footer">
        <div><Link className="wf-brand" href="/">Deployment<span>.co</span></Link><p>{language === "pt" ? "WhatsApp Revenue System · Blueprint de aprovação" : "WhatsApp Revenue System · Approval blueprint"}</p></div>
        <div className="wf-sources">
          <span>{language === "pt" ? "Referências técnicas oficiais" : "Official technical references"}</span>
          <a href="https://www.postman.com/meta/whatsapp-business-platform/documentation/wlk6lh4/whatsapp-cloud-api" target="_blank" rel="noreferrer">Meta WhatsApp Cloud API ↗</a>
          <a href="https://supabase.com/docs/guides/database/postgres/row-level-security" target="_blank" rel="noreferrer">Supabase RLS ↗</a>
          <a href="https://docs.stripe.com/checkout/fulfillment" target="_blank" rel="noreferrer">Stripe Checkout ↗</a>
          <a href="https://developer.calendly.com/getting-started" target="_blank" rel="noreferrer">Calendly API ↗</a>
          <a href="https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes" target="_blank" rel="noreferrer">ANPD ↗</a>
        </div>
        <small>Concept v1.0 · 01 Aug 2026 · {language === "pt" ? "Não é um sistema em produção" : "Not a production system"}</small>
      </footer>
    </main>
  );
}
