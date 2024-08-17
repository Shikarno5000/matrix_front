<template>
  <MPage
    :status="status"
    :title="data && data['name']"
    :title-short="data && data['name']"
    :error="error"
    :breadcrumbs="breadcrumbs"
  >
    <div v-if="data" class="grid md:grid-cols-3 gap-3">
      <MCard :data="data" :code="entitySettings.documents.table.code" :card="entitySettings.documents.card" @refresh="refresh" />
      <EStage :to="{table: 'documents', id: data.id }" :stages="data.stages" hide-in-modal @refresh="refresh" />
      <ETimeline :to="{table: 'documents', id: data.id }" :timelines="data.timelines" hide-in-modal @refresh="refresh" />
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('documents', useRoute().params.doc_id)

const breadcrumbs = computed(() => {
  const res = [{ to: '/projects/', title: 'Проекты' }]
  if (data.value) { res.push({ to: '/projects/' + data.value.chapter.subgroup.direction.project.id + '/', title: data.value.chapter.subgroup.direction.project.name_short }) }
  return res
})

definePageMeta({
  middleware: 'm-auth'
})
</script>
