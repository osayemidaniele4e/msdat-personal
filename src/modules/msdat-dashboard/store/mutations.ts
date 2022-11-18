import { MutationTree } from 'vuex';
import { State, ControlPanelConfig } from '../types/index';

type setOptionsPayload = {
  panelIndex: number;
  groupIndex: number;
  key: string;
  values: [] | string | number;
};
type setPayload = {
  controlIndex: number;
  groupIndex: number;
  key: string;
  value: [] | string | number;
};

const mutations: MutationTree<State> = {
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

  SETUP_CONTROL_OPTIONS1: (state, obj: setOptionsPayload) => {
    const checkTheObject = state.controlConfig[obj.panelIndex].setup[0];
    if (Array.isArray(checkTheObject)) {
      const setUpArrayOfObject = state.controlConfig[obj.panelIndex].setup[obj.groupIndex];
      const keyIndex = setUpArrayOfObject.findIndex((option) => option.key === obj.key);
      state.controlConfig[obj.panelIndex].setup[obj.groupIndex][keyIndex].options = obj.values;
    } else {
      const keyIndex = state.controlConfig[obj.panelIndex].setup.findIndex(
        (item) => item.key === obj.key,
      );
      state.controlConfig[obj.panelIndex].setup[keyIndex].options = obj.values;
      // console.log('object', state.controlConfig[obj.panelIndex].setup[keyIndex].options = obj.values);
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
  //   SET_DEFAULT: (state, { controlIndex, key, value }) => {
  //     state.controlConfig[controlIndex].defaults[key] = value;
  //   },
  SET_PAYLOAD: (state, obj: setPayload) => {
    if (state.controlConfig[obj.controlIndex].payload !== null) {
      if (!Array.isArray(state.controlConfig[obj.controlIndex].payload)) {
        state.controlConfig[obj.controlIndex].payload[obj.key] = obj.value;
      } else {
        // taking into consideration sections like multi-source comparison
        state.controlConfig[obj.controlIndex].payload[obj.groupIndex][obj.key] = obj.value;
      }
    }
  },

  /**
   * This function is used to add configuration to the control panel
   * in other world create a control panel
   * @param {*} payload This should follow the the control panel object formatter
   */
  ADD_CONTROL_PANEL: (state, payload: ControlPanelConfig) => {
    state.controlConfig.push(payload);
  },

  /**
   * i feel this might come in handy some day
   */
  CLEAR_CONTROL_PANEL: (state) => {
    state.controlConfig = [];
  },
  /**
   * This function is used to set control options
   */
  SET_ALL_CONTROL_OPTIONS: (state, { key, payload }) => {
    state.controlConfig.forEach((controlPanel) => {
      if (controlPanel.setup.length > 0) {
        if (!Array.isArray(controlPanel.setup[0])) {
          controlPanel.setup.forEach((control) => {
            if (control.key === key) {
              // eslint-disable-next-line no-param-reassign
              control.options = payload;
            }
          });
        }
       else {
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
      }
    });
  },
};

export default mutations;
