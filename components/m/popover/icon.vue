<template>
  <Popover class="m-popover">
    <PopoverButton as="span">
      <MBtnIcon class="m-btn--small" :icon="icon" />
    </PopoverButton>

    <PopoverPanel class="m-popover__panel">
      <slot />
    </PopoverPanel>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
defineProps<{
  icon: string
}>()
</script>
