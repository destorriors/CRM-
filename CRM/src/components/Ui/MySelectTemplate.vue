<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  arrayForOption: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

function changeModel(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<template>
  <div>
    <label :for="props.name">{{ props.label }}</label>
    <select
      :name="props.name"
      :id="props.name"
      :value="modelValue"
      @change="changeModel"
    >
      <option
        v-for="(array, idx) in props.arrayForOption"
        :key="`${array.id}-${idx + 1}`"
        :value="array.name"
      >
        {{ array.name }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
