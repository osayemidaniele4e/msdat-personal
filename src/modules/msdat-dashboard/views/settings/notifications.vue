<template>
  <Layout :index="2">
    <div class="p-2 mb-5">
      <section class="d-flex align-items-center justify-content-center justify-content-sm-start">
        <b-icon icon="bell-fill"></b-icon>
        <h4 style="font-size: 15px;" class="pl-2 m-0">Notifications</h4>
      </section>
      <section>
        <h5 v-if="newNot.length" style="font-size: 13px; margin-top: 30px;">New Notifications</h5>
        <article v-for="(not, index) in newNot" :key="index" class="mt-3 p-2 border rounded d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div class="px-4 d-none d-md-block">
            <b-icon icon="bell-fill"></b-icon>
          </div>
          <div class="h-full mr-auto pl-2">
            <span class="d-block text-center text-md-left">{{ not.title }}</span>
            <small class="d-block not-text">{{ not.text }}</small>
          </div>
          <div class="flex-shrink-0 px-2 pr-md-4 py-2 text-center text-md-right">
            <p class="mb-1">{{ moment(not.datetime).format('MMMM D, yyyy [at] h:mma') }}</p>
            <b-button variant="primary">VIEW MORE</b-button>
          </div>
        </article>
        <h5 v-if="oldNot.length" style="font-size: 13px; margin-top: 30px;">Older Notifications</h5>
        <article v-for="(not, index) in oldNot" :key="index" class="mt-3 p-2 border rounded d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div class="px-4 d-none d-md-block">
            <b-icon icon="bell-fill"></b-icon>
          </div>
          <div class="h-full mr-auto pl-2">
            <span class="d-block text-center text-md-left">{{ not.title }}</span>
            <small class="d-block not-text">{{ not.text }}</small>
          </div>
          <div class="flex-shrink-0 px-2 pr-md-4 py-2 text-center text-md-right">
            <p class="mb-1">{{ moment(not.datetime).format('MMMM D, yyyy [at] h:mma') }}</p>
            <b-button variant="primary">VIEW MORE</b-button>
          </div>
        </article>
      </section>
    </div>
  </Layout>
</template>

<script>
import moment from 'moment';
import Layout from './layout.vue';

export default {
  name: 'Notifications',
  components: {
    Layout,
  },
  data() {
    return {
      notifications: [
        {
          title: 'Notification Title',
          datetime: new Date('2022-08-13T02:34').getTime(),
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum labore nulla eaque. Iste corrupti nisi quas?',
          seen: false,
        },
        {
          title: 'Notification Title',
          datetime: new Date('2022-08-13T02:34').getTime(),
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum labore nulla eaque. Iste corrupti nisi quas?',
          seen: false,
        },
        {
          title: 'Notification Title',
          datetime: new Date('2022-08-13T02:34').getTime(),
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum labore nulla eaque. Iste corrupti nisi quas?',
          seen: true,
        },
        {
          title: 'Notification Title',
          datetime: new Date('2022-08-13T02:34').getTime(),
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum labore nulla eaque. Iste corrupti nisi quas?',
          seen: true,
        },
        {
          title: 'Notification Title',
          datetime: new Date('2022-08-13T02:34').getTime(),
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum labore nulla eaque. Iste corrupti nisi quas?',
          seen: true,
        },
      ],
    };
  },
  methods: {
    moment,
  },
  computed: {
    oldNot() {
      return this.notifications.filter((not) => not.seen);
    },
    newNot() {
      return this.notifications.filter((not) => !not.seen);
    },
  },
  mounted() {

  },
};
</script>

<style scoped>
.not-text {
  max-lines: 2;
  overflow: ellipsis;
}
@media (min-width: 992px) {
  article {
    width: 75%;
  }
 }
</style>
