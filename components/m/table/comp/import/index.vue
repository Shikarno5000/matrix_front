<template>
  <MDialogDefault
    title="Добавление информации из файла"
    :show-delete="false"
    :show-submit="fileArray.ready"
    :disabled-submit="!fileArray.ready"
    :close="close"
    submit-text="Добавить"
    @submit="add()"
    @run-dialog="fileData = null"
  >
    <template #button>
      <MBtnIcon icon="lets-icons:import" title="Импорт из xlsx" icon-class="text-base" />
    </template>
    <template #body>
      <input type="file" placeholder="Upload file" accept=".ods,.xlsx" class="my-3" @change="addFile($event)">
      <MAlert v-if="fileArray.errors.length" type="error">
        {{ fileArray.errors.join(',  ') }}
      </MAlert>
      <div v-else>
        <MAlert v-if="fileArray.success?.length > 0" type="info">
          Готовых для вставки строк <b>{{ fileArray.success.length }}</b>
        </MAlert>
      </div>
    </template>
  </MDialogDefault>
</template>

<script lang="ts" setup>
import { fileData, fileArray, addFile } from './func'
// import { useProductsElementsStore } from '~/store/product-elements'
// import { useElementsStore } from '~/store/elements'
// const elementsStore = useElementsStore()
// const productsElementsStore = useProductsElementsStore()

const emit = defineEmits(['refresh'])

const close = ref(false)
const showError = ref()

const props = defineProps<{
  table: string
  to?: {
    id: number
  }
}>()

async function getFileArray() {
  if (fileData.value) {
    // if (props.table === 'product-elements') { fileArray.value = await productsElementsStore.checkData(await fileData.value) }
    // if (props.table === 'elements') { fileArray.value = elementsStore.checkData(await fileData.value) }
  }
}

async function add () {
  if (!fileArray.value) { return }
  let response = null
  if (props.table === 'product-elements' && props.to) {
    // response = await productsElementsStore.addArray(fileArray.value.success, props.to)
  }
  if (props.table === 'elements') {
    // response = await elementsStore.addArray(fileArray.value.success)
  }
  if (!response) { return }
  if (response.success) {
    emit('refresh', response.data)
    close.value = !close.value
  } else {
    showError.value = response.error
  }
}

watch(() => fileData.value, () => { getFileArray() })
</script>
