<script setup>
import ScheduleTable from "@/components/ScheduleTable.vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import { useRouter } from "vue-router";
import EdittingModalWindow from "@/components/EdittingModalWindow.vue";

const scheduleStore = useScheduleStore();

const props = defineProps({
  employeeId: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
});

const employeeNumber = parseInt(props.employeeId);
const employee = scheduleStore.employees.find((emp) => {
  return emp.id === employeeNumber;
});

const router = useRouter();

function info(customer) {
  console.log(customer);
}
</script>

<template>
  <div>
    <button @click="router.back()">Назад</button>
    <button
      class="delete"
      @click="scheduleStore.deleteEmployee(employeeNumber, router)"
    >
      Удалить сотрудника
    </button>
  </div>

  <h1>{{ employee.name }}</h1>
  <div class="head">
    <div class="left-column">
      <p>
        <strong>Специальность:</strong> {{ employee.speciality.join(" , ") }}
      </p>
    </div>
    <div>
      <p>
        <strong>Образование:</strong> {{ employee.education || "Не указано" }}
      </p>
    </div>
    <div>
      <p>
        <strong>Опыт работы:</strong> {{ employee.experience || "Не указано" }}
      </p>
    </div>
    <p><strong>График работы:</strong></p>
    <div v-for="day in employee.workSchedule" :key="day.day">
      <p>
        {{ day.day }}: <span>с {{ day.hours[0] }} по {{ day.hours[1] }}</span>
      </p>
    </div>
    <p>{{ `Номер сотрудника ${employeeId}` }}</p>
    <div>
      <button class="edit" @click="scheduleStore.editEmployee(employee)">
        Редактировать данные сотрудника
      </button>
    </div>

    <div class="right-column">
      <h3>Клиенты в очереди:</h3>
      <div
        v-if="scheduleStore.getCustomersQueue(employeeNumber).length !== 0"
        class="queue"
        v-for="customer in scheduleStore.getCustomersQueue(employeeNumber)"
        @click="scheduleStore.openModal(customer)"
      >
        {{ customer.name }},
        {{ customer.description }}
      </div>
      <div v-else>
        <h2>Нет клиентов в очереди</h2>
      </div>
      <button class="edit" @click="scheduleStore.showInput">
        Добавить клиента в очередь
      </button>
    </div>
  </div>

  <EdittingModalWindow
    :employee="employee"
    @close="scheduleStore.closeModalEditting"
  />
  <div>
    <ScheduleTable :employee="employee" />
  </div>
  <!-- <AddCustomerModalWindow
              v-if="
                isTimeInWorkHours(day, time) &&
                scheduleStore.isInputVisible(day, time)
              "
              :is-visible="scheduleStore.isInputVisible(day, time)"
              :day="day"
              :time="time"
              @closeAddCustomers="scheduleStore.closeAddCustomers"
              :employee-id="employee.id"
            /> -->
</template>

<style scoped>
h2 {
  color: rgb(243, 179, 179);
}
.queue {
  border: 1px solid black;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
  background-color: rgb(243, 213, 217);
}
.queue:hover {
  background-color: rgb(242, 180, 188);
  cursor: pointer;
}
.head {
  display: flex;
  flex-direction: column;
}

.delete {
  background-color: darkred;
  float: right;
}
.delete:hover {
  background-color: rgb(70, 0, 0);
}
.edit {
  background-color: #5f3e67;
  border: 1px solid;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 5px;
  cursor: pointer;
  padding: 15px;
  color: white;
}
.edit:hover {
  background-color: #3c2b40;
}
button {
  background-color: #37df5c;
  border: 1px solid;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 5px;
  cursor: pointer;
  padding: 15px;
  color: white;
}
button:hover {
  background-color: #37df5c;
}
h1 {
  text-align: center;
}
</style>
