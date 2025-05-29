<script setup>
import MyInputNumberTemplate from "./Ui/MyInputNumberTemplate.vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import { computed } from "vue";

const scheduleStore = useScheduleStore();

const props = defineProps({
  editOptionIdx: {
    type: Number,
    default: 0,
  },
  priceId: {
    type: Number,
    required: true,
  },
  addTimeInPriceOptionMode: {
    type: Boolean,
    default: false,
  },
});

console.log(scheduleStore.temporaryEdittingTimeOption);

const isButtonDisabled = computed(() => {
  if (
    scheduleStore.temporaryEdittingTimeOption.timeOfSub != 0 &&
    scheduleStore.temporaryEdittingTimeOption.singleCost != 0 &&
    scheduleStore.temporaryEdittingTimeOption.subSingleLessonCost != 0 &&
    scheduleStore.temporaryEdittingTimeOption.subCountOfLessons != 0
  ) {
    return false;
  } else {
    return true;
  }
});

console.log(scheduleStore.temporaryEdittingTimeOption);

// const temporaryEdittingTimeOption = ref({
//     timeOfSub: 0,
//     singleCost: 0,
//     subSingleLessonCost: 0,
//     subCost: 0,
//     subCountOfLessons: 0,
//   });
</script>

<template>
  <div class="inputsCard">
    <MyInputNumberTemplate
      label-of-input="Время занятия:"
      name="timeOfLesson"
      v-model="scheduleStore.temporaryEdittingTimeOption.timeOfSub"
    />
    <MyInputNumberTemplate
      label-of-input="Разовая стоимость:"
      name="singleCost"
      v-model="scheduleStore.temporaryEdittingTimeOption.singleCost"
    />
    <MyInputNumberTemplate
      label-of-input="Разовая стоимость занятия в абонементе:"
      name="subCost"
      v-model="scheduleStore.temporaryEdittingTimeOption.subSingleLessonCost"
    />
    <MyInputNumberTemplate
      label-of-input="Количество занятий в абонементе:"
      name="countOfLessons"
      v-model="scheduleStore.temporaryEdittingTimeOption.subCountOfLessons"
    />
    <p>Стоимость абонемента посчитается автоматически</p>
    <my-button-template
      @click="
        scheduleStore.saveEdittingPrice(
          props.editOptionIdx,
          props.priceId,
          props.addTimeInPriceOptionMode
        )
      "
      :is-button-disabled="isButtonDisabled"
      >Сохранить</my-button-template
    >
  </div>
</template>

<style scoped>
.inputsCard {
  display: grid;
  gap: 15px;
}
</style>
