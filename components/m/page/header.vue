<script setup lang="ts">
defineProps<{
  title?: string,
  status?: string,
  titleShort?: string,
  breadcrumbs?: {to: string, title: string}[]
}>()
</script>
<template>
  <div class="flex flex-col md:flex-row md:justify-between md:items-center py-4">
    <h1 class="flex text-2xl font-extrabold items-center">
      <MSpin v-if="status === 'pending'" />
      {{ title }}
    </h1>
    <nav aria-label="breadcrumb" class="block">
      <ol class="flex w-full flex-wrap items-center rounded-md bg-blue-gray-50 bg-opacity-60">
        <li class="flex items-center font-sans text-sm font-normal leading-normal ">
          <NuxtLink to="/">
            <Icon name="material-symbols:home-outline" class="h-4 w-4 mb-1 opacity-60 m-link" />
          </NuxtLink>

          <span class="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased">
            /
          </span>
        </li>
        <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb.to" class="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal m-link">
          <NuxtLink :to="breadcrumb.to">
            <span>{{ breadcrumb.title }}</span>
          </NuxtLink>
          <span class="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased">
            /
          </span>
        </li>
        <li class="flex items-center font-sans text-sm font-normal leading-normal text-gray-900 antialiased transition-colors duration-300">
          <span
            class="text-blue-gray-900 transition-colors"
          >
            {{ titleShort ? titleShort : title }}
          </span>
        </li>
      </ol>
    </nav>
  </div>
</template>
