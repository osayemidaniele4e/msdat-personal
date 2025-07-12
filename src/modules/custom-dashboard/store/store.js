import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const composedData = sessionStorage.getItem('composedData');
const SurveyArray = sessionStorage.getItem('surveyArray');
const SectionsArray = sessionStorage.getItem('sectionsArray');
const dashboardDetails = localStorage.getItem('dashboardDetails');
const customDashboard = localStorage.getItem('customDashboardStatus') || false;
const embedUrl = sessionStorage.getItem('embedUrl');
const embedIframe = sessionStorage.getItem('embedIframe');
const embedUrlTitle1 = sessionStorage.getItem('embedUrlTitle');
const embedIframeTitle2 = sessionStorage.getItem('embedIframeTitle');

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
    step: 1,
    customDashboard: JSON.parse(customDashboard),
    dashboardDetails: JSON.parse(dashboardDetails),
    rmnchs: [],
    masterData: JSON.parse(composedData),
    SurveyArray: JSON.parse(SurveyArray),
    notes: [],
    visibility: 'private',
    editMode: false,
    ArrangedSections: SectionsArray ? JSON.parse(SectionsArray) : [
      {
        id: 0,
        name: 'Indicator Overview',
        active: false,
        isShow: false,
      },
      {
        id: 1,
        name: 'Zonal analysis',
        active: false,
        isShow: false,
      },
      {
        id: 2,
        name: 'Indicator Comparison',
        active: false,
        isShow: false,
      },
      {
        id: 3,
        name: 'Dataset Comparison',
        active: false,
        isShow: false,
      },
      {
        id: 4,
        name: 'Multi-source Comparison',
        active: false,
        isShow: false,
      },
    ],
    dashboardRequest: {},
    publicDashboard: false,
    allPublicDashboards: [],
    selectedIndicators: [],
    embeddedUrl: JSON.parse(embedUrl),
    embeddedIframe: JSON.parse(embedIframe),
    embeddedUrlTitle: JSON.parse(embedUrlTitle1),
    embeddedIframeTitle: JSON.parse(embedIframeTitle2),
    embedUrl: '',
    embedUrlTitle: '',
    embedIframe: '',
    embedIframeTitle: '',
  },

  mutations,
  actions,
  getters,
};

export default store;
