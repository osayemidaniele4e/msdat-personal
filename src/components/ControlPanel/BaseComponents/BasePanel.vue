<template>
  <div class="">
    <ul>
      <draggable v-model="modifiedControls">
        <transition-group
          class="d-flex mr-2 list-unstyled step-sections pt-2 mb-0 border-b cursor-pointer main tabs-sec"
        >
          <li
            class="mb-0 tab-link h6 text-black-50 bg-tab-color work-sans main"
            :class="[el.index === selectedIndex ? 'active font-weight-bold' : '']"
            v-for="(el, i) in modifiedControls"
            :key="i"
            :id="`panel-${el.index}`"
            @click="changeControl(el.index, el.title)"
          >
            {{ el.title }}
          </li>
        </transition-group>
      </draggable>
    </ul>

    <div class="control-title">{{ title }}</div>
    <!-- Multi-select dropdown here -->
    <div class="mx-lg-2 px-3 mx-auto pb-3 step-controls styles">
      <slot v-bind:selectControl="selectControl" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import controlSetup from '../../../modules/msdat-dashboard/mixins/control-panel-setup';

export default {
  name: 'BasePanel',
  mixins: [controlSetup],
  components: {
    draggable,
  },
  data() {
    return {
      controls: [],
      modifiedControls: [],
      selectedIndex: 0,
      title: 'Indicator Overview',
      checkIndex: 0,
    };
  },

  props: {
    tabs: {
      type: Array,
    },

    position: {
      type: Number,
      require: false,
      default: 0,
    },

    changeIndex: {
      require: false,
      default: 1,
    },

    selectedPanel: {
      require: false,
      default: 0,
    },
  },
  methods: {
    ...mapGetters('MSDAT_STORE', ['getSelectedConfig', 'getConfigObject']),

    // async changeControl(index, title) {
    //   // console.log(this.modifiedControls, { index });

    //   if (title !== undefined) {
    //     this.$store.commit('MSDAT_STORE/SET_SECTION', title);
    //   }
    //   this.selectedIndex = index;
    //   this.checkIndex = index;
    //   this.selectControl(index);
    //   if (index !== 4 && this.getSelectedConfig().indicator !== null) {
    //     this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
    //       controlIndex: index,
    //       key: 'indicator',
    //       value: this.getSelectedConfig().indicator,
    //     });
    //   }
    //   if (index !== 4) {
    //     this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
    //       controlIndex: index,
    //       key: 'datasource',
    //       value: this.getSelectedConfig().dataSource,
    //     });
    //   }

    //   // if (index === 2 && this.getConfigObject().name === 'Demographics') {
    //   //   this.$store.commit('MSDAT_STORE/SET_MULTI_PAYLOAD', {
    //   //     controlIndex: index,
    //   //     key: 'indicator',
    //   //     value: this.getSelectedConfig().indicator,
    //   //   });

    //   //   this.$store.commit('MSDAT_STORE/SET_MULTI_DATASOURCE_PAYLOAD', {
    //   //     controlIndex: index,
    //   //     key: 'datasource',
    //   //     value: this.getSelectedConfig().dataSource,
    //   //   });
    //   //   this.$store.commit('MSDAT_STORE/SET_MULTI_YEAR_PAYLOAD', {
    //   //     controlIndex: index,
    //   //     key: 'period',
    //   //     value: this.getSelectedConfig().period,
    //   //   });
    //   // }

    //   if (index === 4) {
    //     this.$store.commit('MSDAT_STORE/SET_MULTI_PAYLOAD', {
    //       controlIndex: index,
    //       key: 'indicator',
    //       value: this.getSelectedConfig().indicator,
    //     });

    //     this.$store.commit('MSDAT_STORE/SET_MULTI_DATASOURCE_PAYLOAD', {
    //       controlIndex: index,
    //       key: 'datasource',
    //       value: this.getSelectedConfig().dataSource,
    //     });
    //     this.$store.commit('MSDAT_STORE/SET_MULTI_YEAR_PAYLOAD', {
    //       controlIndex: index,
    //       key: 'period',
    //       value: this.getSelectedConfig().period,
    //     });
    //   }

    //   if (index === 2) {
    //     const availableIndicator = await this.setIndicatorDropdown(this.getSelectedConfig().dataSource.id);
    //     console.log(availableIndicator, 'availableIndicator@');
    //   }

    //   // this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
    //   //   controlIndex: index,
    //   //   key: 'datasource',
    //   //   value: this.getSelectedConfig().dataSource,
    //   // });
    //   this.$emit('showSection', index);
    // },
    async changeControl(index, title) {
      // Set section title if provided
      if (title) {
        this.$store.commit('MSDAT_STORE/SET_SECTION', title);
      }

      this.selectedIndex = index;
      this.checkIndex = index;
      this.selectControl(index);

      const selectedConfig = this.getSelectedConfig();

      if (index !== 4) {
        if (selectedConfig.indicator !== null) {
          this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
            controlIndex: index,
            key: 'indicator',
            value: selectedConfig.indicator,
          });
        }
        this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
          controlIndex: index,
          key: 'datasource',
          value: selectedConfig.dataSource,
        });
      } else {
        this.$store.commit('MSDAT_STORE/SET_MULTI_PAYLOAD', {
          controlIndex: index,
          key: 'indicator',
          value: selectedConfig.indicator,
        });
        this.$store.commit('MSDAT_STORE/SET_MULTI_DATASOURCE_PAYLOAD', {
          controlIndex: index,
          key: 'datasource',
          value: selectedConfig.dataSource,
        });
        this.$store.commit('MSDAT_STORE/SET_MULTI_YEAR_PAYLOAD', {
          controlIndex: index,
          key: 'period',
          value: selectedConfig.period,
        });
      }

      if (index === 2 && this.getConfigObject().name !== 'GIS_Mapping_Dashboard') {
        const availableIndicator = await this.setIDCIndicatorDropdown(selectedConfig.dataSource.id);

        this.$store.commit('MSDAT_STORE/SET_IDC_INDICATOR_OPTIONS', {
          value: availableIndicator,
        });

        this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
          controlIndex: index,
          key: 'indicator',
          value: selectedConfig.indicator,
        });
        this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
          controlIndex: index,
          key: 'datasource',
          value: selectedConfig.dataSource,
        });
      }

      this.$emit('showSection', index);
    },

    selectControl(controlIndex) {
      this.selectedIndex = controlIndex;
      // loop over all the tabs
      this.controls.forEach((control, index) => {
        // eslint-disable-next-line no-param-reassign
        control.active = index === controlIndex + 1;
      });
    },
    // selectControll(controlIndex) {
    //   this.selectedIndex = controlIndex;
    //   // loop over all the tabs

    //   this.abc.forEach((control) => {
    //     // eslint-disable-next-line no-param-reassign
    //     control.active = control.id === controlIndex;
    //   });
    // },
  },

  watch: {
    controls(value) {
      for (let i = 0; i < value.length; i++) {
        if (value[i].title) {
          if (!this.modifiedControls.includes(value[i])) {
            const data = value[i];
            data.index = i - 1;
            this.modifiedControls.push(data);
          }
        }
      }
    },
    position(newValue) {
      this.selectedIndex = newValue;
      this.selectControl(this.selectedIndex);
    },

    // if the index is changed
    changeIndex(newValue) {
      this.selectedIndex = newValue;
      this.changeControl(newValue);
    },

    selectedIndex(newValue) {
      // console.log('selected', this.$store.getters);
      this.changeControl(newValue);

      const { name } = this.$route.params;
      if (name === 'Advanced_Analytics') {
        if (newValue === 0) {
          this.title = 'Correlation Analysis';
          this.$store.dispatch('setSectionTitle', 'Correlation Analysis');
        }
        if (newValue === 1) {
          this.title = 'Descriptive Analysis';
          this.$store.dispatch('setSectionTitle', 'Descriptive Analysis');
        }
        if (newValue === 2) {
          this.title = 'Indicator Comparison';
          this.$store.dispatch('setSectionTitle', 'Indicator Comparison');
        }
        if (newValue === 3) {
          this.title = 'Predictive Analysis';
          this.$store.dispatch('setSectionTitle', 'Predictive Analysis');
        }
        if (newValue === 4) {
          this.title = 'Multisource Inidcator Comparison';
          this.$store.dispatch('setSectionTitle', 'Multisource Inidcator Comparison');
        }
      }
      if (name !== 'Advanced_Analytics') {
        if (newValue === 0) {
          this.title = 'Indicator Overview';
        }
        if (newValue === 1) {
          this.title = 'Zonal Analysis';
        }
        if (newValue === 2) {
          this.title = 'Indicator Comparison';
        }
        if (newValue === 3) {
          this.title = 'Dataset Comparison';
        }
        if (newValue === 4) {
          this.title = 'Multi-Source Overview';
        }
        if (newValue === 5) {
          this.title = 'Disaggregation';
        }
      }
    },
  },
  computed: {
    // abc() {
    //   return this.$store.getters.arrangedSections.filter((element) => element.isShow === true);
    // },
    customDashboard() {
      return this.$store.state.CUSTOM_DASHBOARD_STORE.customDashboard;
    },
  },
  mounted() {
    const index = parseInt(this.$route.query.index, 10) || 0;
    this.selectControl(index);
  },
  created() {
    this.controls = this.$children;
  },
};
</script>

