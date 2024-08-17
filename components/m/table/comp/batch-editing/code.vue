<template>
  <MFormSelect
    v-if="values"
    v-model="code"
    :values="values"
    name="Столбец или действие"
    code="batchEditing-code"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  headers: any
}>()
const code = defineModel<any>()
const values = computed(() => {
  return [...useCloneDeep(props.headers).map((i: any) => {
    return { id: i.code, name: i.name }
  }), { id: 'deleteAllIds', name: 'Удалить выбранные' }]
})
</script>
