import {
  getIndicators,
  getDatasources,
  getValueTypes,
  getLocations,
  getDashboards,
  getData,
  deleteData,
  saveDashboard,
  deleteDashboard,
} from '../dashboard/utils/dashboardRequests';

const dashboardState = () => ({
  indicators: [],
  datasources: [],
  valueTypes: [],
  locations: [],
  dashboards: [],
  data: {},
  error: {
    indicators: false,
    datasources: false,
    locations: false,
    valueTypes: false,
    dashboards: false,
    data: false,
    upload: false,
  },
});

const mutations = {
  SET_INDICATORS: (state, payload) => {
    state.indicators = payload;
  },
  SET_DATASOURCES: (state, payload) => {
    state.datasources = payload;
  },
  SET_VALUE_TYPES: (state, payload) => {
    state.valueTypes = payload;
  },
  SET_LOCATIONS: (state, payload) => {
    state.locations = payload;
  },
  SET_LOADED: (state, payload) => {
    Object.keys(payload).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        const param = state[`${key}s`].find((p) => p.id === payload[key]);
        if (param) param.loaded = true;
      }
    });
  },
  SET_DASHBOARDS: (state, payload) => {
    state.dashboards = payload;
  },
  SET_DATA: (state, payload) => {
    const newData = {};
    payload.reduce((acc, data) => {
      acc[data.id] = data;
      return acc;
    }, newData);
    state.data = {
      ...state.data,
      ...newData,
    };
  },
  DELETE_DATA: (state, id) => {
    delete state.data[id];
  },
  SET_ERROR: (state, payload) => {
    state.error = {
      ...state.error,
      ...payload,
    };
  },
};

const actions = {
  /**
   * load indicators from database and add to store
   * @param {object} param0
   */
  async loadIndicators({ commit }) {
    await getIndicators()
      .then((response) => {
        const { results } = response.data;
        commit('SET_INDICATORS', results);
        commit('SET_ERROR', { indicators: false });
      })
      .catch((err) => {
        console.log(err);
        commit('SET_ERROR', { indicators: true });
      });
  },
  /**
   * load datasources from database and add to store
   * @param {object} param0
   */
  async loadDatasources({ commit }) {
    await getDatasources()
      .then((response) => {
        const { results } = response.data;
        commit('SET_DATASOURCES', results);
        commit('SET_ERROR', { datasources: false });
      })
      .catch((err) => {
        console.log(err);
        commit('SET_ERROR', { datasources: true });
      });
  },
  /**
   *
   * @param {object} param0
   */
  async loadValueTypes({ commit }) {
    await getValueTypes()
      .then((response) => {
        const { results } = response.data;
        commit('SET_VALUE_TYPES', results);
        commit('SET_ERROR', { valueTypes: false });
      })
      .catch((err) => {
        console.log(err);
        commit('SET_ERROR', { valueTypes: true });
      });
  },
  /**
   *
   * @param {object} param0
   */
  async loadLocations({ commit }) {
    await getLocations()
      .then((response) => {
        const { results } = response.data;
        commit('SET_LOCATIONS', results);
        commit('SET_ERROR', { locations: false });
      })
      .catch((err) => {
        console.log(err);
        commit('SET_ERROR', { locations: true });
      });
  },
  /**
   *
   * @param {object} param0
   */
  async loadData({ commit, dispatch }, payload) {
    await getData(payload)
      .then(async (response) => {
        const { results } = response.data;
        // console.log("request data length: ", results.length, response);
        commit('SET_DATA', results);
        if (response.data.next) {
          console.log('loading next');
          await dispatch('loadData', { url: response.data.next });
        }
        commit('SET_ERROR', { data: false });
      })
      .catch((err) => {
        console.log(err);
        commit('SET_ERROR', { data: true });
      });
  },
  /**
   *
   * @param {object} param0
   */
  async setDataLoaded({ commit }, payload) {
    commit('SET_LOADED', payload);
  },
  /**
   *
   * @param {object} param0
   */
  async deleteDataPoint({ commit }, id) {
    return deleteData(id)
      .then(() => {
        commit('DELETE_DATA', id);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
  /**
   * load dashboards from database and add to store
   * @param {object} param0
   */
  async loadDashboards({ commit }) {
    try {
      const response = await getDashboards();
      console.log('Full API Response:', response);
      const { data } = response;
      console.log('Dashboard Data:', data);

      if (Array.isArray(data)) {
        commit('SET_DASHBOARDS', data);
        commit('SET_ERROR', { dashboards: false });
      } else {
        console.error('Invalid dashboard data structure:', data);
        throw new Error('Invalid dashboard data received');
      }
    } catch (err) {
      console.error('Dashboard loading error:', err);
      commit('SET_ERROR', { dashboards: true });
    }
  },
  /**
   * save / update dashboard to database
   * @param {*} param0
   * @param {object} payload - dashboard object
   */
  async uploadDashboard({ commit }, payload) {
    return saveDashboard(payload)
      .then((dash) => {
        commit('SET_ERROR', { upload: false });
        console.log('dashboard uploaded: ', dash);
        return dash.data.name;
      })
      .catch((err) => {
        console.log(err);
        commit('SET_ERROR', { upload: true });
      });
  },
  async removeDashboard(_, id) {
    return deleteDashboard(id)
      .then(() => true)
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
};

export default {
  namespaced: true,
  state: dashboardState,
  mutations,
  actions,
};
