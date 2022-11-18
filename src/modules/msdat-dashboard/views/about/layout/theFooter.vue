<template>
  <footer id="the-footer" class="work-sans">
    <div>Built with <b-icon-heart-fill /> by eHealth4everyone</div>
    <div>
      <span
        >{{ dlDashboardIndicator.length > indicatorCount ? indicatorCount : dlDashboardIndicator.length }}/{{ indicatorCount}}&ensp;Indicators,
        {{ dlDashboardDataSource.length }}/{{dataSourceCount}}&ensp;Data&nbsp;sources</span
      >
      <span>Last Updated {{ latestDate }}</span>
    </div>
  </footer>
</template>

<script>
import moment from 'moment';
import apiServices from '@/modules/DataLayer/services/ApiServices';
import config from '@/modules/dynamic_dashboard/config/dashboard_config';

export default {
  name: 'theFooter',
  data() {
    return {
      latestDate: 'Loading...',
      dashboard: {},
      indicatorCount: 0,
      dataSourceCount: 0,
    };
  },
  methods: {
    async getLatestDate() {
      const res = await apiServices.getLatestDate();
      const { results } = res.data;
      const el = results[0];
      const date = moment(el.updated_at, 'YYYY-MM-DD').format('MMMM Do YYYY');
      this.latestDate = date;
    },
    async getConfigData() {
      this.dashboard = config.find((item) => item.title === this.$route.meta.title);
      this.indicatorCount = this.dashboard?.indicators.length;
      this.dataSourceCount = this.dashboard?.dataSources.length;
    },
  },
  async mounted() {
    await this.getLatestDate();
    await this.getConfigData();
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/abstracts/_variables.scss';

footer#the-footer {
  height: fit-content;
  // position: sticky;
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: $primary;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.65%;
  font-size: 12.5px;
  color: #ffffff;

  & > div {
    line-height: 15px;

    svg {
      color: red;
    }
    &:last-child {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      span {
        text-align: right;

        &:first-child {
          margin-bottom: 1.5%;
        }
      }
    }
  }
}

// Media Query
@media (max-width: 567px) {
  footer#the-footer {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0.8% 2%;

    & > div {
      &:last-child {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.5%;

        span {
          width: fit-content;
        }
      }
    }
  }
}
</style>
