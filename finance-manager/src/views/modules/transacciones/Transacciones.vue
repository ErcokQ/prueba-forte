<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import InputText from '@/components/ui/InputText.vue';
import InputButton from '@/components/ui/InputButton.vue';

interface Transaction {
  _id?: string;
  clienteId: string;
  cantidad: number;
  categoria: string;
  fecha: string;
  tipo: 'income' | 'expense';
  estado: 'activa' | 'desactivada';
}

const baseURL = 'http://localhost:3000/api/transacciones';

const transactions = ref<Transaction[]>([]);

const form = reactive<Transaction>({
  clienteId: '',
  cantidad: 0,
  categoria: '',
  fecha: '',
  tipo: 'income',
  estado: 'activa'
});

const isEditing = ref(false);
const editingId = ref<string | null>(null);

const getTransactions = async () => {
  try {
    const response = await axios.get(baseURL);
    transactions.value = response.data;
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
  }
};

onMounted(() => {
  getTransactions();
});

const resetForm = () => {
  form.clienteId = '';
  form.cantidad = 0;
  form.categoria = '';
  form.fecha = '';
  form.tipo = 'income';
  isEditing.value = false;
  editingId.value = null;
};

const addOrUpdateTransaction = async () => {
  try {
    if (isEditing.value && editingId.value) {
      const response = await axios.put(`${baseURL}/${editingId.value}`, form);
      const index = transactions.value.findIndex(t => t._id === editingId.value);
      if (index !== -1) {
        transactions.value[index] = response.data;
      }
    } else {
      const response = await axios.post(baseURL, form);
      transactions.value.push(response.data);
    }
    resetForm();
  } catch (error) {
    console.error('Error al guardar la transacción:', error);
  }
};


const editTransaction = (transaction: Transaction) => {
  form.clienteId = transaction.clienteId;
  form.cantidad = transaction.cantidad;
  form.categoria = transaction.categoria;
  form.fecha = transaction.fecha;
  form.tipo = transaction.tipo;
  isEditing.value = true;
  editingId.value = transaction._id || null;
};


const deactivateTransaction = async (id: string) => {
  try {
    const response = await axios.patch(`${baseURL}/${id}/deactivate`);
    const index = transactions.value.findIndex(t => t._id === id);
    if (index !== -1) {
      transactions.value[index] = response.data;
    }
  } catch (error) {
    console.error('Error al desactivar la transacción:', error);
  }
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4 dark:text-cyan-50 text-stone-900">Gestión de Transacciones</h1>

    <!-- Formulario para crear o editar transacciones -->
    <form @submit.prevent="addOrUpdateTransaction" class="bg-stone-900 p-6 rounded-2xl text-cyan-50 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-1">Cliente ID:</label>
          <InputText v-model="form.clienteId" placeholder="Ingrese el ID del cliente" />
        </div>
        <div>
          <label class="block mb-1">Cantidad:</label>
          <InputText v-model="form.cantidad" type="number" placeholder="Ingrese la cantidad" />
        </div>
        <div>
          <label class="block mb-1">Categoría:</label>
          <InputText v-model="form.categoria" placeholder="Categoría" />
        </div>
        <div>
          <label class="block mb-1">Fecha:</label>
          <InputText v-model="form.fecha" type="datetime-local" />
        </div>
        <div class="col-span-1 md:col-span-2">
          <label class="block mb-1">Tipo:</label>
          <select v-model="form.tipo" class="w-full p-2 my-2 rounded-lg dark:bg-cyan-100/60 bg-stone-900/60 dark:text-stone-950 text-cyan-50 font-semibold">
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
          </select>
        </div>
      </div>
      <div class="mt-4 flex gap-4">
        <InputButton :textButton="isEditing ? 'Actualizar' : 'Agregar'" type="submit" />
        <InputButton
          v-if="isEditing"
          textButton="Cancelar"
          type="button"
          @click="resetForm"
        />
      </div>
    </form>

    <div class="bg-stone-900 p-6 rounded-2xl text-cyan-50">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-stone-800">
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">Cliente ID</th>
            <th class="px-4 py-2">Cantidad</th>
            <th class="px-4 py-2">Categoría</th>
            <th class="px-4 py-2">Fecha</th>
            <th class="px-4 py-2">Tipo</th>
            <th class="px-4 py-2">Estado</th>
            <th class="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction._id"
            class="border-b border-stone-700"
          >
            <td class="px-4 py-2">{{ transaction._id }}</td>
            <td class="px-4 py-2">{{ transaction.clienteId }}</td>
            <td class="px-4 py-2">{{ transaction.cantidad }}</td>
            <td class="px-4 py-2">{{ transaction.categoria }}</td>
            <td class="px-4 py-2">{{ transaction.fecha }}</td>
            <td class="px-4 py-2">
              {{ transaction.tipo === 'income' ? 'Ingreso' : 'Gasto' }}
            </td>
            <td class="px-4 py-2">{{ transaction.estado }}</td>
            <td class="px-4 py-2 flex gap-2">
              <button
                @click="editTransaction(transaction)"
                class="bg-green-500 hover:bg-green-600 text-stone-900 font-bold py-1 px-2 rounded"
              >
                Editar
              </button>
              <button
                @click="transaction._id && deactivateTransaction(transaction._id)"
                class="bg-red-500 hover:bg-red-600 text-stone-900 font-bold py-1 px-2 rounded"
                :disabled="transaction.estado === 'desactivada'"
              >
                Desactivar
              </button>
            </td>
          </tr>
          <tr v-if="transactions.length === 0">
            <td colspan="8" class="text-center py-4">
              No hay transacciones registradas.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
</style>
