<template>
  <MPage
    title="Соотношение элементов"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/questionnaires', title: 'Опросные листы' }]"
  >
    <MTable v-if="data" :settings="entitySettings.ratios.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('ratios')

definePageMeta({
  middleware: 'm-auth'
})
</script>
