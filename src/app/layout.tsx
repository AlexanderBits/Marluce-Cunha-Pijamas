// Ateliê Cunha - Rebranding Version
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Ateliê Cunha | Pijamas Hospitalares Premium",
  description: "Descubra o conforto dos pijamas hospitalares Ateliê Cunha. Peças premium, personalizadas e com máxima qualidade para profissionais da saúde.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
