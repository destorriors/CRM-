<script setup>
import { defineProps } from "vue";

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  lossOrProfit: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="profit-loss-container__loss">
    <h3>{{ props.title }}</h3>
    <div class="card">
      <div class="card__loss" v-for="item in props.lossOrProfit" :key="item.id">
        <span>({{ item.id }}) {{ item.name }}: {{ item.sum }} р.</span>
        <span>{{ item.paymentType }}</span>
        <span>{{ item.date }}</span>
      </div>
      <h3>Итого: {{ props.total }}</h3>
    </div>
  </div>
</template>

<style scoped>
.card__loss {
  display: flex;
  /* box-sizing: border-box; */
  height: 3rem;
  border-bottom: 1px solid black;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
}
.card {
  border: 1px solid black;
  border-radius: 10px;
  height: 10rem;
  padding: 15px;
  overflow-y: auto;
}
/* .profit-loss-container {
  display: grid;
} */
</style>
