// Auther: Ghufran Ahmed

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
const store = {
  state: {
    loader: {
      show: false,
      indicator: false,
      datasource: false,
      levels: false,
      years: false,
    },
    allSelected: false,
    step: 0,
    customDashboard: false,
    dashboardDetails: {},
    rmnchs: [],
    masterData: [],
    SurveyArray: [],
    notes: [],
    ArrangedSections: [
      {
        id: 0,
        name: 'Indicator Overview',
        active: false,
        isShow: true,
      },
      {
        id: 1,
        name: 'Zonal Analysis',
        active: false,
        isShow: true,
      },
      {
        id: 2,
        name: 'Indicator Comparsion - By Period',
        active: false,
        isShow: true,
      },
      {
        id: 3,
        name: 'Dataset Comparison',
        active: false,
        isShow: true,
      },
      {
        id: 4,
        name: 'Multi-source Indicator Comparison',
        active: false,
        isShow: true,
      },
    ],
  },

  mutations,
  actions,
  getters,
};

export default store;
