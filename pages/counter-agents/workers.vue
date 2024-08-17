<template>
  <MPage
    title="Работники контрагентов"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/counter-agents', title: 'Контрагенты' }]"
  >
    <MTable v-if="data" :settings="entitySettings.counterAgentWorkers.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('counter-agent-workers')

definePageMeta({
  middleware: 'm-auth'
})
</script>
