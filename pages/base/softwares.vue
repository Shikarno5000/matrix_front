<template>
  <MPage
    title="Программное обеспечение"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/base', title: 'База' }]"
  >
    <MTable v-if="data" :settings="entitySettings.softwares.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('softwares')

definePageMeta({
  middleware: 'm-auth'
})
</script>
