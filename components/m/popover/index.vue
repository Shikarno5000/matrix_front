<template>
  <Popover class="m-popover">
    <PopoverButton class="m-popover__btn" :class="classBtn">
      <Icon v-if="icon" :name="icon" class="m-popover__icon" />
      <span v-if="text">{{ text }}</span>
    </PopoverButton>

    <PopoverPanel class="m-popover__panel">
      <slot />
    </PopoverPanel>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
defineProps<{
  text?: string
  icon?: string
  classBtn?: string
}>()
</script>
