<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue'
defineProps<{
  title?: string
}>()

const defaultOpen = ref(false)
// if (props.hideInModal && process.client) {
//   defaultOpen.value = window.innerWidth > 1280
// }

</script>
<template>
  <Disclosure v-slot="{ open }" :default-open="defaultOpen" as="div" class="m-section">
    <div class="m-section__header">
      <h2 class="m-section__title">
        {{ title }}
      </h2>
      <div class="flex gap-2 items-center">
        <slot name="header" />
        <DisclosureButton as="button">
          <Icon name="tabler:chevron-right" class="size-6" :class="open && 'ui-open:rotate-90 ui-open:transform'" />
        </DisclosureButton>
      </div>
    </div>
    <ClientOnly>
      <DisclosurePanel as="div" class="m-section__body">
        <slot />
      </DisclosurePanel>
    </ClientOnly>
  </Disclosure>
</template>
