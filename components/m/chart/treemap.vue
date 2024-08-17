<template>
  <apexchart :id="container" type="treemap" height="350" :options="options" :series="series" />
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string
  series: {
    name: string,
    data: {x: number, y: number}[]
  }
}>()

const container = 'chart-' + Math.ceil(Math.random() * 1000)

const options = computed(() => {
  return {
    chart: {
      id: container,
      height: 350,
      type: 'treemap'
    },
    legend: {
      show: false
    },
    title: {
      text: props.title
    }
  }
})

</script>
