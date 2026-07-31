# Deployment.co Sales Playbook

Public presentation of Deployment.co's product ladder, sales pipeline, launch
strategy, and modeled path to US$101k in monthly recurring revenue.

## Live presentation

[Open the public presentation](https://deploymentco-sales-playbook.drsostenescosta.chatgpt.site)

## Revenue model

The target portfolio is:

- 10 Guided Group accounts at US$3k per month
- 10 Managed AI Ops accounts at US$5k per month
- 3 Strategic Partner accounts at US$7k per month
- 23 active accounts producing US$101k in modeled MRR

The funnel volumes and conversion rates shown in the presentation are operating
assumptions, not historical performance. They should be replaced with verified
CRM, billing, retention, margin, and delivery-capacity data after each cycle.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Validate the production build and rendered page with:

```bash
npm test
```

The presentation source is stored in
`outputs/deployco-playbook-comercial.html` and rendered by the application at
the root route.
