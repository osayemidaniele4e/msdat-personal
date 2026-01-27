<template>
 <transition name="fade">
   <div v-if="show" class="no_ind_data">
     <ul>
       <li>No data available for {{ indicator.short_name }}.</li>
     </ul>
     <button @click="closeCard">Close</button>
   </div>
 </transition>
</template>

<script>
export default {
  props: {
    indicator: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    closeCard() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
 transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
 opacity: 0;
}
.no_ind_data {
 position: fixed;
 top: 0;
 right: 0;
 background-color: #ffffff;
 padding: 1rem;
 box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
 z-index: 999;
}
</style>
