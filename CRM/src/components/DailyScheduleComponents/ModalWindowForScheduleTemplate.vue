<script setup>
import { defineEmits, defineProps } from "vue";
import ModalTemplate from "../Ui/ModalTemplate.vue";
import { useScheduleStore } from "@/stores/scheduleStore";

const scheduleStore = useScheduleStore();

const props = defineProps({
  customer: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}
</script>

<template>
  <modal-template
    :is-visible="scheduleStore.isModalWindowForScheduleTemplateVisible"
    @close="closeModal"
    >{{ props.customer }}</modal-template
  >
</template>

<style scoped></style>
