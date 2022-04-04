/* eslint-disable no-shadow */

import { MutationTree } from 'vuex';
import { State, ControlPanelConfig } from '../types/index';

type setOptionsPayload = {
  panelIndex: number,
  groupIndex: number,
  key: string,
  values: [] | string | number,
}
type setPayload = {
  controlIndex: number,
  groupIndex: number,
  key: string,
  value: [] | string | number,
}

const state: State = {
  indicatorComparision: false,
  zonalAnalysis: false,
  indicatorComparsionByPeriod: false,
  multisourceComparison: false,
  datasetComperision: false,
  default: {

    indicator: 7,
    datasource: 6,
    location: 1,
    year: null,
  },
  controlConfig: [],
};

export default state;
