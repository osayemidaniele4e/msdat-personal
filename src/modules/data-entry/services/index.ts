import instance from '@/config/axios';
import { dataSourceI } from './types';

class DataEntryService {
  /**
   * @function getDataSources
   * @param {Number} id?
   * @returns {Array}
   */
  getDataSources = async (id?: number): Promise<dataSourceI[] | dataSourceI> => {
    const urlSource = `datasources/${id || '?size=1000'}`;
    try {
      const { data } = await instance.get(urlSource);
      if (id) {
        return data;
      }
      const dataArray = await data.results.map((el: dataSourceI) => ({
        id: el.id,
        name: el.datasource,
      }));
      return dataArray;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getPeriodsByDs = async (id: number) => {
    try {
      const response = await this.getDataSources(id);
      console.log(response, 'hello');
      // const { data } = await instance.get(urlSource);
      // const dataArray = await data.results.map((el: selectType) => ({
      //   id: el.id,
      //   name: el.datasource,
      // }));
      // console.log(dataArray);
      // return dataArray;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default new DataEntryService();
