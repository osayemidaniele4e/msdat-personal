import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const composedData = sessionStorage.getItem('composedData');
const SurveyArray = sessionStorage.getItem('surveyArray');
const SectionsArray = sessionStorage.getItem('sectionsArray');
const dashboardDetails = localStorage.getItem('dashboardDetails');
const customDashboard = localStorage.getItem('customDashboardStatus') || false;

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
    customDashboard: JSON.parse(customDashboard),
    dashboardDetails: JSON.parse(dashboardDetails),
    rmnchs: [],
    masterData: JSON.parse(composedData),
    SurveyArray: JSON.parse(SurveyArray),
    notes: [],
    visibility: 'private',
    ArrangedSections: JSON.parse(SectionsArray) || [
      {
        id: 0,
        name: 'Indicator Overview',
        active: false,
        isShow: true,
      },
      {
        id: 1,
        name: 'Zonal analysis',
        active: false,
        isShow: true,
      },
      {
        id: 2,
        name: 'Indicator Comparison',
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
        name: 'Multi-source Comparison',
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
