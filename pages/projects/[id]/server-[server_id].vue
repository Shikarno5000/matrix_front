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
        <MCard :data="data" :code="entitySettings.servers.table.code" :card="entitySettings.servers.card" @refresh="refresh" />
        <EStage :to="{table: 'servers', id: data.id }" :stages="data.stages" hide-in-modal @refresh="refresh" />
        <ETimeline :to="{table: 'servers', id: data.id }" :timelines="data.timelines" hide-in-modal @refresh="refresh" />
      </div>
      <MTable :settings="entitySettings.serverElements.table" :items="data.server_elements" :to="{id: data.id }" @refresh="refresh" />
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('servers', useRoute().params.server_id)

const breadcrumbs = computed(() => {
  const res = [{ to: '/projects/', title: 'Проекты' }]
  if (data.value) { res.push({ to: '/projects/' + data.value.chapter.subgroup.direction.project.id + '/', title: data.value.chapter.subgroup.direction.project.name_short }) }
  return res
})

definePageMeta({
  middleware: 'm-auth'
})

</script>
