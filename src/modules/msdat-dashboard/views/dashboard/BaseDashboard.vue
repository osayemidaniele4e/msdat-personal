<!-- eslint-disable no-undef -->
<template>
  <div class="temp">
    <TroubleShootingModal style="z-index: 1500" v-if="showTroubleShootingModal" />
    <div id="browserSupport" v-show="detect" class="col-lg-4 col-md-7 col-sm-6 col-xs-12">
      <button
        v-show="detect"
        v-on:click="closeAlert()"
        style="font-size: 20px"
        type="button"
        class="close mt-2"
        data-dismiss="#browserSupport"
      >
        <span aria-hidden="true" class="mb-4 mt-4 pt-4 pr-4">&times;</span>
      </button>
      <h4 class="mt-4 pl-2">
        <img src="@/assets/img/browser.png" /><strong class="alertBold"
          >Unsupported Browser!
        </strong>
      </h4>

      <p class="p-2">
        Looks like you are using a browser that is not supported, so you may experience some
        problems.
      </p>
      <p class="pb-4 pl-2">
        Please use <strong class="alertBold">Google Chrome</strong> browser for the best experience
        with <br />
        MSDAT Platform.
      </p>
    </div>
    <template v-if="!showTroubleShootingModal">
      <Loading v-if="!loading" :noBackdrop="true" :showBackground="false" class="over">
        <div class="text-center">
          <img :src="loadingImg" alt="first_img" width="250px" />
          <div class="mr-4">
            <h3>Initializing{{ loadingTitle }}</h3>
            <p>{{ loadingContent }}</p>
          </div>
        </div>
      </Loading>

      <div v-else class="position-relative">
        <!-- <BaseUpdate :showPopUp="popUp" v-if="popUp" @closePopUp="handleClosePopUp" /> -->
        <Header v-on:tour="runIntro" ref="theHeader" @index="getIndex"></Header>
        <section @click="$refs.theHeader.close()">
          <div
            :class="[
              isMobile ? 'position-relative animated_toggle' : 'sticky animated_toggle',
              show ? '' : 'hide',
            ]"
          >
            <!-- Moses changed from this -->
            <b-overlay :show="!cpIsLoading">
              <BasePanel
                :changeIndex="changeIndex"
                :position="position"
                :selectedPanel="selectedPanel"
                v-if="cpIsLoading"
                v-on:showSection="sectionFocus($event)"
              >
                <template v-slot:default>
                  <ControlBase
                    @selectedKey="changeKey($event)"
                    v-for="(control, index) in $store.state.MSDAT_STORE.controlConfig"
                    :key="index"
                    :title="control.label"
                  >
                    <template v-if="!Array.isArray(control.setup[0])">
                      <ControlPanel
                        :label="modifyLabel(control.label)"
                        :setup="control.setup"
                        :controlIndex="index"
                        :defaultIndicator="defaultIndicator"
                        :defaultDataSource="defaultDataSource"
                        :defaultLocation="defaultLocation"
                        :defaultYear="defaultYear"
                      />
                    </template>
                    <!-- MULTI SELECT SECTION -->
                    <template v-else>
                      <div>
                        <!-- mobile view direction buttons -->
                        <div class="swipe-btn-flex">
                          <button @click="swipeLeft" class="swipe-btn">
                            <b-icon icon="chevron-left" />
                          </button>
                          <button @click="swipeRight" class="swipe-btn">
                            <b-icon icon="chevron-right" />
                          </button>
                        </div>
                        <div class="row dummy-row">
                          <div
                            class="col-md-4"
                            v-for="(item, index2) in control.setup"
                            :key="index2"
                          >
                            <h3 class="control-header">Control ({{ index2 + 1 }})</h3>
                            <!-- ADVANCED ANALYTICS PROGRAM-AREA -->
                            <div v-if="isAdvanced">
                              <label class="text-uppercase work-sans label-text"
                                >program areas</label
                              >
                              <SelectDropdown
                                v-model="$data[indexModel(index2)]"
                                :value="null"
                                :options="options"
                              />
                            </div>
                            <ControlPanel
                              :label="modifyLabel(control.label, index2)"
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
                              :indicatorList="$data[indexModel(index2)]"
                            />
                          </div>
                        </div>
                      </div>
                    </template>
                  </ControlBase>
                </template>
              </BasePanel>
            </b-overlay>
          </div>
          <!-- control Panels ends here  -->

          <div class="container-fluid lessVisible mb-5">
            <template v-for="(controlPanel, index) in $store.state.MSDAT_STORE.controlConfig">
              <!-- <slot
                :name="`section-before-${index}`"
                v-if="index === selectedPanel"
              ></slot> -->
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
                <slot :name="`section-after-${index}`" v-if="index === selectedPanel" :ref="index">
                </slot>
              </div>
            </template>
          </div>
        </section>
        <!-- lazy loading ends here -->

        <Footer class="visible"> </Footer>
        <!-- <div v-if="configObject.name !== 'Demographics'"> -->
        <Onboarding v-if="firstTime" v-on:closeOnboard="onCloseOnBoarding"></Onboarding>
        <!-- </div> -->
      </div>
    </template>
    <!-- <button class="btn btn-primary toggle_btn" @click="show = !show">toggle</button> -->
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import {
  BasePanel, ControlBase, ControlPanel, SelectDropdown,
} from '@/components/ControlPanel';
import apiServices from '@/modules/DataLayer/services/ApiServices';
import config from '@/modules/dynamic_dashboard/config/dashboard_config';
import formatter from '../../mixins/formatter';
import controlPanelSetup from '../../mixins/control-panel-setup';
import tour from '../onboarding/tour';
import Header from '../about/layout/theHeader.vue';
import Footer from '../about/layout/theFooter.vue';
import scroll from '../../modules/onScroll/onscroll';
import SharingDashboardState from '../../modules/dashboard_state_share/mixins';
import Loading from '../../mixins/loading';
import Onboarding from '../onboarding/onboarding';
import TroubleShootingModal from '../../modules/troubleshooting/modal.vue';

