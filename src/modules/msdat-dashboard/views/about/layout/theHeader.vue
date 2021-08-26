<template>
  <header id="the-header" class="border ">
    <b-container fluid>
      <b-row class="d-flex justify-content-between align-items-center">
        <b-col cols md="2" lg="2">
          <img
            src="@/assets/img/Logo.svg"
            alt="FMOH Logo"
            class="img-fluid"
          >
        </b-col>
        <b-col cols md="10" lg="10" class="d-flex justify-content-between align-items-center">
          <h2>Analysis of key Health Indicators</h2>
          <div>
            <b-icon
              @click="toggleOption=!toggleOption"
              icon="three-dots-vertical"
              font-scale="1.5"
            />
            <header-option
             v-if="toggleOption"
             v-on:showContact=" contactbtn = true"
             v-on:tour="runIntro"/>
          </div>

        </b-col>
      </b-row>
      <b-row  v-show="aboutPage">
        <b-col cols="1">
          <a href="">
            <b-icon
              class="back-icn"
              icon="chevron-left"
            />
          </a>
        </b-col>
        <b-col class="">
          <h4>About the MSDAT Dashboard</h4>
          <p>This dashboard is developed and managed by the Department of Health Planning
            Research and Statistics (DHPRS)</p>
        </b-col>
      </b-row>
    </b-container>
  </header>
</template>

<script>
import HeaderOption from '../components/HeaderOption.vue';

export default {
  components: {
    HeaderOption,
  },
  data() {
    return {
      toggleOption: false,
      contactbtn: false,
      aboutPage: false,
    };
  },
  methods: {
    runIntro() {
      this.toggleOption = !this.toggleOption;
      this.$emit('tour');
    },
  },
  watch: {
    $route: {
      // eslint-disable-next-line object-shorthand
      handler(e) {
        if (e.name === 'About') {
          this.aboutPage = true;
        } else {
          this.aboutPage = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$msdat-green:  #007D53;
.sticky-top{
  z-index: 998;
}
header#the-header {
  &>.container-fluid {
    &>.row {
      height: 65px;
      padding: 0 10px;

      // first row
      &:first-child {
        background-color: $msdat-green;

        &>div {
          &:first-child {
            img {
              width: auto;
              height: 50px;
              float: left;
            }
          }

          &:last-child {
            padding: 0 10px 0 30px;
            color: #FBFBFB;

            h2 {
              font: normal normal 600 18px/20px Work Sans;
              text-transform: uppercase;

              // 3-dots icon
              &~div {
                font-size: 15px;

                svg {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      // second row
      &:last-child {
        background-color: #ffffff;
        box-shadow: 0px 3px 4px #00000029;

        &>:first-child {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          text-align: end;

          // back icon
          .back-icn {
            padding: 8px;
            background-color: #007D537F;
            border-radius: 100%;
            font-size: 40px;
            color: #ffffff;
            transition: all 0.4s;

            &:hover {
            background-color: $msdat-green;
            }
          }
        }

        &>:last-child {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          letter-spacing: 0px;

          h4 {
            // padding-bottom: 5px;
            font-family: 'Source Sans Pro';
            font-size: 18px !important;
            font-weight: bolder;
            color: #232323;

            &~p {
              color: #232323;
              font-size: 12px;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}

// MEDIA QUERY

/* EXTRA EXTRA SMALL */
@media (max-width: 576px) {
  #about-wrap {
    header#the-header {
      &>.container-fluid {
        &>.row {
          height: 80px;
          // padding: 10px 0;

          // first row
          &:first-child {
            &>div {
              &:first-child {
                padding-left: 0;
                img {
                  float: left;
                  height: 37px !important;
                }
              }

              &:last-child {
                padding: 0 5px;

                h2 {
                  font: normal normal 600 14px/20px Work Sans;

                  // 3-dots icon
                  &~div {
                    font-size: 13px;
                  }
                }
              }
            }
          }

          // second row
          &:last-child {
            height: 70px;
            padding: 0 10px;
            &>:first-child {
              justify-content: center;

              .back-icn {
                padding: 8px;
                font-size: 35px;
              }
            }

            &>:last-child {
              line-height: 14.5px;

              h4 {
                padding-bottom: 2px;
                font-size: 15px !important;
              }
            }
          }
        }
      }
    }
  }
}

/* SMALL */
@media (min-width: 576px) and (max-width: 768px) {
  #about-wrap {
    header#the-header {
      &>.container-fluid {
        &>.row {
          height: 80px;
          padding: 10px 0;

          // first row
          &:first-child {
            &>div {
              &:first-child {
                padding-left: 1%;
                img {
                  float: left;
                  height: 40px !important;
                  margin-bottom: 0;
                }
              }

              &:last-child {
                padding: 0 10px;

                h2 {
                  font: normal normal 600 16px/20px Work Sans;

                  // 3-dots icon
                  &~div {
                    font-size: 13px;
                  }
                }
              }
            }
          }

          // second row
          &:last-child {
            height: 70px;
            padding: 0 10px;

            &>:first-child {
              justify-content: center;
              .back-icn {
                padding: 8px;
                font-size: 37px;
              }
            }

            &>:last-child {
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
  }
}

/* MEDIUM */
@media (min-width: 768px) and (max-width: 992px) {
  #about-wrap {
    header#the-header {
      &>.container-fluid {
        &>.row {
          height: 65px;
          padding: 10px;

          // first row
          &:first-child {
            &>div {
              &:first-child {
                padding-left: 0.5%;
                img {
                  float: left;
                  height: 40px !important;
                }
              }

              &:last-child {
                padding: 0 10px;

                h2 {
                  font: normal normal 600 17px/20px Work Sans;

                  // 3-dots icon
                  &~div {
                    font-size: 13px;
                  }
                }
              }
            }
          }

          // second row
          &:last-child {
            padding: 0 10px;

            &>:first-child {
              justify-content: center;
              padding: 8px;
              font-size: 38px;
            }

            &>:last-child {
              // padding: 0 5% !important;
              line-height: 16px;

              h4 {
                margin-bottom: 4px;
                padding-bottom: 2px;
                font-size: 17px !important;
              }
            }
          }
        }
      }
    }
  }
}

/* LARGE */
@media (min-width: 992px) and (max-width: 1200px) {
  #about-wrap {
    header#the-header {
      &>.container-fluid {
        &>.row {
          // first row
          &:first-child {
            &>div {
              &:first-child {
                padding-left: 0.5%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
