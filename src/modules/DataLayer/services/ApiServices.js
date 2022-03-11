import axiosInstance from '@/plugins/axios';
import apiEndpoints from '../config/endpoint';

const getMainData = async () => axiosInstance.get(apiEndpoints.getData);
// Last updated DB date
const getLastUpdatedDate = async () => axiosInstance.get(apiEndpoints.getLastUpdated);
const getUpdatedData = async (theDate) => axiosInstance.get(`${apiEndpoints.getUpdatedDataDate}?datetime=${theDate}`);
const getSingleIndicator = async (indicator) => axiosInstance.get(`${apiEndpoints.getData}?indicator=${indicator}`);
const getRequiredEndpoint = async (apiEndpoint) => axiosInstance.get(`/${apiEndpoint}/`);
// const getLatestDate = async () => axiosInstance.get('https://msdatapi.fmohconnect.gov.ng/api/data/latest/');
const getLatestDate = async () => axiosInstance.get('http://135.181.212.168:9234/api/crud/data/latest/');
const getIndicatorsWithAvailable = async (indicatorID) => axiosInstance.get(`indicators/${indicatorID}/years_available/`);
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
];

const getOtherEndpoint = async () => Promise.all(otherEndpoints.map(
  (endpoint) => getRequiredEndpoint(endpoint),
));

export default {
  getLastUpdatedDate,
  getSingleIndicator,
  getRequiredEndpoint,
  getMainData,
  getUpdatedData,
  getOtherEndpoint,
  getLatestDate,
  getIndicatorsWithAvailable,
  getIndicatorsWithPeriod,
};
