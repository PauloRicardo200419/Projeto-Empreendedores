// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  // Fecha o menu mobile ao clicar em um link ou botão
  mobileMenu.querySelectorAll('a, button').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.hidden) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    }
  });
}

// ===== SCROLL SUAVE PARA BOTÕES COM data-scroll =====
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const selector = btn.getAttribute('data-scroll');
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== HEADER SCROLL & SCROLLSPY =====
const header = document.getElementById('mainHeader');
const formSection = document.getElementById('formulario');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Header background blur on scroll
  if (header) {
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // ScrollSpy para destacar a borda do item ativo conforme rola a página
  const sectionsToSpy = [
    { selector: '#como-funciona' },
    { selector: '#simulador' },
    { selector: '#faq' }
  ];

  const scrollPos = scrollY + 220;
  sectionsToSpy.forEach(sec => {
    const el = document.querySelector(sec.selector);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-item-pill, .nav-mobile-item').forEach(p => p.classList.remove('active'));
        document.querySelectorAll(`[href="${sec.selector}"]`).forEach(p => p.classList.add('active'));
      }
    }
  });
}, { passive: true });

// Clique nos pills do menu atualiza a borda de seleção ativa imediatamente
document.querySelectorAll('.nav-item-pill, .nav-mobile-item').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.nav-item-pill, .nav-mobile-item').forEach(p => p.classList.remove('active'));
    const target = pill.getAttribute('href');
    document.querySelectorAll(`[href="${target}"]`).forEach(p => p.classList.add('active'));
  });
});

// ===== ANIMAÇÃO DE ENTRADA (Intersection Observer com Fallback Seguro) =====
const fadeElements = document.querySelectorAll('.fade-in');

// Revela imediatamente qualquer elemento já visível na janela inicial
fadeElements.forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight + 100) {
    el.classList.add('visible');
  }
});

if ('IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });

  fadeElements.forEach(el => {
    if (!el.classList.contains('visible')) {
      fadeObserver.observe(el);
    }
  });
} else {
  fadeElements.forEach(el => el.classList.add('visible'));
}

