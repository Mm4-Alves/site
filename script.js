// ============================================
// MENU RESPONSIVO
// ============================================
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle?.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
  });
});

// ============================================
// SISTEMA DE ABAS
// ============================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const tabName = this.getAttribute('data-tab');
    
    // Remove classe active de todos
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    // Adiciona classe active ao clicado
    this.classList.add('active');
    document.getElementById(tabName).classList.add('active');
  });
});

// ============================================
// DRAG AND DROP DE FOTOS
// ============================================
const dropArea = document.getElementById('dropArea');
const inputImagens = document.getElementById('imagens');
const preview = document.querySelector('.preview-container');
const previewContent = document.getElementById('previewContent');

if (dropArea) {
  // Eventos de Drag and Drop
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight(e) {
    dropArea.classList.add('dragover');
  }

  function unhighlight(e) {
    dropArea.classList.remove('dragover');
  }

  // Processar arquivos soltos
  dropArea.addEventListener('drop', handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    inputImagens.files = files;
    
    // Trigger change event
    const event = new Event('change', { bubbles: true });
    inputImagens.dispatchEvent(event);
  }

  // Permitir clicar na área para selecionar
  dropArea.addEventListener('click', function() {
    inputImagens.click();
  });
}

// ============================================
// PREVIEW DE FOTOS
// ============================================
if (inputImagens) {
  inputImagens.addEventListener('change', function(e) {
    previewContent.innerHTML = '';
    const files = e.target.files;
    
    if (files.length > 0) {
      preview.classList.add('show');
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function(event) {
          const item = document.createElement('div');
          item.classList.add('preview-item');
          
          const img = document.createElement('img');
          img.src = event.target.result;
          img.alt = file.name;
          
          const fileName = document.createElement('p');
          fileName.textContent = file.name;
          
          item.appendChild(img);
          item.appendChild(fileName);
          previewContent.appendChild(item);
        };
        
        reader.readAsDataURL(file);
      }
    } else {
      preview.classList.remove('show');
    }
  });
}

// ============================================
// FORMULÁRIO DE FOTOS
// ============================================
const formFotos = document.getElementById('formFotos');

if (formFotos) {
  formFotos.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const imagens = document.getElementById('imagens').files;
    
    if (imagens.length === 0) {
      mostrarNotificacao('Por favor, selecione pelo menos uma foto!', 'erro');
      return;
    }
    
    // Simulando envio
    mostrarNotificacao(`✅ Fotos recebidas! (${imagens.length} foto${imagens.length > 1 ? 's' : ''})`, 'sucesso');
    
    // Limpar formulário
    formFotos.reset();
    preview.classList.remove('show');
    dropArea.classList.remove('dragover');
  });
}

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================
const formContato = document.getElementById('formContato');

if (formContato) {
  formContato.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nomeContato').value;
    const email = document.getElementById('emailContato').value;
    const mensagem = document.getElementById('mensagemContato').value;
    
    // Validar email
    if (!validarEmail(email)) {
      mostrarNotificacao('Por favor, insira um email válido!', 'erro');
      return;
    }
    
    // Simular envio de email
    console.log('Mensagem enviada:', { nome, email, mensagem });
    mostrarNotificacao(`✅ Mensagem enviada com sucesso! Obrigado, ${nome}!`, 'sucesso');
    
    // Limpar formulário
    formContato.reset();
  });
}

// ============================================
// VALIDAÇÃO DE EMAIL
// ============================================
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ============================================
// NOTIFICAÇÕES
// ============================================
function mostrarNotificacao(mensagem, tipo = 'info') {
  // Remove notificação anterior se existir
  const notificacaoAnterior = document.querySelector('.notificacao');
  if (notificacaoAnterior) {
    notificacaoAnterior.remove();
  }

  const notificacao = document.createElement('div');
  notificacao.classList.add('notificacao', tipo);
  notificacao.innerHTML = `
    <p>${mensagem}</p>
    <button onclick="this.parentElement.remove()">×</button>
  `;
  
  document.body.appendChild(notificacao);
  
  // Auto remover após 5 segundos
  setTimeout(() => {
    if (notificacao.parentElement) {
      notificacao.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notificacao.remove(), 300);
    }
  }, 5000);
}

// ============================================
// EFEITO DE SCROLL (Smooth scrolling)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ============================================
// ANIMAÇÃO ON SCROLL (Fade in ao rolar)
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Aplicar observer aos cards e elementos
document.querySelectorAll('.card, .valor').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'all 0.6s ease-out';
  observer.observe(element);
});

// ============================================
// ADICIONAR ESTILOS PARA NOTIFICAÇÃO
// ============================================
const style = document.createElement('style');
style.textContent = `
  .notificacao {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
    max-width: 400px;
  }

  .notificacao p {
    margin: 0;
    font-weight: 500;
  }

  .notificacao button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
  }

  .notificacao.sucesso {
    background: #d4edda;
    border-left: 4px solid #28a745;
    color: #155724;
  }

  .notificacao.erro {
    background: #f8d7da;
    border-left: 4px solid #dc3545;
    color: #721c24;
  }

  .notificacao.info {
    background: #d1ecf1;
    border-left: 4px solid #17a2b8;
    color: #0c5460;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(400px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(400px);
    }
  }

  @media (max-width: 600px) {
    .notificacao {
      left: 10px;
      right: 10px;
      top: 10px;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// ANIMAÇÃO DE PÁGINA CARREGADA
// ============================================
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ============================================
// Analytics SIMPLES (Log de eventos)
// ============================================
function rastrearEvento(categoria, acao, label) {
  console.log(`📊 Evento: ${categoria} > ${acao} > ${label}`);
}

// Exemplo de rastreamento
formFotos?.addEventListener('submit', () => {
  rastrearEvento('Fotos', 'Upload', 'Fotos enviadas com sucesso');
});

formContato?.addEventListener('submit', () => {
  rastrearEvento('Contato', 'Envio', 'Mensagem de contato enviada');
});

// ============================================
// TEMA ESCURO (OPCIONAL - para adicionar depois)
// ============================================
function ativarTemaEscuro() {
  document.documentElement.setAttribute('data-tema', 'escuro');
  localStorage.setItem('tema', 'escuro');
}

function desativarTemaEscuro() {
  document.documentElement.removeAttribute('data-tema');
  localStorage.setItem('tema', 'claro');
}

// Verificar tema salvo
if (localStorage.getItem('tema') === 'escuro') {
  ativarTemaEscuro();
}

console.log('✅ Script carregado com sucesso!');
