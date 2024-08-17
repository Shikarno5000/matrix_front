<script setup lang="ts">
defineProps<{
  disabled?: boolean
  iconStart?: string
  iconEnd?: string
  text?: string
  textClass?: string
  color?: string
}>()
</script>
<template>
  <button :title="text" type="button" class="m-btn" :disabled="disabled">
    <Icon
      v-if="iconStart"
      :name="iconStart"
    />
    <span v-if="text" :class="textClass">
      {{ text }}
    </span>
    <Icon
      v-if="iconEnd"
      :name="iconEnd"
    />
  </button>
</template>
