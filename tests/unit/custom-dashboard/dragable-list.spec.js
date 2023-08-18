import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import DragableList from '@/modules/custom-dashboard/components/Custom-dashboard-sections/Dragable-List.vue';

import sections from './test-data/sections';

// mock Vue instance for test
const localVue = createLocalVue();

// add plugins
localVue.use(Vuex);

// test suite to describe DragableList component
describe('DragableList.vue', () => {
  let store;
  const arrangedSections = jest.fn().mockReturnValue(sections);

  // simulate app store
  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        arrangedSections,
      },
    });
  });

  it('is a Vue instance', () => {
    const wrapper = mount(DragableList, { store, localVue });
    expect(wrapper).toBeTruthy();
  });

  // it matches snapshot and calls necessary store functions on render
  it('renders correctly given the store data', () => {
    const wrapper = mount(DragableList, { store, localVue });

    expect(arrangedSections).toHaveBeenCalled();
    expect(wrapper.element).toMatchSnapshot();
  });
});
