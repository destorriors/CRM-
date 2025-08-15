<script setup>
import { defineEmits, defineProps, watchEffect, ref } from "vue";
import ModalTemplate from "../Ui/ModalTemplate.vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import PaymentForScheduleModal from "./PaymentForScheduleModal.vue";

// import MyButtonTemplate from "../Ui/MyButtonTemplate.vue";

import InfoForScheduleModal from "./InfoForScheduleModal.vue";
import { useRouter } from "vue-router";

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

// const filteredSubByEmployeeSpec = computed(() => {
//   const finded = scheduleStore.employees.find((emp) => {
//     return +emp.id === +props.employeeId;
//   });

//   return finded || null;
// });

const router = useRouter();

watchEffect(() => {
  console.log(props.customer);
  // console.log(filteredSubByEmployeeSpec.value);
  console.log("Дата", scheduleStore.date);
});
</script>

<template>
  <modal-template
    :is-visible="scheduleStore.isModalWindowForScheduleTemplateVisible"
    @close="closeModal"
  >
    <my-button-template
      @click="router.push(`customers/${props.customer[0].id}`)"
      >Перейти на страницу</my-button-template
    >

    <InfoForScheduleModal
      v-if="!scheduleStore.isCustomerCameToLesson"
      :customer="scheduleStore.choosenCustomer"
      :employee-id="scheduleStore.selectedIdAndTimeForMain.id"
      :time="scheduleStore.selectedIdAndTimeForMain.time"
      :current-date="scheduleStore.date"
    />

    <Transition name="fade">
      <PaymentForScheduleModal
        v-if="scheduleStore.isCustomerCameToLesson"
        :customer="scheduleStore.choosenCustomer"
        :employee-id="scheduleStore.selectedIdAndTimeForMain.id"
        :current-date="scheduleStore.date"
        :time="scheduleStore.selectedIdAndTimeForMain.time"
      />
    </Transition>
  </modal-template>
</template>

<style scoped>
.didnt-visit {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
span {
  display: block;
  margin-top: 15px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

<!-- ! Так же что делать с другими пустыми ячейками, какую модалку туда запихнуть и какую инфу отображать, скорее всего быстрая запись кого-нибудь -->
