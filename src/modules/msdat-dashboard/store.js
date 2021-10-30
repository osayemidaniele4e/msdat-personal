export default {
  namespaced: true,
  state: {
    default: {
      indicator: 7,
      datasource: 6,
      location: 1,
      year: null,
    },
    controlConfig: [],
  },
  mutations: {
    SET_INITIAL: (state, payload) => {
      state.default.indicator = payload.indicator;
      state.default.datasource = payload.datasource;
      state.default.location = payload.location;
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

    SETUP_CONTROL_OPTIONS1: (state, {
      panelIndex, groupIndex = null, key, values,
    }) => {
      if (groupIndex != null) {
        const keyIndex = state.controlConfig[panelIndex].setup[groupIndex].findIndex(
          (item) => item.key === key,
        );
        state.controlConfig[panelIndex].setup[groupIndex][keyIndex].options = values;
      } else {
        const keyIndex = state.controlConfig[panelIndex].setup.findIndex(
          (item) => item.key === key,
        );
        state.controlConfig[panelIndex].setup[keyIndex].options = values;
      }
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
    setControlOptions: (
      state,
      {
        panelIndex, controlIndex, controlIndex2, values, multipleSetup,
      },
    ) => {
      if (multipleSetup) {
        state.controlConfig[panelIndex].setup[controlIndex][controlIndex2].options = values;
      } else {
        state.controlConfig[panelIndex].setup[controlIndex].options = values;
      }
    },

    TOGGLE_VISIBILITY: (state, { panelIndex, key, value }) => {
      // eslint-disable-next-line max-len
      const keyIndex = state.controlConfig[panelIndex].setup.findIndex((item) => item.key === key);
      state.controlConfig[panelIndex].setup[keyIndex].visibility = value;
    },

    // set default on individual control panel
    SET_DEFAULT: (state, { controlIndex, key, value }) => {
      state.controlConfig[controlIndex].defaults[key] = value;
    },
    SET_PAYLOAD: (state, {
      controlIndex, key, value, groupIndex = null,
    }) => {
      debugger;
      if (groupIndex === null) {
        state.controlConfig[controlIndex].payload[key] = value;
      } else {
        // taking into consideration sections like multi-source comparison
        state.controlConfig[controlIndex].payload[groupIndex][key] = value;
      }
    },

    /**
     * This function is used to add configuration to the control panel
     * in other world create a control panel
     * @param {*} payload This should follow the the control panel object formatter
     */
    ADD_CONTROL_PANEL: (state, payload) => {
      state.controlConfig.push(payload);
    },

    /**
     * i feel this might come in handy some day
     */
    CLEAR_CONTROL_PANEL: (state) => {
      state.controlConfig = [];
    },

    SET_ALL_CONTROL_OPTIONS: (state, { key, payload }) => {
      state.controlConfig.forEach((controlPanel) => {
        if (!Array.isArray(controlPanel.setup[0])) {
          debugger;
          controlPanel.setup.forEach((control) => {
            if (control.key === key) {
              // eslint-disable-next-line no-param-reassign
              control.options = payload;
            }
          });
        } else {
          // Taking into consideration the multi-source comparison section
          controlPanel.setup.forEach((control) => {
            control.forEach((groupControl) => {
              if (groupControl.key === key) {
                // eslint-disable-next-line no-param-reassign
                groupControl.options = payload;
              }
            });
          });
        }
      });
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
