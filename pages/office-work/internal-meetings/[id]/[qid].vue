<template>
  <MPage
    :status="status"
    :title="data && data['article']"
    :title-short="data && data['article']"
    :error="error"
    :breadcrumbs="breadcrumbs"
  >
    <div v-if="data" class="grid gap-3">
      <div class="grid grid-cols-2 gap-3">
        <MCard :data="data" :code="entitySettings.questions.table.code" :card="entitySettings.questions.card" @refresh="refresh" />
      </div>
      <MTable
        :settings="entitySettings.offers.table"
        :table="entitySettings.offers.table.code"
        :to="{ id: data.id }"
        :items="data.offers"
        @refresh="refresh"
      />
      <MTable
        :settings="entitySettings.decisions.table"
        :table="entitySettings.decisions.table.code"
        :to="{ id: data.id }"
        :items="data.decisions"
        @refresh="refresh"
      />
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('questions', useRoute().params.qid)

const breadcrumbs = computed(() => {
  const res = [{ to: '/office-work/', title: 'Делопроизводство' }, { to: '/office-work/internal-meetings/', title: 'Реестр внутренних совещаний' }]
  if (data.value) { res.push({ to: `/office-work/internal-meetings/${data.value.internal_meeting.id}`, title: data.value.internal_meeting.date }) }
  return res
})

definePageMeta({
  middleware: 'm-auth'
})
</script>
