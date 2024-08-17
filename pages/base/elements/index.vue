<template>
  <MPage
    title="Элементная база"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/base', title: 'База' }]"
  >
    <MTable v-if="data" :settings="entitySettings.elements.table" :items="data.data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('elements')

definePageMeta({
  middleware: 'm-auth'
})
</script>
