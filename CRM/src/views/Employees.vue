<script setup>
const specialization = [
  { forRouterPath: "neuro", name: "Нейропсихолог" },
  { forRouterPath: "logo", name: "Логопед-дефектолог" },
  { forRouterPath: "defectologist", name: "Дефектолог" },
  { forRouterPath: "psychologist", name: "Психолог" },
  { forRouterPath: "neurologist", name: "Невролог" },
  { forRouterPath: "psychiatrist", name: "Психиатр" },
  { forRouterPath: "epileptologist", name: "Эпилептолог" },
  { forRouterPath: "osteopath", name: "Остеопат" },
];
</script>

<template>
  <div class="app-container">
    <!-- Боковая панель со специальностями -->
    <div class="specialization-sidebar">
      <h3 class="sidebar-title">Направления</h3>
      <router-link
        v-for="spec in specialization"
        :key="spec"
        class="specialization-item"
        :to="`/employees/${spec.forRouterPath}`"
      >
        <p>{{ spec.name }}</p>
      </router-link>
    </div>

    <!-- Основной контент -->
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background: #f4f6f9;
}

/* Боковая панель со специальностями */
.specialization-sidebar {
  width: 220px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
  padding: 20px;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.2);
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-title {
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
}

/* Стили для router-link */
.specialization-item {
  display: block;
  background: #4a6278;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

/* Сбрасываем стили для всех состояний ссылки */
.specialization-item:link,
.specialization-item:visited,
.specialization-item:hover,
.specialization-item:active {
  text-decoration: none;
  color: inherit;
}

/* Стили при наведении */
.specialization-item:hover {
  background: #37df5c;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: #fff;
}

/* Стили для активного маршрута */
.specialization-item.router-link-active {
  background: #37df5c;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.specialization-item p {
  margin: 0;
  letter-spacing: 0.3px;
}

/* Основной контент */
.main-content {
  flex: 1;
  padding: 30px;
  background: #ffffff;
  overflow-y: auto;
}
/* Адаптивность */
@media (max-width: 768px) {
  .specialization-sidebar {
    flex-wrap: wrap; /* Перенос карточек на новую строку, если не помещаются */
    gap: 10px;
    padding: 15px;
  }

  .specialization-item {
    padding: 10px 15px; /* Уменьшаем отступы на мобильных */
    font-size: 14px; /* Уменьшаем шрифт */
  }
}
</style>
