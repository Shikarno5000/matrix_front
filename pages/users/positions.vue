<template>
  <MPage
    title="Должности"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/users', title: 'Работники Матрикс' }]"
  >
    <MTable v-if="data" :settings="entitySettings.positions.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('positions')

definePageMeta({
  middleware: 'm-auth'
})
</script>
