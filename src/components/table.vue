<script setup>
import RowComponent from './row.vue'
const props = defineProps(["column", "row", "tableData"]);
</script>

<template>
  <div class="tableContainer">
    <table>
      <thead>
        <tr>
          <th>Material</th>
          <th v-for="(item, index) in props.column" :key="index">{{ item }}</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <RowComponent
          v-for="(item, index) in props.row"
          :key="index"
          :rowKey="item"
          :data="props.tableData[item]"
          :columnKey="props.column"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.tableContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  overflow: auto;
}
th {
  width: 100px;
  border: 1px solid #000;
}
</style>
