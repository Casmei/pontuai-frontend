import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pontuaí",
  description: "Created by Tiago, Perícles and v0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
