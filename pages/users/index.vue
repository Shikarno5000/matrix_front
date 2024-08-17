<template>
  <MPage
    title="Работники Матрикс"
    :status="status"
    :error="error"
    :breadcrumbs="[]"
  >
    <MTable v-if="data" :settings="entitySettings.users.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('users')

definePageMeta({
  middleware: 'm-auth'
})
</script>
