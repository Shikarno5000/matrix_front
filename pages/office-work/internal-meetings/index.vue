<template>
  <MPage
    title="Реестр внутренних совещаний"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/office-work', title: 'Делопроизводство' }]"
  >
    <MTable v-if="data" :settings="entitySettings.internalMeetings.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('internal-meetings')

definePageMeta({
  middleware: 'm-auth'
})
</script>
