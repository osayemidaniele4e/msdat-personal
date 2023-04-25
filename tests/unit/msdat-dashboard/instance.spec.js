import { mount } from '@vue/test-utils';
import BaseDashboard from '@/modules/msdat-dashboard/views/dashboard/BaseDashboard.vue';
// import BaseIndicatorOverview from '@/modules/msdat-dashboard/components/sections/indicator-overview/BaseIndicatorOverview.vue';
// import ControlPanelConfiguration from '@/modules/msdat-dashboard/modules/control_setup/ControlPanelConfiguration.vue';
// import LazyLoading from '@/modules/msdat-dashboard/modules/onScroll/lazyLoading.vue';
// import BaseZonalAnalysisSection from '@/modules/msdat-dashboard/components/sections/zonal-analysis/BaseZonalSectionComponent.vue';
// import ICS from '@/modules/msdat-dashboard/components/sections/indicator-comparism/ICS.vue';
// import DataSetComparison from '@/modules/msdat-dashboard/components/sections/dataset-comparison/datasetComparism.vue';
// import MultiSourceComponent from '@/modules/msdat-dashboard/components/sections/multi-source-compare/multi-source.vue';

describe('BaseDashboard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BaseDashboard, {
      propsData: {
        updateValue: jest.fn(),
        updateKey: jest.fn(),
        resetData: jest.fn(),
      },
      slots: {
        'top-section': '<div class="top-section">Top Section</div>',
      },
    });
  });

  it('renders the component', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('emits the swipe event when called', () => {
    wrapper.vm.changeSwipe();
    expect(wrapper.emitted().swipe).toBeTruthy();
  });

  it('renders the top section slot', () => {
    expect(wrapper.find('.top-section').text()).toBe('Top Section');
  });
});
