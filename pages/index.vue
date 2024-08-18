<template>
  <div class="mx-auto max-w-screen px-4 py-20 lg:flex lg:items-center">
    <div class="mx-auto max-w-xl text-center">
      <h1 class="text-3xl font-extrabold sm:text-5xl">
        Dashboard
        <strong class="font-extrabold text-red-700 sm:block"> в разработке! </strong>
        <div class="text-xs opacity-20">
          0.0100
        </div>        
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'm-auth'
})
useHead({
  title: 'Главная страница'
})
</script>
