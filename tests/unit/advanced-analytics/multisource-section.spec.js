import { shallowMount } from '@vue/test-utils';
import multisourceSection from '@/modules/msdat-dashboard/components/sections/advanced/multisource-section/multi-source.vue';

describe('Mounted multisourceSection Component', () => {
  // Test Case 1: Check if the component renders correctly with data
  it('renders correctly with data', async () => {
    // Mock data to simulate the component receiving data
    const mockData = {
      indicator: { short_name: 'Mock Indicator' },
      datasource: { datasource: 'Mock Datasource' },
      year: '2022',
      location: { id: 'mock-location-id' },
      visualization: 'line',
    };

    // Create a wrapper with mocked data
    const wrapper = shallowMount(multisourceSection, {
      propsData: { values: mockData },
    });

    // Allow asynchronous updates to the wrapper
    await wrapper.vm.$nextTick();

    // Expectations
    expect(wrapper.vm.chartObject).toBeDefined();
    // Modify the component name according to your actual component name
    expect(wrapper.element).toMatchSnapshot();
  });
});
