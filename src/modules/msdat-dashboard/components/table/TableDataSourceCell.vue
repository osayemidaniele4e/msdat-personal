<template>
  <th
    class="text-center align-middle"
    scope="col"
    :class="{ 'table-active text-white': selectedSource && selectedSource.id === source.id }"
    @click="emitValue(source)"
  >
    <div class="icon d-flex flex-column align-items-center justify-content-center">
      <!-- First line: datasource + icon -->
      <div class="d-flex align-items-center justify-content-center datasource-data">
        <span
          v-tooltip="source.full_name"
          class="data-source h6 mb-0 font-weight-bold"
          @click="$emit('source:click', source)"
        >
          <template v-if="hasParentheses">
            <span class="datasource-data">{{ mainText }} </span>
          </template>
          <template v-else>
            <span class="datasource-data" >{{ source.datasource }}</span>
          </template>
        </span>

        <b-icon-info-circle-fill
          @click.stop="$emit('source-info:click', source)"
          class="data-source-info ml-1"
          font-scale="0.5"
        />
      </div>

      <!-- Second line: parentheses text -->
      <template v-if="hasParentheses">
        <small
          class="h6 mt-1 font-weight-bold"
          :class="{ 'text-white': selectedSource && selectedSource.id === source.id }"
        >
          ({{ bracketText }})
        </small>
      </template>
    </div>
  </th>
</template>

<script>
export default {
  props: {
    source: {
      type: Object,
      required: true,
    },
    selectedSource: {
      type: Object,
      required: false,
    },
  },

  computed: {
    hasParentheses() {
      return /\(.*\)/.test(this.source.datasource);
    },
    mainText() {
      // Text before the parentheses
      return this.source.datasource.replace(/\(.*\)/, '').trim();
    },
    bracketText() {
      // Extract text inside parentheses
      const match = this.source.datasource.match(/\((.*)\)/);
      return match ? match[1] : '';
    },
  },

  methods: {
    emitValue(source) {
      this.$emit('value', source);
      this.$emit('key', 'datasource');
    },
  },
};
</script>

<style lang="scss" scoped>
.data-source,
.data-source-info {
  cursor: pointer;
}

.icon svg {
  color: #348481 !important;
}

.table-active .icon svg {
  color: white !important;
}

/* Make small text slightly smaller and italic for subtle separation */
small {
  font-size: 0.8rem;
  line-height: 1.2;
}
.datasource-data {
  font-size: 14px;
}
</style>
