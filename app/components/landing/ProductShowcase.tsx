"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Settings, Home, Bell } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export function ProductShowcase() {
  return (
    <Section className="bg-slate-900 text-white overflow-hidden py-24 md:py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center font-bold tracking-wider text-xs uppercase text-brand-400 mb-6 bg-brand-950 px-3 py-1 rounded-full border border-brand-800">
            Interface Real
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 tracking-tight">
            O controle total da sua operação.
          </h2>
          <p className="text-lg text-slate-400">
            Painel de controle intuitivo. Edite senhas, regras e guias e atualize as informações do hóspede em tempo real.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand-500/20 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative bg-[#0B1120] border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px]">
            
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-[#0F172A] border-r border-slate-800 p-4 hidden md:flex flex-col">
              <div className="flex items-center gap-2 mb-8 px-2 text-white">
                 <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-sm">H</div>
                 <span className="font-heading font-bold text-lg">HospedaFácil</span>
              </div>

              <nav className="space-y-2 flex-1">
                 <div className="flex items-center gap-3 px-3 py-2 bg-brand-600/10 text-brand-400 rounded-lg text-sm font-medium cursor-default">
                   <LayoutDashboard size={18} /> Dashboard
                 </div>
                 <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-medium transition-colors cursor-default">
                   <Home size={18} /> Propriedades
                 </div>
                 <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-medium transition-colors cursor-default">
                   <Users size={18} /> Hóspedes
                 </div>
                 <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white rounded-lg text-sm font-medium transition-colors cursor-default">
                   <Settings size={18} /> Ajustes
                 </div>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 lg:p-10 flex flex-col bg-slate-950/50">
              
              {/* Topbar */}
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white">Visão Geral</h3>
                <div className="flex items-center gap-4">
                  <Bell size={20} className="text-slate-400" />
                  <div className="w-8 h-8 rounded-full bg-slate-800"></div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
                  <p className="text-sm text-slate-400 mb-1">Propriedades Ativas</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
                  <p className="text-sm text-slate-400 mb-1">Visualizações do Guia (Mês)</p>
                  <p className="text-2xl font-bold text-brand-400">142</p>
                </div>
                <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
                  <p className="text-sm text-slate-400 mb-1">Avaliação Média</p>
                  <p className="text-2xl font-bold text-amber-400 flex items-center gap-2">4.9 <span className="text-sm text-amber-400/50">★</span></p>
                </div>
              </div>

              {/* Active Properties List */}
              <div className="bg-[#0F172A] rounded-xl border border-slate-800 flex-1 p-5">
                 <h4 className="font-semibold text-slate-200 mb-4">Meus Guias</h4>
                 
                 <div className="space-y-3">
                   <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-md bg-blue-900/30 text-blue-400 flex items-center justify-center"><Home size={18} /></div>
                       <div>
                         <p className="text-sm font-semibold text-white">Casa Brisa do Mar</p>
                         <p className="text-xs text-slate-400">Última edição há 2 dias</p>
                       </div>
                     </div>
                     <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-medium">Ativo</span>
                   </div>

                   <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-md bg-purple-900/30 text-purple-400 flex items-center justify-center"><Home size={18} /></div>
                       <div>
                         <p className="text-sm font-semibold text-white">Apto Centro SP</p>
                         <p className="text-xs text-slate-400">Última edição há 1 semana</p>
                       </div>
                     </div>
                     <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-medium">Ativo</span>
                   </div>
                 </div>
              </div>

            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
