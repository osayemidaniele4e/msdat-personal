<template>
  <Card>
    <b class="selection-header">Notes</b><br />
    <div class="scroll" style="margin-left: 5px; border: 1px solid gray">
      <div
        style="
          display: inline-block;
          justify-content: space-around;
          font-size: 13px;
        "
        v-for="note in notes" :key="note"
      >
        -{{note.fieldName}} has no {{note.year}}
      </div>
    </div>
  </Card>
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
