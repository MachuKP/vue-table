<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const storeObject = computed(() => store.getters.getObject)

const form = ref({
  material: "",
  productCode: "",
  description: "",
});
const error = ref("")
const props = defineProps(["setShowModal"])
const emit = defineEmits(['update'])

const onSubmit = () => {
  if (!storeObject.value[form.value.material] && form.value.material) {
    store.dispatch('setByKeyAction', {[form.value.material]: {}})
    emit('update')
    props.setShowModal(false)
    error.value = ""
  } else {
    error.value = "Invalid input"
  }
};

const handleClose = () => {
  props.setShowModal(false)
}
</script>

<template>
  <div class="modalContainer">
    <div class="modalContent">
      <div class="mainContainer">
        <form @submit.prevent="onSubmit">
          <div class="inputContainer">
            <label for="material">Material</label>
            <input
              type="text"
              name="material"
              id="material"
              v-model="form.material"
            />
          </div>
          <div class="inputContainer">
            <label for="productCode">Product Code</label>
            <input
              type="text"
              name="productCode"
              id="productCode"
              v-model="form.productCode"
            />
          </div>
          <div class="inputContainer">
            <label for="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="4"
              cols="25"
              v-model="form.description"
            ></textarea>
          </div>
          <div v-if="error">{{ error }}</div>
          <div class="buttonContainer">
            <button type="submit">Add</button>
            <button @click="handleClose">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    <div class="blackDrop" @click="handleClose"></div>
  </div>
</template>

<style scoped>
.modalContainer {
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modalContent {
  background-color: #fff;
  position: absolute;
  padding: 40px;
  border-radius: 10px;
  width: 50%;
  z-index: 3;
}
.mainContainer {
  width: 100%;
}
.inputContainer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.buttonContainer {
  display: flex;
  justify-content: space-between;
}
.blackDrop {
  background: #00000070;
  height: 100vh;
  width: 100%;
  z-index: 1;
}
</style>
