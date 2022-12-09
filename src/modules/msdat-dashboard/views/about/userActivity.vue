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
            <span class="month" style="font-size: 16px">December 2022</span>
          </div>
          <div class="row content" v-for="el in getInteractions" :key="el.id">
            <div class="col-md-3">
              <input type="checkbox" class="mr-2" />&nbsp;{{ formatDate(el) }}
            </div>
            <div class="col-md-3"><b>{{ el.dashboard }}</b>-{{ el.section }}</div>
            <div class="col-md-4">{{ el.indicator }}, {{ el.datasource }} {{ el.year }}, {{ el.location }}</div>
            <div class="col-md-1">
              <b-icon-trash class="del" @click.prevent="destroy(el.id)"></b-icon-trash>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
        <pagination
          v-model="currentPage"
          :records="rows"
          :per-page="perPage"
          class="mb-5"
          align="center"
          @paginate="getPage"
        ></pagination>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Pagination from 'vue-pagination-2';
import moment from 'moment';
import Header from './layout/theHeader.vue';
import Footer from './layout/theFooter.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer,
    Pagination,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      records: [],
    };
  },
  computed: {
    ...mapGetters(['getInteractions', 'getInteraction']),
    ...mapGetters('AUTH_STORE', ['isAuthenticated', 'getUser']),
    rows() {
      return this.getInteractions.length;
    },
  },
  async mounted() {
    await this.GET_INTERACTIONS(this.getUser.id);
    await this.getPage();
  },
  methods: {
    ...mapActions(['GET_INTERACTIONS', 'DELETE_INTERACTION']),
    async destroy(id) {
      await this.DELETE_INTERACTION(id);
      await this.getPage();
    },
    async getPage() {
      await this.GET_INTERACTIONS(this.getUser.id);
      this.records = this.getInteractions.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
    },
    formatDate(date) {
      return moment(date.created_at).format('MMMM DD, YYYY [at] hh:mma');
    },
  },
};
</script>
<style scoped>
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
  list-style: none;
  font-size: 20px;
}
.content{
  font-size: 14px;
}
.del {
  cursor: pointer;
}
</style>
