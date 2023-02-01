import instance from '@/config/axios';
import { dataSourceI } from './types';

class DataEntryService {
  /**
   * @function getDataSources
   * @param {Number} id?
   * @returns {Array}
   */
  getDataSources = async (id?: number): Promise<dataSourceI[] | dataSourceI | any> => {
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
      const resp = await this.getDataSources(id);
      const period = await this.extractYears(resp.year_available);
      console.log(period, 'hello', resp.year_available);
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

  extractYears = (yearStr: string): string[] => {
    const years: string[] = [];

    // Split year string by comma
    const yearSegments = yearStr.split(',');
    yearSegments.forEach((yearSegment) => {
      // Check if segment contains a range of years (e.g. 1982-1984)
      if (yearSegment.includes('-')) {
        const yearRange = yearSegment.split('-').map((year) => year.trim());
        const startYear = Number(yearRange[0]);
        const endYear = Number(yearRange[1]);
        for (let i = startYear; i <= endYear; i++) {
          years.push(String(i));
        }
      } else if (yearSegment.includes('/')) {
        // Check if segment contains a range of years separated by a slash (e.g. 1990/1999)
        const yearRange = yearSegment.split('/').map((year) => year.trim());
        const startYear = Number(yearRange[0]);
        const endYear = Number(yearRange[1]);
        for (let i = startYear; i <= endYear; i++) {
          years.push(String(i));
        }
      } else {
        // If segment is a single year, add it to the list
        years.push(yearSegment.trim());
      }
    });

    return years;
  };
}

export default new DataEntryService();
