<template>
  <LayoutsLogin />
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'login',
  middleware: 'm-guest'
})
useHead({
  title: 'Войти'
})
</script>
