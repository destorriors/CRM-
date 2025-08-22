<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";

const props = defineProps({
  employeeId: {
    type: [String, Number],
    default: "",
  },
  day: {
    type: String,
    default: "",
  },
  time: {
    type: String,
    default: "",
  },
  forMain: {
    type: Boolean,
    default: false,
  },
  forMainTable: {
    type: Boolean,
    default: false,
  },
});

const scheduleStore = useScheduleStore();
</script>

<template>
  <form
    @submit.prevent="
      scheduleStore.addCustomers(
        props.employeeId,
        props.day,
        props.time,
        props.forMain,
        props.forMainTable
      )
    "
  >
    <select
      name="customers"
      id="customers"
      v-model="scheduleStore.selectedCustomer"
    >
      <option disabled value="null" selected>Выберите из списка</option>
      <option
        v-for="(customer, idx) in scheduleStore.getCustomersQueue(
          props.employeeId
        )"
        :key="idx"
        :value="customer"
      >
        {{ customer.name }}
      </option>
    </select>
    <button
      type="submit"
      :class="{ invalidData: !scheduleStore.selectedCustomer }"
      :disabled="!scheduleStore.selectedCustomer"
    >
      Добавить
    </button>
  </form>
</template>

<style scoped>
.invalidData {
  background-color: red;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Полупрозрачный чёрный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Высокий z-index, чтобы быть поверх других элементов */
  backdrop-filter: blur(2px); /* Лёгкое размытие фона */
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: absolute;
}

.addCustomer {
  text-align: center;
  margin-bottom: 20px;
}

.addCustomer h3 {
  margin: 0 0 15px 0;
  color: #343a40;
  font-size: 20px;
}

.addCustomer button.btn3 {
  width: 120px;
  padding: 8px;
  margin: 0 5px;
  background-color: rgb(242, 180, 188);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s, color 0.2s;
}

.addCustomer button.btn3:hover {
  background-color: rgb(247, 140, 154);
}

.addCustomer button.btn3.active {
  background-color: rgb(242, 180, 188);
  border: 1px solid black;
}

.addCustomer button.btn2 {
  width: 120px;
  padding: 8px;
  margin: 0 5px;
  background: #e9ecef;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s, color 0.2s;
}

.addCustomer button.btn2:hover {
  background: #ced4da;
}

.addCustomer button.btn2.active {
  background: #37df5c;
  color: #fff;
  border: 1px solid black;
}

/* Стили для кнопки "Закрыть" */
.btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: #ff4444;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
}

.btn:hover {
  background: #cc0000;
}

/* Стили для форм */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

form div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0; /* Убираем стандартный margin из div */
}

form label {
  font-size: 14px;
  color: #495057;
  font-weight: 500;
}

form input,
form select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  background: #f8f9fa;
  transition: border-color 0.2s;
}

form input:focus,
form select:focus {
  border-color: #37df5c;
  outline: none;
}

form select {
  height: 36px; /* Фиксированная высота для селекта */
}

/* Стили для кнопки "Добавить" */
form button[type="submit"] {
  padding: 10px;
  background: #37df5c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

form button[type="submit"].invalidData {
  background-color: grey;
}

form button[type="submit"].invalidData:hover {
  background-color: grey;
}

form button[type="submit"]:hover {
  background: #2fc24f;
}
</style>
