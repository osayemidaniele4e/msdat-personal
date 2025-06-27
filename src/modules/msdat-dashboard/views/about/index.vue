<template>
  <div id="about-wrap">
    <the-header ref="theHeader" />
    <main @click="$refs.theHeader.close()">
      <!-- navigation sections  -->

      <nav class="nav-links d-flex justify-content-center align-items-center">
        <span class="mx-3 nav-link-item" @click="scrollTo('program-areas')">Program Areas</span>
        <span class="mx-3 nav-link-item" @click="scrollTo('logical-framework')"
          >Logical Framework</span
        >
        <span class="mx-3 nav-link-item" @click="scrollTo('available-data')">Available Data</span>
        <span class="mx-3 nav-link-item" @click="scrollTo('data-sources')">Data Sources</span>
      </nav>

      <!-- about MSDAT dashboard -->
      <div class="about-sec-1 d-flex flex-column align-items-center">
        <h1>ABOUT THE MSDAT PLATFORM</h1>

        <div class="about-sec-text2">
          The Federal Ministry of Health (FMOH) Nigeria multi source data analysis resource provides
          a single transparent view of key health indicators against multiple data sources. It
          offers a view against key metrics using sources that range from routine data, surveys to
          global estimates recognizing that data quality, trends and interpretation depend on the
          type of source and methodology behind the data.

          <br />
          <br />

          By transparently showing data trends against multiple sources, we intend to improve the
          debate and focus on data quality and use with the aim of reducing variances between
          different sources over time and improve our over all understanding of key trends and
          progress within the health sector.
        </div>
      </div>

      <br /><br /><br />

      <section class="mt-5">
        <b-container fluid>
          <b-row>
            <b-col cols lg="5">
              <div>
                <img src="@/assets/logo-old-black.png" alt="FMOH Logo" class="img-fluid" />
              </div>
            </b-col>
            &nbsp; &nbsp;&nbsp; &nbsp;
            <b-col cols lg="6">
              <div class="p-10">
                These resources will be developed and expanded in phases and build on connections
                with existing FMOH agencies and partners. As this resource evolves, DHPRS hopes that
                it will contribute to improved performance management within the Health sector. The
                first phase starts by exploring analysis using a selected metrics at federal and
                state levels. Subsequent phases will gradually increase the number of metrics
                available for analysis to LGA and facility level. The DHPRS team welcomes feedback o
                this resources and welcomes stakeholders to upload relevant data using the upload
                data button.
              </div>
            </b-col>
          </b-row>
        </b-container>
      </section>

      <!-- program area section -->

      <div id="program-areas">
        <!-- <div
          v-if="isLoading"
          class="loading-container d-flex justify-content-center align-items-center"
        >
          <b-spinner variant="success" label="Loading..."></b-spinner>
        </div> -->
        <IndicatorPageFunc />
      </div>

      <br /><br />
      <!-- logical framework -->
      <div class="framework-wrapper">
        <div class="image-container">
          <section>
          <div id="logical-framework">
            <img src="./assets/Logical-Framework.png" class="logical-framework-img" />
          </div>
        </section>
        </div>
      </div>

      <br /><br />
      <!-- available data -->
      <section id="available-data">
        <h5>Available Data</h5>
        <p>
          The table below shows the data sources containing data for each indicator. Only sources
          with checkmarks have data for the indicator on the row.
        </p>
        <div
          v-if="isLoading"
          class="loading-container d-flex justify-content-center align-items-center"
        >
          <b-spinner variant="success" label="Loading..."></b-spinner>
        </div>
        <AvailableDataPageFunc v-else />
      </section>
      <!-- data sources -->
      <div id="data-sources">
        <div
          v-if="isLoading"
          class="loading-container d-flex justify-content-center align-items-center"
        >
          <b-spinner variant="success" label="Loading..."></b-spinner>
        </div>
        <DataSourceFunc v-else />
      </div>
      <section>
        <Testimonials />
      </section>
    </main>
    <footer class="footer">
      This dashboard is developed and managed by the Department of Health Planning Research and
      Statistics (DHPRS)
    </footer>
    <the-footer />
  </div>
