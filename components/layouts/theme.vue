<script lang="ts" setup>
const colorMode = useColorMode()

const changeTheme = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
const iconName = computed(() => {
  if (colorMode.value === 'dark') { return 'material-symbols:light-mode' }
  if (colorMode.value === 'light') { return 'material-symbols:sleep-outline' }
  return false
})
</script>

<template>
  <ClientOnly>
    <MBtnIcon v-if="iconName" :icon="iconName" @click="changeTheme()" />
  </ClientOnly>
</template>
