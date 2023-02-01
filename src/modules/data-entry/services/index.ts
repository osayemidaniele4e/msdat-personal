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
        await this.extractLocationLevel(id);
        console.log(data.results, id);
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
      return period;
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

  extractLocationLevel = async (id: number) => {
    // const urlSource = `datasource_specific_indicator/?datasource=${id}&size=1000`;
    // const { data } = await instance.get(urlSource);

    // const locationData = data.results;

    // let national = true;
    // let senatorial = true;
    // let state = true;

    // locationData.forEach((item) => {
    //   if (!item.national) national = false;
    //   if (!item.senatorial) senatorial = false;
    //   if (!item.state) state = false;
    // });
    // console.log({ national, senatorial, state }, locationData);
    // return { national, senatorial, state };

    // const locationLevels = data.results.reduce((acc, item) => {
    //   if (item.national) acc.national = 'national';
    //   if (item.state) acc.state = 'state';
    //   if (item.senatorial) acc.senatorial = 'senatorial';
    //   return acc;
    // }, {});
    // console.log(Object.values(locationLevels), data.results, locationLevels);
    // const levels = [1, 2, 3];
    // const urlSource = `location/?level=${id}&size=1000`;
    // const { data } = await instance.get(urlSource);

    const levels = [1, 2, 3];
    const locationResult = [];
    const requests = levels.map((level) => {
      const urlSource = `location/?level=${level}&size=1000`;
      return instance.get(urlSource);
    });

    await Promise.all(requests)
      .then((responses) => {
        responses.forEach((response) => {
          locationResult.push(...response.data.results);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(locationResult, 'hello');
  };

  extractIndicator = async (indicatorId: number) => {
    const indicatorResult = [];
    // const requests = levels.map((id) => {
    //   const urlSource = `indicator/?id=${id}&size=1000`;
    //   return instance.get(urlSource);
    // });

    // await Promise.all(requests)
    //   .then((responses) => {
    //     responses.forEach((response) => {
    //       indicatorResult.push(...response.data.results);
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
}

export default new DataEntryService();
