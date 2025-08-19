<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import { computed, watchEffect } from "vue";
import ModalWindowForScheduleTemplate from "./ModalWindowForScheduleTemplate.vue";
import { isToday } from "date-fns";
import { useRouter } from "vue-router";

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

const router = useRouter();

function forRoterPath(employeeId) {
  const findedEmployee = scheduleStore.employees.find((val) => {
    return val.id === employeeId;
  });

  const findedSpec = scheduleStore.specialization.find((val) => {
    return (
      val.name.toLowerCase() === findedEmployee.speciality[0].toLowerCase()
    );
  });

  return findedSpec.forRouterPath || null;
}

const checkSchedule = computed(() => {
  return scheduleStore.customers.some((s) => {
    return s.schedule?.some((s) => {
      return s.date === scheduleStore.date;
    });
  });
});

watchEffect(() => {
  // console.log(employessFilteredForDaySchedule.value);
  // console.log(scheduleStore.dayOfWeek);
  // console.log(
  //   scheduleStore.customers[0].schedule.find((val) => {
  //     return val.day === "Понедельник";
  //   })
  // );

  // console.log(isToday(scheduleStore.now));
  // console.log(scheduleStore.date);

  // console.log(forRoterPath(0));

  console.log(checkSchedule.value);
});

// watch(
//   scheduleStore.customers,
//   (newValue, oldValue) => {
//     console.log(`Изменились пассажиры ${newValue} а вот старое`, oldValue);
//   },
//   { deep: true }
// );
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
          class="employees-names"
          v-for="(employee, idx) in employessFilteredForDaySchedule"
          :key="employee.id"
          @click="
            router.push(`employees/${forRoterPath(employee.id)}/${employee.id}`)
          "
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
            class="customers"
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
            <span v-if="!checkSchedule" v-for="cusSchedule in cus.schedule">
              <span
                v-if="
                  cusSchedule.employeeId === employee.id &&
                  cusSchedule.time === time &&
                  cusSchedule.date === false
                "
              >
                Имя ребенка: {{ cus.name }}
                <hr />
                Заментка на день: {{ cusSchedule.description }}
              </span>
            </span>

            <span v-if="checkSchedule" v-for="cusSchedule2 in cus.schedule">
              <span
                v-if="
                  cusSchedule2.employeeId === employee.id &&
                  cusSchedule2.time === time &&
                  cusSchedule2.date === scheduleStore.date
                "
              >
                ЗАЛУПА Имя ребенка: {{ cus.name }}
                <hr />
                Заментка на день: {{ cusSchedule2.description }}
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
/* .main-table {
  box-sizing: border-box;
  width: 100px;
  height: 100px;
} */
.customers {
  cursor: pointer;
}
.employees-names {
  cursor: pointer;
}
.employees-names:hover {
  background-color: rgb(210, 207, 207);
}
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

<!-- - блЯТЬ, ВНАТУРЕ ДЕЛО В ОТОБРАЖЕНИИ, ХУИТА, КОТОРАЯ НЕ ДОЛЖНА ПОПАДАТЬ В ТАБЛИЦУ, НЕ ДОЛЖНА ТУПО ОТОБРАЖАТСЯ -->
<!-- - ВНАТУРЕ ДОСТАТОЧНО ПРОСТО ДОБАВИТЬ ЕЩЕ ОДИН ПУНКТ, ВМЕСТО КОПИРОВАНИЯ ВСЕЙ ТАБЛИЦЫ -->
<!-- - Что делать  -->
<!-- - 1 - Сделай функцию компутед или какуюто переборку, для того, чтобы проверять у каждого элемента в schedule true или дата стоит в date, нужно для того, чтобы отделить две таблицы друг от друга -->
<!-- - 2 - Создать автодобавлятор времени на главную страницу с датой, чтобы потом отображать только данные с датой -->
<!-- - 3 - Отфильтровать уже на главной странице данные, которые не содержать date:false -->
<!-- - 4 - Изменить drag & drop так, чтобы только данные с датами менялись и удалялись, а оригиналье трогались, но тут нужно подумать куда пропихнуть функцию добавления времени, чтобы данные не копировались снова при обновлении страницы, тут нужно подумать, скорее всего поставить watcher, чтобы он смотрел и не позволял копировать данные, которые будут дублироватся -->
<!-- - 5 - Протестировать это с добавлением новых клиентов и т.д. -->
<!-- - 6 - Так же добавить возможность добавления клиентов на главную, с пунктами, которые позволять добавить сразу в расписание к сотруднику, либо же добавлять только на главную -->

<!-- - Блокируй возможнось в будущем или прошлом подтверждать данные, только на сегодняшний день -->

<!-- - ГЛАВНАЯ ЗАДАЧА -->
<!-- - НЕОБХОДИМО РЕАЛИЗОВАТЬ ВРЕМЯ, ДЛЯ ТОГО, ЧТОБЫ МОЖНО БЫЛО ОТДЕЛИТЬ ДАННЫЕ ДВУХ ТАБЛИЦ ДРУГ ОТ ДРУГА -->
<!-- - СЕЙЧАС КАКАЯ ПРОБЛЕМА, КЛИЕНТЫ ЗАПИСАННЫЕ ЧЕРЕЗ ОСНОВНУЮ ТАБЛИЦУ НЕ ИМЕЮТ ДАТЫ, ТОЛЬКО ДЕНЬ НЕДЕЛИ -->
<!-- - ЭТО ЗНАЧИТ, ЧТО НЕОБХОДИМО СДЕЛАТЬ УНИКАЛЬНЫЙ ДЕНЬ, В КОТОРОМ МОЖНО ДЕЛАТЬ ПРАВКИ, А УНИКАЛЬНОСТЬ ПРИДАСТ ТОЧНАЯ ДАТА -->
<!-- - ИДЕЯ КАКАЯ - КЛИЕНТЫ ЗАПИСАННЫЕ У СПЕЦОВ ДОЛЖНЫ ОТОБРАЖАТСЯ ПО УМОЛЧАНИЮ НЕЗАВИСИМО ОТ ДАТЫ, НО ИЗМЕНЕНИЯ ДОЛЖНЫ ЗАВИСЕТЬ ИСКЛЮЧИТЕЛЬНО ОТ ДАТЫ -->

<!-- ! Реализовать напоминалку справа -->
<!-- ! Подумать как сделать напоминалку с календарем -->

<!-- - Необходимо переделать drag & drop, так чтобы при перемещении создавалась копия в расписании, и при этом основное расписание не затрагивалось -->
