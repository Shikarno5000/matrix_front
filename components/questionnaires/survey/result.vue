<script lang="ts" setup>
const { data: allRations } = await useAuthNew().getAll('ratios')

const props = defineProps<{
  result: any
}>()

const clearResult = computed(() => {
  const data = useCloneDeep(props.result)
  const result = []
  if (allRations.value) {
    for (const key in data) {
      if (data[key] !== 0) {
        const index = allRations.value.findIndex((i:any) => i.name === key)
        result.push({
          name: key,
          element_article: index !== -1 ? allRations.value[index].element.article : null,
          element_name: index !== -1 ? allRations.value[index].element.name : null,
          col: data[key]

        })
      }
    }
  }
  return result
})

const table = {
  code: '',
  title: 'Результат',
  import: false,
  export: false,
  importExport: [],
  delAll: false,
  add: false,
  edit: false,
  headers: [
    { name: 'Переменная', code: 'name', type: 'string' },
    { name: 'Артикул', code: 'element_article', type: 'string' },
    { name: 'Наименование', code: 'element_name', type: 'string' },
    { name: 'Количество', code: 'col', type: 'string' }

  ]
}

</script>

<template>
  <MTable :settings="table" :items="clearResult" />
</template>
