<template>
  <MSection :sec-code="`info-${code}-${data.id}`" :title="card.title" hide-in-modal>
    <template #header>
      <MCreate v-if="data.create_update" :data="data.create_update" />
      <MDialog v-if="!noEdit" :data="data" :table="code" action="edit" @refresh="emit('refresh')" />
      <slot name="header" />
    </template>
    <MCardItems :items="revCard(data, card.values, { table: code, id: data.id})" @refresh="emit('refresh')" />
  </MSection>
</template>

<script setup lang="ts">

const emit = defineEmits(['refresh'])
defineProps<{
  data: any
  code: string
  card: any
  noEdit?: boolean
}>()
</script>
