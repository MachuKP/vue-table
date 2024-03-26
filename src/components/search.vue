<script setup>
import { ref } from "vue";
const props = defineProps(["onSearch"]);
const data = ref("");
const handleChange = (e) => {
  data.value = e.target.value;
};
const handleClick = () => {
  props.onSearch(data);
};
</script>

<template>
  <div class="searchContainer">
    <div class="leftContainer">
      <div class="headerText">Material</div>
      <input type="text" @input="(e) => handleChange(e)" :value="data" />
    </div>
    <button @click="handleClick">Search</button>
  </div>
</template>

<style scoped>
.searchContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.leftContainer {
  display: flex;
}
.headerText {
  font-size: 20px;
  margin-right: 20px;
}
</style>
