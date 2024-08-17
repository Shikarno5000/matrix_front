<script setup lang="ts">
const model = defineModel<boolean>()
</script>
<template>
  <MBtnIcon icon="material-symbols:edit-note-outline-sharp" :class="model ? '' : 'm-text-muted'" @click="model = !model" />
</template>
