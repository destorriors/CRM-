<script setup>
import ModalTemplate from "../Ui/ModalTemplate.vue";
import MyInputTextTemplate from "../Ui/MyInputTextTemplate.vue";
import { useScheduleStore } from "@/stores/scheduleStore";

const scheduleStore = useScheduleStore();
</script>

<template>
  <my-button-template
    class="add-category"
    @click="scheduleStore.openAddPriceCategory"
    >Добавить категорию</my-button-template
  >
  <modal-template
    :is-visible="scheduleStore.isAddingPriceCategory"
    title="Добавление категории"
    @close="scheduleStore.closeAddPriceCategory"
  >
    <MyInputTextTemplate
      label-of-input="Укажите название:"
      name="categoryName"
      v-model="scheduleStore.priceCategoryInput"
    />
    <my-button-template
      class="btn2"
      @click="scheduleStore.saveAddPriceCategory"
      :is-button-disabled="scheduleStore.priceCategoryInput.length === 0"
      >Добавить</my-button-template
    >
  </modal-template>
</template>

<style scoped>
.add-category {
  display: block; /* Убеждаемся, что кнопка — блочный элемент */
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 50px;
}
.btn2 {
  display: block; /* Убеждаемся, что кнопка — блочный элемент */
  margin: 15px auto 15px auto;
  width: 200px;
}
.btn2:disabled {
  display: block; /* Убеждаемся, что кнопка — блочный элемент */
  margin: 15px auto 15px auto;
  width: 200px;
}
</style>
