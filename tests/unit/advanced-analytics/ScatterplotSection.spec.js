import { shallowMount } from '@vue/test-utils';
import ScatterplotSection from '@/modules/msdat-dashboard/components/sections/advanced/scatterplot-section/ScatterplotSection.vue';

describe('ScatterplotSection.vue', () => {
  it('renders the component without errors', () => {
    const wrapper = shallowMount(ScatterplotSection);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays "coming soon" when showComing is true', async () => {
    const wrapper = shallowMount(ScatterplotSection, {
      data() {
        return {
          showComing: true,
        };
      },
    });

    await wrapper.vm.$nextTick();

    const comingSoonElement = wrapper.find('.show-coming');
    expect(comingSoonElement.exists()).toBe(true);
  });

  it('does not display "coming soon" when showComing is false', async () => {
    const wrapper = shallowMount(ScatterplotSection, {
      data() {
        return {
          showComing: false,
        };
      },
    });

    await wrapper.vm.$nextTick();

    const comingSoonElement = wrapper.find('.show-coming');
    expect(comingSoonElement.exists()).toBe(false);
  });

  it('embeds the iframe with correct URL, width, and height', async () => {
    const wrapper = shallowMount(ScatterplotSection);

    await wrapper.vm.$nextTick();

    const iframeElement = wrapper.find('b-embed');
    expect(iframeElement.exists()).toBe(true);
    expect(iframeElement.attributes('src')).toBe(wrapper.vm.url);
    expect(iframeElement.attributes('width')).toBe(wrapper.vm.width);
    expect(iframeElement.attributes('height')).toBe(wrapper.vm.height);
  });
});
