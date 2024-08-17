<template>
  <MPage :breadcrumbs="[]" title="Опросные листы" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
