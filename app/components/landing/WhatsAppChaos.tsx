"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, CheckCircle2, Wifi, MapPin, Clock, Key } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

const messages = [
  { id: 1, text: "Oi! Qual a senha do Wi-Fi mesmo?", delay: 1 },
  { id: 2, text: "Que horas é o check-in?", delay: 2.5 },
  { id: 3, text: "Onde fica o mercado mais próximo?", delay: 4 },
  { id: 4, text: "Como abre o portão?", delay: 5.5 },
  { id: 5, text: "Pode fazer checkout mais tarde?", delay: 7 },
];

export function WhatsAppChaos() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [organized, setOrganized] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || organized) return;
    
    const timers = messages.map(msg => 
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, msg.id]);
      }, msg.delay * 1000)
    );

    return () => timers.forEach(clearTimeout);
  }, [started, organized]);

  return (
    <Section id="problema" spacing="xl" className="bg-slate-50 relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6">
            Quantas dessas mensagens você já respondeu?
          </h2>
          <p className="text-lg text-slate-600">
            A gestão da sua hospedagem não precisa ser um plantão de dúvidas no WhatsApp.
          </p>
        </div>

        <motion.div 
          onViewportEnter={() => setStarted(true)}
          className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Lado esquerdo: Simulação */}
          <div className="relative h-[480px] bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col w-full max-w-md mx-auto lg:max-w-none">
            <div className="bg-[#075E54] text-white px-6 py-4 flex items-center gap-4 shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="font-bold">Hóspede Casa Brisa</p>
                <p className="text-xs text-white/70">online</p>
              </div>
            </div>

            <div className="flex-1 bg-[#E5DDD5] p-6 overflow-hidden relative">
              <AnimatePresence mode="popLayout">
                {!organized ? (
                  <div className="flex flex-col gap-4">
                    {messages.filter(m => visibleMessages.includes(m.id)).map((msg) => (
                      <motion.div
                        key={`msg-${msg.id}`}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-sm text-slate-800 self-start"
                      >
                        {msg.text}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    key="organized-view"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-full flex flex-col justify-center gap-3"
                  >
                    {[
                      { text: "Wi-Fi Automático", icon: <Wifi size={18} /> },
                      { text: "Check-in Explicado", icon: <Clock size={18} /> },
                      { text: "Guia Local Integrado", icon: <MapPin size={18} /> },
                      { text: "Acesso por Senha", icon: <Key size={18} /> },
                      { text: "Regras Claras", icon: <CheckCircle2 size={18} /> },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.4 }}
                        className="bg-white p-3 md:p-4 rounded-2xl shadow-sm flex items-center gap-4 text-slate-800 font-medium border border-brand-100"
                      >
                        <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center">
                          {item.icon}
                        </div>
                        {item.text}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Lado direito: Interação */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
            <div className="mb-8">
              <AnimatePresence mode="wait">
                {!organized ? (
                  <motion.div
                    key="stats-chaos"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="text-4xl font-extrabold text-rose-500">{visibleMessages.length} perguntas</div>
                    <div className="text-2xl font-bold text-slate-700">1 hóspede</div>
                    <div className="text-xl font-medium text-slate-500">0 organização</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="stats-peace"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="text-4xl font-extrabold text-brand-600 line-through decoration-rose-500 opacity-50">
                      {messages.length} perguntas
                    </div>
                    <div className="text-2xl font-bold text-brand-600 flex items-center gap-2 justify-center md:justify-start">
                      <CheckCircle2 size={24} /> 1 Guia Inteligente
                    </div>
                    <div className="text-xl font-medium text-brand-700">Experiência Organizada</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!organized ? (
              <Button 
                size="lg" 
                onClick={() => setOrganized(true)}
                className="bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20"
              >
                Organizar isso agora
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('guest-experience')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver como o hóspede acessa
                </Button>
              </motion.div>
            )}
          </div>

        </motion.div>
      </Container>
    </Section>
  );
}
