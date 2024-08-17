<template>
  <MAlert v-if="error" type="error">
    <b>{{ error.toString().split(' ')[3] }}</b>
    {{ errorText }}
  </MAlert>
</template>

<script lang="ts" setup>
const props = defineProps<{
  error: any | null
}>()

const errorText = computed(() => {
  if (typeof props.error.data === 'string') { return props.error.data }
  if (props.error.data.message) { return props.error.data.message }
})
</script>
