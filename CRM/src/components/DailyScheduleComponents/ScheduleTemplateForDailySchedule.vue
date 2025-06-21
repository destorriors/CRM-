<script setup>
import { ref } from "vue";

const test = ref([1, 2, 3, 4, 5, 6, 7]);

const employee = [
  "Яремина",
  "Желонкин",
  "Кручинин",
  "Петухова",
  "Иванов",
  "Петров",
];
</script>

<template>
  <caption>
    День недели
  </caption>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="(emp, idx) in employee">
          {{ emp }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(it, idx) in employee">
        <th>{{ idx + 1 }}</th>
        <td v-for="op in employee.length">Еще колонка</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
td,
th,
thead,
tbody {
  border: 1px solid black;
  padding: 10px;
}
caption {
  text-align: center;
}
</style>
