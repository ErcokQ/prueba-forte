<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';

const distributionChartRef = ref<HTMLCanvasElement | null>(null);
const summaryChartRef = ref<HTMLCanvasElement | null>(null);
const evolutionChartRef = ref<HTMLCanvasElement | null>(null);

async function fetchDistribution() {
  try {
    const res = await axios.get('http://localhost:3003/api/metrics/distribution');
    const data = res.data; // Se espera un objeto: { "Categoría1": { income: X, expense: Y }, ... }
    const labels = Object.keys(data);
    const incomes = labels.map(label => data[label].income);

    if (distributionChartRef.value) {
      new Chart(distributionChartRef.value, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Ingresos por Categoría',
            data: incomes,
            backgroundColor: labels.map(() => '#' + Math.floor(Math.random()*16777215).toString(16))
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          }
        }
      });
    }
  } catch (error) {
    console.error('Error fetching distribution:', error);
  }
}

async function fetchClientSummary() {
  try {
    const res = await axios.get('http://localhost:3003/api/metrics/client-summary');
    const data = res.data; // Se espera un objeto: { "ClienteA": { count: X, total: Y }, ... }
    const labels = Object.keys(data);
    const totals = labels.map(label => data[label].total);

    if (summaryChartRef.value) {
      new Chart(summaryChartRef.value, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Transacciones',
            data: totals,
            backgroundColor: '#36A2EB'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });
    }
  } catch (error) {
    console.error('Error fetching client summary:', error);
  }
}

async function fetchEvolution() {
  try {
    const res = await axios.get('http://localhost:3003/api/metrics/evolution');
    const data = res.data; // Se espera un objeto: { "YYYY-MM": { income: X, expense: Y }, ... }
    const labels = Object.keys(data).sort();
    const incomes = labels.map(label => data[label].income);
    const expenses = labels.map(label => data[label].expense);

    if (evolutionChartRef.value) {
      new Chart(evolutionChartRef.value, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Ingresos',
              data: incomes,
              borderColor: '#36A2EB',
              fill: false,
            },
            {
              label: 'Gastos',
              data: expenses,
              borderColor: '#FF6384',
              fill: false,
            }
          ]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: true } }
        }
      });
    }
  } catch (error) {
    console.error('Error fetching evolution:', error);
  }
}

onMounted(() => {
  fetchDistribution();
  fetchClientSummary();
  fetchEvolution();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4 dark:text-cyan-50 text-stone-900">Métricas Clave</h1>
    <p class="mb-6 dark:text-cyan-50 text-stone-900">
      Visualiza de forma interactiva la distribución de ingresos/gastos, resumen de transacciones por cliente y la evolución de los montos en el tiempo.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-[30%_65%] gap-6">
      <div class="bg-stone-900 p-4 rounded-2xl text-cyan-50">
        <h2 class="text-xl font-bold mb-2">Distribución por Categoría</h2>
        <canvas ref="distributionChartRef" class="h-40"></canvas>
      </div>
      <div class="bg-stone-900 p-4 rounded-2xl text-cyan-50">
        <h2 class="text-xl font-bold mb-2">Resumen por Cliente</h2>
        <canvas ref="summaryChartRef" class="h-40"></canvas>
      </div>
      <div class="bg-stone-900 p-4 rounded-2xl text-cyan-50 md:col-span-2">
        <h2 class="text-xl font-bold mb-2">Evolución en el Tiempo</h2>
        <canvas ref="evolutionChartRef" class="h-40"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>