"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Clock, ShieldAlert, MapPin, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { AppMockup } from './AppMockup';

export function GuestExperience() {
  const [activeTab, setActiveTab] = useState<'home' | 'wifi' | 'checkin' | 'rules' | 'guide'>('home');
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = (tab: 'home' | 'wifi' | 'checkin' | 'rules' | 'guide') => {
    setActiveTab(tab);
    setHasInteracted(true);
  };

  return (
    <Section id="guest-experience" spacing="xl" className="bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative z-10 flex justify-center lg:justify-start">
            <AppMockup activeTab={activeTab} />
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left relative z-10">
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight">
              Veja a experiência pelo lado do seu hóspede.
            </h2>
            <p className="text-lg text-slate-400 mb-12">
              Clique nas opções abaixo e descubra como seus hóspedes encontram tudo o que precisam sem precisar te mandar uma única mensagem.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleInteraction('wifi')}
                className={`p-6 rounded-2xl border-2 text-left transition-all group ${
                  activeTab === 'wifi' 
                    ? 'border-brand-500 bg-brand-900/50 shadow-lg shadow-brand-500/20' 
                    : 'border-slate-800 bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <Wifi className={`mb-3 ${activeTab === 'wifi' ? 'text-brand-400' : 'text-slate-400 group-hover:text-slate-300'}`} size={24} />
                <h4 className="font-bold text-white mb-1">Wi-Fi</h4>
                <p className="text-xs text-slate-400">Senha fácil de copiar</p>
              </button>

              <button 
                onClick={() => handleInteraction('checkin')}
                className={`p-6 rounded-2xl border-2 text-left transition-all group ${
                  activeTab === 'checkin' 
                    ? 'border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-500/20' 
                    : 'border-slate-800 bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <Clock className={`mb-3 ${activeTab === 'checkin' ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-300'}`} size={24} />
                <h4 className="font-bold text-white mb-1">Check-in</h4>
                <p className="text-xs text-slate-400">Timeline de acesso</p>
              </button>

              <button 
                onClick={() => handleInteraction('rules')}
                className={`p-6 rounded-2xl border-2 text-left transition-all group ${
                  activeTab === 'rules' 
                    ? 'border-rose-500 bg-rose-900/20 shadow-lg shadow-rose-500/20' 
                    : 'border-slate-800 bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <ShieldAlert className={`mb-3 ${activeTab === 'rules' ? 'text-rose-400' : 'text-slate-400 group-hover:text-slate-300'}`} size={24} />
                <h4 className="font-bold text-white mb-1">Regras</h4>
                <p className="text-xs text-slate-400">Acordos de convivência</p>
              </button>

              <button 
                onClick={() => handleInteraction('guide')}
                className={`p-6 rounded-2xl border-2 text-left transition-all group ${
                  activeTab === 'guide' 
                    ? 'border-emerald-500 bg-emerald-900/20 shadow-lg shadow-emerald-500/20' 
                    : 'border-slate-800 bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <MapPin className={`mb-3 ${activeTab === 'guide' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'}`} size={24} />
                <h4 className="font-bold text-white mb-1">Guia Local</h4>
                <p className="text-xs text-slate-400">Restaurantes e dicas</p>
              </button>
            </div>

            {/* Interaction Reward */}
            <div className="mt-8 h-12">
              {hasInteracted && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-brand-900/50 border border-brand-800 p-3 rounded-xl inline-flex text-brand-300 text-sm font-medium"
                >
                  <CheckCircle2 size={18} />
                  <span>Você acabou de ver como seu hóspede encontra a informação sozinho.</span>
                </motion.div>
              )}
            </div>

          </div>

        </div>
      </Container>
    </Section>
  );
}
