// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.hidden = isOpen;
});

// Fecha o menu mobile ao clicar em um link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
  });
});

// ===== SCROLL SUAVE PARA BOTÕES COM data-scroll =====
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.getAttribute('data-scroll'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== ANIMAÇÃO DE ENTRADA (Intersection Observer) =====
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeElements.forEach(el => observer.observe(el));

// ===== VALIDAÇÃO E ENVIO DO FORMULÁRIO =====
const form = document.getElementById('interesseForm');
const formSuccess = document.getElementById('formSuccess');

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
  el.closest('.form-group').classList.add('error');
  errorEl.textContent = mensagem;
  el.setAttribute('aria-invalid', 'true');
}

function limparErro(campo) {
  const { el, errorEl } = fields[campo];
  el.closest('.form-group').classList.remove('error');
  errorEl.textContent = '';
  el.removeAttribute('aria-invalid');
}

function validarFormulario() {
  let valido = true;

  if (!fields.nome.el.value.trim()) {
    mostrarErro('nome', 'Por favor, informe seu nome.');
    valido = false;
  } else {
    limparErro('nome');
  }

  const emailValue = fields.email.el.value.trim();
  if (!emailValue) {
    mostrarErro('email', 'Por favor, informe seu e-mail.');
    valido = false;
  } else if (!validarEmail(emailValue)) {
    mostrarErro('email', 'Informe um e-mail válido.');
    valido = false;
  } else {
    limparErro('email');
  }

  if (!fields.dificuldade.el.value) {
    mostrarErro('dificuldade', 'Selecione sua principal dificuldade.');
    valido = false;
  } else {
    limparErro('dificuldade');
  }

  if (!fields.interesse.el.value) {
    mostrarErro('interesse', 'Selecione seu nível de interesse.');
    valido = false;
  } else {
    limparErro('interesse');
  }

  return valido;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validarFormulario()) {
    // Foca no primeiro campo com erro
    const primeiroErro = form.querySelector('.form-group.error input, .form-group.error select');
    if (primeiroErro) primeiroErro.focus();
    return;
  }

  // Simula o envio (sem backend real)
  const dados = {
    nome: fields.nome.el.value.trim(),
    email: fields.email.el.value.trim(),
    dificuldade: fields.dificuldade.el.value,
    interesse: fields.interesse.el.value,
    data: new Date().toISOString()
  };

  console.log('Novo interesse cadastrado (simulado):', dados);

  // Salva localmente para fins de demonstração acadêmica
  try {
    const leads = JSON.parse(localStorage.getItem('organizae_leads') || '[]');
    leads.push(dados);
    localStorage.setItem('organizae_leads', JSON.stringify(leads));
  } catch (err) {
    console.warn('Não foi possível salvar localmente:', err);
  }

  // Exibe mensagem de sucesso
  formSuccess.hidden = false;
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Limpa os campos
  form.reset();
  Object.keys(fields).forEach(limparErro);

  // Oculta a mensagem após alguns segundos (opcional)
  setTimeout(() => {
    formSuccess.hidden = true;
  }, 8000);
});

// Remove erro ao digitar/selecionar
Object.keys(fields).forEach(campo => {
  fields[campo].el.addEventListener('input', () => limparErro(campo));
  fields[campo].el.addEventListener('change', () => limparErro(campo));
});
