<template>
  <MPopoverIcon v-if="!(!data.c && !data.u)" icon="solar:info-circle-line-duotone">
    <MList :data="listData" />
  </MPopoverIcon>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: ACreatedUpdated
}>()

const listData = computed(() => {
  const result = []
  if (props.data.c) {
    result.push({
      name: 'Создал',
      data: { value: `${props.data.c.by} (${formatTime(props.data.c.at)})`, type: 'text' }
    })
  }
  if (props.data.u) {
    result.push({
      name: 'Изменил',
      data: { value: `${props.data.u.by} (${formatTime(props.data.u.at)})`, type: 'text' }
    })
  }

  return result
})
</script>
