<template>
  <div>
    <the-header ref="theHeader" />
    <main @click="$refs.theHeader.close()" class="text-center">

      <!-- navigation sections  -->

      <nav class="nav-links d-flex justify-content-center align-items-center shadow py-3">
        <router-link class="mx-3 nav-link-item" to="/about?#program-areas">Program Areas</router-link>
        <router-link class="mx-3 nav-link-item" to="/about?#logical-framework">Logical Framework</router-link>
        <router-link class="mx-3 nav-link-item" to="/about?#available-data">Available Data</router-link>
        <router-link class="mx-3 nav-link-item" to="/about?#data-sources">Data Sources</router-link>
      </nav>
      <section>
        <h2>What Our Users Say</h2>
        <span class="top-text mb-5">
            Discover what users are saying about MSDAT. Our testimonials showcase real <br>
            experiences and insights from professionals who use our platform daily.
        </span>
      </section>
      <section>
        <b-row class="p-5">
          <b-col xl="4" class="overflow-auto">
            <div style="min-width: 400px; padding: 0% 15%;" class="text-xl-left mb-5">
              <h2>{{ videoTestimonials[testimonialIndex].username }}</h2>
              <div class="my-4 pb-3">
                <ratings disabled :size="2" :value="videoTestimonials[testimonialIndex].rating" :spacing="4" />
              </div>
              <span class="top-text text-xl-left">{{ videoTestimonials[testimonialIndex].text }}” </span>
            </div>
          </b-col>
          <b-col xl="8">
            <div class="d-flex align-items-center">
              <button
                class="btn btn-outline-primary rounded-circle border-0 d-flex align-items-center justify-content-center mr-2"
                style="width: 64px; height: 64px;"
                @click="testimonialIndex -= 1"
                :disabled="testimonialIndex == 0"
              >
                <b-icon icon="chevron-left" font-scale="4"></b-icon>
              </button>
              <b-embed type="iframe" aspect="16by9"
                :src="videoTestimonials[testimonialIndex].videoUrl"
                allowfullscreen
              ></b-embed>
              <button
                class="btn btn-outline-primary rounded-circle border-0 d-flex align-items-center justify-content-center ml-2"
                style="width: 64px; height: 64px;"
                @click="testimonialIndex += 1"
                :disabled="testimonialIndex == videoTestimonials.length - 1"
              >
                <b-icon icon="chevron-right" font-scale="4"></b-icon>
              </button>
            </div>
            <!-- <iframe width="1280" height="644" src="https://www.youtube.com/embed/k75zoZ1SXgk" title="MSDAT features video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
            <div class="mt-4">
              <span>
                <em v-for="(_, n) in videoTestimonials" :key="n" class="mx-1" @click="testimonialIndex = n">
                  <b-icon v-if="n == testimonialIndex" icon="circle-fill" font-scale="0.7" style="cursor: pointer;"></b-icon>
                  <b-icon v-else icon="circle" font-scale="0.7" style="cursor: pointer;"></b-icon>
                </em>
              </span>
            </div>
          </b-col>
        </b-row>
      </section>
      <section class="p-5">
        <b-row>
          <b-col class="mb-5" md="6" xl="4"
              v-for="(testimonial, n) in cardTestimonials.slice(0, viewLength)"
              :key="n"
            >
            <testimonial-card :testimonial="testimonial" />
          </b-col>
        </b-row>
        <!-- <div class="text-center p-3">
          <button
            v-if="cardTestimonials.length > viewLength"
            style="font-size: large;
            padding: 10px 75px;"
            class="btn btn-lg btn-primary rounded-0"
            @click="viewLength = viewLength + 6"
          >
            View More
          </button>
        </div> -->
      </section>
      <section class="pb-5">
        <h2>Let Us Know What You Think</h2>
        <span class="d-block p-5">
          <ratings v-model="form.rating" :size="2.5" :spacing="20" />
        </span>
        <form @submit.prevent="onSubmit" class="row" style="padding: 0 20%;">
          <b-col md="6" class="mb-5">
            <b-form-input class="rounded-0" v-model="form.name" size="lg" placeholder="Full Name *"></b-form-input>
          </b-col>
          <b-col md="6" class="mb-5">
            <b-form-input class="rounded-0" type="email" v-model="form.email" size="lg" placeholder="Email Address *"></b-form-input>
          </b-col>
          <b-col cols="12" class="mb-5">
            <b-form-input class="rounded-0" v-model="form.organization" size="lg" placeholder="Organization *"></b-form-input>
          </b-col>
          <b-col cols="12" class="mb-5">
            <b-form-textarea class="rounded-0" v-model="form.review" placeholder="Review *" rows="4" size="lg"></b-form-textarea>
          </b-col>
          <b-col cols="10" xl="11" class="mb-3">
            <b-form-input class="rounded-0 bg-white" disabled size="lg" :value="form.video ? form.video.name : ''" placeholder="Upload Video (Optional)"></b-form-input>
          </b-col>
          <b-col cols="2" xl="1" class="p-0 mb-3">
            <label for="video" class="btn border bg-white text-muted" style="padding: 11px 18px"><b-icon icon="box-arrow-up"></b-icon></label>
          </b-col>
          <div class="text-center text-danger w-100" v-if="validationMsg">{{ validationMsg }}</div>
          <b-form-file
            v-model="form.video"
            :state="Boolean(form.video)"
            accept="video/*"
            class="invisible"
            id="video"
          ></b-form-file>
          <b-col cols="12" class="text-center">
            <button class="btn btn-lg btn-primary rounded-0 mb-5" style="padding: 10px 100px; font-size: large;">Submit</button>
          </b-col>
        </form>
      </section>
    </main>
    <footer class="footer">
      This dashboard is developed and managed by the Department of Health Planning Research and Statistics (DHPRS)
    </footer>
    <the-footer />
  </div>
