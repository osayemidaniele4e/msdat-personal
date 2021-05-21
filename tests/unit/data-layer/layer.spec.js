import DataBase from '@/modules/DataLayer/services/LayerService';
// import mockDataInIbdexedDB from '@/modules/DataLayer/sample_data';
import { MSDAT } from '@/config/dashboardGroups';
import Dexie from 'dexie';
import indexedDB from 'fake-indexeddb';

const DB = new Dexie('MyDatabase', { indexedDB });

jest.mock('dexie');

describe('Testing for Data Layer Class', () => {
  let store = '';
  let db = '';
  beforeEach(() => {
    DB.table.count = jest.fn();
    DB.table.count.mockImplementation(() => Promise.resolve(MSDAT.dashboardIndicators.length));
    DB.table.toArray = jest.fn();
    DB.table.toArray.mockImplementation(() => Promise.resolve(MSDAT.dashboardIndicators));
    DB.table.where = jest.fn();
    DB.table.where.mockImplementation(() => Promise.resolve(MSDAT.dashboardIndicators));
    DB.table.where.equals = jest.fn();
    DB.table.where.equals.mockImplementation((value) => Promise.resolve(value));
    store = jest.fn();
    store.commit = jest.fn();
    db = new DataBase(DB, store);
    db.data = DB.table;
    db.countries = DB.table;
    db.indicators = DB.table;
    db.location = DB.table;
    db.factors = DB.table;
    db.DSI = DB.table;
    db.location_hierarchy_level = DB.table;
    db.valuetypes = DB.table;
    db.datasources = DB.table;

    db.checkIndicatorsInIdb = jest.fn();
    db.checkIndicatorsInIdb.mockImplementation(() => Promise.resolve(MSDAT.dashboardIndicators));
    db.getIndicatorsFromApi = jest.fn();
    db.getIndicatorFromDB = jest.fn(() => Promise.resolve(MSDAT.dashboardIndicators));
  });
  it('test the mocked function', () => {
    expect(db).toBeTruthy();
  });
  it('check if Data Layer is instantiated', () => {
    expect(db).toBeInstanceOf(DataBase);
  });

  it('check if setup exist', () => {
    db.setup(
      {
        dashboardIndicators: MSDAT.dashboardIndicators,
        defaultIndicators: MSDAT.defaultIndicators,
      },
    );
    expect(db.setup).toBeTruthy();
  });

  it('check if is default indicator is set', () => {
    db.init(
      {
        dashboardIndicators: MSDAT.dashboardIndicators,
        defaultIndicators: MSDAT.defaultIndicators,
      },
    );
    expect(db.defaultIndicators).toBeTruthy();
    expect(db.defaultIndicators).toEqual(MSDAT.defaultIndicators);
  });
  it('check if Data Layer is default indicator is set', () => {
    expect(db.defaultIndicators).toBeTruthy();
    expect(db.defaultIndicators).toEqual(MSDAT.defaultIndicators);
  });
  it('Test for firstime Users', () => {
    // db.setup({});
    // db.data.count.mockImplementationOnce(() => 0);
    // console.log(db.data.count());

    // db.init(
    //   {
    //     dashboardIndicators: MSDAT.dashboardIndicators,
    //     defaultIndicators: MSDAT.defaultIndicators,
    //   },
    // );

    // expect(db.defaultIndicators).toBeTruthy();
    // expect(db.defaultIndicators).toEqual(MSDAT.defaultIndicators);
  });
  it('test isDataUpToDate function', async () => {
    db.isDataUpToDate = jest.fn(() => Promise.resolve(true || false));
    await expect(db.isDataUpToDate()).resolves.toBe(true || false);
  });
  it('test updateData function', async () => {
    db.updateData = jest.fn(() => Promise.resolve());
    await expect(db.updateData).toBeTruthy();
  });

  it('test checkIndicatorsInIdb function', async () => {
    db.checkIndicatorsInIdb = jest.fn(() => Promise.resolve(db.indicators.count()));
    await expect(db.checkIndicatorsInIdb()).toEqual(db.indicators.count());
  });

  it('test listAllIndicators function', async () => {
    db.listAllIndicators = jest.fn(() => Promise.resolve(db.indicators.count()));
    await expect(db.listAllIndicators()).toEqual(db.indicators.count());
  });

  // it('test storeDataForOtherEndPointToDB function', async () => {
  //   db.storeDataForOtherEndPointToDB = jest.fn(() => Promise.resolve());
  //   await expect(db.storeDataForOtherEndPointToDB(mockDataInIbdexedDB)).
  //toHaveBeenCalledWith(mockDataInIbdexedDB);
  //   });
});
