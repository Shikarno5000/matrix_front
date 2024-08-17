<template>
  <MTable
    :settings="entitySettings.lowerLevels.table"
    :title="data.name"
    :items="data.lower_levels"
    :to="{id: data.id }"
    @refresh="emit('refresh')"
  >
    <template #header>
      <MCreate v-if="data.create_update" :data="data.create_update" />
      <MDialog table="chapters" action="edit" :data="data" @refresh="emit('refresh')" />
    </template>
  </MTable>
</template>

<script setup lang="ts">
defineProps<{
  data: TChapter
}>()
const emit = defineEmits(['refresh'])
</script>
