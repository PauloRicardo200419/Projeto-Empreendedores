"use client";

import React from 'react';
import { Smartphone } from 'lucide-react';
import { Container } from '../ui/Container';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow-md">
                <Smartphone size={18} />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">
                Hospeda<span className="text-brand-600">Fácil</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              O guia digital que simplifica a comunicação entre anfitriões e hóspedes. Profissionalize sua estadia.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Produto</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 transition-colors">Funcionalidades</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 transition-colors">Casos de Uso</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 transition-colors">Preços</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Empresa</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 transition-colors">Sobre Nós</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 transition-colors">Blog</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 transition-colors">Carreiras</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 transition-colors">Privacidade</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 transition-colors">Termos de Uso</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-600 transition-colors">Segurança</a></li>
            </ul>
          </div>
          
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} HospedaFácil. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-600 cursor-pointer transition-colors flex items-center justify-center text-slate-400">X</div>
             <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-600 cursor-pointer transition-colors flex items-center justify-center text-slate-400">in</div>
             <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-600 cursor-pointer transition-colors flex items-center justify-center text-slate-400">ig</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
