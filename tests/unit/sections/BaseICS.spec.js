import { shallowMount } from '@vue/test-utils';
import BaseICS from '../../../src/modules/msdat-dashboard/components/sections/indicator-comparism/BaseICS.vue';

describe('Mounted StateBarChart Component ', () => {
  length.vue;
  const wrapper = shallowMount(BaseICS);

  it('is a Vue instance', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
