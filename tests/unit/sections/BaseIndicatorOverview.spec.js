import { shallowMount } from '@vue/test-utils';
import BaseIndicatorOverview from '../../../src/modules/msdat-dashboard/components/sections/indicator-overview/BaseIndicatorOverview.vue';

describe('Mounted BaseIndicatorOverview Component ', () => {
  const wrapper = shallowMount(BaseIndicatorOverview);

  it('is a Vue instance', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
