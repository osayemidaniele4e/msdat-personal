import { mount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import ArrangeSections from '@/modules/custom-dashboard/views/ArrangeSections.vue';

// mock Vue instance for test
const localVue = createLocalVue();

// add plugins
localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

// test suite to describe ArrangeSections component
describe('ArrangeSections.vue', () => {
  const commit = jest.fn();
  const dispatch = jest.fn();
  const push = jest.fn();

  // mock store
  const $store = {
    commit,
    dispatch,
    getters: { dashboardDetails: { name: 'name' } },
    state: {
      MSDAT_STORE: {
        indicatorComparision: false,
        zonalAnalysis: false,
        indicatorComparsionByPeriod: false,
        multisourceComparison: false,
        datasetComperision: false,
      },
    },
  };
  // mock router
  const $router = { push };

  it('renders correctly and updates store', () => {
    const wrapper = mount(ArrangeSections, { localVue, mocks: { $router, $store } });

    // updates store and matches snapshot on initial mount
    expect(commit).toHaveBeenCalledWith('updateStep', 4);
    expect(dispatch).toHaveBeenCalledWith('deactivateAllSections');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('updates store on each dashboard selection', () => {
    const wrapper = mount(ArrangeSections, { localVue, mocks: { $router, $store } });

    // simulate input click
    const selectionInput = wrapper.find('input[name="dashboard"]');
    selectionInput.trigger('click');

    expect(dispatch).toHaveBeenCalled();
  });

  // test update store and calls router push on button click
  it('navigates properly to dashboard view on button click', async () => {
    const wrapper = mount(ArrangeSections, { localVue, mocks: { $router, $store } });

    // simulate next button click
    const nextButton = wrapper.find('.nextBtn');
    await nextButton.trigger('click');

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith('customDashboard', true);
    expect($router.push).toHaveBeenCalled();
  });
});
