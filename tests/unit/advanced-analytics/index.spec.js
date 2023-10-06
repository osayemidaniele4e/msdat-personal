/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { mount, createLocalVue } from '@vue/test-utils';
import landing from '../../../src/modules/msdat-dashboard/views/analytics/landing.vue';

// Mock theHeader component
jest.mock('../../../src/modules/msdat-dashboard/views/about/layout/theHeader.vue', () => ({
  name: 'MockedHeader',
  render: (h) => h('div', 'Mocked Header Component'),
}));

// Mock tour module
jest.mock('../../../src/modules/msdat-dashboard/views/onboarding/tour', () => ({
  someMethodOrProperty: jest.fn().mockReturnValue('Mocked Value'),
}));

// Mock DescriptiveAnalysisConfig module
jest.mock('../../../src/modules/msdat-dashboard/components/sections/advanced/descriptive-section/descriptive-section-config', () => ({
  someExportedFunction: jest.fn().mockReturnValue('Mocked Value'),
}));

// Mock CorrelationAnalysisConfig module
jest.mock('../../../src/modules/msdat-dashboard/components/sections/advanced/correlation-section/correlation-section-config', () => ({
  anotherExportedFunction: jest.fn().mockReturnValue('Mocked Value'),
}));

// Mock PredictiveAnalysisConfig module
jest.mock('../../../src/modules/msdat-dashboard/components/sections/advanced/predictive-section/predictive-section-config', () => ({
  someExportedFunction: jest.fn().mockReturnValue('Mocked Value'),
}));

// Mock AdvancedMultiSourceConfig module
jest.mock('../../../src/modules/msdat-dashboard/components/sections/advanced/multisource-section/Multisource-section-config', () => ({
  someExportedFunction: jest.fn().mockReturnValue('Mocked Value'),
}));

// Mock ScatterplotConfig module
jest.mock('../../../src/modules/msdat-dashboard/components/sections/advanced/scatterplot-section/scatterplot-section-config', () => ({
  someExportedFunction: jest.fn().mockReturnValue('Mocked Value'),
}));

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
  const links = [
    { text: 'CorreapiCalld/Advanced_Analytics?index=0' },
    { text: 'Descriptive Analysis', route: '/dashboard/Advanced_Analytics?index=1' },
    { text: 'Predictive Analysis', route: '/dashboard/Advanced_Analytics?index=2' },
    { text: 'Multi-source Indicator Comparison', route: '/dashboard/Advanced_Analytics?index=3' },
    // Add other links as needed
  ];

  const wrapper = mount(landing);

  it('Test Component is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Test Correlation Analysis link exists', async () => {
    // Set the component's links data property
    const routerLink = wrapper.find('#CorrelationAnalysis');
    // Assert that the element exists
    expect(routerLink.exists()).toBe(true);
  });
  it('Test Descriptive Analysis link exists', () => {
    const routerLink = wrapper.find('#DescriptiveAnalysis');
    // Assert that the element exists
    expect(routerLink.exists()).toBe(true);
  });
  it('Test Predictive Analysis link exists', () => {
    const routerLink = wrapper.find('#PredictiveAnalysis');
    // Assert that the element exists
    expect(routerLink.exists()).toBe(true);
  });

  it('Test Indicator Comparison link exists', () => {
    const routerLink = wrapper.find('#IndicatorComparison');
    // Assert that the element exists
    expect(routerLink.exists()).toBe(true);
  });
});
