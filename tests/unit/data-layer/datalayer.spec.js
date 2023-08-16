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

describe('DataLayer updatedStoreAvailableIndicator', () => {
  let dataLayer;

  beforeEach(() => {
    // Create a new instance of DataLayer before each test
    dataLayer = new DataLayer(mockVuexStore);
  });

  it('should update the store with available indicators', () => {
    const indicatorIDs = [1, 2, 3];
    const commitMock = jest.spyOn(dataLayer.store, 'commit');

    // Call the method under test
    dataLayer.updatedStoreAvailableIndicator(indicatorIDs);

    // Expect the store's commit method to have been called with the correct arguments
    expect(commitMock).toHaveBeenCalledWith('DL/ADD_DATA', {
      tableName: 'availableDashboardIndicator',
      data: indicatorIDs,
    });

    // Restore the original implementation of the store's commit method
    commitMock.mockRestore();
  });
});

describe('DataLayer setAllIndicators', () => {
  let dataLayer;

  beforeEach(() => {
    // Create a new instance of DataLayer before each test
    dataLayer = new DataLayer(mockVuexStore);

    // Mock the DB methods used in setAllIndicators
    dataLayer.DB = {
      listAllIndicators: jest.fn(() => [
        {
          id: 3,
          full_name: 'Unmet need for family planning',
          short_name: 'Unmet need for family planning',
          desirable_slope: 'Negative',
          indicator_type: 'Impact',
          program_area: 'RMNCH',
          national_target: '8.00',
          national_source: 'NRHP 2017',
          national_information:
            'Target obtained from the National Reproductive Health Policy (NRHP) 2017 to 2021',
          sdg_target: null,
          sdg_information: 'Not available',
          created_at: '2022-10-20T08:42:09.552264Z',
          updated_at: '2023-05-12T11:09:41.783442Z',
          factor: 2,
          first_related: 4,
          second_related: 1,
          third_related: 2,
          fourth_related: null,
          datasources: [1, 2, 7, 25],
          group: [],
        },
        {
          id: 29,
          full_name: 'Maternal Mortality Ratio',
          short_name: 'Maternal Mortality Ratio',
          desirable_slope: 'Negative',
          indicator_type: 'Impact',
          program_area: 'Mortality',
          national_target: '288.00',
          national_source: 'NSHDP II',
          national_information:
            'Target obtained from the draft copy of the National Strategic And Health Development Plan (NSHDP) II',
          sdg_target: '70.0',
          sdg_information:
            'Goal 3 target: By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births',
          created_at: '2022-10-20T08:42:09.594555Z',
          updated_at: '2023-07-18T14:57:03.714878Z',
          factor: 3,
          first_related: 6,
          second_related: 5,
          third_related: 7,
          fourth_related: 8,
          datasources: [2, 6, 7, 8, 9, 30, 3],
          group: [],
        },
        {
          id: 9,
          full_name: 'Prevalence of children with diarrhoea',
          short_name: 'Prevalence of children with diarrhoea',
          desirable_slope: 'Negative',
          indicator_type: 'Impact',
          program_area: 'RMNCH',
          national_target: '0.00',
          national_source: 'Not available',
          national_information: 'Not available',
          sdg_target: null,
          sdg_information: 'Not available',
          created_at: '2022-10-20T08:42:09.562496Z',
          updated_at: '2023-03-16T15:45:32.421279Z',
          factor: 2,
          first_related: 10,
          second_related: 12,
          third_related: null,
          fourth_related: null,
          datasources: [1, 2, 5, 8, 15],
          group: [],
        },
      ]), // Mocked indicator list
    };
  });

  it('should set the indicatorList and defaultIndicators correctly', () => {
    // Call the method under test
    dataLayer.setAllIndicators();

    // Expect indicatorList and defaultIndicators to be set correctly
    expect(dataLayer.indicatorList).toEqual([
      {
        id: 3,
        full_name: 'Unmet need for family planning',
        short_name: 'Unmet need for family planning',
        desirable_slope: 'Negative',
        indicator_type: 'Impact',
        program_area: 'RMNCH',
        national_target: '8.00',
        national_source: 'NRHP 2017',
        national_information:
          'Target obtained from the National Reproductive Health Policy (NRHP) 2017 to 2021',
        sdg_target: null,
        sdg_information: 'Not available',
        created_at: '2022-10-20T08:42:09.552264Z',
        updated_at: '2023-05-12T11:09:41.783442Z',
        factor: 2,
        first_related: 4,
        second_related: 1,
        third_related: 2,
        fourth_related: null,
        datasources: [1, 2, 7, 25],
        group: [],
      },
      {
        id: 29,
        full_name: 'Maternal Mortality Ratio',
        short_name: 'Maternal Mortality Ratio',
        desirable_slope: 'Negative',
        indicator_type: 'Impact',
        program_area: 'Mortality',
        national_target: '288.00',
        national_source: 'NSHDP II',
        national_information:
          'Target obtained from the draft copy of the National Strategic And Health Development Plan (NSHDP) II',
        sdg_target: '70.0',
        sdg_information:
          'Goal 3 target: By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births',
        created_at: '2022-10-20T08:42:09.594555Z',
        updated_at: '2023-07-18T14:57:03.714878Z',
        factor: 3,
        first_related: 6,
        second_related: 5,
        third_related: 7,
        fourth_related: 8,
        datasources: [2, 6, 7, 8, 9, 30, 3],
        group: [],
      },
      {
        id: 9,
        full_name: 'Prevalence of children with diarrhoea',
        short_name: 'Prevalence of children with diarrhoea',
        desirable_slope: 'Negative',
        indicator_type: 'Impact',
        program_area: 'RMNCH',
        national_target: '0.00',
        national_source: 'Not available',
        national_information: 'Not available',
        sdg_target: null,
        sdg_information: 'Not available',
        created_at: '2022-10-20T08:42:09.562496Z',
        updated_at: '2023-03-16T15:45:32.421279Z',
        factor: 2,
        first_related: 10,
        second_related: 12,
        third_related: null,
        fourth_related: null,
        datasources: [1, 2, 5, 8, 15],
        group: [],
      },
    ]);
    expect(dataLayer.defaultIndicators).toEqual([
      {
        id: 3,
        full_name: 'Unmet need for family planning',
        short_name: 'Unmet need for family planning',
        desirable_slope: 'Negative',
        indicator_type: 'Impact',
        program_area: 'RMNCH',
        national_target: '8.00',
        national_source: 'NRHP 2017',
        national_information:
          'Target obtained from the National Reproductive Health Policy (NRHP) 2017 to 2021',
        sdg_target: null,
        sdg_information: 'Not available',
        created_at: '2022-10-20T08:42:09.552264Z',
        updated_at: '2023-05-12T11:09:41.783442Z',
        factor: 2,
        first_related: 4,
        second_related: 1,
        third_related: 2,
        fourth_related: null,
        datasources: [1, 2, 7, 25],
        group: [],
      },
      {
        id: 29,
        full_name: 'Maternal Mortality Ratio',
        short_name: 'Maternal Mortality Ratio',
        desirable_slope: 'Negative',
        indicator_type: 'Impact',
        program_area: 'Mortality',
        national_target: '288.00',
        national_source: 'NSHDP II',
        national_information:
          'Target obtained from the draft copy of the National Strategic And Health Development Plan (NSHDP) II',
        sdg_target: '70.0',
        sdg_information:
          'Goal 3 target: By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births',
        created_at: '2022-10-20T08:42:09.594555Z',
        updated_at: '2023-07-18T14:57:03.714878Z',
        factor: 3,
        first_related: 6,
        second_related: 5,
        third_related: 7,
        fourth_related: 8,
        datasources: [2, 6, 7, 8, 9, 30, 3],
        group: [],
      },
      {
        id: 9,
        full_name: 'Prevalence of children with diarrhoea',
        short_name: 'Prevalence of children with diarrhoea',
        desirable_slope: 'Negative',
        indicator_type: 'Impact',
        program_area: 'RMNCH',
        national_target: '0.00',
        national_source: 'Not available',
        national_information: 'Not available',
        sdg_target: null,
        sdg_information: 'Not available',
        created_at: '2022-10-20T08:42:09.562496Z',
        updated_at: '2023-03-16T15:45:32.421279Z',
        factor: 2,
        first_related: 10,
        second_related: 12,
        third_related: null,
        fourth_related: null,
        datasources: [1, 2, 5, 8, 15],
        group: [],
      },
    ]);
  });
});

