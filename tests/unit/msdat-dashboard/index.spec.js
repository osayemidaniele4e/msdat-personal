import { mount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Index from '@/modules/msdat-dashboard/views/index.vue';
import Loading from '@/modules/msdat-dashboard/views/onboarding/modal.vue';

// mock Vue instance for test
const localVue = createLocalVue();

// add plugins
localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

// test suite to describe Index component
describe('index.vue', () => {
  // mock $DL.init 'await' with 100ms timer
  const $DL = {
    init: jest.fn()
      .mockImplementation(() => new Promise(() => setTimeout(() => { }, 100))),
  };

  it('renders correctly', () => {
    const wrapper = mount(Index, { localVue, mocks: { $DL } });
    const loading = wrapper.findComponent(Loading);

    // initiates dataLayer and shows 'Loading' component on render
    expect($DL.init).toHaveBeenCalled();
    expect(loading.exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });
});