// ===== ANIMAÇÃO DE CONTAGEM DAS MÉTRICAS (Count Up) =====
const statElements = document.querySelectorAll('.stat-num');
let statsCounted = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsCounted) {
      statsCounted = true;
      statElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1600;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Easing easeOutQuart
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          const currentVal = Math.floor(easeProgress * target);

          el.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(updateCount);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

if (statElements.length > 0) {
  statsObserver.observe(statElements[0].closest('.stats-section') || statElements[0]);
}

// ===== SIMULADOR DE ECONOMIA UNIVERSITÁRIO EM ETAPAS (WIZARD) =====
let currentWizardStep = 1;

function formatMoeda(val) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

function formatMoedaCentavos(val) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Elementos da Etapa 1
const rangeRenda = document.getElementById('rangeRenda');
const dispRenda = document.getElementById('dispRenda');
const rendaOptionCards = document.querySelectorAll('.renda-option-card');
const btnNext1 = document.getElementById('btnNext1');

// Elementos da Etapa 2
const vilaoCards = document.querySelectorAll('.vilao-w-card');
const dispTotalViloesStep2 = document.getElementById('dispTotalViloesStep2');
const btnPrev2 = document.getElementById('btnPrev2');
const btnNext2 = document.getElementById('btnNext2');

// Elementos da Etapa 3
const metaCards = document.querySelectorAll('.meta-w-card');
const btnPrev3 = document.getElementById('btnPrev3');
const btnNext3 = document.getElementById('btnNext3');

// Elementos da Etapa 4 (Panorama)
const panRendaBase = document.getElementById('panRendaBase');
const panAntesRenda = document.getElementById('panAntesRenda');
const panAntesVazamentos = document.getElementById('panAntesVazamentos');
const panFixosVal = document.getElementById('panFixosVal');
const panTetoDiario = document.getElementById('panTetoDiario');
const panGanhoMensal = document.getElementById('panGanhoMensal');
const panGanhoAnual = document.getElementById('panGanhoAnual');
const panBreakdownList = document.getElementById('panBreakdownList');
const panMetaIcon = document.getElementById('panMetaIcon');
const panMetaTitle = document.getElementById('panMetaTitle');
const panMetaDesc = document.getElementById('panMetaDesc');
const panPlanoTitle = document.getElementById('panPlanoTitle');
const panPlanoDesc = document.getElementById('panPlanoDesc');
const panPlanoFeatures = document.getElementById('panPlanoFeatures');
const panPlanoRoiVal = document.getElementById('panPlanoRoiVal');
const btnCtaPanorama = document.getElementById('btnCtaPanorama');
const btnCtaPanoramaText = document.getElementById('btnCtaPanoramaText');
const btnRefazerWizard = document.getElementById('btnRefazerWizard');

// Função de Transição entre Etapas
function setWizardStep(targetStep, shouldScroll = true) {
  if (targetStep < 1 || targetStep > 4) return;
  currentWizardStep = targetStep;

  // Atualiza painéis (panes)
  for (let i = 1; i <= 4; i++) {
    const pane = document.getElementById(`paneStep${i}`);
    if (pane) {
      if (i === targetStep) {
        pane.style.display = 'flex';
        pane.classList.add('active');
        pane.removeAttribute('hidden');
      } else {
        pane.style.display = 'none';
        pane.classList.remove('active');
        pane.setAttribute('hidden', 'true');
      }
    }

    // Atualiza indicadores de etapa
    const indicator = document.getElementById(`stepIndicator${i}`);
    if (indicator) {
      if (i === targetStep) {
        indicator.classList.add('active');
        indicator.classList.remove('completed');
      } else if (i < targetStep) {
        indicator.classList.remove('active');
        indicator.classList.add('completed');
      } else {
        indicator.classList.remove('active', 'completed');
      }
    }

    // Atualiza linhas conectoras
    if (i <= 3) {
      const line = document.getElementById(`stepLine${i}`);
      if (line) {
        if (i < targetStep) {
          line.classList.add('active');
        } else {
          line.classList.remove('active');
        }
      }
    }
  }

  // Se chegou na etapa 4, renderiza o Panorama
  if (targetStep === 4) {
    renderizarPanorama();
  }

  // Rola suavemente para o simulador se solicitado
  if (shouldScroll) {
    const simuladorSection = document.getElementById('simulador');
    if (simuladorSection) {
      const topOffset = simuladorSection.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  }
}

// Função para manter a barra do slider 100% verde conforme o arrasto
function updateSliderTrack(slider) {
  if (!slider) return;
  const min = parseFloat(slider.min) || 0;
  const max = parseFloat(slider.max) || 100;
  const val = parseFloat(slider.value) || 0;
  const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
  slider.style.background = `linear-gradient(to right, #16A34A 0%, #16A34A ${pct}%, #E2E8F0 ${pct}%, #E2E8F0 100%)`;
}

// 1. Lógica da Etapa 1 (Renda)
function atualizarRenda(valor, syncSlider = true) {
  const renda = parseFloat(valor) || 1400;

  if (dispRenda) {
    dispRenda.textContent = formatMoeda(renda);
  }

  if (syncSlider && rangeRenda && parseFloat(rangeRenda.value) !== renda) {
    rangeRenda.value = renda;
  }

  if (rangeRenda) {
    updateSliderTrack(rangeRenda);
  }

  // Sincroniza cards de opção rápida
  rendaOptionCards.forEach(card => {
    const cardVal = parseFloat(card.getAttribute('data-val'));
    if (cardVal === renda) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  atualizarSubtotalViloes();
}

if (rangeRenda) {
  updateSliderTrack(rangeRenda);
  rangeRenda.addEventListener('input', (e) => {
    updateSliderTrack(e.target);
    atualizarRenda(e.target.value, false);
  });
}

rendaOptionCards.forEach(card => {
  const handleSelectRenda = () => {
    const val = card.getAttribute('data-val');
    if (val) {
      atualizarRenda(val, true);
    }
  };

  card.addEventListener('click', handleSelectRenda);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectRenda();
    }
  });
});

if (btnNext1) {
  btnNext1.addEventListener('click', () => setWizardStep(2));
}

// 2. Lógica da Etapa 2 (Vazamentos & Consumo Personalizado)
function setVilaoValor(card, novoValor) {
  const val = Math.max(20, Math.min(800, parseInt(novoValor, 10) || 60));
  card.setAttribute('data-custo', val);

  // Atualiza badge de valor no topo
  const badge = card.querySelector('.vilao-w-badge');
  if (badge) badge.textContent = `+ R$ ${val}/mês`;

  // Atualiza display do stepper
  const stepperVal = card.querySelector('.spend-stepper-val');
  if (stepperVal) stepperVal.textContent = `R$ ${val}`;

  // Atualiza pills de preset ativas
  card.querySelectorAll('.spend-preset-pill').forEach(pill => {
    const pVal = parseInt(pill.getAttribute('data-val'), 10);
    if (pVal === val) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  atualizarSubtotalViloes();
}

function atualizarSubtotalViloes() {
  let total = 0;
  let count = 0;

  vilaoCards.forEach(card => {
    if (card.classList.contains('active')) {
      total += parseFloat(card.getAttribute('data-custo') || 0);
      count++;
    }
  });

  if (dispTotalViloesStep2) {
    if (count > 0) {
      dispTotalViloesStep2.textContent = `${formatMoeda(total)},00 todo mês (${count} ${count === 1 ? 'hábito selecionado' : 'hábitos selecionados'})`;
    } else {
      dispTotalViloesStep2.textContent = 'R$ 0,00 (selecione pelo menos um hábito)';
    }
  }

  return { total, count };
}

vilaoCards.forEach(card => {
  const topBar = card.querySelector('.vilao-card-top') || card;

  // Alterna o card ativo ao clicar no topo
  const toggleVilao = () => {
    const isActive = card.classList.contains('active');
    if (isActive) {
      card.classList.remove('active');
      card.setAttribute('aria-pressed', 'false');
    } else {
      card.classList.add('active');
      card.setAttribute('aria-pressed', 'true');
    }
    atualizarSubtotalViloes();
  };

  topBar.addEventListener('click', toggleVilao);
  topBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleVilao();
    }
  });

  // Botão Stepper Menos
  const btnMinus = card.querySelector('.btn-stepper-minus');
  if (btnMinus) {
    btnMinus.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = parseInt(card.getAttribute('data-custo') || 100, 10);
      const step = card.getAttribute('data-vilao') === 'cafes' ? 15 : 20;
      setVilaoValor(card, current - step);
    });
  }

  // Botão Stepper Mais
  const btnPlus = card.querySelector('.btn-stepper-plus');
  if (btnPlus) {
    btnPlus.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = parseInt(card.getAttribute('data-custo') || 100, 10);
      const step = card.getAttribute('data-vilao') === 'cafes' ? 15 : 20;
      setVilaoValor(card, current + step);
    });
  }

  // Pílulas de presets rápidos
  card.querySelectorAll('.spend-preset-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      const pVal = pill.getAttribute('data-val');
      if (pVal) {
        setVilaoValor(card, pVal);
      }
    });
  });
});

if (btnPrev2) {
  btnPrev2.addEventListener('click', () => setWizardStep(1));
}
if (btnNext2) {
  btnNext2.addEventListener('click', () => setWizardStep(3));
}

// 3. Lógica da Etapa 3 (Metas)
metaCards.forEach(card => {
  const selectMeta = () => {
    metaCards.forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-pressed', 'false');
    });
    card.classList.add('active');
    card.setAttribute('aria-pressed', 'true');
  };

  card.addEventListener('click', selectMeta);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectMeta();
    }
  });
});

if (btnPrev3) {
  btnPrev3.addEventListener('click', () => setWizardStep(2));
}
if (btnNext3) {
  btnNext3.addEventListener('click', () => setWizardStep(4));
}

