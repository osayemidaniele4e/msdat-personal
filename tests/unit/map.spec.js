import { shallowMount } from '@vue/test-utils';
import BaseMap from '@/components/maps/BaseMap.vue';

describe('Mounted BarChart Component ', () => {
  const wrapper = shallowMount(BaseMap);

  it('is a Vue instance', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
