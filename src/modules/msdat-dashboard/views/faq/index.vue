<template>
  <div>
    <the-header />
    <main class="container py-5 mb-5">
      <div class="faq_img_container">
        <img src="" alt="frequently_asked_question" class="img-fluid" />
        <div class="content container">
          <h2 class="mb-1">How to use the dashboard</h2>
          <small>Multi-Source Data Analytics & Triangulation Dashboard</small>
          <div class="input-group w-50 my-3 mx-auto mb-3 mt-5 shadow-sm">
            <div class="input-group-prepend">
              <span class="input-group-text bg-transparent" id="basic-addon1"
                ><img :src="searchIcon" alt="" width="19px"
              /></span>
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </div>
      <Accordion />
      <Modal />
    </main>
    <the-footer class="footer" />
  </div>
</template>

<script>
import searchIcon from '@/assets/searchIcon.svg';
import Accordion from './components/accordion.vue';
import theHeader from '../about/layout/theHeader.vue';
import theFooter from './components/theFooter.vue';

import Modal from '../../modules/troubleshooting/modal.vue';

export default {
  name: 'Faq',
  components: {
    theHeader,
    theFooter,
    Accordion,
    Modal,
  },
  data() {
    return {
      searchIcon,
    };
  },
};
</script>
<style lang="scss" scoped>
div.faq_img_container {
  min-height: 35vh;
  div.content {
    text-align: center;
  }
  div.input-group {
    border-radius: 0;
    border: 0;
    padding: 0.35rem;
  }
  input.form-control {
    border-radius: 0;
    box-shadow: none;
    border: 0;
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
</style>
