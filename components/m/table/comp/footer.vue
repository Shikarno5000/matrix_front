<template>
  <div class="flex flex-col md:flex-row justify-between w-full mt-4 text-xs p-1 px-3">
    <div class="flex gap-3 pb-3 items-center">
      <b>Всего элементов:</b> {{ length }}
    </div>
    <div v-if="limit && length" class="flex flex-col md:flex-row items-start md:items-center gap-2">
      Страница {{ startRow / limit + 1 }} из {{ Math.ceil(length / limit) }}
      <div class="flex mx-auto">
        <MBtnIcon :disabled="startRow === 0" icon="ph:caret-double-left" class="m-btn--small" @click="emits('changeStartRow', 0)" />
        <MBtnIcon :disabled="startRow === 0" icon="ph:caret-left" class="m-btn--small" @click="movePages(-1)" />
        <MBtnIcon :disabled="startRow === (Math.ceil(length / limit) - 1) * limit" icon="ph:caret-right" class="m-btn--small" @click="movePages(1)" />
        <MBtnIcon :disabled="startRow === (Math.ceil(length / limit) - 1) * limit" icon="ph:caret-double-right" class="m-btn--small" @click="emits('changeStartRow', (Math.ceil(length / limit) - 1) * limit)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  limit: number
  startRow: number
  length: number
}>()

const emits = defineEmits(['changeStartRow'])

const movePages = (amount: number) => {
  if (props.limit) {
    const newStartRow = props.startRow + amount * props.limit
    if (newStartRow >= 0 && newStartRow < props.length) {
      emits('changeStartRow', newStartRow)
    }
  }
}
</script>
