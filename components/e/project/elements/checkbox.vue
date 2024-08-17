<template>
  <input v-model="value" type="checkbox" class="size-5" @click="emit('valueChange', {name, value: !value} )">
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  value: boolean
}>()

const value = computed(() => props.value)
const emit = defineEmits(['valueChange'])

</script>
