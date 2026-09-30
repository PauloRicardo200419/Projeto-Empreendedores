"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export function TimeSimulator() {
  const [properties, setProperties] = useState('');
  const [guests, setGuests] = useState('');

  const calculateImpact = () => {
    if (!properties || !guests) return null;
    
    // Simulação visual simples, não é uma promessa de ROI financeiro.
    let multiplier = 1;
    if (guests === '11-30') multiplier = 2;
    if (guests === '31-100') multiplier = 5;
    if (guests === '100+') multiplier = 10;

    let baseQuestions = 8;
    let totalInteractions = baseQuestions * multiplier * 4;

    return totalInteractions;
  };

  const interactions = calculateImpact();

  return (
    <Section className="bg-white py-24 border-y border-slate-100">
      <Container size="md">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mb-4">
            Quanto do seu tempo fica no WhatsApp?
          </h2>
          <p className="text-lg text-slate-600">
            Descubra o impacto que perguntas repetitivas têm na sua operação.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Perguntas */}
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-4">Quantas propriedades você administra?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['1', '2–5', '6–20', '20+'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setProperties(opt)}
                      className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all ${
                        properties === opt 
                          ? 'border-brand-600 bg-brand-50 text-brand-700' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4">Aproximadamente quantos hóspedes (ou reservas) por mês?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['1-10', '11-30', '31-100', '100+'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setGuests(opt)}
                      className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all ${
                        guests === opt 
                          ? 'border-brand-600 bg-brand-50 text-brand-700' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resultado */}
            <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-8 md:pt-0 md:pl-12">
              <AnimatePresence mode="wait">
                {interactions ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center md:text-left"
                  >
                    <div className="bg-brand-900 text-brand-100 inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-6 shadow-sm">
                      Estimativa Ilustrativa
                    </div>
                    
                    <p className="text-xl text-slate-700 leading-relaxed">
                      Imagine responder <span className="font-bold text-slate-900">8 perguntas repetitivas</span> por hóspede.
                    </p>
                    
                    <div className="my-6 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-sm text-slate-500 font-semibold mb-2">Isso representa aproximadamente</p>
                      <div className="text-5xl font-extrabold text-brand-600 mb-2">
                        +{interactions}
                      </div>
                      <p className="text-slate-700 font-medium">interações repetitivas por mês.</p>
                    </div>

                    <p className="text-slate-600 text-sm">
                      Todas essas mensagens poderiam ser evitadas se a informação estivesse organizada e centralizada no guia digital do HospedaFácil.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6"
                  >
                    <div className="w-16 h-16 bg-slate-200 rounded-full mb-4 animate-pulse"></div>
                    <p>Preencha as opções ao lado para simular o impacto na sua operação.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
}
