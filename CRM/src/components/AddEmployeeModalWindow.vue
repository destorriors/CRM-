<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";

const scheduleStore = useScheduleStore();

const specs = [
  "Нейропсихолог",
  "Логопед-дефектолог",
  "Дефектолог",
  "Психолог",
  "Невролог",
  "Психиатр",
  "Эпилептолог",
  "Остеопат",
];

// const days = [
//   "Понедельник",
//   "Вторник",
//   "Среда",
//   "Четверг",
//   "Пятница",
//   "Суббота",
//   "Воскресенье",
// ];

// const timeOptions = computed(() => {
//   const times = [];
//   for (let hour = 9; hour <= 21; hour++) {
//     for (let minute = 0; minute < 60; minute += 15) {
//       if (hour === 21 && minute > 0) break;
//       const time = `${hour.toString().padStart(2, "0")}:${minute
//         .toString()
//         .padStart(2, "0")}`;
//       times.push(time);
//     }
//   }
//   return times;
// });

// const timeToMinutes = (time) => {
//   if (!time) return 0;
//   const [hours, minutes] = time.split(":").map(Number);
//   return hours * 60 + minutes;
// };

// const getEndTimeOptions = (startTime) => {
//   if (!startTime) return timeOptions.value;
//   const startMinutes = timeToMinutes(startTime);
//   return timeOptions.value.filter((time) => {
//     const endMinutes = timeToMinutes(time);
//     return endMinutes >= startMinutes + 15;
//   });
// };

// const onStartTimeChange = (dayIndex) => {
//   const scheduleItem = scheduleStore.temporaryData.workSchedule[dayIndex];
//   const startTime = scheduleItem.hours[0];
//   const endTime = scheduleItem.hours[1];

//   if (startTime && endTime) {
//     const startMinutes = timeToMinutes(startTime);
//     const endMinutes = timeToMinutes(endTime);
//     if (endMinutes <= startMinutes) {
//       const endTimeOptions = getEndTimeOptions(startTime);
//       scheduleItem.hours[1] = endTimeOptions[0] || "";
//     }
//   }
// };
</script>

<template>
  <div class="modal-overlay" @click.self="scheduleStore.closeAddEmployee">
    <div class="modal-content">
      <div>
        <button class="btn" @click="scheduleStore.closeAddEmployee">✕</button>
      </div>
      <h2>Добавление сотрудника</h2>
      <form @submit.prevent="scheduleStore.saveAddEmployee">
        <div>
          <label for="name">ФИО: </label>
          <input
            type="text"
            v-model="scheduleStore.temporaryData.name"
            v-focus
          />
        </div>
        <div class="speciality-wrapper">
          <label>Специальность:</label>
          <div class="speciality-container">
            <div
              v-for="(spec, index) in 6"
              :key="index"
              class="speciality-item"
            >
              <select
                v-if="
                  index === 0 ||
                  scheduleStore.temporaryData.speciality[index - 1]
                "
                :name="`spec-${index + 1}`"
                :id="`spec-${index + 1}`"
                v-model="scheduleStore.temporaryData.speciality[index]"
              >
                <option value="" disabled>Не выбрано</option>
                <option
                  v-for="spec in specs"
                  :key="`${spec}-${index + 1}`"
                  :value="spec"
                >
                  {{ spec }}
                </option>
              </select>
              <button
                v-if="
                  index > 0 && scheduleStore.temporaryData.speciality[index]
                "
                class="remove"
                @click.prevent="scheduleStore.removeEmployeeSpeciality(index)"
              >
                Х
              </button>
            </div>
          </div>
        </div>
        <div>
          <label for="education">Образование:</label>
          <input type="text" v-model="scheduleStore.temporaryData.education" />
        </div>
        <div>
          <label for="experience">Опыт работы:</label>
          <input type="text" v-model="scheduleStore.temporaryData.experience" />
        </div>

        <h2>График работы</h2>
        <div
          v-for="(scheduleItem, idx) in scheduleStore.temporaryData
            .workSchedule"
          :key="scheduleItem.day"
        >
          <label v-if="scheduleItem.day">{{ scheduleItem.day }} </label>
          <span>с </span>
          <select
            :name="`start-${scheduleItem.day}`"
            :id="`start-${scheduleItem.day}-${idx}`"
            v-model="scheduleItem.hours[0]"
            @change="scheduleStore.onStartTimeChange(idx, 'add')"
          >
            <option value="" disabled>Не выбрано</option>
            <option
              v-for="time in scheduleStore.timeOptions"
              :key="time"
              :value="time"
            >
              {{ time }}
            </option>
          </select>
          <span>по </span>
          <select
            :name="`end-${scheduleItem.day}`"
            :id="`end-${scheduleItem.day}-${idx}`"
            v-model="scheduleItem.hours[1]"
            :disabled="!scheduleItem.hours[0]"
          >
            <option value="" disabled>Не выбрано</option>
            <option
              v-for="time in scheduleStore.getEndTimeOptions(
                scheduleItem.hours[0]
              )"
              :key="time"
              :value="time"
            >
              {{ time }}
            </option>
          </select>
          <!-- <button
              class="remove"
              title="Удалить день из расписания"
              @click.prevent="scheduleStore.removeEmployeeTime(scheduleItem)"
            >
              Х
            </button> -->
        </div>
        <button
          type="submit"
          class="saveButton"
          :disabled="scheduleStore.temporaryData.speciality.length === 0"
        >
          Сохранить
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.saveButton:disabled {
  background-color: lightgray;
}
.saveButton:disabled:hover {
  background-color: lightgray;
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

<!-- ! Разобраться с графиком работы, как организовать логику добавления -->
<!-- ! Скорее всего попробовать переиспользовать данные из редактирования сотрудника -->
