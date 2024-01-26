import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import policySimulator from '@/modules/msdat-dashboard/components/sections/policy-simulator/policySimulator.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

// Mock the store
const store = new Vuex.Store({
  modules: {
    MSDAT_STORE: {
      namespaced: true,
      getters: {
        getConversation: () => [],
      },
    },
  },
});

describe('Mounted policySimulator Component ', () => {
  const wrapper = shallowMount(policySimulator, { localVue, store });

  it('is a Vue instance', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
