import { shallowMount } from '@vue/test-utils';
import zonalSection from '@/modules/msdat-dashboard/components/sections/zonal-analysis/zonalSection.vue';

describe('Mounted zonalSection Component ', () => {
  const wrapper = shallowMount(zonalSection, {
    propsData: {
      controlPanelProps: {
        indicator: { id: 1, short_name: 'example', full_name: 'Example Indicator' },
        datasource: { id: 1 },
        year: '2022',
        location: { id: 1, name: 'Example Location' },
      },
      mapSelectedState: 'exampleState',
      colors: [
        { id: 1, color: 'red' },
        { id: 2, color: 'blue' },
      ],
    },
  });

  it('is a Vue instance', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
