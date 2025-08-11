<script setup>
import { useRouter } from "vue-router";
import { useScheduleStore } from "@/stores/scheduleStore";
import ModalWindow from "@/components/ModalWindow.vue";
import MyButtonTemplate from "@/components/Ui/MyButtonTemplate.vue";
import ModalTemplate from "@/components/Ui/ModalTemplate.vue";
import AddSubscritionTemplate from "@/components/AddSubscritionTemplate.vue";

const props = defineProps({
  customerId: {
    type: [String, Number],
    required: true,
  },
});

const router = useRouter();

const scheduleStore = useScheduleStore();

const customerNumber = parseInt(props.customerId);

const customer = scheduleStore.customers.find((val) => {
  return val.id === customerNumber;
});

console.log(customer);

const actualEmployee = scheduleStore.employees.filter((employee) =>
  customer.specialistsId.includes(employee.id)
);

console.log(actualEmployee);

const queueEmployee = scheduleStore.employees.filter((employee) =>
  customer.queueToEmployee.includes(employee.id)
);

console.log(queueEmployee);

const isForMainEditting = true;
</script>

<template>
  <button @click="router.back()">Назад</button>

  <div>
    <h1>{{ customer.name }}</h1>
  </div>

  <div class="main-info">
    <p>Имя родителя: {{ customer.parentName }}</p>
    <p>Комментарий: {{ customer.description }}</p>
    <p>Номер телефона: {{ customer.phoneNumber }}</p>
    <button class="edit" @click="scheduleStore.openModal(customer)">
      Редактировать
    </button>
  </div>

  <div class="spec-info">
    <h3>Специалисты</h3>
    <div>
      <p><strong>Актуальные специалисты: </strong></p>
      <p
        v-if="customer.specialistsId.length !== 0"
        v-for="(employee, idx) in actualEmployee"
        :key="employee.id"
      >
        ({{ idx + 1 }}) {{ employee.name }}
      </p>
      <p v-else>Нет актуального специалиста !</p>
    </div>
    <div v-if="queueEmployee.length !== 0">
      <p><strong>В очереди: </strong></p>
      <p
        v-for="(emp, idx) in queueEmployee"
        :key="`${emp.id}-${idx}-queueEmploye`"
      >
        ({{ idx + 1 }}) {{ emp.name }}
      </p>
    </div>
  </div>

  <div class="sub-info">
    <h3>Абонементы</h3>
    <my-button-template @click="scheduleStore.openSubModal" class="btn2"
      >Создать абонемент</my-button-template
    >

    <div
      v-for="(subscription, idx) in customer.subscription"
      :key="subscription.typeOfSubs"
      v-if="customer.subscription.length !== 0"
    >
      <p>
        ({{ idx + 1 }}) {{ subscription.typeOfSubs || "Нет данных" }} на
        {{ subscription.timeSub || "Не указано" }}, осталось
        {{ subscription.howMuchSubLeft ?? "Не указано" }} занятий
      </p>
      <my-button-template
        @click="scheduleStore.addLessonForSub(customerNumber, idx)"
        :class="{ 'button-disabled': subscription.howMuchSubLeft >= 30 }"
        >Добавить занятие</my-button-template
      >
      <my-button-template
        :red="true"
        @click="scheduleStore.removeLessonForSub(customerNumber, idx)"
        :class="{ 'button-disabled': subscription.howMuchSubLeft <= 0 }"
        >Убрать занятие</my-button-template
      >
    </div>
    <div v-else>
      <h2>Нет абонемента !</h2>
    </div>
  </div>
  <!-- - Вот тут подумать над оформлением -->
  <div class="history">
    <h3>История</h3>
    <div
      v-for="(history, index) in customer.history"
      :key="`${customer}-${index}-history`"
      v-if="customer.history.length != 0"
    >
      <span>
        {{ `Клиент ${history.presents ? "пришел" : "не пришел"}` }}
      </span>
      <span v-if="!history.subLoss">{{
        `Клиент ${history.payed ? "оплатил" : "не оплатил"}`
      }}</span>
      <span>{{ `${history.subLoss ? "Списан абонемент" : ""}` }}</span>
      <span>Дата: {{ history.date }}</span>
      <span>Время: {{ history.time }}</span>
    </div>
    <div class="absent-history" v-else>
      <h2>История отсутствует</h2>
    </div>
  </div>

  <ModalWindow
    :is-visible="scheduleStore.isModalVisible"
    :customer="scheduleStore.selectedCustomer"
    :editting-from-main="isForMainEditting"
    @close="scheduleStore.closeModal"
  />
  <ModalTemplate
    :is-visible="scheduleStore.newSubIsOpen"
    title="Создание абонемента"
    @close="scheduleStore.closeSubModal"
  >
    <AddSubscritionTemplate :customer-id="customerNumber" />
  </ModalTemplate>
</template>

<style scoped>
.btn2 {
  background-color: purple;
  display: block; /* Убеждаемся, что кнопка — блочный элемент */
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
}
.btn2:hover {
  background-color: rgb(86, 1, 86);
}
.button-disabled {
  border-radius: 8px;
  background-color: rgb(210, 203, 203);
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  margin-top: 8px;
  margin-left: 8px;
}
.button-disabled:hover {
  background-color: rgb(210, 203, 203);
  transform: none;
  box-shadow: none;
}
button.edit {
  background-color: blueviolet;
}
button.edit:hover {
  background-color: rgb(113, 37, 184);
}
.sub-info {
  margin-top: 15px;
  border: 1px solid black;
  padding: 15px;
}
.spec-info {
  margin-top: 15px;
  border: 1px solid black;
  padding: 15px;
}
.main-info {
  border: 1px solid black;
  padding: 15px;
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
