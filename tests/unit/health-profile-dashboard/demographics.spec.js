import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import demographics from '@/modules/state-profile/components/demographics.vue';
import StateBaseMap from '@/components/maps/StateProfileBaseMap.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('demographics.vue', () => {
  let store;
  let state;
  let actions;
  let getters;

  beforeEach(() => {
    state = {
      stateDemographics: [],
    };
    actions = {
      fetchDemographics: jest.fn(),
      getIndicatorsAndSources: jest.fn(),
      allLocations: jest.fn(),
    };
    getters = {
      selectedState: () => 'Nigeria',
    };
    store = new Vuex.Store({
      state,
      actions,
      getters,
    });
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(demographics, {
      store,
      localVue,
      propsData: {
        state: 'National',
        stateDemographics: [],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders StateBaseMap component', () => {
    const wrapper = shallowMount(demographics, {
      store,
      localVue,
      propsData: {
        state: 'National',
        stateDemographics: [],
      },
    });
    expect(wrapper.findComponent(StateBaseMap).exists()).toBe(true);
  });

  it('computes selectedState correctly', () => {
    const wrapper = shallowMount(demographics, {
      store,
      localVue,
      propsData: {
        state: 'National',
        stateDemographics: [],
      },
    });
    expect(wrapper.vm.selectedState).toBe('Nigeria');
  });

  it('calls prepareDemographicData and setLandAreaData on state change', async () => {
    const wrapper = shallowMount(demographics, {
      store,
      localVue,
      propsData: {
        state: 'National',
        stateDemographics: [],
      },
    });
    const prepareDemographicDataSpy = jest.spyOn(wrapper.vm, 'prepareDemographicData');
    const setLandAreaDataSpy = jest.spyOn(wrapper.vm, 'setLandAreaData');
    wrapper.setProps({ state: 'Lagos' });
    await wrapper.vm.$nextTick();
    expect(prepareDemographicDataSpy).toHaveBeenCalled();
    expect(setLandAreaDataSpy).toHaveBeenCalled();
  });

  it('filters commaValue correctly', () => {
    const wrapper = shallowMount(demographics, {
      store,
      localVue,
      propsData: {
        state: 'National',
        stateDemographics: [],
      },
    });
    expect(wrapper.vm.$options.filters.commaValue(1000)).toBe('1,000');
  });

  it('calculates percentage difference correctly', () => {
    const wrapper = shallowMount(demographics, {
      store,
      localVue,
      propsData: {
        state: 'National',
        stateDemographics: [],
      },
    });
    const val = {
      value: 200,
      previousValue: 100,
    };
    const change = wrapper.vm.calcDiff(val);
    expect(change).toBe(100);
    expect(val.pointer).toBe('success');
  });

  it('handles no previous data in calcDiff correctly', () => {
    const wrapper = shallowMount(demographics, {
      store,
      localVue,
      propsData: {
        state: 'National',
        stateDemographics: [],
      },
    });
    const val = {
      value: 200,
      previousValue: null,
    };
    const change = wrapper.vm.calcDiff(val);
    expect(change).toBe(null);
    expect(val.pointer).toBe('danger');
  });
});
