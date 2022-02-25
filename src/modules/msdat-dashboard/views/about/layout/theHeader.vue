<template>
  <header id="the-header" class="sticky">
     <!-- <header id="the-header" class="position-relative"> Moses changed from this-->

    <b-container fluid>

      <b-row class="d-flex justify-content-between align-items-center">

                  <!-- testing for mobile -->
        <div class="mobile-flex">
          <!-- <div ><img src="@/assets/img/Logo.svg" alt="FMOH Logo" class="mob-img" /></div> -->
          <img src="@/assets/img/Logo-mob.svg" alt="FMOH Logo" class="mob-img"  variant="primary"/>
          <div class="mobile-flex-col">
            <small class="mobile-flex-col-text1">MSDAT PLATFORM</small>
          <div class="mobile-flex-col-text2">Health Outcomes and Service Coverage</div>
          </div>
               <!-- <b-dropdown text="Split Dropdown" class="m-2">
                <b-dropdown-item href="#"
                id="dropdownMenuButton"
                  v-for="(control, index) in $store.state.MSDAT_STORE
                  .controlConfig"
                  :key="index"
                  @click="emitIndex(index)"
                >{{control.label}}
                </b-dropdown-item>
              </b-dropdown> -->

              <div class="select-dropdown">
                  <b-dropdown text="Select" toggle-class='select-dropdown'
                  variant='none'
                   text-variant='none'>

                <b-dropdown-item href="#"
                id="dropdownMenuButton"
                  v-for="(control, index) in $store.state.MSDAT_STORE
                  .controlConfig"
                  :key="index"
                  @click="emitIndex(index)"
                >{{control.label}}
                </b-dropdown-item>
              </b-dropdown>
              </div>

              <!-- <select class="mob-select1">
              <option
               v-for="(control, index) in $store.state.MSDAT_STORE
                  .controlConfig"
                  :key="index"
                  @click="emitIndex(index)"
              >{{control.label}}</option>
            </select> -->
            <b-icon icon="grid3x3-gap-fill" class="mob-grid-icon"
             v-b-toggle.sidebar-1
            ></b-icon>

               <b-sidebar id="sidebar-1" title="" right shadow>
                     <Sidebar
                />
    </b-sidebar>
        </div>

        <b-col cols md="1" lg="1" class="main">
          <img src="@/assets/img/Logo.svg" alt="FMOH Logo" class="img-fluid" />
        </b-col>
        <b-col
          cols
          md="11"
          lg="11"
          class="d-flex justify-content-between align-items-center border-left main"
        >
          <h2>

            <small class="main">MSDAT PLATFORM</small>
            <br />
            {{ $route.meta.title }}
          </h2>

          <!-- <b-col cols md="6" lg="6"> -->
          <div
            class="
              d-flex
              justify-content-end
              h-100
              align-items-center
              header-navs
              main
            "
          >
            <b-nav class="h-100 align-items-center main">
              <!-- @click="showExpandedDropdown = !showExpandedDropdown" -->
              <router-link to="/about" class="nav-link">About</router-link>
              <router-link to="/faq" class="nav-link">Help & FAQ</router-link>
              <router-link to="/coming-soon/custom_dashboard" class="nav-link"
                >Create New Dashboard</router-link
              >
              <div
                @mouseover="showExpandedDropdown = true"
                @mouseleave="showExpandedDropdown = false"
              >
                <button class="btn btn-outline-light rounded-0">
                  Select&nbsp;Dashboard&nbsp;<b-icon
                    icon="triangle-fill"
                    font-scale="0.5"
                    class="btn-icon"
                    :class="[showExpandedDropdown ? 'down' : 'up']"
                  ></b-icon>
                </button>
                <DropCard
                  v-show="showExpandedDropdown"
                  @click="showExpandedDropdown = false"
                  :class="{ dropcard: showExpandedDropdown }"
                />
              </div>
              <!-- <b-nav-item>
                <b-dropdown text="Other Dashboards" class="border-0">
                  <div class="drop-container" v-for="(item, index) in headerDropdown" :key="index">
                    <router-link class="links" :to="item.link">{{ item.title }}</router-link>
                  </div>
                </b-dropdown>
              </b-nav-item> -->
              <router-link to="#" class="nav-link"
                ><b-icon-person-fill></b-icon-person-fill
                >&nbsp;Login/Register</router-link
              >
            </b-nav>
            <b-icon
              @click="toggleOption = !toggleOption"
              icon="three-dots-vertical"
              font-scale="1.5"
            />
            <header-option
              v-if="toggleOption"
              v-on:showContact="contactbtn = true"
              v-on:tour="runIntro"
            />
          </div>
        </b-col>
      </b-row>
      <!--  please someone show separate the
      header for the about page from this it going to cause issues  -->
      <b-row v-show="aboutPage" class="main">
        <b-col cols="1">
          <!-- <a href=""> -->
          <b-icon
            @click="$router.go(-1)"
            class="back-icn main"
            icon="chevron-left"
          />
          <!-- </a> -->
        </b-col>
        <b-col class="main">
          <h4>About the MSDAT Dashboard</h4>
          <p>
            This dashboard is developed and managed by the Department of Health
            Planning Research and Statistics (DHPRS)
          </p>
        </b-col>
      </b-row>
    </b-container>
    <!-- <DropCard v-show="showExpandedDropdown" /> -->
  </header>
