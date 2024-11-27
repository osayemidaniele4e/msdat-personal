<template>
  <footer id="the-footer" class="work-sans hide-footer" data-html2canvas-ignore>
    <!-- <button @click="captureAndShare">Share as Image</button> -->
    <div>Built with <b-icon-heart-fill /> by eHealth4everyone</div>
    <div>
      <span v-if="checkIfDashboard"
        >{{
          dlDashboardIndicator.length > indicatorCount
            ? indicatorCount
            : dlDashboardIndicator.length
        }}/{{ indicatorCount }}&ensp;Indicators,
        <span
          >{{ dlDashboardDataSource.length }}/{{ dataSourceCount }}
          <span @click="showDatasourceList" class="datasourec-action">( view more )</span></span
        >&ensp;Data&nbsp;sources</span
      >
      <span>Last Updated {{ latestDate }}</span>
    </div>
  </footer>
</template>

<script>
import { mapMutations } from 'vuex';
import moment from 'moment';
import apiServices from '@/modules/data-layer/services/ApiServices';
// import html2canvas from 'html2canvas';

export default {
  name: 'theFooter',
  data() {
    return {
      latestDate: 'Loading...',
      dashboard: {},
      indicatorCount: 0,
      dataSourceCount: 0,
      checkIfDashboard: false,
    };
  },

  watch: {
    dlDashboardDataSource: {
      handler(value) {
        if (value.length === this.dataSourceCount) {
          this.UPDATE_LOADING_STATUS();
        }
      },
    },
  },
  methods: {
    ...mapMutations('MSDAT_STORE', ['UPDATE_LOADING_STATUS', 'toggleShowDataSourceList']),

    async getLatestDate() {
      const res = await apiServices.getLatestDate();
      const { results } = res.data;
      const el = results[0];
      const date = moment(el.updated_at, 'YYYY-MM-DD').format('MMMM Do YYYY');
      this.latestDate = date;
    },
    async getConfigData() {
      const { name } = this.$route.params;
      const data = await apiServices.getDashboard();
      this.dashboard = data.data.find((item) => item.name === name);
      this.indicatorCount
        = this.dashboard?.indicators.length || localStorage.getItem('lsIndicatorCount');
      this.dataSourceCount
        = this.dashboard?.dataSources.length || localStorage.getItem('lsDataSourceCount');
    },

    showDatasourceList() {
      console.log('dataSources');
      console.log('Investigations Footer');
      this.toggleShowDataSourceList();
    },
    // async captureAndShare() {
    //   // Capture the content of the index.vue component
    //   const contentElement = document.querySelector('.index-app'); // Use the appropriate selector for your app container

    //   const originalCanvas = await html2canvas(contentElement);

    //   // Create a new canvas with the desired width and height, including padding
    //   const canvas = document.createElement('canvas');
    //   const padding = 40; // Adjust the padding as needed
    //   const canvasWidth = originalCanvas.width + 2 * padding;
    //   const canvasHeight = originalCanvas.height - 60 + 2 * padding + 100; // Add space for the description text
    //   canvas.width = canvasWidth;
    //   canvas.height = canvasHeight;

    //   const ctx = canvas.getContext('2d');

    //   // Fill the entire canvas with a white background
    //   ctx.fillStyle = '#007d53';
    //   ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    //   // Define the text properties for the header (making it bold)
    //   ctx.font = 'bold 40px Work Sans'; // Set the font style and size, and make it bold
    //   ctx.fillStyle = 'white'; // Set the text color
    //   ctx.textAlign = 'center'; // Center the text horizontally

    //   // Draw the header text in the center of the canvas
    //   const headerText = 'MSDAT DASHBOARD INFO'; // Replace with your desired header text
    //   const textX = canvasWidth / 2;
    //   const textY = padding + 20; // Adjust the Y position and padding as needed
    //   ctx.fillText(headerText, textX, textY);

    //   // Draw the original image on the canvas with padding
    //   const imageX = padding;
    //   const imageY = 60 + padding; // Adjust for header and padding
    //   ctx.drawImage(
    //     originalCanvas,
    //     imageX,
    //     imageY,
    //     originalCanvas.width,
    //     originalCanvas.height - 60,
    //   );

    //   // Define the text properties for the description
    //   ctx.font = '20px Work Sans'; // Set the font style and size for the description text
    //   ctx.fillStyle = 'white'; // Set the text color
    //   ctx.textAlign = 'center'; // Center the text horizontally

    //   // Draw the description text below the image
    //   const routerLink = this.$route.path; // Resolve the route to get the full URL
    //   const descriptionText = `To get more information about the MSDAT platform, visit: ${routerLink}`; // Replace with your desired description text
    //   const descriptionX = canvasWidth / 2;
    //   const descriptionY = imageY + originalCanvas.height - 60 + 40; // Place it below the image with padding
    //   ctx.fillText(descriptionText, descriptionX, descriptionY);

    //   // Convert the canvas to a data URL
    //   const dataURL = canvas.toDataURL('image/png');

    //   // Create a temporary anchor element to trigger the download
    //   const a = document.createElement('a');
    //   a.href = dataURL;
    //   a.download = 'shared_image.png';

    //   // Trigger a click event on the anchor to open the save dialog
    //   a.click();
    // },
  },
  async mounted() {
    await this.getLatestDate();
    await this.getConfigData();
    const checkIfDashboardStatus = this.$route.fullPath.split('/');
    this.checkIfDashboard = checkIfDashboardStatus?.includes('dashboard');
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/abstracts/_variables.scss';

.hide-footer {
  display: none;
}

.datasourec-action {
  cursor: pointer;
}
.datasourec-action:hover {
  color: #90ee90;
}

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
