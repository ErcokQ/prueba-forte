<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import InputText from '@/components/ui/InputText.vue';
import InputButton from '@/components/ui/InputButton.vue';
import Alert from '@/components/ui/Alert.vue';

interface ReportParams {
  fechaDesde: string;
  fechaHasta: string;
  cliente: string;
  categoria: string;
}

const form = ref<ReportParams>({
  fechaDesde: '',
  fechaHasta: '',
  cliente: '',
  categoria: ''
});

const reportLink = ref('');
const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref<'success' | 'error' | 'warning'>('success');
const alertTitle = ref('Reporte Generado');

async function generateReport() {
  try {
    const response = await axios.post('http://localhost:3002/api/reportes/generar', form.value);
    reportLink.value = response.data.downloadURL;
    alertMessage.value = 'El reporte se ha generado exitosamente.';
    alertType.value = 'success';
    showAlert.value = true;
  } catch (error) {
    console.error('Error al generar reporte:', error);
    alertMessage.value = 'Error al generar reporte. Inténtalo de nuevo.';
    alertType.value = 'error';
    showAlert.value = true;
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4 dark:text-cyan-50 text-stone-900">Generar Reporte</h1>
    <form @submit.prevent="generateReport" class="bg-stone-900 p-6 rounded-2xl text-cyan-50 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-1">Fecha Desde:</label>
          <InputText v-model="form.fechaDesde" type="date" placeholder="Selecciona fecha inicio" />
        </div>
        <div>
          <label class="block mb-1">Fecha Hasta:</label>
          <InputText v-model="form.fechaHasta" type="date" placeholder="Selecciona fecha fin" />
        </div>
        <div>
          <label class="block mb-1">Cliente:</label>
          <InputText v-model="form.cliente" placeholder="ID o Nombre del Cliente" />
        </div>
        <div>
          <label class="block mb-1">Categoría:</label>
          <InputText v-model="form.categoria" placeholder="Categoría" />
        </div>
      </div>
      <div class="mt-4">
        <InputButton textButton="Generar Reporte" type="submit" />
      </div>
    </form>


    <Alert 
      v-if="showAlert"
      :type="alertType" 
      :message="alertMessage" 
      :title="alertTitle"
      @close="showAlert = false"
    />

    <div v-if="reportLink" class="bg-stone-900 p-6 rounded-2xl text-cyan-50 mt-6">
      <h2 class="text-2xl font-bold mb-4">Reporte Generado</h2>
      <p class="mb-4">Haz clic en el siguiente enlace para descargar el reporte generado:</p>
      <a :href="reportLink" download class="bg-cyan-500 hover:bg-cyan-600 text-stone-900 font-bold py-2 px-4 rounded">
        Descargar Reporte
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>