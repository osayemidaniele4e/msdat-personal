<template>
  <div>
    <Header />
    <div class="title text-center border-0">
      <h3 class="mt-2">Account Settings</h3>
    </div>
    <div class="row">
      <div class="side-list mt-5 col-md-2">
        <!-- <ul> -->
        <button type="button">
          <b-icon-person-circle></b-icon-person-circle>&nbsp;&nbsp;Profile >
        </button>
        <button type="button">
          <b-icon-bell-fill></b-icon-bell-fill>&nbsp;&nbsp;Notifications
        </button>
        <button type="button">
          <b-icon-clock-history></b-icon-clock-history>&nbsp;&nbsp;Activity History
        </button>
        <!-- </ul> -->
      </div>
      <div class="col-md-10 mt-3 border-left">
        <div class="d-flex">
          <img src="./assets/analytics.png" height="33px" width="33px" />
          <h4 class="ml-2 mt-2">Dashboard History</h4>
        </div>
        <div class="activity mt-3 mb-5">
          <div class="mb-3">
            <span class="month" style="font-size: 16px">August 2022</span>
          </div>
          <div class="row content" v-for="el in items" :key="el.id" :per-page="perPage"
      :current-page="currentPage">
            <div class="col-md-3">
              <input type="checkbox" class="mr-2" />&nbsp;August 13, 2022 at 2:34am
            </div>
            <div class="col-md-3"><b>{{ el.dashboard }}</b>-{{ el.section }}</div>
            <div class="col-md-4">{{ el.indicator }}, {{ el.datasource }} {{ el.year }}, {{ el.location }}</div>
            <div class="col-md-1">
              <b-icon-trash class="del" @click.prevent="destroy(el.id)"></b-icon-trash>
            </div>
          </div>
        </div>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          class="mb-5"
          align="center"
        ></b-pagination>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from './layout/theHeader.vue';
import Footer from './layout/theFooter.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: [],
    };
  },
  computed: {
    ...mapGetters(['getInteractions', 'getInteraction']),
    ...mapGetters('AUTH_STORE', ['isAuthenticated']),
    rows() {
      return this.getInteractions.length;
    },
  },
  async mounted() {
    await this.GET_INTERACTIONS();
    this.itemsForList();
  },
  methods: {
    ...mapActions(['GET_INTERACTIONS', 'DELETE_INTERACTION']),
    async destroy(id) {
      await this.DELETE_INTERACTION(id);
    },
    itemsForList() {
      this.items = this.getInteractions.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
      console.log('items', this.items);
    },
  },
};
</script>
<style scoped>
/* *{ */
/* } */
.title {
  display: flex;
  height: 70px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.1);
}
h3 {
  font-weight: bold;
}
.side-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  /* row-gap: 20px; */
}
button {
  border: none;
  height: 50px;
  background: #fcfcfc;
  color: #000;
}
h4 {
  color: #5e5e5e;
}
.month {
  font-weight: bold;
}
.activity ul {
  /* display: flex; */
  /* justify-content: space-around; */
  list-style: none;
  font-size: 20px;
}
.content{
  font-size: 16px;
}
.del {
  cursor: pointer;
}
</style>
