import datasetComparismControls from '@/modules/msdat-dashboard/components/sections/dataset-comparison/datasetControlPanelConfig';

export default {
  namespaced: true,
  state: {
    default: {
      indicator: 5,
      datasource: 4,
      location: 1,
    },
    controlConfig: [
      // {
      //   label: 'indicator Overview Control',
      //   setup: [
      //     {
      //       type: 'dropdown',
      //       class: ['col-md-4'],
      //       dropdownProps: {
      //         // multiple: true,
      //         'group-values': 'indicators',
      //         'group-label': 'program_area',
      //         label: 'short_name'
      //       },
      //       label: 'indicator 1',
      //       key: 'indicator',
      //       options: []
      //     },
      //     {
      //       class: ['col'],
      //       type: 'dropdown',
      //       label: 'data Source',
      //       key: 'datasource',
      //       dropdownProps: {
      //         label: 'datasource'
      //       },
      //       options: []
      //     },
      //     {
      //       class: ['col'],
      //       type: 'dropdown',
      //       label: 'location',
      //       key: 'location',
      //       dropdownProps: {
      //         label: 'name'
      //       },
      //       options: []
      //     },
      //     {
      //       class: ['col'],
      //       type: 'dropdown',
      //       label: 'Year',
      //       key: 'year',
      //       options: [],
      //       dropdownProps: {
      //         'preselect-first': true
      //       }
      //     },
      //     {
      //       class: ['col'],
      //       type: 'checkbox',
      //       label: 'Target',
      //       key: 'target'
      //     },
      //     {
      //       class: ['col'],
      //       type: 'toggle',
      //       label: 'Num/Denum',
      //       key: 'numdenum'
      //     }
      //   ]
      // },
      datasetComparismControls,
      // {
      //   label: 'indicator Overview 2',
      //   setup: [
      //     {
      //       type: 'dropdown',
      //       class: ['col-md-4'],
      //       label: 'indicator 1',
      //       key: 'indicator',
      //       options: [],
      //       dropdownProps: {
      //         // multiple: true,
      //         'group-values': 'indicators',
      //         'group-label': 'program_area',
      //         label: 'short_name'
      //       }
      //     },
      //     {
      //       class: ['col'],
      //       type: 'dropdown',
      //       label: 'data Source ',
      //       key: 'datasource',
      //       options: [],
      //       dropdownProps: {
      //         label: 'datasource'
      //       }
      //     },
      //     {
      //       class: ['col'],
      //       type: 'dropdown',
      //       label: 'location',
      //       key: 'location',
      //       options: [],
      //       dropdownProps: {
      //         label: 'name'
      //       }
      //     },
      //     {
      //       class: ['col'],
      //       type: 'dropdown',
      //       label: 'Year',
      //       key: 'year',
      //       dropdownProps: {
      //         'preselect-first': true
      //       },
      //       options: []
      //     },
      //     {
      //       class: ['col'],
      //       type: 'checkbox',
      //       label: 'Target',
      //       key: 'target'
      //     },
      //     {
      //       class: ['col'],
      //       type: 'toggle',
      //       label: 'Num/Denum',
      //       key: 'numdenum'
      //     }
      //   ]
      // },
      // {
      //   label: 'Zonal Analysis',
      //   setup: [
      //     {
      //       type: 'dropdown',
      //       class: ['col-md-4'],
      //       label: 'indicator 1',
      //       key: 'indicator',
      //       options: [],
      //       dropdownProps: {
      //         // multiple: true,
      //         'group-values': 'indicators',
      //         'group-label': 'program_area',
      //         label: 'short_name'
      //       }
      //     },
      //     {
      //       class: ['col'],
      //       type: 'dropdown',
      //       label: 'data Source ',
      //       key: 'datasource',
      //       options: [],
      //       dropdownProps: {
      //         label: 'datasource'
      //       }
      //     },
      //     {
      //       class: ['col'],
      //       type: 'dropdown',
      //       label: 'location',
      //       key: 'location',
      //       options: [],
      //       dropdownProps: {
      //         label: 'name'
      //       }
      //     },
      //     {
      //       class: ['col'],
      //       type: 'dropdown',
      //       label: 'Year',
      //       key: 'year',
      //       dropdownProps: {
      //         'preselect-first': true
      //       },
      //       options: []
      //     },
      //     {
      //       class: ['col'],
      //       type: 'checkbox',
      //       label: 'Target',
      //       key: 'target'
      //     }
      //   ]
      // }
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
      debugger;
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
