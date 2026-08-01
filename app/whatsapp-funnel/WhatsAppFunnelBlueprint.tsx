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
    id: "ceo-skill",
    icon: "⌁",
    title: { pt: "Skill do CEO", en: "CEO Skill" },
    subtitle: { pt: "A isca de aquisição", en: "The acquisition asset" },
    objective: {
      pt: "Atrair líderes com uma ferramenta instalável que ajuda a mapear decisões, gargalos e oportunidades de IA.",
      en: "Attract leaders with an installable tool that helps map decisions, bottlenecks and AI opportunities.",
    },
    system: "Micro-site · CEO Skill · Source tracking",
    automation: { pt: "Registra origem e intenção de download.", en: "Records source and download intent." },
    human: { pt: "Deployment.co aprova promessa, arquivo e tutorial.", en: "Deployment.co approves the promise, file and tutorial." },
    metric: { pt: "Visita → formulário iniciado", en: "Visit → form started" },
    gate: { pt: "Skill testada e promessa específica", en: "Tested skill and specific promise" },
  },
  {
    id: "short-form",
    icon: "▣",
    title: { pt: "Formulário curto", en: "Short form" },
    subtitle: { pt: "Cinco dados essenciais", en: "Five essential fields" },
    objective: {
      pt: "Capturar nome, e-mail profissional, empresa, porte e problema atual antes de abrir o WhatsApp.",
      en: "Capture name, work email, company, size and current problem before opening WhatsApp.",
    },
    system: "Form · Supabase · Privacy notice",
    automation: { pt: "Valida e-mail, deduplica e guarda a origem.", en: "Validates email, deduplicates and stores source." },
    human: { pt: "Time define retenção, finalidade e canal de suporte.", en: "Team defines retention, purpose and support channel." },
    metric: { pt: "Formulários completos", en: "Completed forms" },
    gate: { pt: "Aviso curto ao lado do CTA", en: "Short notice beside the CTA" },
  },
  {
    id: "whatsapp-entry",
    icon: "◉",
    title: { pt: "Entrada no WhatsApp", en: "WhatsApp entry" },
    subtitle: { pt: "1:1 primeiro; grupo opcional", en: "1:1 first; group optional" },
    objective: {
      pt: "Fazer a pessoa iniciar a conversa privada. O canal de avisos é separado e nunca bloqueia a entrega.",
      en: "Have the person start the private conversation. The announcement channel is separate and never gates delivery.",
    },
    system: "WhatsApp 1:1 · Optional channel · Webhooks",
    automation: { pt: "Reconhece a entrada e inicia o onboarding.", en: "Recognizes entry and starts onboarding." },
    human: { pt: "Time assume dúvidas, pedidos e exceções.", en: "Team takes over questions, requests and exceptions." },
    metric: { pt: "Formulário → conversa iniciada", en: "Form → conversation started" },
    gate: { pt: "Grupo depende da elegibilidade Meta", en: "Group depends on Meta eligibility" },
  },
  {
    id: "skill-delivery",
    icon: "↓",
    title: { pt: "Entrega privada", en: "Private delivery" },
    subtitle: { pt: "Skill + tutorial", en: "Skill + tutorial" },
    objective: {
      pt: "Entregar a Skill do CEO no privado, explicar a instalação e responder dúvidas dentro da base aprovada.",
      en: "Deliver the CEO Skill privately, explain installation and answer questions from the approved knowledge base.",
    },
    system: "Meta Cloud API · File delivery · Knowledge base",
    automation: { pt: "Envia arquivo, instruções e registra a entrega.", en: "Sends file, instructions and records delivery." },
    human: { pt: "Time revisa baixa confiança ou pedido explícito.", en: "Team reviews low confidence or explicit requests." },
    metric: { pt: "Skills entregues e dúvidas resolvidas", en: "Skills delivered and questions resolved" },
    gate: { pt: "Arquivo seguro e instruções testadas", en: "Secure file and tested instructions" },
  },
  {
    id: "lab-invite",
    icon: "✦",
    title: { pt: "Convite para o Lab", en: "Lab invitation" },
    subtitle: { pt: "Oferta humana de US$99", en: "Human US$99 offer" },
    objective: {
      pt: "Conectar o perfil informado ao Deployment LAB e oferecer o link sem exigir reunião.",
      en: "Connect the stated profile to the Deployment LAB and offer the link without requiring a meeting.",
    },
    system: "Agent policy · Approved invitation · Event page",
    automation: { pt: "Personaliza o contexto sem inventar escassez.", en: "Personalizes context without invented scarcity." },
    human: { pt: "Time aprova mensagem, cadência e capacidade real.", en: "Team approves message, cadence and real capacity." },
    metric: { pt: "Links solicitados e acessados", en: "Links requested and opened" },
    gate: { pt: "Capacidade limitada pela facilitação ao vivo", en: "Capacity limited by live facilitation" },
  },
  {
    id: "pre-checkout",
    icon: "◇",
    title: { pt: "Pré-checkout", en: "Pre-checkout" },
    subtitle: { pt: "Inscrição + sinais de fit", en: "Registration + fit signals" },
    objective: {
      pt: "Entender objetivo, dificuldade, perfil e autoridade. Porte e faturamento entram como faixas opcionais para roteamento futuro.",
      en: "Understand goal, difficulty, profile and authority. Company size and revenue are optional bands for future routing.",
    },
    system: "Registration form · Supabase · Fit flags",
    automation: { pt: "Sugere prioridade e rota; nunca rejeita ou precifica.", en: "Suggests priority and route; never rejects or prices." },
    human: { pt: "Head de Vendas ou co-founder revisa contas estratégicas.", en: "Head of Sales or co-founder reviews strategic accounts." },
    metric: { pt: "Inscrição → checkout", en: "Registration → checkout" },
    gate: { pt: "Ticket não depende do score", en: "Ticket never depends on score" },
  },
  {
    id: "lab-checkout",
    icon: "$",
    title: { pt: "Checkout do Lab", en: "Lab checkout" },
    subtitle: { pt: "US$99 sem reunião", en: "US$99 without a meeting" },
    objective: {
      pt: "Fechar a compra do Deployment LAB diretamente, com preço e política de reembolso visíveis.",
      en: "Close the Deployment LAB purchase directly, with visible price and refund policy.",
    },
    system: "Stripe Checkout · Payment webhook",
    automation: { pt: "Confirma pagamento no servidor uma única vez.", en: "Confirms payment server-side exactly once." },
    human: { pt: "Time aprova preço, reembolso e suporte.", en: "Team approves price, refund and support." },
    metric: { pt: "Checkout iniciado → pago", en: "Checkout started → paid" },
    gate: { pt: "Reembolso até 24h antes do evento", en: "Refund until 24h before the event" },
  },
  {
    id: "event-pass",
    icon: "▤",
    title: { pt: "Ingresso digital", en: "Digital event pass" },
    subtitle: { pt: "Liberado após pagamento", en: "Released after payment" },
    objective: {
      pt: "Entregar confirmação, ticket personalizado e instruções do evento somente após o webhook de pagamento.",
      en: "Deliver confirmation, personalized pass and event instructions only after the payment webhook.",
    },
    system: "Ticket generator · Email/WhatsApp · Event ID",
    automation: { pt: "Gera ingresso e registra a entrega.", en: "Generates the pass and records delivery." },
    human: { pt: "Suporte resolve divergências e reemissões.", en: "Support resolves discrepancies and reissues." },
    metric: { pt: "Pagos → ingressos entregues", en: "Paid → passes delivered" },
    gate: { pt: "Sem confirmação baseada no navegador", en: "No browser-only confirmation" },
  },
  {
    id: "fit-routing",
    icon: "↗",
    title: { pt: "Roteamento de fit", en: "Fit routing" },
    subtitle: { pt: "Lab, agenda ou pitch", en: "Lab, calendar or pitch" },
    objective: {
      pt: "Separar quem segue apenas no Lab de quem pode receber convite opcional para uma conversa sobre implementação.",
      en: "Separate Lab-only participants from those who may receive an optional implementation conversation invite.",
    },
    system: "Supabase · Scorecard · Calendly · Audit log",
    automation: { pt: "Recomenda a rota e apresenta razões auditáveis.", en: "Recommends a route with auditable reasons." },
    human: { pt: "Head de Vendas ou co-founder decide agenda, proposta e preço.", en: "Head of Sales or co-founder decides calendar, proposal and price." },
    metric: { pt: "Fit revisado, agendado e fechado", en: "Fit reviewed, booked and closed" },
    gate: { pt: "Toda decisão comercial é humana", en: "Every commercial decision is human" },
  },
];

