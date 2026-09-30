import React from 'react';
import { Smartphone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <div className="text-brand-500">
              <Smartphone size={24} />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-white">
              Hospeda<span className="text-brand-500">Fácil</span>
            </span>
          </div>

          <div className="text-sm">
            <p>A ferramenta que centraliza a experiência do hóspede.</p>
          </div>

          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} HospedaFácil. Todos os direitos reservados.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
