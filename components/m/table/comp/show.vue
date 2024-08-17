<template>
  <div class="flex gap-3 items-center px-2">
    <span class="hidden md:block ml-auto text-xs">Показывать</span>
    <select v-model="model" class="border">
      <option :value="0">
        все
      </option>
      <option :value="10">
        10
      </option>
      <option :value="50">
        50
      </option>
      <option :value="100">
        100
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel<number>()
</script>
