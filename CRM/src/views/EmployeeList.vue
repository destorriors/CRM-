<script setup>
import EmployeeCard from "@/components/EmployeeCard.vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import { computed } from "vue";
import AddEmployeeModalWindow from "@/components/AddEmployeeModalWindow.vue";

const scheduleStore = useScheduleStore();

const props = defineProps({
  speciality: {
    type: String,
    required: true,
  },
});

console.log(props.speciality);

const speciality = {
  neuro: "Нейропсихолог",
  logo: "Логопед-дефектолог",
  defectologist: "Дефектолог",
  psychologist: "Психолог",
  neurologist: "Невролог",
  psychiatrist: "Психиатр",
  epileptologist: "Эпилептолог",
  osteopath: "Остеопат",
};

console.log(speciality[props.speciality]);

const spec = computed(() => {
  return scheduleStore.employees.filter((e) => {
    return e.speciality?.includes(speciality[props.speciality]);
  });
});
</script>

<template>
  <div>
    <div class="header-container">
      <h1>{{ speciality[props.speciality] }} ({{ spec.length }})</h1>
      <button class="btn-add-employee" @click="scheduleStore.openAddEmployee">
        Добавить специалиста
      </button>
    </div>

    <div v-if="spec.length === 0">
      <h1 class="absent">Специалисты отсутствуют</h1>
    </div>
    <div class="cards">
      <div v-for="employee in spec" :key="employee.id">
        <EmployeeCard :employee="employee" />
      </div>
    </div>
  </div>
  <AddEmployeeModalWindow v-if="scheduleStore.isAddEmployeeModalVisible" />
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  position: relative;
}
h1 {
  margin: 0;
}
.btn-add-employee {
  background-color: #37df5c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-left: auto;
  position: absolute;
  right: 0;
}
.btn-add-employee:hover {
  background-color: #2fc24f;
}
.absent {
  color: rgb(243, 179, 179);
  text-align: center;
}
.cards {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
}
@media (max-width: 768px) {
  .header-container {
    display: block;
    text-align: center;
  }
  h1 {
    margin-bottom: 10px;
  }
  .btn-add-employee {
    position: static;
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
    max-width: 200px;
  }
}
</style>
