<script setup>
import ModalTemplate from "../Ui/ModalTemplate.vue";
import { useScheduleStore } from "@/stores/scheduleStore";

const scheduleStore = useScheduleStore();
</script>

<template>
  <modal-template> </modal-template>
</template>

<style scoped></style>

<!-- ! Остановился здесь, нужно сделать модалку для замены, переменная и 2 функции уже есть в сторе -->
