import axiosInstance from '@/modules/DataLayer/config/api';
import apiEndpoints from '@/modules/DataLayer/config/endpoint';

// const StateProfileDashboard = {
//     dashboardIndicators:
//     [1, 4, 5, 7, 8, 13, 18, 10, 17, 14, 15, 16, 20,
//       21, 22, 23, 24, 26, 27, 28, 29, 30, 31,
//       32, 34, 39, 41, 49, 50, 61, 63, 64, 67, 68, 70],
//     dataSources: [19, 2, 20, 1, 5, 16, 6],
//   };

export const allLocations = () => axiosInstance.get(apiEndpoints.getLocation);

export const fetchDemographics = async (params, locationId) => {
  const values = await Promise.all(params.map((el) => axiosInstance.get(`${apiEndpoints.getData}?indicator=${el.indicatorId}&datasource=${el.sourceId}&location=${locationId}`)));
  return values;
};

export const getRegularData = async (params, locationId) => {
  const national = await Promise.all(params.map((el) => axiosInstance.get(`${apiEndpoints.getData}?indicator=${el.indicator}&datasource=${el.dataSource}&period=${el.year}&location=1`)));
  if (locationId !== 1) {
    const state = await Promise.all(params.map((el) => axiosInstance.get(`${apiEndpoints.getData}?indicator=${el.indicator}&datasource=${el.dataSource}&period=${el.year}&location=${locationId}`)));
    return { national, state };
  }
  return { national };
};

export const getIndicatorsAndSources = async () => {
  const theIndicators = await axiosInstance.get(apiEndpoints.getIndicator);
  const theSources = await axiosInstance.get(apiEndpoints.getDataSource);
  return { theIndicators, theSources };
};
