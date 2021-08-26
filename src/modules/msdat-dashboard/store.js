import datasetComparismControls from '@/modules/msdat-dashboard/components/sections/dataset-comparison/datasetControlPanelConfig';
import indicatorOverviewConfig from '@/modules/msdat-dashboard/components/sections/indicator-overview/control-panel-config';
import indicatorComparismConfig from '@/modules/msdat-dashboard/components/sections/indicator-comparism/indicator-comparism-config';
import multiIndicatorComparismConfig from '@/modules/msdat-dashboard/components/sections/multi-source-compare/control-config';
import zonalAnalysisConfig from '@/modules/msdat-dashboard/components/sections/zonal-analysis/control-config';

export default {
  namespaced: true,
  state: {
    default: {
      indicator: 5,
      datasource: 4,
      location: 1,
      year: 'null',
    },
    controlConfig: [
      indicatorOverviewConfig,
      zonalAnalysisConfig,
      indicatorComparismConfig,
      datasetComparismControls,
      multiIndicatorComparismConfig,
    ],
  },
  mutations: {
    ADD_DATA: (state, data) => {
      state.localData.push(data);
    },
    /**
     * This just set the Option on the state for all the defaults
     * @param {*} payload The payload for the data values
     * @param {*} payload.panelIndex this get th index of the current control panel you want
     * to change the options
     * @param {*} payload.controlIndex this actual control
     * @param {*} payload.values The data you wish to change
     */
    SETUP_CONTROL_OPTIONS: (state, payload) => {
      state.controlConfig[payload.panelIndex].setup[payload.controlIndex].options = payload.values;
    },

    /**
     * This just to set default options dropdown on a control panel
     * @param {Array} payload The payload for the data values
     * @param {Number} panelIndex this is the position of the
     * control panel you want to change in the array
     * @param {number} controlIndex the controlIndex you want to change in the panelIndex
     * suggesting that as against to using index to locate the
     * control panel let give each panel and id
     */
    setControlOptions: (state, payload) => {
      state.controlConfig[payload.panelIndex].setup[payload.controlIndex].options = payload.values;
    },
  },
  actions: {
    SET_CONTROL_OPTIONS({ commit }, payload) {
      commit('setControlOptions', payload);
    },
    add() {
      return 'a test';
    },
  },
};
