<template>
  <div>
    <b class="selection-header">Notes</b><br />
    <!-- <tempelate v-if="note.selected"> -->
    <div class="scroll" style="margin-left: 5px; border: 1px solid gray">
      <div
        v-for="(note,idx) in notes"
        :key="idx"
        style="
          display: inline-block;
          justify-content: space-around;
          font-size: 13px;
        "
      >
        -{{ note }}
      </div>
    </div>
    <!-- </tempelate> -->
  </div>
</template>

<script>
import Card from '../../Card.vue';

export default {
  components: {
    Card,
  },
  computed: {
    notes() {
      return this.$store.getters.notesArea;
    },
  },
};
</script>
