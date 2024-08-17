<template>
  <MPage :breadcrumbs="[{ to: '/economy', title: 'Экономика' }]" title="Структура организации / штатное расписание" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
