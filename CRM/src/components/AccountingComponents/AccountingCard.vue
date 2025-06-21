<script setup>
import { defineProps } from "vue";
import { useScheduleStore } from "@/stores/scheduleStore";

const props = defineProps({
  employees: {
    type: [Object, Array],
    default: () => {
      [];
    },
  },
});

const scheduleStore = useScheduleStore();

console.log(props.employees);

function countOfCustomers(employeeId) {
  const count = scheduleStore.customers.filter((cus) => {
    return cus.specialistsId.includes(employeeId);
  });
  return count;
}
</script>

<template>
  <div class="wrapper">
    <div class="date">Дата: {{ Date() }}</div>
    <div class="card" v-for="employee in props.employees" :key="employee.id">
      <h1>{{ employee.name }}</h1>
      <span>Ставка: {{ `${employee.rate}%` }} </span>
      <span>Доход за месяц: {{ employee.salary || 0 }} р. </span>
      <span
        >Количество клиентов:
        {{ countOfCustomers(employee.id).length || 0 }}</span
      >
      <span></span>
      <span
        >Доход для центра (НАДО ПОДУМОТЬ):
        {{ employee.salary - +(employee.salary * `0.${employee.rate}`) }}</span
      >
    </div>
    <!-- ! Доход центра будет высчитыватся из цены абонемента/разового занятия умноженный на процент ставки  -->
    <!-- ! Добавить ставку сотруднику -->
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  gap: 15px;
}
.card {
  width: 70vw;
  height: 70vh;
  background-color: bisque;
}
span {
  display: block;
}
</style>
