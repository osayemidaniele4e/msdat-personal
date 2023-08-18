import { mount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import DataTable from '@/modules/custom-dashboard/views/DataTable.vue';

// mock Vue instance for test
const localVue = createLocalVue();

// add plugins
localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

// test suite to describe DataTable component
describe('DataTable.vue', () => {
  const $router = { push: jest.fn() };
  const $store = {
    getters: { dashboardDetails: { name: 'name', description: 'description' } },
    commit: jest.fn(),
  };

  // test new renders match snapshot
  it('renders properly', async () => {
    // stub the dataTable child component
    const wrapper = mount(DataTable, { localVue, stubs: { DataTable: true }, mocks: { $router, $store } });

    expect($store.commit).toHaveBeenCalled();
    expect($store.commit).toHaveBeenCalledWith('updateStep', 3);
    expect(wrapper.element).toMatchSnapshot();
  });

  // test navigates to previous route when 'Edit Data Table' button is clicked
  it('pushes `preference-table` route on `backToPreference` event', async () => {
    const wrapper = mount(DataTable, { localVue, stubs: { DataTable: true }, mocks: { $router, $store } });

    await wrapper.find('.editBtn').trigger('click');

    expect($router.push).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith('preference-table');
  });

  // test navigates to next route when 'Next Page' button is clicked
  it('pushes `section` route on `approveData` event', async () => {
    const wrapper = mount(DataTable, { localVue, stubs: { DataTable: true }, mocks: { $router, $store } });

    await wrapper.find('.nextBtn').trigger('click');

    expect($router.push).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith('sections');
  });
});
