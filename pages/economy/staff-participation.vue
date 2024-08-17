<template>
  <MPage :breadcrumbs="[{ to: '/economy', title: 'Экономика' }]" title="Участие персонала в проектах" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
