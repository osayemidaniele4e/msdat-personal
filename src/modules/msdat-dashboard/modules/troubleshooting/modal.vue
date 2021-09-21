<template>
  <div>
    <b-button v-b-modal.modal-center>Launch centered modal</b-button>

    <b-modal id="modal-center" centered title="MSDAT Dashboard not Loading?">
      <p>
        This is quite unusual, but for some reason the MSDAT Dashboard is not loading. We are really
        sorry about this.
      </p>
      <strong>We think clearing MSDAT cache from your browser might fix the problem:</strong>
      <p>Click on the button below to clear dashboard cache</p>
      <button class="btn btn-success">CLEAR DASHBOARD CACHE</button>
      <div class="mt-3">
        <strong>Here are other things you could try:</strong>
        <ul>
          <li>Force a refresh by pressing Shift+F5.</li>
          <li>
            Open the dashboard in a new tab by <span class="text-primary"> clicking here.</span>
          </li>
          <li>Open the dashboard in Incognito mode.</li>
          <li>If you get this frequently, please<img :src="icon2" alt="link_icon" /></li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import icon1 from '../../../../assets/danger-sign.svg';
import icon2 from '../../../../assets/external-link-symbol.svg';

export default {
  name: 'Modal',
  components: {},
  data() {
    return {
      icon1,
      icon2,
    };
  },
};
</script>

<style lang="scss" scoped></style>
