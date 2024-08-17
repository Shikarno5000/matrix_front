<script setup lang="ts">
defineProps<{
  data: any[]
}>()
</script>

<template>
  <template v-for="td in data" :key="td.name">
    <div v-if="td.data.value" class="m-list">
      <span class="m-list__head">
        {{ td.name }}:
      </span>
      <span><MRevData table="" :edit="false" :data="td.data" /></span>
    </div>
  </template>
</template>
