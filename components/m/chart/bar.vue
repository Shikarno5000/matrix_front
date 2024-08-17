<template>
  <apexchart :id="container" width="500" type="bar" :options="options" :series="series" />
</template>

<script setup lang="ts">

const props = defineProps<{
  categories: string[] | number[]
  series: {
    name: string,
    data: number[]
  }[]
}>()

const container = 'chart-' + Math.ceil(Math.random() * 1000)

const options = computed(() => {
  return {
    chart: {
      id: container
    },
    xaxis: {
      categories: props.categories
    }
  }
})

</script>
