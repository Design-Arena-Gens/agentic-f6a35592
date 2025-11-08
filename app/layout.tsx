import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multibagger Stock Analyzer - Identify High-Potential Indian Stocks",
  description: "AI-driven platform for analyzing and identifying potential multibagger Indian companies with comprehensive financial metrics and risk assessment",
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
