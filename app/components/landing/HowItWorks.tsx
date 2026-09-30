"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export function HowItWorks() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6 tracking-tight">
            Tão simples quanto deveria ser.
          </h2>
          <p className="text-lg text-slate-600">
            Não é necessário conhecimento técnico. Coloque seu guia no ar em menos de 10 minutos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          
          {/* Linha conectora desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-slate-200 z-0"></div>

          {[
            {
              step: '01',
              title: 'Cadastre sua propriedade',
              description: 'Crie o perfil do seu imóvel e adicione as informações básicas de check-in e regras gerais.',
              color: 'text-brand-600',
              bg: 'bg-brand-50'
            },
            {
              step: '02',
              title: 'Personalize as informações',
              description: 'Adicione suas senhas, equipamentos e crie um guia rápido de restaurantes da sua região.',
              color: 'text-blue-600',
              bg: 'bg-blue-50'
            },
            {
              step: '03',
              title: 'Compartilhe com o hóspede',
              description: 'Gere um link direto ou imprima a plaquinha com QR Code para deixar no balcão.',
              color: 'text-emerald-600',
              bg: 'bg-emerald-50'
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className={`w-24 h-24 rounded-full ${item.bg} ${item.color} flex items-center justify-center text-3xl font-heading font-extrabold mb-6 shadow-sm border border-white ring-4 ring-slate-50`}>
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm max-w-xs">
                {item.description}
              </p>
            </motion.div>
          ))}

        </div>
      </Container>
    </Section>
  );
}
