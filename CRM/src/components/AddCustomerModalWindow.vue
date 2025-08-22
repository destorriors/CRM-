<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import AddNewCustomerComponent from "./AddNewCustomerComponent.vue";
import AddExistingCustomerComponent from "./AddExistingCustomerComponent.vue";
import AddFromQueueCustomerComponent from "./AddFromQueueCustomerComponent.vue";

const scheduleStore = useScheduleStore();

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  employeeId: {
    type: Number,
    required: true,
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

const emit = defineEmits(["closeAddCustomers"]);

function closeAddCustomers() {
  emit("closeAddCustomers");
}
</script>

<template>
  <div class="modal-overlay" @click.self="closeAddCustomers">
    <div class="modal-content">
      <div>
        <button class="btn" @click="closeAddCustomers">✕</button>
      </div>
      <div class="addCustomer">
        <h3>Добавить клиента</h3>
        <button
          class="btn2"
          @click="scheduleStore.toggleNew(1)"
          :class="{ active: scheduleStore.toggleAddCustomer === 1 }"
        >
          Новый
        </button>
        <button
          class="btn2"
          @click="scheduleStore.toggleNew(2)"
          :class="{ active: scheduleStore.toggleAddCustomer === 2 }"
        >
          Существующий
        </button>
        <button
          class="btn3"
          @click="scheduleStore.toggleNew(3)"
          :class="{ active: scheduleStore.toggleAddCustomer === 3 }"
          v-if="scheduleStore.getCustomersQueue(props.employeeId).length !== 0"
        >
          В очереди
        </button>
      </div>
      <AddNewCustomerComponent
        v-if="scheduleStore.toggleAddCustomer === 1"
        :for-main-table="props.forMainTable"
        :day="props.day"
        :employee-id="props.employeeId"
        :time="props.time"
        :for-main="props.forMain"
      />

      <AddExistingCustomerComponent
        v-if="scheduleStore.toggleAddCustomer === 2"
        :for-main-table="props.forMainTable"
        :day="props.day"
        :employee-id="props.employeeId"
        :time="props.time"
        :for-main="props.forMain"
      />

      <AddFromQueueCustomerComponent
        v-if="
          scheduleStore.toggleAddCustomer === 3 &&
          scheduleStore.getCustomersQueue(props.employeeId).length !== 0
        "
        :for-main-table="props.forMainTable"
        :day="props.day"
        :employee-id="props.employeeId"
        :time="props.time"
        :for-main="props.forMain"
      />
    </div>
  </div>
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
