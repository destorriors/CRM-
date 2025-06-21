<script setup>
import MyInputNumberTemplate from "./Ui/MyInputNumberTemplate.vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import { computed, onUpdated } from "vue";
import MyInputTextTemplate from "./Ui/MyInputTextTemplate.vue";

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
  modelValue: {
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
  } else if (
    scheduleStore.withoutSub &&
    scheduleStore.temporaryEdittingTimeOption.singleCost != 0
  ) {
    return false;
  } else if (
    scheduleStore.temporaryEdittingTimeOption.withoutSub &&
    scheduleStore.temporaryEdittingTimeOption.singleCost != 0
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

onUpdated(() => {
  console.log(scheduleStore.withoutSub);
});
</script>

<template>
  <div class="inputsCard">
    <MyInputTextTemplate
      label-of-input="Наименование услуги:"
      name="nameOfService"
      my-placeholder="Необязательное поле"
      v-model="scheduleStore.temporaryEdittingTimeOption.name"
    />
    <MyInputNumberTemplate
      label-of-input="Время услуги:"
      name="timeOfLesson"
      v-model.number="scheduleStore.temporaryEdittingTimeOption.timeOfSub"
    />
    <MyInputNumberTemplate
      label-of-input="Разовая стоимость:"
      name="singleCost"
      v-model.number="scheduleStore.temporaryEdittingTimeOption.singleCost"
    />
    <MyInputNumberTemplate
      v-if="
        !scheduleStore.withoutSub &&
        !scheduleStore.temporaryEdittingTimeOption.withoutSub
      "
      class="inputForm"
      label-of-input="Разовая стоимость услуги в абонементе:"
      name="subCost"
      v-model.number="
        scheduleStore.temporaryEdittingTimeOption.subSingleLessonCost
      "
    />
    <MyInputNumberTemplate
      v-if="
        !scheduleStore.withoutSub &&
        !scheduleStore.temporaryEdittingTimeOption.withoutSub
      "
      class="inputForm"
      label-of-input="Количество услуг в абонементе:"
      name="countOfLessons"
      v-model.number="
        scheduleStore.temporaryEdittingTimeOption.subCountOfLessons
      "
    />
    <p
      v-if="
        !scheduleStore.withoutSub &&
        !scheduleStore.temporaryEdittingTimeOption.withoutSub
      "
    >
      Стоимость абонемента посчитается автоматически
    </p>
    <div v-if="addTimeInPriceOptionMode">
      <input
        type="checkbox"
        id="withoutSub"
        v-model="scheduleStore.withoutSub"
      />
      Без абонемента
    </div>
    <my-button-template
      :is-button-disabled="isButtonDisabled"
      @click="
        scheduleStore.saveEdittingPrice(
          props.editOptionIdx,
          props.priceId,
          props.addTimeInPriceOptionMode
        )
      "
      >Сохранить</my-button-template
    >
    <my-button-template
      v-if="!addTimeInPriceOptionMode"
      :red="true"
      @click="
        scheduleStore.removeTimeFromPriceOption(
          props.editOptionIdx,
          props.priceId
        )
      "
      >Удалить</my-button-template
    >
  </div>
</template>

<style scoped>
.inputsCard {
  display: grid;
  gap: 15px;
}
</style>
