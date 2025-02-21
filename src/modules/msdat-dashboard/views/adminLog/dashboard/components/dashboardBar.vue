<template>
  <!-- eslint-disable-next-line -->
  <div :class="`${title ? '' : 'border my-3 py-3 position-relative'} px-3 bar`" @click="selectDashboard"
  >
    <template v-for="(_, key) in headings">
      <strong v-if="title" :key="key" :class="key"> {{ headings[key] }} </strong>
      <span
        v-else
        :id="`${params.id}${key}text`"
        :key="`${key}-1`"
        class="text-truncate"
        :class="key"
      >
        {{ params[key] }}
      </span>
      <b-tooltip v-if="key === 'indicator'" :key="`${key}tip`" :target="`${params.id}${key}text`">
        {{ params[key] }}
      </b-tooltip>
    </template>
    <span v-if="!title" class="icons position-absolute">
      <svg-icon :id="`${params.id}action2`" class="p-1" icon-class="open-tab" />
      <b-tooltip :target="`${params.id}action2`" placement="bottomleft">
        <el-button @click="open(params.link)">Open</el-button>
      </b-tooltip>
      <svg-icon v-if="!existing" :id="`${params.id}action1`" class="p-1" icon-class="edit" />
      <b-tooltip v-if="!existing" :target="`${params.id}action1`" placement="bottomleft">
        <el-button @click="$router.push({ path: 'create', query: { edit: params.id } })">
          Edit
        </el-button>
      </b-tooltip>
    </span>
  </div>
</template>

<script>
import headings from '../utils/dashboardParams';

export default {
  props: {
    params: {
      type: Object,
      default: () => ({}),
    },
    title: Boolean,
    existing: Boolean,
  },
  data() {
    return {
      headings,
    };
  },
  methods: {
    open(url) {
      window.open(url, '_blank');
    },
    selectDashboard() {
      this.$emit('dashboard-selected', this.params);
    },
  },
};
</script>

<style scoped>
.icons {
  left: calc(100% - 70px);
  display: flex;
  gap: 5px;
  align-items: baseline;
}
.bar {
  width: 100%;
  min-width: 1200px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
:is(strong, span) {
  display: inline-block;
  width: 18%;
  padding-right: 10px;
}
:is(strong, span):is(.created, .updated) {
  display: inline-block;
  width: 14%;
}
</style>
