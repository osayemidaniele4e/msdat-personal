import DataBase from '@/modules/data-layer/services/database.worker';

describe('DataBase', () => {
  let dataBase;

  beforeEach(() => {
    dataBase = new DataBase();
  });

  describe('listLocations', () => {
    it('should return a unique array of all the LOCATION objects available in iDB', async () => {
      // arrange
      const mockLocation = [{ id: 1 }, { id: 2 }];
      dataBase.db.location = {
        orderBy: jest.fn().mockReturnThis(),
        uniqueKeys: jest.fn().mockResolvedValue(mockLocation),
      };

      // act
      const result = await dataBase.listLocations();

      // assert
      expect(result).toEqual(mockLocation);
    });
  });

  describe('fetchTableData', () => {
    it('should return an array of all data from the specified table', async () => {
      // arrange
      const tableName = 'indicators';
      const mockData = [{ id: 1 }, { id: 2 }];
      dataBase.db[tableName] = {
        orderBy: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockResolvedValue(mockData),
      };

      // act
      const result = await dataBase.fetchTableData(tableName);

      // assert
      expect(result).toEqual(mockData);
    });
  });

  describe('checkIndicatorsInIdb', () => {
    it('should return a unique array of all the indicator indexes available in iDB', async () => {
      // arrange
      const mockIndicator = ['indicator1', 'indicator2'];
      dataBase.db.data = {
        orderBy: jest.fn().mockReturnThis(),
        uniqueKeys: jest.fn().mockResolvedValue(mockIndicator),
      };

      // act
      const result = await dataBase.checkIndicatorsInIdb();

      // assert
      expect(result).toEqual(mockIndicator);
    });
  });

  // describe('listAllIndicators', () => {
  //   it('should return an array containing a list of all indicator ids available to the api', async () => {
  //     // arrange
  //     const mockIndicator = [{ id: 1 }, { id: 2 }];
  //     dataBase.indicators = {
  //       orderBy: jest.fn().mockReturnThis(),
  //       uniqueKeys: jest.fn().mockResolvedValue(mockIndicator),
  //     };

  //     // act
  //     const result = dataBase.listAllIndicators();

  //     // assert
  //     expect(result).toEqual(mockIndicator);
  //   });
  // });
});
