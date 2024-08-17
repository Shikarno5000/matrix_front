<template>
  <MPage
    title="Реестр служебных записок"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/office-work', title: 'Делопроизводство' }]"
  >
    <MTable v-if="data" :settings="entitySettings.officialNotes.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('official-notes')

definePageMeta({
  middleware: 'm-auth'
})
</script>
