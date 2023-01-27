/* eslint-disable no-unused-vars */
import axios from 'axios';
import apiEndpoints from '@/modules/DataLayer/config/endpoint';
import mockResponseData from '@/modules/DataLayer/sample_data';

jest.mock('axios');

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

const baseURL = process.env.VUE_APP_API_BASE_URL;
const getDashboard = async () => axios.get(`${baseURL}${apiEndpoints.getDashboard}`);
const getUpdatedData = async (theDate) => axios.get(`${baseURL}${apiEndpoints.getUpdatedDataDate}?datetime=${theDate}`);
const getSingleIndicator = async (indicator) => axios.get(`${baseURL}${apiEndpoints.getData}?indicator=${indicator}`);
const getRequiredEndpoint = async (apiEndpoint) => axios.get(`${baseURL}/${apiEndpoint}`);
const getLatestDate = async () => axios.get(`${baseURL}data/?ordering=-updated_at&size=1`);
const getIndicatorsWithAvailable = async (indicatorID) => axios.get(`${baseURL}indicators/${indicatorID}/years_available`);
const getIndicatorsWithPeriod = async (indicatorID, period) => axios.get(`${baseURL}${apiEndpoints.getData}indicator=${indicatorID}&period=${period}`);
const getOtherEndpoint = async () => Promise.all(otherEndpoints.map(
  (endpoint) => getRequiredEndpoint(endpoint),
));

describe('This block is testing for all api calls made in the Apiservice.js file', () => {
  it('Test getDashboard function', async () => {
    axios.get.mockResolvedValueOnce(mockResponseData);
    const result = await getDashboard();
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${baseURL}${apiEndpoints.getDashboard}`);
    expect(result).toEqual(mockResponseData);
  });
  it('Test getUpdatedData function', async () => {
    const date = 2020;
    axios.get.mockResolvedValueOnce(mockResponseData);
    const result = await getUpdatedData(date);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${baseURL}${apiEndpoints.getUpdatedDataDate}?datetime=${date}`);
    expect(result).toEqual(mockResponseData);
  });
  it('Test getSingleIndicator function', async () => {
    const indicator = 1;
    axios.get.mockResolvedValueOnce(mockResponseData);
    const result = await getSingleIndicator(indicator);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${baseURL}${apiEndpoints.getData}?indicator=${indicator}`);
    expect(result).toEqual(mockResponseData);
  });
  it('Test getRequiredEndpoint function', async () => {
    const apiEndpoint = '/indicators';
    axios.get.mockResolvedValueOnce(mockResponseData);
    const result = await getRequiredEndpoint(apiEndpoint);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${baseURL}/${apiEndpoint}`);
    expect(result).toEqual(mockResponseData);
  });
  it('Test getLatestDate function', async () => {
    axios.get.mockResolvedValueOnce(mockResponseData);
    const result = await getLatestDate();
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${baseURL}data/?ordering=-updated_at&size=1`);
    expect(result).toEqual(mockResponseData);
  });
  it('Test getIndicatorsWithAvailable function', async () => {
    const indicatorID = 1;
    axios.get.mockResolvedValueOnce(mockResponseData);
    const result = await getIndicatorsWithAvailable(indicatorID);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${baseURL}indicators/${indicatorID}/years_available`);
    expect(result).toEqual(mockResponseData);
  });
  it('Test getIndicatorsWithPeriod function', async () => {
    const indicatorID = 1;
    const period = 2013;
    axios.get.mockResolvedValueOnce(mockResponseData);
    const result = await getIndicatorsWithPeriod(indicatorID, period);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(`${baseURL}${apiEndpoints.getData}indicator=${indicatorID}&period=${period}`);
    expect(result).toEqual(mockResponseData);
  });
  it('Test getOtherEndpoint function', async () => {
    axios.get.mockResolvedValueOnce(mockResponseData);
    const result = await getOtherEndpoint();
    expect(axios.get).toHaveBeenCalled();
    expect(result).toContain(mockResponseData);
  });
});
