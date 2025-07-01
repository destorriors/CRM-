<script setup>
import { defineEmits, defineProps, watchEffect, computed } from "vue";
import ModalTemplate from "../Ui/ModalTemplate.vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import MyButtonTemplate from "../Ui/MyButtonTemplate.vue";

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

const filteredSubByEmployeeSpec = computed(() => {
  const finded = scheduleStore.employees.find((emp) => {
    return +emp.id === +props.employeeId;
  });

  return finded || null;
});

watchEffect(() => {
  console.log(props.customer);
  console.log(filteredSubByEmployeeSpec.value);
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
          <div
            v-for="(subscription, index) in customer.subscription"
            :key="`${customer.id}-${index}-subscription`"
          >
            <span
              v-if="
                filteredSubByEmployeeSpec.speciality.includes(
                  subscription.typeOfSubs
                )
              "
            >
              {{ subscription.typeOfSubs }}: {{ subscription.howMuchSubLeft }} -
              {{ subscription.timeSub }}
              <my-button-template
                :red="true"
                @click="
                  scheduleStore.removeLessonForSub(
                    customer.id,
                    index,
                    props.employeeId
                  )
                "
                >Списать</my-button-template
              >
            </span>

            <span v-else-if="customer.subscription.length === 0">
              Нет абонемента!
            </span>
          </div>
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

<!-- ! Так же что делать с другими пустыми ячейками, какую модалку туда запихнуть и какую инфу отображать, скорее всего быстрая запись кого-нибудь -->
