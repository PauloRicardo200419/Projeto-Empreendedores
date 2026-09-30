"use client";

import React, { useState, useEffect } from 'react';
import { Smartphone, Menu, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow-md">
              <Smartphone size={18} />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">
              Hospeda<span className="text-brand-600">Fácil</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors">Benefícios</a>
            <a href="#guest-experience" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors">Como Funciona</a>
            <div className="h-4 w-px bg-slate-200"></div>
            <Button size="sm" onClick={() => document.getElementById('acesso')?.scrollIntoView({ behavior: 'smooth' })}>
              Solicitar Acesso
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl p-4 flex flex-col gap-4">
          <a href="#beneficios" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-slate-700 p-2">Benefícios</a>
          <a href="#guest-experience" onClick={() => setMobileMenuOpen(false)} className="font-semibold text-slate-700 p-2">Como Funciona</a>
          <Button className="w-full" onClick={() => { setMobileMenuOpen(false); document.getElementById('acesso')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Solicitar Acesso
          </Button>
        </div>
      )}
    </header>
  );
}
