<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>
<template>
  <span class="m-badge">
    {{ text }}
  </span>
</template>
