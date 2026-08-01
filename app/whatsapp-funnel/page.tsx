import type { Metadata } from "next";
import WhatsAppFunnelBlueprint from "./WhatsAppFunnelBlueprint";
import "./whatsapp-funnel.css";

export const metadata: Metadata = {
  title: "Deployment.co — CEO Skill to Deployment LAB",
  description:
    "Blueprint visual do funil CEO Skill, WhatsApp 1:1, Deployment LAB de US$99 e qualificação humana para serviços de implementação.",
  openGraph: {
    title: "Deployment.co — CEO Skill to Deployment LAB",
    description:
      "Da Skill do CEO ao cliente certo: o blueprint visual do funil para aprovação.",
    images: ["/deployment-implementation-lab-ticket.png"],
  },
};

export default function WhatsAppFunnelPage() {
  return <WhatsAppFunnelBlueprint />;
}
