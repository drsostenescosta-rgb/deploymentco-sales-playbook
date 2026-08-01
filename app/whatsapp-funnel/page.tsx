import type { Metadata } from "next";
import WhatsAppFunnelBlueprint from "./WhatsAppFunnelBlueprint";
import "./whatsapp-funnel.css";

export const metadata: Metadata = {
  title: "Deployment.co — WhatsApp Revenue System",
  description:
    "Protótipo visual para aprovação do funil de aquisição, qualificação, tomada humana, agendamento, pagamento e mensuração da Deployment.co.",
  openGraph: {
    title: "Deployment.co — WhatsApp Revenue System",
    description:
      "Do primeiro clique à receita: o blueprint visual do funil para aprovação.",
    images: ["/whatsapp-revenue-system.png"],
  },
};

export default function WhatsAppFunnelPage() {
  return <WhatsAppFunnelBlueprint />;
}
