import axiosInstance from '@/plugins/axios';
import apiEndpoints from '@/modules/data-layer/config/endpoint';

export const allLocations = () => axiosInstance.get(apiEndpoints.getLocation);

export const latestData = () => axiosInstance.get('http://135.181.212.168:9234/api/data/latest/');

export const datasourceSpecific = () => axiosInstance.get(apiEndpoints.getDSI);

export const fetchDemographics = async (params, locationId) => {
  const values = await Promise.all(params.map((el) => axiosInstance.get(`${apiEndpoints.getData}indicator=${el.indicatorId}&datasource=${el.sourceId}&location=${locationId}`)));
  return values;
};

export const getRegularData = async (params, locationId) => {
  console.log('params - programArea specific I & locati id', params);
  const national = await Promise.all(params.map((el) => axiosInstance.get(`${apiEndpoints.getData}indicator=${el.indicator}&datasource=${el.dataSource}&period=${el.year}&location=1`)));
  console.log('national', national);

  const newNational = national.map((el) => el.data);
  if (locationId !== 1) {
    const state = await Promise.all(params.map((el) => axiosInstance.get(`${apiEndpoints.getData}indicator=${el.indicator}&datasource=${el.dataSource}&period=${el.year}&location=${locationId}`)));
    const newState = state.map((el) => el.data);
    return { newNational, newState };
  }
  return { newNational };
};

export const getIndicatorsAndSources = async () => {
  const theIndicators = await axiosInstance.get(apiEndpoints.getIndicator);
  const theSources = await axiosInstance.get(apiEndpoints.getDataSource);
  return { theIndicators, theSources };
};
