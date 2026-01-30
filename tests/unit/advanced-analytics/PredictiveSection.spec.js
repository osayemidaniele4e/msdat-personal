import { shallowMount, createLocalVue } from '@vue/test-utils';
import PredictiveSection from '@/modules/msdat-dashboard/components/sections/advanced/predictive-section/PredictiveSection.vue';
import BarChart from '@/components/Barchart/BaseBarChart.vue';
import Vuex from 'vuex';

// Explicitly mock axios
jest.mock('axios');

// Create a local Vue instance to use with Vuex
const localVue = createLocalVue();
localVue.use(Vuex);

// Mock child components
const BaseOverlayStub = {
  name: 'BaseOverlay',
  props: ['show'],
  template: '<div><slot v-if="show" /></div>',
};

const BaseSubCardStub = {
  name: 'BaseSubCard',
  template: '<div><slot name="title" /><slot /></div>',
  methods: {
    close: jest.fn(),
  },
};

describe('PredictiveSection.vue', () => {
  let wrapper;
  let store;
  let actions;
  let getters;
  let mutations;

  // Define mocks that might need to be changed per test
  let mockDlQuery;
  let mockDlGetDataSource;
  let mockDlGetFactor;
  let mockGetDataSourcesFromIndicator;
  let mockComputeChartPlotLines;
  let mockDownLoadType;
  let mockDlGetValueTypes;

  // Mock initial props
  const mockValues = {
    indicator: { id: 1, short_name: 'Test Indicator', factor: 'factor1' },
    datasource: { id: 8, datasource: 'Test Datasource' },
    location: { id: 101, name: 'Test Location' },
  };

  // Helper for series data - ensures name consistency
  function getSufficientMockSeriesData(id = mockValues.datasource.id, dataLength = 7) {
    const seriesData = Array.from({ length: dataLength }, (_, i) => [
      (2020 + i).toString(),
      i * 10 + 1,
    ]);
    return {
      name: `DS ${id}`,
      data: seriesData,
    };
  }

  beforeEach(() => {
    actions = {
      PREDICTIVE_ANALYSIS: jest.fn().mockResolvedValue({}),
    };

    getters = {
      getPredictedData: jest.fn(() => ({
        prediction: [
          [2023, 10],
          [2024, 20],
        ],
      })),
      getSelectedDataSourceID: jest.fn(() => `DS ${mockValues.datasource.id}`),
    };

    mutations = {
      'MSDAT_STORE/SET_PAYLOAD': jest.fn(),
      setDataSource: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
      getters,
      mutations,
    });

    mockDlQuery = jest.fn().mockResolvedValue([{ period: '2022', value: '50' }]);
    mockDlGetDataSource = jest.fn((id) => ({ id, datasource: `DS ${id}` }));
    mockDlGetFactor = jest.fn(() => ({ display_factor: 'Test Factor Display' }));
    mockGetDataSourcesFromIndicator = jest.fn().mockResolvedValue([]);
    mockComputeChartPlotLines = jest.fn(() => [
      {
        value: 1,
        color: 'red',
        width: 2,
        zIndex: 5,
        label: { text: 'PlotLine' },
      },
    ]);
    mockDownLoadType = jest.fn();
    mockDlGetValueTypes = jest.fn((id) => ({ id, value_type: `VT ${id}` }));

    wrapper = shallowMount(PredictiveSection, {
      localVue,
      store,
      propsData: {
        values: mockValues,
        closeOverlay: false,
      },
      stubs: {
        'base-overlay': BaseOverlayStub,
        'base-sub-card': BaseSubCardStub,
        BarChart,
      },
      methods: {
        dlGetDataSource: mockDlGetDataSource,
        dlGetValueTypes: mockDlGetValueTypes,
        dlQuery: mockDlQuery,
        dlGetFactor: mockDlGetFactor,
        getDataSourcesFromIndicator: mockGetDataSourcesFromIndicator,
        computeChartPlotLines: mockComputeChartPlotLines,
        downLoadType: mockDownLoadType,
      },
      mocks: {
        $store: {
          commit: mutations['MSDAT_STORE/SET_PAYLOAD'],
        },
        dlDatasource: [
          { id: 8, name: 'DS8' },
          { id: 9, name: 'DS9' },
        ],
      },
    });
  });

  it('renders and mounts correctly', async () => {
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(BarChart).exists()).toBe(true);
    expect(wrapper.find('p.title-text').text()).toContain('Prediction Of Test Indicator');
  });

  describe('Watchers', () => {
    it('watches values.datasource changes', async () => {
      wrapper.vm.toHighChartSeriesSetup = jest.fn().mockResolvedValue({
        seriesArray: [{ name: `DS ${mockValues.datasource.id}`, data: [[2022, 50]] }],
        years: ['2022'],
      });
      wrapper.vm.setUpHighChartConfig = jest.fn().mockResolvedValue({});
      wrapper.vm.loading = false;
      await wrapper.vm.$nextTick();

      const newDataSource = { id: 9, datasource: 'New DS Name' };
      await wrapper.setProps({ values: { ...mockValues, datasource: newDataSource } });
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.loading).toBe(false);
      expect(mutations.setDataSource).toHaveBeenCalledWith(
        expect.anything(),
        newDataSource.datasource,
      );
      expect(wrapper.vm.toHighChartSeriesSetup).toHaveBeenCalledWith([newDataSource]);
      expect(wrapper.vm.setUpHighChartConfig).toHaveBeenCalled();
    });

    it('watches values.indicator changes', async () => {
      wrapper.vm.getAvailableDataSources = jest.fn().mockResolvedValue([{ id: 1, name: 'DS1' }]);
      wrapper.vm.toHighChartSeriesSetup = jest.fn().mockResolvedValue({
        seriesArray: [{ name: `DS ${mockValues.datasource.id}`, data: [[2022, 50]] }],
        years: ['2022'],
      });
      wrapper.vm.setUpHighChartConfig = jest.fn().mockResolvedValue({});

      const newIndicator = { id: 2, short_name: 'New Indicator', factor: 'factor2' };
      mockGetDataSourcesFromIndicator.mockClear().mockResolvedValue([{ id: 1, name: 'DS1' }]);
      mockDlQuery.mockClear().mockResolvedValue([{ period: '2022', value: '50' }]);

      await wrapper.setProps({ values: { ...mockValues, indicator: newIndicator } });
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.loading).toBe(false);
      expect(wrapper.vm.getAvailableDataSources).toHaveBeenCalledWith(newIndicator.id);
      expect(wrapper.vm.toHighChartSeriesSetup).toHaveBeenCalled();
      expect(wrapper.vm.setUpHighChartConfig).toHaveBeenCalled();
    });

    it('watches values.location changes', async () => {
      wrapper.vm.getAvailableDataSources = jest.fn().mockResolvedValue([{ id: 1, name: 'DS1' }]);
      wrapper.vm.toHighChartSeriesSetup = jest.fn().mockResolvedValue({
        seriesArray: [{ name: `DS ${mockValues.datasource.id}`, data: [[2022, 50]] }],
        years: ['2022'],
      });
      wrapper.vm.setUpHighChartConfig = jest.fn().mockResolvedValue({});
      wrapper.vm.loading = false;
      await wrapper.vm.$nextTick();

      const newLocation = { id: 102, name: 'New Location' };
      mockGetDataSourcesFromIndicator.mockClear().mockResolvedValue([{ id: 1, name: 'DS1' }]);
      mockDlQuery.mockClear().mockResolvedValue([{ period: '2022', value: '50' }]);

      await wrapper.setProps({ values: { ...mockValues, location: newLocation } });
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.loading).toBe(false);
      expect(wrapper.vm.getAvailableDataSources).toHaveBeenCalledWith(mockValues.indicator.id);
      expect(wrapper.vm.toHighChartSeriesSetup).toHaveBeenCalled();
      expect(wrapper.vm.setUpHighChartConfig).toHaveBeenCalled();
    });

    it('watches closeOverlay prop changes', async () => {
      wrapper.vm.$refs.SubCard = { close: jest.fn() };
      await wrapper.setProps({ closeOverlay: true });
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.closeOverlay).toBe(true);
      expect(wrapper.vm.$refs.SubCard.close).toHaveBeenCalled();
    });
  });

  describe('Methods', () => {
    it('setUpHighChartConfig sets ChartOptions when data length is sufficient', async () => {
      const currentTestDataSourceId = mockValues.datasource.id;
      const mockSeriesObject = [getSufficientMockSeriesData(currentTestDataSourceId, 7)];
      const mockSortedYears = mockSeriesObject[0].data.map((d) => d[0].toString());

      getters.getSelectedDataSourceID.mockReturnValue(`DS ${currentTestDataSourceId}`);
      getters.getPredictedData.mockReturnValue({
        prediction: [
          ['2027', 8],
          ['2028', 9],
        ],
      });

      await wrapper.vm.setUpHighChartConfig(mockSeriesObject, mockSortedYears);

      expect(actions.PREDICTIVE_ANALYSIS).toHaveBeenCalledWith(expect.anything(), {
        data: mockSeriesObject[0].data,
      });
      expect(wrapper.vm.ChartOptions.series).toHaveLength(2);
      expect(wrapper.vm.ChartOptions.series[0].name).toBe('Actual Data');
      expect(wrapper.vm.ChartOptions.series[1].name).toBe('Prediction');
      expect(wrapper.vm.ChartOptions.xAxis.categories).toEqual([
        ...mockSortedYears,
        '2027',
        '2028',
      ]);
      expect(wrapper.vm.showNoAvailablePrediction).toBe(false);
    });

    it('setUpHighChartConfig sets showNoAvailablePrediction to true if data length is less than 7', async () => {
      const currentTestDataSourceId = mockValues.datasource.id;
      const mockSeriesObject = [getSufficientMockSeriesData(currentTestDataSourceId, 2)];
      const mockSortedYears = mockSeriesObject[0].data.map((d) => d[0].toString());

      getters.getSelectedDataSourceID.mockReturnValue(`DS ${currentTestDataSourceId}`);

      await wrapper.vm.setUpHighChartConfig(mockSeriesObject, mockSortedYears);

      expect(actions.PREDICTIVE_ANALYSIS).not.toHaveBeenCalled();
      expect(wrapper.vm.showNoAvailablePrediction).toBe(true);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.no_prediction').exists()).toBe(true);
      expect(wrapper.find('.no_prediction span').text()).toContain(
        `No prediction is available for ${mockValues.indicator.short_name}`,
      );
    });

    it('toHighChartSeriesSetup processes datasources and returns series data', async () => {
      const dataSources = [{ id: 1, name: 'DS1_prop_name' }];

      // Ensure mockDlQuery is the mock function itself, not its return value, for .mockResolvedValueOnce
      mockDlQuery.mockResolvedValueOnce([
        { period: '2022', value: '10' },
        { period: '2021', value: '5' },
      ]);

      const result = await wrapper.vm.toHighChartSeriesSetup(dataSources);

      expect(mockDlQuery).toHaveBeenCalledWith({
        indicator: mockValues.indicator.id,
        location: mockValues.location.id,
        datasource: 1,
      });
      expect(result.seriesArray).toHaveLength(1);
      expect(result.seriesArray[0].name).toBe('DS 1');
      expect(result.seriesArray[0].data).toEqual([
        ['2021', 5],
        ['2022', 10],
      ]);
      expect(result.years).toEqual(['2021', '2022']);
      expect(wrapper.vm.showNoAvailablePrediction).toBe(true);
    });

    it('getAvailableDataSources calls the correct chain', async () => {
      const indicatorIdToTest = mockValues.indicator.id;
      const mockDataSourcesFromMixin = [{ id: 123, name: 'From Indicator Mixin' }];
      // mockGetDataSourcesFromIndicator is already in wrapper.vm.methods
      mockGetDataSourcesFromIndicator.mockResolvedValue(mockDataSourcesFromMixin);

      const result = await wrapper.vm.getAvailableDataSources(indicatorIdToTest);

      expect(mockGetDataSourcesFromIndicator).toHaveBeenCalledWith(indicatorIdToTest);
      expect(result).toEqual(mockDataSourcesFromMixin);
    });

    it('createSeriesObject correctly formats series object', () => {
      const valueType1 = { id: 1, value_type: 'Type A' };
      const valueType3 = { id: 3, value_type: 'Type C' };
      const name = 'DataSourceName';
      const data = [[2022, 10]];

      let series = wrapper.vm.createSeriesObject(valueType1, name, data);
      expect(series).toEqual({ name: 'DataSourceName', data });

      series = wrapper.vm.createSeriesObject(valueType3, name, data);
      expect(series).toEqual({ name: 'DataSourceName Type C', data });
    });
  });

  it('calls $store.commit in mounted if values.datasource is not present', async () => {
    const localMockValuesNoDS = {
      indicator: { id: 1, short_name: 'Test Indicator', factor: 'factor1' },
      location: { id: 101, name: 'Test Location' },
    };
    const dlDatasourceMockForTest = [
      { id: 8, name: 'DS8_from_dlDatasource' },
      { id: 9, name: 'DS9_from_dlDatasource' },
    ];

    const localMutationsForTest = {
      'MSDAT_STORE/SET_PAYLOAD': jest.fn(),
      setDataSource: jest.fn(),
    };
    const localStoreForTest = new Vuex.Store({
      getters,
      actions,
      mutations: localMutationsForTest,
    });

    const mountedWrapper = shallowMount(PredictiveSection, {
      localVue,
      store: localStoreForTest,
      propsData: {
        values: localMockValuesNoDS,
      },
      stubs: { 'base-overlay': BaseOverlayStub, 'base-sub-card': BaseSubCardStub, BarChart },
      methods: {
        dlGetDataSource: jest.fn((id) => ({ id, datasource: `DS ${id}` })), // Fresh mocks for this specific mount
        dlGetValueTypes: jest.fn((id) => ({ id, value_type: `VT ${id}` })),
        dlQuery: jest.fn().mockResolvedValue([{ period: '2022', value: '50' }]),
        dlGetFactor: jest.fn(() => ({ display_factor: 'Test Factor Display' })),
        getDataSourcesFromIndicator: jest.fn().mockResolvedValue([]),
        computeChartPlotLines: jest.fn(() => []),
        downLoadType: jest.fn(),
      },
      mocks: {
        dlDatasource: dlDatasourceMockForTest,
      },
    });

    await mountedWrapper.vm.$nextTick();
    await mountedWrapper.vm.$nextTick();

    expect(localMutationsForTest['MSDAT_STORE/SET_PAYLOAD']).toHaveBeenCalledWith(
      expect.anything(),
      {
        controlIndex: 3,
        key: 'datasource',
        value: dlDatasourceMockForTest.find((dat) => dat.id === 8),
      },
    );
  });

  it('does not call $store.commit in mounted if values.datasource is present', async () => {
    const freshMutations = { 'MSDAT_STORE/SET_PAYLOAD': jest.fn() };
    const freshStore = new Vuex.Store({ mutations: freshMutations, getters, actions });

    shallowMount(PredictiveSection, {
      localVue,
      store: freshStore,
      propsData: { values: mockValues },
      stubs: { 'base-overlay': BaseOverlayStub, 'base-sub-card': BaseSubCardStub, BarChart },
      methods: {
        dlGetDataSource: mockDlGetDataSource,
        dlGetValueTypes: mockDlGetValueTypes,
        dlQuery: mockDlQuery,
        dlGetFactor: mockDlGetFactor,
        getDataSourcesFromIndicator: mockGetDataSourcesFromIndicator,
        computeChartPlotLines: mockComputeChartPlotLines,
        downLoadType: mockDownLoadType,
      },
      mocks: {
        // $store.commit will use the one from freshStore
        dlDatasource: [
          { id: 8, name: 'DS8' },
          { id: 9, name: 'DS9' },
        ],
      },
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(freshMutations['MSDAT_STORE/SET_PAYLOAD']).not.toHaveBeenCalled();
  });
});
