<template>
  <MPage
    title="Программируемые логические контроллеры"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/base', title: 'База' }]"
  >
    <MTable v-if="data" :settings="entitySettings.plks.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('plks')

definePageMeta({
  middleware: 'm-auth'
})
</script>
