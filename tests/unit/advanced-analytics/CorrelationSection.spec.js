import { shallowMount } from '@vue/test-utils';
import CorrelationSection from '@/modules/msdat-dashboard/components/sections/advanced/correlation-section/CorrelationSection.vue';

jest.useFakeTimers();

describe('CorrelationSection.vue', () => {
  it('renders the component with loader when isLoading is true', async () => {
    // Mocking contentDocument and readyState properties
    const mockContentDocument = { readyState: 'complete' };
    global.document.querySelector = jest.fn().mockReturnValue({
      contentDocument: mockContentDocument,
    });

    const wrapper = shallowMount(CorrelationSection);
    expect(wrapper.find('.loader').exists()).toBe(true);

    jest.runAllTimers();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.loader').exists()).toBe(false);
  });

  it('renders the component without loader when isLoading is false', async () => {
    const wrapper = shallowMount(CorrelationSection, {
      data() {
        return {
          isLoading: false,
        };
      },
    });

    expect(wrapper.find('.loader').exists()).toBe(false);
  });

  it('embeds the iframe with correct URL, width, and height', async () => {
    const mockContentDocument = { readyState: 'complete' };
    global.document.querySelector = jest.fn().mockReturnValue({
      contentDocument: mockContentDocument,
    });

    const wrapper = shallowMount(CorrelationSection);

    jest.runAllTimers();
    await wrapper.vm.$nextTick();

    const iframe = wrapper.find('b-embed');
    expect(iframe.exists()).toBe(true);
    expect(iframe.attributes('src')).toBe('https://correlation.e4eweb.space/viz');
    expect(iframe.attributes('width')).toBe('100%');
    expect(iframe.attributes('height')).toBe('400');
  });
});
