"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const LeadForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    propriedades: '',
    duvidas: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, duvidas: [...prev.duvidas, value] };
      } else {
        return { ...prev, duvidas: prev.duvidas.filter(d => d !== value) };
      }
    });
  };

  const nextStep = () => {
    if (step === 1 && (!formData.nome || !formData.email)) return;
    if (step === 2 && !formData.propriedades) return;
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.duvidas.length === 0) return;
    
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Modifique a URL caso sua API esteja em outro path no Next.js
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          quantidade_propriedades: formData.propriedades,
          duvidas_frequentes: formData.duvidas
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro ao enviar seus dados.');
      }

      setStep(4); // Sucesso
    } catch (err) {
      setErrorMessage(err.message || 'Erro de conexão com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const propertiesOptions = [
    { value: '1', label: '1 Imóvel' },
    { value: '2-3', label: '2 a 3 Imóveis' },
    { value: '4-10', label: '4 a 10 Imóveis' },
    { value: '10+', label: 'Mais de 10 Imóveis' }
  ];

  const doubtOptions = [
    { value: 'wifi', label: 'Senha do Wi-Fi' },
    { value: 'acesso', label: 'Como chegar / Senha do portão' },
    { value: 'equipamentos', label: 'Uso de aparelhos (TV, Ar, Chuveiro)' },
    { value: 'regras', label: 'Regras da casa e lixo' },
    { value: 'dicas', label: 'Dicas de restaurantes e passeios' }
  ];

  return (
    <section id="acesso" className="py-24 bg-brand-50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid md:grid-cols-5 h-full">
            
            {/* Context Sidebar */}
            <div className="md:col-span-2 bg-brand-900 text-white p-10 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-2xl font-extrabold mb-4">Acesso Antecipado</h3>
                <p className="text-brand-100/80 mb-8 leading-relaxed">
                  Estamos selecionando anfitriões parceiros para testar o HospedaFácil em primeira mão. Cadastre-se para garantir sua vaga.
                </p>
                
                {step < 4 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 opacity-100">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-brand-500 text-white' : 'bg-brand-800 text-brand-400'}`}>1</div>
                      <span className={`text-sm font-medium ${step >= 1 ? 'text-white' : 'text-brand-400'}`}>Seus Dados</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-brand-500 text-white' : 'bg-brand-800 text-brand-400'}`}>2</div>
                      <span className={`text-sm font-medium ${step >= 2 ? 'text-white' : 'text-brand-400'}`}>Operação</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-brand-500 text-white' : 'bg-brand-800 text-brand-400'}`}>3</div>
                      <span className={`text-sm font-medium ${step >= 3 ? 'text-white' : 'text-brand-400'}`}>Dores Atuais</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress bar visual */}
              {step < 4 && (
                <div className="mt-12 h-1.5 w-full bg-brand-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-400 transition-all duration-500 ease-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Form Area */}
            <div className="md:col-span-3 p-8 lg:p-12 bg-white relative min-h-[400px]">
              <AnimatePresence mode="wait">
                
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                  >
                    <h4 className="text-xl font-bold text-slate-900 mb-6">Para começarmos, como podemos te chamar?</h4>
                    <div className="space-y-5 flex-1">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Seu Nome</label>
                        <input 
                          type="text" 
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          placeholder="Ex: João Silva"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">E-mail de Contato</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="joao@exemplo.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button 
                        onClick={nextStep}
                        disabled={!formData.nome || !formData.email}
                        className="bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
                      >
                        Próximo Passo <ChevronRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                  >
                    <h4 className="text-xl font-bold text-slate-900 mb-6">Quantas propriedades você gerencia atualmente?</h4>
                    <div className="space-y-3 flex-1">
                      {propertiesOptions.map((opt) => (
                        <label 
                          key={opt.value}
                          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.propriedades === opt.value ? 'border-brand-500 bg-brand-50 shadow-sm' : 'border-slate-200 hover:border-brand-300'}`}
                        >
                          <input 
                            type="radio" 
                            name="propriedades" 
                            value={opt.value}
                            checked={formData.propriedades === opt.value}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${formData.propriedades === opt.value ? 'border-brand-500' : 'border-slate-300'}`}>
                            {formData.propriedades === opt.value && <div className="w-2.5 h-2.5 bg-brand-500 rounded-full"></div>}
                          </div>
                          <span className={`font-medium ${formData.propriedades === opt.value ? 'text-brand-900' : 'text-slate-700'}`}>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button onClick={prevStep} className="text-slate-500 hover:text-slate-700 px-4 py-3 font-medium flex items-center gap-2">
                        <ChevronLeft size={20} /> Voltar
                      </button>
                      <button 
                        onClick={nextStep}
                        disabled={!formData.propriedades}
                        className="bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
                      >
                        Próximo Passo <ChevronRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                  >
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Quais as dúvidas mais frequentes dos seus hóspedes?</h4>
                    <p className="text-sm text-slate-500 mb-6">Selecione todas que se aplicam.</p>
                    <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                      {doubtOptions.map((opt) => (
                        <label 
                          key={opt.value}
                          className={`flex items-start p-3.5 border rounded-xl cursor-pointer transition-all ${formData.duvidas.includes(opt.value) ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-brand-300'}`}
                        >
                          <input 
                            type="checkbox" 
                            value={opt.value}
                            checked={formData.duvidas.includes(opt.value)}
                            onChange={handleCheckboxChange}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded border mr-3 mt-0.5 flex items-center justify-center flex-shrink-0 ${formData.duvidas.includes(opt.value) ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-300 bg-white'}`}>
                            {formData.duvidas.includes(opt.value) && <CheckCircle2 size={14} />}
                          </div>
                          <span className={`text-sm font-medium ${formData.duvidas.includes(opt.value) ? 'text-brand-900' : 'text-slate-700'}`}>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-4">
                      {errorMessage && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
                          {errorMessage}
                        </div>
                      )}
                      <div className="flex justify-between items-center w-full">
                        <button onClick={prevStep} disabled={isLoading} className="text-slate-500 hover:text-slate-700 px-2 py-3 font-medium flex items-center gap-1 disabled:opacity-50">
                          <ChevronLeft size={20} /> Voltar
                        </button>
                        <button 
                          onClick={handleSubmit}
                          disabled={formData.duvidas.length === 0 || isLoading}
                          className="bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-brand-500/30"
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processando...
                            </>
                          ) : (
                            'Solicitar Acesso'
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SUCCESS */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-3xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight">Obrigado, {formData.nome.split(' ')[0]}!</h4>
                    <p className="text-lg text-slate-600 max-w-md mb-8 leading-relaxed">
                      Sua solicitação de acesso foi recebida com sucesso. Nossa equipe avaliará seu perfil e entraremos em contato via e-mail com os próximos passos.
                    </p>
                    <button 
                      onClick={() => {
                        setStep(1);
                        setFormData({nome: '', email: '', propriedades: '', duvidas: []});
                      }}
                      className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 hover:underline transition-colors"
                    >
                      Voltar ao início
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LeadForm;
