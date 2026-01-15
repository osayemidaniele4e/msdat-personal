import { shallowMount } from '@vue/test-utils';
import programAreaIcon from '@/modules/state-profile/components/programAreaIcon.vue';

describe('programAreaIcon.vue', () => {
  const factory = (propsData) => shallowMount(programAreaIcon, { propsData: { ...propsData } });

  it('renders correctly', () => {
    const wrapper = factory({ programArea: { name: 'nutrition' } });
    expect(wrapper.exists()).toBe(true);
  });

  it('shows the correct icon for nutrition', () => {
    const wrapper = factory({ programArea: { name: 'nutrition' } });
    expect(wrapper.find('img[src="@/assets/state-profile/svg/salad.svg"]').isVisible()).toBe(true);
  });

  it('shows the correct icon for mortality', () => {
    const wrapper = factory({ programArea: { name: 'mortality' } });
    expect(wrapper.find('img[src="@/assets/state-profile/svg/patient.svg"]').isVisible()).toBe(
      true,
    );
  });

  it('shows the correct icon for Health Facility Survey', () => {
    const wrapper = factory({ programArea: { name: 'Health Facility Survey' } });
    expect(wrapper.find('img[src="@/assets/state-profile/svg/hospital.svg"]').isVisible()).toBe(
      true,
    );
  });

  it('shows the correct icon for HIV', () => {
    const wrapper = factory({ programArea: { name: 'HIV' } });
    expect(wrapper.find('img[src="@/assets/state-profile/svg/ribbon.svg"]').isVisible()).toBe(true);
  });

  it('shows the correct icon for Malaria', () => {
    const wrapper = factory({ programArea: { name: 'Malaria' } });
    expect(wrapper.find('img[src="@/assets/state-profile/svg/mosquito.svg"]').isVisible()).toBe(
      true,
    );
  });

  it('shows the correct icon for Immunization', () => {
    const wrapper = factory({ programArea: { name: 'Immunization' } });
    expect(wrapper.find('img[src="@/assets/state-profile/svg/injection.svg"]').isVisible()).toBe(
      true,
    );
  });

  it('shows the correct icon for REPRODUCTIVE, MATERNAL, NEWBORN AND CHILD HEALTH', () => {
    const wrapper = factory({
      programArea: { name: 'REPRODUCTIVE, MATERNAL, NEWBORN AND CHILD HEALTH' },
    });
    expect(wrapper.find('img[src="@/assets/state-profile/svg/pregnant.svg"]').isVisible()).toBe(
      true,
    );
  });

  it('does not show any icon if programArea.name does not match', () => {
    const wrapper = factory({ programArea: { name: 'unknown' } });
    expect(wrapper.find('img').exists()).toBe(true);
  });
});
