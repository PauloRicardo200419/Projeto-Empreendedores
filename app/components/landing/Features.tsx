"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareOff, UserCheck, Sparkles, Clock } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export function Features() {
  const features = [
    {
      icon: <MessageSquareOff size={24} />,
      title: "Menos mensagens repetitivas",
      description: "Centralize as respostas que seus hóspedes mais precisam. Desde a senha do Wi-Fi até a localização da lixeira.",
    },
    {
      icon: <UserCheck size={24} />,
      title: "Mais autonomia para o hóspede",
      description: "Ninguém gosta de esperar uma resposta. Com o guia digital, a informação importante fica disponível a qualquer momento.",
    },
    {
      icon: <Sparkles size={24} />,
      title: "Experiência mais profissional",
      description: "Surpreenda seu hóspede. Transforme uma hospedagem simples em uma experiência tecnológica, organizada e inesquecível.",
    },
    {
      icon: <Clock size={24} />,
      title: "Mais tempo para você",
      description: "Reduza tarefas manuais de atendimento. Concentre-se no crescimento da sua operação e na gestão do seu negócio.",
    }
  ];

  return (
    <Section id="beneficios" className="bg-slate-50 border-y border-slate-200/60">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
