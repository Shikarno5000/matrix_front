<template>
  <Icon :name="icon" class="text-lg" :class="textColor" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  sort: number
  ascDesc: string
  index: number
}>()
const icon = computed(() => {
  if (props.index !== props.sort) { return 'prime:sort-alt' }
  if (props.ascDesc === 'asc') { return 'prime:sort-alpha-down' }
  return 'prime:sort-alpha-up'
})
const textColor = computed(() => {
  return props.index !== props.sort ? 'text-gray-400' : 'text-gray-900'
})
</script>
