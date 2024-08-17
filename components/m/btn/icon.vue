<script setup lang="ts">
defineProps<{
  disabled?: boolean
  icon: string
  iconClass?: string
  text?: string
}>()
</script>
<template>
  <button type="button" class="m-btn group" :title="text" :disabled="disabled">
    <Icon
      :name="icon"
      class="m-btn__icon"
      :class="iconClass"
    />
    <span class="sr-only">{{ text }}</span>
  </button>
</template>
