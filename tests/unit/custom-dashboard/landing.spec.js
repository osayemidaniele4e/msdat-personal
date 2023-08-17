import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Landing from '@/modules/custom-dashboard/views/landing.vue';

// mock Vue instance for test
const localVue = createLocalVue();

// add plugins
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

// test suite to describe landing-page component
describe('Landing.vue', () => {
  let store;

  // mock funtion to return unauthenticated user in first 2 test calls and authenticated user on third call
  const isAuthenticated = jest.fn()
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true);

  // simulate app store
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        AUTH_STORE: {
          namespaced: true,
          getters: {
            isAuthenticated,
          },
        },
      },
    });
  });

  it('renders correctly', () => {
    const wrapper = mount(Landing, { localVue, store });

    expect(isAuthenticated).toHaveBeenCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows auth nav when user is not authenticated', () => {
    const wrapper = mount(Landing, { localVue, store });

    expect(wrapper.findAll('.nav').exists()).toBe(true);
  });

  // called with authenticated user: {isAuthenticated = true}
  it('hides auth nav when user is authenticated', () => {
    const wrapper = mount(Landing, { localVue, store });

    expect(wrapper.findAll('.nav').exists()).toBe(false);
  });
});
