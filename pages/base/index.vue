<template>
  <MPage :breadcrumbs="[]" title="База" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
