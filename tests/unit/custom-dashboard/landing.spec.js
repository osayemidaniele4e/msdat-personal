import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Landing from '@/modules/custom-dashboard/views/landing.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

describe('Landing.vue', () => {
  let store;
  let storeWithAuth;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        AUTH_STORE: {
          namespaced: true,
          getters: {
            isAuthenticated: () => false,
          },
        },
      },
    });
    storeWithAuth = new Vuex.Store({
      modules: {
        AUTH_STORE: {
          namespaced: true,
          getters: {
            isAuthenticated: () => true,
          },
        },
      },
    });
  });

  it('renders correctly', () => {
    const wrapper = mount(Landing, { localVue, store });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows auth nav when user is not authenticated', () => {
    const wrapper = mount(Landing, { localVue, store });

    expect(wrapper.findAll('.nav').exists()).toBe(true);
  });

  it('hides auth nav when user is authenticated', () => {
    const wrapper = mount(Landing, { localVue, store: storeWithAuth });

    expect(wrapper.findAll('.nav').exists()).toBe(false);
  });
});
