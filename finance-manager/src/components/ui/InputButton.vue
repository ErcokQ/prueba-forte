<script setup lang="ts">
const props = defineProps({
    textButton: {
        type: String,
        required: false,
        default: 'Tu Boton'
    },
    type: {
        type: String as () => 'button' | 'submit' | 'reset',
        required: true,
        default: 'button'
    }
});
</script>

<template>
    <button :type="props.type" class="md:w-64 w-[100%] p-2 my-2 rounded-lg dark:bg-stone-600/60 hover:bg-stone-800 bg-stone-900/60 text-cyan-50 dark:shadow-stone-500 shadow-cyan-50 shadow-sm transition duration-300 cursor-pointer">{{props.textButton}}</button>
</template>

<style></style>