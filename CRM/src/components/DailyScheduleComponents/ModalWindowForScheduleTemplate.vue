<script setup>
import { defineEmits, defineProps, watchEffect } from "vue";
import ModalTemplate from "../Ui/ModalTemplate.vue";
import { useScheduleStore } from "@/stores/scheduleStore";

const scheduleStore = useScheduleStore();

const props = defineProps({
  customer: {
    type: [Array, null],
    required: true,
  },
  employeeId: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}

watchEffect(() => {
  console.log(props.customer);
});
</script>

<template>
  <modal-template
    :is-visible="scheduleStore.isModalWindowForScheduleTemplateVisible"
    @close="closeModal"
  >
    <div v-for="customer in props.customer" :key="customer.id">
      <div
        v-for="(scheduleCus, idx) in customer.schedule"
        :key="`${customer.id}-${idx}`"
      >
        <div
          v-if="
            scheduleCus.employeeId === props.employeeId &&
            scheduleCus.time === props.time
          "
        >
          <span>
            {{ customer.name }}
          </span>
          <span>
            {{ scheduleCus.description }}
          </span>
        </div>
      </div>
    </div>
  </modal-template>
</template>

<style scoped>
span {
  display: block;
  margin-top: 15px;
}
</style>

<!-- ! Остановился на том, чтобы запихнуть необходимые данные при открытии модалки в функцию, чтобы не прокидывать эти данные через for -->
<!-- ! Думал над тем что положить в модалку, там по-любому кнопки с финансами должны быть - снять абик и т.д. -->
<!-- ! Так же что делать с другими пустыми ячейками, какую модалку туда запихнуть и какую инфу отображать, скорее всего быстрая запись кого-нибудь -->
