<template>
  <div class="flex flex-col md:flex-row justify-between w-full text-xs p-1 px-3">
    <div class="grid grid-cols-5 gap-3 pb-3 items-center">
      <div class="flex gap-2">
        <MBtn text-class="text-xs" class="m-btn--default m-btn--small bg-gray-100 border" :text="batchEditingStart ? 'Закончить' : 'Мас.ред.'" @click="emits('changeBatchEditingStart')" />
        <MBtn v-if="batchEditingStart" text-class="text-xs" class="m-btn--default m-btn--small bg-gray-100 border" text="Выбрать все" @click="emits('checkAll')" />
        <MBtn v-if="batchEditingStart" text-class="text-xs" class="m-btn--default m-btn--small bg-gray-100 border" text="Снять все" @click="emits('unCheckAll')" />
      </div>
      <template v-if="batchEditingStart && colCheckedIds">
        <div><b>Выбрано элементов:</b> {{ colCheckedIds }}</div>
        <MTableCompBatchEditingCode v-model="code" :headers="headers" />
        <MFormItem
          v-if="redCol && code && code !== 'deleteAllIds'"
          :key="code"
          v-model="newData"
          :data="redCol"
          :form-data="[]"
          action="edit"
        />
        <div v-if="redCol">
          <MBtn class="m-btn--green m-btn--small border" text="Отправить" :disabled="disabledSubmit" @click="submit()" />
        </div>
        <div v-if="code === 'deleteAllIds'">
          <MBtn class="m-btn--red m-btn--small border" text="Удалить" :disabled="disabledSubmit" @click="deleteAllIds()" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'

const props = defineProps<{
  headers: any
  table: string
  batchEditingStart: boolean
  checkedIds: number[]
  colCheckedIds: number
}>()

const code = ref()
const newData = ref()
const emits = defineEmits(['changeBatchEditingStart', 'refresh', 'checkAll', 'unCheckAll'])
const redCol = computed(() => props.headers.find((i: any) => i.code === code.value))
const frizSubmit = ref(0)
const v$ = useVuelidate()
const disabledSubmit = computed(() => v$.value.$invalid)
const submit = async () => {
  frizSubmit.value++
  const ids = useCloneDeep(props.checkedIds)
  if (disabledSubmit.value || frizSubmit.value !== 1) { return }
  const val = {
    ids,
    code: code.value,
    value: newData.value || null
  }
  if (['suggestions', 'projects'].includes(props.table)) {
    await useAuthNew().batchEditing(props.table, val)
  }
  emits('refresh')
  frizSubmit.value = 0
}
function deleteAllIds() {
  if (window.confirm('Вы уверены, что хотите удалить все выбранные?')) {
    submit()
  }
}

watch(() => code.value, () => { newData.value = null })

</script>
