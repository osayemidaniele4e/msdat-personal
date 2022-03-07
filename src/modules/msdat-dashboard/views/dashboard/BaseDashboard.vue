<template>

<div>

    <!-- initial plan for the multi-source mbile is to duplicate the div below -->
    <div class="temp">
    <TroubleShootingModal
      style="z-index: 1500"
      v-if="showTroubleShootingModal"
    />
    <template v-if="!showTroubleShootingModal">
      <Loading
        v-if="!loading"
        :hideButton="true"
        :noBackdrop="false"
        :showBackground="false"
        class="over"
      >
        <div class="text-center">
          <img :src="loadingImg" alt="first_img" width="250px" />
          <div class="mr-4">
            <h3>Initializing{{ loadingTitle }}</h3>
            <p>{{ loadingContent }}</p>
          </div>
        </div>
      </Loading>

      <div v-else>
        <Header v-on:tour="runIntro" ref="theHeader" @index="getIndex"></Header>
        <section @click="$refs.theHeader.close()">

              <div class="position-relative" :class="[isMobile ?
              'position-relative' : 'sticky animated_toggle']" >
          <!-- <div class="position-relative" :class="[show ? '' : 'hide']"> -->
<!-- <div class="sticky animated_toggle" :class="[show ? '' : 'hide']">  -->

  <!-- Moses changed from this -->
            <b-overlay :show="!cpIsLoading">
              <BasePanel
                :changeIndex="changeIndex"
                :position="position"
                v-if="cpIsLoading"
                v-on:showSection="sectionFocus($event)"
              >
                <template v-slot:default>
                  <ControlBase
                    v-for="(control, index) in $store.state.MSDAT_STORE
                      .controlConfig"
                    :key="index"
                    :title="control.label"
                  >
                    <template v-if="!Array.isArray(control.setup[0])">
                      <ControlPanel
                        @data:options="log($event, index)"
                        :setup="control.setup"
                        :controlIndex="index"
                        :defaultIndicator="defaultIndicator"
                        :defaultDataSource="defaultDataSource"
                        :defaultLocation="defaultLocation"
                        :defaultYear="defaultYear"
                      />
                    </template>
                    <template v-else>
                      <div class="row">
                        <div
                          class="col-md-4"
                          v-for="(item, index2) in control.setup"
                          :key="index2"
                        >
                          <ControlPanel
                            @data:options="log($event, index, index2)"
                            :setup="item"
                            :groupIndex="index2"
                            :controlIndex="index"
                            :defaultIndicator="defaultIndicator"
                            :defaultDataSource="defaultDataSource"
                            :defaultLocation="defaultLocation"
                            :defaultYear="defaultYear"
                          />
                        </div>
                      </div>
                    </template>
                  </ControlBase>
                </template>
              </BasePanel>
            </b-overlay>
          </div>
          <!-- control Panels ends here  -->

          <div class="container-fluid lessVisible">
            <template
              v-for="(controlPanel, index) in $store.state.MSDAT_STORE
                .controlConfig"
            >
              <slot
                :name="`section-before-${index}`"
                v-if="index === selectedPanel"
              ></slot>
              <div
                class="row observable"
                :id="index"
                v-if="index === selectedPanel"
                :ref="index"
                :key="index"
              >
                <!-- <slot
                v-if="controlPanel.payload === undefined"
                :name="`section-${index}`"
                :controlIndex="index"
              ></slot> -->
                <slot
                  :name="`section-${index}`"
                  :payload="controlPanel.payload"
                  :controlIndex="index"
                ></slot>
                <slot
                  :name="`section-after-${index}`"
                  v-if="index === selectedPanel"
                ></slot>
              </div>
            </template>
          </div>
        </section>
        <!-- lazy loading ends here -->

        <Footer class="visible"> </Footer>
        <!-- <div v-if="configObject.name !== 'Demographics'"> -->
        <Onboarding
          v-if="firstTime"
          v-on:closeOnboard="onCloseOnBoarding"
        ></Onboarding>
        <!-- </div> -->
      </div>
    </template>
    <!-- <button class="btn btn-primary toggle_btn" @click="show = !show">toggle</button> -->
  </div>
</div>

</template>

<script>
import {
  BasePanel,
  ControlBase,
  ControlPanel,
} from '@/components/ControlPanel';
import formatter from '../../mixins/formatter';
import controlPanelSetup from '../../mixins/control-panel-setup';
import tour from '../onboarding/tour';
import Header from '../about/layout/theHeader.vue';
import Footer from '../about/layout/theFooter.vue';
import scroll from '../../modules/onScroll/onscroll';
import SharingDashboardState from '../../modules/dashboard_state_share/mixins';
import Loading from '../../mixins/loading';
import Onboarding from '../onboarding/onboarding';
import TroubleShooting from '../../modules/troubleshooting/mixins';
import config from '../../../dynamic_dashboard/config/dashboard_config';

