/**
 * ThemeManager - Sistema de tema dinâmico por HSL.
 *
 * Remove dependência de temas predefinidos e usa apenas variáveis CSS.
 */

export function setCustomTheme(huePrimary, hueNeutral = huePrimary) {
  const root = document.documentElement;
  root.style.setProperty('--hue-primary', huePrimary);
  root.style.setProperty('--hue-neutral', hueNeutral);

  localStorage.setItem('preferred-theme', 'custom');
  localStorage.setItem('custom-hue-primary', String(huePrimary));
  localStorage.setItem('custom-hue-neutral', String(hueNeutral));

  return true;
}

export function restoreTheme() {
  const preferredTheme = localStorage.getItem('preferred-theme');
  if (preferredTheme !== 'custom') {
    return false;
  }

  const huePrimary = Number(localStorage.getItem('custom-hue-primary') ?? 339);
  const hueNeutral = Number(localStorage.getItem('custom-hue-neutral') ?? huePrimary);
  setCustomTheme(huePrimary, hueNeutral);
  return true;
}

export default {
  setCustomTheme,
  restoreTheme,
};
