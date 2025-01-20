import axiosInstance, { AxiosInstance1 } from '@/plugins/axios';
import apiEndpoints from '../config/endpoint';

const getDashboard = async () => AxiosInstance1.get(apiEndpoints.getDashboard);
const getDashboardById = async (id) => AxiosInstance1.get(apiEndpoints.getDashboardById + id);
const getUpdatedData = async (theDate) => axiosInstance.get(`${apiEndpoints.getUpdatedDataDate}?datetime=${theDate}`);
const getSingleIndicator = async (indicator) => axiosInstance.get(`${apiEndpoints.getData}?indicator=${indicator}`);
const getRequiredEndpoint = async (apiEndpoint) => axiosInstance.get(`/${apiEndpoint}`);
const getLatestDate = async () => axiosInstance.get('data/?ordering=-updated_at&size=1');
const getIndicatorsWithAvailable = async (indicatorID) => axiosInstance.get(`indicators/${indicatorID}/years_available/`);
const getIndicatorsWithPeriod = async (indicatorID, period) => axiosInstance.get(`${apiEndpoints.getData}indicator=${indicatorID}&period=${period}`);
const getAllDataSources = async () => axiosInstance.get('datasources');
const getSingleIndicatorObj = async (indicatorID) => axiosInstance.get(`indicators/${indicatorID}`);
const getSingleDataSourceObj = async (datasourcesID) => axiosInstance.get(`datasources/${datasourcesID}`);
const getFactors = async () => axiosInstance.get('/factors/');
const getSpecificIndicator = async () => axiosInstance.get('/datasource_specific_indicator/');
const getDashboardDatasources = async (indicatorID) => axiosInstance.get(`/dashboards/${indicatorID}/datasources/`);
const getIndicatorTableData = async (indicatorID, datasourceId, valueType, location) => axiosInstance.get(`${apiEndpoints.getTableData}indicator=${indicatorID}&location=${location}&datasource=${datasourceId}&ordering=-created_at&value_type=${valueType}`);
const getSpecificDashboard = async (dashboardName) => axiosInstance.get(`/dashboards/?name=${dashboardName}`);
const getDashboardIndicator = async (dashboardID) => axiosInstance.get(`/dashboards/${dashboardID}/indicators/`);
const getIndicatorDatasources = async (indicatorID) => axiosInstance.get(`indicators/${indicatorID}/datasources/`);
const getDataObj = async (obj) => axiosInstance.get(`data/?size=2000&indicator=${obj.indicatorID}&datasource=${obj.datasourceID}`);

const getAllDataObj = async (obj) => axiosInstance.get(`data/?size=2000&indicator=${obj.indicatorID}&datasource=${obj.datasourceID}&period=${obj.period}`);
const getNHMISData = async (obj) => axiosInstance.get(`data/?size=2000&indicator=${obj.indicator}&datasource=30&value_type=5&period=${obj.period}`);
const getAllNHMISData = async (obj) => axiosInstance.get(`data/?size=5000&indicator=${obj.indicator}&datasource=30&value_type=5&location=1`);
const getNHMISDataObj = async (obj) => axiosInstance.get(`data/?size=2000&indicator=${obj.indicator}&datasource=${obj.datasource}&ordering=-created_at&location=1`);
const getWhatsNew = async () => axiosInstance.get('news/updates/?size=1000');
const saveWhatsNew = async (data) => axiosInstance.post('news/updates/', data);

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
  getDashboardDatasources,
  getSingleDataSourceObj,
  getIndicatorTableData,
  getSpecificDashboard,
  getDashboardIndicator,
  getIndicatorDatasources,
  getDataObj,
  getAllDataObj,
  getNHMISDataObj,
  getNHMISData,
  getAllNHMISData,
  getWhatsNew,
  saveWhatsNew,
};
