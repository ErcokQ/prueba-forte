<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from '@/components/ui/InputText.vue';
import InputButton from '@/components/ui/InputButton.vue';
import Alert from '@/components/ui/Alert.vue';

const username = ref('');
const password = ref('');

const showAlert = ref(false);
const alertType = ref<'success' | 'error' | 'warning'>('error');
const alertMessage = ref('');
const title = ref('Alerta');
const router = useRouter();

function handleSubmit(event: Event) {
  event.preventDefault();
  if (username.value === 'admin' && password.value === 'admin') {
    router.push('/dashboard/inicio');
  } else {
    alertType.value = 'error';
    alertMessage.value = 'Credenciales incorrectas, por favor intenta de nuevo';
    showAlert.value = true;
    title.value = 'Error al iniciar sesión';
  }
}
</script>

<template>
  <section class="flex justify-center items-center p-6 h-screen w-full">
    <div class="flex flex-col p-6 justify-center items-center w-[80%] xl:w-1/4 lg:w-1/3 dark:bg-stone-300/10 bg-stone-900/60 rounded-2xl dark:shadow-cyan-50 shadow-stone-900 shadow-lg">
      <h1 class="md:text-3xl text-xl font-bold text-cyan-50">Iniciar Sesión</h1>
      <form @submit="handleSubmit" class="flex flex-col justify-center items-center w-full p-6">
        <InputText v-model="username" placeholder="Usuario" />
        <InputText v-model="password" placeholder="Contraseña" type="password" />
        <InputButton textButton="Iniciar Sesión" type="submit" />
      </form>
      <div v-if="showAlert">
        <Alert :type="alertType" :message="alertMessage" :title="title" :useCase="'alert'"  @close="showAlert = false"  />
      </div>
    </div>
  </section>
</template>
