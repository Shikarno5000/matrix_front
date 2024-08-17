<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>
<template>
  <MBtnIcon
    :disabled="disabled"
    icon="material-symbols:close-rounded"
    text="Закрыть"
  />
</template>
