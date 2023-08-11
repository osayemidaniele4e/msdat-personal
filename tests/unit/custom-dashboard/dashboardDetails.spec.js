// import { mount, createLocalVue } from '@vue/test-utils';
// import Vuex from 'vuex';

// import DashboardDetails from '@/modules/custom-dashboard/views/dashboardDetails.vue';

// const localVue = createLocalVue();

// localVue.use(Vuex);

// describe('DragableList.vue', () => {
//   let getters;
//   let store;

//   beforeEach(() => {
//     getters = {
//       getUser: () => ({ username: 'test' }),
//     };

//     store = new Vuex.Store({
//       namespaced: true,
//       getters,
//     });
//   });

//   const $store = {
//     commit: jest.fn(),
//     dispatch: jest.fn(),
//   };

//   it('renders correctly', () => {
//     const wrapper = mount(DashboardDetails, {
//       store,
//       localVue,
//       global: { mock: { $store } },
//     });

//     expect($store.commit).toHaveBeenCalled();
//     expect($store.dispatch).toHaveBeenCalled();
//     expect(localStorage.removeItem).toHaveBeenCalled();

//     expect($store.commit).toHaveBeenCalledWith('updateStep', 1);
//     expect($store.dispatch).toHaveBeenCalledWith('resetState');
//     expect(localStorage.removeItem).toHaveBeenCalledWith('vuex');
//     expect(wrapper.element).toMatchSnapshot();
//   });
// });