</template>

<script>
import apiServices from '@/modules/data-layer/services/ApiServices';
import { groupIndicator } from '@/util/helper';
import DataLayerMixin from '@/modules/data-layer/mixin';
import theHeader from './layout/theHeader.vue';
import theFooter from './layout/theFooter.vue';
import DataSourceFunc from './components/AboutPageDataSource.vue';
import IndicatorPageFunc from './components/AboutPageIndicator.vue';
import AvailableDataPageFunc from './components/AboutPageAvailableData.vue';
import Testimonials from './components/Testimonials.vue';

const macBookImg = require('./assets/About-Dashboard-image.svg');

export default {
  components: {
    theHeader,
    theFooter,
    DataSourceFunc,
    IndicatorPageFunc,
    AvailableDataPageFunc,
    Testimonials,
  },
  mixins: [DataLayerMixin],
  data() {
    return {
      selected: null,
      macBookImg,
      indicators: [
        {
          name: 'Mortality',
          options: [
            { value: null, text: 'Mortality' },
            { value: 'Mortality', text: 'Mortality-1' },
          ],
        },
        {
          name: 'RMCH',
          options: [
            { value: null, text: 'RMCH' },
            { value: 'RMCH', text: 'RMCH-1' },
          ],
        },
        {
          name: 'Malaria',
          options: [
            { value: null, text: 'Malaria' },
            { value: 'Malaria', text: 'Malaria-1' },
          ],
        },
        {
          name: 'Immunization',
          options: [
            { value: null, text: 'Immunization' },
            { value: 'Immunization', text: 'Immunization-1' },
          ],
        },
        {
          name: 'Nutrition',
          options: [
            { value: null, text: 'Nutrition' },
            { value: 'Nutrition', text: 'Nutrition-1' },
          ],
        },
        {
          name: 'HIV',
          options: [
            { value: null, text: 'HIV' },
            { value: 'HIV', text: 'HIV-1' },
          ],
        },
      ],
      dataSources: [
        {
          name: 'Routine',
          sources: {
            NHMIS: [
              { value: null, text: 'NHMIS' },
              { value: null, text: 'NHMIS-1' },
            ],
          },
        },
        {
          name: 'Surveys',
          sources: {
            MICS: [
              { value: null, text: 'MICS' },
              { value: null, text: 'MICS-1' },
            ],
            NNHS: [
              { value: null, text: 'NNHS' },
              { value: null, text: 'NNHS-1' },
            ],
            NARHS: [
              { value: null, text: 'NARHS' },
              { value: null, text: 'NARHS-1' },
            ],
            NDHS: [
              { value: null, text: 'NDHS' },
              { value: null, text: 'NDHS-1' },
            ],
            PCCS: [
              { value: null, text: 'PCCS' },
              { value: null, text: 'PCCS-1' },
            ],
            NHSPSS: [
              { value: null, text: 'NHSPSS' },
              { value: null, text: 'NHSPSS-1' },
            ],
          },
        },
        {
          name: 'Estimates',
          sources: {
            WorldBank: [
              { value: null, text: 'World-Bank' },
              { value: null, text: 'World-Bank-1' },
            ],
            WUENIC: [
              { value: null, text: 'WUENIC' },
              { value: null, text: 'WUENIC-1' },
            ],
            WHOGHO: [
              { value: null, text: 'WHO-GHO' },
              { value: null, text: 'WHO-GHO-1' },
            ],
            IHME: [
              { value: null, text: 'IHME' },
              { value: null, text: 'IHME-1' },
            ],
            UNAIDS: [
              { value: null, text: 'UNAIDS' },
              { value: null, text: 'UNAIDS-1' },
            ],
          },
        },
      ],
      isLoading: true,
    };
  },

  methods: {
    scrollTo(id) {
      const programAreasSection = document.getElementById(id);
      if (programAreasSection) {
        programAreasSection.scrollIntoView({ behavior: 'smooth' });
      }
    },

    async initializeDataLayer() {
      try {
        // Get all indicators and datasources
        const data = await apiServices.getOtherEndpoint();
        console.log('MSDAT@ 3');

        if (data && Array.isArray(data)) {
          // Initialize data layer with all available indicators and datasources
          await this.$DL.init({
            dashboardIndicators: data[1]?.data?.results || [],
            defaultIndicators:
              data[1]?.data?.results?.length > 0 ? [data[1].data.results[0].id] : [],
            dashboardDataSources: data[7]?.data?.results || [],
          });
        }

        this.isLoading = false;
      } catch (error) {
        console.error('Error initializing data layer:', error);
        this.isLoading = false;
      }
    },
  },

  async mounted() {
    // Check if data is already loaded
    if (!this.dlIndicator || this.dlIndicator.length === 0) {
      await this.initializeDataLayer();
    }

    this.indicators = this.dlIndicator ? groupIndicator(this.dlIndicator, 'program_area') : [];
    this.scrollTo(window.location.hash.slice(1));
  },
};
</script>

