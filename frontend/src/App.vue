<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    // Enviar mensaje a Electron
    window.electron.send('mensaje-desde-vue', 'Hola desde Vue');

    // Escuchar respuesta desde Electron
    window.electron.receive('respuesta-desde-electron', (data) => {
        console.log('Respuesta desde Electron:', data);
    });
});
</script>

<template>
    <h1>Hola mundo</h1>
</template>

<style scoped>
</style>
