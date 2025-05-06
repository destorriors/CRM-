<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3>Информация о клиенте</h3>
      <button class="btn" @click="closeModal">✕</button>

      <div class="client-info">
        <div class="card">
          <strong>Имя родителя:</strong>
          <span v-if="!scheduleStore.isEditting">{{
            customer.parentName
          }}</span>
          <input
            type="text"
            class="edit-input"
            v-else
            v-model="scheduleStore.edittingCustomer.parentName"
          />
        </div>

        <div class="card">
          <strong>Имя ребенка:</strong>
          <span v-if="!scheduleStore.isEditting">
            {{ customer.name || "Не указан" }}</span
          >
          <input
            type="text"
            class="edit-input"
            v-else
            v-model="scheduleStore.edittingCustomer.name"
          />
        </div>

        <div class="card" v-if="day && time">
          <strong>Заметка на этот день :</strong>
          <span v-if="!scheduleStore.isEditting">
            {{ getScheduleEntry(customer)?.description || "Не указано" }}</span
          >
          <input
            type="text"
            class="edit-input"
            v-else
            v-model="
              scheduleStore.edittingCustomer.schedule[scheduleIndex].description
            "
          />
        </div>

        <div class="card">
          <strong>Абонемент:</strong>
          <span v-if="!scheduleStore.isEditting">
            {{ customer.subscription || "Не указан" }}
          </span>
          <input
            type="text"
            class="edit-input"
            v-else
            v-model="scheduleStore.edittingCustomer.subscription"
          />
        </div>

        <!-- ! Разобаться со специалистом, как организовывать логику -->

        <p>
          <strong>Специалист:</strong>
          {{ customer.specialist || "Не назначен" }}
        </p>
        <div class="card">
          <strong>Комментарий:</strong>
          <span v-if="!scheduleStore.isEditting">
            <strong class="description">{{
              customer.description || "Не указан"
            }}</strong>
          </span>
          <input
            type="text"
            class="edit-input"
            v-else
            v-model="scheduleStore.edittingCustomer.description"
          />
        </div>
      </div>
      <div v-if="scheduleStore.isEditting">
        <button class="save-button" @click="scheduleStore.saveEditting">
          Сохранить
        </button>
        <button class="cancel-button" @click="scheduleStore.cancelEditting">
          Отменить
        </button>
      </div>
      <div v-else>
        <button class="close-button" @click="scheduleStore.editCustomer">
          Редактировать
        </button>
        <button
          v-if="day && time"
          class="delete-button"
          @click="scheduleStore.removeCustomer(customer, day, time, employeeId)"
        >
          Удалить из расписания
        </button>
        <button
          v-else
          class="delete-button"
          @click="scheduleStore.removeFromEmployeeQueue(employeeId)"
        >
          Удалить из очереди
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { useScheduleStore } from "@/stores/scheduleStore";

// Импорт стора
const scheduleStore = useScheduleStore();

// Пропсы для передачи данных клиента и состояния видимости
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  customer: {
    type: [Object, null],
    required: true,
    default: () => ({ name: "", subscription: "", specialist: "" }),
  },
  day: {
    type: String,
  },
  time: {
    type: String,
  },
  employeeId: {
    type: Number,
    required: true,
  },
});

// Эмит для закрытия модального окна
const emit = defineEmits(["close"]);

// Функция закрытия модального окна
function closeModal() {
  emit("close");
}

function getScheduleEntry(customer) {
  return customer.schedule.find(
    (s) =>
      s.day === props.day &&
      s.time === props.time &&
      s.employeeId === props.employeeId
  );
}

// Поиск индекса

const scheduleIndex = computed(() => {
  if (!scheduleStore.edittingCustomer?.schedule) return 0;
  return scheduleStore.edittingCustomer.schedule.findIndex(
    (s) =>
      s.day === props.day &&
      s.time === props.time &&
      s.employeeId === props.employeeId
  );
});
</script>

<style scoped>
.client-info .description {
  color: rgb(242, 180, 188);
}
.card {
  margin-top: 10px;
}

.edit-input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

h3 {
  margin-top: 0;
  color: #343a40;
  font-size: 20px;
  text-align: center;
}

.client-info p {
  margin: 10px 0;
  font-size: 16px;
  color: #495057;
}

.client-info strong {
  color: #37df5c;
}

.close-button {
  display: block;
  width: 100%;
  padding: 10px;
  background: #37df5c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.close-button:hover {
  background: #2fc24f;
}

.save-button {
  display: block;
  width: 100%;
  padding: 10px;
  background: #37df5c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.save-button:hover {
  background: #2fc24f;
}

.cancel-button {
  display: block;
  width: 100%;
  padding: 10px;
  background: rgb(138, 138, 138);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.cancel-button:hover {
  background: rgb(125, 125, 125);
}

.delete-button {
  display: block;
  width: 100%;
  padding: 10px;
  background: #ff4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.delete-button:hover {
  background: #cc0000;
}
</style>
