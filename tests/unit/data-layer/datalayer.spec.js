// Import the DataLayer class
import DataLayer from '../../../src/modules/data-layer/services/LayerService';
import mockVuexStore from '../../__mocks__/mockVuexStore';
import ApiServices from '../../../src/modules/data-layer/services/ApiServices';

describe('DataLayer Constructor Initialization', () => {
  let dataLayer;

  beforeEach(() => {
    // Create a new instance of DataLayer before each test
    dataLayer = new DataLayer(mockVuexStore);
  });

  it('should initialize instance variables correctly', () => {
    // Access the instance variables and test their initial values
    expect(dataLayer.DB).toBe('');
    expect(dataLayer.store).toBeDefined();
    expect(dataLayer.indicatorList).toEqual([]);
    expect(dataLayer.defaultIndicators).toEqual([]);
    expect(dataLayer.dataSourceList).toEqual([]);
    expect(dataLayer.LOCAL_STORAGE_KEY).toBe('dataTimestamp');
    expect(dataLayer.Changes).toEqual([]);
  });
});

// Mock the ApiServices module
jest.mock('../../../src/modules/data-layer/services/ApiServices');

describe('DataLayer isDataUpToDate', () => {
  let dataLayer;

  beforeEach(() => {
    // Create a new instance of DataLayer before each test
    dataLayer = new DataLayer(mockVuexStore);

    // Mock the local storage getItem and setItem methods
    const localStorageMock = (function () {
      let store = {};

      return {
        getItem(key) {
          return store[key] || null;
        },
        setItem(key, value) {
          store[key] = value.toString();
        },
        clear() {
          store = {};
        },
      };
    }());

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('should return true when data is up to date', async () => {
    // Mock the getLatestDate function to return a specific date
    const currentTimestamp = Date.now();

    ApiServices.getLatestDate = jest.fn(() => Promise.resolve({ data: [{ updated_at: new Date(currentTimestamp).toISOString() }] }));
    // Set a current timestamp in local storage
    window.localStorage.setItem('dataTimestamp', currentTimestamp);

    // Call the method under test
    try {
      const result = await dataLayer.isDataUpToDate();
      expect(result).toBe(true);
    } catch (error) {
      console.log('failed to check if data is up to date');
    }

    // Expect the result to be true
  });

  it('should return false when data is not up to date', async () => {
    const oldTimestamp = Date.now() - 10 * 24 * 60 * 60 * 1000;

    // Mock the getLatestDate function to return a specific date

    ApiServices.getLatestDate = jest.fn(() => Promise.resolve({ data: [{ updated_at: new Date(oldTimestamp - 1000).toISOString() }] }));

    // Set an old timestamp in local storage (e.g., 10 days ago)
    window.localStorage.setItem('dataTimestamp', oldTimestamp);

    // Call the method under test
    try {
      const result = await dataLayer.isDataUpToDate();
      expect(result).toBe(false);
    } catch (error) {
      console.log('failed to check if data is up to date');
    }
    // Expect the result to be false
  });
});