<style lang="scss" scoped>
// google fonts
@import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

// variables
$msdat-green: #007d53;
$msdat-lightgrey: #fbfbfb;
$msdat-darkgrey: #dedede;

.nav-links {
  height: 50px;
}

.nav-link-item {
  cursor: pointer;
}

.nav-link-item:hover {
  color: green;
}

.about-sec-1 {
  padding: 100px;
  background-image: url('./assets/background-1.png');
  background-size: 1440px 850px;
  color: white;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-sec-text2 {
  width: 800px;
  font-size: 16px;
}

.sec-program-areas {
  background-color: #dff3f3;
}

.program-areas {
  height: 500px;
  display: grid;
  grid-template-columns: 60% 40%;
}

.program-area-sec {
  height: 200px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  overflow: scroll;
}

.program-area-card {
  border: 1px solid black;
  margin: 100px;
  width: 200px;
  height: 30px;
  background-color: white;
  border: 1px solid #80d3af;
  display: flex;
  justify-content: center;
  align-items: center;
}

.program-area-des {
  border: 1px solid black;
  width: 500px;
  background-color: white;
  height: 500px;
  padding: 60px;
  margin: 100px;
}
// #logical-framework {
//   margin: 50px;
//   padding: 50px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .logical-framework-img{
//   width: 1266px;
//   height: 730px;
//   object-fit: contain;
// }
.framework-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.image-container{
   width: 95%;
}

#logical-framework {
  margin: 50px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logical-framework-img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  image-rendering: auto; /* ensure best quality rendering */
  display: block;
}

div.modal {
  div.modal-content {
    width: 75%;
    justify-content: center;
  }
}

