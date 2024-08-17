<template>
  <div>
    <div class="flex items-start gap-2">
      <Icon name="ic:outline-subdirectory-arrow-right" class="mt-2" />
      <div class="flex-1 grid gap-2">
        <EChaptersDocumentsTable v-if="data.chapter_type_id === 1" :data="data" @refresh="emit('refresh')" />
        <EChaptersProductTable v-if="data.chapter_type_id === 2" :data="data" @refresh="emit('refresh')" />
        <EChaptersPlksTable v-if="data.chapter_type_id === 3" :data="data" @refresh="emit('refresh')" />
        <EChaptersLowerLevelsTable v-if="data.chapter_type_id === 4" :data="data" @refresh="emit('refresh')" />
        <EChaptersServerTable v-if="data.chapter_type_id === 5" :data="data" @refresh="emit('refresh')" />
        <EChaptersSoftwaresTable v-if="data.chapter_type_id === 6" :data="data" @refresh="emit('refresh')" />
        <EChaptersElementsTable v-if="data.chapter_type_id === 7" :data="data" @refresh="emit('refresh')" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: TChapter
}>()
const emit = defineEmits(['refresh'])
</script>
