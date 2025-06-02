<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import MySelectTemplate from "./Ui/MySelectTemplate.vue";
import MyButtonTemplate from "./Ui/MyButtonTemplate.vue";
import { computed, watchEffect } from "vue";

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
    scheduleStore.subsSelects.subQuantity
  ) {
    return false;
  } else {
    return true;
  }
});

// const priceList = ref([
// {
//   id: 0,
//   category: "Нейропсихолог",
//   timeOptions: [
//     {
//       name: "",
//       timeOfSub: 30,
//       singleCost: 1500,
//       subSingleLessonCost: 1300,
//       subCost: 7600,
//       subCountOfLessons: 4,
//       withoutSub: false,
//     },
//     {
//       name: "",
//       timeOfSub: 45,
//       singleCost: 1700,
//       subSingleLessonCost: 1500,
//       subCost: 6700,
//       subCountOfLessons: 4,
//       withoutSub: false,
//     },
//   ],
// },

const arrayForSelectFromPrice = computed(() => {
  const sorted = scheduleStore.priceList.find((val) => {
    return val.category === scheduleStore.subsSelects.subDirectionSelect;
  });
  return sorted || [];
});

// const getTimeOptionIndex = computed(() => {
//   if (
//     !arrayForSelectFromPrice.value ||
//     !arrayForSelectFromPrice.value.timeOptions
//   )
//     return -1;
//   return arrayForSelectFromPrice.value.timeOptions.findIndex(
//     (opt) =>
//       opt.timeOfSub.toString() === scheduleStore.subsSelects.subTimeSelect
//   );
// });

const uniqueTimeOptions = computed(() => {
  if (
    !arrayForSelectFromPrice.value ||
    !arrayForSelectFromPrice.value.timeOptions
  )
    return [];

  // Фильтруем timeOptions, исключая те, где withoutSub === true
  const filteredOptions = arrayForSelectFromPrice.value.timeOptions.filter(
    (option) => !option.withoutSub
  );

  // Создаём Set из значений timeOfSub, чтобы удалить дубликаты
  const uniqueTimes = [
    ...new Set(filteredOptions.map((option) => option.timeOfSub)),
  ];

  // Возвращаем массив объектов, сохраняя структуру для MySelectTemplate
  return uniqueTimes.map((time) => {
    const option = filteredOptions.find((opt) => opt.timeOfSub === time);
    return option || { timeOfSub: time };
  });
});

// Уникальные значения количества занятий для выбранного времени
const subQuantityByUniqueTime = computed(() => {
  if (
    !scheduleStore.subsSelects.subTimeSelect ||
    !arrayForSelectFromPrice.value
  )
    return [];

  // Фильтруем timeOptions по выбранному времени и исключаем withoutSub === true
  const matchingTimeOptions = arrayForSelectFromPrice.value.timeOptions.filter(
    (val) =>
      val.timeOfSub.toString() === scheduleStore.subsSelects.subTimeSelect &&
      !val.withoutSub
  );

  // Извлекаем уникальные значения subCountOfLessons
  const uniqueQuantities = [
    ...new Set(matchingTimeOptions.map((option) => option.subCountOfLessons)),
  ];

  // Возвращаем массив объектов для MySelectTemplate
  return uniqueQuantities.map((quantity) => ({
    subCountOfLessons: quantity,
  }));
});

watchEffect(() => {
  console.log(subQuantityByUniqueTime.value);
});
</script>

<template>
  <div class="templateForInputs">
    <MySelectTemplate
      label="Направление: "
      name="subDirection"
      :array-for-option="scheduleStore.priceList"
      array-key="category"
      v-model="scheduleStore.subsSelects.subDirectionSelect"
    />
    <MySelectTemplate
      v-if="arrayForSelectFromPrice.length != 0"
      label="Время: "
      name="subTime"
      :array-for-option="uniqueTimeOptions"
      array-key="timeOfSub"
      v-model="scheduleStore.subsSelects.subTimeSelect"
    />
    {{ subQuantityByUniqueTime.value }}
    <MySelectTemplate
      v-if="subQuantityByUniqueTime.length"
      label="Количество занятий в абонеменете: "
      name="subQuontity"
      :array-for-option="subQuantityByUniqueTime"
      array-key="subCountOfLessons"
      v-model="scheduleStore.subsSelects.subQuantity"
    />

    <!-- <label for="subQuontity">Количество занятий в абонеменете: </label>
    <input
      type="number"
      name="subQuontity"
      max="30"
      min="0"
      v-model.number="scheduleStore.subsSelects.subQuantity"
    /> -->
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

<!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<!-- ! Не хватило мозгов -->
<!-- ! Вот на этом компоненте нужно задержаться, так как пропала реактивность и без нее -->
<!-- ! Если в ценах добавить время, то тут появится дубликат -->