<style lang="scss" scoped>
// $primary: #2b5d5b;
@import '@/scss/abstracts/_variables.scss';

.main {
  display: inherit;
}

.border-b {
  border-bottom: 0.5px solid #759b99;
}
.bg-tab-color {
  color: #515151;
}

.tabs-sec {
  // max-width: 1200px;
}

.tab-link.active {
  // border-bottom: 2.5px solid $primary;
  // border: 1px solid #2B5D5B;
  // background-color: #2B5D5B;
  border: 1px solid $primary;
  background-color: $primary;
  color: white !important;
  // padding: 20px;
}

.tab-link {
  // border-bottom: 2.5px solid $primary;
  // border: 1.0px solid #007d53;
  border: 1px solid $primary;
  background-color: white;
  color: black !important;
  padding: 1rem 2rem;
  height: 1rem;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  font-weight: 200;
  font-size: 1rem;
  &:first-child {
    margin-left: 0;
  }
}

.cursor-pointer {
  cursor: pointer;
}

.control-title {
  display: none;
}

@media (max-width: 876px) {
  .main {
    display: none;
  }

  .section-tab {
    display: none;
  }

  .control-title {
    display: inherit;
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 16px/19px
      var(--unnamed-font-family-work-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 16px/19px Work Sans;
    letter-spacing: 0px;
    // color: #2b5d5b;
    color: $primary;
    opacity: 1;
    text-decoration: underline;
    margin: 5px;
    padding: 5px;
  }
}
</style>
