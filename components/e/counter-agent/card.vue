<script setup lang="ts">
const props = defineProps<{
  data: TCounterAgent | null
}>()
const text = computed(() => {
  if (!props.data) { return '' }
  let result = props.data.name_short
  if (props.data.pivot?.comment) { result += `(${props.data.pivot?.comment})` }
  return result
})

const values = computed(() => {
  return revCard(props.data, entitySettings.counterAgents.card.values)
})
</script>

<template>
  <MPopover v-if="data" :text="text">
    <MList :data="values" />
  </MPopover>
</template>
