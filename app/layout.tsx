import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/layout/Navbar";

export const metadata: Metadata = {
  title: "OpenMP Analyzer",
  description: "Ferramenta de análise OpenMP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}