import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Landing from '@/modules/custom-dashboard/views/landing.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Landing.vue', () => {
  let store;

  const isAuthenticated = jest
    .fn()
    .mockImplementationOnce(() => false)
    .mockReturnValueOnce(() => true);

  beforeEach(() => {
    store = new Vuex.Store({
      namespaced: true,
      modules: {
        AUTH_STORE: {
          getters: {
            isAuthenticated,
          },
        },
      },
    });
  });

  it('renders correctly', () => {
    const wrapper = mount(Landing, { localVue, store });

    expect(wrapper.findAll('.nav')).toHaveLength(1);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('shows auth bar when user is not authenticated', () => {
    const wrapper = mount(Landing, { localVue, store });

    expect(wrapper.findAll('.nav')).toHaveLength(1);
  });

  xit('hides auth bar when user is authenticated', () => {
    const wrapper = mount(Landing, { localVue, store, global: { mocks: { isAuthenticated: true } } });

    expect(wrapper.findAll('.nav')).toHaveLength(0);
  });
});
