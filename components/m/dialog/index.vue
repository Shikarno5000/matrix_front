<template>
  <MDialogDefault
    :title="title"
    :show-delete="action === 'edit' ? true : false"
    :show-submit="true"
    :disabled-submit="disabledSubmit"
    :error="showError"
    :close="close"
    :submit-text="action === 'edit' ? 'Изменить' : 'Добавить'"
    @submit="submit()"
    @delete="deleteEntity()"
    @run-dialog="formData = null"
  >
    <template #button>
      <MBtnIcon v-if="action === 'add'" class="m-btn--small" :icon="addIcon ? addIcon : 'mdi:plus'" :text="btnTitle ? btnTitle : title" />
      <MBtnIcon v-else icon="mdi:edit" class="m-btn--small" :text="btnTitle ? btnTitle : title" />
    </template>
    <template #body>
      <div class="grid max-w-full gap-3">
        <MForm
          v-if="store"
          :action="action"
          :data="data"
          :values="store.values"
          @close="closeDialog()"
          @submit="submit()"
          @update-form-data="(e) => formData = e"
        />
      </div>
    </template>
  </MDialogDefault>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
const props = defineProps<{
    action: 'add' | 'edit'
    table: string
    btnTitle?: string
    data?: any
    addIcon?: string
    to?: TTo
  }>()
const rename = {
  'chapter-elements': 'chapterElements',
  'chapter-plks': 'chapterPlks',
  'chapter-softwares': 'chapterSoftwares',
  'counter-agent-workers': 'counterAgentWorkers',
  'counter-agents': 'counterAgents',
  'element-codes': 'elementCodes',
  'element-prices': 'elementPrices',
  'internal-meetings': 'internalMeetings',
  'lower-level-elements': 'lowerLevelElements',
  'lower-levels': 'lowerLevels',
  'official-notes': 'officialNotes',
  'plk-elements': 'plkElements',
  'product-elements': 'productElements',
  'product-plks': 'productPlks',
  'product-versions': 'productVersions',
  'project-users': 'projectUsers',
  'server-elements': 'serverElements'
}
const store = computed(() => {
  let name = props.table
  if (Object.keys(rename).includes(props.table)) { name = rename[props.table as keyof typeof rename] }
  return entitySettings[name as keyof typeof entitySettings].form
})
// получение заголовка
const title = computed(() => store.value ? store.value.title[props.action] : 'Заголовок')

const close = ref(false)
const formData = ref()
const showError = ref()

const v$ = useVuelidate()
const frizSubmit = ref(0)
const disabledSubmit = computed(() => v$.value.$invalid)

const emit = defineEmits(['refresh'])

const submit = async () => {
  frizSubmit.value++
  if (disabledSubmit.value || !store.value || frizSubmit.value !== 1) { return }
  const values = useCloneDeep(formData.value)
  if (props.action === 'add') {
    if (props.table === 'files') {
      const data = new FormData()
      data.append('file', values.file)
      data.append('to', JSON.stringify(props.to))
      values.name && data.append('name', JSON.stringify(values.name))
      values.date && data.append('date', JSON.stringify(values.date))
      values.comment && data.append('comment', JSON.stringify(values.comment))
      const { status, pending, error } = await useAuthNew().addFile(props.table, data)
      closeDialogOrShowError(status, pending, error)
    } else if (props.table === 'product-versions') {
      if (props.to?.id) {
        const { status, pending, error } = await useAuthNew().api(`product-versions/${props.to.id}`, 'post', values)
        closeDialogOrShowError(status, pending, error)
      }
    } else {
      const { status, pending, error } = await useAuthNew().add(props.table, preparingValues(props.table, values))
      closeDialogOrShowError(status, pending, error)
    }
  }
  if (props.action === 'edit') {
    const { status, pending, error } = await useAuthNew().edit(props.table, props.data.id, values)
    closeDialogOrShowError(status, pending, error)
  }
  frizSubmit.value = 0
}

const deleteEntity = async () => {
  if (store.value && window.confirm('Вы уверены, что хотите удалить?') && props.data?.id) {
    const { status, pending, error } = await useAuthNew().del(props.table, props.data.id)
    closeDialogOrShowError(status, pending, error)
  }
}
function closeDialogOrShowError(status: any, pending: any, error: any) {
  if (!pending.value) {
    if (status.value === 'success') {
      closeDialog()
    } else if (error.value) {
      showError.value = error.value
    }
  }
}
function preparingValues(table: string, values: any) {
  if (props.to?.id) {
    if (table === 'applications') { values.contract_id = props.to.id }
    if (table === 'chapter-elements' || table === 'chapter-plks' || table === 'chapter-softwares' || table === 'documents' || table === 'lower-levels' || table === 'products' || table === 'servers') { values.chapter_id = props.to.id }
    if (table === 'chapters') { values.subgroup_id = props.to.id }
    if (table === 'decisions') { values.question_id = props.to.id }
    if (table === 'directions' || table === 'participants') { values.project_id = props.to.id }
    if (table === 'element-codes') { values.element_id = props.to.id }
    if (table === 'product-elements' || table === 'product-plks') { values.product_id = props.to.id }
    if (table === 'lower-level-elements') { values.lower_level_id = props.to.id }
    if (table === 'offers') { values.question_id = props.to.id }
    if (table === 'plk-elements') { values.plk_id = props.to.id }
    if (table === 'questions') { values.internal_meeting_id = props.to.id }
    if (table === 'server-elements') { values.server_id = props.to.id }
    if (table === 'specifications') { values.contract_id = props.to.id }
    if (table === 'subgroups') { values.direction_id = props.to.id }
    if (table === 'stages' || table === 'timelines') { values.to = props.to }
  }

  return values
}

// закрытие окна
function closeDialog() {
  emit('refresh')
  showError.value = null
  close.value = !close.value
}

</script>
