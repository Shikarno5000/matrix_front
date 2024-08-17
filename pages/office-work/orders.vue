<template>
  <MPage
    title="Реестр приказов"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/office-work', title: 'Делопроизводство' }]"
  >
    <MTable v-if="data" :settings="entitySettings.orders.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('orders')

definePageMeta({
  middleware: 'm-auth'
})
</script>
