<script setup>
import ModalTemplate from "../Ui/ModalTemplate.vue";
import EditPriceInputDataTemplate from "../EditPriceInputDataTemplate.vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  addTimeInPriceOptionMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}

const scheduleStore = useScheduleStore();
</script>

<template>
  <modal-template
    :is-visible="(props, isVisible)"
    :title="props.title"
    @close="closeModal"
  >
    <EditPriceInputDataTemplate
      :edit-option-idx="scheduleStore.idxAndIdofPrice.idx"
      :price-id="scheduleStore.idxAndIdofPrice.id"
      :add-time-in-price-option-mode="props.addTimeInPriceOptionMode"
    />
  </modal-template>
</template>

<style scoped></style>
