import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HospedaFácil — O Guia Digital Definitivo para seu Imóvel',
  description: 'Automatize a experiência do seu hóspede com um guia digital inteligente. Reduza perguntas repetitivas e valorize sua hospedagem.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="font-sans antialiased text-slate-800 bg-brand-50 overflow-x-hidden selection:bg-brand-200 selection:text-brand-900">
        {children}
      </body>
    </html>
  );
}