// Permite clicar nos indicadores de etapas anteriores para navegação rápida
for (let i = 1; i <= 4; i++) {
  const indicator = document.getElementById(`stepIndicator${i}`);
  if (indicator) {
    indicator.addEventListener('click', () => {
      setWizardStep(i);
    });
  }
}

// 4. Lógica da Etapa 4 (O Panorama Financeiro e Plano Personalizado do Cliente)
function renderizarPanorama() {
  const renda = parseFloat(rangeRenda ? rangeRenda.value : 1400) || 1400;

  // Coleta os vazamentos ativos com seus valores personalizados
  const selectedViloes = [];
  let somaViloes = 0;

  vilaoCards.forEach(card => {
    if (card.classList.contains('active')) {
      const custo = parseFloat(card.getAttribute('data-custo') || 0);
      const nome = card.getAttribute('data-nome') || card.querySelector('strong')?.textContent || 'Hábito';
      const icon = card.getAttribute('data-icon') || card.querySelector('.vilao-w-icon')?.textContent || '💸';
      const id = card.getAttribute('data-vilao') || '';
      selectedViloes.push({ id, nome, custo, icon });
      somaViloes += custo;
    }
  });

  // Cálculo de resgate mensal realista
  let ganhoMensal = somaViloes > 0 
    ? Math.min(somaViloes, Math.round(renda * 0.55))
    : Math.round(renda * 0.10);

  // Mínimo plausível
  ganhoMensal = Math.max(60, ganhoMensal);
  const ganhoAnual = ganhoMensal * 12;

  // Custos fixos protegidos (45%)
  const fixos = Math.round(renda * 0.45);

  // Teto diário seguro com base no valor livre restante no mês
  const livreMes = Math.max(renda * 0.15, (renda * 0.55) - (ganhoMensal * 0.65));
  const tetoDiario = Math.max(12, livreMes / 30);

  // Atualiza Displays do Panorama
  if (panRendaBase) panRendaBase.textContent = formatMoeda(renda);
  if (panAntesRenda) panAntesRenda.textContent = `${formatMoeda(renda)},00`;
  if (panAntesVazamentos) {
    panAntesVazamentos.textContent = `- ${formatMoeda(somaViloes > 0 ? somaViloes : ganhoMensal)},00 / mês`;
  }

  if (panFixosVal) panFixosVal.textContent = `${formatMoeda(fixos)},00 (45%)`;
  if (panTetoDiario) panTetoDiario.textContent = `${formatMoedaCentavos(tetoDiario)} / dia livre`;
  if (panGanhoMensal) panGanhoMensal.textContent = `+ ${formatMoeda(ganhoMensal)},00 / mês`;
  if (panGanhoAnual) panGanhoAnual.textContent = `${formatMoeda(ganhoAnual)},00`;

  // Renderiza a lista detalhada de vazamentos com valores personalizados
  if (panBreakdownList) {
    if (selectedViloes.length > 0) {
      panBreakdownList.innerHTML = selectedViloes.map(item => `
        <div class="pan-breakdown-item">
          <div style="display:flex;align-items:center;gap:8px">
            <span>${item.icon}</span>
            <span>${item.nome}</span>
          </div>
          <strong>+ R$ ${item.custo},00/mês</strong>
        </div>
      `).join('');
    } else {
      panBreakdownList.innerHTML = `
        <div class="pan-breakdown-item" style="grid-column: 1 / -1; justify-content: center; color: var(--gray-text);">
          <span>💡 Mesmo sem marcar categorias específicas, o Teto Diário do Organizaê resgata em média <strong>${formatMoeda(ganhoMensal)}/mês</strong> em pequenos impulsos.</span>
        </div>
      `;
    }
  }

  // Meta Ativa Selecionada
  const activeMetaCard = document.querySelector('.meta-w-card.active') || metaCards[0];
  if (activeMetaCard) {
    const metaTipo = activeMetaCard.getAttribute('data-meta') || 'reserva';
    const valorMeta = parseFloat(activeMetaCard.getAttribute('data-valor')) || 820;
    const metaIcon = activeMetaCard.querySelector('.meta-w-icon')?.textContent || '🎯';
    const metaTitle = activeMetaCard.querySelector('h4')?.textContent || 'Objetivo Financeiro';

    const meses = Math.max(1, Math.ceil(valorMeta / ganhoMensal));

    if (panMetaIcon) panMetaIcon.textContent = metaIcon;
    if (panMetaTitle) panMetaTitle.textContent = `${metaTitle} (${formatMoeda(valorMeta)})`;

    if (panMetaDesc) {
      if (metaTipo === 'reserva') {
        panMetaDesc.innerHTML = `Com os <strong>${formatMoeda(ganhoMensal)},00/mês</strong> resgatados pelo Organizaê, você monta sua reserva completa de <strong>${formatMoeda(valorMeta)}</strong> em <strong>apenas ${meses} ${meses === 1 ? 'mês' : 'meses'}</strong>! Fim definitivo de passar sufoco ou depender de ajuda.`;
      } else if (metaTipo === 'notebook') {
        panMetaDesc.innerHTML = `Guardando os <strong>${formatMoeda(ganhoMensal)},00/mês</strong> estancados dos vazamentos, em <strong>${meses} meses</strong> você compra seu equipamento novo à vista e ganha desconto sem juros abusivos.`;
      } else if (metaTipo === 'viagem') {
        panMetaDesc.innerHTML = `Recuperando <strong>${formatMoeda(ganhoMensal)},00/mês</strong>, em <strong>${meses} meses</strong> sua viagem de férias ou festa de formatura estará 100% quitada sem deixar pendências para o próximo semestre.`;
      } else {
        panMetaDesc.innerHTML = `Direcionando os <strong>${formatMoeda(ganhoMensal)},00/mês</strong> resgatados, em <strong>${meses} ${meses === 1 ? 'mês' : 'meses'}</strong> você quita todas as faturas em atraso e zera o cheque especial de vez.`;
      }
    }
  }

  // GERAÇÃO DO PLANO PERSONALIZADO DO CLIENTE
  const featureCatalog = {
    delivery: { icon: '🍕', title: 'Módulo Anti-Delivery Campus', desc: 'Teto semanal inteligente para iFood e cantina sem estourar o mês.' },
    role: { icon: '🍻', title: 'Blindagem de Rolês de Fim de Semana', desc: 'Regra de teto de quinta a sábado para curtir sem zerar a conta no dia seguinte.' },
    cartao: { icon: '🛍️', title: 'Trava de Impulsos & Fatura Preditiva', desc: 'Previsão antecipada de gastos na Shopee/Shein antes do fechamento.' },
    transporte: { icon: '🚗', title: 'Gestão Inteligente de Corridas', desc: 'Cota definida para Uber sem surpresas em dias de chuva ou pressa.' },
    pix: { icon: '💸', title: 'Rastreador de Micro-Pix Invisíveis', desc: 'Alerta na hora quando transferências de R$ 10 a R$ 20 ameaçarem o teto do dia.' },
    assinaturas: { icon: '📄', title: 'Detector de Assinaturas Zumbis', desc: 'Identificação e corte rápido de streamings e serviços duplicados.' },
    cafes: { icon: '☕', title: 'Cota Livre de Café & Snacks', desc: 'Verba dedicada para cafeteria e lanches do campus com zero peso na consciência.' }
  };

  const planFeaturesList = [];

  // Adiciona recursos com base nas categorias selecionadas pelo usuário
  selectedViloes.forEach(v => {
    if (featureCatalog[v.id]) {
      planFeaturesList.push(featureCatalog[v.id]);
    }
  });

  // Recursos base universais do plano
  planFeaturesList.push({ icon: '🎯', title: 'Teto Diário Dinâmico em Tempo Real', desc: '1 número central na tela que diz exatamente quanto você pode gastar hoje.' });
  planFeaturesList.push({ icon: '🛡️', title: 'Alocação Automática na Meta', desc: `Encaminha os ${formatMoeda(ganhoMensal)} resgatados direto para sua meta.` });

  // Nome e descrição dinâmicos do plano personalizado
  let planoNome = 'Plano Equilíbrio Universitário Organizaê';
  let planoDesc = 'Plano completo moldado para os seus hábitos específicos de consumo:';

  const hasRole = selectedViloes.some(v => v.id === 'role');
  const hasDelivery = selectedViloes.some(v => v.id === 'delivery');
  const hasCartao = selectedViloes.some(v => v.id === 'cartao');

  if (hasRole && hasDelivery) {
    planoNome = 'Plano Equilíbrio Social & Rotina Acadêmica';
    planoDesc = 'Configurado sob medida para blindar suas saídas e lanches sem você precisar abrir mão dos amigos.';
  } else if (hasCartao) {
    planoNome = 'Plano Fatura Blindada & Antidívidas';
    planoDesc = 'Feito para proteger seu cartão de crédito e eliminar surpresas no dia do vencimento.';
  } else if (selectedViloes.length >= 4) {
    planoNome = 'Plano Resgate Total Universitário';
    planoDesc = 'Plano avançado com blindagem múltipla para estancar todos os vazamentos da sua rotina.';
  }

  if (panPlanoTitle) panPlanoTitle.textContent = planoNome;
  if (panPlanoDesc) panPlanoDesc.textContent = planoDesc;

  if (panPlanoFeatures) {
    panPlanoFeatures.innerHTML = planFeaturesList.slice(0, 6).map(feat => `
      <div class="plano-feature-item">
        <span class="feat-icon">${feat.icon}</span>
        <div>
          <strong>${feat.title}</strong>
          <p style="margin:2px 0 0;font-size:0.78rem;color:#64748B">${feat.desc}</p>
        </div>
      </div>
    `).join('');
  }

  if (panPlanoRoiVal) {
    panPlanoRoiVal.textContent = `Você recupera ${formatMoeda(ganhoMensal)},00 todo mês (${formatMoeda(ganhoAnual)},00/ano) investindo R$ 0,00 no Beta Grátis.`;
  }

  // Botão CTA do Panorama com valor personalizado
  if (btnCtaPanoramaText) {
    btnCtaPanoramaText.textContent = `Quero meu Plano Personalizado de ${formatMoeda(ganhoMensal)}/mês Grátis`;
  }
}

