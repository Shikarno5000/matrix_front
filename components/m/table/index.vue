<template>
  <Disclosure v-slot="{ open }" :default-open="defaultOpen" as="div" class="border shadow-md bg-white">
    <div class="flex border-b p-0.5 bg-green-50 items-center">
      <MTableCompTitle :title="title ? title : settings.title" />
      <div class="flex gap-2 items-center">
        <slot name="header" />
        <MDialog v-if="settings.add" :table="settings.code" :to="to" action="add" @refresh="emit('refresh')" />
        <MTableCompDelAll v-if="settings.edit && settings.delAll" :to="to" :table="settings.code" @refresh="emit('refresh')" />
        <MTableCompImport v-if="settings.edit && settings.import" :table="settings.code" :to="to" @refresh="emit('refresh')" />
        <MTableCompExport v-if="settings.export" :table="settings.code" :settings="settings.importExport" :items="itemsOnPage" class="ml-auto" />
        <MFormInput v-model="filter" code="filter" name="" icon="mdi:search" class="m-input--header" />
        <MTableCompShow v-model="limit" />
        <ClientOnly>
          <DisclosureButton as="button" @click="store.setSettingValue(`table-${settings.code}-show`, !open)">
            <Icon name="tabler:chevron-right" class="size-5 mr-2" :class="open && 'ui-open:rotate-90 ui-open:transform'" />
          </DisclosureButton>
        </ClientOnly>
      </div>
    </div>
    <ClientOnly>
      <DisclosurePanel as="div" class="">
        <div :class="!limit ? 'overflow-y-auto h-full max-h-[600px]' : ''">
          <div class="relative">
            <table class="m-table flex-1">
              <MTableCompHeader
                v-if="filteredItems.length"
                :batch-editing-start="batchEditingStart"
                :headers="settings.headers"
                :sort="sort"
                :limit="limit"
                @change-sort="(i: TSort) => (sort = i)"
              />
              <tbody class="m-table__body">
                <tr v-for="item in itemsOnPage" :key="item.id" :class="item.tr_class">
                  <td v-if="batchEditingStart">
                    <input
                      :id="`c-${getId(item)}`"
                      :checked="checked(getId(item))"
                      type="checkbox"
                      class="m-checkbox__icon"
                      :code="`c-${getId(item)}`"
                      @click="addOrDelId(getId(item))"
                    >
                  </td>
                  <td v-for="(td, tdIndex) in settings.headers" :key="td.code" :class="getClass(td.code)">
                    <MRevData :edit="settings.edit" :table="settings.code" :data="item[tdIndex]" @refresh="emit('refresh')" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <MTableCompFooter :limit="limit" :start-row="startRow" :length="filteredItems.length" @change-start-row="(i: number) => (startRow = i)" />
        <MTableCompBatchEditing
          v-if="batchEditing && batchEditing.length"
          :table="settings.code"
          :checked-ids="checkedIds"
          :headers="batchEditing"
          :batch-editing-start="batchEditingStart"
          :col-checked-ids="checkedIds.length"
          @change-batch-editing-start="batchEditingStart = !batchEditingStart"
          @check-all="checkedIds = allIds"
          @un-check-all="checkedIds = []"
          @refresh="emit('refresh')"
        />
      </DisclosurePanel>
    </ClientOnly>
  </Disclosure>
</template>

<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useAuthStore } from '~/store/auth'

const store = useAuthStore()

const emit = defineEmits(['refresh'])
const props = defineProps<{
  title?: string
  settings: any
  items: any[]
  to?: TTo
}>()
// для массово изменения
const batchEditingStart = ref(false)
const batchEditing = computed(() => props.settings.headers.filter((i:any) => i.batchEditing))
const revItems = computed(() => revTable(props.items, props.settings))
const allIds = computed(() => useCloneDeep(itemsOnPage.value).map((i: any) => getId(i)))
const checkedIds = ref<number[]>([])
function getId(obj: any) {
  for (const key in obj) {
    if (obj[key].type === 'cog') {
      return obj[key].value.id
    }
  }
}
function checked(id: number) {
  return checkedIds.value.includes(id)
}
function addOrDelId(id: number) {
  const index = checkedIds.value.indexOf(id)
  if (index !== -1) { checkedIds.value.splice(index, 1) } else { checkedIds.value.push(id) }
}

const showSettings = store.getSettingValue(`table-${props.settings.code}-show`)
const defaultOpen = ref(showSettings !== undefined ? showSettings : true)

// if (props.hideInModal && process.client) {
//   defaultOpen.value = window.innerWidth > 1280
// }

const filter = ref('')
const limitSettings = store.getSettingValue(`table-${props.settings.code}-limit`)
const limit = ref<number>(limitSettings !== undefined ? limitSettings : 50)
const sortVal = computed<number>(() => props.settings.headers.findIndex((i: any) => i.code === 'sort'))
const sort = ref<TSort>({
  index: sortVal.value !== -1 ? sortVal.value : 0,
  ascDesc: 'asc'
})

const startRow = ref(0)

const filteredItems = computed(() => {
  if (!revItems.value) {
    return []
  }
  // Фильтрация
  let filteredItems = []
  if (filter.value && filter.value.length > 1) {
    const filterArray = filter.value.toLowerCase().split(' ').filter(i => i !== '')
    filteredItems = revItems.value.filter((items: any) => {
      for (const item in Object.keys(items)) {
        if (typeof items[item].value === 'string') {
          const str = String(items[item].value).toLowerCase()
          let lineFind = true
          filterArray.forEach((f) => {
            if (!str.includes(f)) {
              lineFind = false
            }
          })
          if (lineFind) { return true }
        }
      }
      return false
    })
  } else {
    filteredItems = revItems.value
  }
  return filteredItems
})

const itemsOnPage = computed(() => useOrderBy(limit.value ? filteredItems.value.slice(startRow.value, startRow.value + limit.value) : filteredItems.value, [`${sort.value.index}.value`], [sort.value.ascDesc]))

// сохранение настроек лимита
watch(
  () => limit.value,
  () => {
    startRow.value = 0
    store.setSettingValue(`table-${props.settings.code}-limit`, limit.value)
  }
)

const getClass = (code: string | undefined) => {
  if (!code) {
    return ''
  }
  const item = props.settings.headers.find((i: any) => i.code === code)
  return item ? item.class : ''
}

</script>
