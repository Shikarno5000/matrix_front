<template>
  <h2 class=" flex-1 font-semibold  uppercase text-xs pl-2">
    {{ title }}
  </h2>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>
