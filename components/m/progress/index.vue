<template>
  <div class="m-progress">
    <span
      class="m-progress__icon"
    >
      <Icon :name="icon" />
    </span>
    <div class="space-y-3 flex-1">
      <div class="flex items-center">
        <span
          class="font-medium text-sm mr-auto text-gray-700 flex items-center"
        >
          {{ title }}
        </span>
        <span class="px-2 py-1 rounded-lg bg-red-50 text-red-500 text-xs">
          {{ value }} / {{ max }}
        </span>
      </div>
      <div class="overflow-hidden bg-blue-50 h-1.5 rounded-full w-full">
        <span
          class="h-full bg-blue-500 w-full block rounded-full"
          :style="{ width: percent + '%' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
  title: string
  max: number
  value: number
}>()
const percent = computed(() => percentCalculation(props.value, props.max))
</script>
