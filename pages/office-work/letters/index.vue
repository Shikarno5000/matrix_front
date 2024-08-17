<template>
  <MPage
    title="Реестр писем"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/office-work', title: 'Делопроизводство' }]"
  >
    <MTable v-if="data" :settings="entitySettings.letters.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('letters')

definePageMeta({
  middleware: 'm-auth'
})
</script>
