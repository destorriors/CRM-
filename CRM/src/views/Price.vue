<script setup>
import { useScheduleStore } from "@/stores/scheduleStore";
import MyButtonTemplate from "@/components/Ui/MyButtonTemplate.vue";
import PriceCards from "@/components/PriceComponents/PriceCards.vue";
import RaiseAndLowerPriceComponent from "@/components/PriceComponents/RaiseAndLowerPriceComponent.vue";
import AddCategoryInPrice from "@/components/PriceComponents/AddCategoryInPrice.vue";
import AddAndEditPriceService from "@/components/PriceComponents/AddAndEditPriceService.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import { ref, computed } from "vue";

const scheduleStore = useScheduleStore();

const findCategoryInput = ref("");

const sortedCategory = computed(() => {
  if (!findCategoryInput.value) return scheduleStore.priceList;
  const searchTerm = findCategoryInput.value.toLowerCase();
  return scheduleStore.priceList.filter((val) =>
    val.category.toLowerCase().includes(searchTerm)
  );
});

console.log(sortedCategory.value);
</script>

<template>
  <SearchComponent
    input-name="findCategory"
    input-placeholder="Введите название категории"
    v-model="findCategoryInput"
  />

  <div class="mainCard" v-for="(item, idx) in sortedCategory" :key="item.id">
    <h2>{{ item.category }}</h2>
    <div class="main-buttons">
      <my-button-template
        class="addTime"
        @click="scheduleStore.openAddTimeInPriceOption(item.id)"
        >Добавить услугу</my-button-template
      >
      <my-button-template
        class="addTime"
        v-if="item.timeOptions.length != 0"
        @click="scheduleStore.openRaiseOrLowerPriceCategory(1, item.id)"
        >Поднять цену на категорию</my-button-template
      >
      <my-button-template
        class="addTime"
        v-if="item.timeOptions.length != 0"
        @click="scheduleStore.openRaiseOrLowerPriceCategory(2, item.id)"
        >Опустить цену на категорию</my-button-template
      >
      <my-button-template :red="true" @click="scheduleStore.deleteCategory(idx)"
        >Удалить категорию</my-button-template
      >
    </div>

    <div v-if="item.timeOptions.length === 0">
      <h2>Добавьте услугу</h2>
    </div>

    <PriceCards :item="item.timeOptions" :item-id="item.id" />

    <AddAndEditPriceService
      :is-visible="scheduleStore.isEdittingPrice"
      title="Редактирование цены"
      @close="scheduleStore.closeEditPrice"
    />
    <AddAndEditPriceService
      :is-visible="scheduleStore.isAddTimeInPriceOption"
      title="Добавление услуги"
      :add-time-in-price-option-mode="true"
      @close="scheduleStore.closeAddTimeInPriceOption"
    />

    <RaiseAndLowerPriceComponent
      :is-visible="scheduleStore.raiseOrLowerPriceCategory === 1"
      title="Поднять цену на категорию"
      label-of-input="Укажите на сколько поднять цену:"
      name-for-input="raiseCategoryPrise"
      button-label="Поднять"
    />

    <RaiseAndLowerPriceComponent
      :is-visible="scheduleStore.raiseOrLowerPriceCategory === 2"
      title="Опустить цену на категорию"
      label-of-input="Укажите на сколько опустить цену:"
      name-for-input="lowerCategoryPrise"
      button-label="Опустить"
    />
  </div>

  <AddCategoryInPrice />
</template>

<style scoped>
.main-buttons {
  display: flex;
}
.addTime,
.addTime:hover {
  background-color: purple;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
}
/* .mainCard {
  display: grid;
} */
</style>

<!-- ! Потом необходимо подвязать цены со страницей клиентов -->
