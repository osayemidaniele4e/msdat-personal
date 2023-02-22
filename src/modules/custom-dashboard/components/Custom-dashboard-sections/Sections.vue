/* eslint-disable vue/no-unused-components */
<!-- Auther: Ghufran Ahmed  -->
<template>
  <div class="temp">
    <TroubleShootingModal
      style="z-index: 1500"
      v-if="showTroubleShootingModal"
    />
    <template v-if="!showTroubleShootingModal">
      <Loading
        v-if="!loading"
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
        <Header v-on:tour="runIntro" ref="theHeader"></Header>
        <section @click="$refs.theHeader.close()">
          <div class="sticky animated_toggle" :class="[show ? '' : 'hide']">
            <b-overlay :show="!cpIsLoading">
              <BasePanel
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
                        <div>{{'reset'+resetData}} </div>

                          <ControlPanel
                            @data:options="log($event, index, index2)"
                            :setup="item"
                            :groupIndex="index2"
                            :controlIndex="index"
                            :defaultIndicator="defaultIndicator"
                            :defaultDataSource="defaultDataSource"
                            :defaultLocation="defaultLocation"
                            :defaultYear="defaultYear"
                            :updateValue="updateValue"
                            :updateKey="updateKey"
                            :resetData="resetData"
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
              <!-- ========= -->
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
                <!-- ======== -->
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
</template>

<script>
import {
  BasePanel,
  ControlBase,
  ControlPanel,
} from '@/components/ControlPanel';
import formatter from '../../../msdat-dashboard/mixins/formatter';
import controlPanelSetup from '../../../msdat-dashboard/mixins/control-panel-setup';
import tour from '../../../msdat-dashboard/views/onboarding/tour';
import Header from '../../../msdat-dashboard/views/about/layout/theHeader.vue';
import Footer from '../../../msdat-dashboard/views/about/layout/theFooter.vue';
import scroll from '../../../msdat-dashboard/modules/onScroll/onscroll';
import SharingDashboardState from '../../../msdat-dashboard/modules/dashboard_state_share/mixins';
import Loading from '../../../msdat-dashboard/mixins/loading';
import Onboarding from '../../../msdat-dashboard/views/onboarding/onboarding';
import TroubleShooting from '../../../msdat-dashboard/modules/troubleshooting/mixins';
import config from '../../../dynamic-dashboard/config/dashboard_config';

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

    updateValue: {
      type: Object,
      required: false,
    },

    updateKey: {
      type: String,
      required: false,
    },

    resetData: {
      type: Number,
      required: false,
    },
  },
  created() {
    const { name } = this.$route.params;
    this.configObject = this.dashboardConfig.find((item) => item.name === name);
  },
  methods: {
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
    },
  },

  async mounted() {
    this.loading = false;
    // initializing data for dashboard
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
