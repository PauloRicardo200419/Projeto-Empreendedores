"use client";
import React from 'react';
import { Menu, X, Smartphone } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'O Problema', href: '#problema' },
    { name: 'Funcionalidades', href: '#features' },
  ];

  return (
    <nav className="fixed w-full z-50 glass-card bg-white/90 border-b border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 text-white p-2 rounded-xl shadow-lg shadow-brand-500/30">
              <Smartphone size={24} />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">
              Hospeda<span className="text-brand-600">Fácil</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#acesso"
              className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-brand-600/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              Solicitar Acesso
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-brand-100 px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-brand-50"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#acesso"
            className="block w-full text-center mt-4 bg-brand-600 text-white px-4 py-3 rounded-xl font-bold shadow-md"
            onClick={() => setIsOpen(false)}
          >
            Solicitar Acesso
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
