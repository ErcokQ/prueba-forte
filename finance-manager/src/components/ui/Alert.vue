<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String as () => 'success' | 'error' | 'warning',
    required: true,
  },
  message: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    default: 'Alerta'
  },
  useCase: {
    type: String as () => 'alert' | 'confirm',
    required: true,
    default: 'alert'
  },
});

const emit = defineEmits(['close', 'accept', 'cancel']);

const alertClasses = computed(() => {
  let textClass = '';
  let shadowClass = '';

  switch (props.type) {
    case 'success':
      textClass = 'text-green-500';
      shadowClass = 'shadow-green-500';
      break;
    case 'error':
      textClass = 'text-red-500';
      shadowClass = 'shadow-red-500';
      break;
    case 'warning':
      textClass = 'text-yellow-500';
      shadowClass = 'shadow-yellow-500';
      break;
    default:
      textClass = 'dark:text-cyan-50 text-stone-950';
      shadowClass = 'shadow-cyan-50 dark:shadow-stone-950';
      break;
  }
  
  return `${textClass} ${shadowClass}`;
});

const iconClasses = computed(() => {
  let icon = '';

  switch (props.type) {
    case 'success':
      icon = 'pi-verified';
      break;
    case 'error':
      icon = 'pi-times-circle';
      break;
    case 'warning':
      icon = 'pi-exclamation-circle';
      break;
    default:
      icon = 'pi-info-circle';
      break;
  }

  return icon;
});

function handleAccept() {
  emit('accept');
  emit('close'); 
}

function handleCancel() {
  emit('cancel');
  emit('close');
}
</script>

<template>

  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <div
      :class="`flex items-start justify-center gap-2.5 flex-col 
               dark:bg-stone-950/90 bg-stone-100 
               relative shadow-md z-10 w-96 p-6 rounded-lg 
               transition duration-300 cursor-pointer ${alertClasses}`"
    >
      <h3 class="flex items-center justify-center gap-2.5">
        <span :class="`pi ${iconClasses} text-2xl`"></span>
        {{ title }}
      </h3>
      <p>{{ message }}</p>

      <div class="flex w-full gap-2.5">

        <button
          class="w-full p-2 my-2 rounded-lg dark:bg-slate-800/80 
                 hover:bg-stone-800 bg-stone-900/60 text-cyan-50 
                 dark:shadow-stone-500 shadow-cyan-50 shadow-sm 
                 transition duration-300 cursor-pointer"
          @click="handleAccept"
        >
          Aceptar
        </button>

        <button
          v-if="useCase === 'confirm'"
          class="w-full p-2 my-2 rounded-lg dark:bg-slate-800/80 
                 hover:bg-stone-800 bg-stone-900/60 text-cyan-50 
                 dark:shadow-stone-500 shadow-cyan-50 shadow-sm 
                 transition duration-300 cursor-pointer"
          @click="handleCancel"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

