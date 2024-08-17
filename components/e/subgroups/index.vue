<template>
  <MSection :sec-code="`subgroup-${data.id}`" :title="data.name" type="second" hide-in-modal>
    <template #header>
      <MCreate v-if="data.create_update" :data="data.create_update" />
      <MDialog table="subgroups" action="edit" :data="data" @refresh="emit('refresh')" />
      <MDialog table="chapters" btn-title="Добавить раздел" :to="{id: data.id }" action="add" @refresh="emit('refresh')" />
    </template>
    <div class="grid gap-1">
      <EChapters v-for="chapter in data.chapters" :key="chapter.id" :data="chapter" @refresh="emit('refresh')" />
    </div>
  </MSection>
</template>

<script setup lang="ts">
defineProps<{
  data: TSubgroup
}>()
const emit = defineEmits(['refresh'])
</script>
