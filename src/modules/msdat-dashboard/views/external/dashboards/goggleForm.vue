<template>
  <div>
    <the-header ref="theHeader" />
    <div class="d-flex justify-content-center">
      <iframe
        width="80%"
        height="850vh"
        src="https://forms.office.com/r/P8wapxFcGN?embed=true"
        frameborder="0"
        marginwidth="0"
        marginheight="0"
        style="border: none; max-width: 100%; max-height: 100vh"
        allowfullscreen
        webkitallowfullscreen
        mozallowfullscreen
        msallowfullscreen
      >
      </iframe>
    </div>
    <the-footer />
  </div>
</template>

<script>
import theHeader from '../../about/layout/theHeader.vue';
import theFooter from '../../about/layout/theFooter.vue';

export default {
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {
      title: '',
      configObject: {}, // This should be an Object initially
      url: 'https://forms.office.com/r/P8wapxFcGN?embed=true',
      width: '80%',
      height: '800',
      showComing: true,
    };
  },
};
</script>

<style lang="scss" scoped></style>
