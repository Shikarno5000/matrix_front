<template>
  <MPage
    title="Цены"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/base', title: 'База' }]"
  >
    <MTable v-if="data" :settings="entitySettings.elementPrices.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('element-prices')

definePageMeta({
  middleware: 'm-auth'
})
</script>
