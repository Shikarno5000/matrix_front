<template>
  <MPage
    title="Предложения и замечания"
    :status="status"
    :error="error"
    :breadcrumbs="[]"
  >
    <MTable v-if="data" :settings="entitySettings.suggestions.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('suggestions')

definePageMeta({
  middleware: 'm-auth'
})
</script>
