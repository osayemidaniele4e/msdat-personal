<template>
  <Layout :index="3">
    <div class="p-2 mb-5">
      <section class="d-flex align-items-center justify-content-center justify-content-sm-start">
        <b-icon icon="bar-chart-fill"></b-icon>
        <h4 style="font-size: 15px;" class="pl-2 m-0">Dashboard History</h4>
      </section>
      <section v-for="(monthly, index) in sortedActivities" :key="index" class="pt-3 monthly">
        <strong class="mb-2 d-block">{{ monthly.month }}</strong>
        <div v-for="(activity) in monthly.items" :key="activity.id" class="mb-3 mb-md-1">
          <b-form-checkbox :id="`checkbox-${activity.id}`"
            v-model="picked[activity.id]"
            :value="false"
            :name="`checkbox-${activity.id}`" class="w-min"
          >
            <b-row>
              <b-col order="1" cols="10" md="3" lg="2">
                <span>{{ moment(activity.datetime).format('MMMM D, yyyy [at] h:mma') }}</span>
              </b-col>
              <b-col order="3" order-md="2" md="3">
                <strong>{{ activity.page }}- </strong>
                <span>{{ activity.section }}</span>
              </b-col>
              <b-col order="4" order-md="3" md="4">
                <span>{{ activity.parameters }}</span>
              </b-col>
              <b-col order="2" order-md="4" cols="1">
                <b-icon @click="remove($event, activity.id)" icon="trash-fill" font-scale="2" class="bin p-1"></b-icon>
              </b-col>
            </b-row>
          </b-form-checkbox>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script>
import moment from 'moment';
import Layout from './layout.vue';

export default {
  name: 'ActivityHistory',
  components: {
    Layout,
  },
  data() {
    return {
      sortedActivities: [],
      dummyActivities: [
        {
          id: 1,
          datetime: new Date('2022-08-13T02:34').getTime(),
          page: 'Demographics',
          section: 'Indicator Overview',
          parameters: 'Total Population, UNWPP 2050, National',
        },
        {
          id: 2,
          datetime: new Date('2022-08-13T02:38').getTime(),
          page: 'Demographics',
          section: 'Indicator Comparison',
          parameters: 'Total Population, UNWPP 2050, National',
        },
        {
          id: 3,
          datetime: new Date('2022-07-23T17:34').getTime(),
          page: 'Health Outcome',
          section: 'Indicator Overview',
          parameters: 'Skilled Birth Attendance, NHMIS 2018, National',
        },
        {
          id: 4,
          datetime: new Date('2022-07-26T13:39').getTime(),
          page: 'Health Outcomes',
          section: 'Zonal Analysis',
          parameters: 'Maternal Mortality, NDHS 2018, National',
        },
        {
          id: 5,
          datetime: new Date('2022-06-02T01:04').getTime(),
          page: 'Health Outcome',
          section: 'Indicator Overview',
          parameters: 'Skilled Birth Attendance, NHMIS 2018, National',
        },
        {
          id: 6,
          datetime: new Date('2022-05-11T01:04').getTime(),
          page: 'Demographics',
          section: 'Indicator Overview',
          parameters: 'Neonatal mortality rate (per 1000 live births), NHMIS 2018, National',
        },
        {
          id: 7,
          datetime: new Date('2022-05-11T03:34').getTime(),
          page: 'Demographics',
          section: 'Data comparison',
          parameters: 'Neonatal mortality rate (per 1000 live births), NHMIS 2018, Imo',
        },
        {
          id: 8,
          datetime: new Date('2023-06-02T01:04').getTime(),
          page: 'Health Outcome',
          section: 'Indicator Overview',
          parameters: 'Skilled Birth Attendance, NHMIS 2018, National',
        },
      ],
      picked: {},
    };
  },
  methods: {
    moment,
    sortActivities(activities) {
      activities.sort((a, b) => a.datetime - b.datetime);
      const time = (activity) => this.moment(activity.datetime);
      let currMonth = 0; let currYear = 0; const sortedActivities = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const activity of activities) {
        const month = time(activity).month();
        const year = time(activity).year();
        if (month === currMonth && year === currYear) {
          sortedActivities[0].items.push(activity);
        } else {
          currMonth = month; currYear = year;
          sortedActivities.unshift({
            month: this.moment(`${year}-${month + 1}`).format('MMMM yyyy'),
            items: [activity],
          });
        }
      }
      return sortedActivities;
    },
    remove(e, id) {
      this.$swal.fire({
        title: 'Sure to delete Activity?',
        showDenyButton: true,
        denyButtonText: 'Cancel',
      }).then((result) => {
        this.picked[id] = true;
        console.log(this.picked);
        if (result.isConfirmed) {
          // send delete request with id
          console.log(id);
        }
      });
    },
  },
  mounted() {
    this.sortedActivities = this.sortActivities(this.dummyActivities);
    console.log(this.sortedActivities);
  },
};
</script>

<style scoped>
.monthly {
  font-size: 0.7rem;
}
.monthly .row {
  transform: translateY(4px);
}
.row div:not(:last-of-type) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bin:hover {
  cursor: pointer;
  background: #eee;
}
</style>
