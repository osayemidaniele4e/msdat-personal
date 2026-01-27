import { shallowMount } from '@vue/test-utils';
import IDDC from '@/modules/msdat-dashboard/components/sections/TheIndicatorDatasoureComparisonChart.vue';

describe('Mounted IDDC Component ', () => {
  const wrapper = shallowMount(IDDC);

  it('is a Vue instance', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
