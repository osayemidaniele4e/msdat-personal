<template>
  <ul class="dropdown-menu-icon shadow border-0">
    <li>
      <span
        class="dropdown-item"
        v-for="(item, index) in dropdownList"
        :key="index"
        @click="logType(item)"
        >{{ item.title }}</span
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SubCardDropdown',
  data() {
    return {
      dropdownList: [
        {
          type: 'jpeg',
          title: 'Download JPEG Image',
        },
        {
          type: 'png',
          title: 'Download PNG Image',
        },
        {
          type: 'svg',
          title: 'Download SVG Image',
        },
        {
          type: 'pdf',
          title: 'Download PDF',
        },
        {
          type: 'csv',
          title: 'Download CSV',
        },
        {
          type: 'xls',
          title: 'Download XLS',
        },
      ],
    };
  },
  methods: {
    logType(item) {
      this.$emit('dropDownTypeSelected', item);
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-menu-icon {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0px;
  font-size: 0.8rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
</style>
