<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  customer: {
    type: [Array, Object],
    required: true,
  },
});

console.log(props.customer);

const router = useRouter();

function routeToCustomer(customerId) {
  router.push(`/customers/${customerId}`);
  console.log(customerId);
}
</script>

<template>
  <div class="card">
    <h2>{{ customer.name }}</h2>
    <p>Имя родителя: {{ customer.parentName }}</p>
    <p>Комментарий: {{ customer.description }}</p>
    <p>Номер телефона: {{ customer.phoneNumber }}</p>
    <div
      class="sub-container"
      v-if="customer.subscription && customer.subscription.length > 0"
    >
      <h2>Абонементы</h2>
      <div
        v-for="(subscription, idx) in customer.subscription"
        :key="subscription.typeOfSubs"
      >
        <p>
          ({{ idx + 1 }}) {{ subscription.typeOfSubs || "Нет данных" }} на
          {{ subscription.timeSub || "Не указано" }}, осталось
          {{ subscription.howMuchSubLeft ?? "Не указано" }} занятий
        </p>
      </div>
    </div>
    <h3 class="absent-sub" v-else>Нет абонемента !</h3>
    <button @click="routeToCustomer(customer.id)">Подробнее</button>
  </div>
</template>

<style scoped>
button {
  background: transparent;
  border-radius: 8px;
  padding: 8px;
}
button:hover {
  cursor: pointer;
  background-color: rgb(197, 194, 194);
}
.sub-container {
  border: 1px solid grey;
  padding: 15px;
  border-radius: 8px;
  background-color: rgb(225, 225, 225);
}
.absent-sub {
  color: lightcoral;
  text-align: center;
}
.card {
  /* display: grid; */
  border: 1px solid grey;
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
  background-color: rgb(214, 214, 214);
}
/* .card:hover {
  background-color: rgb(197, 194, 194);
  cursor: pointer;
} */
</style>
