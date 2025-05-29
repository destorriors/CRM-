<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import { onUnmounted, ref } from "vue";

const scheduleStore = useScheduleStore();

onUnmounted(() => {
  scheduleStore.isAddButtonShown = false;
  scheduleStore.isDeleteButtonShown = false;
});

const showButtons = ref(false);
function showButtonsAndHideAll() {
  showButtons.value = !showButtons.value;
  scheduleStore.isAddButtonShown = false;
  scheduleStore.isDeleteButtonShown = false;
}
</script>

<template>
  <div class="app-container">
    <!-- Боковая панель со специальностями -->
    <div class="specialization-sidebar">
      <h3 class="sidebar-title">Направления</h3>
      <router-link
        v-for="spec in scheduleStore.specialization"
        :key="spec.id"
        class="specialization-item"
        :to="`/employees/${spec.forRouterPath}`"
      >
        <p>{{ spec.name }}</p>
        <button
          class="deleter"
          v-if="scheduleStore.isDeleteButtonShown"
          @click.prevent="scheduleStore.removeSpec(spec.id)"
        >
          <p><strong>-</strong></p>
        </button>
      </router-link>
      <div class="edit-container">
        <button
          :class="{ edittButton: !showButtons, hideEdit: showButtons }"
          @click="showButtonsAndHideAll"
        >
          {{ showButtons ? "Скрыть" : "Редактировать" }}
        </button>
      </div>

      <div class="addRemoveSpec" v-if="showButtons">
        <button
          v-if="!scheduleStore.isDeleteButtonShown"
          :class="{
            'add-btn': !scheduleStore.isAddButtonShown,
            hideEdit: scheduleStore.isAddButtonShown,
          }"
          @click="scheduleStore.showAddInput"
        >
          {{
            scheduleStore.isAddButtonShown ? "Отмена" : "Добавить направление"
          }}
        </button>
        <div v-if="scheduleStore.isAddButtonShown">
          <label for="specName">Введите название направления:</label>
          <input
            name="specName"
            type="text"
            v-model="scheduleStore.addSpecialistInput"
          />
          <button
            class="add"
            @click="scheduleStore.addSpecialist"
            :disabled="scheduleStore.addSpecialistInput.length === 0"
          >
            Добавить
          </button>
        </div>

        <button
          v-if="!scheduleStore.isAddButtonShown"
          :class="{
            'remove-btn': !scheduleStore.isDeleteButtonShown,
            hideEdit: scheduleStore.isDeleteButtonShown,
          }"
          @click="scheduleStore.showDeleteButton"
        >
          {{
            scheduleStore.isDeleteButtonShown ? "Отмена" : "Удалить направление"
          }}
        </button>
      </div>
    </div>

    <!-- Основной контент -->
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.hideEdit {
  border-radius: 8px;
  background-color: grey;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}
.edit-container {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  margin-top: 15px;
  padding-top: 10px;
}

.edittButton {
  border-radius: 8px;
  background-color: #10b981;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}
.add:disabled {
  background-color: rgb(176, 172, 172);
}
.add:disabled:hover {
  background-color: rgb(176, 172, 172);
}
.app-container {
  display: flex;
  min-height: 100vh;
  background: #f4f6f9;
} /* Боковая панель со специальностями */
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
} /* Заголовок панели */
.sidebar-title {
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
} /* Элемент списка направлений (router-link) */
.specialization-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #4a6278;
  border-radius: 8px;
  padding: 12px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
} /* Сбрасываем стили для всех состояний ссылки */
.specialization-item:link,
.specialization-item:visited,
.specialization-item:hover,
.specialization-item:active {
  text-decoration: none;
  color: inherit;
} /* Стили при наведении */
.specialization-item:hover {
  background: #37df5c;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: #fff;
} /* Стили для активного маршрута */
.specialization-item.router-link-active {
  background: #37df5c;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
} /* Текст внутри элемента */
.specialization-item p {
  margin: 0;
  letter-spacing: 0.3px;
} /* Кнопка удаления направления */
.deleter {
  background-color: #f43f5e;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.deleter:hover {
  background-color: #e11d48;
  transform: scale(1.1);
}
.deleter p {
  margin: 0;
  line-height: 1;
} /* Блок кнопок добавления и удаления */
.addRemoveSpec {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
} /* Кнопка добавления направления */
.add-btn {
  border-radius: 8px;
  background-color: #10b981;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}
.add-btn:hover {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
} /* Кнопка удаления направлений */
.remove-btn {
  border-radius: 8px;
  background-color: #f43f5e;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}
.remove-btn:hover {
  background-color: #e11d48;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
} /* Поле ввода и кнопка добавления */
.addRemoveSpec label {
  font-size: 14px;
  color: #ecf0f1;
  margin-bottom: 5px;
  display: block;
}
.addRemoveSpec input {
  width: 100%;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 14px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.addRemoveSpec input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.3);
} /* Кнопка "Добавить" внутри поля ввода */
.add {
  border-radius: 8px;
  background-color: #10b981;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  width: 100%;
  display: block;
}
.add:hover {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
} /* Основной контент */
.main-content {
  flex: 1;
  padding: 30px;
  background: #ffffff;
  overflow-y: auto;
} /* Адаптивность */
/* @media (max-width: 768px) {
  .specialization-sidebar {
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
    padding: 15px;
  }
  .specialization-item {
    padding: 10px 15px;
    font-size: 14px;
  }
  .deleter {
    width: 18px;
    height: 18px;
    font-size: 12px;
  }
  .add-btn,
  .remove-btn,
  .add {
    padding: 8px 15px;
    font-size: 13px;
  }
  .main-content {
    padding: 20px;
  }
} */
</style>
