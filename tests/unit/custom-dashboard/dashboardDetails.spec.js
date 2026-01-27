import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import DashboardDetails from '@/modules/custom-dashboard/views/dashboardDetails.vue';

// mock Vue instance for test
const localVue = createLocalVue();

// add plugins
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

// test suite to describe dashboardDetails component
describe('dashboardDetails.vue', () => {
  let store;

  // mock functions to immitate store actions
  const updateStep = jest.fn();
  const resetState = jest.fn();
  const dashboardConfiguration = jest.fn();
  const allSelection = jest.fn();
  const clearAllData = jest.fn();
  const $router = { push: jest.fn() };

  beforeEach(() => {
    // simulate app store
    store = new Vuex.Store({
      mutations: { updateStep },
      actions: {
        resetState, dashboardConfiguration, allSelection, clearAllData,
      },
      modules: {
        AUTH_STORE: {
          namespaced: true,
          getters: {
            getUser: () => ({ username: 'test' }),
          },
        },
      },
    });
  });

  // it matches snapshot and calls necessary store functions on render
  it('renders correctly', () => {
    const wrapper = mount(DashboardDetails, { store, localVue });

    expect(updateStep).toHaveBeenCalled();
    expect(resetState).toHaveBeenCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  // changes the 'formIsValid' property to false when form is submitted without inputs
  it('validates user data when form is submitted', async () => {
    const wrapper = mount(DashboardDetails, { store, localVue });

    expect(wrapper.vm.formIsValid).toEqual(true);

    await wrapper.find('form').trigger('submit');
    expect(wrapper.vm.formIsValid).toEqual(false);
  });

  // dispatches new configuration {name, description, image} to store and emits 'save-data' to parent on successful submit
  it('dispatches new configuration to store and emits `save-data` event on submit', async () => {
    const wrapper = mount(DashboardDetails, { store, localVue, mocks: { $router } });

    await wrapper.find('#d-Name').setValue('name');
    await wrapper.find('#description').setValue('description');
    await wrapper.find('form').trigger('submit');

    expect(dashboardConfiguration).toHaveBeenCalled();
    expect(wrapper.emitted()).toHaveProperty('save-data');
    expect($router.push).toHaveBeenCalledWith('preference-table');
  });
});
