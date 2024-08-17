<template>
  <thead v-if="headers" class="m-table__header" :class="!limit ? 'sticky top-0 bg-white border-b z-20' : ''">
    <tr>
      <th v-if="batchEditingStart" />
      <th v-for="(header, index) in headers" :key="index" :class="[header.type && ['cog','files'].includes(header.type) ? 'text-center' : '']" :style="getSize(header)">
        <Icon v-if="header.type === 'cog'" name="mdi:cogs" class="" />
        <Icon v-else-if="header.type === 'files'" name="ph:files" class="text-base" />
        <div v-else class="flex items-center justify-between cursor-pointer" @click="changeSort(index)">
          {{ header.name }}
          <MTableCompIcon :index="index" :sort="sort" :asc-desc="ascDesc" />
        </div>
      </th>
    </tr>
  </thead>
</template>
<script setup lang="ts">
const props = defineProps<{
  headers: TValues[]
  sort: TSort
  limit: number
  batchEditingStart: boolean
}>()

function getSize (header: TTableHeader) {
  if (header.type === 'cog') { return 'width: 130px' }
  if (header.type === 'files') { return 'width: 200px' }
  return header.tableSize ? `width:${header.tableSize}px` : ''
}

const emits = defineEmits(['changeSort'])
const sort = ref(props.sort.index)
const ascDesc = ref(props.sort.ascDesc)
const changeSort = (index: number) => {
  if (sort.value === index) {
    ascDesc.value === 'desc' ? ascDesc.value = 'asc' : ascDesc.value = 'desc'
  }
  sort.value = index
  emits('changeSort', {
    index: sort,
    ascDesc
  })
}

</script>
