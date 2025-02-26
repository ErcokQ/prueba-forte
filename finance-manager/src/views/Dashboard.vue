<script setup lang="ts">
import { ref } from 'vue';

const isCollapsed = ref(false);

const toggleMenu = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <div class="flex h-[93vh]">
    <aside :class="[isCollapsed ? 'w-20' : 'w-64']" class="bg-stone-900 p-2 text-cyan-50 transition-all duration-300">
      <div class="flex items-center justify-center mb-6 gap-3">
        <h2 v-if="!isCollapsed" class="text-2xl font-bold">Dashboard</h2>
        <button @click="toggleMenu" class="text-cyan-50 focus:outline-none p-2 cursor-pointer">
          <i class="pi pi-bars"></i>
        </button>
      </div>
      <nav>
        <ul class="p-4">
          <li class="mb-4 hover:text-stone-200 hover:bg-stone-800 w-full cursor-pointer p-2 rounded-2xl" title="Inicio">
            <router-link to="/dashboard/inicio" class="flex items-center gap-2 w-full">
              <i class="pi pi-home"></i>
              <span v-if="!isCollapsed">Inicio</span>
            </router-link>
          </li>
          <li class="mb-4 hover:text-stone-200 hover:bg-stone-800 w-full cursor-pointer p-2 rounded-2xl" title="Transacciones">
            <router-link to="/dashboard/transacciones" class="flex items-center gap-2 w-full">
              <i class="pi pi-user"></i>
              <span v-if="!isCollapsed">Transacciones</span>
            </router-link>
          </li>
          <li class="mb-4 hover:text-stone-200 hover:bg-stone-800 w-full cursor-pointer p-2 rounded-2xl" title="Reportes">
            <router-link to="/dashboard/reportes" class="flex items-center gap-2 w-full">
              <i class="pi pi-chart-line"></i>
              <span v-if="!isCollapsed">Reportes</span>
            </router-link>
          </li>
          <li class="mb-4 hover:text-stone-200 hover:bg-stone-800 w-full cursor-pointer p-2 rounded-2xl" title="Métricas">
            <router-link to="/dashboard/metricas" class="flex items-center gap-2 w-full">
              <i class="pi pi-chart-bar"></i>
              <span v-if="!isCollapsed">Métricas</span>
            </router-link>
          </li>
          <!-- <li class="mb-4 hover:text-stone-200 hover:bg-stone-800 w-full cursor-pointer p-2 rounded-2xl" title="Configuración">
            <router-link to="/dashboard/configuracion" class="flex items-center gap-2 w-full">
              <i class="pi pi-cog"></i>
              <span v-if="!isCollapsed">Configuración</span>
            </router-link>
          </li> -->
          <li class="mb-4 hover:text-stone-200 hover:bg-stone-800 w-full cursor-pointer p-2 rounded-2xl" title="Cerrar Sesión">
            <router-link to="/" class="flex items-center gap-2 w-full">
              <i class="pi pi-sign-out"></i>
              <span v-if="!isCollapsed">Cerrar Sesión</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="flex-1 p-6 bg-stone-300/10 dark:bg-stone-800 text-cyan-50">
      <section class="overflow-y-auto max-h-[90vh]">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<style></style>
