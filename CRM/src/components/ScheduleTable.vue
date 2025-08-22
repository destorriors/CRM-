<template>
  <div class="schedule-container">
    <h2>Расписание</h2>
    <table class="schedule-table">
      <thead>
        <tr>
          <th class="time-header"></th>
          <th v-for="day in days" :key="day" class="day-header">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="time in allPossibleTimes" :key="time">
          <td class="time-slot">{{ time }}</td>
          <td
            v-for="day in days"
            :key="`${day}-${time}`"
            :class="[
              'schedule-cell',
              { inactive: !isTimeInWorkHours(day, time) },
            ]"
            @mouseover="
              isTimeInWorkHours(day, time) &&
                scheduleStore.showAddIcon(day, time)
            "
            @mouseleave="scheduleStore.hideAddIcon(day, time)"
          >
            <span
              v-if="isTimeInWorkHours(day, time)"
              v-for="customer in scheduleStore.getCustomers(
                day,
                time,
                employee.id
              )"
              :key="customer.id"
              @click="scheduleStore.openModal(customer, day, time)"
            >
              <div class="name">ФИО: {{ customer.name }}</div>
              <div class="note">
                {{
                  getScheduleEntry(customer, day, time, employee.id)
                    ?.description || ""
                }}
              </div>
            </span>
            <span
              v-if="
                isTimeInWorkHours(day, time) &&
                scheduleStore.isAddIconVisible(day, time) &&
                !scheduleStore.getCustomers(day, time, employee.id).length
              "
              class="add-icon"
              @click.stop="scheduleStore.showInput(day, time)"
            >
              +
            </span>
            <AddCustomerModalWindow
              v-if="
                isTimeInWorkHours(day, time) &&
                scheduleStore.isInputVisible(day, time)
              "
              :for-main-table="false"
              :is-visible="scheduleStore.isInputVisible(day, time)"
              :day="day"
              :time="time"
              :employee-id="employee.id"
              @closeAddCustomers="scheduleStore.closeAddCustomers"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <ModalWindow
      :is-visible="scheduleStore.isModalVisible"
      :customer="scheduleStore.selectedCustomer"
      :day="scheduleStore.selectedDay"
      :time="scheduleStore.selectedTime"
      :employee-id="employee.id"
      @close="scheduleStore.closeModal"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useScheduleStore } from "../stores/scheduleStore.js";
import ModalWindow from "./ModalWindow.vue";
import AddCustomerModalWindow from "./AddCustomerModalWindow.vue";

const scheduleStore = useScheduleStore();

const props = defineProps({
  employee: {
    type: Object,
    required: true,
  },
});

// Извлекаем дни из workSchedule
const days = computed(() => {
  return props.employee.workSchedule.map((item) => item.day);
});

// Функция для преобразования времени в минуты
function parseTime(time) {
  const [hours, minutes] = time.split(":").map((part) => parseInt(part, 10));
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error(`Некорректное время: ${time}`);
  }
  return hours * 60 + minutes;
}

// Функция для генерации временных слотов для заданного диапазона
function generateTimeSlots(startTime, endTime) {
  const timeSlots = [];
  let startMinutes, endMinutes;
  try {
    startMinutes = parseTime(startTime);
    endMinutes = parseTime(endTime);
  } catch (error) {
    console.error(error.message);
    return [];
  }

  if (startMinutes >= endMinutes) {
    console.error(
      "Ошибка: конечное время раньше начального",
      startTime,
      endTime
    );
    return [];
  }

  for (let minutes = startMinutes; minutes <= endMinutes; minutes += 15) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const time = `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
    timeSlots.push(time);
  }

  return timeSlots;
}

// Создаём временные слоты для каждого дня
const timeSlotsByDay = computed(() => {
  const slotsByDay = {};
  props.employee.workSchedule.forEach((item) => {
    const day = item.day;
    const [startTime, endTime] = item.hours || ["00:00", "00:00"];
    if (startTime && endTime) {
      slotsByDay[day] = generateTimeSlots(startTime, endTime);
    } else {
      slotsByDay[day] = [];
    }
  });
  return slotsByDay;
});

// Получаем все возможные времена для отображения в таблице
const allPossibleTimes = computed(() => {
  const allTimes = new Set();
  Object.values(timeSlotsByDay.value).forEach((slots) => {
    slots.forEach((time) => allTimes.add(time));
  });
  return Array.from(allTimes).sort((a, b) => parseTime(a) - parseTime(b));
});

// Проверяем, входит ли время в рабочие часы для конкретного дня
function isTimeInWorkHours(day, time) {
  const slotsForDay = timeSlotsByDay.value[day] || [];
  return slotsForDay.includes(time);
}

function getScheduleEntry(customer, day, time, employeeId) {
  return customer.schedule.find(
    (s) => s.day === day && s.time === time && s.employeeId === employeeId
  );
}

onMounted(() => {
  console.log("Компонент загружен, сессии:", scheduleStore.customers);
  console.log(!scheduleStore.customers[0].schedule[0].date);
});
</script>

<style scoped>
.name {
  margin: 5px;
}

.note {
  color: rgb(243, 179, 179);
  margin-top: 5px;
}

table {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.schedule-container {
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  background: #e9ecef;
  border-radius: 8px;
  overflow-x: auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.time-header,
th,
td {
  border: 1px solid #ced4da;
  padding: 8px;
  text-align: center;
  background: #fff;
  position: relative;
}

.day-header {
  font-weight: 600;
  background: #343a40;
  color: #fff;
  padding: 12px;
  text-transform: uppercase;
  font-size: 14px;
}

.time-slot {
  font-size: 13px;
  background: #f8f9fa;
  color: #495057;
  width: 80px;
  font-weight: 500;
}

.schedule-cell {
  min-height: 50px;
  vertical-align: top;
  background: #fff;
  transition: background 0.2s;
  cursor: pointer;
}

.schedule-cell:hover:not(.inactive) {
  background: #f1f3f5;
}

/* Стиль для неактивных ячеек */
.schedule-cell.inactive {
  background: black; /* Серый фон для неактивных ячеек */
  opacity: 0.5; /* Полупрозрачность */
  cursor: not-allowed; /* Курсор, показывающий, что ячейка неактивна */
}

.add-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: #37df5c;
  opacity: 0.7;
  transition: opacity 0.2s;
  width: 100%;
  height: 100%;
}

.schedule-cell:hover .add-icon {
  opacity: 1;
}

.input-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-container input,
.input-container select {
  padding: 5px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 12px;
}

.input-container button {
  padding: 5px 10px;
  background: #37df5c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-container button:hover {
  background: #2fc24f;
}

.session {
  background: #37df5c;
  color: #fff;
  padding: 6px 8px;
  margin: 4px;
  border-radius: 4px;
  font-size: 12px;
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.session-client {
  font-weight: 500;
}

.session-employee {
  font-size: 10px;
  margin-left: 5px;
}

.session-time {
  font-size: 10px;
  opacity: 0.9;
}

h2 {
  text-align: center;
  color: #343a40;
  margin-bottom: 20px;
  font-size: 24px;
}

.employee-input {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.employee-input input {
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  flex: 1;
}

.employee-input button {
  padding: 8px 16px;
  background: #37df5c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.employee-input button:hover {
  background: #2fc24f;
}
</style>
