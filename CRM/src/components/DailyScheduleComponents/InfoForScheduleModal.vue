<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import MyButtonTemplate from "../Ui/MyButtonTemplate.vue";
import { computed } from "vue";

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

const filteredSubByEmployeeSpec = computed(() => {
  const finded = scheduleStore.employees.find((emp) => {
    return +emp.id === +props.employeeId;
  });

  return finded || null;
});
</script>

<template>
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
        <div class="didnt-visit">
          <my-button-template
            @click="
              scheduleStore.calculateLessonWithoutSubForEmployeeSalary(
                props.employeeId
              )
            "
            >Клиент пришел</my-button-template
          >
          <my-button-template>Клиент не пришел</my-button-template>
        </div>
      </div>
    </div>
  </div>
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
</style>
