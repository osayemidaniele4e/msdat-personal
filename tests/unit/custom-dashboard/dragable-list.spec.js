import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import DragableList from '@/modules/custom-dashboard/components/Custom-dashboard-sections/Dragable-List.vue';

import sections from './test-data/sections';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('DragableList.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      namespaced: true,
      modules: {
        AUTH_STORE: {
          getters: {
            arrangedSections: () => sections,
          },
        },
      },
    });
  });

  it('is a Vue instance', () => {
    const wrapper = shallowMount(DragableList, { store, localVue });
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly given the store data', () => {
    const wrapper = shallowMount(DragableList, { store, localVue });
    expect(wrapper.element).toMatchSnapshot();
  });
});
