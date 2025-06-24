<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import { computed, watchEffect } from "vue";

const scheduleStore = useScheduleStore();

const date = new Date();
const dayOfWeek = date.toLocaleDateString("ru-RU", { weekday: "long" });

const employessFilteredForDaySchedule = computed(() => {
  return scheduleStore.employees.filter((val) => {
    return val.workSchedule.some((cur) => cur.day.toLowerCase() === dayOfWeek);
  });
});

watchEffect(() => {
  console.log(employessFilteredForDaySchedule.value);
  console.log(dayOfWeek);
});
</script>

<template>
  <caption>
    День недели
  </caption>
  <table>
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
      <tr>
        <th>Время</th>
        <td>Колонка</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
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

<!-- ! Остановился на том нужно ли подключать дополнительную библеотеку date-fns для работы с датами, или использовать новые функции js из видео -->
<!-- ! Так же необходимо заполнить таблицу и рассчитать время для каждой сетки -->
<!-- ! Перенести в стор скрипт -->
<!-- ! Реализовать промотку вправо или влево по дням расписания -->
<!-- ! Так же добавить взаимодействие с именами, чтобы роутером перекидывался на специалиста или клиента -->
<!-- ! Реализовать drag&drop -->
<!-- ! Реализовать напоминалку справа -->
<!-- ! Подумать как сделать напоминалку с календарем -->
