<template>
  <MPage
    :status="status"
    :title="data && data['code']"
    :title-short="data && data['code']"
    :error="error"
    :breadcrumbs="[{ to: '/office-work/', title: 'Делопроизводство' }, { to: '/office-work/letters/', title: 'Реестр писем' }]"
  >
    <div v-if="data" class="grid gap-3">
      <MCard :data="data" :code="entitySettings.letters.table.code" :card="entitySettings.letters.card" @refresh="refresh" />
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('letters', useRoute().params.id)

definePageMeta({
  middleware: 'm-auth'
})
</script>
