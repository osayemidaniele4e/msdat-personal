import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import DashboardDetails from '@/modules/custom-dashboard/views/dashboardDetails.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

describe('dashboardDetails.vue', () => {
  let store;
  const updateStep = jest.fn();
  const resetState = jest.fn();
  const dashboardConfiguration = jest.fn();
  const allSelection = jest.fn();
  const clearAllData = jest.fn();

  beforeEach(() => {
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

  it('renders correctly', () => {
    const wrapper = mount(DashboardDetails, { store, localVue });

    expect(updateStep).toHaveBeenCalled();
    expect(resetState).toHaveBeenCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('validates user data when form is submitted', async () => {
    const wrapper = mount(DashboardDetails, { store, localVue });

    expect(wrapper.vm.formIsValid).toEqual(true);

    await wrapper.find('form').trigger('submit');
    expect(wrapper.vm.formIsValid).toEqual(false);
  });

  it('dispatches new configuration and emits `save-data` event on save user data', async () => {
    const wrapper = mount(DashboardDetails, { store, localVue });

    await wrapper.find('#d-Name').setValue('name');
    await wrapper.find('#description').setValue('description');
    await wrapper.find('form').trigger('submit');

    expect(dashboardConfiguration).toHaveBeenCalled();
    expect(wrapper.emitted()).toHaveProperty('save-data');
  });
});
