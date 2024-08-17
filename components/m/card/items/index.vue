<template>
  <div class="divide-y">
    <template v-for="td in items" :key="td.name">
      <div v-if="show(td.data.value)" class="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4 sm:items-center text-xs">
        <div class="font-semibold text-gray-900">
          {{ td.name }}
        </div>
        <div class="text-gray-700 sm:col-span-2">
          <MRevData table="" :edit="true" :data="td.data" @refresh="emit('refresh')" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
function show(value: any) {
  if (!value) { return false }
  if (Array.isArray(value) && value.length === 0) { return false }
  return true
}

defineProps <{
  items: any
}>()
const emit = defineEmits(['refresh'])
</script>
