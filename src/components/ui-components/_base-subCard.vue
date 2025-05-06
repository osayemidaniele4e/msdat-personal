<template>
  <div class="card">
    <div
      class="card-header d-flex justify-content-between border-bottom-0 align-items-center"
      :class="[backgroundColor === 'header' ? 'base_subCard_header' : 'base_subCard']"
      v-if="removeTitle === false"
    >
      <!-- :style="{ backgroundColor }" -->
      <div v-if="removeTitle === false" class="title ">
        <slot name="title"> slot title fallback </slot>
        <div v-if="backgroundColor === 'header'" class="">
          <img @click="toggleShareModal"  class="share-section-icon" src="@/assets/Share-button.png" alt="">
        </div>
      </div>
      <div
        class="action-icon d-flex justify-content-around align-items-center"
        v-if="showControls && removeTitle === false"
      >
        <div class="d-flex align-items-center">
          <slot name="refresh"> </slot>
        </div>
        <div class="expand-icon">
          <img  @click="showModal = !showModal" src="@/assets/Expand.png" alt="">
        </div>
        <!-- <b-icon
          icon="arrows-fullscreen"
          @click="showModal = !showModal"
          class="pointer_click mx-1 font-weight-bold"
          font-scale="0.5"
        ></b-icon> -->
        <!-- v-b-tooltip.hover title="Tooltip directive content" -->
        <!-- icon="three-dots-vertical" -->
        <!-- <b-icon
          v-if="showDownload === true"
          icon="download"
          @click="showMenu = !showMenu"
          class="pointer_click mx-1 font-weight-bold"
          font-scale="0.5"
        ></b-icon> -->
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
          <div v-if="buttonToggle" class="d-flex justify-content-end pt-1 px-1">
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
    <base-modal :showModal="showShareModal" :size="'md'">
      <template #title><h4 class="mb-0 font-weight-bold work-sans">Share Section</h4> </template>
      <ShareSection />
    </base-modal>
  </div>
</template>

<script>
import ShareSection from '@/modules/msdat-dashboard/components/ShareSection.vue';
import SubCardToggleButton from './base-subcard/SubCardToggleButton.vue';
import SubCardDropdown from './base-subcard/SubCardDropdown.vue';
import SubCardSideControl from './base-subcard/SubCardSideControl.vue';

export default {
  name: 'SubCard',
  data() {
    return {
      showMenu: false,
      showModal: false,
      showShareModal: false,
    };
  },
  components: {
    SubCardToggleButton,
    SubCardDropdown,
    SubCardSideControl,
    ShareSection,
  },
  props: {
    showControls: {
      type: Boolean,
      default: () => false,
    },
    showDownload: {
      type: Boolean,
      default: () => true,
    },
    showToggle: {
      type: Boolean,
      default: () => true,
    },
    // color: {
    //   type: String,
    //   default: 'red',
    // },
    bgName: {
      type: Boolean,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: '',
      required: false,
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
    removeTitle: Boolean,
  },
  watch: {},
  methods: {
    close() {
      if (this.showMenu !== false) {
        this.showMenu = false;
      }
    },
    toggleShareModal() {
      this.showShareModal = !this.showShareModal;
    },

  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.title {
  color: black;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.expand-icon img {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.share-section-icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
  object-fit: contain;
}
.share-wrapper {
  background-color: white;
  padding: 0px 4px;
  border-radius: 5px;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
