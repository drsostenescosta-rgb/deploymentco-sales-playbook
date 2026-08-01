import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Deployment.co sales presentation", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Deployment\.co — Sales Playbook and Scale Thesis<\/title>/i);
  assert.match(html, /23 recurring sales create US\$101k in modeled MRR\./);
  assert.match(html, /4,000 registrations/);
  assert.match(html, /12 • Sales volume engine/);
  assert.match(html, /13 • Target economics/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("server-renders the interactive WhatsApp funnel approval blueprint", async () => {
  const response = await render("/whatsapp-funnel");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /CEO Skill to Deployment LAB/);
  assert.match(html, /Da Skill do CEO ao cliente certo/);
  assert.match(html, /Nenhuma mensagem enviada/);
  assert.match(html, /Head de Vendas ou co-founder/);
  assert.match(html, /Ir para o checkout de US\$99/);
  assert.match(html, /deployment-lab-instagram-story\.png/);
  assert.match(html, /Baixar Story para Instagram/);
  assert.match(html, /Iago \+ Hanz/);
  assert.match(html, /pacote de revisão/);
  assert.match(html, /09:00–13:00 PDT/);
  assert.match(html, /13:00–17:00 BRT/);
  assert.match(html, /4 horas implementando IA na prática, com certificado de participação/i);
  assert.match(html, /LIMITED CAPACITY/);
  assert.match(html, /US\$3k.*US\$5k.*US\$7k/s);
  assert.match(html, /Dados 100% sintéticos/);
  assert.match(html, /Seis definições precisam ser fechadas/);
  assert.doesNotMatch(html, /Sostenes/i);
  assert.doesNotMatch(html, /conversão garantida|ROI garantido/i);
});

test("keeps the published source explicit and free of starter content", async () => {
  const [page, layout, source, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(
      new URL("../outputs/deployco-playbook-comercial.html", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /deployco-playbook-comercial\.html\?raw/);
  assert.match(layout, /Deployment\.co — Sales Playbook and Scale Thesis/);
  assert.match(source, /23 active accounts = US\$101k MRR/);
  assert.doesNotMatch(source, /href=|V4 Company|HubSpot|Salesforce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
