<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import MyButtonTemplate from "@/components/Ui/MyButtonTemplate.vue";
import ModalTemplate from "@/components/Ui/ModalTemplate.vue";
import EditPriceInputDataTemplate from "@/components/EditPriceInputDataTemplate.vue";

const scheduleStore = useScheduleStore();

// {
//       id: 1,
//       category: "Логопед-дефектолог",
//       timeOptions: [
//         {
//           timeOfSub: 30,
//           singleCost: 1500,
//           subSingleLessonCost: 1300,
//           subCost: 7600,
//           subCountOfLessons: 4,
//         },
//         {
//           timeOfSub: 45,
//           singleCost: 1700,
//           subSingleLessonCost: 1500,
//           subCost: 6700,
//           subCountOfLessons: 4,
//         },
//       ],
//     },
</script>

<template>
  <h1>Сюда нужно вставить компонент с поиском</h1>
  <div
    class="mainCard"
    v-for="(item, idx) in scheduleStore.priceList"
    :key="item.id"
  >
    <h2>{{ item.category }}</h2>
    <div class="main-buttons">
      <my-button-template
        class="addTime"
        @click="scheduleStore.openAddTimeInPriceOption(item.id)"
        >Добавить услугу</my-button-template
      >
      <my-button-template class="addTime"
        >Поднять цену на категорию</my-button-template
      >
      <my-button-template class="addTime"
        >Опустить цену на категорию</my-button-template
      >
      <my-button-template :red="true" @click="scheduleStore.deleteCategory(idx)"
        >Удалить категорию</my-button-template
      >
    </div>

    <div v-if="item.timeOptions.length === 0">
      <h2>Добавьте услугу</h2>
    </div>

    <div class="cards" v-for="(option, idx) in item.timeOptions">
      <h2 v-if="option.name">{{ option.name }}</h2>
      <p v-if="option.timeOfSub != 0">
        Время услуги: {{ option.timeOfSub }} мин
      </p>
      <p>Разовая стоимость: {{ option.singleCost }}</p>
      <p v-if="!option.withoutSub">
        Разовая стоимость услуги по абонементу:
        {{ option.subSingleLessonCost }}
      </p>
      <p v-if="!option.withoutSub">
        Стоимость абонемента: {{ option.subCost }}
      </p>
      <p v-if="!option.withoutSub">
        Количество услуг в абонементе:
        {{ option.subCountOfLessons }}
      </p>
      <my-button-template
        class="editButton"
        @click="scheduleStore.openEditPrice(idx, item.id)"
        >Редактировать</my-button-template
      >
    </div>
    <modal-template
      :is-visible="scheduleStore.isEdittingPrice"
      title="Редактирование цены"
      @close="scheduleStore.closeEditPrice"
    >
      <EditPriceInputDataTemplate
        :edit-option-idx="scheduleStore.idxAndIdofPrice.idx"
        :price-id="scheduleStore.idxAndIdofPrice.id"
      />
    </modal-template>
    <modal-template
      :is-visible="scheduleStore.isAddTimeInPriceOption"
      title="Добавление услуги"
      @close="scheduleStore.closeAddTimeInPriceOption"
    >
      <EditPriceInputDataTemplate
        :price-id="scheduleStore.idxAndIdofPrice.id"
        :add-time-in-price-option-mode="true"
      />
    </modal-template>
  </div>
  <my-button-template class="add-category"
    >Добавить категорию</my-button-template
  >
</template>

<style scoped>
.add-category {
  display: block; /* Убеждаемся, что кнопка — блочный элемент */
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 50px;
}
.main-buttons {
  display: flex;
}
.addTime,
.addTime:hover {
  background-color: purple;
  display: block; /* Убеждаемся, что кнопка — блочный элемент */
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
}
/* .mainCard {
  display: grid;
} */
.cards {
  display: flex;
  border: 1px solid black;
  gap: 15px;
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
}
.edit-button {
  width: auto;
  height: auto;
}
</style>

<!-- ! Остановился на том, что нужно доделать кнопки поднять цену и опустить -->
<!-- ! Так же необходимо добавить кнопку с добавлением новой категории и поиск категории по названию -->
<!-- ! Сделать отдельный компонент с карточкой -->
<!-- ! Нужно деструктуризировать компонент -->
<!-- ! Потом необходимо подвязать цены со страницей клиентов -->
