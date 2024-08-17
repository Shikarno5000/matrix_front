<template>
  <MPage
    title="Реестр договоров"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/office-work', title: 'Делопроизводство' }]"
  >
    <MTable v-if="data" :settings="entitySettings.contracts.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('contracts')

definePageMeta({
  middleware: 'm-auth'
})
</script>
