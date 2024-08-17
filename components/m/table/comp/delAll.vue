<template>
  <MBtnIcon icon="tabler:trash-x-filled" title="Очистить таблицу" icon-class="text-base" @click="delAll()" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  table: string
  to: TTo
}>()

const emit = defineEmits(['refresh'])

async function delAll() {
  if (window.confirm('Вы уверены, что хотите очистить таблицу?')) {
    if (props.table === 'product-elements' && props.to?.id) {
      await useAuthNew().delAll(`${props.table}/del-all/${props.to.id}`)
      emit('refresh')
    }
  }
}

// // получение данных для экспорта
// const exportData = computed(() => {
//   if (!props.settings) { return [] }
//   let pick: string[] = Object.keys(props.settings)
//   return props.items.map((i) => {
//     // замена значений
//     if (props.table === 'product-elements' && i.element) {
//       i.element_article = i.element.article
//       pick = pick.map(i => i === 'element_id' ? 'element_article' : i)
//     }
//     return usePick(i, pick)
//   })
// })

// function exportFile () {
//   /* generate worksheet from state */
//   const ws = utils.json_to_sheet(exportData.value)
//   /* create workbook and append worksheet */
//   const wb = utils.book_new()
//   utils.book_append_sheet(wb, ws, 'Data')
//   /* export to XLSX */
//   writeFileXLSX(wb, props.table + '.xlsx')
// }

</script>
