<template>
  <MPage :breadcrumbs="[{ to: '/warehouse', title: 'Склад' }]" title="Комплектация" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
