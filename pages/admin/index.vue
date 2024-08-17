<template>
  <MPage :breadcrumbs="[]" title="Админ" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
