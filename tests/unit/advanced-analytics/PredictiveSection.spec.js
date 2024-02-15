import { shallowMount } from '@vue/test-utils';
import PredictiveAnalysis from '@/modules/msdat-dashboard/components/sections/advanced/predictive-section/PredictiveSection.vue';

describe('PredictiveAnalysis Component', () => {
  it('renders correctly with data', async () => {
    const mockData = {
      indicator: { short_name: 'Mock Indicator' },
      datasource: { datasource: 'Mock Datasource' },
      year: '2022',
      location: { id: 'mock-location-id' },
      visualization: 'line',
    };

    const wrapper = shallowMount(PredictiveAnalysis, {
      propsData: { values: mockData },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.ChartOptions).toBeDefined();
    expect(wrapper.findComponent({ name: 'BarChart' }).exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
});
