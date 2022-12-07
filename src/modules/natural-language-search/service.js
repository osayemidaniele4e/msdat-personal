/* eslint-disable consistent-return */
import axiosInstance from '@/plugins/axios';

const getIndicators = async ({ search }) => {
  try {
    const { data } = await axiosInstance.post('ai_search/', { search });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export default { getIndicators };
