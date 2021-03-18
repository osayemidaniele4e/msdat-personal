<template>
  <div class="holder">

  <!-- Toggleable tab links here -->
    <ul
      class="d-flex list-unstyled justify-content-between border-b mx-5 cursor-pointer"
    >
      <li
        class="h6 mb-0 tab-link"
        :class="[index === currentTab ? 'active font-weight-bold' : '']"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="currentTab = index"
      >
        {{ tab }}

      </li>
    </ul>

    <!-- Multiselect dropdowns here -->
    <div class="dropdown-holder">
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
      default: 0,
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
$primary: #2b5d5b;

.holder{
background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #0000000d;
    border: 3px solid #326f9226;
    border-radius: 5px;
    padding: 20px 0px;
  }

.border-b {
  border-bottom: 2px solid #ebebeb;
}

.tab-link {
  padding: 12px 40px;
  font-size: 0.875rem;
  color: #515151;
  font-weight: 500;
  font-family: "Work Sans", sans-serif;
}

.tab-link.active {
  border-bottom: 4px solid $primary;
  border-radius: 2px 2px 0px 0px;
  color: $primary;
}

.cursor-pointer {
  cursor: pointer;
}

.dropdown-holder {
  padding: 0px 80px;
}
</style>
