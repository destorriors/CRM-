<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";

const scheduleStore = useScheduleStore();

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  employeeId: {
    type: Number,
    required: true,
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
        <h3>Добавить клиента в очередь</h3>
        <button
          class="btn2"
          @click="scheduleStore.toggleQueue(1)"
          :class="{ active: scheduleStore.toggleQueueAddToQueue === 1 }"
        >
          Новый
        </button>
        <button
          class="btn2"
          @click="scheduleStore.toggleQueue(2)"
          :class="{ active: scheduleStore.toggleQueueAddToQueue === 2 }"
        >
          Существующий
        </button>
      </div>
      <form
        @submit.prevent="scheduleStore.addCustomersToQueue(props.employeeId)"
        v-if="scheduleStore.toggleQueueAddToQueue === 1"
      >
        <div>
          <label for="childrenName">Имя ребёнка </label>
          <input
            type="text"
            id="childrenName"
            v-model="scheduleStore.customerToQueueInputs.childNameInput"
            placeholder="Обязательное поле"
            v-focus
          />
        </div>
        <div>
          <label for="parentName">Имя родителя </label>
          <input
            type="text"
            id="parentName"
            v-model="scheduleStore.customerToQueueInputs.parentName"
          />
        </div>
        <div>
          <label for="description">Описание </label>
          <input
            type="text"
            id="description"
            v-model="scheduleStore.customerToQueueInputs.description"
          />
        </div>
        <button
          type="submit"
          :class="{
            invalidData: !scheduleStore.customerToQueueInputs.childNameInput,
          }"
          :disabled="!scheduleStore.customerToQueueInputs.childNameInput"
        >
          Добавить
        </button>
      </form>

      <form
        @submit.prevent="scheduleStore.addCustomersToQueue(props.employeeId)"
        v-if="scheduleStore.toggleQueueAddToQueue === 2"
      >
        <select
          name="customers"
          id="customers"
          v-model="scheduleStore.selectedeInQueueCustomer"
        >
          <option disabled value="null" selected>Выберите из списка</option>
          <option
            v-for="(customer, idx) in scheduleStore.chooseCustomersInSelect(
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
          :class="{ invalidData: !scheduleStore.selectedeInQueueCustomer }"
          :disabled="!scheduleStore.selectedeInQueueCustomer"
        >
          Добавить
        </button>
      </form>
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

<!-- ! Разобраться как погасить кнопку на селекте, если выбран тот же клиент, который существует -->
