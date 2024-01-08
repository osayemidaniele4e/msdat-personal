<template>
  <div>
    <the-header ref="theHeader"/>
    <main class="container pb-5 mb-5" @click="$refs.theHeader.close()">
      <div class="">
        <div
          v-b-tooltip.hover.right.v-info="'Back to platform'"
          class="back"
          @click="navigateToCentralAnalytics"
        >
          <b-icon-arrow-left-circle-fill></b-icon-arrow-left-circle-fill>
        </div>
      </div>

      <div class="faq_img_container">
        <img :src="headerImg" alt="frequently_asked_question" class="img-fluid" />
        <div class="content container">
          <h3 class="font-weight-bold mb-0">How to use the dashboard</h3>
          <small>Multi-Source Data Analytics & Triangulation Dashboard</small>
          <div class="input-group w-50 mx-auto mt-3">
            <div class="input-group-prepend">
              <span class="input-group-text bg-white" id="basic-addon1"
                ><img :src="searchIcon" alt="" width="19px"
              /></span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Search"
              aria-describedby="basic-addon1"
              v-model="searchKey"
              placeholder="Search Help by typing a keyword..."
            />
          </div>
        </div>
      </div>

      <section
        class="card-body faq-card"
        id="faq_accordion"
        v-if="filterText.length !== 0 && searchKey !== ''"
      >
        <div class="accordion" role="tablist">
          <b-card no-body class="border-0" v-for="(data, index) in filterText" :key="index">
            <b-card-header header-tag="header" class="pb-0 px-0 bg-transparent border-0" role="tab">
              <b-button
                @click="data.show = !data.show"
                block
                v-b-toggle="`accordion-${index}`"
                class="bg-header py-2 pb-3 rounded-0 text-left"
                >{{ data.title
                }}<img
                  :src="data.show ? caretUp : caretDown"
                  alt="caret"
                  medium
                  style="float:right;color:white;cursor:pointer;"
              /></b-button>
            </b-card-header>
            <b-collapse :id="`accordion-${index}`" accordion="my-accordion" role="tabpanel">
              <b-card-body
                v-if="data.steps.First_Method || data.steps.Second_Method"
                class="border-1 mb-1 shadow-sm"
              >
                <ul v-if="data.steps.First_Method">
                  <li v-for="(item, index) in data.steps.First_Method" :key="index">
                    {{ item }}
                  </li>
                </ul>
                <ul v-if="data.steps.Second_Method" class="mt-2 border-top">
                  <li v-for="(item, index) in data.steps.Second_Method" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </b-card-body>
              <b-card-body v-else class="border-1 mb-1 shadow-sm">
                <ul>
                  <li v-for="(item, index) in data.steps" :key="index">{{ item }}</li>
                </ul>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </section>

      <Accordion :data="Faq" v-if="searchKey === ''" />
    </main>
    <the-footer class="footer" />
  </div>
</template>

<script>
import searchIcon from '@/assets/searchIcon.svg';
import caretUp from '@/assets/caretUp.svg';
import caretDown from '@/assets/caretDown.svg';
import caretLeft from '@/assets/caretLeft.svg';
import headerImg from '@/assets/img/Assets/FAQ_Asset.svg';
import Accordion from './components/accordion.vue';
import theHeader from '../about/layout/theHeader.vue';
import theFooter from '../about/layout/theFooter.vue';
// Faq data
import Faq from './components/Faq';

export default {
  name: 'Faq',
  components: {
    theHeader,
    theFooter,
    Accordion,
  },
  data() {
    return {
      searchIcon,
      caretUp,
      caretDown,
      caretLeft,
      headerImg,
      Faq,
      searchKey: '',
    };
  },
  methods: {
    navigateToCentralAnalytics() {
      this.isLoading = true;
      setTimeout(() => {
        this.$router.push('dashboard/Health_Outcomes_and_Service_Coverage');
      }, 500);
    },
  },
  computed: {
    filterText() {
      return this.Faq.filter((item) => item.title.toLowerCase()
        .includes(this.searchKey.toLowerCase()));
    },
  },
};
</script>
<style lang="scss" scoped>
div.faq_img_container {
  min-height: 35vh;
  position: relative;
  div.content {
    text-align: center;
    position: absolute;
    top: 17vh;
  }
  div.input-group {
    border-radius: 0;
    border: 0;
    box-shadow: 0px 5px 10px #87aeae7a;
  }
  input.form-control {
    border-radius: 0;
    box-shadow: none;
    border: 0;
    padding: 1.5rem 0.35rem;
    &:active,
    &:focus {
      box-shadow: none;
      border: 0;
    }
  }

  span.input-group-text {
    background-color: #ffffff;
    // border: 0.5px solid #2657854b;
    border: 0;
    border-right: 0;
    border-radius: 0;
  }
}
// ===============================
section#faq_accordion {
  font-family: 'Work Sans';
  font-size: 15px;
  button.btn.bg-header {
    background-color: #ffffff;
    color: #000000b2;
    font-weight: 500;
    border-color: #ececec;
    box-shadow: none;
    font-size: 18px;
    border: 0;
    border-bottom: 1.5px solid #00000015;
    text-transform: capitalize;
  }
}
.faq-card {
  border: 1px solid #7070706b;
  border-radius: 5px;
  padding: 0;
  border-radius: 0.3rem;
  ul {
    margin-bottom: 1rem;
    padding-top: 1rem;
    li {
      margin-bottom: 0.8rem;
      font-size: 1rem;
    }
  }
}
div.back {
  color: #007d537f;
  font-size: 2rem;
  padding: 0.3rem;
  border-radius: 50%;
  cursor: pointer;
  max-width: fit-content;
}
</style>