const messages = {
  ai: [
    { side: "lead", text: { pt: "Olá! Vim baixar a Skill do CEO.", en: "Hi! I came to download the CEO Skill." } },
    { side: "agent", text: { pt: "Perfeito — sou o assistente automatizado da Deployment.co. Aqui estão a Skill do CEO e o guia de instalação. Se quiser, posso ajudar com qualquer etapa.", en: "Perfect — I am Deployment.co’s automated assistant. Here are the CEO Skill and installation guide. I can help with any step." } },
    { side: "lead", text: { pt: "Recebi. Nosso maior problema é o onboarding, hoje muito manual.", en: "Got it. Our biggest problem is onboarding, which is still very manual." } },
    { side: "agent", text: { pt: "Pelo perfil informado, o Deployment LAB pode fazer sentido para você: 4 horas online implementando IA na prática, com certificado de participação. Custa US$99 e tem capacidade limitada. Posso enviar o link?", en: "Based on your profile, the Deployment LAB may be a fit: four online hours implementing AI in practice, with a participation certificate. It costs US$99 and capacity is limited. May I send the link?" } },
  ],
  human: [
    { side: "lead", text: { pt: "Antes de avançar, preciso entender como vocês tratam dados financeiros.", en: "Before moving forward, I need to understand how you handle financial data." } },
    { side: "agent", text: { pt: "Identifiquei uma dúvida sensível. Pausei a automação e encaminhei o contexto para o time.", en: "I identified a sensitive question. I paused automation and transferred the context to the team." } },
    { side: "human", text: { pt: "Olá, aqui é o Head de Vendas. Antes de falar em integração, vamos delimitar dados, acessos e um piloto seguro.", en: "Hi, this is the Head of Sales. Before discussing integration, let us define data, access and a safe pilot." } },
  ],
};

