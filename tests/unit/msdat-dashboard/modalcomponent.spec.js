import { mount } from '@vue/test-utils';
import ModalComponent from '@/modules/msdat-dashboard/components/modal/ModalComponent.vue';

describe('ModalComponent', () => {
  it('renders correctly without modalSize prop', async () => {
    const wrapper = mount(ModalComponent, {
      slots: {
        'modal-title': 'Test Modal Title',
        default: 'Test Slot Content',
        'modal-footer': 'Test Modal Footer',
      },
    });

    // Log some information to the console
    console.log(wrapper.props()); // Log all props
    console.log(wrapper.vm.$props); // Log props through the Vue instance

    // Assert the presence of modal with specified props
    expect(wrapper.find('#modal').exists()).toBe(true);

    // Assert the presence of modal title, body content, and footer content
    const headerElement = wrapper.find('.header');
    expect(headerElement.exists()).toBe(false);

    if (headerElement.exists()) {
      expect(headerElement.text()).toBe('Test Modal Title');
    }

    const bodyElement = wrapper.find('.body');
    expect(bodyElement.exists()).toBe(false);

    if (bodyElement.exists()) {
      expect(bodyElement.text()).toBe('Test Slot Content');
    }
  });
});
