<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'
const store = useAuthStore()
await store.getUser()
const menuShow = ref(false)

if (process.client) {
  menuShow.value = window.innerWidth > 1280
}
</script>

<template>
  <div class="m-main">
    <ClientOnly><LayoutsSidebar v-if="menuShow" @close="menuShow = false" /></ClientOnly>
    <div class="m-main__body">
      <header class="m-body__header">
        <div class="flex items-center gap-3">
          <MBtnIcon icon="ic:baseline-menu" class="m-btn--icon-big" @click="menuShow = !menuShow" />
          <LayoutsLogo />
        </div>
        <div class="inline-flex">
          <LayoutsUser />
        </div>
      </header>
      <div class="p-3 md:p-6">
        <slot />
      </div>
    </div>
  </div>
</template>
