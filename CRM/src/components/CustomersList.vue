<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import { computed, onUpdated, ref } from "vue";
import CustomersCard from "./CustomersCard.vue";
import { useRoute } from "vue-router";
import ModalTemplate from "./Ui/ModalTemplate.vue";
import AddNewCustomerComponent from "./AddNewCustomerComponent.vue";

const scheduleStore = useScheduleStore();

const findCustomerInput = ref("");

const sortedCustomers = computed(() => {
  if (!findCustomerInput.value) return scheduleStore.customers; // Возвращаем все клиенты, если поле пустое
  const searchTerm = findCustomerInput.value.toLowerCase();
  return scheduleStore.customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.parentName.toLowerCase().includes(searchTerm)
  );
});

onUpdated(() => {
  console.log(sortedCustomers.value);
});

const route = useRoute();
</script>

<template>
  <div v-if="route.path === '/customers'">
    <div class="find-customer-input">
      <label for="findCustomer">Поиск...</label>
      <input
        type="text"
        name="findCustomer"
        placeholder="Укажите имя родителя или ребенка"
        v-model="findCustomerInput"
      />
      <button class="add" @click="scheduleStore.openAddModelWindow">
        Добавить клиента
      </button>
    </div>
    <div
      class="container-card"
      v-for="customer in sortedCustomers"
      :key="customer.id"
    >
      <CustomersCard :customer="customer" />
    </div>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>

  <ModalTemplate
    :is-visible="scheduleStore.isAddModelVisible"
    title="Добавить клиента"
    @close="scheduleStore.closeAddModalWindow"
  >
    <AddNewCustomerComponent :for-main="true" />
  </ModalTemplate>
</template>

<style scoped>
.add {
  border-radius: 8px;
  background-color: #10b981;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  float: right;
}
.add:hover {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
} /* Основной контент */
.find-customer-input {
  border: 1px solid greenyellow;
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
}
label {
  margin-right: 15cap;
}
input {
  padding: 15px;
  width: auto;
}
</style>
