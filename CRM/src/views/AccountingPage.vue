<script setup>
import AccountingCard from "@/components/AccountingComponents/AccountingCard.vue";
import { useScheduleStore } from "@/stores/scheduleStore";
import ProfitLossCards from "@/components/AccountingComponents/ProfitLossCards.vue";
import ModalTemplate from "@/components/Ui/ModalTemplate.vue";
import MyInputTextTemplate from "@/components/Ui/MyInputTextTemplate.vue";
import MyInputNumberTemplate from "@/components/Ui/MyInputNumberTemplate.vue";
import { computed } from "vue";
import MySelectWithoutKeysTemplate from "@/components/Ui/MySelectWithoutKeysTemplate.vue";

const scheduleStore = useScheduleStore();

const isDisabled = computed(() => {
  if (scheduleStore.lossOrProfitInput.length <= 0) {
    return true;
  } else if (scheduleStore.sumLossOrPrifitInput <= 0) {
    return true;
  } else if (!scheduleStore.paymentTypeInput) {
    return true;
  } else {
    return false;
  }
});
</script>

<template>
  <div class="buttons">
    <my-button-template
      :red="true"
      @click="scheduleStore.openLossOrProfitModalWindow(1)"
    >
      Добавить расход
    </my-button-template>
    <my-button-template @click="scheduleStore.openLossOrProfitModalWindow(2)">
      Добавить доход
    </my-button-template>
  </div>

  <div class="test">
    <ProfitLossCards
      title="Расход"
      :lossOrProfit="scheduleStore.accounting.loss"
      :total="scheduleStore.accounting.totalLoss"
    />
    <ProfitLossCards
      title="Доход"
      :lossOrProfit="scheduleStore.accounting.profit"
      :total="scheduleStore.accounting.totalProfit"
    />
  </div>

  <!-- <div class="profit-loss-container__loss">
    <h3>Расход</h3>
    <div class="card">
      <div
        class="card__loss"
        v-for="loss in scheduleStore.accounting.loss"
        :key="loss.id"
      >
        <span>({{ loss.id }}) {{ loss.name }}: {{ loss.sum }} р.</span>
        <span>{{ loss.date }}</span>
      </div>
      <h3>Итого: {{ scheduleStore.accounting.totalLoss }}</h3>
    </div>
  </div> -->

  <div class="container">
    <span class="profit"
      >Доход центра: {{ scheduleStore.accounting.totalProfit }}</span
    >
    <span class="loss"
      >Расход центра: {{ scheduleStore.accounting.totalLoss }}</span
    >
  </div>

  <AccountingCard :employees="scheduleStore.employees" />

  <modal-template
    :title="
      scheduleStore.lossOrProfitMode === 1
        ? 'Добавление расхода'
        : 'Добавление дохода'
    "
    :is-visible="scheduleStore.isLossOrProfitModalWindowShwon"
    @close="scheduleStore.closeLossOrProfitModalWindow"
  >
    <MyInputTextTemplate
      label-of-input="Назначение:"
      name="purposeOfLossOrProfit"
      v-model="scheduleStore.lossOrProfitInput"
    />
    <MyInputNumberTemplate
      label-of-input="Сумма:"
      name="sumOfLossOrProfit"
      v-model="scheduleStore.sumLossOrPrifitInput"
    />
    <MySelectWithoutKeysTemplate
      label="Способ оплаты: "
      name="paymentType"
      :array-for-option="scheduleStore.paymentType"
      v-model="scheduleStore.paymentTypeInput"
    />
    <my-button-template
      class="btn3"
      @click="scheduleStore.addLossOrProfit"
      :disabled="isDisabled"
      >Добавить</my-button-template
    >
  </modal-template>
</template>

<style scoped>
.test {
  display: flex;
  justify-content: space-between;
}

.btn3,
.btn3:disabled {
  display: block; /* Убеждаемся, что кнопка — блочный элемент */
  margin: 15px auto 15px auto;
  width: 200px;
}
.card__loss {
  display: flex;
  box-sizing: border-box;
  height: 3rem;
  border-bottom: 1px solid black;
  padding: 15px;
  justify-content: space-between;
}
.card {
  /* display: flex; */
  border: 1px solid black;
  border-radius: 10px;
  /* width: 10rem; */
  height: 10rem;
  padding: 15px;
}
.profit-loss-container {
  display: grid;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}
.container {
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
  margin: 15px;
  display: inline-flex;
  flex-direction: column;
  gap: 15px;
}

.profit {
  color: rgb(9, 174, 9);
}
.loss {
  color: red;
}
</style>

<!-- ! Необходимо подвязать каждое занятие к специалисту в его зарплату -->
<!-- ! Посмотреть все зависимости и учитывать разовые оплаты и разовые посещения -->
<!-- ! Разобраться с прокруткой элемента внутри контейнера, чтобы при наличии большого количества данных  -->
