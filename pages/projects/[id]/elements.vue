<template>
  <MPage
    title="Выгрузка элементов"
    :status="status"
    :error="error"
    :breadcrumbs="breadcrumbs"
  >
    <EProjectElements v-if="data" :data="data" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error } = useAuthNew().getShow('projects/elements', useRoute().params.id)

definePageMeta({
  middleware: 'm-auth'
})

const breadcrumbs = computed(() => {
  const res = [{ to: '/projects/', title: 'Проекты' }]
  if (data.value) { res.push({ to: '/projects/' + data.value.id + '/', title: data.value.name }) }
  return res
})
</script>
