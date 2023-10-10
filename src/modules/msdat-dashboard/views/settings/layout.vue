<template>
  <section>
    <Header v-on:tour="runIntro"></Header>
    <h1 class="text-center p-3 shadow-sm">Account Settings</h1>
    <b-row>
      <b-col sm="4" md="3" lg="2" class="sidebar">
        <div @click="$router.push('profile')" :class="`tab ${index == 1 ? 'active':''}`">
          <b-icon style="color: #DFF3F3; background: #232323;" class="icon" icon="person-fill"></b-icon>
          <small>Profile</small>
          <span style="transform:rotateY(50deg)">&gt;</span>
        </div>
        <div @click="$router.push('notifications')" :class="`tab ${index == 2 ? 'active':''}`">
          <b-icon class="icon" icon="bell-fill"></b-icon>
          <small>Notifications</small>
        </div>
        <div @click="$router.push('activity-history')"  :class="`tab ${index == 3 ? 'active':''}`">
          <b-icon class="icon" icon="clock-history"></b-icon>
          <small>Activity History</small>
        </div>
      </b-col>
      <b-col>
        <slot></slot>
      </b-col>
    </b-row>
    <Footer style="z-index: 10;"> </Footer>
  </section>
</template>

<script>
import Header from '../about/layout/theHeader.vue';
import Footer from '../about/layout/theFooter.vue';
import tour from '../onboarding/tour';

export default {
  name: 'Layout',
  mixins: [tour],
  components: {
    Header, Footer,
  },
  props: {
    index: Number,
  },
};
</script>

<style scoped>
section {
  color: #232323;
}
h1 {
  font-size: 1.5rem;
}
.sidebar {
  border-right: 2px solid #eee;
  position: sticky;
  position: -webkit-sticky;
  padding-bottom: 1rem;
  top: 0;
  background: white;
}
.tab {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0 0.5rem 4vw;
  cursor: pointer;
  background: #FCFCFC;
  border: 1px solid #F5F5F5;
}
.tab.active {
  background: #DFF3F3;
}
.tab .icon {
  border-radius: 50%;
  padding: 2px;
}
.tab :is(span, small) {
  font-weight: 500;
}

@media (min-width: 575.98px) {
  .sidebar {
    height: 70vh;
    padding: 1rem 0;
  }
}
</style>
