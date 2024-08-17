<template>
  <MPage
    :status="status"
    :title="data && data['name']"
    :title-short="data && data['article']"
    :error="error"
    :breadcrumbs="breadcrumbs"
  >
    <div v-if="data" class="grid gap-3">
      <div class="grid md:grid-cols-3 gap-3">
        <MCard :data="data" :code="entitySettings.lowerLevels.table.code" :card="entitySettings.lowerLevels.card" @refresh="refresh" />
        <EStage :to="{ table: 'lower-levels', id: data.id }" :stages="data.stages" hide-in-modal @refresh="refresh" />
        <ETimeline :to="{ table: 'lower-levels', id: data.id }" :timelines="data.timelines" hide-in-modal @refresh="refresh" />
      </div>
      <MTable :settings="entitySettings.lowerLevelElements.table" :items="data.lower_level_elements" :to="{ table: 'lower-levels', id: data.id }" @refresh="refresh" />
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('lower-levels', useRoute().params.lower_level_id)

const breadcrumbs = computed(() => {
  const res = [{ to: '/projects/', title: 'Проекты' }]
  if (data.value) { res.push({ to: '/projects/' + data.value.chapter.subgroup.direction.project.id + '/', title: data.value.chapter.subgroup.direction.project.name_short }) }
  return res
})

definePageMeta({
  middleware: 'm-auth'
})
</script>
