<script setup>
// Код компонента (EdittingModalWindow.vue)
import { computed } from "vue";
import { useScheduleStore } from "@/stores/scheduleStore";

const scheduleStore = useScheduleStore();

const props = defineProps({
  employee: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);

function closeModal() {
  scheduleStore.cancelEdittingEmployee();
  emit("close");
}

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
//   const scheduleItem = scheduleStore.edittingEmployee.workSchedule[dayIndex];
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

// function handleSubmit() {
//   scheduleStore.saveEdittingEmployee();
// }

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
</script>

<template>
  <div
    class="modal-overlay"
    v-if="scheduleStore.isEdittingEmployee"
    @click.self="closeModal"
  >
    <div class="modal-content">
      <button class="btn" @click="closeModal">✕</button>

      <div>
        <h2>Редактирование сотрудника</h2>
        <form @submit.prevent="scheduleStore.saveEdittingEmployee">
          <div>
            <label for="employeeName">ФИО сотрудника: </label>
            <input
              type="text"
              v-model="scheduleStore.edittingEmployee.name"
              id="employeeName"
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
                    scheduleStore.edittingEmployee.speciality[index - 1]
                  "
                  :name="`spec-${index + 1}`"
                  :id="`spec-${index + 1}`"
                  v-model="scheduleStore.edittingEmployee.speciality[index]"
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
                    index > 0 &&
                    scheduleStore.edittingEmployee.speciality[index]
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
            <label for="employeeEducation">Образование: </label>
            <input
              type="text"
              v-model="scheduleStore.edittingEmployee.education"
              id="employeeEducation"
            />
          </div>
          <div>
            <label for="employeeExperience">Опыт работы: </label>
            <input
              type="text"
              v-model="scheduleStore.edittingEmployee.experience"
              id="employeeExperience"
            />
          </div>
          <h3>График работы</h3>
          <div
            v-for="(scheduleItem, idx) in scheduleStore.edittingEmployee
              .workSchedule"
            :key="scheduleItem.day"
          >
            <label v-if="scheduleItem.day">{{ scheduleItem.day }} </label>
            <span>с </span>
            <select
              :name="`start-${scheduleItem.day}`"
              :id="`start-${scheduleItem.day}-${idx}`"
              v-model="scheduleItem.hours[0]"
              @change="scheduleStore.onStartTimeChange(idx, edit)"
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
            <button
              class="remove"
              title="Удалить день из расписания"
              @click.prevent="scheduleStore.removeEmployeeTime(scheduleItem)"
            >
              Х
            </button>
          </div>
          <button type="submit" class="save-button">Сохранить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
/* .speciality-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
} */
.speciality-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.speciality-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.remove {
  margin: 5px;
  border-radius: 5px;
  background-color: rgb(243, 179, 179);
  color: white;
  border: none;
}
.remove:hover {
  background-color: rgb(224, 123, 123);
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
button {
  margin-top: 10px;
}
h2,
h3 {
  text-align: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow-y: auto; /* Добавляем вертикальную прокрутку */
  max-height: 80vh; /* Ограничиваем высоту на 80% экрана */
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
form {
  display: grid;
  gap: 10px;
}
input,
select {
  border-radius: 5px;
  padding: 2px;
}
label {
  margin-right: 5px;
}
span {
  margin: 0 5px;
}
</style>
