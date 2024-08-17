<template>
  <MPage
    :status="status"
    :title="data && data['name']"
    :title-short="data && data['article']"
    :error="error"
    :breadcrumbs="[{ to: '/base', title: 'База' }, { to: '/base/elements', title: 'Элементная база' }]"
  >
    <div v-if="data" class="grid gap-3">
      <MCard :data="data" :code="entitySettings.elements.table.code" :card="entitySettings.elements.card" @refresh="refresh" />
      <MTable :settings="entitySettings.elementCodes.table" :to="{ id: data.id }" :items="data.element_codes" @refresh="refresh" />
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('elements', useRoute().params.id)

definePageMeta({
  middleware: 'm-auth'
})
</script>
