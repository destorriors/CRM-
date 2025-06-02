<script setup>
import { defineProps } from "vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import MyInputNumberTemplate from "../Ui/MyInputNumberTemplate.vue";
import ModalTemplate from "../Ui/ModalTemplate.vue";

const scheduleStore = useScheduleStore();

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  labelOfInput: {
    type: String,
    required: true,
  },
  buttonLabel: {
    type: String,
    required: true,
  },
  nameForInput: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <modal-template
    :is-visible="props.isVisible"
    :title="props.title"
    @close="scheduleStore.closeRaiseOrLowerPriceCategory"
  >
    <MyInputNumberTemplate
      :label-of-input="props.labelOfInput"
      :name="props.nameForInput"
      v-model="scheduleStore.inputForRaiseOrLowerPriceCategory"
    />
    <my-button-template
      class="btn2"
      @click="
        scheduleStore.saveResetRaiseOrLowerPriceCategory(
          scheduleStore.idxAndIdofPrice.idx,
          scheduleStore.idxAndIdofPrice.id
        )
      "
      :is-button-disabled="
        scheduleStore.inputForRaiseOrLowerPriceCategory === 0
      "
      >{{ props.buttonLabel }}</my-button-template
    >
  </modal-template>
</template>

<style scoped>
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
