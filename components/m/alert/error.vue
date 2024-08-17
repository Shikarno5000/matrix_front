<template>
  <MAlert v-if="errorData" type="error">
    <div class="font-semibold">
      {{ errorData.type }}
    </div>
    {{ errorData.msg }}
  </MAlert>
</template>

<script lang="ts" setup>
const props = defineProps<{
  error: TErrorData | false
}>()
const errorData = computed(() => {
  if (!props.error) {
    return false
  }

  const errorMsg = props.error.msg

  if (typeof errorMsg === 'string') {
    return {
      type: props.error.type,
      msg: errorMsg
    }
  }

  if (typeof errorMsg === 'object') {
    const result = []

    for (const key in errorMsg) {
      result.push(`${key}: ${errorMsg[key as keyof typeof errorMsg]}`)
    }

    return {
      type: props.error.type,
      msg: result.join(', ')
    }
  }

  return errorMsg
})
</script>
