<template>
  <MPage :breadcrumbs="[]" title="Склад" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
