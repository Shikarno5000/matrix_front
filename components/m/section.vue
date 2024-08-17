<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue'
import { useAuthStore } from '~/store/auth'
const store = useAuthStore()
const props = defineProps<{
  title?: string
  hideInModal?: true
  type?: 'second'
  secCode: string
}>()

const showSettings = store.getSettingValue(`section-${props.secCode}-show`)
const defaultOpen = ref(showSettings !== undefined ? showSettings : true)
// if (props.hideInModal && process.client) {
//   defaultOpen.value = window.innerWidth > 1280
// }

</script>
<template>
  <Disclosure v-slot="{ open }" :default-open="defaultOpen" as="div" class="m-section" :class="type ==='second' ? 'm-section--second' : ''">
    <div class="m-section__header">
      <h2 class="m-section__title">
        {{ title }}
      </h2>
      <ClientOnly>
        <div class="flex gap-2 items-center">
          <slot name="header" />
          <DisclosureButton as="button" @click="store.setSettingValue(`section-${props.secCode}-show`, !open)">
            <Icon name="tabler:chevron-right" class="size-6" :class="open && 'ui-open:rotate-90 ui-open:transform'" />
          </DisclosureButton>
        </div>
      </ClientOnly>
    </div>
    <ClientOnly>
      <DisclosurePanel as="div" class="m-section__body">
        <slot />
      </DisclosurePanel>
    </ClientOnly>
  </Disclosure>
</template>
