<template>
  <MTable v-if="items" :settings="table" :items="items" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: any
}>()

const { data: items, refresh } = useAuthNew().api(`element-prices/element/${props.data.element_id}`, 'GET')

watch(
  () => props.data?.element_id,
  () => {
    refresh()
  }
)
const table = {
  code: '',
  title: 'Цены в базе',
  import: false,
  export: false,
  importExport: [],
  delAll: false,
  add: false,
  edit: false,
  headers: [
    { name: 'Цена', code: 'price', type: 'price' },
    { name: 'Цена для Матрикс', code: 'price_for_matrix', type: 'string' },
    { name: 'Поставщик', code: 'counter_agent', type: 'extractingValues', extractingValue: 'name_short' },
    { name: 'Дата изменения', code: 'create_update', type: 'extractingValues', extractingValue: ['u', 'at'] }
  ]
}
</script>
