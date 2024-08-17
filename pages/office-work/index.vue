<template>
  <MPage :breadcrumbs="[]" title="Делопроизводство" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
