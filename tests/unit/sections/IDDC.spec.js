import { shallowMount } from '@vue/test-utils';
import IDDC from '../../../src/modules/msdat-dashboard/components/sections/indicator-overview/TheIndicatorDatasourceComparisonChart.vue';

describe('Mounted StateBarChart Component ', () => {
  length.vue;
  const wrapper = shallowMount(IDDC);

  it('is a Vue instance', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
