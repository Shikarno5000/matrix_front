<template>
  <MPage
    :status="status"
    :title="data && data['date']"
    :title-short="data && data['date']"
    :error="error"
    :breadcrumbs="[{ to: '/office-work/', title: 'Делопроизводство' }, { to: '/office-work/internal-meetings/', title: 'Реестр внутренних совещаний' }]"
  >
    <div v-if="data" class="grid gap-3">
      <MCard :data="data" :code="entitySettings.internalMeetings.table.code" :card="entitySettings.internalMeetings.card" @refresh="refresh" />
      <MTable :items="data.questions" :to="{id: data.id }" :settings="entitySettings.questions.table" @refresh="refresh" />
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('internal-meetings', useRoute().params.id)

definePageMeta({
  middleware: 'm-auth'
})
</script>
