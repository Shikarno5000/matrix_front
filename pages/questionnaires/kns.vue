<template>
  <MPage :breadcrumbs="[{ to: '/questionnaires', title: 'Опросные листы' }]" title="КНС" />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
</script>
