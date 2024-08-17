<template>
  <MPage
    :status="status"
    :title="data && data['code']"
    :title-short="data && data['code']"
    :error="error"
    :breadcrumbs="[{ to: '/office-work/', title: 'Делопроизводство' }, { to: '/office-work/contracts/', title: 'Реестр договоров' }]"
  >
    <div v-if="data" class="grid gap-3">
      <MCard :data="data" code="contracts" :card="entitySettings.contracts.card" @refresh="refresh" />
      <MTable :items="data.specifications" :to="{id: data.id }" :settings="entitySettings.specifications.table" @refresh="refresh" />
      <MTable :items="data.applications" :to="{id: data.id }" :settings="entitySettings.applications.table" @refresh="refresh" />
      <MTable
        :settings="entitySettings.letters.table"
        :items="data.letters"
        :to="{id: data.id }"
        @refresh="refresh"
      />
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('contracts', useRoute().params.id)

definePageMeta({
  middleware: 'm-auth'
})
</script>
