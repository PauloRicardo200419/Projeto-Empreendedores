"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Wifi, Lock, MapPin, Coffee } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-brand-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-brand-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-3xl lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-brand-100 text-brand-800 text-sm font-bold tracking-wide mb-6 shadow-sm border border-brand-200">
                A ferramenta do anfitrião moderno
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                Pare de repetir a senha do Wi-Fi. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">Automatize a experiência</span> do seu hóspede.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
                Um guia digital inteligente que centraliza todas as informações da sua propriedade, reduzindo perguntas repetitivas e valorizando sua hospedagem.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a 
                  href="#acesso" 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-brand-600/30 hover:-translate-y-1 hover:shadow-2xl"
                >
                  Solicitar Acesso Antecipado
                  <ArrowRight size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Visual Mockup */}
          <div className="flex-1 w-full max-w-md lg:max-w-none relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto w-full max-w-[320px] aspect-[1/2] glass-card rounded-[3rem] p-3 shadow-2xl border-4 border-slate-100/50"
            >
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
                <div className="w-24 h-4 bg-slate-200 rounded-b-xl"></div>
              </div>
              
              <div className="w-full h-full bg-slate-50 rounded-[2.25rem] overflow-hidden flex flex-col relative border border-slate-100">
                
                {/* Mockup Header */}
                <div className="bg-brand-600 text-white p-6 pt-10 rounded-b-3xl shadow-md">
                  <p className="text-xs font-semibold text-brand-100 mb-1 uppercase tracking-wider">Bem-vindo à</p>
                  <h3 className="font-heading text-xl font-bold leading-tight">Casa Brisa do Mar #402</h3>
                </div>

                {/* Mockup Content */}
                <div className="p-4 flex-1 space-y-3 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 z-10 pointer-events-none"></div>
                  
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="bg-brand-50 p-3 rounded-xl text-brand-600">
                      <Wifi size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Wi-Fi do Imóvel</p>
                      <p className="text-sm font-bold text-slate-800">PraiaSol_5G</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
                      <Lock size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Senha do Portão</p>
                      <p className="text-sm font-bold font-mono text-slate-800">#8492</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex-1 flex flex-col items-center justify-center gap-2">
                      <Coffee size={20} className="text-slate-400" />
                      <span className="text-xs font-medium text-slate-600">Equipamentos</span>
                    </div>
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex-1 flex flex-col items-center justify-center gap-2">
                      <MapPin size={20} className="text-slate-400" />
                      <span className="text-xs font-medium text-slate-600">Região</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 opacity-60">
                     <div className="h-4 bg-slate-100 rounded w-1/3 mb-2"></div>
                     <div className="h-3 bg-slate-50 rounded w-2/3"></div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
