// import { mount, createLocalVue } from '@vue/test-utils';
// import Vuex from 'vuex';

// import DashboardDetails from '@/modules/custom-dashboard/views/dashboardDetails.vue';

// const localVue = createLocalVue();

// localVue.use(Vuex);

// describe('DragableList.vue', () => {
//   let store;

//   beforeEach(() => {
//     store = new Vuex.Store({
//       modules: {
//         AUTH_STORE: {
//           getters: {
//             getUser: () => ({ username: 'test' }),
//           },
//         },
//       },
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
//       global: { mocks: { $store, user: { username: 'test' } } },
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
