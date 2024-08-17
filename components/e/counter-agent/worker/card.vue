<script setup lang="ts">
const props = defineProps<{
    data: TCounterAgentWorker
  }>()

const text = computed(() => {
  if (!props.data) { return '' }
  return props.data.name_short
})
const values = computed(() => {
  return revCard(props.data, entitySettings.counterAgentWorkers.card.values)
})
</script>

<template>
  <MPopover v-if="data" :text="text">
    <MList :data="values" />
  </MPopover>
</template>
