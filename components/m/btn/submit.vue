<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>
<template>
  <MBtn text="Отправить" :disabled="disabled" class="m-btn--gray" />
</template>
