<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

const props = defineProps<{
  title: string
  error?: any
  submitText?: string
  close: boolean
  showSubmit: boolean
  showDelete: boolean
  disabledSubmit: boolean
}>()

const emits = defineEmits(['delete', 'submit', 'runDialog'])

const isOpen = ref(false)

function openModal () {
  emits('runDialog')
  isOpen.value = true
}

const localError = ref(props.error)
function closeModal() {
  localError.value = null
  isOpen.value = false
}
watch(
  () => props.close,
  () => {
    closeModal()
  }
)
watch(
  () => props.error,
  () => {
    localError.value = props.error
  }
)
</script>

<template>
  <span @click="openModal">
    <slot name="button" />
  </span>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="m-dialog">
      <div class="m-dialog__bg" aria-hidden="true" />
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="m-dialog__block">
        <div class="m-dialog__item">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="m-dialog__panel"
            >
              <DialogTitle class="m-dialog__title">
                <div>{{ title }}</div>
                <MBtnClose @click="closeModal" />
              </DialogTitle>
              <div class="m-dialog__body">
                <slot name="body" />
              </div>
              <MAlertErrorNew v-if="localError" :error="localError" class="mx-4" />
              <div class="m-dialog__btns">
                <div class="">
                  <MBtn v-if="showDelete" text="Удалить" class="m-btn--red" @click="emits('delete')" />
                </div>
                <div class="flex gap-2">
                  <MBtn v-if="showSubmit" :text="submitText ? submitText : 'Добавить'" class="m-btn--green" :disabled="disabledSubmit" @click="emits('submit')" />
                  <MBtn text="Отменить" class="m-btn--gray" @click="closeModal" />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
