<script setup lang="ts">
type valuesList = 'error' | 'success' | 'warning' | 'info';
const data = {
  error: {
    class: 'm-alert--error',
    icon: 'ic:baseline-error-outline'
  },
  success: {
    class: 'm-alert--success',
    icon: 'clarity:success-standard-line'
  },
  warning: {
    class: 'm-alert--warning',
    icon: 'ic:sharp-warning-amber'
  },
  info: {
    class: 'm-alert--info',
    icon: 'mdi:information-variant'
  }
}
defineProps<{
  type: valuesList
}>()

</script>
<template>
  <div class="m-alert" :class="data[type].class" role="alert">
    <Icon :name="data[type].icon" class="m-alert__icon" />
    <div>
      <slot />
    </div>
  </div>
</template>
