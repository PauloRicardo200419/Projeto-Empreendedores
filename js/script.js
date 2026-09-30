/**
 * HospedaFácil — Interatividades e Lógica de Negócio
 * Projeto Acadêmico: Mackenzie • Projetos Empreendedores
 * Integrantes: Thaís Cristine, Paulo Ricardo, Lucas Iglezias
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MENU MOBILE & NAVEGAÇÃO
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.hidden = isOpen;
    });

    mobileMenu.querySelectorAll('a, button').forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });

    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.hidden) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      }
    });
  }

  // ==========================================
  // 2. SCROLL SUAVE PARA LINKS COM data-scroll
  // ==========================================
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = btn.getAttribute('data-scroll');
      const targetEl = document.querySelector(targetSelector);
      if (targetEl) {
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 3. HEADER SCROLL & SCROLLSPY
  // ==========================================
  const header = document.getElementById('mainHeader');
  const navPills = document.querySelectorAll('.nav-item-pill');
  const sections = [
    'como-funciona',
    'demonstracao',
    'calculadora',
    'pesquisa-validacao',
    'planos',
    'faq'
  ];

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // ScrollSpy
    const scrollPos = scrollY + 160;
    sections.forEach(id => {
      const sec = document.getElementById(id);
      if (sec) {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navPills.forEach(pill => {
            if (pill.getAttribute('href') === `#${id}`) {
              pill.classList.add('active');
            } else if (!pill.classList.contains('highlight-pill')) {
              pill.classList.remove('active');
            }
          });
        }
      }
    });
  }, { passive: true });

  // ==========================================
  // 4. SISTEMA DE NOTIFICAÇÃO TOAST
  // ==========================================
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.hidden = false;

    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 3200);
  }

  // ==========================================
  // 5. COPIAR SENHA DO WI-FI (Hero e Smartphone)
  // ==========================================
  const copyWifiHero = document.getElementById('heroCopyWifiBtn');
  const copyWifiPhone = document.getElementById('phoneCopyWifiBtn');
  const wifiPass = 'praia_sol_2026';

  function copyPasswordToClipboard() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(wifiPass).then(() => {
        showToast('Senha do Wi-Fi copiada: ' + wifiPass);
      }).catch(() => {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    const tempInput = document.createElement('input');
    tempInput.value = wifiPass;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('Senha do Wi-Fi copiada: ' + wifiPass);
  }

  if (copyWifiHero) copyWifiHero.addEventListener('click', copyPasswordToClipboard);
  if (copyWifiPhone) copyWifiPhone.addEventListener('click', copyPasswordToClipboard);

  // ==========================================
  // 6. PROTÓTIPO INTERATIVO DO GUIA (SMARTPHONE)
  // ==========================================
  const controlTabs = document.querySelectorAll('.control-tab-btn');
  const phoneChips = document.querySelectorAll('.chip-item');
  const screenViews = document.querySelectorAll('.screen-view');

  function switchPhoneScreen(screenKey) {
    // Atualiza botões laterais
    controlTabs.forEach(btn => {
      const match = btn.getAttribute('data-screen') === screenKey;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', String(match));
    });

    // Atualiza chips internos do celular
    phoneChips.forEach(chip => {
      const match = chip.getAttribute('data-target') === screenKey;
      chip.classList.toggle('active', match);
    });

    // Atualiza a tela visível dentro do celular
    screenViews.forEach(view => {
      if (view.id === `screen-${screenKey}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Rola o conteúdo do celular para o topo
    const phoneScreen = document.getElementById('phoneScreen');
    if (phoneScreen) {
      phoneScreen.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  controlTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-screen');
      if (key) switchPhoneScreen(key);
    });
  });

  phoneChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-target');
      if (key) switchPhoneScreen(key);
    });
  });

  // ==========================================
  // 7. CALCULADORA DE ECONOMIA DO ANFITRIÃO
  // ==========================================
  const sliderProps = document.getElementById('numProperties');
  const sliderBookings = document.getElementById('numBookings');
  const valPropsBubble = document.getElementById('valProperties');
  const valBookingsBubble = document.getElementById('valBookings');
  const resHours = document.getElementById('resHoursSaved');
  const resMsgs = document.getElementById('resMessagesPrevented');

  function updateCalculator() {
    if (!sliderProps || !sliderBookings) return;

    const props = parseInt(sliderProps.value, 10);
    const bookings = parseInt(sliderBookings.value, 10);

    // Atualiza balões de texto
    valPropsBubble.textContent = props === 1 ? '1 imóvel' : `${props} imóveis`;
    valBookingsBubble.textContent = bookings === 1 ? '1 reserva' : `${bookings} reservas`;

    // Cálculo estimado:
    // Média de 6 mensagens de dúvidas por reserva (Wi-Fi, ar, portão, regras, etc.)
    // Duração média: 15 min de atenção/interrupção por reserva
    const totalReservations = props * bookings;
    const estimatedMsgs = totalReservations * 6;
    const hoursSaved = Math.round(totalReservations * 1.5);

    resHours.textContent = hoursSaved <= 1 ? '1 hora' : `${hoursSaved} horas`;
    resMsgs.textContent = `${estimatedMsgs} mensagens`;
  }

  if (sliderProps && sliderBookings) {
    sliderProps.addEventListener('input', updateCalculator);
    sliderBookings.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // ==========================================
  // 8. PESQUISA DE MERCADO INTERATIVA (BRANCHING SURVEY)
  // ==========================================
  const surveyForm = document.getElementById('hospedaSurveyForm');
  const stepBadge = document.getElementById('stepBadge');
  const stepTitleText = document.getElementById('stepTitleText');
  const progressBar = document.getElementById('surveyProgressBar');

  const step1 = document.getElementById('surveyStep1');
  const stepGuest = document.getElementById('surveyStepGuest');
  const stepHost = document.getElementById('surveyStepHost');
  const stepLead = document.getElementById('surveyStepLead');
  const stepSuccess = document.getElementById('surveyStepSuccess');

  const btnNextStep1 = document.getElementById('btnNextStep1');
  const btnNextFromGuest = document.getElementById('btnNextFromGuest');
  const btnNextFromHost = document.getElementById('btnNextFromHost');
  const btnBackToStep1FromGuest = document.getElementById('btnBackToStep1FromGuest');
  const btnBackFromHost = document.getElementById('btnBackFromHost');
  const btnBackToQuestions = document.getElementById('btnBackToQuestions');
  const btnRestartSurvey = document.getElementById('btnRestartSurvey');

  // Estado da Pesquisa
  let surveyState = {
    userType: '', // 'guest_only', 'host_only', 'both', 'neither'
    currentStepId: 'surveyStep1',
    stepsList: ['surveyStep1'],
    currentStepIndex: 0
  };

  // Estilização interativa das opções ao clicar
  document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        // Limpa irmãos do mesmo grupo
        const name = radio.name;
        document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
          const parentCard = r.closest('.option-card');
          if (parentCard) parentCard.classList.remove('selected');
        });
        card.classList.add('selected');
      }
    });
  });

  // Lógica dos Multiselect Pills
  document.querySelectorAll('.multiselect-pill').forEach(pill => {
    const chk = pill.querySelector('input[type="checkbox"]');
    pill.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        chk.checked = !chk.checked;
      }
      pill.classList.toggle('selected', chk.checked);

      // Regra especial: se marcou "nenhum", desmarca outros
      if (chk.value === 'nenhum' && chk.checked) {
        const parentGrid = pill.closest('.options-grid-multiselect');
        parentGrid.querySelectorAll('.multiselect-pill').forEach(otherPill => {
          const otherChk = otherPill.querySelector('input[type="checkbox"]');
          if (otherChk.value !== 'nenhum') {
            otherChk.checked = false;
            otherPill.classList.remove('selected');
          }
        });
      } else if (chk.value !== 'nenhum' && chk.checked) {
        // Se marcou outra opção, desmarca o "nenhum"
        const parentGrid = pill.closest('.options-grid-multiselect');
        const nenhumPill = parentGrid.querySelector('input[value="nenhum"]');
        if (nenhumPill && nenhumPill.checked) {
          nenhumPill.checked = false;
          nenhumPill.closest('.multiselect-pill').classList.remove('selected');
        }
      }
    });
  });

  function showSurveyStep(targetStepId) {
    // Esconde todos
    [step1, stepGuest, stepHost, stepLead, stepSuccess].forEach(step => {
      if (step) step.classList.remove('active');
    });

    const target = document.getElementById(targetStepId);
    if (target) {
      target.classList.add('active');
      surveyState.currentStepId = targetStepId;
      surveyState.currentStepIndex = surveyState.stepsList.indexOf(targetStepId);

      // Atualiza progresso
      updateSurveyProgressUI();

      // Scroll para a área do questionário suavemente
      const surveySec = document.getElementById('pesquisa-validacao');
      if (surveySec) {
        const topPos = surveySec.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
      }
    }
  }

  function updateSurveyProgressUI() {
    const totalSteps = surveyState.stepsList.length;
    const currentIdx = surveyState.currentStepIndex + 1;
    const pct = Math.round((currentIdx / totalSteps) * 100);

    if (progressBar) {
      progressBar.style.width = `${pct}%`;
    }

    if (stepBadge) {
      stepBadge.textContent = `Etapa ${currentIdx} de ${totalSteps}`;
    }

    if (stepTitleText) {
      switch (surveyState.currentStepId) {
        case 'surveyStep1':
          stepTitleText.textContent = 'Identificação do seu perfil';
          break;
        case 'surveyStepGuest':
          stepTitleText.textContent = 'Experiência como Hóspede';
          break;
        case 'surveyStepHost':
          stepTitleText.textContent = 'Experiência como Anfitrião';
          break;
        case 'surveyStepLead':
          stepTitleText.textContent = 'Conclusão & Acesso Antecipado';
          break;
        case 'surveyStepSuccess':
          stepTitleText.textContent = 'Pesquisa Concluída com Sucesso!';
          if (stepBadge) stepBadge.textContent = 'Finalizado';
          break;
      }
    }
  }

  // --- BOTÃO AVANÇAR DA ETAPA 1 (Triagem) ---
  if (btnNextStep1) {
    btnNextStep1.addEventListener('click', () => {
      const faixaEtaria = document.querySelector('input[name="faixa_etaria"]:checked');
      const hospedeResp = document.querySelector('input[name="ja_se_hospedou"]:checked');
      const anfitriaoResp = document.querySelector('input[name="ja_foi_anfitriao"]:checked');

      if (!faixaEtaria || !hospedeResp || !anfitriaoResp) {
        showToast('Por favor, responda às três perguntas para continuar.');
        return;
      }

      const isGuest = hospedeResp.value === 'sim';
      const isHost = anfitriaoResp.value === 'sim_atualmente' || anfitriaoResp.value === 'sim_passado';

      // Monta dinamicamente a trilha de passos
      surveyState.stepsList = ['surveyStep1'];

      if (isGuest && isHost) {
        surveyState.userType = 'both';
        surveyState.stepsList.push('surveyStepGuest', 'surveyStepHost', 'surveyStepLead');
        showSurveyStep('surveyStepGuest');
      } else if (isGuest && !isHost) {
        surveyState.userType = 'guest_only';
        surveyState.stepsList.push('surveyStepGuest', 'surveyStepLead');
        showSurveyStep('surveyStepGuest');
      } else if (!isGuest && isHost) {
        surveyState.userType = 'host_only';
        surveyState.stepsList.push('surveyStepHost', 'surveyStepLead');
        showSurveyStep('surveyStepHost');
      } else {
        // Nem hóspede, nem anfitrião
        surveyState.userType = 'neither';
        surveyState.stepsList.push('surveyStepLead');
        showSurveyStep('surveyStepLead');
      }
    });
  }

  // --- NAVEGAÇÃO DA TRILHA HÓSPEDE ---
  if (btnNextFromGuest) {
    btnNextFromGuest.addEventListener('click', () => {
      if (surveyState.userType === 'both') {
        showSurveyStep('surveyStepHost');
      } else {
        showSurveyStep('surveyStepLead');
      }
    });
  }

  if (btnBackToStep1FromGuest) {
    btnBackToStep1FromGuest.addEventListener('click', () => {
      showSurveyStep('surveyStep1');
    });
  }

  // --- NAVEGAÇÃO DA TRILHA ANFITRIÃO ---
  if (btnNextFromHost) {
    btnNextFromHost.addEventListener('click', () => {
      showSurveyStep('surveyStepLead');
    });
  }

  if (btnBackFromHost) {
    btnBackFromHost.addEventListener('click', () => {
      if (surveyState.userType === 'both') {
        showSurveyStep('surveyStepGuest');
      } else {
        showSurveyStep('surveyStep1');
      }
    });
  }

  // --- VOLTAR DO FORMULÁRIO FINAL DE LEAD ---
  if (btnBackToQuestions) {
    btnBackToQuestions.addEventListener('click', () => {
      if (surveyState.userType === 'both' || surveyState.userType === 'host_only') {
        showSurveyStep('surveyStepHost');
      } else if (surveyState.userType === 'guest_only') {
        showSurveyStep('surveyStepGuest');
      } else {
        showSurveyStep('surveyStep1');
      }
    });
  }

  // --- SUBMISSÃO FINAL DO FORMULÁRIO ---
  if (surveyForm) {
    surveyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Coleta todas as respostas para salvar no localStorage
      const formData = new FormData(surveyForm);
      const surveyData = {
        timestamp: new Date().toISOString(),
        faixa_etaria: formData.get('faixa_etaria'),
        ja_se_hospedou: formData.get('ja_se_hospedou'),
        ja_foi_anfitriao: formData.get('ja_foi_anfitriao'),
        // Respostas Hóspede
        guest_dificuldade_info: formData.get('guest_dificuldade_info'),
        guest_tipos_info: formData.getAll('guest_tipos_info'),
        guest_perguntou_ao_anfitriao: formData.get('guest_perguntou_ao_anfitriao'),
        guest_utilizaria_guia: formData.get('guest_utilizaria_guia'),
        // Respostas Anfitrião
        host_como_administra: formData.get('host_como_administra'),
        host_situacoes_duvidas: formData.getAll('host_situacoes_duvidas'),
        host_acredita_reduzir_msgs: formData.get('host_acredita_reduzir_msgs'),
        host_interesse_utilizar: formData.get('host_interesse_utilizar'),
        // Dados de Lead (Opcionais)
        lead_nome: formData.get('lead_nome'),
        lead_email: formData.get('lead_email'),
        lead_whatsapp: formData.get('lead_whatsapp'),
        lead_sugestao: formData.get('lead_sugestao'),
        lead_opt_in: formData.get('lead_opt_in') ? true : false
      };

      // Salva no armazenamento local do navegador
      try {
        const previousEntries = JSON.parse(localStorage.getItem('hospedafacil_surveys') || '[]');
        previousEntries.push(surveyData);
        localStorage.setItem('hospedafacil_surveys', JSON.stringify(previousEntries));
      } catch (err) {
        console.warn('Erro ao salvar no localStorage:', err);
      }

      // Adiciona passo de sucesso na lista e exibe
      surveyState.stepsList.push('surveyStepSuccess');
      showSurveyStep('surveyStepSuccess');
      showToast('Pesquisa enviada com sucesso! Muito obrigado!');
    });
  }

  // --- BOTÃO RECOMEÇAR PESQUISA ---
  if (btnRestartSurvey) {
    btnRestartSurvey.addEventListener('click', () => {
      if (surveyForm) surveyForm.reset();
      document.querySelectorAll('.option-card, .multiselect-pill').forEach(el => {
        el.classList.remove('selected');
      });
      surveyState.stepsList = ['surveyStep1'];
      showSurveyStep('surveyStep1');
    });
  }

  // ==========================================
  // 9. FAQ ACCORDION ACESSÍVEL
  // ==========================================
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const content = trigger.nextElementSibling;

      // Fecha outros itens
      faqTriggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherTrigger.nextElementSibling) {
            otherTrigger.nextElementSibling.hidden = true;
          }
        }
      });

      // Alterna o clicado
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (content) {
        content.hidden = isExpanded;
      }
    });
  });

  // ==========================================
  // 10. ANIMAÇÃO DE ENTRADA (IntersectionObserver)
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

});
