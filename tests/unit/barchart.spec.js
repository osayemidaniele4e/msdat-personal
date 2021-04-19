import { shallowMount } from '@vue/test-utils';
import BarChart from '@/modules/msdat-dashboard/components/barchart/BaseBarChart.vue';

describe('Mounted BarChart Component ', () => {
  const wrapper = shallowMount(BarChart);

  it('is a Vue instance', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
