import axiosInstance from '@/plugins/axios';
import apiEndpoints from '../config/endpoint';

const getDashboard = async () => axiosInstance.get(apiEndpoints.getDashboard);
// Last updated DB date
const getLastUpdatedDate = async () => axiosInstance.get(apiEndpoints.getLastUpdated);
const getUpdatedData = async (theDate) => axiosInstance.get(`${apiEndpoints.getUpdatedDataDate}?datetime=${theDate}`);
const getSingleIndicator = async (indicator) => axiosInstance.get(`${apiEndpoints.getData}?indicator=${indicator}`);
const getRequiredEndpoint = async (apiEndpoint) => axiosInstance.get(`/${apiEndpoint}`);
// const getLatestDate = async () => axiosInstance.get('https://msdatapi.fmohconnect.gov.ng/api/data/latest/');
const getLatestDate = async () => axiosInstance.get(apiEndpoints.getLastUpdated);
// const getLatestDate = async () => axiosInstance.get('data/?order=-updated_at&size=1');
const getIndicatorsWithAvailable = async (indicatorID) => axiosInstance.get(`indicators/${indicatorID}/years_available`);
const getIndicatorsWithPeriod = async (indicatorID, period) => axiosInstance.get(`${apiEndpoints.getData}?indicator=${indicatorID}&period=${period}`);

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

const getOtherEndpoint = async () => Promise.all(otherEndpoints.map(
  (endpoint) => getRequiredEndpoint(endpoint),
));

export default {
  getLastUpdatedDate,
  getSingleIndicator,
  getRequiredEndpoint,
  getDashboard,
  getUpdatedData,
  getOtherEndpoint,
  getLatestDate,
  getIndicatorsWithAvailable,
  getIndicatorsWithPeriod,
};
