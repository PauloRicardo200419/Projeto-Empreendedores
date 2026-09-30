"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Copy, Check, MapPin, ShieldAlert, Navigation, Menu, Clock, Store, Coffee, ChevronRight } from 'lucide-react';

interface AppMockupProps {
  activeTab?: 'home' | 'wifi' | 'checkin' | 'rules' | 'guide';
}

export function AppMockup({ activeTab = 'home' }: AppMockupProps) {
  const [copied, setCopied] = useState(false);
  const [internalTab, setInternalTab] = useState(activeTab);

  // Sync prop changes with internal state if needed
  React.useEffect(() => {
    setInternalTab(activeTab);
  }, [activeTab]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-[340px] mx-auto md:max-w-none md:w-[360px]">
      
      {/* Floating Elements (only on home) */}
      <AnimatePresence>
        {internalTab === 'home' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [-10, 10, -10] }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute -left-12 top-20 z-20 bg-white/90 backdrop-blur-md shadow-xl border border-white/40 p-3 rounded-2xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Check size={16} strokeWidth={3} />
            </div>
            <span className="text-sm font-semibold text-slate-800">Guia acessado</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone Frame */}
      <div className="relative mx-auto border-gray-900 bg-gray-900 border-[14px] rounded-[3rem] h-[720px] w-full shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-30">
          <div className="w-28 h-6 bg-gray-900 rounded-b-3xl"></div>
        </div>

        {/* Screen Content */}
        <div className="relative h-full w-full bg-slate-50 overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="bg-brand-600 px-6 pt-12 pb-6 text-white shrink-0 relative z-10">
            <div className="flex justify-between items-center mb-6">
              {internalTab !== 'home' ? (
                <button onClick={() => setInternalTab('home')} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                   <ChevronRight size={24} className="rotate-180" />
                </button>
              ) : (
                <Menu size={24} className="text-brand-100" />
              )}
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-bold text-sm">P</div>
            </div>
            <h3 className="text-xl font-bold font-heading">
              {internalTab === 'home' && "Casa Brisa do Mar"}
              {internalTab === 'wifi' && "Conexão Wi-Fi"}
              {internalTab === 'checkin' && "Check-in"}
              {internalTab === 'rules' && "Regras da Casa"}
              {internalTab === 'guide' && "Guia Local"}
            </h3>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar relative">
            <AnimatePresence mode="wait">
              
              {/* HOME TAB */}
              {internalTab === 'home' && (
                <motion.div 
                  key="home"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <p className="text-slate-500 font-medium px-2 mb-4">Olá! Sua estadia começa hoje.</p>

                  <button onClick={() => setInternalTab('wifi')} className="w-full bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-brand-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
                        <Wifi size={24} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900">Wi-Fi</h4>
                        <p className="text-xs text-slate-500">Senha e conexão</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-500" />
                  </button>

                  <button onClick={() => setInternalTab('checkin')} className="w-full bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-brand-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <Clock size={24} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900">Check-in</h4>
                        <p className="text-xs text-slate-500">Instruções de entrada</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500" />
                  </button>

                  <button onClick={() => setInternalTab('rules')} className="w-full bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-brand-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                        <ShieldAlert size={24} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900">Regras da Casa</h4>
                        <p className="text-xs text-slate-500">Orientações gerais</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-rose-500" />
                  </button>

                  <button onClick={() => setInternalTab('guide')} className="w-full bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-brand-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                        <MapPin size={24} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900">Guia Local</h4>
                        <p className="text-xs text-slate-500">Recomendações</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-500" />
                  </button>
                </motion.div>
              )}

              {/* WIFI TAB */}
              {internalTab === 'wifi' && (
                <motion.div key="wifi" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                   <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
                     <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mx-auto mb-4">
                       <Wifi size={32} />
                     </div>
                     <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">REDE</p>
                     <p className="text-lg font-bold text-slate-900 mb-6">CasaBrisa_5G</p>
                     
                     <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">SENHA</p>
                     <div className="bg-slate-50 py-3 rounded-xl mb-6 font-mono text-lg tracking-widest text-slate-800 border border-slate-200">
                       ••••••••••••
                     </div>

                     <button 
                      onClick={handleCopy}
                      className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                        copied ? 'bg-green-100 text-green-700' : 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/20'
                      }`}
                     >
                       {copied ? (
                         <><Check size={20} /> Senha copiada ✓</>
                       ) : (
                         <><Copy size={20} /> Copiar senha</>
                       )}
                     </button>
                   </div>
                </motion.div>
              )}

              {/* CHECKIN TAB */}
              {internalTab === 'checkin' && (
                <motion.div key="checkin" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                   <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-500 before:to-slate-200">
                     
                     <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-brand-500 text-slate-50 absolute -left-[27px] shadow"></div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-brand-100 w-full ml-4">
                           <div className="flex justify-between items-center mb-1">
                             <h4 className="font-bold text-slate-900 text-sm">Check-in liberado</h4>
                             <span className="text-xs font-bold text-brand-600">14:00</span>
                           </div>
                           <p className="text-xs text-slate-500">Dirija-se até a propriedade.</p>
                        </div>
                     </div>

                     <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-brand-500 text-slate-50 absolute -left-[27px] shadow"></div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-brand-100 w-full ml-4">
                           <div className="flex justify-between items-center mb-1">
                             <h4 className="font-bold text-slate-900 text-sm">Entrada confirmada</h4>
                             <span className="text-xs font-bold text-brand-600">14:05</span>
                           </div>
                           <p className="text-xs text-slate-500">A senha da fechadura é <strong>8492</strong>.</p>
                        </div>
                     </div>

                     <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-slate-200 text-slate-50 absolute -left-[27px] shadow"></div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 w-full ml-4 opacity-50">
                           <div className="flex justify-between items-center mb-1">
                             <h4 className="font-bold text-slate-900 text-sm">Guia disponível</h4>
                             <span className="text-xs font-bold text-slate-500">Agora</span>
                           </div>
                           <p className="text-xs text-slate-500">Aproveite sua estadia!</p>
                        </div>
                     </div>

                   </div>
                </motion.div>
              )}

              {/* RULES TAB */}
              {internalTab === 'rules' && (
                <motion.div key="rules" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                   {[
                     { text: "Check-out até 11h" },
                     { text: "Não fumar nas áreas internas" },
                     { text: "Silêncio após 22h" },
                     { text: "Não realizar festas" },
                     { text: "Desligar o ar ao sair" },
                   ].map((rule, idx) => (
                     <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 cursor-pointer hover:border-brand-200 group"
                     >
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                          <Check size={14} />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{rule.text}</span>
                     </motion.div>
                   ))}
                </motion.div>
              )}

              {/* GUIDE TAB */}
              {internalTab === 'guide' && (
                <motion.div key="guide" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                   <div className="grid grid-cols-2 gap-3 mb-4">
                     <div className="bg-white p-4 rounded-2xl shadow-sm border border-brand-200 flex flex-col items-center gap-2 cursor-pointer ring-2 ring-brand-500 ring-offset-2">
                       <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                         <Coffee size={20} />
                       </div>
                       <span className="text-xs font-bold text-slate-900">Cafés</span>
                     </div>
                     <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 cursor-pointer hover:border-slate-300">
                       <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                         <Store size={20} />
                       </div>
                       <span className="text-xs font-bold text-slate-900">Mercados</span>
                     </div>
                   </div>

                   <div className="space-y-3">
                     <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-3">
                       <div className="w-16 h-16 bg-slate-200 rounded-xl overflow-hidden shrink-0">
                         <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=100&h=100" className="w-full h-full object-cover" alt="Cafe" />
                       </div>
                       <div className="flex flex-col justify-center">
                         <h4 className="font-bold text-slate-900 text-sm">Café da Vila</h4>
                         <p className="text-xs text-slate-500">A 200m daqui • ★ 4.8</p>
                       </div>
                     </div>
                     <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-3">
                       <div className="w-16 h-16 bg-slate-200 rounded-xl overflow-hidden shrink-0">
                         <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=100&h=100" className="w-full h-full object-cover" alt="Cafe" />
                       </div>
                       <div className="flex flex-col justify-center">
                         <h4 className="font-bold text-slate-900 text-sm">Padaria Central</h4>
                         <p className="text-xs text-slate-500">A 500m daqui • ★ 4.5</p>
                       </div>
                     </div>
                   </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
}