#about-wrap {
  scroll-behavior: smooth;
  font-family: 'Work Sans', sans-serif;

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    color: #fbfbfb;
  }

  main {
    & > section {
      padding: 3% 9% 3.5%;
      // border: 5px solid pink;

      h5,
      h6,
      p {
        text-align: start;
      }

      h5,
      h6 {
        font-weight: bolder;
      }

      h5 {
        font-size: 18px;
        margin-bottom: 1.5%;
      }

      p {
        font-size: 14px;
        margin-bottom: 2.8%;
      }

      select {
        width: 32%;
        height: 40px;
        // border-color: #171717;
        border-radius: 5px;
        padding: 2px 10px;
        margin-bottom: 1.3%;
        font-size: 13px;
        color: #171717;
      }

      // about MSDAT dashboard
      &:nth-child(1) {
        .row {
          p:last-child {
            margin-bottom: 0;
          }

          & > div:first-child {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            img {
              width: 400px;
              height: 300px;
            }
          }
        }
      }

      // available data
      &:nth-child(3) {
        ::-webkit-scrollbar {
          height: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: $msdat-darkgrey;
          border-radius: 8px;
        }

        ::-webkit-scrollbar-track {
          background-color: $msdat-lightgrey;
        }

        & > div {
          table,
          th,
          td {
            border: 1px solid #cfcfcf;
            border-collapse: collapse;
          }

          table {
            width: 100%;
            margin: auto;
            text-align: center;

            & > :first-child {
              th {
                // width: auto;
                height: 50px;
                padding: 1.5% 1%;
                font-size: 13px;
                color: #515151;
              }

              th:nth-child(2) {
                width: 30%;
                text-align: start;
              }
            }

            & > :last-child {
              font-size: 13px;
              color: #515151;

              td {
                height: 60px;
                padding: 0% 1%;

                &:nth-child(2) {
                  text-align: start;
                }

                svg {
                  // background-color: orange !important;
                  font-size: 15px;
                  color: #4caf50;
                }
              }

              tr:nth-child(even) {
                background-color: #8484840f;
              }
            }
          }
        }

        button {
          height: 40px;
          background-color: $msdat-green;
          text-transform: capitalize;
          border-radius: 5px;
          margin-top: 5%;
          padding: 2px 4%;
          color: #ffffff;
          box-shadow: 0px 3px 5px #00000024;

          &:hover {
            background-color: #007d53c2;
            border-width: 0;
          }
        }
      }

      // indicators and data sources
      &:nth-child(2),
      &:nth-child(4) {
        background-color: $msdat-lightgrey;
      }
    }
  }
}

.footer {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

// MEDIA QUERY

/* EXTRA EXTRA SMALL */
@media (max-width: 300px) {
}

/* EXTRA SMALL */
@media (max-width: 576px) {
  #about-wrap {
    main {
      & > section {
        padding: 4% 3%;

        h5 {
          font-size: 16px;
          margin-bottom: 1.5%;
        }

        p {
          font-size: 13px;
          margin-bottom: 3%;
        }

        select {
          width: 85%;
          height: 40px;
          font-size: 11px;

          &:last-child {
            margin-bottom: 4%;
          }
        }

        // about MSDAT dashboard
        &:nth-child(1) {
          .row {
            & > div:first-child {
              justify-content: center;

              img {
                width: 300px;
                height: 200px;
                margin: 0 auto 5%;
              }
            }
          }
        }

        // available data
        &:nth-child(3) {
          ::-webkit-scrollbar {
            height: 7px;
          }

          & > div {
            table {
              width: 900px;

              & > :first-child {
                th {
                  height: 40px;
                  padding: 1.5% 1%;
                  font-size: 12px;
                }

                th:nth-child(2) {
                  width: 30%;
                  text-align: start;
                }
              }

              & > :last-child {
                font-size: 12px;

                td {
                  height: 45px;

                  svg {
                    font-size: 13px;
                  }
                }
              }
            }
          }

          button {
            height: 35px;
            margin-top: 7%;
          }
        }
      }
    }
  }
}

