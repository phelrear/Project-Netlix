const THEME_KEY = 'netflix-theme-mode';
const themeButtons = document.querySelectorAll('.theme-button');
const body = document.body;

const themes = {
  dark: 'theme-dark',
  light: 'theme-light',
  abyss: 'theme-abyss'
};

const profiles = {
  1: {
    nome: 'Perfil 1',
    imagem: '/assets/ThorfinnVinlandArc2.png'
  },
  2: {
    nome: 'Perfil 2',
    imagem: '/assets/maomao.png'
  }
};

function updateActiveButton(theme) {
  themeButtons.forEach((button) => {
    const isActive = button.dataset.theme === theme;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function applyTheme(theme) {
  const selected = themes[theme] ? theme : 'dark';
  body.classList.remove(...Object.values(themes));
  body.classList.add(themes[selected]);
  updateActiveButton(selected);
  localStorage.setItem(THEME_KEY, selected);
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme || 'dark');
}

function handleProfileLink(event) {
  event.preventDefault();
  const profileId = event.currentTarget.dataset.profile;

  const perfil = profiles[profileId];
  if (!perfil) return;

  localStorage.setItem('perfilAtivo', profileId);
  localStorage.setItem('perfilAtivoNome', perfil.nome);
  localStorage.setItem('perfilAtivoImagem', perfil.imagem);

  const pageMap = {
    '1': 'catalogo/catalogo0.html?perfil=1',
    '2': 'catalogo/catalogo.html?perfil=2'
  };

  window.location.href = pageMap[profileId] || '../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  loadTheme();

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyTheme(button.dataset.theme);
    });
  });

  const profileLinks = document.querySelectorAll('.profile-link[data-profile]');
  profileLinks.forEach((link) => {
    link.addEventListener('click', handleProfileLink);
  });
});
