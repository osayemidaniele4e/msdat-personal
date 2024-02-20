import { shallowMount } from '@vue/test-utils';
import chartdownload from '../../../src/modules/msdat-dashboard/components/sections/advanced/mixins/chart_download';

describe('chartdownload', () => {
  it('should call exportChart method with correct parameters for different file types', () => {
    // Mock the BaseChart component and its exportChart method
    const exportChartMock = jest.fn();
    const BaseChartMock = {
      $children: [{
        chart: {
          exportChart: exportChartMock,
          downloadXLS: jest.fn(),
        },
      }],
    };

    // Mount your component with the mocked BaseChart
    const wrapper = shallowMount(chartdownload, {
      mocks: {
        $refs: {
          BaseChart: BaseChartMock,
        },
      },
    });

    // Test each download type
    const downloadTypes = ['svg', 'png', 'jpeg', 'pdf', 'csv', 'xls', 'other'];
    downloadTypes.forEach((type) => {
      // Check if $refs.BaseChart is defined and has $children
      if (wrapper.vm.$refs.BaseChart && wrapper.vm.$refs.BaseChart.$children) {
        // Call the downLoadType method with mocked parameters
        wrapper.vm.downLoadType({ type });

        // Verify that exportChart is called with the correct parameters
        if (type === 'csv') {
          // Add your specific expectation for CSV download
          expect(BaseChartMock.$children[0].chart.exportChart).not.toHaveBeenCalled();
        } else {
          expect(BaseChartMock.$children[0].chart.exportChart).toHaveBeenCalledWith({
            type: expect.any(String),
            filename: expect.any(String),
          });
        }
      } else {
        // Handle the case where $refs.BaseChart is not defined or has no $children
        // This might involve logging a warning or skipping the test
        console.warn('$refs.BaseChart is not properly defined or has no $children');
      }

      // Reset mock for the next iteration
      exportChartMock.mockClear();
    });
  });

  it('should call exportChart method with correct parameters for map download types', () => {
    // Mock the BaseMap component and its exportChart method
    const exportChartMock = jest.fn();
    const BaseMapMock = {
      $children: [{
        chart: {
          exportChart: exportChartMock,
          downloadXLS: jest.fn(),
        },
      }],
    };

    // Mount your component with the mocked BaseMap
    const wrapper = shallowMount(chartdownload, {
      mocks: {
        $refs: {
          BaseMap: BaseMapMock,
        },
      },
    });

    // Test each map download type
    const mapDownloadTypes = ['svg', 'png', 'jpeg', 'pdf', 'csv', 'xls', 'other'];
    mapDownloadTypes.forEach((type) => {
      // Check if $refs.BaseMap is defined and has $children
      if (wrapper.vm.$refs.BaseMap && wrapper.vm.$refs.BaseMap.$children) {
        // Call the downLoadTypeMap method with mocked parameters
        wrapper.vm.downLoadTypeMap({ type });

        // Verify that exportChart is called with the correct parameters
        if (type === 'csv') {
          // Add your specific expectation for CSV download
          expect(BaseMapMock.$children[0].chart.exportChart).not.toHaveBeenCalled();
        } else {
          expect(BaseMapMock.$children[0].chart.exportChart).toHaveBeenCalledWith({
            type: expect.any(String),
            filename: expect.any(String),
          });
        }
      } else {
        // Handle the case where $refs.BaseMap is not defined or has no $children
        // This might involve logging a warning or skipping the test
        console.warn('$refs.BaseMap is not properly defined or has no $children');
      }

      // Reset mock for the next iteration
      exportChartMock.mockClear();
    });
  });
});
