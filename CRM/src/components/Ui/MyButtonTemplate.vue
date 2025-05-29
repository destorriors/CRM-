<script setup>
const props = defineProps({
  red: {
    type: Boolean,
    default: false,
  },
  isButtonDisabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button :class="{ add: !red, remove: red }" :disabled="isButtonDisabled">
    <slot></slot>
  </button>
</template>

<style scoped>
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
  margin-left: 8px;
}
.add:hover {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
} /* Основной контент */

.add:disabled,
.remove:disabled {
  border-radius: 8px;
  background-color: rgb(210, 203, 203);
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  margin-top: 8px;
  margin-left: 8px;
}

.add:disabled:hover,
.remove:disabled:hover {
  background-color: rgb(210, 203, 203);
  transform: none;
  box-shadow: none;
}

.remove {
  border-radius: 8px;
  background-color: #bc1010;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  margin-left: 8px;
}
.remove:hover {
  background-color: #8d0a0a;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
} /* Основной контент */
</style>
