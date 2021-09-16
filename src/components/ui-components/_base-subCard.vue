<template>
  <div class="card">
    <div
      class="
        card-header
        d-flex
        justify-content-between
        border-bottom-0
        align-items-center
      "
      :style="{ backgroundColor }"
    >
      <div class="title w-100">
        <slot name="title"> slot title fallback </slot>
      </div>
      <div
        class="action-icon d-flex justify-content-around align-items-center"
        v-if="showControls"
      >
        <b-icon
          icon="arrows-fullscreen"
          @click="showModal = !showModal"
          class="mx-1 font-weight-bold"
          font-scale="1.1"
        ></b-icon>
        <b-icon
          icon="three-dots-vertical"
          @click="showMenu = !showMenu"
          class="mx-1 font-weight-bold"
          font-scale="1.1"
        ></b-icon>
      </div>
    </div>
    <div class="card-body work-sans p-0" style="position: relative">
      <div @mouseleave="showMenu = false">
        <SubCardDropdown
          @dropDownTypeSelected="$emit('dropdownTypeSelected', $event)"
          v-show="showMenu"
        />
      </div>

      <div class="row no-gutters">
        <div class="col" :class="[sideControl ? 'col-10' : '']">
          <div v-if="buttonToggle" class="d-flex justify-content-end">
            <SubCardToggleButton
              v-show="showToggle"
              @button-clicked="$emit('toggled-button', $event)"
            />
          </div>
          <slot>
            <!-- <p class="card-text">The SubCard fallback.</p> -->
          </slot>
        </div>
        <SubCardSideControl
          :selectedOptions.sync="dataSourceOptionsSelected"
          :options="dataSourceOptions"
          @confidence-button="$emit('toggle-confidence-range', $event)"
          @datasources-selected="$emit('selected-datasource', $event)"
          v-if="sideControl"
        />
      </div>
    </div>
    <base-modal :showModal="showModal">
      <template #title>
        <slot name="title"> slot for modal title fallback </slot>
      </template>
      <template>
        <slot> </slot>
      </template>
    </base-modal>
  </div>
</template>

<script>
import SubCardToggleButton from './base-subcard/SubCardToggleButton.vue';
import SubCardDropdown from './base-subcard/SubCardDropdown.vue';
import SubCardSideControl from './base-subcard/SubCardSideControl.vue';

export default {
  name: 'SubCard',
  data() {
    return {
      showMenu: false,
      showModal: false,
    };
  },
  components: {
    SubCardToggleButton,
    SubCardDropdown,
    SubCardSideControl,
  },
  props: {
    showControls: {
      type: Boolean,
      default: () => false,
    },
    showToggle: {
      type: Boolean,
      default: () => true,
    },
    color: {
      type: String,
      default: 'red',
    },
    backgroundColor: {
      type: String,
      default: '#DFF3F3',
    },
    buttonToggle: {
      type: Boolean,
      default: () => false,
    },
    sideControl: {
      true: Boolean,
      default: () => false,
    },
    dataSourceOptions: {
      type: Array,
      default: () => [],
    },
    dataSourceOptionsSelected: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
