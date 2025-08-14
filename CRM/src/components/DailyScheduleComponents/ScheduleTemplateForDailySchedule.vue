<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import { computed, watchEffect } from "vue";
import ModalWindowForScheduleTemplate from "./ModalWindowForScheduleTemplate.vue";
import { isToday } from "date-fns";

const scheduleStore = useScheduleStore();

const employessFilteredForDaySchedule = computed(() => {
  return scheduleStore.employees.filter((val) => {
    return val.workSchedule.some(
      (cur) => cur.day.toLowerCase() === scheduleStore.dayOfWeek
    );
  });
});

// function test(f, s) {
//   console.log(`${f}-${s}`);
// }

watchEffect(() => {
  console.log(employessFilteredForDaySchedule.value);
  console.log(scheduleStore.dayOfWeek);
  console.log(
    scheduleStore.customers[0].schedule.find((val) => {
      return val.day === "Понедельник";
    })
  );

  console.log(isToday(scheduleStore.now));
  console.log(scheduleStore.date);
});
</script>

<template>
  <div class="cap">
    <my-button-template
      v-if="!isToday(scheduleStore.now)"
      @click="scheduleStore.currentDayChange()"
      >Вернутся</my-button-template
    >
    <my-button-template @click="scheduleStore.previousDayChange()"
      >Назад</my-button-template
    >
    <caption>
      {{
        scheduleStore.dayOfWeek.toLocaleUpperCase()
      }}
      ({{
        scheduleStore.date
      }})
    </caption>
    <my-button-template @click="scheduleStore.nextDayChange()"
      >Вперед</my-button-template
    >
  </div>

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
          @dragover="scheduleStore.onDragOver"
          @drop="scheduleStore.onDrop($event, employee.id, time)"
        >
          <span
            v-if="scheduleStore.getCustomerForMainPage(employee.id, time)"
            v-for="cus in scheduleStore.getCustomerForMainPage(
              employee.id,
              time
            )"
            :key="cus.id"
            draggable="true"
            @dragstart="
              scheduleStore.onDragStart($event, cus, employee.id, time)
            "
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
.cap {
  display: flex;
  justify-content: center;
  align-items: center;
}
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

<!-- - Найди все date и сделай динамическими -->
<!-- - Так же сделай так, чтобы после того, как покидалась страница расписания дата менялась -->
<!-- - Добавь дату для будущих или предстоящих событий в зарплате -->
<!-- - Блокируй возможнось в будущем или прошлом подтверждать данные, только на сегодняшний день -->
<!-- - Удали эти коменты, чтобы они не засирали собой функцию -->

<!-- - ГЛАВНАЯ ЗАДАЧА -->
<!-- - НЕОБХОДИМО РЕАЛИЗОВАТЬ ВРЕМЯ, ДЛЯ ТОГО, ЧТОБЫ МОЖНО БЫЛО ОТДЕЛИТЬ ДАННЫЕ ДВУХ ТАБЛИЦ ДРУГ ОТ ДРУГА -->
<!-- - СЕЙЧАС КАКАЯ ПРОБЛЕМА, КЛИЕНТЫ ЗАПИСАННЫЕ ЧЕРЕЗ ОСНОВНУЮ ТАБЛИЦУ НЕ ИМЕЮТ ДАТЫ, ТОЛЬКО ДЕНЬ НЕДЕЛИ -->
<!-- - ЭТО ЗНАЧИТ, ЧТО НЕОБХОДИМО СДЕЛАТЬ УНИКАЛЬНЫЙ ДЕНЬ, В КОТОРОМ МОЖНО ДЕЛАТЬ ПРАВКИ, А УНИКАЛЬНОСТЬ ПРИДАСТ ТОЧНАЯ ДАТА -->
<!-- - ИДЕЯ КАКАЯ - КЛИЕНТЫ ЗАПИСАННЫЕ У СПЕЦОВ ДОЛЖНЫ ОТОБРАЖАТСЯ ПО УМОЛЧАНИЮ НЕЗАВИСИМО ОТ ДАТЫ, НО ИЗМЕНЕНИЯ ДОЛЖНЫ ЗАВИСЕТЬ ИСКЛЮЧИТЕЛЬНО ОТ ДАТЫ -->

<!-- ! Так же добавить взаимодействие с именами, чтобы роутером перекидывался на специалиста или клиента -->
<!-- ! Реализовать напоминалку справа -->
<!-- ! Подумать как сделать напоминалку с календарем -->

<!-- - Остановился на том, чтобы реализовать промотку вперед и назад по расписанию -->
<!-- - Для этого нужно прописать дату в сторе, на ее основе сделать динамику и с помощью библиотеки fs реализовать даты -->
<!-- - Необходимо переделать drag & drop, так чтобы при перемещении создавалась копия в расписании, и при этом основное расписание не затрагивалось -->
<!-- - Для этого, скорее всего понадобится сделать копию всего расписания или чет подшаманить -->
<!-- - Так же нужно реализовать перемотку с правильной последовательностью -->
