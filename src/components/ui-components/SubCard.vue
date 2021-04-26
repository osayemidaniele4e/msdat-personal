<template>
  <div class="card border-secondary">
    <div class="card-header d-flex justify-content-between
                bg-secondary border-bottom-0 align-items-center">
      <div class="title w-100">
        <slot name="title"> slot title fallback </slot>
      </div>
      <div class="action-icon d-flex justify-content-around align-items-center">
        <b-icon
          icon="arrows-fullscreen"
          @click="$emit('clicked-fullscreen-icon')"
          class="mx-1"
          font-scale="1.1"
        ></b-icon>
        <b-icon
          icon="three-dots-vertical"
          @click="showMenu = !showMenu"
          class="mx-1"
          font-scale="1.1"
        ></b-icon>
      </div>
    </div>
    <div class="card-body" style="height: 300px; position: relative">
      <ul class="dropdown-menu-icon" v-show="showMenu">
        <li><span class="dropdown-item-text">Dropdown item text</span></li>
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
      <slot>
        <p class="card-text">The SubCard fallback.</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubCard',
  data() {
    return {
      showMenu: false,
    };
  },
  props: {
    msg: String,
    color: {
      type: String,
      default: 'red',
    },
  },
};
</script>

<style scoped>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
