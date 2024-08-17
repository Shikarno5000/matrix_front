<template>
  <div>
    <MPageHeader :status="status" :title="title" :title-short="titleShort ? titleShort : title" :breadcrumbs="breadcrumbs" />
    <slot />
  </div>
  <MAlertErrorNew v-if="error" :error="error" />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  status?: string
  title?: string
  titleShort?: string | null
  error?: any
  breadcrumbs: any
}>(), {
  status: 'success',
  error: false,
  title: 'Заголовок',
  titleShort: null
})
// смена титла
function changeTitle() {
  if (props.title) {
    useHead({
      title: props.title ? props.title : 'Заголовок'
    })
  }
}
changeTitle()
watch(
  () => props.title,
  () => {
    changeTitle()
  }
)
</script>