const syntheticLeads = [
  { company: "Aurum Logistics", source: "CEO Skill", score: 86, state: { pt: "Humano", en: "Human" }, next: { pt: "Revisar fit", en: "Review fit" }, owner: { pt: "Head de Vendas", en: "Head of Sales" } },
  { company: "Norte Retail", source: "CEO Skill", score: 74, state: { pt: "IA", en: "AI" }, next: { pt: "Enviar link do Lab", en: "Send Lab link" }, owner: { pt: "Agente", en: "Agent" } },
  { company: "Vale Services", source: "CEO Skill", score: 92, state: { pt: "Agendado", en: "Booked" }, next: { pt: "Conversa de fit", en: "Fit conversation" }, owner: { pt: "Co-founder", en: "Co-founder" } },
  { company: "Lumen Foods", source: "CEO Skill", score: 48, state: { pt: "Nutrição", en: "Nurture" }, next: { pt: "Participar do Lab", en: "Attend the Lab" }, owner: { pt: "Agente", en: "Agent" } },
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
    body: { pt: "Landing, formulários, aviso de contato, eventos e Stripe em modo de teste.", en: "Landing, forms, contact notice, events and Stripe in test mode." },
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
  { pt: "Skill do CEO, promessa e tutorial de instalação", en: "CEO Skill, promise and installation tutorial" },
  { pt: "Cinco campos iniciais e aviso curto ao lado do CTA", en: "Five initial fields and short notice beside the CTA" },
  { pt: "Fluxo 1:1, opção de canal e regras de handoff", en: "1:1 flow, channel option and handoff rules" },
  { pt: "Convite do Lab e cadência de follow-up", en: "Lab invitation and follow-up cadence" },
  { pt: "Campos do pré-checkout e critérios de fit humano", en: "Pre-checkout fields and human fit criteria" },
  { pt: "US$99, horários finais, reembolso, pitches e ticket", en: "US$99, final times, refund, pitches and ticket" },
];

