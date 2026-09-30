"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';
import { AppMockup } from './AppMockup';

export function Hero() {
  return (
    <Section spacing="xl" className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-brand-50/30">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center font-bold tracking-wider text-xs uppercase text-brand-700 mb-6 bg-brand-100 px-3 py-1 rounded-full">
                Experiência do hóspede, simplificada
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Menos perguntas. <br className="hidden sm:block" />
                Mais <span className="text-brand-600">tranquilidade</span> <br className="hidden sm:block" />para hospedar.
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Centralize as informações que seu hóspede precisa. Reduza mensagens repetitivas com um guia digital inteligente e torne a estadia incrivelmente profissional.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('acesso')?.scrollIntoView({ behavior: 'smooth' })}>
                  Quero conhecer o HospedaFácil
                </Button>
                <Button size="lg" variant="ghost" className="w-full sm:w-auto" icon={<ArrowDown size={18} />} onClick={() => document.getElementById('guest-experience')?.scrollIntoView({ behavior: 'smooth' })}>
                  Ver como funciona
                </Button>
              </div>
              
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 opacity-60">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden`}>
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-600">Junte-se a dezenas de anfitriões</p>
              </div>
            </motion.div>
          </div>

          {/* Visual Content */}
          <div className="relative mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-300/20 blur-[100px] rounded-full pointer-events-none"></div>
              
              <AppMockup />
            </motion.div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
