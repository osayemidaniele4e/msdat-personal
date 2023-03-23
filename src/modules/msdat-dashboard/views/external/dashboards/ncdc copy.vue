<template>
  <div id="about-wrap">
    <the-header ref="theHeader" />
    <b-container>
         <main @click="$refs.theHeader.close()">
<br>

   <b-icon-info-circle-fill

                />
                MSDAT External Dashboards.
  <!-- This is a dashboard developed by NCDC to show the outbreak of diseases across states in Nigeria from 2006 - 2021. It can be viewed via: https://ncdc.gov.ng/data -->
 <!-- <b-alert show>
        <b-icon-info-circle-fill

                />
  This is a dashboard developed by NCDC to show the outbreak of diseases across states in Nigeria from 2006 - 2021. It can be viewed via: https://ncdc.gov.ng/data </b-alert> -->
      <!-- <h1 class="text-align">MSDAT External Dashboards</h1> -->
    <base-sub-card :backgroundColor="'header'" class="my-2 shadow-sm">
          <template #title>
            <h5 class="font-weight-bold work-sans text-white">National Disease Outbreak Dashboard</h5>
          </template>
          <!-- lazy loading for each section starts here -->
          <!-- the first section doesn't need the component
                 since it will be mounted first -->

     <b-embed
    type="iframe"
    aspect="16by9"
    :width="width"
    :height="height"
    src="https://public.tableau.com/views/NCDCHistoricalDashboard/Dashboard_1?:language=en-GB&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true"
    class="embed"
  ></b-embed>
        </base-sub-card>

<!--
      <b-row>
        <b-col class="m-8">
          <b-card
            header-tag="header"
            footer="Card Footer"
            footer-tag="footer"
            title="Title"
          >
           <img src="./assets/ncdc.png" alt="" width="300px">
            <b-button href="#" variant="primary" v-b-toggle.collapse-1>Go somewhere</b-button>

              <b-collapse id="collapse-1" class="mt-2">
    <b-card>
      <p class="card-text">Collapse contents Here</p>
      <b-button v-b-toggle.collapse-1-inner size="sm">Toggle Inner Collapse</b-button>
      <b-collapse id="collapse-1-inner" class="mt-2">
        <b-card>Hello!</b-card>
      </b-collapse>
    </b-card>
  </b-collapse>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            header="featured"
            header-tag="header"
            footer="Card Footer"
            footer-tag="footer"
            title="Title"
          >
            <b-card-text>Header and footers using props.</b-card-text>
            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </b-col>

      </b-row>

      <b-row>
          <b-col cols="6">
          <b-card
            header="featured"
            header-tag="header"
            footer="Card Footer"
            footer-tag="footer"
            title="Title"
          >
            <b-card-text>Header and footers using props.</b-card-text>
            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card></b-col
        >
        https://ndr.nascp.gov.ng/public/wallboard
        https://ndr.nascp.gov.ng/public/dashboard
      </b-row> -->
    </main>
    </b-container>

    <the-footer />
  </div>
</template>

<script>
import theHeader from '../../about/layout/theHeader.vue';
import theFooter from '../../about/layout/theFooter.vue';
import LinkPrevue from '../preview/index.js';

export default {
  components: {
    theHeader,
    theFooter,
    LinkPrevue,
  },
  data() {
    return {
      width: '100%',
      height: '400',
      url: 'https://public.tableau.com/views/NCDCHistoricalDashboard/Dashboard_1?:language=en-GB&publish=yes&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true',
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

.main-section{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px;
  width: 70vw;
}

.embed{
  height: 100vh;
}
</style>
