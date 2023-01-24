// import { shallowMount, createLocalVue } from '@vue/test-utils';
// import TableComponent from '@/modules/msdat-dashboard/components/table/TableComponent.vue';
// import dataFormat from '@/modules/msdat-dashboard/components/table/data-format.example';

// const bIconArrowClockwise = {
//   name: 'b-icon-arrow-clockwise',
//   template: '<div></div>',
// };
// const localVue = createLocalVue();
// localVue.component('b-icon-arrow-clockwise', bIconArrowClockwise);

// describe('TableComponent.vue', () => {
//   it('render the Component with data', async () => {
//     const wrapper = shallowMount(TableComponent, {
//       propsData: { dataArray: dataFormat },
//       localVue,
//     });
//     const ibt = wrapper.find('#reset');
//     ibt.trigger('click');
//     expect(wrapper.emitted().reset).toBeTruthy();
//   });

//   it('check if dataArray data is available', async () => {
//     const wrapper = shallowMount(TableComponent, {
//       propsData: { dataArray: dataFormat },
//       localVue,
//     });
//     expect(wrapper.vm.dataArray).toBeTruthy();
//   });
// });
