<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from 'vuex';

const props = defineProps(["columnKey", "data", "rowKey"]);

const value = ref({});
const objectData = ref({});
const total = ref(0);
const store = useStore()

const handleChange = (e, key) => {
  value.value = {
    ...value.value,
    [key]: Number(e.target.value),
  };
  objectData.value[props.rowKey][key] = Number(e.target.value)
  store.dispatch('setByKeyAction', objectData.value)
};

onMounted(() => {
  let tempData = {};
  let tempTotal = 0;
  for (let i = 0; i < props.columnKey.length; i++) {
    tempData[props.columnKey[i]] = props.data[props.columnKey[i]] ?? 0;
    tempTotal += props.data[props.columnKey[i]] || 0;
  }
  total.value = tempTotal;
  value.value = tempData;
  objectData.value[props.rowKey] = props.data
});

watch(
  () => value.value,
  (value, _) => {
    let tempTotal = 0;
    for (const key in value) {
        tempTotal += value[key];
    }
    total.value = tempTotal;
  }
);

watch(
  () => props.data,
  (value, _) => {
    let tempData = {};
    for (let i = 0; i < props.columnKey.length; i++) {
      tempData[props.columnKey[i]] = value[props.columnKey[i]] ?? 0;
    }
    value.value = tempData;
  }
);
</script>

<template>
  <tr>
    <td class="material">{{ props.rowKey }}</td>
    <td v-for="(item, index) in props.columnKey" :key="index">
      <input
        type="number"
        @input="(e) => handleChange(e, item)"
        :value="value[item]"
      />
    </td>
    <td class="total">{{ total }}</td>
  </tr>
</template>

<style scoped>
.total,.material {
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}
</style>
