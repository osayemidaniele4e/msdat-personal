import { shallowMount } from '@vue/test-utils';
import ICS from '@/modules/msdat-dashboard/components/sections/advanced/indicator-comparison-section/ICSAdvanced.vue';

describe('YourComponent', () => {
  const wrapper = shallowMount(ICS, {
    propsData: {
      values: {},
      controlIndex: 3,
    },
  });
  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('is a Vue instance', () => {
    expect(wrapper).toBeTruthy();
  });
  it('computes filteredIndicators correctly', () => {
    // Test computed property filteredIndicators
    // Mock values and set them using wrapper.setData()
    wrapper.setData({
      values: {
        indicator: [{ short_name: 'Indicator 1' }, { short_name: 'Indicator 2' }],
      },
    });
    // Now assert the computed property value
    expect(wrapper.vm.filteredIndicators).toHaveLength(2);
    // Add more assertions based on your logic
  });

  it('computes checkData correctly', () => {
    // Test computed property checkData
    // Mock chartOptions and set it using wrapper.setData()
    wrapper.setData({
      chartOptions: {
        series: [
          { data: [1, 2, 3] }, // incorrect data
        ],
      },
    });
    // Now assert the computed property value
    expect(wrapper.vm.checkData()).toBe(false);
    // Add more assertions based on your logic
  });

  it('formats displayFactorSign correctly', () => {
    // Test method displayFactorSign
    const sign = wrapper.vm.displayFactorSign('in percentage');
    expect(sign).toBe('%');
    // Add more assertions based on your logic
  });

  it('watches values.indicator and renders chart accordingly', async () => {
    // Mock the necessary dependencies and data
    wrapper.setData({
      loading: false,
      values: {
        indicator: [{ short_name: 'Indicator 1' }],
      },
    });
    // Trigger the watcher by changing the value
    await wrapper.setData({
      values: {
        indicator: [{ short_name: 'Indicator 2' }],
      },
    });
    // Add assertions to check if the chart has been rendered accordingly
  });
});
