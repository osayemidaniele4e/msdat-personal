<template>
  <div class="">
    <ul class="d-flex list-unstyled justify-content-between border-bottom mx-5 cursor-pointer">
      <li
        class="h6 mb-0 py-2"
        :class="[index === currentTab ? 'active-panel font-weight-bold' : '']"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="currentTab = index"
      >
        {{ tab }}
      </li>
    </ul>
    <div>
      <slot v-bind:currentTab="currentTab" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasePanel',
  data() {
    return {
      currentTab: 0,
    };
  },
  props: {
    tabs: {
      type: Array,
    },
    position: {
      type: Number,
      require: false,
    },
  },
  watch: {
    position(newValue) {
      this.currentTab = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
$primary: green;
.active-panel {
  border-bottom: 3px $primary solid;
}

.cursor-pointer{
  cursor: pointer;
}

</style>
