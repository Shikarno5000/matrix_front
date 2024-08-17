<template>
  <MPage
    :status="status"
    :title="data && data['name']"
    :title-short="data && data['article']"
    :error="error"
    :breadcrumbs="[{ to: '/base', title: 'База' }, { to: '/base/plks', title: 'ПЛК' }]"
  >
    <div v-if="data" class="grid gap-3">
      <MCard :data="data" :code="entitySettings.plks.table.code" :card="entitySettings.plks.card" @refresh="refresh" />
      <MTable :settings="entitySettings.plkElements.table" :items="data.plk_elements" :to="{ table: 'plks', id: data.id }" @refresh="refresh" />
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('plks', useRoute().params.id)

definePageMeta({
  middleware: 'm-auth'
})
</script>
