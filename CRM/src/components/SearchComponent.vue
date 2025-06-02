<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  inputName: {
    type: String,
    required: true,
  },
  inputPlaceholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

function updateModel(event) {
  emit("update:modelValue", event.target.value);
}

// const findInput = ref("");

// const sortedCustomers = computed(() => {
//   if (!findCustomerInput.value) return scheduleStore.customers; // Возвращаем все клиенты, если поле пустое
//   const searchTerm = findCustomerInput.value.toLowerCase();
//   return scheduleStore.customers.filter(
//     (customer) =>
//       customer.name.toLowerCase().includes(searchTerm) ||
//       customer.parentName.toLowerCase().includes(searchTerm)
//   );
// });
</script>

<template>
  <div class="find-customer-input">
    <label for="findCustomer">Поиск...</label>
    <input
      type="text"
      :name="props.inputName"
      :placeholder="props.inputPlaceholder"
      :value="modelValue"
      @input="updateModel"
    />
    <slot></slot>
  </div>
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
