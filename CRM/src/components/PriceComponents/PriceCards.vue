<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import { defineProps } from "vue";

const props = defineProps({
  item: {
    type: Array,
    required: true,
  },
  itemId: {
    type: Number,
    required: true,
  },
});

const scheduleStore = useScheduleStore();
</script>

<template>
  <div class="cards" v-for="(option, idx) in item">
    <h2 v-if="option.name">{{ option.name }}</h2>
    <p v-if="option.timeOfSub != 0">Время услуги: {{ option.timeOfSub }} мин</p>
    <p>Разовая стоимость: {{ option.singleCost }}</p>
    <p v-if="!option.withoutSub">
      Разовая стоимость услуги по абонементу:
      {{ option.subSingleLessonCost }}
    </p>
    <p v-if="!option.withoutSub">Стоимость абонемента: {{ option.subCost }}</p>
    <p v-if="!option.withoutSub">
      Количество услуг в абонементе:
      {{ option.subCountOfLessons }}
    </p>
    <my-button-template
      class="editButton"
      @click="scheduleStore.openEditPrice(idx, props.itemId)"
      >Редактировать</my-button-template
    >
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  border: 1px solid black;
  gap: 15px;
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
}
.edit-button {
  width: auto;
  height: auto;
}
</style>