// Botão Refazer Diagnóstico
if (btnRefazerWizard) {
  btnRefazerWizard.addEventListener('click', () => {
    setWizardStep(1);
  });
}

// Clique no CTA do Panorama rola para o formulário e pré-seleciona a dor do usuário
if (btnCtaPanorama) {
  btnCtaPanorama.addEventListener('click', () => {
    const formSection = document.getElementById('formulario');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });

      // Pré-preenchimento inteligente da dificuldade se possível
      const selectDificuldade = document.getElementById('dificuldade');
      const activeVilao = document.querySelector('.vilao-w-card.active');
      if (selectDificuldade && activeVilao) {
        const vilaoTipo = activeVilao.getAttribute('data-vilao');
        if (vilaoTipo === 'cartao') {
          selectDificuldade.value = 'Gasto muito no cartão e me assusto com a fatura';
        } else if (vilaoTipo === 'pix') {
          selectDificuldade.value = 'Não sei para onde meu dinheiro vai';
        } else {
          selectDificuldade.value = 'Tenho dificuldade para economizar';
        }
      }

      setTimeout(() => {
        const nomeInput = document.getElementById('nome');
        if (nomeInput) nomeInput.focus();
      }, 500);
    }
  });
}

// Inicializa a Etapa 1 sem rolar a página
atualizarRenda(1400, true);
setWizardStep(1, false);


// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;
    const parentItem = btn.closest('.faq-item');

    // Fecha outros accordions abertos
    document.querySelectorAll('.faq-question').forEach(otherBtn => {
      if (otherBtn !== btn) {
        otherBtn.setAttribute('aria-expanded', 'false');
        if (otherBtn.nextElementSibling) otherBtn.nextElementSibling.hidden = true;
        if (otherBtn.closest('.faq-item')) otherBtn.closest('.faq-item').classList.remove('active');
      }
    });

    btn.setAttribute('aria-expanded', String(!isExpanded));
    if (answer) {
      answer.hidden = isExpanded;
    }
    if (parentItem) {
      parentItem.classList.toggle('active', !isExpanded);
    }
  });
});

// ===== INTERATIVIDADE DAS BARRAS DO HERO =====
document.querySelectorAll('.bar').forEach(bar => {
  bar.addEventListener('click', () => {
    document.querySelectorAll('.bar').forEach(b => b.classList.remove('bar-highlight'));
    bar.classList.add('bar-highlight');
  });
});

// ===== MARQUEE INFINITO E ULTRA FLUIDO DE DEPOIMENTOS =====
const depoimentosTrack = document.getElementById('depoimentosTrack');
const testiPrev = document.getElementById('testiPrev');
const testiNext = document.getElementById('testiNext');

if (depoimentosTrack) {
  // Duplica os cards para criar um loop 100% contínuo e infinito
  const originalCards = depoimentosTrack.innerHTML;
  depoimentosTrack.innerHTML = originalCards + originalCards;

  let isDown = false;
  let startX = 0;
  let scrollLeftAtStart = 0;
  let isPaused = false;
  let currentScroll = 0;
  // Velocidade suave, constante e relaxante (não corre, permitindo leitura confortável)
  const scrollSpeed = 0.45;

  // Arrastar com o mouse (Drag-to-scroll)
  depoimentosTrack.addEventListener('mousedown', (e) => {
    isDown = true;
    depoimentosTrack.classList.add('active-drag');
    startX = e.pageX - depoimentosTrack.offsetLeft;
    scrollLeftAtStart = depoimentosTrack.scrollLeft;
    currentScroll = depoimentosTrack.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      depoimentosTrack.classList.remove('active-drag');
      currentScroll = depoimentosTrack.scrollLeft;
    }
  });

  depoimentosTrack.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - depoimentosTrack.offsetLeft;
    const walk = (x - startX) * 1.3;
    depoimentosTrack.scrollLeft = scrollLeftAtStart - walk;
    currentScroll = depoimentosTrack.scrollLeft;
  });

  // Pausar ao passar o mouse ou focar para ler sem pressa
  depoimentosTrack.addEventListener('mouseenter', () => { isPaused = true; });
  depoimentosTrack.addEventListener('mouseleave', () => {
    isPaused = false;
    currentScroll = depoimentosTrack.scrollLeft;
  });
  depoimentosTrack.addEventListener('focusin', () => { isPaused = true; });
  depoimentosTrack.addEventListener('focusout', () => {
    isPaused = false;
    currentScroll = depoimentosTrack.scrollLeft;
  });
  depoimentosTrack.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
  depoimentosTrack.addEventListener('touchend', () => {
    isPaused = false;
    currentScroll = depoimentosTrack.scrollLeft;
  });

  // Sincroniza em rolagem manual
  depoimentosTrack.addEventListener('scroll', () => {
    if (isDown || isPaused) {
      currentScroll = depoimentosTrack.scrollLeft;
    }
  }, { passive: true });

  // Botões de navegação lateral (prev/next)
  if (testiPrev) {
    testiPrev.addEventListener('click', () => {
      isPaused = true;
      depoimentosTrack.scrollBy({ left: -390, behavior: 'smooth' });
      setTimeout(() => {
        currentScroll = depoimentosTrack.scrollLeft;
        isPaused = false;
      }, 900);
    });
  }

  if (testiNext) {
    testiNext.addEventListener('click', () => {
      isPaused = true;
      depoimentosTrack.scrollBy({ left: 390, behavior: 'smooth' });
      setTimeout(() => {
        currentScroll = depoimentosTrack.scrollLeft;
        isPaused = false;
      }, 900);
    });
  }

  // Animação fluida contínua com acumulador de subpixel (evita congelamento em navegadores)
  function animarDepoimentos() {
    if (!isPaused && !isDown) {
      currentScroll += scrollSpeed;
      const halfWidth = depoimentosTrack.scrollWidth / 2;
      if (currentScroll >= halfWidth) {
        currentScroll -= halfWidth;
      }
      depoimentosTrack.scrollLeft = currentScroll;
    }
    requestAnimationFrame(animarDepoimentos);
  }

  requestAnimationFrame(animarDepoimentos);
}

// ===== VALIDAÇÃO E ENVIO DO FORMULÁRIO =====
const form = document.getElementById('interesseForm');
const formSuccess = document.getElementById('formSuccess');

if (formSuccess) {
  formSuccess.hidden = true;
}

const fields = {
  nome: { el: document.getElementById('nome'), errorEl: document.getElementById('erro-nome') },
  email: { el: document.getElementById('email'), errorEl: document.getElementById('erro-email') },
  dificuldade: { el: document.getElementById('dificuldade'), errorEl: document.getElementById('erro-dificuldade') },
  interesse: { el: document.getElementById('interesse'), errorEl: document.getElementById('erro-interesse') }
};

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function mostrarErro(campo, mensagem) {
  const { el, errorEl } = fields[campo];
  if (!el || !errorEl) return;
  el.closest('.form-group').classList.add('error');
  errorEl.textContent = mensagem;
  el.setAttribute('aria-invalid', 'true');
}

function limparErro(campo) {
  const { el, errorEl } = fields[campo];
  if (!el || !errorEl) return;
  el.closest('.form-group').classList.remove('error');
  errorEl.textContent = '';
  el.removeAttribute('aria-invalid');
}

