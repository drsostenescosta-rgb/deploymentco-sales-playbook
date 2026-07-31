import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deployment.co — Sales Playbook and Scale Thesis",
  description:
    "The product ladder, sales volume engine, and operating path to US$101k in modeled monthly recurring revenue.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