export default {
  name: 'BaseDashboard',
  mixins: [Loading, formatter, controlPanelSetup, Onboarding, tour, scroll, SharingDashboardState],
  components: {
    TroubleShootingModal,
    ControlBase,
    BasePanel,
    ControlPanel,
    SelectDropdown,
    Header,
    Footer,
  },
  data() {
    return {
      isAdvanced: false,
      showTroubleShootingModal: false,
      position: 3,
      selectedPanel: 0,
      dashboardConfig: config,
      show: false,
      changeIndex: '',
      isMobile: false,
      winSize: window.width,
      scrollCont: 0,
      scrollDuration: 0,
      scrollStartTime: 0,
      scrollElement: 0,
      scrollPixels: 0,
      scrollPos: '',
      sectionKey: 0,
      popUp: true,
      program_areas: [
        { name: 'Buy', value: 'buy' },
        { name: 'Shortlets', value: 'shortlet' },
        { name: 'Rent', value: 'rent' },
      ],
      value: null,
      detect: false,
      value0: null,
      value1: null,
      value2: null,
      options: [
        'Demographics',
        'Financing',
        'Health Financing',
        'Facility service delivery',
        'RMNCH',
        'Mortality',
        'Dental Therapy Practice',
        'HIV',
        'Nutrition',
        'Service delivery',
        'Optometry Practice',
        'Medical Doctors',
        'HR Guidelines and Workforce',
        'Climate',
        'Education',
      ],
      program_option: '',
      indicators: [],
      dataSources: [],
      defaultIndicators: [],
      initialIndicator: null,
      initialDataSource: null,
      initialLocation: null,
    };
  },
  props: {
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

    scrollLeft2: {
      type: Number,
    },
  },

  async created() {
    this.indicators = this.getConfigObject().indicators;
    this.dataSources = this.getConfigObject().dataSources;
    this.defaultIndicators = this.getConfigObject().defaultIndicators;
    this.initialIndicator = this.getConfigObject().initialIndicator;
    this.initialDataSource = this.getConfigObject().initialDataSource;
    this.initialLocation = this.getConfigObject().initialLocation;
    window.addEventListener('resize', this.onResize);

    // checking if in Mobile view
    if (window.innerWidth < 769) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    window.addEventListener('wheel', this.handleScroll);
  },

  destroyed() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('wheel', this.handleScroll);
  },

  methods: {
    ...mapMutations('MSDAT_STORE', ['SET_CONFIGURATIONS']),
    ...mapGetters('MSDAT_STORE', ['getConfigObject']),
    //  passing the value of the v-model for program areas dynamically
    indexModel(index) {
      return `value${index}`;
    },
    handleClosePopUp() {
      this.popUp = false;
    },

    changeKey(n) {
      this.sectionKey = n;
    },
    scroll(timestamp) {
      // Calculate the timeelapsed
      const timeElapsed = timestamp - this.scrollStartTime;
      // Calculate progress
      const progress = Math.min(timeElapsed / this.scrollDuration, 1);
      // Set the scrolleft
      this.scrollElement.scrollLeft = this.scrollPos + this.scrollPixels * progress;
      // Check if elapsed time is less then duration then
      // call the requestAnimation, otherwise exit
      if (timeElapsed < this.scrollDuration) {
        // Request for animation
        window.requestAnimationFrame(this.scroll);
      }
    },
    closeAlert() {
      this.detect = false;
    },
    detectBrowser() {
      let browser = 'unknown';
      if (navigator.userAgent.indexOf('Chrome') !== -1) {
        browser = 'Chrome';
      } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
        browser = 'Mozilla Firefox';
      } else if (navigator.userAgent.indexOf('MSIE') !== -1) {
        browser = 'Internet Explorer';
      } else if (navigator.userAgent.indexOf('Safari') !== -1) {
        browser = 'Safari';
      } else if (navigator.userAgent.indexOf('Opera') !== -1) {
        browser = 'Opera';
      } else if (navigator.userAgent.indexOf('YaBrowser') !== -1) {
        browser = 'IE';
      }
      return browser;
    },
    handleScroll() {
      this.scrollCont = document.querySelector('.dummy-row').scrollLeft;
      this.$emit('scrollN', this.scrollCont);
    },
    scrollTo(element, scrollPixels, duration) {
      this.scrollPixels = scrollPixels;
      this.scrollElement = element;
      this.scrollDuration = duration;
      const scrollPos = element.scrollLeft;
      this.scrollPos = scrollPos;
      // Condition to check if scrolling is required
      if (
        !(
          (scrollPos === 0 || scrollPixels > 0)
          && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0)
        )
      ) {
        // Get the start timestamp
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        this.scrollStartTime = startTime;
        // Call requestAnimationFrame on scroll function first time
        window.requestAnimationFrame(this.scroll);
      }
    },

    swipeLeft() {
      // const content = this.$refs.dummy-row;
      const content = document.querySelector('.dummy-row');
      this.scrollTo(content, -300, 800);
      const cord = {
        x: -370,
        y: 800,
      };
      this.$emit('swipe', cord);
    },

    swipeRight() {
      const content = document.querySelector('.dummy-row');
      this.scrollTo(content, 300, 800);
      const cord = {
        x: 370,
        y: 800,
      };
      this.$emit('swipe', cord);
    },

    getIndex(index) {
      this.changeIndex = index;
    },
    /**
     * Since the purpose of providing labels to
     * the multiselects is so they can have unique,
     * dynamic IDs, this function converts it to a
     * HTML
     * ID fit format, i.e without spaces
     */
    modifyLabel(fullName, index) {
      if (index) {
        return fullName.replace(' ', '-') + index;
      }
      return fullName.replace(' ', '-');
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
    setState(val) {
      this.selectedMapName = val;
    },
    // async log(optionsObject, index, index2) {
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
    // },
    // closeOnboard() {
    //   this.firstTime = false;
    // },

    onResize() {
      if (window.innerWidth < 769) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
  watch: {
    async program_option(newVal) {
      if (this.$store.state.CUSTOM_DASHBOARD_STORE.customDashboard === false) {
        try {
          const response = await apiServices.getDashboard();
          const { results } = response.data;
          const dashboard = results.find((item) => item.name === newVal);
          if (dashboard === undefined) {
            this.$router.push('/*');
            return;
          }
          this.configObject = dashboard;
          this.SET_CONFIGURATIONS(this.configObject);
        } catch (err) {
          console.log(
            err,
            '%c 👋🏽, Welcome to MSDAT!, An error occurred on the Base Dashboard Component, \n\n \r\r',
            'color: #ccc; font-family:sans-serif; font-size: 1rem; padding-left: 1rem',
          );
        }
      }
    },
  },
  async mounted() {
    this.loading = false;
    let urlRequestedIndicator = [];
    if (this.$route.query.indicator) {
      urlRequestedIndicator = this.getRouteIndicatorRelatedIndicators();
    }
    if (this.detectBrowser() !== 'Chrome') {
      this.detect = true;
    } else {
      this.detect = false;
    }

    setTimeout(() => {
      if (this.detect) {
        this.closeAlert();
      }
    }, 60000);
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
      await this.setDefaults();
      await this.setUpControlPanelDropDown();

      // pick one of the available years as the default years as opposed to the static 2016 year
      this.defaultYearDropdown = await this.setYearDropdown();
      if (this.defaultYearDropdown.length > 0) {
        this.defaultYear = this.defaultYearDropdown[0];
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
div#browserSupport {
  position: fixed;
  margin: 5px 5px 0 0;
  background-color: #fff3cd;
  color: #583e03;
  top: 0;
  border: 0.5px solid #583e03;
  font-size: 12px;
  box-shadow: -3px 5px 10px #00000029;
  right: 0;
  border-radius: 5px;
  z-index: 900;
}
div#browserSupport img {
  width: 34px;
  height: 30px;
}
.alertBold {
  color: #583e03;
}
.swipe-btn-flex {
  display: none;
}

.control-header {
  display: none;
}
.label-text {
  font-size: 13px;
  font-weight: bold;
}

@media (max-width: 800px) {
  .swipe-btn-flex {
    display: flex;
    flex-direction: row;
    position: sticky;
    justify-content: space-between;
    /* z-index: 10; */
    margin: 10px;
  }

  .control-header {
    display: inherit;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    margin: 5px;
  }

  /* testing for mobile */
  .dummy-row {
    display: flex;
    flex-direction: row;
    overflow: scroll;
    flex-wrap: nowrap;
  }
}
</style>
