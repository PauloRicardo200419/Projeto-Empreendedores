"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, Home, Building2, LayoutList, Trophy, Mail, User, Briefcase, Building, MessageSquareOff } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

export function LeadForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    propriedades: '',
    objetivo: '',
    nome: '',
    email: '',
    empresa: ''
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simular API Call conforme requisitado
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep(4);
  };

  const handleNext = () => setStep(prev => prev + 1);

  return (
    <Section id="acesso" className="bg-slate-50 py-24 md:py-32">
      <Container size="md">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold text-sm uppercase tracking-wider mb-4 inline-block">Última etapa</span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6 tracking-tight">
            Você acabou de experimentar o HospedaFácil.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Agora imagine oferecer essa mesma experiência simples, fluida e organizada para cada um dos seus hóspedes.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200/60 overflow-hidden relative min-h-[500px] flex flex-col">
          
          {/* Progress Bar Header */}
          {step < 4 && (
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${step >= 1 ? 'text-brand-600' : 'text-slate-400'}`}>Perfil</span>
                <div className={`w-8 h-1 rounded-full ${step >= 2 ? 'bg-brand-600' : 'bg-slate-200'}`}></div>
                <span className={`text-sm font-bold ${step >= 2 ? 'text-brand-600' : 'text-slate-400'}`}>Objetivo</span>
                <div className={`w-8 h-1 rounded-full ${step >= 3 ? 'bg-brand-600' : 'bg-slate-200'}`}></div>
                <span className={`text-sm font-bold ${step >= 3 ? 'text-brand-600' : 'text-slate-400'}`}>Contato</span>
              </div>
              <span className="text-sm font-medium text-slate-500">Etapa {step} de 3</span>
            </div>
          )}

          <div className="p-8 md:p-12 flex-1 relative">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Properties */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col h-full"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Quantas propriedades você gerencia?</h3>
                  <div className="grid sm:grid-cols-2 gap-4 flex-1">
                    {[
                      { val: '1', label: '1 propriedade', icon: <Home size={24} /> },
                      { val: '2-5', label: '2–5 propriedades', icon: <Building size={24} /> },
                      { val: '6-20', label: '6–20 propriedades', icon: <Building2 size={24} /> },
                      { val: '20+', label: '20+ propriedades', icon: <Building2 size={24} /> },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => {
                          setFormData({ ...formData, propriedades: opt.val });
                          handleNext();
                        }}
                        className={`text-left p-6 rounded-2xl border-2 transition-all flex flex-col gap-3 group ${
                          formData.propriedades === opt.val 
                            ? 'border-brand-600 bg-brand-50' 
                            : 'border-slate-100 hover:border-brand-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`${formData.propriedades === opt.val ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'}`}>
                          {opt.icon}
                        </div>
                        <span className="font-bold text-slate-900 text-lg">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Objective */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col h-full"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">O que você mais gostaria de melhorar?</h3>
                  <div className="grid sm:grid-cols-2 gap-4 flex-1">
                    {[
                      { val: 'mensagens', label: 'Reduzir mensagens repetitivas', icon: <MessageSquareOff size={24} /> },
                      { val: 'experiencia', label: 'Melhorar a experiência do hóspede', icon: <Trophy size={24} /> },
                      { val: 'organizacao', label: 'Organizar informações', icon: <LayoutList size={24} /> },
                      { val: 'profissionalizar', label: 'Profissionalizar minha operação', icon: <Briefcase size={24} /> },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => {
                          setFormData({ ...formData, objetivo: opt.val });
                          handleNext();
                        }}
                        className={`text-left p-6 rounded-2xl border-2 transition-all flex flex-col gap-3 group ${
                          formData.objetivo === opt.val 
                            ? 'border-brand-600 bg-brand-50' 
                            : 'border-slate-100 hover:border-brand-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`${formData.objetivo === opt.val ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'}`}>
                          {opt.icon}
                        </div>
                        <span className="font-bold text-slate-900 text-lg">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-8">
                    <button onClick={() => setStep(1)} className="text-sm font-semibold text-slate-500 hover:text-slate-800">
                      ← Voltar
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Contact */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col h-full"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Para onde enviamos seu acesso?</h3>
                  <div className="space-y-4 flex-1">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Seu Nome</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                          type="text" 
                          placeholder="Ex: João Silva"
                          value={formData.nome}
                          onChange={(e) => setFormData({...formData, nome: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 focus:ring-0 outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail Profissional</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                          type="email" 
                          placeholder="joao@exemplo.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-500 focus:ring-0 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <button onClick={() => setStep(2)} className="text-sm font-semibold text-slate-500 hover:text-slate-800">
                      ← Voltar
                    </button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={!formData.nome || !formData.email || isLoading}
                      icon={isLoading ? undefined : <ChevronRight size={18} />}
                    >
                      {isLoading ? 'Processando...' : 'Solicitar Acesso'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* SUCCESS */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <div className="w-24 h-24 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-brand-200 rounded-full animate-ping opacity-20"></div>
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-heading font-extrabold text-slate-900 mb-4">
                    Tudo certo, {formData.nome.split(' ')[0]}!
                  </h3>
                  <p className="text-lg text-slate-600 max-w-md mx-auto mb-8">
                    Seu interesse foi registrado com sucesso. Nossa equipe entrará em contato em breve para liberar o seu acesso ao HospedaFácil.
                  </p>
                  <Button variant="secondary" onClick={() => window.location.reload()}>
                    Voltar ao início
                  </Button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