function validarFormulario() {
  let valido = true;

  if (!fields.nome.el.value.trim()) {
    mostrarErro('nome', 'Por favor, informe seu nome completo.');
    valido = false;
  } else {
    limparErro('nome');
  }

  const emailValue = fields.email.el.value.trim();
  if (!emailValue) {
    mostrarErro('email', 'Por favor, informe seu e-mail.');
    valido = false;
  } else if (!validarEmail(emailValue)) {
    mostrarErro('email', 'Informe um e-mail válido (ex: seu@email.com).');
    valido = false;
  } else {
    limparErro('email');
  }

  if (!fields.dificuldade.el.value) {
    mostrarErro('dificuldade', 'Selecione qual a sua principal dor com dinheiro.');
    valido = false;
  } else {
    limparErro('dificuldade');
  }

  if (!fields.interesse.el.value) {
    mostrarErro('interesse', 'Informe seu interesse em testar.');
    valido = false;
  } else {
    limparErro('interesse');
  }

  return valido;
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      const primeiroErro = form.querySelector('.form-group.error input, .form-group.error select');
      if (primeiroErro) primeiroErro.focus();
      return;
    }

    const dados = {
      nome: fields.nome.el.value.trim(),
      email: fields.email.el.value.trim(),
      dificuldade: fields.dificuldade.el.value,
      interesse: fields.interesse.el.value,
      data: new Date().toISOString()
    };

    console.log('Novo cadastro no Beta (Organizaê):', dados);

    try {
      const leads = JSON.parse(localStorage.getItem('organizae_leads') || '[]');
      leads.push(dados);
      localStorage.setItem('organizae_leads', JSON.stringify(leads));
    } catch (err) {
      console.warn('Erro ao salvar localmente:', err);
    }

    if (formSuccess) {
      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    form.reset();
    Object.keys(fields).forEach(limparErro);
  });

  Object.keys(fields).forEach(campo => {
    if (fields[campo].el) {
      fields[campo].el.addEventListener('input', () => limparErro(campo));
      fields[campo].el.addEventListener('change', () => limparErro(campo));
    }
  });
}

// ===== 1. HERO: INTERAÇÃO DE GASTO RÁPIDO EM 3 SEGUNDOS =====
const heroTetoVal = document.getElementById('heroTetoVal') || document.querySelector('.panel-value');
const btnHeroChips = document.querySelectorAll('.btn-hero-chip');
const heroFeedback = document.getElementById('heroFeedback');
const heroFeedbackText = document.getElementById('heroFeedbackText');
const btnHeroReset = document.getElementById('btnHeroReset');
const heroFeedList = document.getElementById('heroFeedList');
const feedCount = document.getElementById('feedCount');
const baseHeroTeto = 48.50;
let currentHeroTeto = baseHeroTeto;
let currentFeedCount = 2;

if (heroTetoVal && btnHeroChips.length > 0) {
  btnHeroChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const gasto = parseFloat(chip.getAttribute('data-gasto')) || 0;
      const nome = chip.getAttribute('data-nome') || 'Gasto';
      const icon = chip.getAttribute('data-icon') || '⚡';
      
      currentHeroTeto = Math.max(0, currentHeroTeto - gasto);

      heroTetoVal.innerHTML = `R$ ${currentHeroTeto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <small>/ dia livre</small>`;
      heroTetoVal.style.transform = 'scale(1.04)';
      setTimeout(() => { heroTetoVal.style.transform = 'none'; }, 180);

      // Adiciona o gasto no Extrato mantendo sempre 2 itens para evitar salto de layout
      if (heroFeedList) {
        currentFeedCount++;
        if (feedCount) feedCount.textContent = `${currentFeedCount} registros`;
        
        const now = new Date();
        const horaStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        const novoItem = document.createElement('div');
        novoItem.className = 'hero-feed-item';
        novoItem.innerHTML = `
          <div class="feed-item-left">
            <span class="feed-icon">${icon}</span>
            <div>
              <strong>${nome}</strong>
              <span class="feed-time">${horaStr} • Registro em 2s</span>
            </div>
          </div>
          <span class="feed-val text-danger">- R$ ${gasto.toFixed(2).replace('.', ',')}</span>
        `;
        heroFeedList.prepend(novoItem);

        // Mantém sempre exatamente 2 itens (altura fixa estável de 88px)
        while (heroFeedList.children.length > 2) {
          heroFeedList.removeChild(heroFeedList.lastChild);
        }
      }

      if (heroFeedback && heroFeedbackText) {
        heroFeedback.classList.add('is-active');
        heroFeedbackText.innerHTML = `<strong>✓ ${nome} (-R$ ${gasto.toFixed(2).replace('.', ',')})</strong> salvo! Restam <strong>R$ ${currentHeroTeto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> livres.`;
      }
    });
  });

  if (btnHeroReset) {
    btnHeroReset.addEventListener('click', (e) => {
      e.preventDefault();
      currentHeroTeto = baseHeroTeto;
      currentFeedCount = 2;
      heroTetoVal.innerHTML = `R$ ${baseHeroTeto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <small>/ dia livre</small>`;
      if (feedCount) feedCount.textContent = '2 registros';
      if (heroFeedback && heroFeedbackText) {
        heroFeedback.classList.remove('is-active');
        heroFeedbackText.textContent = '↺ Dia resetado! Toque em um gasto acima para testar.';
      }
      if (heroFeedList) {
        heroFeedList.innerHTML = `
          <div class="hero-feed-item">
            <div class="feed-item-left">
              <span class="feed-icon">🍕</span>
              <div>
                <strong>Almoço no RU Campus</strong>
                <span class="feed-time">12:35 • Alimentação</span>
              </div>
            </div>
            <span class="feed-val text-danger">- R$ 14,00</span>
          </div>
          <div class="hero-feed-item">
            <div class="feed-item-left">
              <span class="feed-icon">☕</span>
              <div>
                <strong>Café na Biblioteca</strong>
                <span class="feed-time">09:15 • Rotina</span>
              </div>
            </div>
            <span class="feed-val text-danger">- R$ 6,00</span>
          </div>
        `;
      }
    });
  }

  // Controle de Pausa/Retomada do Ticker Vertical de Popups
  const tickerPauseBtn = document.getElementById('tickerPauseBtn');
  const heroTickerTrack = document.getElementById('heroTickerTrack');

  if (tickerPauseBtn && heroTickerTrack) {
    let isTickerPaused = false;
    tickerPauseBtn.addEventListener('click', () => {
      isTickerPaused = !isTickerPaused;
      heroTickerTrack.style.animationPlayState = isTickerPaused ? 'paused' : 'running';
      tickerPauseBtn.innerHTML = isTickerPaused
        ? '<span class="ticker-pause-icon">▶</span><span class="ticker-pause-text">Retomar</span>'
        : '<span class="ticker-pause-icon">⏸</span><span class="ticker-pause-text">Pausar</span>';
      tickerPauseBtn.setAttribute('aria-label', isTickerPaused ? 'Retomar rolagem' : 'Pausar rolagem');
    });
  }
}

