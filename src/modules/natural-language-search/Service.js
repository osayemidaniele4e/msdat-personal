/* eslint-disable consistent-return */
import axiosInstance from '@/plugins/axios';

const getIndicators = async ({ search }) => {
  try {
    const { data } = await axiosInstance.post('ai_search/', { search });
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getIndicatorById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`indicators/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getYearsByIndicatorId = async (id) => {
  console.log('called 2');
  try {
    const { data } = await axiosInstance.get(
      `indicator_years_available/?indicator=${id}&size=3&ordering=-updated_at/`,
    );
    return data.results;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getDataSourceById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/datasources/${id}/`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getLocationById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/location/${id}/`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getDataByIndicators = async (dataSourceId, indicatorId) => {
  try {
    const data = await axiosInstance.get(
      `/data/?datasource=${dataSourceId}&location=1&indicator=${indicatorId}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getDataByQuery = async (indicatorId, dataSourceId, period) => {
  try {
    const { data } = await axiosInstance.get(
      `data/?indicator=${indicatorId}&datasource=${dataSourceId}&period=${period}`,
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};
const Services = {
  getIndicators,
  getYearsByIndicatorId,
  getDataByIndicators,
  getIndicatorById,
  getDataSourceById,
  getLocationById,
  getDataByQuery,
};
export default Services;
