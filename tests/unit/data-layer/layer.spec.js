// import Dexie from 'dexie';
// import indexedDB from 'fake-indexeddb';
// import DataBase from '@/modules/data-layer/services/LayerService';
// // import mockDataInIbdexedDB from '@/modules/data-layer/sample_data';
// import { MSDAT } from '@/config/dashboardGroups';

// const DB = new Dexie('MyDatabase', { indexedDB });

// jest.mock('dexie');

// describe('Testing for Data Layer Class', () => {
//   let store = '';
//   let db = '';
//   beforeEach(() => {
//     DB.table.count = jest.fn();
//     DB.table.count.mockImplementation(() => Promise.resolve(MSDAT.dashboardIndicators.length));
//     DB.table.toArray = jest.fn();
//     DB.table.toArray.mockImplementation(() => Promise.resolve(MSDAT.dashboardIndicators));
//     DB.table.where = jest.fn();
//     DB.table.where.mockImplementation(() => Promise.resolve(MSDAT.dashboardIndicators));
//     DB.table.where.equals = jest.fn();
//     DB.table.where.equals.mockImplementation((value) => Promise.resolve(value));
//     store = jest.fn();
//     store.commit = jest.fn();
//     db = new DataBase(DB, store);
//     db.data = DB.table;
//     db.countries = DB.table;
//     db.indicators = DB.table;
//     db.location = DB.table;
//     db.factors = DB.table;
//     db.DSI = DB.table;
//     db.location_hierarchy_level = DB.table;
//     db.valuetypes = DB.table;
//     db.datasources = DB.table;

//     db.checkIndicatorsInIdb = jest.fn();
//     db.checkIndicatorsInIdb.mockImplementation(() => Promise.resolve(MSDAT.dashboardIndicators));
//     db.getIndicatorsFromApi = jest.fn();
//     db.getIndicatorFromDB = jest.fn(() => Promise.resolve(MSDAT.dashboardIndicators));
//   });
//   it('test the mocked function', () => {
//     expect(db).toBeTruthy();
//   });
//   it('check if Data Layer is instantiated', () => {
//     expect(db).toBeInstanceOf(DataBase);
//   });

//   it('check if setup exist', () => {
//     db.setup(
//       {
//         dashboardIndicators: MSDAT.dashboardIndicators,
//         defaultIndicators: MSDAT.defaultIndicators,
//       },
//     );
//     expect(db.setup).toBeTruthy();
//   });

//   it('check if is default indicator is set', () => {
//     db.init(
//       {
//         dashboardIndicators: MSDAT.dashboardIndicators,
//         defaultIndicators: MSDAT.defaultIndicators,
//       },
//     );
//     expect(db.defaultIndicators).toBeTruthy();
//     expect(db.defaultIndicators).toEqual(MSDAT.defaultIndicators);
//   });
//   it('check if Data Layer is default indicator is set', () => {
//     expect(db.defaultIndicators).toBeTruthy();
//     expect(db.defaultIndicators).toEqual(MSDAT.defaultIndicators);
//   });
//   it('Test for firstime Users', () => {
//     // db.setup({});
//     // db.data.count.mockImplementationOnce(() => 0);
//     // console.log(db.data.count());

//     // db.init(
//     //   {
//     //     dashboardIndicators: MSDAT.dashboardIndicators,
//     //     defaultIndicators: MSDAT.defaultIndicators,
//     //   },
//     // );

//     // expect(db.defaultIndicators).toBeTruthy();
//     // expect(db.defaultIndicators).toEqual(MSDAT.defaultIndicators);
//   });
//   it('test isDataUpToDate function', async () => {
//     db.isDataUpToDate = jest.fn(() => Promise.resolve(true || false));
//     await expect(db.isDataUpToDate()).resolves.toBe(true || false);
//   });
//   it('test updateData function', async () => {
//     db.updateData = jest.fn(() => Promise.resolve());
//     await expect(db.updateData).toBeTruthy();
//   });

//   it('test checkIndicatorsInIdb function', async () => {
//     db.checkIndicatorsInIdb = jest.fn(() => Promise.resolve(db.indicators.count()));
//     await expect(db.checkIndicatorsInIdb()).toEqual(db.indicators.count());
//   });

//   it('test listAllIndicators function', async () => {
//     db.listAllIndicators = jest.fn(() => Promise.resolve(db.indicators.count()));
//     await expect(db.listAllIndicators()).toEqual(db.indicators.count());
//   });

//   // it('test storeDataForOtherEndPointToDB function', async () => {
//   //   db.storeDataForOtherEndPointToDB = jest.fn(() => Promise.resolve());
//   //   await expect(db.storeDataForOtherEndPointToDB(mockDataInIbdexedDB)).
//   // toHaveBeenCalledWith(mockDataInIbdexedDB);
//   //   });
// });