const funnelMetrics = [
  ["01", "Visitas da Skill", "Skill visits"],
  ["02", "Formulários completos", "Completed forms"],
  ["03", "Conversas 1:1", "1:1 conversations"],
  ["04", "Skills entregues", "Skills delivered"],
  ["05", "Pré-checkouts", "Pre-checkouts"],
  ["06", "Ingressos pagos", "Paid tickets"],
  ["07", "Fits revisados", "Reviewed fits"],
  ["08", "Reuniões high-ticket", "High-ticket meetings"],
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
          <span className="wf-prototype-chip">{language === "pt" ? "Revisão final · PT/EN" : "Final review · PT/EN"}</span>
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
            <h1>{language === "pt" ? "Da Skill do CEO ao cliente certo." : "From the CEO Skill to the right customer."}</h1>
            <p className="wf-lead">
              {language === "pt"
                ? "Um sistema visual de captação, entrega, venda do Lab e qualificação para projetos de US$3k, US$5k e US$7k por mês."
                : "A visual system for acquisition, delivery, Lab sales and qualification into US$3k, US$5k and US$7k monthly engagements."}
            </p>
            <div className="wf-hero-actions">
              <a className="wf-primary" href="#flow">{language === "pt" ? "Explorar o fluxo" : "Explore the flow"}</a>
              <a className="wf-secondary" href="#approval">{language === "pt" ? "Ver decisões" : "See decisions"}</a>
            </div>
          </div>
          <div className="wf-hero-visual story">
            {/* The static asset is intentionally unoptimized because this app runs on vinext/Workers. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/deployment-lab-instagram-story.png"
              alt={language === "pt" ? "Story promocional do Deployment LAB" : "Promotional Instagram Story for the Deployment LAB"}
              width={944}
              height={1672}
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
          <h2 id="thesis-title">{language === "pt" ? "A Skill abre a conversa. O Lab prova o método. O fit define a próxima rota." : "The Skill opens the conversation. The Lab proves the method. Fit defines the next route."}</h2>
          <div className="wf-thesis-copy">
            <p>{language === "pt" ? "O US$99 fecha direto. Não existe reunião obrigatória, score secreto ou barreira para receber o conteúdo comprado." : "The US$99 offer closes directly. There is no mandatory meeting, secret score or barrier to receiving the purchased content."}</p>
            <p>{language === "pt" ? "A automação organiza sinais e entrega contexto. Head de Vendas ou co-founder decide agenda, escopo, proposta e preço dos serviços maiores." : "Automation organizes signals and transfers context. Head of Sales or a co-founder decides calendar, scope, proposal and price for larger engagements."}</p>
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
          <div className="wf-route-start"><span>ONE SYSTEM · THREE ROUTES</span><strong>{language === "pt" ? "A entrada é única. O pagamento de US$99 é direto. Serviços maiores exigem conversa e decisão humana." : "The entry is shared. The US$99 payment is direct. Larger services require a conversation and human decision."}</strong></div>
          <article>
            <span className="wf-route-letter">A</span>
            <div><p className="wf-eyebrow">Acquisition · Free asset</p><h3>CEO Skill</h3><p>{language === "pt" ? "Micro-site → formulário curto → WhatsApp 1:1 → skill + tutorial no privado → convite pessoal para o Lab." : "Micro-site → short form → 1:1 WhatsApp → private skill + tutorial → personal Lab invitation."}</p></div>
            <small>{language === "pt" ? "Grupo/canal é opcional e separado" : "Group/channel is optional and separate"}</small>
          </article>
          <article>
            <span className="wf-route-letter">B</span>
            <div><p className="wf-eyebrow">US$99 · Direct checkout</p><h3>Deployment LAB</h3><p>{language === "pt" ? "Pré-checkout → Stripe → pagamento confirmado → ingresso digital → 4 horas de imersão online em 15 de agosto." : "Pre-checkout → Stripe → confirmed payment → digital pass → 4-hour online immersion on August 15."}</p></div>
            <small>{language === "pt" ? "09h–13h SF · 13h–17h Brasil · capacidade limitada" : "9am–1pm SF · 1pm–5pm Brazil · limited capacity"}</small>
          </article>
          <article>
            <span className="wf-route-letter">C</span>
            <div><p className="wf-eyebrow">US$3k · US$5k · US$7k / month</p><h3>{language === "pt" ? "Implementação e acompanhamento" : "Implementation and advisory"}</h3><p>{language === "pt" ? "Sinal de fit → revisão humana → Calendly → conversa → escopo/acordo → pagamento. No evento, a CTA é solicitar conversa de encaixe." : "Fit signal → human review → Calendly → conversation → scope/agreement → payment. At the event, the CTA is to request a fit conversation."}</p></div>
            <small>{language === "pt" ? "Head de Vendas ou co-founder fecha" : "Head of Sales or co-founder closes"}</small>
          </article>
        </div>
      </section>

      <section className="wf-section wf-acquisition" aria-labelledby="acquisition-title">
        <div className="wf-section-label">03 · {language === "pt" ? "Entrada única" : "Single entry"}</div>
        <div className="wf-section-heading">
          <div>
            <p className="wf-eyebrow">{language === "pt" ? "Captação por utilidade real" : "Acquisition through real utility"}</p>
            <h2 id="acquisition-title">{language === "pt" ? "A Skill do CEO é a porta de entrada." : "The CEO Skill is the entry point."}</h2>
          </div>
          <p>{language === "pt" ? "A promessa precisa ser concreta: instalar uma ferramenta que ajuda o líder a mapear prioridades, decisões e oportunidades de IA — antes de qualquer venda." : "The promise must be concrete: install a tool that helps the leader map priorities, decisions and AI opportunities — before any sale."}</p>
        </div>
        <div className="wf-three-cards">
          <article><span className="wf-big-icon">01</span><p className="wf-eyebrow">Promise</p><h3>{language === "pt" ? "Diagnosticar melhor" : "Diagnose better"}</h3><p>{language === "pt" ? "A Skill organiza contexto, prioridades e perguntas para o CEO encontrar onde a IA pode reduzir fricção operacional." : "The Skill organizes context, priorities and questions so a CEO can find where AI may reduce operational friction."}</p><small>{language === "pt" ? "Sem promessa de ROI" : "No ROI promise"}</small></article>
          <article><span className="wf-big-icon">02</span><p className="wf-eyebrow">Delivery</p><h3>{language === "pt" ? "Instalar e usar" : "Install and use"}</h3><p>{language === "pt" ? "Após o formulário, a pessoa inicia o WhatsApp 1:1 e recebe a Skill, o tutorial e suporte de onboarding no privado." : "After the form, the person starts a 1:1 WhatsApp chat and receives the Skill, tutorial and private onboarding support."}</p><small>{language === "pt" ? "Entrega antes da oferta" : "Delivery before the offer"}</small></article>
          <article><span className="wf-big-icon">03</span><p className="wf-eyebrow">Conversion</p><h3>Deployment LAB</h3><p>{language === "pt" ? "Depois de entregar valor, o agente conecta o problema ao evento de US$99: 4 horas implementando IA na prática, com certificado de participação." : "After delivering value, the agent connects the problem to the US$99 event: 4 hours implementing AI in practice, with a certificate of participation."}</p><small>15 Aug · 09:00 SF · 13:00 BR · Limited capacity</small></article>
        </div>
      </section>

      <section className="wf-section wf-registration" aria-labelledby="registration-title">
        <div className="wf-section-label">04 · {language === "pt" ? "Dados e conversão" : "Data and conversion"}</div>
        <div className="wf-section-heading">
          <div>
            <p className="wf-eyebrow">Two forms · Two moments</p>
            <h2 id="registration-title">{language === "pt" ? "Primeiro, só o necessário. Depois, o contexto do Lab." : "First, only what is necessary. Then, the Lab context."}</h2>
          </div>
          <p>{language === "pt" ? "O primeiro formulário libera a entrega. O segundo prepara a experiência e cria sinais opcionais para uma futura conversa comercial." : "The first form unlocks delivery. The second prepares the experience and creates optional signals for a future commercial conversation."}</p>
        </div>
        <div className="wf-form-flow">
          <article className="wf-form-card">
            <div className="wf-form-top"><span>01</span><div><p className="wf-eyebrow">CEO Skill</p><h3>{language === "pt" ? "Formulário inicial" : "Initial form"}</h3></div></div>
            <div className="wf-field-grid">
              <label><span>{language === "pt" ? "Nome" : "Name"}</span><i>{language === "pt" ? "Seu nome" : "Your name"}</i></label>
              <label><span>{language === "pt" ? "E-mail profissional" : "Work email"}</span><i>name@company.com</i></label>
              <label><span>{language === "pt" ? "Empresa" : "Company"}</span><i>{language === "pt" ? "Nome da empresa" : "Company name"}</i></label>
              <label><span>{language === "pt" ? "Tamanho da empresa" : "Company size"}</span><i>1–10 · 11–50 · 51–200 · 201+</i></label>
              <label className="full"><span>{language === "pt" ? "Qual problema mais limita sua operação hoje?" : "What problem limits your operation most today?"}</span><i>{language === "pt" ? "Resposta curta" : "Short answer"}</i></label>
            </div>
            <button type="button">{language === "pt" ? "Continuar no WhatsApp →" : "Continue on WhatsApp →"}</button>
            <small>{language === "pt" ? "Ao continuar, você inicia uma conversa 1:1 com o assistente automatizado da Deployment.co para receber a Skill e suporte. Atendimento humano e saída disponíveis. Canal de avisos é opcional." : "By continuing, you start a 1:1 conversation with Deployment.co’s automated assistant to receive the Skill and support. Human help and opt-out are available. The announcement channel is optional."}</small>
          </article>

          <div className="wf-form-arrow" aria-hidden="true"><span>WhatsApp 1:1</span><b>→</b><small>{language === "pt" ? "Skill entregue · convite aceito" : "Skill delivered · invite accepted"}</small></div>

          <article className="wf-form-card accent">
            <div className="wf-form-top"><span>02</span><div><p className="wf-eyebrow">Deployment LAB</p><h3>{language === "pt" ? "Pré-checkout" : "Pre-checkout"}</h3></div></div>
            <div className="wf-field-grid">
              <label className="full"><span>{language === "pt" ? "O que você quer aprender ou implementar?" : "What do you want to learn or implement?"}</span><i>{language === "pt" ? "Objetivo para o Lab" : "Goal for the Lab"}</i></label>
              <label className="full"><span>{language === "pt" ? "Qual é sua maior dificuldade atual?" : "What is your biggest current challenge?"}</span><i>{language === "pt" ? "Resposta curta" : "Short answer"}</i></label>
              <label><span>{language === "pt" ? "Seu perfil" : "Your role"}</span><i>{language === "pt" ? "Sócio · Executivo · Colaborador" : "Founder · Executive · Employee"}</i></label>
              <label><span>{language === "pt" ? "Participa da decisão?" : "Decision role?"}</span><i>{language === "pt" ? "Sim · Com outras pessoas · Não" : "Yes · With others · No"}</i></label>
              <label><span>{language === "pt" ? "Porte (opcional)" : "Size (optional)"}</span><i>1–10 · 11–50 · 51–200 · 201+</i></label>
              <label><span>{language === "pt" ? "Faturamento (opcional)" : "Revenue (optional)"}</span><i>{language === "pt" ? "Faixa anual" : "Annual band"}</i></label>
            </div>
            <button type="button">{language === "pt" ? "Ir para o checkout de US$99 →" : "Go to the US$99 checkout →"}</button>
            <small>{language === "pt" ? "Esses sinais não bloqueiam o ingresso. Eles ajudam a adaptar o Lab e podem sugerir uma conversa futura, sempre revisada por uma pessoa." : "These signals do not gate the ticket. They help tailor the Lab and may suggest a future conversation, always reviewed by a person."}</small>
          </article>
        </div>

        <div className="wf-ticket-panel wf-story-panel">
          <div className="wf-ticket-copy">
            <p className="wf-eyebrow">Instagram Story · 9:16</p>
            <h3>{language === "pt" ? "A peça pública vende a experiência — sem exibir o preço." : "The public creative sells the experience — without displaying the price."}</h3>
            <p>{language === "pt" ? "O Story apresenta o Deployment LAB como uma imersão online de quatro horas para implementar IA na prática, com certificado de participação e capacidade limitada. O valor continua na página de inscrição e no checkout." : "The Story presents the Deployment LAB as a four-hour online immersion to implement AI in practice, with a participation certificate and limited capacity. Pricing remains on the registration page and checkout."}</p>
            <div className="wf-ticket-facts"><span>15 AUG 2026</span><span>09:00–13:00 PDT</span><span>13:00–17:00 BRT</span><span>4 HOURS</span><span>CERTIFICATE INCLUDED</span><span>LIMITED CAPACITY</span></div>
            <a href="/deployment-lab-instagram-story.png" download>{language === "pt" ? "Baixar Story para Instagram ↧" : "Download Instagram Story ↧"}</a>
          </div>
          <div className="wf-ticket-image wf-story-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/deployment-lab-instagram-story.png" alt={language === "pt" ? "Story vintage do Deployment LAB com a Golden Gate Bridge" : "Vintage Deployment LAB Story with the Golden Gate Bridge"} width={944} height={1672} />
          </div>
        </div>
      </section>

      <section className="wf-section wf-demo" aria-labelledby="demo-title">
        <div className="wf-section-label">05 · {language === "pt" ? "Demonstração" : "Demonstration"}</div>
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
              <div><strong>Deployment.co</strong><small>{conversationMode === "ai" ? (language === "pt" ? "Assistente automatizado · protótipo" : "Automated assistant · prototype") : (language === "pt" ? "Head de Vendas assumiu · IA pausada" : "Head of Sales joined · AI paused")}</small></div>
              <span className={`wf-live-dot ${conversationMode}`} />
            </div>
            <div className="wf-chat">
              {messages[conversationMode].map((message, index) => (
                <div key={`${conversationMode}-${index}`} className={`wf-bubble ${message.side}`}>{t(message.text)}</div>
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
              <div><dt>{language === "pt" ? "Próxima ação" : "Next action"}</dt><dd>{conversationMode === "ai" ? (language === "pt" ? "Enviar link do Lab" : "Send Lab link") : (language === "pt" ? "Revisão de segurança" : "Security review")}</dd></div>
              <div><dt>Owner · SLA</dt><dd>{conversationMode === "ai" ? "Agent · instant" : (language === "pt" ? "Head de Vendas · 15 min" : "Head of Sales · 15 min")}</dd></div>
            </dl>
            <div className="wf-confidence"><span>{language === "pt" ? "Confiança do agente" : "Agent confidence"}</span><div><i style={{ width: conversationMode === "ai" ? "82%" : "38%" }} /></div><strong>{conversationMode === "ai" ? "82%" : "38%"}</strong></div>
            <button className={`wf-takeover ${conversationMode === "human" ? "paused" : ""}`} onClick={() => setConversationMode(conversationMode === "ai" ? "human" : "ai")}>
              {conversationMode === "ai" ? (language === "pt" ? "Pausar IA e assumir" : "Pause AI and take over") : (language === "pt" ? "Devolver à IA com aprovação" : "Return to AI with approval")}
            </button>
            <small>{language === "pt" ? "Ação apenas visual. Nenhum sistema externo é alterado." : "Visual action only. No external system is changed."}</small>
          </aside>
        </div>
      </section>

      <section className="wf-section wf-offers" aria-labelledby="offers-title">
        <div className="wf-section-label">06 · {language === "pt" ? "Esteira e pitches" : "Offer ladder and pitches"}</div>
        <div className="wf-section-heading">
          <div><p className="wf-eyebrow">US$99 → fit conversation → engagement</p><h2 id="offers-title">{language === "pt" ? "Dois momentos de pitch. Uma única CTA." : "Two pitch moments. One CTA."}</h2></div>
          <p>{language === "pt" ? "O pitch não interrompe a entrega nem condiciona o ingresso. No evento, a pessoa apenas levanta a mão para uma conversa de encaixe; a proposta vem depois da revisão humana." : "The pitch does not interrupt delivery or condition the ticket. At the event, the participant only raises a hand for a fit conversation; the proposal comes after human review."}</p>
        </div>
        <div className="wf-pitch-timeline">
          <article className="primary">
            <span>01 · {language === "pt" ? "MEIO DO EVENTO" : "MID-EVENT"}</span>
            <p className="wf-eyebrow">Private implementation · soft invitation</p>
            <h3>{language === "pt" ? "Convite para implementação privada" : "Private implementation invitation"}</h3>
            <p>{language === "pt" ? "Apresentar o custo de continuar com processos manuais, mostrar o mecanismo e convidar quem tem urgência e capacidade de execução a solicitar uma conversa." : "Frame the cost of remaining manual, show the mechanism and invite those with urgency and implementation capacity to request a conversation."}</p>
            <div className="wf-offer-price"><strong>US$7k<span>/month</span></strong><small>{language === "pt" ? "implementação gerenciada · acompanhamento semanal + WhatsApp" : "managed implementation · weekly support + WhatsApp"}</small></div>
            <div className="wf-offer-price secondary"><strong>US$5k<span>/month</span></strong><small>{language === "pt" ? "rota privada · uma sessão mensal + escopo acordado" : "private route · one monthly session + agreed scope"}</small></div>
            <b>{language === "pt" ? "CTA: solicitar conversa de encaixe" : "CTA: request a fit conversation"}</b>
          </article>
          <article>
            <span>02 · {language === "pt" ? "FINAL DO EVENTO" : "END OF EVENT"}</span>
            <p className="wf-eyebrow">Group route · final invitation</p>
            <h3>{language === "pt" ? "Rota de implementação em grupo" : "Group implementation route"}</h3>
            <p>{language === "pt" ? "Para quem quer acompanhamento, mas não precisa da rota privada. A entrada depende de encaixe operacional, não de um score automático." : "For those who want support but do not need the private route. Entry depends on operational fit, not an automatic score."}</p>
            <div className="wf-offer-price"><strong>US$3k<span>/month</span></strong><small>{language === "pt" ? "grupo de até 10 empresas · acompanhamento compartilhado" : "group of up to 10 companies · shared support"}</small></div>
            <b>{language === "pt" ? "CTA: a mesma conversa de encaixe" : "CTA: the same fit conversation"}</b>
          </article>
        </div>
        <div className="wf-close-flow" aria-label={language === "pt" ? "Fluxo de fechamento high-ticket" : "High-ticket close flow"}>
          <span>{language === "pt" ? "Interesse" : "Interest"}</span><b>→</b><span>{language === "pt" ? "Revisão humana" : "Human review"}</span><b>→</b><span>Calendly</span><b>→</b><span>{language === "pt" ? "Conversa de fit" : "Fit conversation"}</span><b>→</b><span>{language === "pt" ? "Escopo + acordo" : "Scope + agreement"}</span><b>→</b><span>Stripe</span>
        </div>
      </section>

      <section className="wf-section wf-architecture" aria-labelledby="architecture-title">
        <div className="wf-section-label">07 · {language === "pt" ? "Arquitetura" : "Architecture"}</div>
        <div className="wf-section-heading">
          <div><p className="wf-eyebrow">{language === "pt" ? "Camadas independentes" : "Independent layers"}</p><h2 id="architecture-title">{language === "pt" ? "Trocar ferramentas sem perder o processo." : "Change tools without losing the process."}</h2></div>
          <p>{language === "pt" ? "O banco guarda o estado; integrações entram por adaptadores; toda mudança crítica gera evento e trilha." : "The database holds state; integrations enter through adapters; every critical change creates an event and trail."}</p>
        </div>
        <div className="wf-system-map">
          <div className="wf-map-row edge">
            <div><span>▣</span><strong>CEO Skill micro-site</strong><small>Short form · Source · Notice</small></div>
            <b>→</b>
            <div><span>◉</span><strong>Meta WhatsApp</strong><small>Cloud API · Webhooks</small></div>
            <b>→</b>
            <div><span>◇</span><strong>Agent Orchestrator</strong><small>Policy · Score · Handoff</small></div>
          </div>
          <div className="wf-map-core">
            <span className="wf-core-label">SYSTEM OF RECORD</span>
            <div><span>▦</span><strong>Supabase</strong><small>Leads · Messages · Preferences · Events</small></div>
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
        <div className="wf-section-label">08 · {language === "pt" ? "Painel de controle" : "Control dashboard"}</div>
        <div className="wf-section-heading">
          <div><p className="wf-eyebrow">{language === "pt" ? "Dados 100% sintéticos" : "100% synthetic data"}</p><h2 id="dashboard-title">{language === "pt" ? "O dono vê o que a IA está fazendo." : "The owner sees what AI is doing."}</h2></div>
          <p>{language === "pt" ? "A fila responde quatro perguntas: quem entrou, por quê, quem controla e qual é a próxima ação." : "The queue answers four questions: who entered, why, who controls it and what happens next."}</p>
        </div>
        <div className="wf-dashboard-shell">
          <div className="wf-dashboard-nav"><strong>Deployment<span>.co</span></strong><span>{language === "pt" ? "Pipeline ao vivo · conceito" : "Live pipeline · concept"}</span><button>{language === "pt" ? "Exportar relatório" : "Export report"}</button></div>
          <div className="wf-dashboard-controls">
            <span>✓ {language === "pt" ? "Contato solicitado" : "Contact requested"}</span>
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
              <tbody>{syntheticLeads.map((lead) => <tr key={lead.company}><td><strong>{lead.company}</strong><small>{language === "pt" ? "empresa fictícia" : "fictional company"}</small></td><td>{lead.source}</td><td><span className={`wf-score score-${lead.score >= 80 ? "high" : lead.score >= 60 ? "mid" : "low"}`}>{lead.score}</span></td><td><span className="wf-status">{t(lead.state)}</span></td><td>{t(lead.next)}</td><td>{t(lead.owner)}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="wf-section wf-evidence" aria-labelledby="evidence-title">
        <div className="wf-section-label">09 · {language === "pt" ? "Prova e linguagem" : "Proof and language"}</div>
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
        <div className="wf-section-label">10 · {language === "pt" ? "Medição" : "Measurement"}</div>
        <div className="wf-section-heading">
          <div><p className="wf-eyebrow">{language === "pt" ? "Uma equação operacional" : "One operating equation"}</p><h2 id="metrics-title">{language === "pt" ? "Receita é consequência de oito conversões observáveis." : "Revenue is the consequence of eight observable conversions."}</h2></div>
          <p>{language === "pt" ? "As taxas ainda não são resultados. O piloto cria a primeira linha de base confiável." : "The rates are not results yet. The pilot creates the first reliable baseline."}</p>
        </div>
        <div className="wf-metric-chain">
          {funnelMetrics.map((metric, index) => <div key={metric[0]}><span>{metric[0]}</span><strong>{language === "pt" ? metric[1] : metric[2]}</strong>{index < funnelMetrics.length - 1 && <b>×</b>}</div>)}
        </div>
        <div className="wf-metric-callout"><span>North Star</span><strong>{language === "pt" ? "Receita confirmada por origem ÷ custo total do sistema" : "Confirmed revenue by source ÷ total system cost"}</strong><small>{language === "pt" ? "Com qualidade: opt-out, intervenção, erro e tempo humano ao lado da receita." : "With quality: opt-out, intervention, error and human time next to revenue."}</small></div>
      </section>

      <section className="wf-section wf-roadmap" aria-labelledby="roadmap-title">
        <div className="wf-section-label">11 · {language === "pt" ? "Plano de implementação" : "Implementation plan"}</div>
        <div className="wf-section-heading">
          <div><p className="wf-eyebrow">{language === "pt" ? "Seis gates reversíveis" : "Six reversible gates"}</p><h2 id="roadmap-title">{language === "pt" ? "Construir do controle para a automação." : "Build from control toward automation."}</h2></div>
          <p>{language === "pt" ? "A fase seguinte só abre quando o critério de saída anterior estiver comprovado." : "The next phase opens only after the previous exit criterion is proven."}</p>
        </div>
        <div className="wf-phase-list">
          {phases.map((phase) => <article key={phase.n}><span>{phase.n}</span><div><h3>{t(phase.title)}</h3><p>{t(phase.body)}</p></div><small><b>EXIT</b>{t(phase.exit)}</small></article>)}
        </div>
      </section>

      <section className="wf-section wf-risks" aria-labelledby="risk-title">
        <div className="wf-section-label">12 · {language === "pt" ? "Controles" : "Controls"}</div>
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
        <div className="wf-section-label">13 · {language === "pt" ? "Decisão dos sócios" : "Partner decision"}</div>
        <div className="wf-approval-grid">
          <div>
            <p className="wf-eyebrow">Iago + Hanz · {language === "pt" ? "pacote de revisão" : "review pack"}</p>
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
        <div className="wf-section-label">14 · {language === "pt" ? "Fronteira da demonstração" : "Demo boundary"}</div>
        <div className="wf-boundary-grid">
          <div><span>PROVES</span><h3>{language === "pt" ? "O que este protótipo prova" : "What this prototype proves"}</h3><ul><li>{language === "pt" ? "Fluxo compreensível de ponta a ponta" : "Comprehensible end-to-end flow"}</li><li>{language === "pt" ? "Responsabilidade de IA e humano separada" : "Separated AI and human responsibility"}</li><li>{language === "pt" ? "Arquitetura e gates implementáveis" : "Implementable architecture and gates"}</li><li>{language === "pt" ? "Métricas definidas antes do piloto" : "Metrics defined before the pilot"}</li></ul></div>
          <div><span>DOES NOT PROVE</span><h3>{language === "pt" ? "O que ainda precisa de evidência" : "What still needs evidence"}</h3><ul><li>{language === "pt" ? "Conversão, receita ou ROI" : "Conversion, revenue or ROI"}</li><li>{language === "pt" ? "Aprovação da Meta ou contas conectadas" : "Meta approval or connected accounts"}</li><li>{language === "pt" ? "Segurança de produção e conformidade jurídica" : "Production security and legal compliance"}</li><li>{language === "pt" ? "Capacidade de operar em escala" : "Ability to operate at scale"}</li></ul></div>
        </div>
      </section>

      <footer className="wf-footer">
        <div><Link className="wf-brand" href="/">Deployment<span>.co</span></Link><p>{language === "pt" ? "Deployment LAB Revenue Journey · Revisão PT/EN" : "Deployment LAB Revenue Journey · PT/EN review"}</p></div>
        <div className="wf-sources">
          <span>{language === "pt" ? "Referências técnicas oficiais" : "Official technical references"}</span>
          <a href="https://www.postman.com/meta/whatsapp-business-platform/documentation/wlk6lh4/whatsapp-cloud-api" target="_blank" rel="noreferrer">Meta WhatsApp Cloud API ↗</a>
          <a href="https://supabase.com/docs/guides/database/postgres/row-level-security" target="_blank" rel="noreferrer">Supabase RLS ↗</a>
          <a href="https://docs.stripe.com/checkout/fulfillment" target="_blank" rel="noreferrer">Stripe Checkout ↗</a>
          <a href="https://developer.calendly.com/getting-started" target="_blank" rel="noreferrer">Calendly API ↗</a>
          <a href="https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes" target="_blank" rel="noreferrer">ANPD ↗</a>
        </div>
        <small>Concept v2.0 · 01 Aug 2026 · {language === "pt" ? "Não é um sistema em produção" : "Not a production system"}</small>
      </footer>
    </main>
  );
}
