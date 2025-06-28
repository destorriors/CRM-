<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import { computed, watchEffect } from "vue";
import ModalWindowForScheduleTemplate from "./ModalWindowForScheduleTemplate.vue";

const scheduleStore = useScheduleStore();

const date = new Date();
const dayOfWeek = date.toLocaleDateString("ru-RU", { weekday: "long" });

const employessFilteredForDaySchedule = computed(() => {
  return scheduleStore.employees.filter((val) => {
    return val.workSchedule.some((cur) => cur.day.toLowerCase() === dayOfWeek);
  });
});

function getCustomer(employeeId, time) {
  const currentCustomer = scheduleStore.customers.filter((val) => {
    return val.schedule.some((cur) => {
      return (
        cur.employeeId === employeeId &&
        cur.day.toLowerCase() === "вторник" &&
        cur.time === time
      );
    });
  });

  // console.log(currentCustomer);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Не забудь поменять день недели на динамический

  // const currentTime = currentCustomer.filter((val) => {
  //   return val.schedule.some((cur) => {
  //     return cur.day.toLowerCase() === "понедельник" && cur.time === time;
  //   });
  // });

  return currentCustomer || false;
}

function test(f, s) {
  console.log(`${f}-${s}`);
}

function click(f, s) {
  console.log(`Кликнул сюда ${f}-${s}`);
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
</script>

<template>
  <caption>
    День недели
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
          v-for="(employee, idx) in employessFilteredForDaySchedule"
          :key="`${employee}-${time}`"
          @mouseover="test(employee.id, time)"
        >
          <span
            v-if="getCustomer(employee.id, time)"
            v-for="cus in getCustomer(employee.id, time)"
            :key="cus.id"
            @click="scheduleStore.openModalWindowForScheduleTemplate"
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
      <ModalWindowForScheduleTemplate
        @close="scheduleStore.closeModalWindowForScheduleTemplate"
      />
    </tbody>
  </table>
</template>

<style scoped>
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
caption {
  text-align: center;
}
</style>

<!-- ! Так же необходимо заполнить таблицу и рассчитать время для каждой сетки -->
<!-- ! Перенести в стор скрипт -->
<!-- ! Реализовать промотку вправо или влево по дням расписания -->
<!-- ! Так же добавить взаимодействие с именами, чтобы роутером перекидывался на специалиста или клиента -->
<!-- ! Реализовать drag&drop -->
<!-- ! Реализовать напоминалку справа -->
<!-- ! Подумать как сделать напоминалку с календарем -->
