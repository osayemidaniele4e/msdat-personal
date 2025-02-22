const state = {
  viewMode: localStorage.getItem('viewMode') || 'light',
  fontSize: localStorage.getItem('fontSize') || 'small',
  theme: localStorage.getItem('theme') || 'default',
};

const mutations = {
  SET_VIEW_MODE(localState, mode) {
    const newState = { ...localState, viewMode: mode };
    localStorage.setItem('viewMode', mode);
    Object.assign(localState, newState);
  },
  SET_FONT_SIZE(localState, size) {
    const newState = { ...localState, fontSize: size };
    localStorage.setItem('fontSize', size);
    Object.assign(localState, newState);
  },
  SET_THEME(localState, theme) {
    const newState = { ...localState, theme };
    localStorage.setItem('theme', theme);
    Object.assign(localState, newState);
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
