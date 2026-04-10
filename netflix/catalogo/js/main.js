import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';
import { applySavedTheme } from './theme.js';

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    const perfilSelecionado = getQueryParam('perfil') || localStorage.getItem('perfilAtivo');

    if (perfilSelecionado !== '2') {
        alert('Acesso restrito: somente o Perfil 2 pode ver o catálogo.');
        window.location.href = '../index.html';
        return;
    }

    localStorage.setItem('perfilAtivo', '2');
    localStorage.setItem('perfilAtivoNome', 'Perfil 2');
    localStorage.setItem('perfilAtivoImagem', '/assets/maomao.png');

    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        
        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    const container = document.getElementById('main-content');
    
    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
