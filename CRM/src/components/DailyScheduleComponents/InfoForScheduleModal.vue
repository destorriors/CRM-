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
          scheduleCus.time === props.time &&
          scheduleCus.date === props.currentDate
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

<!-- ! Задача какая, необходимо проследить за списанием абика, подвязать все к новым обстоятельствам -->
<!-- ! Так как мне кажется, что данные дублируются, нужно найти эти данные и поставить условия -->
<!-- ! К тому же необходимо реализовать нормально кнопку клиент не пришел, чтобы она хотябы работала -->

<!-- history: [
{
  presents: true,
  day: "Вторник",
  time: "09:00",
  date: "15.07.2025",
}, -->
