<template>
  <div :class="{ disabled }" @mouseleave="hoverValue = 0">
    <span v-for="n in 5" :key="n" @click="setValue(n)" @mouseover="hoverValue = n">
      <b-icon
        v-if="(n <= fixedValue || n <= hoverValue)"
        icon="star-fill"
        :font-scale="size"
        class="star-icon"
        :style="{marginRight: `${n == 5 ? 0 :spacing * 2}px`}"
      ></b-icon>
      <b-icon
        v-else
        icon="star"
        :font-scale="size"
        class="star-icon"
        :style="{marginRight: `${n == 5 ? 0 :spacing * 2}px`}"
      ></b-icon>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 1,
    },
    spacing: {
      type: Number,
      default: 3,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {
      fixedValue: 0,
      hoverValue: 0,
    };
  },
  mounted() {
    this.fixedValue = this.value;
  },
  methods: {
    setValue(n) {
      this.$emit('change', n);
      this.fixedValue = n;
    },
  },
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
}
.star-icon {
  /* padding: 0 3px; */
  color: #F4BD3D;
}
</style>
