<!-- Auther: Ghufran Ahmed  -->
<template>
  <div>
    <b class="selection-header" style="font-size: 13px; font-family: Work Sans;">NOTES</b><br />
    <!-- <tempelate v-if="note.selected"> -->
    <div class="scroll" style="border: 0.5px solid #e3e3e3;">
      <div
        v-for="(note,idx) in notes"
        :key="idx"
        style="
          display: inline-block;
          justify-content: space-around;
          font-size: 13px;
          font-family: Work Sans;
        "
      >
        -  {{ note }}
      </div>
    </div>
    <!-- </tempelate> -->
  </div>
</template>

<script>

export default {
  computed: {
    notes() {
      return this.$store.getters.notesArea;
    },
  },
};
</script>
