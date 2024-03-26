<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from 'vuex';
import dataDefault from "./constant/data";
import TableComponent from "./components/table.vue";
import SearchComponent from "./components/search.vue";
import Modal from "./components/modal.vue";

const objectData = ref({});
const column = ref([]);
const row = ref([]);
const showRow = ref([]);
const showData = ref([]);
const showModal = ref(false)
const data = ref(dataDefault);
const store = useStore()

const storeObject = computed(() => store.getters.getObject)

const createTable = (data) => {
  let tempRow = [];
  let tempColumn = [];
  for (const key in data) {
    tempRow.push(key);
    for (const keyItem in data[key]) {
      if (!tempColumn.includes(keyItem)) {
        tempColumn.push(keyItem);
      }
    }
  }
  const filterColumn = tempColumn.sort();
  column.value = filterColumn;
  row.value = tempRow;
  showRow.value = tempRow;
};
const transformData = (data) => {
  let newObject = {};
  for (let i = 0; i < data.length; i++) {
    if (!newObject[data[i].Material]) {
      newObject[data[i].Material] = {};
    }
    newObject[data[i].Material][data[i].Location] = data[i].QTY;
  }
  objectData.value = newObject;
  showData.value = newObject;
  store.dispatch('setUpDataAction', newObject)
};

const onSearch = (keyword) => {
  let tempRow = [...row.value];
  let tempData = {};
  const searchRow = tempRow.filter((item) => {
    return item.includes(keyword.value);
  });
  for (let i = 0; i < searchRow.length; i++) {
    tempData[searchRow[i]] = objectData.value[searchRow[i]]
  }
  showData.value = tempData;
  showRow.value = searchRow;
};

const onSave = () => {
  console.log(storeObject.value);
};

const setShowModal = (isShow) => {
  showModal.value = isShow;
};

const updateTable = () => {
  objectData.value = storeObject.value;
  showData.value = storeObject.value;
  createTable(objectData.value);
}

watch(
  () => objectData.value,
  (value, prevValue) => {
    if (Object.keys(value).length !== Object.keys(prevValue).length) {
      createTable(value);
    }
  }
);

onMounted(() => {
  if (!Object.keys(storeObject.value).length) {
    transformData(data.value);
  } else {
    objectData.value = storeObject.value;
    showData.value = storeObject.value;
  }
});
</script>

<template>
  <div class="mainContainer">
    <div class="header">
      <SearchComponent :onSearch="onSearch" />
    </div>
    <div class="buttonContainer">
      <button class="button" @click="() => setShowModal(true)">+</button>
    </div>
    <TableComponent class="table" :column="column" :row="showRow" :tableData="showData" />
    <div class="buttonContainer">
      <button class="button" @click="onSave">Save</button>
    </div>
  </div>
  <Modal v-if="showModal" :setShowModal="setShowModal" @update="updateTable" />
</template>

<style scoped>
.mainContainer {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.header {
  margin-bottom: 20px;
}
.button {
  float: right;
  margin-bottom: 20px;
  width: 58px;
}
.buttonContainer {
  display: flex;
  justify-content: flex-end;
}
.table {
  margin-bottom: 20px;
}
</style>
