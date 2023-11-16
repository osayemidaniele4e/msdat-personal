<template>
  <div id="about-wrap">
    <the-header ref="theHeader" />
    <main @click="$refs.theHeader.close()">
      <!-- about MSDAT dashboard -->

      <section class="mt-5">
        <b-container fluid>
          <b-row>
            <b-col cols lg="5">
              <div>
                <img :src="macBookImg" alt="Macbook" />
              </div>
            </b-col>
            <b-col cols lg="7">
              <div>
                <p>
                  The Federal Ministry of Health (FMOH) Nigeria multi source
                  data analysis resource provides a single transparent view of
                  key health indicators against multiple data sources. It offers
                  a view against key metrics using sources that range from
                  routine data, surveys to global estimates recognizing that
                  data quality, trends and interpretation depend on the type of
                  source and methology behind the data. By transparently showing
                  data trends against multiple sources, we intend to improve the
                  debate and focus on data quality and use with the aim of
                  reducing variances between different sources over time and
                  improve our over all understanding of key trends and progress
                  within the health sector.
                </p>
                <p>
                  This resources will be developed and expanded in phases and
                  build on connections with existing FMOH agencies and partners.
                  As this resource evolves, DHPRS hopes that it will contribute
                  to improved performance management within the Health sector.
                  The first phase starts by exploring analysis using a selected
                  metrics at federal and state levels. Subsequent phases will
                  gradually increase the number of metrics available for
                  analysis to LGA and facility level.
                </p>
                <p>
                  The DHPRS team welcomes feedback o this resources and welcomes
                  stakeholders to upload relevant data using the upload data
                  button.
                </p>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </section>
      <!-- indicators -->
      <section>
        <h5>Indicators</h5>
        <p>
          The indicators provided by the Central Analytic Dashboard can be
          selected on the dashboard by clicking on the Select Indicator
          Drop-down, we've circled it red on the image to your left. The list of
          indicators on the dashboard can be found below:
        </p>
        <IndicatorPageFunc />
      </section>
      <!-- available data -->
      <section>
        <h5>Available Data</h5>
        <p>
          The Indicators provided by the Central Analytic Dashboard can be
          selected on the dashboard by clicking on the Select Indicator
          Drop-down, we've circled it red on the image to your left. The list of
          Indicators on the dashboard cab be found below:
        </p>
        <AvailableDataPageFunc />
      </section>
      <!-- data sources -->
      <section>
        <h5>Data Sources</h5>
        <p>
          The Indicators provided by the Central Analytic Dashboard can be
          selected on the dashboard by clicking on the Select Indicator
          Drop-down, we've circled it red on the image to your left.The list of
          Indicators on the dashboard cab be found below:
        </p>
        <div>
          <DataSourceFunc />
        </div>
      </section>
    </main>
    <the-footer />
  </div>
</template>

<script>
import theHeader from './layout/theHeader.vue';
import theFooter from './layout/theFooter.vue';
import DataSourceFunc from './components/AboutPageDataSource.vue';
import IndicatorPageFunc from './components/AboutPageIndicator.vue';
import AvailableDataPageFunc from './components/AboutPageAvailableData.vue';

const macBookImg = require('./assets/About-Dashboard-image.svg');

export default {
  components: {
    theHeader,
    theFooter,
    DataSourceFunc,
    IndicatorPageFunc,
    AvailableDataPageFunc,
  },
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
    };
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
</style>
