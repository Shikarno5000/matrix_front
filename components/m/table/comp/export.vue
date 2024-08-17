<template>
  <MBtnIcon icon="lets-icons:export" title="Экспорт в xlsx" icon-class="text-base" @click="exportFile" />
</template>

<script lang="ts" setup>
import { utils, writeFileXLSX } from 'xlsx'
const props = defineProps<{
  settings: any
  items: any[]
  table: string
}>()

// получение данных для экспорта
const exportData = computed(() => {
  if (!props.settings) { return [] }
  let pick: string[] = Object.keys(props.settings)
  return props.items.map((i) => {
    // замена значений
    if (props.table === 'product-elements' && i.element) {
      i.element_article = i.element.article
      pick = pick.map(i => i === 'element_id' ? 'element_article' : i)
    }
    return usePick(i, pick)
  })
})

function exportFile () {
  /* generate worksheet from state */
  const ws = utils.json_to_sheet(exportData.value)
  /* create workbook and append worksheet */
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Data')
  /* export to XLSX */
  writeFileXLSX(wb, props.table + '.xlsx')
}

</script>
