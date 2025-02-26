<script setup lang="ts">
import { defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    required: false,
    default: 'Tu placeHolder'
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  }
});

const emits = defineEmits(['update:modelValue']);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emits('update:modelValue', target.value);
}
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="onInput"
    class="w-full p-2 my-2 rounded-lg dark:bg-cyan-100/60 bg-stone-900/60 dark:text-stone-950 text-cyan-50 font-semibold"
  />
</template>

<style>

</style>
