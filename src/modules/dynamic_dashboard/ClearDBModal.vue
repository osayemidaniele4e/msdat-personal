<template>
  <base-modal class="work-sans" :showModal="showModal" :size="''" :header="'white'">
    <template #title>
      <div class="w-75 work-sans">
        <h6 class="mb-0">CLEARING SEQUENCE STARTED</h6>
      </div>
    </template>
    <template>
      <p class="mt-2 work-sans">Click on the button below to clear dashboard cache</p>
    </template>
     <template #footer-btn>
          <button class="btn btn-success mb-3 mt-2" @click="clearDB">
        CLEAR
      </button>
    </template>
  </base-modal>
</template>

<script>
export default {
  name: 'ClearDBModal',
  components: {},
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    async clearDB() {
      await this.$store.dispatch('DL/CLEAR_DB');
      this.showModal = false;
    },
  },
  async mounted() {
    this.showModal = true;
  },
};
</script>

<style lang="scss" scoped>
span.header_text {
  color: black;
  font-weight: bold;
}
button.btn-success {
  background-color: #007d53;
  font-size: 0.8rem;
  color: #ebebeb;
}
div.list_item {
  font-size: 0.9rem;
  h6 {
    padding-bottom: 0.6rem;
  }
  li {
    margin-bottom: 0.7rem;
  }
}
div.cache_cleaner_loader {
  min-height: 20vh;
}
</style>
