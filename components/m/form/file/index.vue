<script lang="ts" setup>
const props = defineProps<{
    code: string
    modelValue: any
  }>()
const inputId = computed(() => 'input-' + props.code)
const model = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])
watch(
  () => model.value,
  () => {
    emit('update:modelValue', model.value)
  }
)
watch(
  () => props.modelValue,
  () => {
    model.value = props.modelValue
  }
)
const handleFileUpload = (e: any) => {
  // model.value = e.target.files[0]
  model.value = null
  if (!e.target.files.length) { return }
  const selectedFiles = e.target.files
  for (let i = 0; i < selectedFiles.length; i++) {
    model.value = selectedFiles[i]
  }
}
</script>

<template>
  <input :id="inputId" ref="file" type="file" @change="handleFileUpload">
</template>
