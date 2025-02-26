<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const isDarkMode = ref(false);

/**
 * Función para cambiar el modo de la aplicación
 */
function toggleDarkMode() {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
}

/**
 * Verificar si el modo oscuro está activado en el cliclo de vida
 */
onMounted(() => {
  if (localStorage.getItem('darkMode') === 'true') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<template class="">
  <header class="w-full h-16 flex items-center justify-between px-4 bg-cyan-50 dark:bg-stone-500/20 shadow-lg shadow-stone-200 z-20">
    <h1 class="text-lg text-stone-900 dark:text-cyan-50 font-semibold">
      <span class="pi pi-user"></span> Finance Manager
    </h1>
    <!-- Toggle para modo oscuro/claro -->
    <label class="flex items-center cursor-pointer">
      <span class="mr-2 dark:text-cyan-50 text-stone-900">Modo Oscuro</span>
      <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode" class="hidden" />
      <!-- Estilo del switch -->
      <div class="relative">
        <div class="w-10 h-4 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner"></div>
        <div
          :class="{'translate-x-6': isDarkMode, 'translate-x-0': !isDarkMode}"
          class="dot absolute w-6 h-6 bg-stone-700 dark:bg-gray-300 rounded-full shadow -left-1 -top-1 transition transform duration-300"
        ></div>
      </div>
    </label>
  </header>

  <RouterView />
</template>

<style scoped>

</style>