<!--
  to deltete
       // using provide inject and watcher to work on this feature.
        // inject into base panel to affect the entire dashboard
        // controls if from the global storage
        // this.controls = this.$children;
      >
      // or much better, emiting the value to parent component to then inject in the child component
      // the parent component is the base dashboard
      // from there, you will inject into other components
      // use a different source from $children
      // or rather take the index to the component -->

</template>

<script>
import HeaderOption from '../components/HeaderOption.vue';
import DropCard from '../components/DropCard.vue';
import Sidebar from '../components/Sidebar.vue';

export default {
  name: 'theHeader',
  components: {
    HeaderOption,
    DropCard,
    Sidebar,
  },
  data() {
    return {
      showExpandedDropdown: false,
      toggleOption: false,
      contactbtn: false,
      aboutPage: false,
      headerDropdown: [
        { title: 'Health Outcomes', link: '/dashboard/Health_Outcomes' },
        {
          title: 'Health Facility Surveys',
          link: '/dashboard/Health_Facility',
        },
        { title: 'NHMIS Analysis', link: '/' },

        { title: 'Health Financing', link: '/' },
        { title: 'State Profiles', link: '/' },
        { title: 'Demographics', link: '/' },
        { title: 'Create Dashboard +', link: '/' },
      ],
      controls: [],
    };
  },

  created() {
    this.controls = this.$children;
  },

  methods: {
    runIntro() {
      this.toggleOption = !this.toggleOption;
      this.$emit('tour');
    },
    close() {
      this.toggleOption = false;
    },
    emitIndex(index) {
      this.$emit('index', index);
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
$msdat-green: #007d53;

header#the-header {
  .btn-icon {
    margin-bottom: 0.35rem;
    margin-left: 0.5rem;
  }
  .up {
    transition: all 0.5s ease-in-out;
    transform: rotate(0deg);
  }
  .down {
    transform: rotate(180deg);
    transition: all 0.5s ease-in-out;
  }
  .drop-card {
    transition: all 1s ease-in-out;
  }
  div.header-navs {
    a.nav-link {
      text-decoration: none;
      color: white;
      font: normal normal 600 14px/20px Muli;
      &.active {
        background: #154736;
        border-radius: 5px;
      }
    }
    a.links {
      text-decoration: none;
      font: normal normal normal 14px/16px Work Sans;
      letter-spacing: 0px;
      color: #494949;
      text-transform: uppercase;
      margin-bottom: 0.4rem;
    }
    div.drop-container {
      padding: 0.75rem;
      width: 14rem;
    }
  }
  & > .container-fluid {
    & > .row {
      height: 65px;
      padding: 0 10px;

      // first row
      &:first-child {
        background-color: $msdat-green;

        & > div {
          &:first-child {
            img {
              width: auto;
              height: 50px;
              float: left;
            }
          }

          &:last-child {
            padding: 0 10px 0 30px;
            color: #fbfbfb;

            h2 {
              font: normal normal 600 18px/20px Work Sans;
              // text-transform: uppercase;

              // 3-dots icon
              & ~ div {
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

        & > :first-child {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          text-align: end;

          // back icon
          .back-icn {
            padding: 8px;
            background-color: #007d537f;
            border-radius: 100%;
            font-size: 40px;
            color: #ffffff;
            transition: all 0.4s;

            &:hover {
              background-color: $msdat-green;
            }
          }
        }

        & > :last-child {
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

            & ~ p {
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
  .main{
    display: none;
  }

  #about-wrap {
    header#the-header {
      & > .container-fluid {
        & > .row {
          height: 80px;
          // padding: 10px 0;

          // first row
          &:first-child {
            & > div {
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
            padding: 0 10px;
            & > :first-child {
              justify-content: center;

              .back-icn {
                padding: 8px;
                font-size: 35px;
              }
            }

            & > :last-child {
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
      & > .container-fluid {
        & > .row {
          height: 80px;
          padding: 10px 0;

          // first row
          &:first-child {
            & > div {
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
            padding: 0 10px;

            & > :first-child {
              justify-content: center;
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
  }
}

/* MEDIUM */
@media (min-width: 768px) and (max-width: 992px) {
  #about-wrap {
    header#the-header {
      & > .container-fluid {
        & > .row {
          height: 65px;
          padding: 10px;

          // first row
          &:first-child {
            & > div {
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
                  & ~ div {
                    font-size: 13px;
                  }
                }
              }
            }
          }

          // second row
          &:last-child {
            padding: 0 10px;

            & > :first-child {
              justify-content: center;
              padding: 8px;
              font-size: 38px;
            }

            & > :last-child {
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
      & > .container-fluid {
        & > .row {
          // first row
          &:first-child {
            & > div {
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
<style lang="scss">
header#the-header {
  div.header-navs {
    button.btn-secondary {
      background-color: transparent;
      color: white;
      border: 0;
      box-shadow: none;
      &:focus,
      &:active,
      &:hover {
        color: white;
        border: 0;
        background-color: transparent;
      }
    }
  }
}
</style>

test styling for mobile responsiveness

<style scoped>

.main{
  display: none;
}

.select-indicator-mob{
  border: 1px solid white;
  background-color: none;
  color: white;
  font-size: 13px;
  padding: 10px;
}

.mobile-flex{
 display: grid;
 grid-template-columns: 20% 50% 20% 10%;
}

.mobile-flex-col{
  display: flex;
  flex-direction: column;
    margin: 5px;
      justify-content: center;

}

.mobile-flex-col-text1{
  color: white;
  font-weight: 200;
  font-size: 8px;
}

.mobile-flex-col-text2{
  color: white;
  font-weight: 500;
  font-size: 10px;
}

.mob-img{
  width: 7px;
  height: 7px;
  margin: 10px;
}

.mob-select1{
  height: 40px;
  width: 100px;
  font-size: 13px;
  padding: 5px;
  margin: 10px;
  background-color: #007d537f;
  border: 1px solid white;
  color: white;
}

.mob-grid-icon{
  color: white;
  margin: 20px;
  cursor: pointer;
  outline: none;
}

.select-dropdown{
  background-color: none;
  height: 30px;
  outline: none;
  border: 1px solid white;
  color: white !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 2px;

}

.dropdownMenuButton{
  background-color: none;
  border: 1px solid green;
}

</style>

<style>
    #dropdownMenuButton > button {
    width: 100%;
    background-color: none;
    height: 50px;
  }
</style>
