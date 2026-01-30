<template>
  <tbody v-if="bodyValue !== null">
    <tr class="row-bg">
      <td class="indicator">{{ indicator.full_name }}</td>
      <td v-for="(header, i) in datasourcesObj" :key="i">
        <div v-for="(item, i) in bodyValue" :key="i" class="">
          <div class="content-row" v-if="header.id === item?.datasource">
            <h4>
              {{ item.value }}
            </h4>
            <p>{{ item.period }}</p>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    indicator: Object,
    bodyValue: Array,
    datasourcesObj: Array,
  },
};
</script>

<style lang="scss" scoped>
.row-bg {
  background-color: #007d53;
  color: #fff;
}
td h4 {
  color: #fff;
}
.indicator {
  width: 250px;
  font-size: 15px;
  font-weight: bold;
}
.content-row {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content-row p {
  font-size: 12px;
}
</style>
