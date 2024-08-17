<template>
  <MPage :breadcrumbs="[{ to: '/warehouse', title: 'Склад' }]" title="Произведенная продукция" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
