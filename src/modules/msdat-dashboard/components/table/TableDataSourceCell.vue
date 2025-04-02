<template>
  <th
    class="text-center align-middle"
    scope="col"
    :class="[selectedSource.id === source.id ? 'table-active text-white' : '']"
    @click="emitValue(source)"
  >
    <!-- {{selectedSource.id}}
  {{source.id}} -->
    <div class="icon d-flex align-items-center justify-content-center">
      <span
        v-tooltip="source.full_name"
        class="data-source h6 mr-2 mb-0 font-weight-bold"
        @click="$emit('source:click', source)"
        >{{ source.datasource }}
      </span>
      <b-icon-info-circle-fill
        @click.stop="$emit('source-info:click', source)"
        class="data-source-info mx-0"
        font-scale="0.5"
      />
    </div>
  </th>
</template>

<script>
export default {
  props: {
    source: {
      type: [Object, Array, String],
      required: true,
    },
    selectedSource: {
      type: Object,
      required: false,
    },
  },

  methods: {
    emitValue(source) {
      this.$emit('value', source);
      this.$emit('key', 'datasource');
    },

    updatePayload(value, key) {
      this.$store.commit('MSDAT_STORE/SET_PAYLOAD', {
        controlIndex: this.controlIndex,
        key,
        value,
      });

      this.$emit('data:options', this.payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.data-source,
.data-source-info {
  cursor: pointer;
}
.icon {
  svg {
    color: #348481 !important;
  }
}
.table-active {
  .icon {
    svg {
      color: white !important;
    }
  }
}
</style>
