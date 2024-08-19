<template>
  <MFormInput v-model="filter" code="filter" name="" icon="mdi:search" class="m-input--header" />  
  <div v-for="filteredItem in filteredItems">
    <div class="bg-red-300 p-1"><b>Вопрос:</b> {{ filteredItem.question }}</div>
    <div>{{ filteredItem.answer }}</div>
  </div>
</template>

<script setup lang="ts">
import data from './data.json'


const filter = ref('')
const filteredItems = computed(() => {
  if (!data) {
    return []
  }
  // Фильтрация
  let filteredItems = []
  if (filter.value && filter.value.length > 1) {
    const filterArray = filter.value.toLowerCase().split(' ').filter(i => i !== '')
    filteredItems = data.filter((item: any) => {
      const str = String(item.question).toLowerCase()
      let lineFind = true
      filterArray.forEach((f) => {
        if (!str.includes(f)) {
          lineFind = false
        }
      })
      if (lineFind) { return true }      
    })
  } else {
    filteredItems = data
  }
  return filteredItems
})


definePageMeta({
  middleware: 'm-auth'
})
useHead({
  title: 'Вопросы'
})
</script>
