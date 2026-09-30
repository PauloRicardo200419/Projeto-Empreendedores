"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Sparkles, MessageSquareOff, LayoutDashboard } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Smartphone size={28} />,
      title: 'Guia 100% Web (Sem Apps)',
      description: 'Hóspedes detestam baixar aplicativos novos. O HospedaFácil abre diretamente no navegador de qualquer smartphone assim que o QR Code é escaneado ou o link é clicado.'
    },
    {
      icon: <LayoutDashboard size={28} />,
      title: 'Informação no Momento Certo',
      description: 'Organize suas dicas em categorias: Chegada, Regras, Equipamentos e Arredores. O hóspede encontra exatamente o que precisa, em poucos segundos.'
    },
    {
      icon: <MessageSquareOff size={28} />,
      title: 'Adeus às Perguntas Repetitivas',
      description: 'Antecipe as dúvidas comuns. Com um guia claro e acessível, o autoatendimento vira o padrão, reduzindo drasticamente o número de mensagens.'
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Percepção de Valor Imediata',
      description: 'Demonstre profissionalismo desde o primeiro minuto. Um guia digital bonito e organizado reflete o carinho que você tem pelo seu espaço e garante avaliações 5 estrelas.'
    }
  ];

  return (
    <section id="features" className="py-24 bg-brand-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-700/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block py-1.5 px-4 rounded-full bg-brand-800 text-brand-100 text-sm font-bold tracking-wide mb-6">
            Funcionalidades Core
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Tudo o que você precisa. Nada de complicação.
          </h2>
          <p className="text-lg text-brand-100/80">
            Focado em resolver o problema central: comunicação clara entre anfitrião e hóspede.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-800/40 backdrop-blur-sm border border-brand-700/50 rounded-3xl p-8 hover:bg-brand-800/60 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-700 text-brand-300 flex items-center justify-center mb-6 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-brand-100/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
