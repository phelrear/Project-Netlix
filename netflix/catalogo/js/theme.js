const THEME_KEY = 'netflix-theme-mode';
const themes = {
    dark: 'theme-dark',
    light: 'theme-light',
    abyss: 'theme-abyss'
};

export function applySavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    const body = document.body;
    body.classList.remove(...Object.values(themes));
    body.classList.add(themes[savedTheme] || themes.dark);
}
