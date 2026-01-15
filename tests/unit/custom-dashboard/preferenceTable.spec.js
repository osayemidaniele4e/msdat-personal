import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import PreferenceTable from '@/modules/custom-dashboard/views/preferenceTable.vue';

// mock Vue instance for test
const localVue = createLocalVue();

// add plugins
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

// test suite to describe preferenceTable component
describe('preferenceTable.vue', () => {
  let store; let computed;
  const updateStep = jest.fn();
  const $swal = jest.fn();
  const resetState = jest.fn();

  // simulate app store
  beforeEach(() => {
    store = new Vuex.Store({
      mutations: { updateStep },
      actions: { resetState },
    });
    computed = {
      indicatorsCount: jest.fn().mockReturnValueOnce(0),
      dataSourceCount: jest.fn().mockReturnValueOnce(0),
      yearsCount: jest.fn().mockReturnValueOnce(0),
      selectedLevel: jest.fn().mockReturnValueOnce([]),
    };
  });

  // test new renders match snapshot
  it('renders properly', async () => {
    const wrapper = shallowMount(PreferenceTable, { localVue, store, computed });

    expect(updateStep).toHaveBeenCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  // test show swal alert on submit with no databox checked
  it('shows alert when empty data submitted', async () => {
    const wrapper = shallowMount(PreferenceTable, {
      localVue, store, computed, mocks: { $swal },
    });
    wrapper.vm.approveData();

    expect($swal).toHaveBeenCalled();
  });

  // test resets state before destroy
  it('resets state before unmount', async () => {
    const wrapper = shallowMount(PreferenceTable, { localVue, store, computed });
    wrapper.destroy();

    expect(resetState).toHaveBeenCalled();
  });
});
