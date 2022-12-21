<template>
  <div>
    <div class="row">
      <div class="col-md-12 mt-3">
        <div class="d-flex">
          <img src="./assets/analytics.png" height="33px" width="33px" />
          <h4 class="mt-2">Dashboard History</h4>
        </div>
        <SelectDropdown
          class="multiselect mr-2"
          v-model="period"
          :value="null"
          :options="uniqueDate"
        />
        <div class="activity mt-3 mb-3">
          <div class="mb-3">
            <span class="month" style="font-size: 16px">{{ period }}</span>
          </div>
          <div class="scroll-active">
            <div class="row content mb-2" v-for="el in filter" :key="el.id">
              <div class="col-md-3">
                <input type="checkbox" class="mr-2" />&nbsp;{{ formatDate(el) }}
              </div>
              <div class="col-md-4">
                <b>{{ el.dashboard }}</b
                >-{{ el.section }}
              </div>
              <div class="col-md-4">
                {{ el.indicator }}, {{ el.datasource }} {{ el.year }}, {{ el.location }}
              </div>
              <div class="col-md-1">
                <b-icon-trash class="del" @click.prevent="destroy(el.id)"></b-icon-trash>
              </div>
            </div>
          </div>
          <div v-if="filter.length === 0" class="col-12 text-center mt-2">
            <span> No activity recorded for this period </span>
          </div>
        </div>
        <!-- <div class="d-flex justify-content-center">
        <pagination
          v-model="currentPage"
          :records="rows"
          :per-page="perPage"
          class="mb-5"
          align="center"
          @paginate="getPage"
        ></pagination>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import Pagination from 'vue-pagination-2';
import moment from 'moment';
import { SelectDropdown } from '@/components/ControlPanel';

export default {
  name: 'Dashboard',
  components: {
    // Pagination,
    SelectDropdown,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      records: [],
      loading: false,
      date: [],
      uniqueDate: [],
      filter: [],
      period: '',
      interactions: [],
    };
  },
  computed: {
    ...mapGetters(['getInteractions', 'getInteraction']),
    ...mapGetters('AUTH_STORE', ['isAuthenticated', 'getUser']),
  },
  watch: {
    async period() {
      this.filterByPeriod();
    },
  },
  async mounted() {
    await this.GET_INTERACTIONS(this.getUser.id);
    for (let i = 0; i < this.getInteractions.length; i++) {
      const el = this.getInteractions[i];
      const Date = el.created_at;
      const formatDate = moment(Date).format('MMMM YYYY');
      this.date.push(formatDate);
    }
    this.uniqueDate = new Set(this.date);
    this.uniqueDate = [...this.uniqueDate];
    this.uniqueDate.push('January 2022');
    this.period = this.uniqueDate[0];
  },
  methods: {
    ...mapActions(['GET_INTERACTIONS', 'DELETE_INTERACTION']),
    /**
     * @function destroy
     * @author samuel
     * @description function to delete user interactions by id
     * @param {*} id the id of the interaction to be deleted
     */
    async destroy(id) {
      await this.DELETE_INTERACTION(id);
      this.filterByPeriod();
    },
    // async getPage() {
    //   this.records = this.filter.slice(
    //     (this.currentPage - 1) * this.perPage,
    //     this.currentPage * this.perPage,
    //   );
    //   console.log('records', this.records);
    // },
    /**
     * @function formatDate
     * @author samuel
     * @description function to format date
     * @param {*} date the date to be formatted
     * @returns {object} formatted date
     */
    formatDate(date) {
      return moment(date.viewed_at).format('MMMM DD, YYYY [at] hh:mma');
    },
    /**
     * @function filterByPeriod
     * @author samuel
     * @description function to filter user interactions by period which is the month and year
     * @returns {array} result of the filter
     */
    async filterByPeriod() {
      await this.GET_INTERACTIONS(this.getUser.id);
      this.filter = this.getInteractions.filter(
        (el) => moment(el.viewed_at).format('MMMM YYYY') === this.period,
      );
    },
  },
};
</script>
<style scoped>
h3 {
  font-weight: bold;
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
.content {
  font-size: 12px;
}
.del {
  cursor: pointer;
}
.scroll-active {
  max-height: 29vw;
  overflow-y: auto;
  overflow-x: hidden;
}
.multiselect {
  width: 20% !important;
  position: absolute;
  right: 0;
}
</style>
