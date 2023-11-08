import axiosInstance from '@/plugins/axios';
import apiEndpoints from '../config/endpoint';

const getDashboard = async () => axiosInstance.get(apiEndpoints.getDashboard);
const getDashboardById = async (id) => axiosInstance.get(apiEndpoints.getDashboard + id);
const getUpdatedData = async (theDate) => axiosInstance.get(`${apiEndpoints.getUpdatedDataDate}?datetime=${theDate}`);
const getSingleIndicator = async (indicator) => axiosInstance.get(`${apiEndpoints.getData}?indicator=${indicator}`);
const getRequiredEndpoint = async (apiEndpoint) => axiosInstance.get(`/${apiEndpoint}`);
const getLatestDate = async () => axiosInstance.get('data/?ordering=-updated_at&size=1');
const getIndicatorsWithAvailable = async (indicatorID) => axiosInstance.get(`indicators/${indicatorID}/years_available`);
const getIndicatorsWithPeriod = async (indicatorID, period) => axiosInstance.get(`${apiEndpoints.getData}indicator=${indicatorID}&period=${period}`);
const getAllDataSources = async () => axiosInstance.get('datasources');
const getSingleIndicatorObj = async (indicatorID) => axiosInstance.get(`indicators/${indicatorID}`);
const getFactors = async () => axiosInstance.get('/factors/');
const getSpecificIndicator = async () => axiosInstance.get('/datasource_specific_indicator/');

// https://msdat-api.fmohconnect.gov.ng/api/data/?size=1000&indicator=7

const otherEndpoints = [
  apiEndpoints.getLocation,
  apiEndpoints.getIndicator,
  apiEndpoints.getLHL,
  apiEndpoints.getValueType,
  apiEndpoints.getLinks,
  apiEndpoints.getFactors,
  apiEndpoints.getDSI,
  apiEndpoints.getDataSource,
  apiEndpoints.getNhmisMonthly,
];

const getOtherEndpoint = async () => Promise.all(otherEndpoints.map((endpoint) => getRequiredEndpoint(endpoint)));

export default {
  otherEndpoints,
  // getLastUpdatedDate,
  getSingleIndicator,
  getRequiredEndpoint,
  getDashboard,
  getUpdatedData,
  getOtherEndpoint,
  getLatestDate,
  getIndicatorsWithAvailable,
  getIndicatorsWithPeriod,
  getDashboardById,
  getAllDataSources,
  getSingleIndicatorObj,
  getFactors,
  getSpecificIndicator,
};
