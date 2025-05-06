<script setup>
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
  employee: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const route = useRoute();

const speciality = route.params.speciality;

function routeToSchedule(employeeId) {
  router.push(`/employees/${speciality}/${employeeId}`);
}
</script>

<template>
  <div class="card">
    <img :src="employee.img || '/noPhoto.png'" alt="Нет фото" />
    <h1>{{ employee.name }}</h1>
    <div>
      <p>{{ employee.speciality.join(" , ") }}</p>
    </div>
    <div class="days-of-work">
      <p><strong>График работы:</strong></p>
      <div v-for="day in employee.workSchedule" :key="day.day">
        <p>
          {{ day.day }}: <span>с {{ day.hours[0] }} по {{ day.hours[1] }}</span>
        </p>
      </div>
    </div>
    <button @click="routeToSchedule(employee.id)">Открыть расписание</button>
  </div>
</template>

<style scoped>
.days-of-work {
  text-align: center;
}
.card {
  display: flex;
  background-color: lightgray;
  border-radius: 10px;
  height: auto;
  flex-direction: column;
  align-items: center;
  max-width: 350px;
  min-width: 350px;
}
h1 {
  text-align: center;
}
button {
  background-color: transparent;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 5px;
  cursor: pointer;
}
img {
  margin-top: 15px;
  min-width: 300px;
  min-height: 300px;
  max-height: 300px;
  max-width: 300px;
  border-radius: 15px;
  object-fit: cover;
}
</style>
