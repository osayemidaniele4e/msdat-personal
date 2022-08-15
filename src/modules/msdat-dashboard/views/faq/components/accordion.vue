<template>
  <section class="card-body faq-card" id="faq_accordion" v-if="datas">
    <div class="accordion" role="tablist">
      <b-card no-body class="border-0" v-for="(data, index) in datas" :key="index">
        <b-card-header header-tag="header" class="pb-0 px-0 bg-transparent border-0" role="tab">
          <b-button
            @click="data.show = !data.show"
            block
            v-b-toggle="`accordion-${index}`"
            class="bg-header py-2 pb-3 rounded-0 text-left"
            >{{ data.title }}
            <img
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
              <li v-for="(item, index) in data.steps.First_Method" :key="index">{{ item }}</li>
            </ul>
            <ul v-if="data.steps.Second_Method" class="mt-2 border-top">
              <li v-for="(item, index) in data.steps.Second_Method" :key="index">{{ item }}</li>
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
  <section v-else-if="!datas">
    <div class="text-center mt-5"><h4>Nothing here!</h4> <p>please check back!</p>
    </div>
  </section>
</template>

<script>
import caretUp from '@/assets/caretUp.svg';
import caretDown from '@/assets/caretDown.svg';

export default {
  name: 'Accordion',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      caretUp,
      caretDown,
      datas: this.data,
    };
  },
};
</script>
<style lang="scss" scoped>
section#faq_accordion {
  font-family: 'Work Sans';
  font-size: 15px;
  button.btn.bg-header {
    background-color: #ffffff;
    color: #000000b2;
    font-weight: 500;
    border-color: #ececec;
    box-shadow: none;
    font-size: 1rem !important;
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
</style>
