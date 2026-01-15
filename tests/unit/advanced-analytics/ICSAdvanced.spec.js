import { mount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import ICSAdvanced from '@/modules/msdat-dashboard/components/sections/advanced/indicator-comparison-section/ICSAdvanced.vue';

import baseSubCard from '@/components/ui-components/_base-subCard.vue';
import baseOverlay from '@/components/ui-components/_base-overlay.vue';
import baseModal from '@/components/ui-components/_base-modal.vue';

import values, { factor, query } from './ICSAdvanced-test-data';

// mock Vue instance for test
const localVue = createLocalVue();

// add plugins
localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

describe('ICSAdvanced.vue', () => {
  const propsData = { values, controlIndex: 2 };

  const dlQuery = jest.fn().mockReturnValue(new Promise((res) => res(query)));
  const dlGetLocation = jest.fn().mockReturnValue({ name: 'Abia' });
  const dlGetFactor = jest.fn().mockReturnValue(factor);
  const mocks = {
    dlQuery,
    dlGetLocation,
    dlGetFactor,
  };

  const stubs = {
    'base-overlay': baseOverlay,
    'base-sub-card': baseSubCard,
    'base-modal': baseModal,
  };

  it('renders correctly the indicator title', () => {
    const wrapper = mount(ICSAdvanced, {
      localVue, mocks, propsData, stubs,
    });
    expect(wrapper.vm.title.includes(values.indicator.short_name)).toBe(true);
  });

  it('correctly verifies no data avalilable', () => {
    const wrapper = mount(ICSAdvanced, {
      localVue, mocks: { ...mocks, chartOptions: undefined }, propsData, stubs,
    });
    expect(wrapper.vm.checkData()).toBe(false);
  });

  it('uses the right queries for period plots', () => {
    mount(ICSAdvanced, {
      localVue, mocks, propsData, stubs,
    });
    expect(dlQuery).toHaveBeenCalled();
    expect(dlGetFactor).toHaveBeenCalled();
    expect(dlQuery).toHaveBeenCalledWith({
      indicator: values.indicator.id,
      datasource: values.datasource.id,
      location: values.location.id,
    });
  });

  it('uses the right queries for state plots', () => {
    values.compareBy.name = 'State';

    mount(ICSAdvanced, {
      localVue, mocks, propsData, stubs,
    });
    expect(dlQuery).toHaveBeenCalled();
    expect(dlGetFactor).toHaveBeenCalled();
    expect(dlQuery).toHaveBeenCalledWith({
      indicator: values.indicator.id,
      datasource: values.datasource.id,
      period: values.year,
      location: {
        level: 3,
      },
    });
  });

  it('renders the base-overlay and base-subCard components', async () => {
    const wrapper = mount(ICSAdvanced, {
      localVue, mocks, propsData, stubs,
    });

    const BO = wrapper.findComponent(baseOverlay);
    const BS = wrapper.findComponent(baseSubCard);

    expect(BO.exists()).toBe(true);
    expect(BS.exists()).toBe(true);
  });
});