// ===== 2. PROBLEMA: DIAGNÓSTICO INTERATIVO DE GARGALOS =====
const diagChips = document.querySelectorAll('.btn-diagnostic-chip');
const diagTitle = document.getElementById('diagTitle');
const diagDesc = document.getElementById('diagDesc');
const diagIcon = document.getElementById('diagIcon');

const diagData = {
  pix: {
    icon: '💸',
    title: 'Como o Organizaê resolve os Micro-Pix:',
    desc: 'O app divide sua renda líquida em um Teto Diário Seguro. Em vez de abrir o banco e se iludir com o saldo total, você bate o olho em 1 número e sabe exatamente se pode fazer aquele Pix sem aperto.'
  },
  cartao: {
    icon: '💳',
    title: 'Como o Organizaê protege sua Fatura:',
    desc: 'O app antecipa os gastos parcelados e provisiona sua margem de segurança antes do dia 10. Você nunca mais abre a fatura com taquicardia ou surpresa negativa.'
  },
  delivery: {
    icon: '🍕',
    title: 'Como o Organizaê controla Lanches e Cantina:',
    desc: 'Você define um teto semanal para alimentação externa. Ao abrir o iFood ou a cantina do campus, o app te mostra na hora quanto sobra da verba sem comprometer suas contas essenciais.'
  },
  role: {
    icon: '🍻',
    title: 'Como o Organizaê blinda seus Rolês:',
    desc: 'Com a regra de "Teto de Quinta a Sábado", você sai com a galera sabendo exatamente o valor que pode curtir sem precisar zerar a conta ou pedir socorro aos pais no dia seguinte.'
  }
};

if (diagChips.length > 0 && diagTitle && diagDesc) {
  diagChips.forEach(chip => {
    chip.addEventListener('click', () => {
      diagChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const tipo = chip.getAttribute('data-diag');
      if (diagData[tipo]) {
        if (diagIcon) diagIcon.textContent = diagData[tipo].icon;
        diagTitle.textContent = diagData[tipo].title;
        diagDesc.textContent = diagData[tipo].desc;
      }
    });
  });
}

// ===== 3. COMPARATIVO: ALTERNADOR DE REALIDADE & MEDIDOR DE ESTRESSE =====
const btnTabAntes = document.getElementById('btnTabAntes');
const btnTabDepois = document.getElementById('btnTabDepois');
const cardAntes = document.getElementById('cardAntes');
const cardDepois = document.getElementById('cardDepois');
const stressLabel = document.getElementById('stressLabel');
const stressStatus = document.getElementById('stressStatus');
const stressMeterFill = document.getElementById('stressMeterFill');
const btnSwitchToTranquilo = document.getElementById('btnSwitchToTranquilo');

function ativarModoAntes() {
  if (btnTabAntes) {
    btnTabAntes.classList.add('active');
    btnTabAntes.setAttribute('aria-selected', 'true');
  }
  if (btnTabDepois) {
    btnTabDepois.classList.remove('active');
    btnTabDepois.setAttribute('aria-selected', 'false');
  }
  
  // Mostra apenas o card do desespero e oculta o do Organizaê
  if (cardAntes) {
    cardAntes.style.display = 'block';
    cardAntes.classList.add('active-mode');
  }
  if (cardDepois) {
    cardDepois.style.display = 'none';
    cardDepois.classList.remove('active-mode');
  }

  if (stressLabel) stressLabel.innerHTML = 'Nível de Ansiedade Financeira: <strong style="color:#EF4444">Crítico (94%)</strong>';
  if (stressStatus) {
    stressStatus.textContent = 'Conta zerada no dia 20 • Medo constante do cartão';
    stressStatus.className = 'stress-meter-status text-red';
  }
  if (stressMeterFill) {
    stressMeterFill.style.width = '94%';
    stressMeterFill.className = 'stress-meter-fill fill-red';
  }
}

function ativarModoDepois() {
  if (btnTabDepois) {
    btnTabDepois.classList.add('active');
    btnTabDepois.setAttribute('aria-selected', 'true');
  }
  if (btnTabAntes) {
    btnTabAntes.classList.remove('active');
    btnTabAntes.setAttribute('aria-selected', 'false');
  }

  // Mostra o card do Organizaê no modo tranquilo e oculta o do desespero
  if (cardDepois) {
    cardDepois.style.display = 'block';
    cardDepois.classList.add('active-mode');
  }
  if (cardAntes) {
    cardAntes.style.display = 'none';
    cardAntes.classList.remove('active-mode');
  }

  if (stressLabel) stressLabel.innerHTML = 'Nível de Ansiedade Financeira: <strong style="color:#16A34A">Baixo (9%)</strong>';
  if (stressStatus) {
    stressStatus.textContent = 'Paz de espírito total • Foco nos estudos e rolês sem culpa';
    stressStatus.className = 'stress-meter-status text-green';
  }
  if (stressMeterFill) {
    stressMeterFill.style.width = '9%';
    stressMeterFill.className = 'stress-meter-fill fill-green';
  }
}

if (btnTabAntes && btnTabDepois) {
  btnTabAntes.addEventListener('click', ativarModoAntes);
  btnTabDepois.addEventListener('click', ativarModoDepois);
}

