<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  labelOfInput: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

function changeInput(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<template>
  <div>
    <label :for="props.name">{{ labelOfInput }}</label>
    <input
      type="number"
      :id="props.name"
      :value="props.modelValue"
      @input="changeInput"
    />
  </div>
</template>

<style scoped></style>
