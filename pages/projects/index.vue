<template>
  <MPage
    title="Проекты"
    :status="status"
    :error="error"
    :breadcrumbs="[]"
  >
    <MTable v-if="data" :settings="entitySettings.projects.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('projects')

definePageMeta({
  middleware: 'm-auth'
})
</script>