export default {
  name: 'BaseDashboard',
  mixins: [
    Loading,
    formatter,
    controlPanelSetup,
    Onboarding,
    tour,
    scroll,
    TroubleShooting,
    SharingDashboardState,
  ],
  data() {
    return {
      position: 3,
      selectedPanel: 0,
      dashboardConfig: config,
      show: false,
      changeIndex: '',
      isMobile: false,
      winSize: window.width,
    };
  },
  components: {
    ControlBase,
    BasePanel,
    ControlPanel,
    Header,
    Footer,
  },
  props: {
    initialIndicator: {
      type: Number,
      required: true,
    },
    initialDataSource: {
      type: Number,
      required: true,
    },
    initialLocation: {
      type: Number,
      required: true,
    },
    indicators: {
      type: Array,
      required: false,
    },
    dataSources: {
      type: Array,
      required: false,
    },
    defaultIndicators: {
      type: Array,
      required: false,
    },
  },

  created() {
    const { name } = this.$route.params;
    this.configObject = this.dashboardConfig.find((item) => item.name === name);
    window.addEventListener('resize', this.onResize);
  },

  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    // moses
    getIndex(index) {
      console.log('this is the index i am saying', index);
      this.changeIndex = index;
    },
    /**
     * This handles hiding the other sections
     * based on the index of the selected section
     */
    sectionFocus(event) {
      this.selectedPanel = event;
    },
    /**
     * @param optionsObject The return a control Options objects when ever any control
     * in a control panel changes
     * @param index The index of the control panel that changes
     * you can use this to check which control panel changed
     *
     */

    /**
     * *
     */
    setState(val) {
      this.selectedMapName = val;
    },
    async log(optionsObject, index, index2) {
      console.log({ optionsObject, index, index2 });
      // console.log('MSDAT2.0');
      /**
       * This Update the route any time the  control panel changers
       */
      // if (Object.keys(optionsObject).length > 0) {
      //   const objects = this.extractIdsOfObject(optionsObject);
      //   this.addHashToLocation({
      //     section: index,
      //     first_related: optionsObject.indicator.first_related,
      //     second_related: optionsObject.indicator.second_related,
      //     ...objects,
      //   });
      // }
    },
    // closeOnboard() {
    //   this.firstTime = false;
    // },

    onResize() {
      console.log('width', window.innerWidth);
      if (window.innerWidth < 769) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },

  // watch: {
  // isMobile() {
  //     console.log('isMobile', this.isMobile)
  // },
  // },

  async mounted() {
    this.loading = false;
    // initializing data for dashboard
    // console.trace(this.$route.query);
    let urlRequestedIndicator = [];
    if (this.$route.query.indicator) {
      urlRequestedIndicator = this.getRouteIndicatorRelatedIndicators();
    }
    try {
      await this.$DL.init({
        dashboardIndicators: this.indicators,
        defaultIndicators:
          urlRequestedIndicator.length > 0 // Check if the url has an indicator exists then inits it
            ? urlRequestedIndicator
            : this.defaultIndicators,
        dashboardDataSources: this.dataSources,
      });

      this.loading = true;

      this.$store.commit('MSDAT_STORE/SET_INITIAL', {
        indicator: this.initialIndicator,
        datasource: this.initialDataSource,
        location: this.initialLocation,
      });

      // The initializing the control panel
      this.setDefaults();
      this.setUpControlPanelDropDown();

      this.defaultYearDropdown = this.setYearDropdown();
      if (this.defaultYearDropdown.length > 0) {
        const firstItem = 0;
        this.defaultYear = this.defaultYearDropdown[firstItem];
      }
      // setTimeout(() => {
      //   this.setRouteQueryToControlPanel();
      // }, 4000);

      this.cpIsLoading = true;
      this.$nextTick(() => {
        this.startScroll();
      });
    } catch (error) {
      // This means it a dexies error
      if (!error.isAxiosError) {
        this.showTroubleShootingModal = true;
      }
    }
  },
};
</script>

<style lang="scss">
div.temp {
  a {
    font-size: 13px !important;
  }
  h5,
  h2,
  h3,
  h4,
  h1 {
    font-size: 1rem !important;
  }
  li {
    font-size: 0.9rem !important;
  }
  table span {
    font-size: 1rem !important;
  }
  .sticky {
    position: sticky;
    position: -webkit-sticky;
    top: 0px;
    z-index: 2;
    background-color: white;
    box-shadow: 0px 3px 8px 0px #888888;
  }
  .visible {
    z-index: 10;
  }
  .lessVisible {
    z-index: -1;
  }
}
</style>