/* SMALL */
@media (min-width: 576px) and (max-width: 768px) {
  #about-wrap {
    header {
      & > .container-fluid {
        & > .row {
          height: 80px;
          padding: 10px 0;

          // first row
          &:first-child {
            & > div {
              &:first-child {
                img {
                  float: left;
                  height: 30px !important;
                  margin-bottom: 1%;
                  margin-left: 1.3%;
                }
              }

              &:last-child {
                padding: 0 10px;

                h2 {
                  font: normal normal 600 16px/20px Work Sans;

                  // 3-dots icon
                  & ~ div {
                    font-size: 13px;
                  }
                }
              }
            }
          }

          // second row
          &:last-child {
            height: 70px;

            & > :first-child {
              .back-icn {
                padding: 8px;
                font-size: 37px;
              }
            }

            & > :last-child {
              padding: 0 5% !important;
              line-height: 15px;

              h4 {
                padding-bottom: 2px;
                font-size: 16px !important;
              }
            }
          }
        }
      }
    }

    main {
      & > section {
        padding: 4% 3%;

        h5 {
          font-size: 16.5px;
          // margin-bottom: 1.5%;
        }

        p {
          font-size: 13px;
          margin-bottom: 3%;
        }

        select {
          width: 80%;
          height: 40px;
          font-size: 13px;

          &:last-child {
            margin-bottom: 4%;
          }
        }

        // about MSDAT dashboard
        &:nth-child(1) {
          .row {
            & > div:first-child {
              justify-content: center;

              img {
                width: 400px;
                height: 250px;
                margin-bottom: 9%;
              }
            }
          }
        }

        // available data
        &:nth-child(3) {
          ::-webkit-scrollbar {
            height: 7px;
          }

          & > div {
            table {
              width: 1000px;

              & > :first-child {
                th {
                  height: 40px;
                  padding: 1.5% 1%;
                  font-size: 12.5px;
                }

                th:nth-child(2) {
                  width: 30%;
                  text-align: start;
                }
              }

              & > :last-child {
                font-size: 12px;

                td {
                  height: 45px;

                  svg {
                    font-size: 13px;
                  }
                }
              }
            }
          }

          button {
            height: 35px;
            margin-top: 7%;
          }
        }
      }
    }
  }
}

/* MEDIUM */
@media (min-width: 768px) and (max-width: 992px) {
  #about-wrap {
    header {
      & > .container-fluid {
        & > .row {
          height: 65px;
          padding: 10px;

          // first row
          &:first-child {
            & > div {
              &:first-child {
                img {
                  float: left;
                  height: 27px !important;
                }
              }

              &:last-child {
                padding: 0 10px;

                h2 {
                  font: normal normal 600 17px/20px Work Sans;

                  // 3-dots icon
                  & ~ div {
                    font-size: 13px;
                  }
                }
              }
            }
          }

          // second row
          &:last-child {
            & > :first-child {
              .back-icn {
                padding: 8px;
                font-size: 38px;
              }
            }

            & > :last-child {
              padding: 0 5% !important;
              line-height: 16px;

              h4 {
                padding-bottom: 2px;
                font-size: 17px !important;
              }
            }
          }
        }
      }
    }

    main {
      & > section {
        padding: 4% 3%;

        h5 {
          font-size: 17px;
        }

        p {
          font-size: 14px;
          margin-bottom: 3%;
        }

        select {
          width: 47%;
          height: 42px;
          font-size: 14px;
        }

        // about MSDAT dashboard
        &:nth-child(1) {
          .row {
            & > div:first-child {
              justify-content: center;

              img {
                width: 400px;
                height: 250px;
                margin-bottom: 9%;
              }
            }
          }
        }

        // available data
        &:nth-child(3) {
          ::-webkit-scrollbar {
            height: 7px;
          }

          & > div {
            table {
              width: 1000px;

              & > :first-child {
                th {
                  height: 40px;
                  padding: 1.5% 1%;
                  font-size: 13px;
                }

                th:nth-child(2) {
                  width: 30%;
                  text-align: start;
                }
              }

              & > :last-child {
                font-size: 13px;

                td {
                  height: 45px;

                  svg {
                    font-size: 14px;
                  }
                }
              }
            }
          }

          button {
            height: 40px;
            margin-top: 7%;
          }
        }
      }
    }
  }
}

/* LARGE */
@media (min-width: 992px) and (max-width: 1200px) {
  main {
    & > section {
      // about MSDAT dashboard
      &:nth-child(1) {
        .row {
          & > div:first-child {
            img {
              width: 320px !important;
              height: 230px;
              margin-bottom: 9%;
            }
          }
        }
      }
    }
  }
}

/* EXTRA LARGE */
@media (min-width: 1200px) {
}

.loading-container {
  min-height: 300px;
}
</style>
