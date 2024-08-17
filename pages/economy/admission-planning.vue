<template>
  <MPage :breadcrumbs="[{ to: '/economy', title: 'Экономика' }]" title="Планирование поступления/расхода ДС в проектах" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
