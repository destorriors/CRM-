<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import MyButtonTemplate from "../Ui/MyButtonTemplate.vue";
import { computed, ref, watchEffect } from "vue";

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
  currentDate: {
    type: String,
    required: true,
  },
});

const filteredSubByEmployeeSpec = computed(() => {
  const finded = scheduleStore.employees.find((emp) => {
    return +emp.id === +props.employeeId;
  });

  return finded || null;
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!! Поменять данные на динамические

// const currentDate = ref("15.07.2025");

// ! Если что подправить этот колхоз
const findHistoryPresentForCurrentCustomer = computed(() => {
  const findedTimeAndDate = props.customer.find((val) => {
    return val.history.find((val) => {
      return val.date === props.currentDate && val.time === props.time;
    });
  });

  if (findedTimeAndDate) {
    const findedHistory = findedTimeAndDate.history?.find((val) => {
      return val.date === props.currentDate && val.time === props.time;
    });
    return findedHistory;
  } else {
    return null;
  }

  //   return findedHistory || null;
});

// const currentHistory = computed(() => {
//   const current = findHistoryPresentForCurrentCustomer.value.history.find(
//     (val) => {
//       return (
//         val.date === currentDate.value &&
//         val.time === props.time &&
//         val.presents === false
//       );
//     }
//   );

//   return current || null;
// });

watchEffect(() => {
  console.log(props.customer);
  console.log(findHistoryPresentForCurrentCustomer.value);
  //   console.log(currentHistory.value);
});

// history: [
//         {
//           presents: false,
//           payed: false,
//           time: "09:00",
//           date: "15.07.2025",
//         },
//       ],
</script>

<!-- subscription: [
{
  typeOfSubs: "Нейропсихолог",
  timeSub: 45,
  howMuchSubLeft: 4,
  totalBoughtSubQuantity: 4,
}, -->

<template>
  <div v-for="customer in props.customer" :key="customer.id">
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
              v-if="
                !findHistoryPresentForCurrentCustomer ||
                (findHistoryPresentForCurrentCustomer &&
                  !findHistoryPresentForCurrentCustomer.subLoss)
              "
              :red="true"
              @click="
                scheduleStore.removeLessonForSub(
                  customer.id,
                  index,
                  props.employeeId,
                  props.currentDate,
                  props.time
                )
              "
              >Списать</my-button-template
            >
          </span>
        </div>
        <div class="didnt-visit">
          <my-button-template
            v-if="
              customer.subscription.length === 0 &&
              !findHistoryPresentForCurrentCustomer
            "
            @click="scheduleStore.cameCustomerSwitch()"
            >Подтвердить оплату</my-button-template
          >

          <h3
            v-else-if="
              findHistoryPresentForCurrentCustomer &&
              findHistoryPresentForCurrentCustomer.payed &&
              !findHistoryPresentForCurrentCustomer.subLoss
            "
          >
            Оплачено !
          </h3>

          <my-button-template
            v-if="!findHistoryPresentForCurrentCustomer"
            @click="
              scheduleStore.didntCameCustomer(
                customer.id,
                props.currentDate,
                props.time
              )
            "
            >Клиент не пришел</my-button-template
          >
          <h3
            v-else-if="
              findHistoryPresentForCurrentCustomer &&
              !findHistoryPresentForCurrentCustomer.payed
            "
          >
            Клиент не пришёл !
          </h3>

          <h3
            v-if="
              findHistoryPresentForCurrentCustomer &&
              findHistoryPresentForCurrentCustomer.subLoss
            "
          >
            Абонемент списан !
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.didnt-visit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15px;
}
span {
  display: block;
  margin-top: 15px;
}
</style>

<!-- - Остановился тут -->
<!-- - Необходимо добавить функционал отображения оплаты, если клиент оплатил, вместо привычного оплатил -->
<!-- - Так же проверить на работоспособность пришел, не пришел, после чего подкорректировать computed -->
<!-- - Подвязать все наконец-то к ебучему времени -->
<!-- - Так же разобраться с условиями когда разные true и false  -->
<!-- - Проблема возникает, когда present true, а payed false, Тоесть, когда пришли, но не оплачено, скорее всего надо пошаманить в условиях отображения надписей или кнопок  -->
<!-- - Так же разобраться как дела обстоят если есть абонемент, че высвечивать, че нет -->
<!-- - Скорее всего просто указать пункты противоположные history -->
<!-- - Так же остановился на манипуляциях с данными history, добавил пункт оплачено и присутсвие -->
<!-- - На основе этого указал условия if-else для отображения кнопок или текса в клиент не пришел и в оплачено -->
<!-- - Посмотреть как лучше сделать computed функцию, которая ищет историю на основе данных -->
<!-- ! Остановился на добавлении времени -->
<!-- ! Это нужно для отслеживания состояния в таблице, а так же последущего отображения у клиента в истории -->
<!-- ! Необходимо подвязать данные связанные со структурой (пока только у клиента 1) таким образом, чтобы было соответствие дня недели, времени, а ТАК ЖЕ ДАТЫ -->
<!-- ! Сделай сначала все со статичными данными, потом уже с динамическими -->

<!-- history: [
{
  presents: true,
  day: "Вторник",
  time: "09:00",
  date: "15.07.2025",
}, -->