</template>

<script>
import Ratings from '@/components/Ratings.vue';
import theHeader from './layout/theHeader.vue';
import theFooter from './layout/theFooter.vue';
import TestimonialCard from './components/TestimonialCard.vue';

export default {
  data() {
    return {
      videoTestimonials: [
        {
          username: 'Ogeh AjiriOghene',
          rating: 5,
          text: 'This tool will empower the Ministry and its partners to make faster, smarter decisions. It is a critical step in achieving Universal Health Coverage goals.',
          videoUrl: 'https://drive.google.com/file/d/10Ryaphn9ySxht_kECGzmChPkgZ-6kOGh/preview',
        },
        {
          username: 'Caleb Aromeh',
          rating: 5,
          text: 'I have been using the MSDAT for over 6 years. I discovered the platform at a partners meeting organized by FMoH sometime in 2018. The MSDAT platform has enabled me to visualize health data from multiple sources, including routine data, surveys, and global estimates providing a comprehensive view of health indicators.',
          videoUrl: 'https://drive.google.com/file/d/10Ryaphn9ySxht_kECGzmChPkgZ-6kOGh/preview',
        },
        {
          username: 'Mamman Jepther Lere',
          rating: 5,
          text: 'The dashboard is considered very useful for health professionals as it provides a unified platform for data. It helps align stakeholders around a single "source of truth," reducing data fragmentation and improving coordination in health planning and program implementation. This centralisation increases confidence in data-driven decision-making.',
          videoUrl: 'https://drive.google.com/file/d/10Ryaphn9ySxht_kECGzmChPkgZ-6kOGh/preview',
        },
      ],
      testimonialIndex: 1,
      cardTestimonials: [
        {
          username: 'Ogeh AjiriOghene',
          rating: 5,
          text: 'This tool will empower the Ministry and its partners to make faster, smarter decisions. It is a critical step in achieving Universal Health Coverage goals.',
        },
        {
          username: 'Caleb Aromeh',
          rating: 5,
          text: 'I have been using the MSDAT for over 6 years. I discovered the platform at a partners meeting organized by FMoH sometime in 2018. The MSDAT platform has enabled me to visualize health data from multiple sources, including routine data, surveys, and global estimates providing a comprehensive view of health indicators.',
        },
        {
          username: 'Mamman Jepther Lere',
          rating: 5,
          text: 'The dashboard is considered very useful for health professionals as it provides a unified platform for data. It helps align stakeholders around a single "source of truth," reducing data fragmentation and improving coordination in health planning and program implementation. This centralisation increases confidence in data-driven decision-making.',
        },
      ],
      viewLength: 9,
      form: {},
      validationMsg: '',
    };
  },
  components: {
    theHeader,
    theFooter,
    Ratings,
    TestimonialCard,
  },
  methods: {
    onSubmit() {
      if (!this.validateForm()) return;
      console.log(this.form);
    },
    validateForm() {
      this.validationMsg = '';
      // eslint-disable-next-line no-restricted-syntax
      for (const key of ['rating', 'name', 'email', 'organization', 'review']) {
        if (!this.form[key]) {
          this.validationMsg = `${this.cap(key)} is required!`;
          return false;
        }
      }
      return true;
    },
    cap(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
  },

};
</script>

<style scoped>
.nav-links {
  height: 50px;
}
.nav-link-item {
  cursor: pointer;
  font-weight: 500;
  color: black
}
.nav-link-item:hover {
  color: green;
  text-decoration: none;
}
section:nth-of-type(2n) {
  background: #DFF3F3;
}
h2 {
  font-weight: bold;
  padding-top: 5rem;
}
.top-text {
  font-size: 1.4rem;
  font-weight: 400;
  margin-top: 2rem;
  line-height: 1.8;
  display: block;
}
.footer {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
