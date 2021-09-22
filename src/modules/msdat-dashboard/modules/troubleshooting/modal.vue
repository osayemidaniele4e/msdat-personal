<template>
  <div>
    <b-button @click="showModal = !showModal">Launch centered modal</b-button>

    <base-modal :showModal="showModal" :size="'md'" :header="'white'">
      <template #title>
        <div class="w-75">
          <h6>
            <img :src="icon1" alt="warning-icon" width="7%" /><span class="ml-4 header_text"
              >MSDAT Dashboard not Loading?</span
            >
          </h6>
        </div>
      </template>
      <template>
        <p>
          This is quite unusual, but for some reason the MSDAT Dashboard is not loading. We are
          really sorry about this.
        </p>
        <small
          ><strong
            >We think clearing MSDAT cache from your browser might fix the problem:</strong
          ></small
        >
        <p class="mt-2">Click on the button below to clear dashboard cache</p>
        <button class="btn btn-success py-3 px-5 mb-3 mt-2">CLEAR DASHBOARD CACHE</button>
        <!-- <div class="cache_cleaner_loader">
          <div class="row">
            <div class="col-lg-4 mb-3">
               <highcharts :options="chartOptions" />
            </div>
            <div class="col-lg-8 mb-3">
              <small>Your Cach has been cleared!</small>
              <h6><strong>Please reload dashboard</strong></h6>
            </div>
          </div>
        </div> -->
        <div class="mt-3 list_item">
          <h6>Here are other things you could try:</h6>
          <ul>
            <li>Force a refresh by pressing Shift+F5.</li>
            <li>
              Open the dashboard in a new tab by <span class="text-primary"> clicking here.</span>
            </li>
            <li>Open the dashboard in Incognito mode.</li>
            <li>
              If you get this frequently, please <a href="http://">send us feedback</a>&ensp;<img
                :src="icon2"
                alt="link_icon"
                width="2%"
              />
            </li>
          </ul>
        </div>
      </template>
    </base-modal>
  </div>
</template>

<script>
import icon1 from '../../../../assets/danger-sign.svg';
import icon2 from '../../../../assets/external-link-symbol.svg';

export default {
  name: 'Modal',
  components: {},
  data() {
    return {
      icon1,
      icon2,
      showModal: true,
      // chartOptions: {
      //   chart: {
      //     plotBackgroundColor: null,
      //     plotBorderWidth: 0,
      //     plotShadow: false,
      //   },
      //   title: {
      //     text: '0.0MB',
      //     verticalAlign: 'middle',
      //     y: -16,
      //     floating: true,
      //     style: {
      //       fontSize: '12px',
      //     },
      //   },
      //   exporting: {
      //     enabled: false,
      //   },
      //   credits: {
      //     enabled: false,
      //   },
      //   plotOptions: {
      //     pie: {
      //       dataLabels: {
      //         enabled: true,
      //         distance: -50,
      //         y: -5,
      //         format: '{y}%',
      //         style: {
      //           fontWeight: 'bold',
      //           color: 'black',
      //           fontSize: '10px',
      //         },
      //         filter: {
      //           property: 'name',
      //           operator: '===',
      //           // value: "Firefox",
      //         },
      //       },
      //       borderWidth: 3,
      //       showInLegend: false,
      //     },
      //     legend: {
      //       align: 'left',
      //       layout: 'vertical',
      //       verticalAlign: 'top',
      //       x: 40,
      //       y: 0,
      //     },
      //     series: {
      //       animation: true,
      //     },
      //   },
      //   series: [
      //     {
      //       type: 'pie',
      //       name: 'Progress',
      //       innerSize: '60%',
      //       data: [
      //         { name: 'un-progress', y: 31, color: '#e5d9a2' },
      //         { name: 'progress', y: 69, color: '#eeeeee' },
      //       ],
      //     },
      //   ],
      // },
    };
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
  // display: flex;
  // align-items: center;
  // width: 100%;
}
</style>
