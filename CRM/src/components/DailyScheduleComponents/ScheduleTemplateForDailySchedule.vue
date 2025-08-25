<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import { computed, watchEffect } from "vue";
import ModalWindowForScheduleTemplate from "./ModalWindowForScheduleTemplate.vue";
import { isToday } from "date-fns";
import { useRouter } from "vue-router";
import AddCustomerModalWindow from "../AddCustomerModalWindow.vue";

const scheduleStore = useScheduleStore();

const employessFilteredForDaySchedule = computed(() => {
  return scheduleStore.employees.filter((val) => {
    return val.workSchedule.some(
      (cur) => cur.day.toLowerCase() === scheduleStore.dayOfWeek
    );
  });
});

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

watchEffect(() => {
  console.log(scheduleStore.checkSchedule);
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
          @mouseover="scheduleStore.showAddIconForMainPage(idx, time)"
          @mouseleave="scheduleStore.hideAddIconForMainPage"
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
            <span
              v-if="!scheduleStore.checkSchedule"
              v-for="cusSchedule in cus.schedule"
            >
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

            <span
              v-if="scheduleStore.checkSchedule"
              v-for="cusSchedule2 in cus.schedule"
            >
              <span
                v-if="
                  cusSchedule2.employeeId === employee.id &&
                  cusSchedule2.time === time &&
                  cusSchedule2.date === scheduleStore.date
                "
              >
                <span> ЗАЛУПА Имя ребенка: {{ cus.name }} </span>

                <span v-if="cusSchedule2.description">
                  <hr />
                  Заментка на день: {{ cusSchedule2.description }}
                </span>
              </span>
            </span>
          </span>
          <span
            class="add-icon"
            v-if="
              scheduleStore.isAddIconForMainPageVisible(idx, time) &&
              !scheduleStore.getCustomerForMainPage(employee.id, time).length
            "
            @click.stop="
              scheduleStore.openModalForMainPageToAddCustomer(idx, time)
            "
          >
            +
          </span>
          <Transition name="fade">
            <AddCustomerModalWindow
              v-if="
                scheduleStore.isOpeneModalForMainPageTable &&
                scheduleStore.isAddIconForMainPageVisible(idx, time)
              "
              :for-main-table="true"
              :is-visible="scheduleStore.isAddIconForMainPageVisible(idx, time)"
              :day="scheduleStore.dayOfWeek"
              :time="time"
              @closeAddCustomers="scheduleStore.closeAddingCustomersToMainTable"
              :employee-id="employee.id"
            />
          </Transition>
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
.add-icon {
  position: relative;
  background-color: rgba(44, 160, 255, 0.138);
  cursor: pointer;
  text-align: center;
  border: 1px solid black;
  border-radius: 10px;
}

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
.fade-enter-active,
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
}

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

<!-- - Блокируй возможнось в будущем или прошлом подтверждать данные, только на сегодняшний день -->

<!-- ! Реализовать напоминалку справа -->
<!-- ! Подумать как сделать напоминалку с календарем -->
