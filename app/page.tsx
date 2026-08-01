import presentationHtml from "../outputs/deployco-playbook-comercial.html?raw";

const styleContent = presentationHtml.match(/<style>([\s\S]*?)<\/style>/i)?.[1];
const mainContent = presentationHtml.match(
  /<body><main>([\s\S]*?)<\/main><\/body>/i,
)?.[1];

if (!styleContent || !mainContent) {
  throw new Error("The validated presentation source could not be loaded.");
}

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      <main dangerouslySetInnerHTML={{ __html: mainContent }} />
      <a
        href="/whatsapp-funnel"
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 999,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          border: "1px solid #18251d",
          background: "#244c3b",
          color: "#fffdf5",
          fontFamily: "Arial, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "4px 4px 0 #18251d",
        }}
      >
        WhatsApp Funnel Blueprint →
      </a>
    </>
  );
}
