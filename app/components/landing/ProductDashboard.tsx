"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Settings, Home, Bell, MapPin, Search } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export function ProductDashboard() {
  const [activeMenu, setActiveMenu] = useState<'visao_geral' | 'propriedades' | 'guias' | 'avaliacoes'>('visao_geral');
  const [operationType, setOperationType] = useState<'1' | 'algumas' | 'varias'>('1');

  // Dynamic mock data based on operation type
  const metrics = {
    '1': { properties: 1, views: 42, rating: '5.0' },
    'algumas': { properties: 4, views: 184, rating: '4.9' },
    'varias': { properties: 15, views: 890, rating: '4.8' },
  };

  return (
    <Section className="bg-slate-900 text-white overflow-hidden py-24 md:py-32">
      <Container>
        
        {/* Customizer */}
        <div className="flex flex-col items-center justify-center mb-16 relative z-20">
          <span className="text-brand-400 font-bold text-sm uppercase tracking-wider mb-4">Interativo</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-8 tracking-tight text-center">
            Uma visão mais organizada da sua operação.
          </h2>
          
          <div className="bg-slate-800/50 backdrop-blur-md p-2 rounded-2xl border border-slate-700 flex flex-wrap justify-center gap-2 max-w-2xl">
             <button 
               onClick={() => setOperationType('1')}
               className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${operationType === '1' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
             >
               🏠 1 propriedade
             </button>
             <button 
               onClick={() => setOperationType('algumas')}
               className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${operationType === 'algumas' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
             >
               🏘 Algumas propriedades
             </button>
             <button 
               onClick={() => setOperationType('varias')}
               className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${operationType === 'varias' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
             >
               🏢 Várias propriedades
             </button>
          </div>
        </div>

        {/* Dashboard Mockup */}
        <motion.div 
          layout
          className="relative max-w-5xl mx-auto"
        >
          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand-500/20 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative bg-[#0B1120] border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px] md:h-[500px]">
            
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-[#0F172A] border-r border-slate-800 p-4 flex flex-row md:flex-col overflow-x-auto md:overflow-visible shrink-0 gap-2 md:gap-0">
              <div className="hidden md:flex items-center gap-2 mb-8 px-2 text-white">
                 <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-sm">H</div>
                 <span className="font-heading font-bold text-lg">HospedaFácil</span>
              </div>

              <nav className="flex md:flex-col gap-2 flex-1 w-full">
                 <button onClick={() => setActiveMenu('visao_geral')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeMenu === 'visao_geral' ? 'bg-brand-600/10 text-brand-400' : 'text-slate-400 hover:text-white'}`}>
                   <LayoutDashboard size={18} /> Visão Geral
                 </button>
                 <button onClick={() => setActiveMenu('propriedades')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeMenu === 'propriedades' ? 'bg-brand-600/10 text-brand-400' : 'text-slate-400 hover:text-white'}`}>
                   <Home size={18} /> Propriedades
                 </button>
                 <button onClick={() => setActiveMenu('guias')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeMenu === 'guias' ? 'bg-brand-600/10 text-brand-400' : 'text-slate-400 hover:text-white'}`}>
                   <MapPin size={18} /> Módulos do Guia
                 </button>
                 <button onClick={() => setActiveMenu('avaliacoes')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeMenu === 'avaliacoes' ? 'bg-brand-600/10 text-brand-400' : 'text-slate-400 hover:text-white'}`}>
                   <Users size={18} /> Avaliações
                 </button>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 lg:p-10 flex flex-col bg-slate-950/50 overflow-y-auto">
              
              <AnimatePresence mode="wait">
                
                {/* VISÃO GERAL */}
                {activeMenu === 'visao_geral' && (
                  <motion.div key="visao_geral" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-bold text-white">Visão Geral</h3>
                      <div className="flex items-center gap-4">
                        <Bell size={20} className="text-slate-400" />
                        <div className="w-8 h-8 rounded-full bg-slate-800"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
                        <p className="text-sm text-slate-400 mb-1">Hóspedes Ativos</p>
                        <p className="text-2xl font-bold text-white">{operationType === '1' ? '2' : operationType === 'algumas' ? '12' : '45'}</p>
                      </div>
                      <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
                        <p className="text-sm text-slate-400 mb-1">Uso do Guia</p>
                        <p className="text-2xl font-bold text-brand-400">98%</p>
                      </div>
                      <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
                        <p className="text-sm text-slate-400 mb-1">Avaliação Média</p>
                        <p className="text-2xl font-bold text-amber-400 flex items-center gap-2">{metrics[operationType].rating} <span className="text-sm text-amber-400/50">★</span></p>
                      </div>
                    </div>

                    <div className="bg-[#0F172A] rounded-xl border border-slate-800 flex-1 p-5 flex flex-col justify-end">
                       <h4 className="text-slate-300 font-semibold mb-4 text-sm">Acessos ao Guia nos últimos 7 dias</h4>
                       <div className="flex items-end gap-3 h-32 md:h-full w-full">
                         {[40, 65, 45, 80, 55, 90, 100].map((height, i) => (
                           <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full">
                             <div className="w-full h-full bg-slate-800/50 rounded-t-sm relative overflow-hidden">
                               <div 
                                 className="absolute bottom-0 w-full bg-brand-500 rounded-t-sm transition-all duration-500 group-hover:bg-brand-400"
                                 style={{ height: `${height}%` }}
                               ></div>
                             </div>
                             <span className="text-[10px] text-slate-500 font-medium">
                               {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}
                             </span>
                           </div>
                         ))}
                       </div>
                    </div>
                  </motion.div>
                )}

                {/* PROPRIEDADES */}
                {activeMenu === 'propriedades' && (
                  <motion.div key="propriedades" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white">Minhas Propriedades ({metrics[operationType].properties})</h3>
                      <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-bold">+ Nova</button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-blue-900/30 text-blue-400 flex items-center justify-center"><Home size={20} /></div>
                          <div>
                            <p className="font-semibold text-white">Casa Brisa do Mar</p>
                            <p className="text-sm text-slate-400">Guia 100% preenchido</p>
                          </div>
                        </div>
                        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">Ativo</span>
                      </div>
                      
                      {operationType !== '1' && (
                        <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-900/30 text-purple-400 flex items-center justify-center"><Home size={20} /></div>
                            <div>
                              <p className="font-semibold text-white">Apartamento Central</p>
                              <p className="text-sm text-slate-400">Faltam regras locais</p>
                            </div>
                          </div>
                          <span className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">Pendente</span>
                        </div>
                      )}

                      {operationType === 'varias' && (
                        <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-800/50 hover:border-slate-700 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-emerald-900/30 text-emerald-400 flex items-center justify-center"><Home size={20} /></div>
                            <div>
                              <p className="font-semibold text-white">Chalé da Serra</p>
                              <p className="text-sm text-slate-400">Guia 100% preenchido</p>
                            </div>
                          </div>
                          <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">Ativo</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* GUIAS */}
                {activeMenu === 'guias' && (
                  <motion.div key="guias" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h3 className="text-xl font-bold text-white mb-6">Módulos do Guia Digital</h3>
                    <div className="grid grid-cols-2 gap-4">
                       {['Wi-Fi', 'Check-in Explicativo', 'Regras da Casa', 'Guia Local', 'Equipamentos', 'Checkout'].map(mod => (
                         <div key={mod} className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                           <div className="w-5 h-5 rounded-md bg-brand-500 flex items-center justify-center text-white">✓</div>
                           <span className="text-slate-300 font-medium">{mod}</span>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                )}

                {/* AVALIAÇÕES */}
                {activeMenu === 'avaliacoes' && (
                  <motion.div key="avaliacoes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h3 className="text-xl font-bold text-white mb-6">Feedback sobre o Guia</h3>
                    <div className="space-y-4">
                      <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 relative">
                        <div className="flex text-amber-400 mb-2 text-sm">★★★★★</div>
                        <p className="text-slate-300 italic mb-2">"Muito mais fácil encontrar todas as informações no celular do que ficar chamando no WhatsApp. O guia de restaurantes salvou a nossa noite!"</p>
                        <p className="text-xs text-slate-500">— Hóspede Demonstrativo</p>
                      </div>
                      <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 relative">
                        <div className="flex text-amber-400 mb-2 text-sm">★★★★★</div>
                        <p className="text-slate-300 italic mb-2">"Adorei não ter que instalar nenhum app, só abrir o link e a senha do Wi-Fi já estava lá na cara."</p>
                        <p className="text-xs text-slate-500">— Hóspede Demonstrativo</p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          </div>
        </motion.div>

        <div className="mt-16 text-center">
           <a href="#acesso" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-brand-500/25 transition-all hover:scale-105">
             Quero organizar minha hospedagem
           </a>
        </div>

      </Container>
    </Section>
  );
}
