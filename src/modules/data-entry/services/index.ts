import instance from '@/config/axios';
import { dataSourceI } from './types';

class DataEntryService {
  /**
   * @function getDataSources
   * @author davebenard
   * @param {Number} id?
   * @returns {Array}
   */
  getDataSources = async (id?: number): Promise<dataSourceI[] | dataSourceI | any> => {
    const urlSource = `datasources/${id || '?size=1000'}`;
    try {
      const { data } = await instance.get(urlSource);
      if (id) {
        await this.extractLocationLevel(id);
        await this.extractIndicators(data.indicators);
        await this.extractClassification(id, data.classification);
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

  /**
   * @function getDataSources
   * @author davebenard
   * @param {Number} id?
   * @returns {Array}
   */
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

  /**
   * @function getLocation
   * @author davebenard
   * @param {Number, Number} [DS, locationId]
   * @returns {Array}
   */
  getLocation = async ({ DS, locationId }: { [key: string]: number }) => {
    const indicatorIds = [];
    const urlSource = `location/${locationId}/`;
    const urlSource2 = (levelName: string) => `datasource_specific_indicator/?datasource=${DS}&${levelName}=true&size=1000`;

    const locationName = ['national', 'zonal', 'state', 'lga', 'senatorial'];
    try {
      const { data } = await instance.get(urlSource);
      const specificIndicator = await instance.get(urlSource2(locationName[data.level - 1]));
      await specificIndicator.data.results.map((el) => indicatorIds.push(el.indicator));
      this.extractIndicators(indicatorIds);
      // console.log(data, locationName[data.level], specificIndicator.data.results, indicatorIds);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @function getDataSources
   * @author davebenard
   * @param {Number} id?
   * @returns {Array}
   */
  extractClassification = async (id: number, value: string) => {
    const valueTypes = [
      {
        id: 1,
        value_type: 'Estimate',
      },
      {
        id: 2,
        value_type: 'Survey',
      },
      {
        id: 3,
        value_type: 'Lower bound',
      },
      {
        id: 4,
        value_type: 'Upper bound',
      },
      {
        id: 5,
        value_type: 'Routine',
      },
      {
        id: 6,
        value_type: 'Numerator',
      },
      {
        id: 7,
        value_type: 'Denominator',
      },
    ];
    if (id === 6) {
      return [
        {
          id: 5,
          value_type: 'Routine',
        },
        {
          id: 6,
          value_type: 'Numerator',
        },
        {
          id: 7,
          value_type: 'Denominator',
        },
      ];
    }
    const valueType = valueTypes.filter((el) => el.value_type === value);
    return valueType;
  };

  /**
   * @function getDataSources
   * @author davebenard
   * @param {Number} id?
   * @returns {Array}
   */
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
    console.log({ years });
    return years;
  };

  /**
   * @function getDataSources
   * @author davebenard
   * @param {Number} id?
   * @returns {Array}
   */
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

  /**
   * @function getDataSources
   * @author davebenard
   * @param {Number} id?
   * @returns {Array}
   */
  extractIndicators = async (indicatorIds: number[]) => {
    const indicatorResult = [];
    const requests = indicatorIds.map((id) => {
      const urlSource = `indicators/${id}/`;
      return instance.get(urlSource);
    });

    await Promise.all(requests)
      .then((responses) => {
        responses.forEach((response) => {
          indicatorResult.push(response.data);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    const group = await this.groupByProgramArea(indicatorResult);
    console.log({ group });
  };

  /**
   * @function getDataSources
   * @author davebenard
   * @param {any} data?
   * @returns {Array}
   */
  groupByProgramArea = (data: any[]) => {
    const groupedData = data.reduce((acc, curr) => {
      const { program_area: area } = curr;
      if (!acc[area]) {
        acc[area] = [];
      }
      acc[area].push(curr);
      return acc;
    }, {});

    const programAreas = Object.keys(groupedData);
    const groupedIndicators = programAreas.map((area) => ({
      programArea: area,
      data: groupedData[area],
    }));

    console.log(groupedIndicators);
    return groupedIndicators;
  };
}

export default new DataEntryService();
