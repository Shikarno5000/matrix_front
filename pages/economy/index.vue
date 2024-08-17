<template>
  <MPage :breadcrumbs="[]" title="Экономика" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