if (btnSwitchToTranquilo) {
  btnSwitchToTranquilo.addEventListener('click', ativarModoDepois);
}

// ===== 4. BENEFÍCIOS: TOUR INTERATIVO PELO APLICATIVO =====
const tourTabs = document.querySelectorAll('.tour-tab-card');
const tourScreens = {
  teto: document.getElementById('screenTeto'),
  rapido: document.getElementById('screenRapido'),
  radar: document.getElementById('screenRadar'),
  cofre: document.getElementById('screenCofre')
};

if (tourTabs.length > 0) {
  tourTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const screenId = tab.getAttribute('data-screen');

      tourTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      Object.keys(tourScreens).forEach(key => {
        if (tourScreens[key]) {
          if (key === screenId) {
            tourScreens[key].style.display = 'flex';
            tourScreens[key].style.animation = 'fadeInAnswer 0.25s ease';
          } else {
            tourScreens[key].style.display = 'none';
          }
        }
      });
    });
  });
}

// Interatividade Tela 1: Slider do Teto Diário
const demoTetoSlider = document.getElementById('demoTetoSlider');
const demoTetoVal = document.getElementById('demoTetoVal');
const demoSliderSpent = document.getElementById('demoSliderSpent');
const demoTetoStatus = document.getElementById('demoTetoStatus');
const demoTetoInsight = document.getElementById('demoTetoInsight');

if (demoTetoSlider && demoTetoVal) {
  updateSliderTrack(demoTetoSlider);
  demoTetoSlider.addEventListener('input', () => {
    updateSliderTrack(demoTetoSlider);
    const gasto = parseFloat(demoTetoSlider.value) || 0;
    const limiteDiario = 50;
    const sobra = limiteDiario - gasto;

    if (demoSliderSpent) demoSliderSpent.textContent = `Gastou R$ ${gasto}`;

    if (sobra >= 0) {
      demoTetoVal.textContent = `R$ ${sobra.toFixed(2).replace('.', ',')}`;
      demoTetoVal.style.color = '#4ADE80';
      if (demoTetoStatus) {
        demoTetoStatus.textContent = '✓ Gasto Livre Seguro';
        demoTetoStatus.className = 'screen-status-pill pill-safe';
      }
      if (demoTetoInsight) {
        demoTetoInsight.innerHTML = `Você gastou R$ ${gasto} hoje e ainda tem <strong>R$ ${sobra.toFixed(2).replace('.', ',')} livres</strong> para tomar café e curtir com amigos.`;
      }
    } else {
      demoTetoVal.textContent = `- R$ ${Math.abs(sobra).toFixed(2).replace('.', ',')}`;
      demoTetoVal.style.color = '#F87171';
      if (demoTetoStatus) {
        demoTetoStatus.textContent = '⚠️ Teto Ultrapassado';
        demoTetoStatus.className = 'screen-status-pill pill-danger';
      }
      if (demoTetoInsight) {
        demoTetoInsight.innerHTML = `Atenção: você ultrapassou seu teto de hoje em R$ ${Math.abs(sobra)}. O app já reprograma os próximos dias automaticamente para compensar!`;
      }
    }
  });
}

// Interatividade Tela 2: Registro em 5 Segundos
const btnMockCats = document.querySelectorAll('.btn-mock-cat');
const mockLogList = document.getElementById('mockLogList');

if (btnMockCats.length > 0 && mockLogList) {
  btnMockCats.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nome = btn.getAttribute('data-name');
      const val = btn.getAttribute('data-val');

      const novoItem = document.createElement('div');
      novoItem.className = 'log-item';
      novoItem.innerHTML = `<span>${nome}</span><strong>- R$ ${val},00</strong>`;
      mockLogList.prepend(novoItem);

      // Limita a 2 itens visíveis para manter altura fixa e estável
      while (mockLogList.children.length > 2) {
        mockLogList.removeChild(mockLogList.lastChild);
      }
    });
  });
}

// Interatividade Tela 4: Depósito no Cofrinho
const btnDepositDemo = document.getElementById('btnDepositDemo');
const cofreVal1 = document.getElementById('cofreVal1');
const cofreFill1 = document.getElementById('cofreFill1');
let saldoCofre1 = 620;

if (btnDepositDemo && cofreVal1 && cofreFill1) {
  btnDepositDemo.addEventListener('click', () => {
    if (saldoCofre1 < 800) {
      saldoCofre1 += 30;
      if (saldoCofre1 > 800) saldoCofre1 = 800;
      const pct = Math.round((saldoCofre1 / 800) * 100);

      cofreVal1.textContent = `R$ ${saldoCofre1} / R$ 800`;
      cofreFill1.style.width = `${pct}%`;

      btnDepositDemo.textContent = saldoCofre1 >= 800 ? '🎉 Meta da Reserva Concluída!' : `+ Guardar R$ 30 (R$ ${saldoCofre1}/800)`;
    }
  });
}

// ===== 5. BARRA FLUTUANTE DE VALOR (FLOATING VALUE DOCK - ÚNICA) =====
const floatingDock = document.getElementById('floatingDock');
const btnDismissDock = document.getElementById('btnDismissDock');
let dockDismissed = false;

if (btnDismissDock && floatingDock) {
  btnDismissDock.addEventListener('click', () => {
    dockDismissed = true;
    floatingDock.classList.remove('visible');
  });
}

if (floatingDock) {
  window.addEventListener('scroll', () => {
    if (dockDismissed) return;
    const scrollY = window.scrollY || window.pageYOffset;
    const formRect = formSection ? formSection.getBoundingClientRect() : null;
    const isNearForm = formRect && formRect.top < window.innerHeight && formRect.bottom > 0;

    // Aparece após 450px de rolagem e some perto do formulário
    if (scrollY > 450 && !isNearForm) {
      floatingDock.classList.add('visible');
    } else {
      floatingDock.classList.remove('visible');
    }
  }, { passive: true });
}

