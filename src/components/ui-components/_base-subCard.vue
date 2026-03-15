<template>
  <div class="card">
    <div
      class="card-header d-flex justify-content-between border-bottom-0 align-items-center"
      :class="[backgroundColor === 'header' ? 'base_subCard_header' : 'base_subCard']"
      v-if="removeTitle === false"
    >
      <!-- :style="{ backgroundColor }" -->
      <div v-if="removeTitle === false" class="title">
        <slot name="title"> slot title fallback </slot>
        <slot  name="selectors"> </slot>
      </div>
      <div
        class="action-icon d-flex justify-content-around align-items-center"
        v-if="showControls && removeTitle === false"
      >
        <div class="d-flex align-items-center">
          <slot name="refresh"> </slot>
        </div>
        <div class="expand-icon">
          <img @click="showModal = !showModal" src="@/assets/Expand.png" alt="" />
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
        <div ref="chartContainer" class="col chart-container" :class="[sideControl ? 'col-10 pr-3' : '']">
          <div v-if="buttonToggle" class="d-flex justify-content-end pt-1 px-1">
            <SubCardToggleButton
              v-show="showToggle"
              @button-clicked="$emit('toggled-button', $event)"
            />
            <slot name="extra-toggles"></slot>
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
      type: Boolean,
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
    showDropdown: {
      type: Boolean,
      default: () => false,
    },
  },
  watch: {
    sideControl: {
      handler(newValue) {
        if (newValue) {
          // Trigger window resize event when sidebar appears to force chart redraw
          this.$nextTick(() => {
            window.dispatchEvent(new Event('resize'));
            // Give additional time for the DOM to update
            setTimeout(() => {
              window.dispatchEvent(new Event('resize'));
            }, 100);
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    close() {
      if (this.showMenu !== false) {
        this.showMenu = false;
      }
    },
    notifyChartToReflow() {
      // Notify any chart components to reflow
      this.$emit('card-layout-changed');
      window.dispatchEvent(new Event('resize'));
    },
  },
  mounted() {
    // Trigger initial resize to ensure chart layout is correct
    this.$nextTick(() => {
      this.notifyChartToReflow();
    });
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: black;
  width: 97%;
}
.expand-icon img {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.chart-container {
  transition: width 0.2s ease;
  box-sizing: border-box;
}
.pr-3 {
  padding-right: 1rem !important;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
