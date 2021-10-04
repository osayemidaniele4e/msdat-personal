<template>
  <b-link :to="to" @click.prevent="$emit('click')" class="text-decoration-none">
    <button
      :type="type"
      :disabled="loading"
      :style="`min-width:${width};
                font-size: ${textSize};

        max-width:${width};
        height:${height};
        border-radius:${radius};
        color:${colorsec};
        box-shadow:${shadow};
        background-color: ${bgcolor};
        border: ${btnOutline};`"
      :class="`'ml-n1' ${classes}

      hasHover`"
      @click="$emit('click')"
    >
      <b-spinner v-if="loading" small></b-spinner>
      <span v-else>{{ text }}</span>
    </button>
  </b-link>
</template>

<script>
export default {
  name: 'button',
  props: {
    btnOutline: {
      type: String,
    },
    textSize: {
      type: String,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    colorsec: {
      type: String,
    },
    bgcolor: {
      type: String,
    },
    classes: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    radius: {
      type: String,
      default: '',
    },
    to: {
      type: String,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style>
button {
  display: inline-block;
  padding: 9px 15px !important;
  margin-bottom: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* background-image: none; */
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  /* outline: none; */
  min-width: 100%;
}
/*
.hasHover:hover {
  background-color: red;
} */
</style>
