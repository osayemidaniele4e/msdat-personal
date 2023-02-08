import { mount } from '@vue/test-utils';
import BaseDashboard from '@/modules/msdat-dashboard/views/dashboard/BaseDashboard.vue';
import BaseIndicatorOverview from '@/modules/msdat-dashboard/components/sections/indicator-overview/BaseIndicatorOverview.vue';
import ControlPanelConfiguration from '@/modules/msdat-dashboard/modules/control_setup/ControlPanelConfiguration.vue';
import LazyLoading from '@/modules/msdat-dashboard/modules/onScroll/lazyLoading.vue';
import BaseZonalAnalysisSection from '@/modules/msdat-dashboard/components/sections/zonal-analysis/BaseZonalSectionComponent.vue';
import ICS from '@/modules/msdat-dashboard/components/sections/indicator-comparism/ICS.vue';
// import DataSetComparison from '@/modules/msdat-dashboard/components/sections/dataset-comparison/datasetComparism.vue';
// import MultiSourceComponent from '@/modules/msdat-dashboard/components/sections/multi-source-compare/multi-source.vue';

describe('BaseDashboard', () => {
  it('renders a BaseDashboard component', () => {
    const wrapper = mount(BaseDashboard);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the first section correctly', () => {
    const wrapper = mount(BaseDashboard);
    const section = wrapper.find('template[v-slot="section-0"]');
    expect(section.exists()).toBe(true);
    expect(section.find(ControlPanelConfiguration).exists()).toBe(true);
    expect(section.find(BaseIndicatorOverview).exists()).toBe(true);
  });

  it('renders the second section correctly', () => {
    const wrapper = mount(BaseDashboard);
    const section = wrapper.find('template[v-slot="section-1"]');
    expect(section.exists()).toBe(true);
    expect(section.find(ControlPanelConfiguration).exists()).toBe(true);
    expect(section.find(LazyLoading).exists()).toBe(true);
    expect(section.find(BaseZonalAnalysisSection).exists()).toBe(true);
  });

  it('renders the third section correctly', () => {
    const wrapper = mount(BaseDashboard);
    const section = wrapper.find('template[v-slot="section-2"]');
    expect(section.exists()).toBe(true);
    expect(section.find(ControlPanelConfiguration).exists()).toBe(true);
    expect(section.find(LazyLoading).exists()).toBe(true);
    expect(section.find(ICS).exists()).toBe(true);
  });
});
