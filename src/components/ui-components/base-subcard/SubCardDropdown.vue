<template>
  <ul class="dropdown-menu-icon shadow border-0">
    <li><span class="dropdown-item-text">Dropdown item text</span></li>
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</template>

<script>
export default {
  name: 'SubCardDropdown',
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
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}

</style>
