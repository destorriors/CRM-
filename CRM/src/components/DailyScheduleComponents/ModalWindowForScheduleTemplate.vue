<script setup>
import { defineEmits, defineProps, watchEffect } from "vue";
import ModalTemplate from "../Ui/ModalTemplate.vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import PaymentForScheduleModal from "./PaymentForScheduleModal.vue";

// import MyButtonTemplate from "../Ui/MyButtonTemplate.vue";

import InfoForScheduleModal from "./InfoForScheduleModal.vue";

const scheduleStore = useScheduleStore();

const props = defineProps({
  customer: {
    type: [Array, null],
    required: true,
  },
  employeeId: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}

// const filteredSubByEmployeeSpec = computed(() => {
//   const finded = scheduleStore.employees.find((emp) => {
//     return +emp.id === +props.employeeId;
//   });

//   return finded || null;
// });

watchEffect(() => {
  console.log(props.customer);
  // console.log(filteredSubByEmployeeSpec.value);
});
</script>

<template>
  <modal-template
    :is-visible="scheduleStore.isModalWindowForScheduleTemplateVisible"
    @close="closeModal"
  >
    <InfoForScheduleModal
      :customer="scheduleStore.choosenCustomer"
      :employee-id="scheduleStore.selectedIdAndTimeForMain.id"
      :time="scheduleStore.selectedIdAndTimeForMain.time"
    />

    <PaymentForScheduleModal />

    <!-- <div v-for="customer in props.customer" :key="customer.id">
      <div
        v-for="(scheduleCus, idx) in customer.schedule"
        :key="`${customer.id}-${idx}`"
      >
        <div
          v-if="
            scheduleCus.employeeId === props.employeeId &&
            scheduleCus.time === props.time
          "
        >
          <span>
            {{ customer.name }}
          </span>
          <span>
            {{ scheduleCus.description }}
          </span>
          <div
            v-for="(subscription, index) in customer.subscription"
            :key="`${customer.id}-${index}-subscription`"
          >
            <span
              v-if="
                filteredSubByEmployeeSpec.speciality.includes(
                  subscription.typeOfSubs
                )
              "
            >
              {{ subscription.typeOfSubs }}: {{ subscription.howMuchSubLeft }} -
              {{ subscription.timeSub }}
              <my-button-template
                :red="true"
                @click="
                  scheduleStore.removeLessonForSub(
                    customer.id,
                    index,
                    props.employeeId
                  )
                "
                >Списать</my-button-template
              >
            </span>

            <span v-else-if="customer.subscription.length === 0">
              Нет абонемента!
            </span>
          </div>
          <div class="didnt-visit">
            <my-button-template
              @click="
                scheduleStore.calculateLessonWithoutSubForEmployeeSalary(
                  props.employeeId
                )
              "
              >Клиент оплатил</my-button-template
            >
            <my-button-template>Клиент не пришел</my-button-template>
          </div>
        </div>
      </div>
    </div> -->

    <!-- ! Остановился тут для того, чтобы работал пересчет зп сотруднику на пришел-не пришел, необходимо сначал сделать функционал добавления клиента в таблицу -->
    <!-- ! Необходимо добавить функционал в уже существующий при добавлении клиентов, тоесть необходимо добавить поле время занятия -->
    <!-- ! Все-таки решил сделать вручную оплату по времени, так как один клиент без абика может ходить к разным спецам с разным временем, поэтому нужно сделать вручную -->
    <!-- ! Крч, задействуй отдельно созданный компонент под это все -->
    <!-- ! Необходимо сделать функционал оплаты без абика разового занятия основываясь на ценах -->
    <!-- ! Дополнительно сделал универсальные функции добавления дохода/расхода -->
    <!-- ! Так же необходимо вместо этой кнопки, если есть абик, то списывать абик -->
    <!-- ! Вот тут еще не делал функционал, только кнопку для вида -->
    <!-- ! Необходимо прописать функцию и динамические стили, чтобы при нажатии, во первых всплывало окно списать или не списывать абонемент, а во вторых закрасить ячейку в таблице -->
    <!-- ! Для этого необходимо сделать общую переменную состояния -->
  </modal-template>
</template>

<style scoped>
.didnt-visit {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
span {
  display: block;
  margin-top: 15px;
}
</style>

<!-- ! Так же что делать с другими пустыми ячейками, какую модалку туда запихнуть и какую инфу отображать, скорее всего быстрая запись кого-нибудь -->
