/* eslint-disable consistent-return */
import instance from '@/config/axios';
import {
  dataSourceI,
  indicatorI,
  ProgramAreaIndicatorI,
  LocationI,
  valueTypeI,
  dataSourceConfigI,
} from './types';

class DataEntryService {
  /**
   * @function postDataEntry
   * @author chisomchima
   * @param {dataVal} {}?
   * @returns {Array}
   */
  postDataEntry = async (dataVal: any) => {
    const url = 'dmi/fileuploads/json/';
    const response = await instance.post(url, dataVal);
    console.log(response);
    return response;
  };

  /**
   * @function GET_DATA_ENTRIES
   * @author chisomchima
   * @returns {Array}
   */

  getDataEntries = async () => {
    try {
      const response = await instance.get('dmi/fileuploads?approved=false&application=NGF');
      console.log(response, 'chisom');
      return response.data.results;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @function APPROVE_DATA_ENTRIES
   * @author chisomchima
   * @returns {Array}
   */

  approveDataEntry = async ({ id, comment }) => {
    try {
      const response = await instance.post(`dmi/fileuploads/${id}/approve/`, comment);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @function REJECT_DATA_ENTRIES
   * @author chisomchima
   * @returns {Array}
   */

  rejectDataEntry = async ({ id, comment }) => {
    try {
      const response = await instance.post(`dmi/fileuploads/${id}/reject/`, comment);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @function GET_DATAENTRIES_BY_ID
   * @author chisomchima
   * @returns {Array}
   */

  getDataEntryById = async (id: any) => {
    const result = [];
    try {
      const response = await instance.get(`dmi/fileuploads/${id}/get_data/`);
      console.log(response, 'response');
      // ============================================================
      // STEP 1 :  getting indicators, location and datasource data and return the result 3 array
      // getting indicators, location and datasource data
      await Promise.all(
        response.data?.map(async (el: { [x: string]: any; indicator?: any; location?: any; datasource?: any; }) => {
          const { ...details } = el;
          if (el?.indicator !== undefined && el?.location !== undefined && el?.datasource !== undefined) {
            const indicatorData = await instance.get(`indicators/${el?.indicator}/`);
            const locationData = await instance.get(`location/${el.location}/`);
            const datasourceData = await instance.get(`datasources/${el.datasource}/`);
            // ============================================================
            // STEP 2 :  getting indicators, location and datasource data and return the result 3 array
            // creating a new object with results gotten from the above funtion
            // creating a new object with results gotten from the above funtion
            result.push({
              msg: 'Data Available',
              indicatorName: indicatorData.data.full_name,
              locationName: locationData.data.name,
              datasourceName: datasourceData.data.datasource,
              ...details,
            });
            // console.log(result);
          } else {
            // console.log('hi chisom')
            // eslint-disable-next-line no-const-assign
            result.push({
              msg: 'No Data Available',
            });
          }
        }),
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @function GET_CLASSIFICATION
   * @author chisomchima
   * @returns {Array}
   */

   getClassification = async () => {
     try {
       const response = await instance.get('valuetypes/');
       // eslint-disable-next-line camelcase
       const valueType = [...new Set(response.data.results.map((el: { id: any; value_type: any; }) => ({
         id: el.id,
         value_type: el.value_type,
       })))];
       Promise.resolve(valueType);
       return valueType;
     } catch (err) {
       console.log(err);
     }
   }

  /**
   * @function getDataSources
   * @author davebenard
   * @param {Number} id?
   * @returns {Array<dataSourceConfigI | dataSourceI[]>}
   */
  getDataSources = async (id?: number): Promise<dataSourceI[] | dataSourceI | any> => {
    const urlSource = `datasources/${id || '?size=1000'}`;
    try {
      const { data } = await instance.get(urlSource);
      if (id !== undefined) {
        const locationData = await this.extractLocationLevel(id);
        const classificationData = await this.extractClassification(id, data.classification);
        const periodData = await this.extractYears(data.year_available);
        return {
          data,
          location: locationData,
          classification: classificationData,
          period: periodData,
        };
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
   * @param {Number} id
   * @returns {Promise<string[]>}
   */
  getPeriodsByDs = async (id: number): Promise<string[]> => {
    try {
      const resp = await this.getDataSources(id);
      console.log(resp, 'respobj');
      const period = await this.extractYears(resp.data.year_available);
      return period;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /**
    @function getLocation
    @author davebenard
    @param {Object} options - The options object.
    @param {Number} options.DS - The datasource id.
    @param {Number} options.locationId - The location id.
    @returns {Array<ProgramAreaIndicatorI>}
  */
  getLocation = async ({
    DS,
    locationId,
  }: {
    DS: number;
    locationId: number;
  }): Promise<ProgramAreaIndicatorI[]> => {
    const indicatorIds = [];
    const urlSource = `location/${locationId}/`;
    const urlSource2 = (levelName: string) => `datasource_specific_indicator/?datasource=${DS}&${levelName}=true&size=2000`;

    const locationName = ['national', 'zonal', 'state', 'lga', 'senatorial'];
    try {
      const { data } = await instance.get(urlSource);
      const specificIndicator = await instance.get(urlSource2(locationName[data.level - 1]));
      await specificIndicator.data.results.map((el: { indicator: any; }) => indicatorIds.push(el.indicator));
      const indicatorList = await this.extractIndicators(indicatorIds);
      return indicatorList;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @function getDataSources
   * @author davebenard
   * @param {Number} id
   * @param {String} value
   * @returns {Array<valueTypeI>}
   */
  extractClassification = (id: number, value: string): valueTypeI[] => {
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
   * @param {string} yearStr
   * @returns {string[]}
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
    return years;
  };

  /**
   * @function getDataSources
   * @author davebenard
   * @param {Number} id?
   * @returns {Array<LocationI>}
   */
  extractLocationLevel = async (id: number): Promise<LocationI[]> => {
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

    return locationResult;
  };

  /**
   * @function extractIndicators
   * @author davebenard
   * @param {Number[]} indicatorIds - Array of indicator ids to extract.
   * @returns {ProgramAreaIndicatorI[]} Array of program area and indicators grouped by program area.
   */
  extractIndicators = async (indicatorIds: number[]): Promise<ProgramAreaIndicatorI[]> => {
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
    return group;
  };

  /**
    @function groupByProgramArea
    @author davebenard
    @param {indicatorI[]} data - An array of indicators
    @returns {ProgramAreaIndicatorI[]} - An array of objects that contain program area as string and data as an array of indicators
  */
  groupByProgramArea = (data: indicatorI[]): Array<ProgramAreaIndicatorI> => {
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
    return groupedIndicators;
  };
}

export default new DataEntryService();
