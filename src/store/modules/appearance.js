const state = {
  viewMode: localStorage.getItem('viewMode') || 'light',
  fontSize: localStorage.getItem('fontSize') || 'small',
  theme: localStorage.getItem('theme') || 'default',
};

// Helper function to get system preference
const getSystemPreference = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

// Helper function to apply view mode to DOM
const applyViewModeToDOM = (mode) => {
  if (typeof document === 'undefined') return;
  
  let effectiveMode = mode;
  if (mode === 'system') {
    effectiveMode = getSystemPreference() ? 'dark' : 'light';
  }
  
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(effectiveMode);
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(effectiveMode);
  document.documentElement.setAttribute('data-view-mode', effectiveMode);
};

// Helper function to apply font size to DOM
const applyFontSizeToDOM = (size) => {
  if (typeof document === 'undefined') return;
  
  const fontSizeMap = {
    small: '14px',
    medium: '18px',
    large: '22px',
  };
  document.documentElement.style.fontSize = fontSizeMap[size] || '16px';
  document.documentElement.setAttribute('data-font-size', size);
};

// Helper function to apply theme to DOM
const applyThemeToDOM = (theme) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
};

const mutations = {
  SET_VIEW_MODE(localState, mode) {
    const newState = { ...localState, viewMode: mode };
    localStorage.setItem('viewMode', mode);
    Object.assign(localState, newState);
    applyViewModeToDOM(mode);
  },
  SET_FONT_SIZE(localState, size) {
    const newState = { ...localState, fontSize: size };
    localStorage.setItem('fontSize', size);
    Object.assign(localState, newState);
    applyFontSizeToDOM(size);
  },
  SET_THEME(localState, theme) {
    const newState = { ...localState, theme };
    localStorage.setItem('theme', theme);
    Object.assign(localState, newState);
    applyThemeToDOM(theme);
  },
};

const actions = {
  setViewMode({ commit }, mode) {
    commit('SET_VIEW_MODE', mode);
  },
  setFontSize({ commit }, size) {
    commit('SET_FONT_SIZE', size);
  },
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme);
  },
  // Initialize appearance settings from localStorage
  initAppearance({ state: localState }) {
    applyViewModeToDOM(localState.viewMode);
    applyFontSizeToDOM(localState.fontSize);
    applyThemeToDOM(localState.theme);
  },
};

const getters = {
  viewMode: (localState) => localState.viewMode,
  fontSize: (localState) => localState.fontSize,
  theme: (localState) => localState.theme,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
