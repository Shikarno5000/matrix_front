<template>
  <MPage
    :status="status"
    :title="data && data['name']"
    :title-short="data && data['name_short']"
    :error="error"
    :breadcrumbs="[{ to: '/projects/', title: 'Проекты' }]"
  >
    <div v-if="data" class="grid gap-3">
      <div class="grid md:grid-cols-3 gap-3">
        <MCard :data="data" :code="entitySettings.projects.table.code" :card="entitySettings.projects.card" @refresh="refresh">
          <template #header>
            <MDialog table="directions" action="add" :to="{id: data.id}" @refresh="refresh" />
          </template>
        </MCard>
        <EParticipant :data="data" @refresh="refresh" />
        <EStage :to="{table: 'projects', id: data.id }" :stages="data.stages" hide-in-modal @refresh="refresh" />
      </div>
      <EDirection
        v-for="direction in data.directions"
        :key="direction.id"
        :direction-id="direction.id"
        :name="direction.name"
        :data="direction"
        @refresh="refresh"
      />
      <div class="grid md:grid-cols-3 gap-3">
        <ETimeline title="История проекта" :to="{table: 'projects', id: data.id }" :timelines="data.timelines" hide-in-modal @refresh="refresh" />
        <MTable
          class="col-span-2"
          :settings="entitySettings.files.table"
          :items="data.files"
          :to="{table: 'projects', id: data.id }"
          @refresh="refresh"
        />
      </div>
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('projects', useRoute().params.id)

definePageMeta({
  middleware: 'm-auth'
})
</script>
