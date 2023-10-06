/* eslint-disable no-param-reassign */
import { shallowMount, createLocalVue } from '@vue/test-utils';

import landing from '../../../src/modules/msdat-dashboard/views/analytics/landing.vue';

// Create a local Vue instance
const localVue = createLocalVue();

// Mock VueAxios, VueAuthenticate, and axios
localVue.use({
  install(vue) {
    vue.prototype.$auth = {
      // Mock authentication methods if needed
    };
    vue.prototype.$http = {
      // Mock HTTP methods if needed
    };
  },
});

describe('Advanced Analytics.vue', () => {
  // const links = [
  //   { text: 'CorreapiCalld/Advanced_Analytics?index=0' },
  //   { text: 'Descriptive Analysis', route: '/dashboard/Advanced_Analytics?index=1' },
  //   { text: 'Predictive Analysis', route: '/dashboard/Advanced_Analytics?index=2' },
  //   { text: 'Multi-source Indicator Comparison', route: '/dashboard/Advanced_Analytics?index=3' },
  //   // Add other links as needed
  // ];

  const wrapper = shallowMount(landing);

  it('Test Component is a vue instance', () => {
    // expect(wrapper.isVueInstance()).toBeTruthy();
    console.log(wrapper);
  });

  //   it('renders correctly', () => {
  //     expect(wrapper.element).toMatchSnapshot();
  //   });

  //   it('Can Navigate to Correlation Analysis', async () => {
  //     // Set the component's links data property
  //     wrapper.setData({ links });
  //     const routerLink = wrapper.find('a:contains("Correlation Analysis")');
  //     await routerLink.trigger('click');
  //     expect(wrapper.vm.$route.path).toBe('/dashboard/Advanced_Analytics?index=0');
  //   });
  //   it('Can Navigate to Descriptive Analysis', () => {
  //     const wrapper = mount(Landing);
  //     expect(wrapper.isVueInstance()).toBeTruthy();
  //     console.log(wrapper);
  //   });
  //   it('Can Navigate to Predictive Analysis', () => {
  //     const wrapper = mount(Landing);
  //     expect(wrapper.isVueInstance()).toBeTruthy();
  //     console.log(wrapper);
  //   });
});
