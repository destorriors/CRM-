<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import { computed, ref, watchEffect } from "vue";
import ModalWindowForScheduleTemplate from "./ModalWindowForScheduleTemplate.vue";

const scheduleStore = useScheduleStore();

const date = new Date();
// ! Динамический день недели
// const dayOfWeek = date.toLocaleDateString("ru-RU", { weekday: "long" });

// ! Это временная заглушка
const dayOfWeek = "вторник";

const employessFilteredForDaySchedule = computed(() => {
  return scheduleStore.employees.filter((val) => {
    return val.workSchedule.some((cur) => cur.day.toLowerCase() === dayOfWeek);
  });
});

function test(f, s) {
  console.log(`${f}-${s}`);
}

watchEffect(() => {
  console.log(employessFilteredForDaySchedule.value);
  console.log(dayOfWeek);
  console.log(
    scheduleStore.customers[0].schedule.find((val) => {
      return val.day === "Понедельник";
    })
  );
});

const draggedCustomer = ref(null);

// Начало перетаскивания
const onDragStart = (event, customer, employeeId, time) => {
  draggedCustomer.value = { customer, employeeId, time };
  event.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ customerId: customer.id, employeeId, time })
  );
  event.dataTransfer.effectAllowed = "move";
  console.log("Старт перетаскивания");
};

// Перетаскивание над ячейкой
const onDragOver = (event) => {
  event.preventDefault(); // Разрешаем drop
};

// Завершение перетаскивания (drop)
const onDrop = (event, targetEmployeeId, targetTime) => {
  event.preventDefault();
  if (draggedCustomer.value) {
    const { customer, employeeId, time } = draggedCustomer.value;
    const customerIndex = scheduleStore.customers.findIndex(
      (c) => c.id === customer.id
    );

    if (customerIndex !== -1) {
      // Удаляем клиента из старого расписания
      const oldScheduleIndex = scheduleStore.customers[
        customerIndex
      ].schedule.findIndex(
        (s) => s.employeeId === employeeId && s.time === time
      );
      if (oldScheduleIndex !== -1) {
        scheduleStore.customers[customerIndex].schedule.splice(
          oldScheduleIndex,
          1
        );
      }

      // Добавляем клиента в новое расписание
      scheduleStore.customers[customerIndex].schedule.push({
        day: dayOfWeek,
        time: targetTime,
        employeeId: targetEmployeeId,
        description: customer.schedule[0]?.description || "",
      });

      draggedCustomer.value = null; // Сбрасываем перетаскиваемый элемент
    }
  }
};
</script>

<template>
  <caption>
    {{
      dayOfWeek.toLocaleUpperCase()
    }}
  </caption>
  <table class="main-table">
    <thead>
      <tr>
        <th></th>
        <th
          v-for="(employee, idx) in employessFilteredForDaySchedule"
          :key="employee.id"
        >
          {{ employee.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(time, idx) in scheduleStore.timeOptions" :key="time[idx]">
        <th>{{ time }}</th>
        <td
          draggable="false"
          v-for="(employee, idx) in employessFilteredForDaySchedule"
          :key="`${employee}-${time}`"
          @mouseover="test(employee.id, time)"
          @dragover="onDragOver"
          @drop="onDrop($event, employee.id, time)"
        >
          <span
            v-if="scheduleStore.getCustomerForMainPage(employee.id, time)"
            v-for="cus in scheduleStore.getCustomerForMainPage(
              employee.id,
              time
            )"
            :key="cus.id"
            draggable="true"
            @dragstart="onDragStart($event, cus, employee.id, time)"
            @click="
              scheduleStore.openModalWindowForScheduleTemplate(
                employee.id,
                time
              )
            "
          >
            <span v-for="cusSchedule in cus.schedule">
              <span
                v-if="
                  cusSchedule.employeeId === employee.id &&
                  cusSchedule.time === time
                "
              >
                Имя ребенка: {{ cus.name }}
                <hr />
                Заментка на день: {{ cusSchedule.description }}
              </span>
            </span>
          </span>
        </td>
      </tr>

      <!-- ! Разобраться с тэгом transition, он помогает в анимация при рендере компонента -->
      <Transition name="fade">
        <ModalWindowForScheduleTemplate
          @close="scheduleStore.closeModalWindowForScheduleTemplate"
          :customer="scheduleStore.choosenCustomer"
          :employee-id="scheduleStore.selectedIdAndTimeForMain.id"
          :time="scheduleStore.selectedIdAndTimeForMain.time"
          title="Управление клиентом"
        />
      </Transition>
    </tbody>
  </table>
</template>

<!-- ! Стили для тега transition, который позволяет настроить анимации -->
<style scoped>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
} */

/* .main-table {
  position: relative;
  left: 3vw;
  right: 3vw;
} */

span {
  display: block;
}
td,
th,
thead,
tbody {
  border: 1px solid black;
  padding: 10px;
}
/* td:hover {
  transform: scale(1.5, 1.5);
  box-shadow: 1px;
} */
caption {
  display: block;
  text-align: center;
  margin: 15px;
  font-weight: 800;
}
</style>

<!-- ! Так же необходимо заполнить таблицу и рассчитать время для каждой сетки -->
<!-- ! Перенести в стор скрипт -->
<!-- ! Реализовать промотку вправо или влево по дням расписания -->
<!-- ! Так же добавить взаимодействие с именами, чтобы роутером перекидывался на специалиста или клиента -->
<!-- ! Реализовать напоминалку справа -->
<!-- ! Подумать как сделать напоминалку с календарем -->

<!-- - Реализовать drag&drop -->
