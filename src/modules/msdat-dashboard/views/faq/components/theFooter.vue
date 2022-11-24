<template>
  <footer id="the-footer" class="work-sans">
    <div>Built with <b-icon-heart-fill /> by eHealth4everyone</div>
    <div>
      <!-- <span
        >{{ dlDashboardIndicator.length }} Indicators, {{ dlDashboardDataSource.length }} Data
        sources</span
      > -->
      <span>Last Updated {{ latestDate }}</span>
    </div>
  </footer>
</template>

<script>
import moment from 'moment';

export default {
  name: 'theFooter',
  data() {
    return {
      latestDate: '',
    };
  },
  mounted() {
    const day = moment().format('DD');
    const month = moment().format('MMM');
    const year = moment().format('YYYY');
    this.latestDate = `${day} ${month}, ${year}`;
  },
};
</script>

<style lang="scss" scoped>
$msdat-green: #007d53;

footer#the-footer {
  height: fit-content;
  position: sticky;
  bottom: 0;
  background-color: $msdat-green;
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
