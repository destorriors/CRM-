<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import MySelectTemplate from "./Ui/MySelectTemplate.vue";
import MyButtonTemplate from "./Ui/MyButtonTemplate.vue";
import { computed } from "vue";

const scheduleStore = useScheduleStore();

const props = defineProps({
  customerId: {
    type: Number,
    required: true,
  },
});

console.log(props.customerId);

const isButtonDisabled = computed(() => {
  if (
    scheduleStore.subsSelects.subDirectionSelect &&
    scheduleStore.subsSelects.subTimeSelect &&
    scheduleStore.subsSelects.subQuantity > 0
  ) {
    return false;
  } else {
    return true;
  }
});
</script>

<template>
  <div class="templateForInputs">
    <MySelectTemplate
      label="Направление: "
      name="subDirection"
      :array-for-option="scheduleStore.specialization"
      v-model="scheduleStore.subsSelects.subDirectionSelect"
    />
    <MySelectTemplate
      label="Время: "
      name="subTime"
      :array-for-option="scheduleStore.subTime"
      v-model="scheduleStore.subsSelects.subTimeSelect"
    />
    <label for="subQuontity">Количество занятий в абонеменете: </label>
    <input
      type="number"
      name="subQuontity"
      max="30"
      min="0"
      v-model.number="scheduleStore.subsSelects.subQuantity"
    />
    <my-button-template
      class="btn2"
      :is-button-disabled="isButtonDisabled"
      @click="scheduleStore.saveAddNewSubToCustomer(customerId)"
    >
      Создать
    </my-button-template>
  </div>
</template>

<style scoped>
.templateForInputs {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.btn2 {
  align-self: center;
}
</style>