import DataLayer from '@/modules/data-layer/services/LayerService';
import apiServices from '@/modules/data-layer/services/ApiServices';
// import Database from '@/modules/data-layer/services/database.worker';

// Mock dependencies
jest.mock('@/modules/data-layer/services/ApiServices');
jest.mock('@/modules/data-layer/services/database.worker');
jest.mock('vue');

describe('DataLayer', () => {
  let dataLayer;
  let mockStore;
  let mockDatabase;

  beforeEach(() => {
    // Create a mock store
    mockStore = {
      commit: jest.fn(),
    };

    // Create a mock Database instance
    mockDatabase = {
      listAllIndicators: jest.fn(),
      checkIndicatorsInIdb: jest.fn(),
      storeDataInDBTable: jest.fn(),
      fetchTableData: jest.fn(),
      storeDataInDB: jest.fn(),
      checkIfIndicatorWithYearExist: jest.fn(),
      listLocations: jest.fn(),
    };

    // Create DataLayer instance with mock dependencies
    dataLayer = new DataLayer(mockStore);
    dataLayer.DB = mockDatabase;
  });

  describe('setup method', () => {
    it('should set up indicators, default indicators, and data sources', () => {
      const setupObject = {
        dashboardIndicators: [1, 2, 3],
        defaultIndicators: [1],
        dashboardDataSources: ['source1', 'source2'],
      };

      dataLayer.setup(setupObject);

      expect(dataLayer.indicatorList).toEqual([1, 2, 3]);
      expect(dataLayer.defaultIndicators).toEqual([1]);
      expect(dataLayer.dataSourceList).toEqual(['source1', 'source2']);

      // Check store commits
      expect(mockStore.commit).toHaveBeenCalledWith('DL/SET_DATA', {
        tableName: 'allSources',
        data: ['source1', 'source2'],
      });
      expect(mockStore.commit).toHaveBeenCalledWith('DL/SET_DATA', {
        tableName: 'allIndicator',
        data: [1, 2, 3],
      });
    });
  });

  describe('setDataInStore method', () => {
    it('should commit data to the store with correct parameters', () => {
      const testData = [{ id: 1 }, { id: 2 }];
      const tableName = 'testTable';

      dataLayer.setDataInStore(testData, tableName);

      expect(mockStore.commit).toHaveBeenCalledWith('DL/SET_DATA', {
        tableName,
        data: testData,
      });
    });
  });

  describe('isDataUpToDate method', () => {
    it('should return true if local date is greater or equal to server date', async () => {
      // Mock API response with server date
      const serverDateResponse = {
        data: {
          results: [
            {
              updated_at: '2023-06-15T12:00:00Z',
            },
          ],
        },
      };
      apiServices.getLatestDate.mockResolvedValue(serverDateResponse);

      // Set localStorage with a date after or equal to server date
      localStorage.setItem('dataTimestamp', '2023-06-16T12:00:00Z');

      const result = await dataLayer.isDataUpToDate();
      expect(result).toBe(true);
    });

    it('should return false if local date is before server date', async () => {
      const serverDateResponse = {
        data: {
          results: [
            {
              updated_at: '2023-06-16T12:00:00Z',
            },
          ],
        },
      };
      apiServices.getLatestDate.mockResolvedValue(serverDateResponse);

      // Set localStorage with a date before server date
      localStorage.setItem('dataTimestamp', '2023-06-15T12:00:00Z');

      const result = await dataLayer.isDataUpToDate();
      expect(result).toBe(false);
    });
  });

  describe('checkAllYearsExistInDB method', () => {
    it('should return years not available in the database', async () => {
      const mockIndicatorID = 7;
      const mockDataResult = {
        data: {
          years: [2020, 2021, 2022],
        },
      };

      // Mock API and DB responses
      apiServices.getIndicatorsWithAvailable.mockResolvedValue(mockDataResult);
      mockDatabase.checkIfIndicatorWithYearExist
        .mockResolvedValueOnce(true) // 2020 exists
        .mockResolvedValueOnce(undefined) // 2021 doesn't exist
        .mockResolvedValueOnce(undefined); // 2022 doesn't exist

      const yearsNotAvailable = await dataLayer.checkAllYearsExistInDB(mockIndicatorID);

      expect(yearsNotAvailable).toEqual([2021, 2022]);
    });
  });

  describe('storeTimestampInLocal method', () => {
    it('should store current date in localStorage and Vuex store', () => {
      // Mock current date
      const mockDate = new Date('2023-06-15T12:00:00Z');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

      dataLayer.storeTimestampInLocal();

      // Check localStorage
      expect(localStorage.getItem('dataTimestamp')).toBe(mockDate.toJSON());

      // Check store commit
      expect(mockStore.commit).toHaveBeenCalledWith('DL/SET_DATA', {
        tableName: 'dataTimestamp',
        data: mockDate.toJSON(),
      });
    });
  });
});
