<script setup>
// Больше не нужно импортировать useRouter, так как используем router-link
</script>

<template>
  <div class="navbar">
    <router-link to="/" class="card">
      <p>Расписание на день</p>
    </router-link>
    <router-link to="/employees" class="card">
      <p>Специалисты</p>
    </router-link>
    <router-link to="false" class="card">
      <p>Абонементы</p>
    </router-link>
    <router-link to="false" class="card">
      <p>Зарплата</p>
    </router-link>
    <router-link to="false" class="card">
      <p>Бухгалтерия</p>
    </router-link>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row; /* Горизонтальное расположение карточек */
  justify-content: center; /* Центрируем карточки */
  gap: 15px; /* Отступ между карточками */
  padding: 20px;
  background: linear-gradient(
    135deg,
    #2c3e50 0%,
    #1a252f 100%
  ); /* Тёмный градиент для фона */
  color: #ecf0f1; /* Светлый цвет текста */
}

/* Стили для router-link */
.card {
  display: block; /* Делаем router-link блочным элементом */
  background: #34495e; /* Тёмно-синий фон для карточек */
  border: none; /* Убираем рамку */
  border-radius: 10px; /* Мягкие углы */
  padding: 12px 20px; /* Увеличиваем внутренние отступы */
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease; /* Плавный переход */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); /* Тень для карточек */
  text-decoration: none; /* Убираем подчёркивание */
  color: inherit; /* Наследуем цвет текста */
}

/* Сбрасываем стили для всех состояний ссылки */
.card:link,
.card:visited,
.card:hover,
.card:active {
  text-decoration: none;
  color: inherit;
}

/* Стили при наведении */
.card:hover {
  background: #37df5c; /* Зелёный фон при наведении */
  transform: translateY(-2px); /* Лёгкий подъём при наведении */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3); /* Увеличиваем тень */
  color: #fff; /* Белый текст при наведении */
}

/* Стили для активного маршрута */
.card.router-link-active {
  background: #37df5c;
  color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.card p {
  margin: 0; /* Убираем стандартный отступ у текста */
  letter-spacing: 0.5px; /* Лёгкий разряд для текста */
}

/* Адаптивность */
@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap; /* Перенос карточек на новую строку, если не помещаются */
    gap: 10px;
    padding: 15px;
  }

  .card {
    padding: 10px 15px; /* Уменьшаем отступы на мобильных */
    font-size: 14px; /* Уменьшаем шрифт */
  }
}
</style>
