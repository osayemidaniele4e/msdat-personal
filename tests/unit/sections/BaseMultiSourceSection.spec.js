import { shallowMount } from '@vue/test-utils';
import BaseMultiSourceSection from '@/modules/msdat-dashboard/components/sections/multi-source-compare/BaseMultiSourceSection.vue';

describe('Mounted BaseMultiSourceSection Component ', () => {
  const wrapper = shallowMount(BaseMultiSourceSection);

  it('is a Vue instance', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
