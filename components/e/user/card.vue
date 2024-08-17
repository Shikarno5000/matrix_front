<script setup lang="ts">
const props = defineProps<{
  data: TUser | null
}>()
const title = computed(() => {
  if (!props.data) { return '' }
  let res = props.data.name_short
  if (props.data.user_status_id !== 1) { res += ` (${staticDataGetNameById('user_statuses', props.data.user_status_id, 'name_short')})` }
  return res
})

const values = computed(() => {
  return revCard(props.data, entitySettings.users.card.values)
})
</script>

<template>
  <MPopover v-if="data" :text="title">
    <MList :data="values" />
  </MPopover>
</template>
