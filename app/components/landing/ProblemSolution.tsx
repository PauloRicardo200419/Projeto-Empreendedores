"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Smartphone, CheckCircle2, Clock } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export function ProblemSolution() {
  return (
    <Section id="problema" className="bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6 tracking-tight">
            Hospedar não deveria significar responder a mesma pergunta 20 vezes.
          </h2>
          <p className="text-lg text-slate-600">
            A gestão do seu espaço deve ser eficiente, não um plantão de dúvidas no WhatsApp 24 horas por dia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* O Caos */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 border border-slate-200 rounded-3xl p-8 lg:p-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <MessageSquare size={120} className="text-slate-900" />
            </div>
            
            <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-full font-bold text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              O Caos do WhatsApp
            </div>

            <div className="space-y-4 mb-8">
              {/* Fake WhatsApp Messages */}
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[85%] text-sm text-slate-700">
                Qual é a senha do Wi-Fi mesmo?
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[85%] text-sm text-slate-700">
                Onde fica o mercado mais próximo?
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[85%] text-sm text-slate-700">
                Que horas podemos fazer o checkout amanhã?
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[85%] text-sm text-slate-700 flex items-center gap-2 opacity-60">
                <Clock size={14} className="text-rose-500" /> 23:45 - Como liga o chuveiro?
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Comunicação descentralizada</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Mensagens perdidas, textos copiados e colados milhares de vezes, e a constante interrupção do seu dia a dia.
            </p>
          </motion.div>

          {/* A Paz */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-brand-900 border border-brand-800 rounded-3xl p-8 lg:p-10 relative overflow-hidden group shadow-2xl shadow-brand-900/20"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Smartphone size={120} className="text-white" />
            </div>

            <div className="inline-flex items-center gap-2 bg-brand-800 text-brand-100 px-4 py-2 rounded-full font-bold text-sm mb-8 shadow-inner border border-brand-700">
              <span className="w-2 h-2 rounded-full bg-brand-400"></span>
              A Paz do HospedaFácil
            </div>

            <div className="space-y-4 mb-8">
               <div className="bg-brand-800/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-brand-700/50 text-sm text-brand-50 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center text-brand-300"><CheckCircle2 size={16} /></div>
                 Hóspede encontra o Wi-Fi sozinho
               </div>
               <div className="bg-brand-800/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-brand-700/50 text-sm text-brand-50 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center text-brand-300"><CheckCircle2 size={16} /></div>
                 Guia local integrado
               </div>
               <div className="bg-brand-800/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-brand-700/50 text-sm text-brand-50 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center text-brand-300"><CheckCircle2 size={16} /></div>
                 Regras claras e acessíveis 24h
               </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Informação centralizada</h3>
            <p className="text-brand-100/80 leading-relaxed text-sm">
              Uma interface limpa e organizada onde seu hóspede tira as próprias dúvidas em segundos, sem precisar te chamar.
            </p>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
