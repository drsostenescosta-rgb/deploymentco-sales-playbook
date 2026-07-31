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
    </>
  );
}
