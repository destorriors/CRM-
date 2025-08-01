<script setup>
import { computed, ref, watchEffect } from "vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import MySelectWithoutKeysTemplate from "../Ui/MySelectWithoutKeysTemplate.vue";
import MySelectTemplate from "../Ui/MySelectTemplate.vue";

const scheduleStore = useScheduleStore();

const props = defineProps({
  employeeId: {
    type: Number,
    required: true,
  },
  customer: {
    type: [Array, null],
    required: true,
  },
  currentDate: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const filteredPriceByEmployeeSpec = computed(() => {
  const finded = scheduleStore.employees.find((emp) => {
    return +emp.id === +props.employeeId;
  });

  return finded || null;
});

const employeeSpecValue = ref(filteredPriceByEmployeeSpec.value.speciality[0]);

const findedPrice = computed(() =>
  scheduleStore.priceList.find(
    (val) => val.category === employeeSpecValue.value
  )
);

// const serviceMainNameValue = ref("");

const finalCost = computed(() => {
  const findedCurrentoption = findedPrice.value.timeOptions.find((val) => {
    return val.name === scheduleStore.serviceMainNameValue;
  });
  return findedCurrentoption;
});

watchEffect(() => {
  console.log(filteredPriceByEmployeeSpec.value);
  console.log(findedPrice.value);
  console.log(scheduleStore.serviceMainNameValue);
  console.log(finalCost.value);
  console.log(props.customer);
});
</script>

<template>
  <div>
    <MySelectWithoutKeysTemplate
      label="Выберите направление:"
      name="directionOfLesson"
      :array-for-option="filteredPriceByEmployeeSpec.speciality"
      v-model="employeeSpecValue"
    />
    <MySelectTemplate
      label="Выберите наименование услуги:"
      name="serviceName"
      :array-for-option="findedPrice.timeOptions"
      array-key="name"
      v-model="scheduleStore.serviceMainNameValue"
    />

    <MySelectWithoutKeysTemplate
      v-if="scheduleStore.serviceMainNameValue"
      label="Способ оплаты: "
      name="paymentType"
      :array-for-option="scheduleStore.paymentType"
      v-model="scheduleStore.paymentTypeInput"
    />

    <h3 v-if="scheduleStore.serviceMainNameValue">
      Цена: {{ finalCost.singleCost }} р.
    </h3>
    <my-button-template
      :disabled="!scheduleStore.serviceMainNameValue"
      @click="
        scheduleStore.calculateLessonWithoutSubForEmployeeSalary(
          props.employeeId,
          props.customer,
          finalCost.singleCost,
          props.currentDate,
          props.time
        )
      "
      >Подтвердить</my-button-template
    >
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
