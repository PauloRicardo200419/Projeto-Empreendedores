"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareWarning, SearchX, Clock, CheckCircle2, QrCode, SmartphoneNfc } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section id="problema" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Por que continuar respondendo o óbvio?
          </h2>
          <p className="text-lg text-slate-600">
            A gestão da hospedagem deve ser lucrativa, não um plantão de dúvidas 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          
          {/* Problem Side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-red-50/50 rounded-3xl p-8 lg:p-12 border border-red-100 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-sm w-fit mb-8">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              O Caos Atual
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              Tempo perdido e frustração nos dois lados.
            </h3>

            <ul className="space-y-6 flex-1">
              <li className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                    <MessageSquareWarning size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">WhatsApp Lotado</h4>
                  <p className="text-slate-600 leading-relaxed">Você reenvia longos blocos de texto com regras e senhas a cada nova reserva. Muitas mensagens se perdem.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                    <SearchX size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">PDFs Ineficientes</h4>
                  <p className="text-slate-600 leading-relaxed">Guias em PDF ou fotos são difíceis de ler na tela do celular e desatualizam rapidamente.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Dúvidas Fora de Hora</h4>
                  <p className="text-slate-600 leading-relaxed">Hóspedes perguntando como ligar o chuveiro quente às 23h de um sábado.</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Solution Side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-b from-brand-50 to-white rounded-3xl p-8 lg:p-12 border border-brand-200 shadow-xl shadow-brand-900/5 relative overflow-hidden flex flex-col"
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 text-brand-100 opacity-50 pointer-events-none">
              <QrCode size={200} />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-full font-bold text-sm w-fit mb-8 shadow-md">
                <span className="w-2 h-2 rounded-full bg-brand-300"></span>
                A Solução HospedaFácil
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                Um guia digital acessível, autoexplicativo e atualizado.
              </h3>

              <ul className="space-y-6 flex-1">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
                      <QrCode size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">Acesso Instantâneo</h4>
                    <p className="text-slate-600 leading-relaxed">Plaquinha com QR Code no balcão ou link direto. O hóspede aponta a câmera e tem tudo na mão. Sem baixar apps.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
                      <SmartphoneNfc size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">Interação Perfeita Mobile</h4>
                    <p className="text-slate-600 leading-relaxed">Botão para copiar senha do Wi-Fi, links direto pro Waze, interface que imita um app moderno.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">Edição em Tempo Real</h4>
                    <p className="text-slate-600 leading-relaxed">Mudou a senha do portão? Altere no seu painel e todos os hóspedes veem a atualização instantaneamente.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
