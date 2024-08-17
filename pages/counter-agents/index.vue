<template>
  <MPage
    title="Контрагенты"
    :status="status"
    :error="error"
    :breadcrumbs="[]"
  >
    <MTable v-if="data" :settings="entitySettings.counterAgents.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('counter-agents')

definePageMeta({
  middleware: 'm-auth'
})
</script>
