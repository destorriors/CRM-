<script setup>
import { useScheduleStore } from "./stores/scheduleStore.js";
import NavBar from "./components/Ui/NavBar.vue";

const scheduleStore = useScheduleStore();
</script>

<template>
  <div class="app">
    <nav-bar class="navbar" />
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column; /* Вертикальное расположение */
  min-height: 100vh; /* Занимаем всю высоту экрана */
  background: #f4f6f9; /* Светлый фон для всего приложения */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* Мягкая тень для всего контейнера */
}

.navbar {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1); /* Тень снизу для отделения */
}

.main-content {
  flex: 1; /* Занимаем оставшееся пространство */
  background: #ffffff; /* Белый фон для контента */
  overflow-y: auto; /* Прокрутка контента, если он не помещается */
}
</style>
