<script setup>
import AccountingCard from "@/components/AccountingCard.vue";
import { useScheduleStore } from "@/stores/scheduleStore";

const scheduleStore = useScheduleStore();
</script>

<template>
  <div class="container">
    <span class="profit"
      >Доход центра: {{ scheduleStore.accounting.profit }}</span
    >
    <span class="loss">Расход центра: {{ scheduleStore.accounting.loss }}</span>
  </div>

  <AccountingCard :employees="scheduleStore.employees" />
</template>

<style scoped>
.container {
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
  margin: 15px;
  display: inline-flex;
  flex-direction: column;
  gap: 15px;
}

.profit {
  color: rgb(9, 174, 9);
}
.loss {
  color: red;
}
</style>
