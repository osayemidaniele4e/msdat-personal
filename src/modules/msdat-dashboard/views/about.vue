<template>
  <div id="about-wrap">
    <header class="border sticky-top">
      <b-container fluid>
        <b-row class="d-flex justify-content-between align-items-center">
          <b-col cols md="2" lg="2">
            <img
              src="../../../assets/img/fmoh_logo.png"
              alt="FMOH Logo"
              class="img-fluid"
            >
          </b-col>
          <b-col cols md="10" lg="10" class="d-flex justify-content-between align-items-center">
            <h2>Analysis of key Health Indicators</h2>
            <div>
              <a href="">
                <b-icon
                  icon="three-dots-vertical"
                  font-scale="1.5"
                />
              </a>
            </div>
          </b-col>
        </b-row>
        <b-row class="d-flex">
          <b-col cols="1">
            <a href="">
              <b-icon
                class="back-icn"
                icon="chevron-left"
              />
            </a>
          </b-col>
          <b-col class="d-flex flex-column align-items-center">
            <h4>About the MSDAT Dashboard</h4>
            <p>This dashboard is developed and managed by the Department of Health Planning Reseach and Statistics (DHPRS)</p>
          </b-col>
        </b-row>
      </b-container>
    </header>
    <main>
      <!-- about MSDAT dashboard -->
      <section>
        <b-container fluid>
          <b-row>
            <b-col cols lg="5">
              <div>
                <img src="../../../assets/img/About-Dashboard-image.png" alt="Macbook">
              </div>
            </b-col>
            <b-col cols lg="7">
              <div>
                <p>The Federal Ministry of Health (FMOH) Nigeria multi source data analysis resource provides a single transparent view of key health indicators against multiple data sources. It offers a view against key metrics using sources that range from routine data, surveys to global estimates recognizing that data quality, trends and interpretation depend on the type of source and methology behind the data. By transparently showing data trends against multiple sources, we intend to improve the debate and focus on data quality and use with the aim of reducing variances between different sources over time and improve our over all understanding of key trends and progress within the health sector.</p>
                <p>
                  This resources will be developed and expanded in phases and build on connections with existing FMOH agencies and partners. As this resource evolves, DHPRS hopes that it will contribute to improved performance management within the Health sector. The first phase starts by  exploring analysis using a selected metrics at federal and state levels. Subsequent phases will gradually increase the number of metrics available for analysis to LGA and facility level.
                </p>
                <p>
                  The DHPRS team welcomes feedback o this resources and welcomes stakeholders to upload relevant data using the upload data button.
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
          The indicators provided by the Central Analytic Dashboard can be selected on the dashboard by clicking on the Select Indicator Drop-down, we've circled it red on the image to your left. The list of indicators on the dashboard can be found below:
        </p>
        <div class="row d-flex justify-content-between align-items-center">
          <b-form-select
            v-for="(indicator, index) in indicators"
            :key="index"
            :options="indicator.options"
            v-model="selected"
          ></b-form-select>
        </div>
      </section>
      <!-- available data -->
      <section>
        <h5>Available Data</h5>
        <p>
          The Indicators provided by the Central Analytic Dashboard can be selected on the dashboard by clicking on the Select Indicator Drop-down, we've circled it red on the image to your left. The list of Indicators on the dashboard cab be found below:
        </p>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>Sources/Indicators</th>
                <th>MICS</th>
                <th>NDHS</th>
                <th>NARHS</th>
                <th>NNHS</th>
                <th>World Bank</th>
                <th>IHME</th>
                <th>WHO-GHO</th>
                <th>IHME</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Skilled attendance at delivery or birth</td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td></td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>ANC Coverage (4 Visits)</td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td></td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Contraceptive prevalence rate</td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td></td>
                <td></td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>IPV Coverage rate</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>5</td>
                <td>DPT 3/Penta 3 coverage rate</td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td></td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>

              </tr>
              <tr>
                <td>6</td>
                <td>Infant mortality rate</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>7</td>
                <td>Percentage of children fully immunized against childhood diseases by age 1</td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td></td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td></td>
                <td>
                  <b-icon-check-circle-fill />
                </td>
                <td></td>
                <td>
                  <b-icon-check-circle-fill />
                </td>

              </tr>
            </tbody>
          </table>

        </div>
        <div>
          <b-button>see more</b-button>
        </div>
      </section>
      <!-- data sources -->
      <section>
        <h5>Data Sources</h5>
        <p>
          The Indicators provided by the Central Analytic Dashboard can be selected on the dashboard by clicking on the Select Indicator Drop-down, we've circled it red on the image to your left.The list of Indicators on the dashboard cab be found below:
        </p>
        <div>
          <div v-for="(dataSource, index) in dataSources" :key="index">
            <h6 class="mb-2">{{dataSource.name}}</h6>
            <div class="row d-flex justify-content-between align-items-center">
              <b-form-select
                v-for="(source, index) in dataSource.sources"
                :key="index"
                :options="source"
                v-model="selected"
              ></b-form-select>
            </div>
          </div>
        </div>
      </section>
    </main>
    <page-footer />
  </div>
</template>

<script>
import PageFooter from '../components/pageFooter.vue';

export default {
  components: {
    PageFooter,
    // AppTable,
  },
  data() {
    return {
      selected: null,
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
