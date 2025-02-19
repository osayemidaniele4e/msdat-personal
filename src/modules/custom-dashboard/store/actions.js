/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import axios from 'axios';

export default {
  resetState({ commit }) {
    commit('resetState');
  },
  // ********** Configuration Details ********** //

  dashboardConfiguration({ commit }, payload) {
    commit('dashboardDetails', payload);
  },
  clearAllData({ commit }, payload) {
    commit('clearAllData', payload);
  },

  // ***** Indicators Data ******* //
  // Getting indicators
  async loadIndicators({ commit, state, dispatch }) {
    let loading = true;
    if (state.masterData.length === 0) {
      loading = true;
      commit('setIndiLoading', loading);
      // state.loader.indicator = true;
      // await axios.get('http://135.181.212.168:9234/api/crud/indicators/')
      await axios
        .get('https://msdat-api.fmohconnect.gov.ng/api/indicators/?size=3000')
        .then((res) => {
          // const { data } = res;
          const data = res.data.results;
          const array = data.map((pArea) => pArea.program_area);
          const distinctArray = [...new Set(array)];
          const composedData = [];

          const sortedData = data.sort((a, b) => a.id - b.id);
          let filteredData = [];
          // eslint-disable-next-line no-restricted-syntax
          for (const pa of distinctArray) {
            const paData = sortedData.filter((ind) => ind.program_area === pa);
            if (pa === 'RMNCH') {
              filteredData = filteredData.concat(paData.slice(0, 10));
            } else {
              filteredData = filteredData.concat(paData.slice(0, 2));
            }
          }

          distinctArray.forEach((distItem) => {
            if (state.allSelected === false) {
              composedData.push({
                children: filteredData.filter((x) => {
                  if (x.program_area === distItem) {
                    x.selected = false;
                    x.sources = [];
                    x.years = [];
                    x.levels = [];
                    return x;
                  }
                  if (state.allSelected === true) {
                    x.selected = true;
                  }
                }),
                parent: { selected: false, isChildSelected: false, value: distItem.toUpperCase() },
                showList: false,
                showNotes: false,
              });
            } else {
              composedData.push({
                children: filteredData.filter((x) => {
                  if (x.program_area === distItem) {
                    x.selected = true;
                    x.sources = [];
                    x.years = [];
                    x.levels = [];
                    return x;
                  }
                }),
                parent: { selected: true, isChildSelected: true, value: distItem.toUpperCase() },
                showList: true,
                showNotes: true,
              });
            }
          });
          // console.log('CD', composedData);
          loading = false;
          commit('setIndiLoading', loading);
          commit('setPArea', composedData);
          if (state.allSelected === true) {
            composedData.map((x) => {
              x.children.forEach((child) => {
                const childs = {
                  id: child.id,
                };
                dispatch('loadCoverageLevels', childs);
                dispatch('loadYears', childs);
              });
            });
          }

          // dispatch('loadCoverageLevels', childs)
        })
        .catch((err) => {
          console.log(err);
          loading = true;
          commit('setIndiLoading', loading);
        });
    }
  },

  // ******** Data Sources ********** //

  // Load DataSources From API for the First time.
  async loadDataSource({ commit, state }) {
    if (state.SurveyArray.length === 0) {
      let loading = true;
      commit('setDSLoading', loading);
      // state.indicatorloading = true;
      // await axios.get('http://135.181.212.168:9234/api/crud/datasources/')
      await axios
        .get('https://msdat-api.fmohconnect.gov.ng/api/datasources/')
        .then((res) => {
          // const { data } = res;
          const data = res.data.results;
          const array = data.map((dArea) => dArea.classification);

          const distinctDataArray = [...new Set(array)];
          const SurveyArray = [];

          distinctDataArray.forEach((distItem) => {
            if (state.allSelected === false) {
              SurveyArray.push({
                children: data.filter((x) => {
                  if (x.classification === distItem) {
                    x.selected = false;
                    return x;
                  }
                }),
                parent: distItem?.toUpperCase(),
              });
            } else {
              SurveyArray.push({
                children: data.filter(
                  // eslint-disable-next-line array-callback-return
                  (x) => {
                    if (x.classification === distItem) {
                      // eslint-disable-next-line no-param-reassign
                      x.selected = true;
                      return x;
                    }
                  },
                ),
                parent: distItem.toUpperCase(),
              });
            }

            // eslint-disable-next-line no-unused-vars
            SurveyArray.sort((a, b) => {
              const keyA = a.parent;
              if (keyA === 'ROUTINE') return -1;
              return 0;
            });
          });
          loading = false;
          commit('setDSLoading', loading);
          // state.loader.datasource = false;
          commit('setDArea', SurveyArray);
        })
        .catch((err) => {
          // eslint-disable-next-line no-unused-expressions
          console.log(err);
          loading = false;
          commit('setDSLoading', loading);
        });
    }
  },

  // ******** Coverage Levels ********* //
  // Load Coverage levels based on indicators
  async loadCoverageLevels({ commit, state }, payload) {
    // console.log('levels Payload', payload.id);
    let levelsObj = {};
    let loading = true;
    if (payload.checked === true || state.allSelected === true) {
      loading = true;
      commit('setLevelsLoading', loading);
      // state.loader.levels = true;
      // commit('setshowLoader');
      // await axios.get(`http://135.181.212.168:9234/api/crud/datasource_specific_indicator/${payload.id}`)
      await axios
        .get(`https://msdat-api.fmohconnect.gov.ng/api/datasource_specific_indicator/${payload.id}`)
        .then((res) => {
          const { data } = res;
          // const data = res.data;
          // console.log("🚀 ~ file: actions.js ~ line 214 ~ .then ~ data", data)
          const dataLevels = data.data_level.split(',');
          // console.log(dataLevels);
          if (state.allSelected === false) {
            const levels = dataLevels.map((level) => ({ selected: false, value: level }));
            levelsObj = { id: payload.id, Datalevels: levels, checked: payload.checked };
          } else {
            // loading = true;
            // commit('setLevelsLoading', loading);
            const levels = dataLevels.map((level) => ({ selected: true, value: level }));
            levelsObj = { id: payload.id, Datalevels: levels, checked: payload.checked };
          }
          // state.loader.levels = false;
          loading = false;
          commit('setLevelsLoading', loading);
        })
        .catch((err) => {
          console.log(err);
          loading = false;
          commit('setLevelsLoading', loading);
          // state.loader.levels = false;
        });
    } else {
      loading = false;
      commit('setLevelsLoading', loading);
      // state.loader.levels = false;
      levelsObj = { id: payload.id, Datalevels: [], checked: payload.checked };
    }
    loading = false;
    commit('setLevelsLoading', loading);
    // state.loader.levels = false;
    commit('getLevels', levelsObj);
  },

  // ********* For Years ******** //
  // Load Years based on indicators
  async loadYears({ commit, state }, payload) {
    // console.log('called 1');
    let dataObj = {};
    let loading = true;
    if (payload.checked === true || state.allSelected === true) {
      loading = true;
      commit('setYearsLoading', loading);
      // await axios.get(`http://135.181.212.168:9234/api/crud/indicators/${payload.id}/years_available/`)
      await axios
        .get(`https://msdat-api.fmohconnect.gov.ng/api/indicators/${payload.id}/years_available/`)
        .then((res) => {
          const { data } = res;

          const currentYear = (new Date()).getFullYear();
          const years = data.years.filter((year) => Number(year) && Number(year) <= currentYear);
          // console.log(data, 'data');
          if (state.allSelected === false) {
            const yearsData = years.map((year) => ({ selected: false, value: year }));
            dataObj = {
              id: payload.id,
              childName: payload.child,
              years: yearsData,
              parentName: payload.parent,
              checked: payload.checked,
            };
          } else {
            const yearsData = years.map((year) => ({ selected: true, value: year }));
            dataObj = {
              id: payload.id,
              childName: payload.child,
              years: yearsData,
              parentName: payload.parent,
              checked: payload.checked,
            };
          }
          loading = false;
          commit('setYearsLoading', loading);
        });
    } else {
      dataObj = {
        id: payload.id,
        childName: payload.child,
        years: [],
        parentName: payload.parent,
        checked: payload.checked,
      };
    }
    loading = false;
    commit('setYearsLoading', loading);
    // state.loader.years = false;
    commit('getYears', dataObj);
  },

  levelclick({ commit }, payload) {
    commit('levelsHandler', payload);
  },

  // eslint-disable-next-line no-underscore-dangle
  _isNotExistYear({ commit }, payload) {
    commit('yearsHandler', payload);
  },

  selectedYear({ commit }, payload) {
    commit('selectedYear', payload);
  },

  // When Single Indicator is Selected
  forSelectedIndicator({ commit }, payload) {
    commit('selectionIndicator', payload);
  },

  // For All indicators Selection
  forAllSelectedIndicator({ commit }, payload) {
    commit('AllselectionIndicator', payload);
  },

  forSelectedDataSource({ commit }, payload) {
    commit('selectionDataSource', payload);
  },

  selectedIndicator({ commit }, payload) {
    commit('selectedIndicator', payload);
  },

  selectedDataSource({ commit }, payload) {
    commit('selectedDataSource', payload);
  },
  selectedYears({ commit }, payload) {
    commit('selectedYears', payload);
  },
  selectedLevels({ commit }, payload) {
    commit('selectedLevels', payload);
  },

  // For Arrangment of Sections
  arrangedSection({ commit }, payload) {
    commit('arrangedSections', payload);
  },

  deactivateAllSections({ commit }) {
    commit('deactivateAllSections');
  },

  dynamicSection({ commit }, payload) {
    commit('dynamicSection', payload);
  },

  customDashboard({ commit }, payload) {
    commit('customDashboard', payload);
  },

  // *********For All Selection OF DATA****************//
  allSelection({ commit }, payload) {
    // console.log('actions', payload);
    commit('selectAll', payload.allselected);
  },

  setVisibility({ commit }, payload) {
    commit('setVisibility', payload);
  },

  setIsPublicDashboard({ commit }, payload) {
    commit('setIsPublicDashboard', payload);
  },

  // *********For Dashboard Requests******************//
  // CREATE A NEW DASHBOARD REQUEST
  // eslint-disable-next-line no-unused-vars
  async setDashboardRequest({ commit }, payload) {
    try {
      // await axios.put(`https://msdat-fmoh-default-rtdb.firebaseio.com/custom/public/${payload.id}.json`, payload);
      // const response = await axios.post('http://172.93.52.240:3001/api/request_dashboard/', payload);
      console.log(payload, 'payload @@');
      return true;
    } catch (error) {
      console.error('Error sending data to API:', error);
      return false;
    }
  },
  // RETRIEVE ALL DASHBOARD REQUESTS
  async getDashboards({ commit }) {
    const { data } = await axios.get('https://msdat-fmoh-default-rtdb.firebaseio.com/custom/public.json');
    if (data) commit('setAllPublicDashboards', Object.values(data));
    return { data };
  },
  // RETRIEVE DASHBOARD DETAILS
  async getDashboardDetails(_, id) {
    const { data } = await axios.get(`https://msdat-fmoh-default-rtdb.firebaseio.com/custom/public/${id}.json`);
    return { data };
  },

  // RETRIEVE A SINGLE DASHBOARD BY ID
  getDashboard(_, id) {
    return axios.get(`https://msdat-fmoh-default-rtdb.firebaseio.com/custom/public/${id}.json`);
  },
  // UPDATE A DASHBOARD REQUEST (APPROVE/DISAPPROVE)
  updateDashboard(_, payload) {
    return axios.patch(`https://msdat-fmoh-default-rtdb.firebaseio.com/custom/public/${payload.id}.json`, payload);
  },
};
